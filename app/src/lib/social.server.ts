// フレンドとランキング (every class, signed in).
//
// Each account has a friend code (8 characters; it can be changed, which makes the old one stop working). Typing a
// friend's code (or opening https://babelflight.com/?friend=CODE) makes both friends at once. Friends see only each
// other's name and icon (sent by the page, kept in bf_rank) — and, when BOTH have turned the ranking on, this week's
// miles. The ranking is off at first; while off, no miles are kept here at all (turning it off deletes them).
// This week = Monday to Sunday in Japan time. Miles come from the page after each lesson, with limits
// (MILES_PER_POST each, MILES_PER_DAY a day, one post every MIN_GAP_MS), so the board can't be pushed far.
//
// Routes (signed in; POST same origin):
//   GET  /api/social              -> { ok, code, on, week, friends[{id,name,icon,miles?}], board?[{id,name,icon,miles,me}] }
//   POST /api/social/me    { name, icon }   (the name and icon friends see)
//   POST /api/social/on    { on }
//   POST /api/social/add   { code } -> { ok, friend{id,name,icon} }
//   POST /api/social/peek  { code } -> { ok, friend{name,icon} }
//   POST /api/social/remove { id }
//   POST /api/social/code                  (a new friend code)
//   POST /api/social/miles { n }
import type { D1Database } from "@cloudflare/workers-types";

import { accountUid } from "./account.server";
import { bindings } from "./bindings.server";
import { isSameOrigin, json, num, readJsonBody, sha256Hex, type Row } from "./http.server";

export const SOCIAL = { MAX_FRIENDS: 30, ADDS_PER_DAY: 15, MILES_PER_POST: 400, MILES_PER_DAY: 3000, MIN_GAP_MS: 20_000 } as const;
const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const JST_MS = 9 * 3_600_000;

function jstDay(ms: number): string {
  return new Date(ms + JST_MS).toISOString().slice(0, 10);
}
/** Monday of this week in Japan time, YYYY-MM-DD */
function weekKey(ms: number): string {
  const d = new Date(ms + JST_MS);
  d.setUTCDate(d.getUTCDate() - ((d.getUTCDay() + 6) % 7));
  return d.toISOString().slice(0, 10);
}
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
/** an id for a friend that doesn't show their account id */
async function fid(uid: string): Promise<string> {
  return (await sha256Hex("bf-friend:" + uid)).slice(0, 16);
}

async function myCode(db: D1Database, uid: string): Promise<string> {
  const r = await db.prepare("SELECT code FROM bf_friend_codes WHERE uid = ?").bind(uid).first<Row>();
  if (r && typeof r.code === "string") return r.code;
  for (let i = 0; i < 5; i++) {
    const code = newCode();
    const ok = await db
      .prepare("INSERT INTO bf_friend_codes (uid, code, created_at) VALUES (?, ?, ?) ON CONFLICT DO NOTHING RETURNING code")
      .bind(uid, code, Date.now())
      .first<Row>();
    if (ok) return code;
    const again = await db.prepare("SELECT code FROM bf_friend_codes WHERE uid = ?").bind(uid).first<Row>();
    if (again && typeof again.code === "string") return again.code;
  }
  throw new Error("code");
}

async function rankRow(db: D1Database, uid: string): Promise<Row | null> {
  return await db.prepare("SELECT * FROM bf_rank WHERE uid = ?").bind(uid).first<Row>();
}
function weekMiles(r: Row | null, week: string): number {
  return r && num(r.rank_on) === 1 && r.week === week ? num(r.miles) : 0;
}

async function handleGet(db: D1Database, uid: string): Promise<Response> {
  const now = Date.now();
  const week = weekKey(now);
  const code = await myCode(db, uid);
  const me = await rankRow(db, uid);
  const on = !!me && num(me.rank_on) === 1;
  const rows =
    (
      await db
        .prepare(
          "SELECT f.b AS uid, r.name AS name, r.icon AS icon, r.rank_on AS rank_on, r.week AS week, r.miles AS miles, f.created_at AS since " +
            "FROM bf_friends f LEFT JOIN bf_rank r ON r.uid = f.b WHERE f.a = ? ORDER BY f.created_at",
        )
        .bind(uid)
        .all<Row>()
    ).results ?? [];
  const friends = await Promise.all(
    rows.map(async (r) => {
      const fOn = num(r.rank_on) === 1;
      return {
        id: await fid(String(r.uid)),
        name: typeof r.name === "string" ? r.name : "",
        icon: typeof r.icon === "string" ? r.icon : "",
        on: on && fOn,
        ...(on && fOn ? { miles: weekMiles(r, week) } : {}),
      };
    }),
  );
  const board = on
    ? [
        { id: "me", name: typeof me?.name === "string" ? me.name : "", icon: typeof me?.icon === "string" ? me.icon : "", miles: weekMiles(me, week), me: true },
        ...friends.filter((f) => f.on).map((f) => ({ id: f.id, name: f.name, icon: f.icon, miles: f.miles ?? 0, me: false })),
      ].sort((a, b) => b.miles - a.miles)
    : undefined;
  return json({ ok: true, code, on, week, max: SOCIAL.MAX_FRIENDS, friends: friends.map(({ on: _o, ...f }) => f), ...(board ? { board } : {}) });
}

function cleanName(v: unknown): string {
  if (typeof v !== "string") return "";
  return [...v.replace(/[\u0000-\u001f<>]/g, "").trim()].slice(0, 24).join("");
}
function cleanIcon(v: unknown): string {
  return typeof v === "string" && /^[a-z0-9-]{1,20}$/.test(v) ? v : "";
}

async function handleMe(db: D1Database, uid: string, body: Row | null): Promise<Response> {
  const name = cleanName(body?.name);
  const icon = cleanIcon(body?.icon);
  await db
    .prepare(
      "INSERT INTO bf_rank (uid, name, icon, updated_at) VALUES (?, ?, ?, ?) " +
        "ON CONFLICT(uid) DO UPDATE SET name = excluded.name, icon = excluded.icon",
    )
    .bind(uid, name, icon, Date.now())
    .run();
  return json({ ok: true });
}

async function handleOn(db: D1Database, uid: string, body: Row | null): Promise<Response> {
  const on = body?.on === true ? 1 : 0;
  // turning it off forgets this week's miles
  await db
    .prepare(
      "INSERT INTO bf_rank (uid, rank_on, updated_at) VALUES (?, ?, ?) ON CONFLICT(uid) DO UPDATE SET rank_on = excluded.rank_on" +
        (on ? "" : ", miles = 0, day_miles = 0, week = '', day = ''"),
    )
    .bind(uid, on, Date.now())
    .run();
  return json({ ok: true, on: !!on });
}

async function friendCount(db: D1Database, uid: string): Promise<number> {
  return num((await db.prepare("SELECT COUNT(*) AS n FROM bf_friends WHERE a = ?").bind(uid).first<Row>())?.n);
}

async function checkCode(db: D1Database, uid: string, raw: unknown): Promise<string | Response> {
  const code = cleanCode(raw);
  if (!code) return json({ ok: false, error: "code" }, 400);
  const r = await db.prepare("SELECT uid FROM bf_friend_codes WHERE code = ?").bind(code).first<Row>();
  if (!r) return json({ ok: false, error: "code" }, 404);
  const other = String(r.uid);
  if (other === uid) return json({ ok: false, error: "self" }, 409);
  const already = await db.prepare("SELECT 1 AS x FROM bf_friends WHERE a = ? AND b = ?").bind(uid, other).first<Row>();
  if (already) return json({ ok: false, error: "already" }, 409);
  if ((await friendCount(db, uid)) >= SOCIAL.MAX_FRIENDS) return json({ ok: false, error: "full" }, 409);
  if ((await friendCount(db, other)) >= SOCIAL.MAX_FRIENDS) return json({ ok: false, error: "their_full" }, 409);
  return other;
}

async function profile(db: D1Database, uid: string): Promise<{ id: string; name: string; icon: string }> {
  const r = await rankRow(db, uid);
  return { id: await fid(uid), name: typeof r?.name === "string" ? r.name : "", icon: typeof r?.icon === "string" ? r.icon : "" };
}

async function handlePeek(db: D1Database, uid: string, body: Row | null): Promise<Response> {
  const other = await checkCode(db, uid, body?.code);
  if (other instanceof Response) return other;
  const p = await profile(db, other);
  return json({ ok: true, friend: { name: p.name, icon: p.icon } });
}

async function handleAdd(db: D1Database, uid: string, body: Row | null): Promise<Response> {
  const other = await checkCode(db, uid, body?.code);
  if (other instanceof Response) return other;
  const now = Date.now();
  const day = jstDay(now);
  const me = await rankRow(db, uid);
  const adds = me && me.add_day === day ? num(me.adds) : 0;
  if (adds >= SOCIAL.ADDS_PER_DAY) return json({ ok: false, error: "too_many" }, 429);
  await db.batch([
    db.prepare("INSERT INTO bf_friends (a, b, created_at) VALUES (?, ?, ?) ON CONFLICT DO NOTHING").bind(uid, other, now),
    db.prepare("INSERT INTO bf_friends (a, b, created_at) VALUES (?, ?, ?) ON CONFLICT DO NOTHING").bind(other, uid, now),
    db
      .prepare(
        "INSERT INTO bf_rank (uid, add_day, adds, updated_at) VALUES (?, ?, 1, ?) ON CONFLICT(uid) DO UPDATE SET " +
          "adds = CASE WHEN bf_rank.add_day = excluded.add_day THEN bf_rank.adds + 1 ELSE 1 END, add_day = excluded.add_day",
      )
      .bind(uid, day, now),
  ]);
  return json({ ok: true, friend: await profile(db, other) });
}

async function handleRemove(db: D1Database, uid: string, body: Row | null): Promise<Response> {
  const id = typeof body?.id === "string" && /^[0-9a-f]{16}$/.test(body.id) ? body.id : "";
  if (!id) return json({ ok: false, error: "bad_request" }, 400);
  const rows = (await db.prepare("SELECT b FROM bf_friends WHERE a = ?").bind(uid).all<Row>()).results ?? [];
  for (const r of rows) {
    const other = String(r.b);
    if ((await fid(other)) === id) {
      await db.batch([
        db.prepare("DELETE FROM bf_friends WHERE a = ? AND b = ?").bind(uid, other),
        db.prepare("DELETE FROM bf_friends WHERE a = ? AND b = ?").bind(other, uid),
      ]);
      break;
    }
  }
  return json({ ok: true });
}

async function handleNewCode(db: D1Database, uid: string): Promise<Response> {
  await db.prepare("DELETE FROM bf_friend_codes WHERE uid = ?").bind(uid).run();
  return json({ ok: true, code: await myCode(db, uid) });
}

async function handleMiles(db: D1Database, uid: string, body: Row | null): Promise<Response> {
  const n = Math.max(0, Math.min(SOCIAL.MILES_PER_POST, Math.floor(num(body?.n))));
  const me = await rankRow(db, uid);
  if (!me || num(me.rank_on) !== 1 || !n) return json({ ok: true, counted: 0 });
  const now = Date.now();
  if (now - num(me.miles_at) < SOCIAL.MIN_GAP_MS) return json({ ok: true, counted: 0 });
  const week = weekKey(now);
  const day = jstDay(now);
  const dayUsed = me.day === day ? num(me.day_miles) : 0;
  const add = Math.max(0, Math.min(n, SOCIAL.MILES_PER_DAY - dayUsed));
  const miles = (me.week === week ? num(me.miles) : 0) + add;
  await db
    .prepare("UPDATE bf_rank SET week = ?, miles = ?, day = ?, day_miles = ?, miles_at = ? WHERE uid = ?")
    .bind(week, miles, day, dayUsed + add, now, uid)
    .run();
  return json({ ok: true, counted: add, miles });
}

/** When an account is deleted: its code, friendships and ranking row go too. */
export async function deleteSocialOf(db: D1Database, uid: string): Promise<void> {
  try {
    await db.batch([
      db.prepare("DELETE FROM bf_friends WHERE a = ? OR b = ?").bind(uid, uid),
      db.prepare("DELETE FROM bf_friend_codes WHERE uid = ?").bind(uid),
      db.prepare("DELETE FROM bf_rank WHERE uid = ?").bind(uid),
    ]);
  } catch {
    /* the tables are missing until their migration runs */
  }
}

export async function handleSocial(request: Request, url: URL): Promise<Response | null> {
  const path = url.pathname;
  if (path !== "/api/social" && !path.startsWith("/api/social/")) return null;
  const db = bindings().DB;
  if (!db) return json({ ok: false, error: "no_db" }, 503);
  try {
    const uid = await accountUid(request, db);
    if (!uid) return json({ ok: false, error: "signin" }, 401);
    if (path === "/api/social") {
      if (request.method !== "GET") return json({ ok: false, error: "method" }, 405, { allow: "GET" });
      return await handleGet(db, uid);
    }
    if (request.method !== "POST") return json({ ok: false, error: "method" }, 405, { allow: "POST" });
    if (!isSameOrigin(request, url)) return json({ ok: false }, 403);
    const route = path.slice("/api/social/".length);
    const body = await readJsonBody(request, 400);
    if (route === "me") return await handleMe(db, uid, body);
    if (route === "on") return await handleOn(db, uid, body);
    if (route === "peek") return await handlePeek(db, uid, body);
    if (route === "add") return await handleAdd(db, uid, body);
    if (route === "remove") return await handleRemove(db, uid, body);
    if (route === "code") return await handleNewCode(db, uid);
    if (route === "miles") return await handleMiles(db, uid, body);
    return json({ ok: false, error: "not_found" }, 404);
  } catch (error) {
    console.error("social error:", error instanceof Error ? error.message : "unknown");
    return json({ ok: false, error: "server" }, 500);
  }
}
