// Moving the site to a new address (Higgsfield → the owner's own Cloudflare account).
//
// The new site pulls the old site's rows itself, so the data goes straight from one server to
// the other and never through GitHub or a person. The new site needs MOVE_FROM (the old site's
// address). How the old site knows a request really comes from the new site, either:
//   - a signature ("electronic seal"): the new site signs each export request with its secret
//     MOVE_SIGN_KEY (an ECDSA P-256 private key made by .github/workflows/move-auto.yml), and the
//     old site checks it with MOVE_PUBLIC_JWK below (a public key: safe to publish). Nothing has to
//     be set on the old site; or
//   - the same secret MOVE_KEY (32+ characters) on both sites.
// The import route (called page by page by the workflow) needs MOVE_KEY on the new site; the
// workflow sets a fresh random one for each run and removes it afterwards. Without them the routes
// don't exist (404).
//
//   GET  /api/move/export?table=&after=&limit=   (old site) one page of a table, oldest key first
//   POST /api/move/import { table, after }        (new site) pulls that page from MOVE_FROM and
//                                                  merges it -> { ok, table, n, next }
// The GitHub workflow "Move data" walks every table page by page and prints only row counts.
//
// Safe to run again: accounts and visitors merge, a save is copied only to an account that has none
// here yet; every old save also waits in bf_moved_saves (the newest one), and the page merges it into
// the account the next time the person signs in, so progress made on either site is kept.
// Entitlements / billing / the stats password are kept when
// already there, the reward keeps the larger count, and usage events continue after the last one copied (never twice).
// Login sessions are not copied: everyone signs in once on the new address.
import type { D1Database, D1PreparedStatement } from "@cloudflare/workers-types";

import { bindings } from "./bindings.server";
import { json, readJsonBody, sha256Hex, timingSafeEqualHex, type Row } from "./http.server";

type Col = [name: string, kind: "text" | "int"];
type Table = { key: string; cols: Col[]; merge: string; events?: true };

export const MOVE_TABLES: Record<string, Table> = {
  bf_users: {
    key: "uid",
    cols: [["uid", "text"], ["provider", "text"], ["created_at", "int"], ["last_login", "int"]],
    merge:
      "ON CONFLICT(uid) DO UPDATE SET created_at = MIN(bf_users.created_at, excluded.created_at), " +
      "last_login = MAX(bf_users.last_login, excluded.last_login)",
  },
  bf_saves: {
    key: "uid",
    cols: [["uid", "text"], ["data", "text"], ["t", "int"], ["rev", "int"], ["updated_at", "int"]],
    merge: "ON CONFLICT(uid) DO NOTHING",
  },
  bf_entitlements: {
    key: "uid",
    cols: [["uid", "text"], ["plan", "text"], ["source", "text"], ["granted_at", "int"]],
    merge: "ON CONFLICT(uid) DO NOTHING",
  },
  bf_billing: {
    key: "uid",
    cols: [
      ["uid", "text"], ["customer", "text"], ["subscription", "text"], ["plan", "text"], ["status", "text"],
      ["period_end", "int"], ["cancel_at", "int"], ["livemode", "int"], ["updated_at", "int"],
    ],
    merge: "ON CONFLICT(uid) DO NOTHING",
  },
  // The hidden reward: the larger count wins, and a reward given on either site is kept.
  bf_reward: {
    key: "uid",
    cols: [["uid", "text"], ["total", "int"], ["day", "text"], ["day_n", "int"], ["last_at", "int"], ["granted_at", "int"], ["until", "int"]],
    merge:
      "ON CONFLICT(uid) DO UPDATE SET total = MAX(bf_reward.total, excluded.total), " +
      "granted_at = MAX(bf_reward.granted_at, excluded.granted_at), until = MAX(bf_reward.until, excluded.until)",
  },
  bf_auth: {
    key: "id",
    cols: [["id", "int"], ["salt", "text"], ["hash", "text"], ["iter", "int"], ["created_at", "int"]],
    merge: "ON CONFLICT(id) DO NOTHING",
  },
  bf_visitors: {
    key: "vid",
    cols: [["vid", "text"], ["first_day", "text"], ["last_day", "text"]],
    merge:
      "ON CONFLICT(vid) DO UPDATE SET first_day = MIN(bf_visitors.first_day, excluded.first_day), " +
      "last_day = MAX(bf_visitors.last_day, excluded.last_day)",
  },
  // New ids on the new site; the old id only marks how far the copy got.
  bf_events: {
    key: "id",
    cols: [["id", "int"], ["day", "text"], ["ts", "int"], ["vid", "text"], ["kind", "text"], ["lang", "text"], ["mode", "text"], ["track", "text"]],
    merge: "",
    events: true,
  },
};
/** The new site's public key (ECDSA P-256, from move-auto.yml's "keygen" run); null = not made yet. */
type PublicJwk = { x: string; y: string };
const MOVE_PUBLIC_JWK = { x: "1ZSO9M4s0OhFXf4EDHnNMIgaPUr9xYQwMdoe7qQ9yRU", y: "t-iy9RS1NGcF9goyD-tWLQePvX9Fy6w-c_BeF4QrksA" } as PublicJwk | null;
const SIG_MAX_AGE_MS = 5 * 60 * 1000;
const SIG_LABEL = "babel-flight move-export";

function b64u(bytes: ArrayBuffer): string {
  let bin = "";
  for (const b of new Uint8Array(bytes)) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function fromB64u(s: string) {
  const bin = atob(s.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((s.length + 3) % 4));
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}
const sigMessage = (pathAndQuery: string, ts: string) => new TextEncoder().encode(`${SIG_LABEL}\n${pathAndQuery}\n${ts}`);

/** New site: "<ms>.<signature>" for an export request, or null without MOVE_SIGN_KEY. */
async function signExport(pathAndQuery: string): Promise<string | null> {
  const raw = (bindings().MOVE_SIGN_KEY ?? "").trim();
  if (!raw) return null;
  try {
    const j = JSON.parse(raw) as Row;
    const key = await crypto.subtle.importKey(
      "jwk",
      { kty: "EC", crv: "P-256", x: String(j.x), y: String(j.y), d: String(j.d) },
      { name: "ECDSA", namedCurve: "P-256" },
      false,
      ["sign"],
    );
    const ts = String(Date.now());
    const sig = await crypto.subtle.sign({ name: "ECDSA", hash: "SHA-256" }, key, sigMessage(pathAndQuery, ts));
    return `${ts}.${b64u(sig)}`;
  } catch {
    return null;
  }
}

/** Old site: is this export request signed by the new site (and recent)? */
async function signedByNewSite(request: Request, url: URL, pub: PublicJwk | null = MOVE_PUBLIC_JWK): Promise<boolean> {
  if (!pub) return false;
  const m = /^(\d{13})\.([A-Za-z0-9_-]{60,120})$/.exec((request.headers.get("x-move-sig") ?? "").trim());
  if (!m || !m[1] || !m[2]) return false;
  if (Math.abs(Date.now() - Number(m[1])) > SIG_MAX_AGE_MS) return false;
  try {
    const key = await crypto.subtle.importKey(
      "jwk",
      { kty: "EC", crv: "P-256", x: pub.x, y: pub.y },
      { name: "ECDSA", namedCurve: "P-256" },
      false,
      ["verify"],
    );
    return await crypto.subtle.verify({ name: "ECDSA", hash: "SHA-256" }, key, fromB64u(m[2]), sigMessage(url.pathname + url.search, m[1]));
  } catch {
    return false;
  }
}
/** For tests: the same check with a given public key. */
export const __signedWith = (request: Request, url: URL, pub: PublicJwk) => signedByNewSite(request, url, pub);
export const __signExport = signExport;

const PAGE_DEFAULT = 200;
const PAGE_MAX = 500;
const EVENTS_CURSOR = "move:bf_events";

function moveKey(): string | null {
  const k = (bindings().MOVE_KEY ?? "").trim();
  return k.length >= 32 ? k : null;
}

async function authorized(request: Request, key: string): Promise<boolean> {
  const m = /^Bearer (\S{32,512})$/.exec((request.headers.get("authorization") ?? "").trim());
  if (!m || !m[1]) return false;
  return timingSafeEqualHex(await sha256Hex(m[1]), await sha256Hex(key));
}

function pageSize(v: unknown): number {
  const n = Math.floor(Number(v));
  return n >= 1 ? Math.min(n, PAGE_MAX) : PAGE_DEFAULT;
}

/** A row from the other site, checked column by column; null if anything is off. */
function cleanRow(t: Table, r: unknown): (string | number)[] | null {
  if (!r || typeof r !== "object") return null;
  const out: (string | number)[] = [];
  for (const [name, kind] of t.cols) {
    const v = (r as Row)[name];
    if (kind === "int") {
      if (typeof v !== "number" || !Number.isSafeInteger(v)) return null;
      out.push(v);
    } else {
      if (typeof v !== "string" || v.length > 200_000) return null;
      out.push(v);
    }
  }
  return out;
}

async function handleExport(url: URL, db: D1Database): Promise<Response> {
  const name = url.searchParams.get("table") ?? "";
  const t = MOVE_TABLES[name];
  if (!t) return json({ ok: false, error: "table" }, 400);
  const intKey = t.cols.find((c) => c[0] === t.key)?.[1] === "int";
  const rawAfter = url.searchParams.get("after") ?? "";
  const after: string | number = intKey ? Math.max(0, Math.floor(Number(rawAfter)) || 0) : rawAfter;
  const limit = pageSize(url.searchParams.get("limit"));
  const cols = t.cols.map((c) => c[0]).join(", ");
  const res = await db
    .prepare(`SELECT ${cols} FROM ${name} WHERE ${t.key} > ? ORDER BY ${t.key} LIMIT ?`)
    .bind(after, limit)
    .all<Row>();
  const rows = res.results ?? [];
  const last = rows.length === limit ? rows[rows.length - 1] : undefined;
  return json({ ok: true, rows, next: last ? String(last[t.key]) : null });
}

async function handleImport(request: Request, key: string, db: D1Database): Promise<Response> {
  const from = (bindings().MOVE_FROM ?? "").trim().replace(/\/+$/, "");
  let fromUrl: URL;
  try {
    fromUrl = new URL(from);
  } catch {
    return json({ ok: false, error: "move_from" }, 503);
  }
  const local = fromUrl.hostname === "127.0.0.1" || fromUrl.hostname === "localhost"; // trying it out with wrangler dev
  if ((fromUrl.protocol !== "https:" && !local) || fromUrl.origin === new URL(request.url).origin) {
    return json({ ok: false, error: "move_from" }, 503);
  }
  const body = (await readJsonBody(request, 1024)) as Row | null;
  const name = typeof body?.table === "string" ? body.table : "";
  const t = MOVE_TABLES[name];
  if (!t) return json({ ok: false, error: "table" }, 400);

  let after = typeof body?.after === "string" ? body.after : "";
  if (t.events) {
    const c = await db.prepare("SELECT v FROM bf_meta WHERE k = ?").bind(EVENTS_CURSOR).first<Row>();
    after = c && typeof c.v === "string" ? c.v : "0";
  }
  const q = new URLSearchParams({ table: name, after, limit: String(PAGE_DEFAULT) });
  const exportPath = `/api/move/export?${q}`;
  const sig = await signExport(exportPath);
  const res = await fetch(`${fromUrl.origin}${exportPath}`, {
    headers: sig ? { "x-move-sig": sig } : { authorization: `Bearer ${key}` },
  });
  if (!res.ok) return json({ ok: false, error: "from", status: res.status }, 502);
  const page = (await res.json().catch(() => null)) as Row | null;
  if (!page || page.ok !== true || !Array.isArray(page.rows)) return json({ ok: false, error: "from" }, 502);

  const statements: D1PreparedStatement[] = [];
  let skipped = 0;
  let lastId = 0;
  for (const r of page.rows as unknown[]) {
    // the copy moves past every event it saw, even one it had to skip
    const rid = (r as Row | null)?.id;
    if (t.events && typeof rid === "number" && Number.isSafeInteger(rid)) lastId = Math.max(lastId, rid);
    const v = cleanRow(t, r);
    if (!v) {
      skipped++;
      continue;
    }
    if (t.events) {
      statements.push(
        db.prepare("INSERT INTO bf_events (day, ts, vid, kind, lang, mode, track) VALUES (?, ?, ?, ?, ?, ?, ?)").bind(...v.slice(1)),
      );
    } else {
      const cols = t.cols.map((c) => c[0]);
      statements.push(
        db.prepare(`INSERT INTO ${name} (${cols.join(", ")}) VALUES (${cols.map(() => "?").join(", ")}) ${t.merge}`).bind(...v),
      );
      if (name === "bf_saves") {
        // uid, data, t: the old copy waits for the page to merge it (a newer old copy replaces it)
        statements.push(
          db
            .prepare(
              "INSERT INTO bf_moved_saves (uid, data, t, updated_at) VALUES (?, ?, ?, ?) " +
                "ON CONFLICT(uid) DO UPDATE SET data = excluded.data, t = excluded.t, updated_at = excluded.updated_at " +
                "WHERE excluded.t > bf_moved_saves.t",
            )
            .bind(v[0], v[1], v[2], Date.now()),
        );
      }
    }
  }
  if (t.events && lastId) {
    statements.push(
      db.prepare("INSERT INTO bf_meta (k, v) VALUES (?, ?) ON CONFLICT(k) DO UPDATE SET v = excluded.v").bind(EVENTS_CURSOR, String(lastId)),
    );
  }
  if (statements.length) await db.batch(statements);
  const next = typeof page.next === "string" && page.next ? page.next : null;
  return json({ ok: true, table: name, n: page.rows.length - skipped, skipped, next });
}

export async function handleMove(request: Request, url: URL): Promise<Response | null> {
  if (!url.pathname.startsWith("/api/move/")) return null;
  const route = url.pathname.slice("/api/move/".length);
  const key = moveKey();
  // export: the new site's signature, or the shared key; import: the shared key only
  const exportBySig = route === "export" && request.method === "GET" && MOVE_PUBLIC_JWK !== null;
  if (!key && !exportBySig) return json({ ok: false, error: "not_found" }, 404);
  const ok = (key !== null && (await authorized(request, key))) || (exportBySig && (await signedByNewSite(request, url)));
  if (!ok) return json({ ok: false }, 403);
  const db = bindings().DB;
  if (!db) return json({ ok: false, error: "no_db" }, 503);
  try {
    if (route === "export" && request.method === "GET") return await handleExport(url, db);
    if (route === "import" && request.method === "POST" && key) return await handleImport(request, key, db);
    return json({ ok: false, error: "not_found" }, 404);
  } catch (error) {
    console.error("move error:", error instanceof Error ? error.message : "unknown");
    return json({ ok: false, error: "server" }, 500);
  }
}
