// 家族シェア: an account flying ファースト by itself (ownsFirst: the test account, the family account, the hidden
// reward, a paid ファースト) shares it with up to two family members.
//
// The sharer makes an invite code (8 characters, one use, 7 days) and sends it or its link
// (https://babelflight.com/?family=CODE). The other person signs in and joins. While the sharer flies ファースト,
// members get ファースト too (entitlements `fam`, see entitlements.server.ts); when it ends, so does theirs.
// Rules: 2 members at most; nobody shares with themselves; a member can't share on (a shared ファースト isn't
// "owned"); an account in one family can't join another; an account with its own ファースト doesn't need to join;
// at most 4 people can join one sharer in 30 days (so seats can't be passed around); 3 open codes at most.
//
// Routes (dispatched from server.ts; signed in, same origin for POST):
//   GET  /api/family          -> { ok, role: owner|member|none, can, max, members[{id,name,icon,joined}], codes[{code,expires}], owner? }
//   POST /api/family/invite   -> { ok, code, expires }
//   POST /api/family/revoke   { code }
//   POST /api/family/peek     { code } -> { ok, owner }  (who invites, before joining)
//   POST /api/family/join     { code } -> { ok, owner }
//   POST /api/family/remove   { id }   (the sharer removes a member)
//   POST /api/family/leave             (a member leaves)
import type { D1Database } from "@cloudflare/workers-types";

import { accountUid } from "./account.server";
import { bindings } from "./bindings.server";
import { displayName, ownsFirst } from "./entitlements.server";
import { isSameOrigin, json, num, readJsonBody, type Row } from "./http.server";

export const FAMILY = { MAX: 2, CODE_DAYS: 7, OPEN_CODES: 3, JOINS_30D: 4 } as const;
const DAY_MS = 86_400_000;
const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no 0/O, 1/I

function newCode(): string {
  const b = new Uint8Array(8);
  crypto.getRandomValues(b);
  return Array.from(b, (x) => ALPHABET[x % ALPHABET.length]).join("");
}
function cleanCode(v: unknown): string | null {
  if (typeof v !== "string") return null;
  const c = v.toUpperCase().replace(/[^A-Z0-9]/g, "");
  return c.length === 8 && [...c].every((ch) => ALPHABET.includes(ch)) ? c : null;
}

async function membersOf(db: D1Database, owner: string): Promise<Row[]> {
  const r = await db
    .prepare("SELECT id, member, joined_at FROM bf_family_members WHERE owner = ? ORDER BY joined_at")
    .bind(owner)
    .all<Row>();
  return r.results ?? [];
}
async function ownerOf(db: D1Database, uid: string): Promise<string> {
  const r = await db.prepare("SELECT owner FROM bf_family_members WHERE member = ?").bind(uid).first<Row>();
  return r && typeof r.owner === "string" ? r.owner : "";
}

async function handleGet(db: D1Database, uid: string): Promise<Response> {
  const owner = await ownerOf(db, uid);
  if (owner) {
    const active = await ownsFirst(db, owner);
    return json({ ok: true, role: "member", owner: { ...(await displayName(db, owner)), active } });
  }
  const can = await ownsFirst(db, uid);
  const rows = await membersOf(db, uid);
  const members = await Promise.all(
    rows.map(async (m) => ({ id: num(m.id), ...(await displayName(db, String(m.member))), joined: num(m.joined_at) })),
  );
  const now = Date.now();
  const codes = can
    ? ((
        await db
          .prepare("SELECT code, expires_at FROM bf_family_codes WHERE owner = ? AND used_by = '' AND expires_at > ? ORDER BY created_at")
          .bind(uid, now)
          .all<Row>()
      ).results ?? []).map((c) => ({ code: String(c.code), expires: num(c.expires_at) }))
    : [];
  return json({ ok: true, role: members.length ? "owner" : "none", can, max: FAMILY.MAX, members, codes });
}

async function handleInvite(db: D1Database, uid: string): Promise<Response> {
  if (await ownerOf(db, uid)) return json({ ok: false, error: "member" }, 403);
  if (!(await ownsFirst(db, uid))) return json({ ok: false, error: "class" }, 403);
  if ((await membersOf(db, uid)).length >= FAMILY.MAX) return json({ ok: false, error: "full" }, 409);
  const now = Date.now();
  const open = await db
    .prepare("SELECT COUNT(*) AS n FROM bf_family_codes WHERE owner = ? AND used_by = '' AND expires_at > ?")
    .bind(uid, now)
    .first<Row>();
  if (num(open?.n) >= FAMILY.OPEN_CODES) return json({ ok: false, error: "codes" }, 429);
  const expires = now + FAMILY.CODE_DAYS * DAY_MS;
  for (let i = 0; i < 5; i++) {
    const code = newCode();
    const r = await db
      .prepare("INSERT INTO bf_family_codes (code, owner, created_at, expires_at) VALUES (?, ?, ?, ?) ON CONFLICT(code) DO NOTHING RETURNING code")
      .bind(code, uid, now, expires)
      .first<Row>();
    if (r) return json({ ok: true, code, expires });
  }
  return json({ ok: false, error: "server" }, 500);
}

async function handleRevoke(db: D1Database, uid: string, body: Row | null): Promise<Response> {
  const code = cleanCode(body?.code);
  if (!code) return json({ ok: false, error: "bad_request" }, 400);
  await db.prepare("DELETE FROM bf_family_codes WHERE code = ? AND owner = ? AND used_by = ''").bind(code, uid).run();
  return json({ ok: true });
}

/** Checks a code for this account; returns the sharer's uid or an error response. */
async function checkCode(db: D1Database, uid: string, code: string | null): Promise<string | Response> {
  if (!code) return json({ ok: false, error: "code" }, 400);
  const c = await db.prepare("SELECT owner, expires_at, used_by FROM bf_family_codes WHERE code = ?").bind(code).first<Row>();
  if (!c || c.used_by !== "" || num(c.expires_at) <= Date.now()) return json({ ok: false, error: "code" }, 404);
  const owner = String(c.owner);
  if (owner === uid) return json({ ok: false, error: "self" }, 409);
  if (await ownerOf(db, uid)) return json({ ok: false, error: "in_family" }, 409);
  if ((await membersOf(db, uid)).length) return json({ ok: false, error: "owner" }, 409);
  if (await ownsFirst(db, uid)) return json({ ok: false, error: "already_first" }, 409);
  if (!(await ownsFirst(db, owner))) return json({ ok: false, error: "owner_class" }, 409);
  if ((await membersOf(db, owner)).length >= FAMILY.MAX) return json({ ok: false, error: "full" }, 409);
  const recent = await db
    .prepare("SELECT COUNT(*) AS n FROM bf_family_codes WHERE owner = ? AND used_by <> '' AND used_at > ?")
    .bind(owner, Date.now() - 30 * DAY_MS)
    .first<Row>();
  if (num(recent?.n) >= FAMILY.JOINS_30D) return json({ ok: false, error: "too_many" }, 429);
  return owner;
}

async function handlePeek(db: D1Database, uid: string, body: Row | null): Promise<Response> {
  const owner = await checkCode(db, uid, cleanCode(body?.code));
  if (owner instanceof Response) return owner;
  return json({ ok: true, owner: await displayName(db, owner) });
}

async function handleJoin(db: D1Database, uid: string, body: Row | null): Promise<Response> {
  const code = cleanCode(body?.code);
  const owner = await checkCode(db, uid, code);
  if (owner instanceof Response) return owner;
  const now = Date.now();
  // the code is taken first (only one account can use it), then the seat
  const took = await db
    .prepare("UPDATE bf_family_codes SET used_by = ?, used_at = ? WHERE code = ? AND used_by = '' RETURNING code")
    .bind(uid, now, code)
    .first<Row>();
  if (!took) return json({ ok: false, error: "code" }, 404);
  const seat = await db
    .prepare(
      "INSERT INTO bf_family_members (owner, member, joined_at) SELECT ?, ?, ? " +
        "WHERE (SELECT COUNT(*) FROM bf_family_members WHERE owner = ?) < ? ON CONFLICT(member) DO NOTHING RETURNING id",
    )
    .bind(owner, uid, now, owner, FAMILY.MAX)
    .first<Row>();
  if (!seat) {
    await db.prepare("UPDATE bf_family_codes SET used_by = '', used_at = 0 WHERE code = ?").bind(code).run();
    return json({ ok: false, error: "full" }, 409);
  }
  return json({ ok: true, owner: await displayName(db, owner) });
}

async function handleRemove(db: D1Database, uid: string, body: Row | null): Promise<Response> {
  const id = Math.floor(num(body?.id));
  if (!(id > 0)) return json({ ok: false, error: "bad_request" }, 400);
  await db.prepare("DELETE FROM bf_family_members WHERE id = ? AND owner = ?").bind(id, uid).run();
  return json({ ok: true });
}

async function handleLeave(db: D1Database, uid: string): Promise<Response> {
  await db.prepare("DELETE FROM bf_family_members WHERE member = ?").bind(uid).run();
  return json({ ok: true });
}

/** When an account is deleted: its family and its seat in another one go too. */
export async function deleteFamilyOf(db: D1Database, uid: string): Promise<void> {
  try {
    await db.batch([
      db.prepare("DELETE FROM bf_family_members WHERE owner = ? OR member = ?").bind(uid, uid),
      db.prepare("DELETE FROM bf_family_codes WHERE owner = ?").bind(uid),
    ]);
  } catch {
    /* the tables are missing until their migration runs */
  }
}

export async function handleFamily(request: Request, url: URL): Promise<Response | null> {
  const path = url.pathname;
  if (path !== "/api/family" && !path.startsWith("/api/family/")) return null;
  const db = bindings().DB;
  if (!db) return json({ ok: false, error: "no_db" }, 503);
  try {
    const uid = await accountUid(request, db);
    if (!uid) return json({ ok: false, error: "signin" }, 401);
    if (path === "/api/family") {
      if (request.method !== "GET") return json({ ok: false, error: "method" }, 405, { allow: "GET" });
      return await handleGet(db, uid);
    }
    if (request.method !== "POST") return json({ ok: false, error: "method" }, 405, { allow: "POST" });
    if (!isSameOrigin(request, url)) return json({ ok: false }, 403);
    const route = path.slice("/api/family/".length);
    const body = await readJsonBody(request, 400);
    if (route === "invite") return await handleInvite(db, uid);
    if (route === "revoke") return await handleRevoke(db, uid, body);
    if (route === "peek") return await handlePeek(db, uid, body);
    if (route === "join") return await handleJoin(db, uid, body);
    if (route === "remove") return await handleRemove(db, uid, body);
    if (route === "leave") return await handleLeave(db, uid);
    return json({ ok: false, error: "not_found" }, 404);
  } catch (error) {
    console.error("family error:", error instanceof Error ? error.message : "unknown");
    return json({ ok: false, error: "server" }, 500);
  }
}
