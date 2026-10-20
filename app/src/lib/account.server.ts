// Optional Babel Flight accounts: sign-in happens in the browser with Firebase
// Authentication (Google or email + password); this server verifies the Firebase
// ID token once, then keeps its own HttpOnly session and stores the learner's
// progress so it can sync between devices.
//
// Stored here: Firebase user id, sign-in method, timestamps, the progress JSON.
// NOT stored here: email addresses or passwords (Firebase keeps those).
//
// Routes (dispatched from server.ts before the SSR handler):
//   GET  /privacy               privacy policy page
//   GET  /api/account/config    { enabled, firebase } public web config
//   POST /api/account/session   { idToken } -> session cookie
//   GET  /api/account/me        current account or 401
//   GET  /api/account/save      { rev, t, data }
//   PUT  /api/account/save      { data, t, baseRev, force? } -> { rev } | 409 with the newer copy
//   POST /api/account/logout
//   POST /api/account/delete    { idToken } from a sign-in made in the last 10 minutes
import type { D1Database } from "@cloudflare/workers-types";

import PRIVACY_HTML from "../privacy.html?raw";
import { bindings } from "./bindings.server";
import { ALLOWED_PROVIDERS, FIREBASE_WEB_CONFIG } from "./firebase-config";
import { KeysUnavailableError, verifyFirebaseIdToken, type FirebaseClaims } from "./firebase-token.server";
import { isSameOrigin, json, num, randomHex, readCookie, readJsonBody, sha256Hex, type Row } from "./http.server";

const COOKIE = "bf_acct";
const SESSION_MS = 90 * 86_400_000;
const SESSION_EXTEND_AFTER_MS = 7 * 86_400_000;
const TOKEN_RE = /^[0-9a-f]{64}$/;
const MAX_SAVE_CHARS = 1_000_000;
const MAX_SAVE_BODY = 1_600_000;
const RECENT_SIGN_IN_S = 600;

type Session = { uid: string; token: string; tokenHash: string; expires: number };

function sessionCookie(token: string, maxAgeSeconds: number, path = "/api"): string {
  return `${COOKIE}=${token}; Path=${path}; HttpOnly; Secure; SameSite=Strict; Max-Age=${maxAgeSeconds}`;
}

/** Expires the session cookie, including the narrower /api/account one issued before AI routes existed. */
function withClearedCookies(res: Response): Response {
  res.headers.append("set-cookie", sessionCookie("", 0));
  res.headers.append("set-cookie", sessionCookie("", 0, "/api/account"));
  return res;
}

async function currentSession(request: Request, db: D1Database): Promise<Session | null> {
  const token = readCookie(request, COOKIE);
  if (!token || !TOKEN_RE.test(token)) return null;
  const tokenHash = await sha256Hex(token);
  const row = await db
    .prepare("SELECT uid, expires FROM bf_acct_sessions WHERE token_hash = ?")
    .bind(tokenHash)
    .first<Row>();
  if (!row || typeof row.uid !== "string" || num(row.expires) <= Date.now()) return null;
  return { uid: row.uid, token, tokenHash, expires: num(row.expires) };
}

async function newSession(db: D1Database, uid: string): Promise<string> {
  const token = randomHex(32);
  const now = Date.now();
  await db.batch([
    db.prepare("DELETE FROM bf_acct_sessions WHERE expires < ?").bind(now),
    db
      .prepare("INSERT INTO bf_acct_sessions (token_hash, uid, expires) VALUES (?, ?, ?)")
      .bind(await sha256Hex(token), uid, now + SESSION_MS),
  ]);
  return token;
}

/** null = invalid token; throws KeysUnavailableError when Google's keys can't be fetched. */
async function claimsFrom(body: Row | null, projectId: string): Promise<FirebaseClaims | null> {
  try {
    return await verifyFirebaseIdToken(body?.idToken, projectId, ALLOWED_PROVIDERS);
  } catch (error) {
    if (error instanceof KeysUnavailableError) throw error;
    return null;
  }
}

function signedOut(): Response {
  return withClearedCookies(json({ ok: false, error: "signed_out" }, 401));
}

/** The signed-in account's uid, or null. Used by the AI routes. */
export async function accountUid(request: Request, db: D1Database): Promise<string | null> {
  const session = await currentSession(request, db);
  return session ? session.uid : null;
}

/* ---------- handlers ---------- */

async function handleSession(request: Request, db: D1Database, projectId: string): Promise<Response> {
  const claims = await claimsFrom(await readJsonBody(request, 8192), projectId);
  if (!claims) return json({ ok: false, error: "bad_token" }, 401);
  if (Date.now() / 1000 - claims.authTime > RECENT_SIGN_IN_S) return json({ ok: false, error: "stale_sign_in" }, 401);

  const now = Date.now();
  const existing = await db.prepare("SELECT created_at FROM bf_users WHERE uid = ?").bind(claims.uid).first<Row>();
  await db
    .prepare(
      "INSERT INTO bf_users (uid, provider, created_at, last_login) VALUES (?, ?, ?, ?) " +
        "ON CONFLICT(uid) DO UPDATE SET provider = excluded.provider, last_login = excluded.last_login",
    )
    .bind(claims.uid, claims.provider, now, now)
    .run();
  const token = await newSession(db, claims.uid);
  return json(
    { ok: true, uid: claims.uid, provider: claims.provider, isNew: !existing },
    200,
    { "set-cookie": sessionCookie(token, SESSION_MS / 1000) },
  );
}

async function handleMe(request: Request, db: D1Database): Promise<Response> {
  const session = await currentSession(request, db);
  if (!session) return signedOut();
  const user = await db
    .prepare("SELECT provider, created_at FROM bf_users WHERE uid = ?")
    .bind(session.uid)
    .first<Row>();
  if (!user) {
    await db.prepare("DELETE FROM bf_acct_sessions WHERE token_hash = ?").bind(session.tokenHash).run();
    return signedOut();
  }
  const now = Date.now();
  let expires = session.expires;
  // Sliding session: an account that keeps being used stays signed in.
  if (session.expires - now < SESSION_MS - SESSION_EXTEND_AFTER_MS) {
    expires = now + SESSION_MS;
    await db.prepare("UPDATE bf_acct_sessions SET expires = ? WHERE token_hash = ?").bind(expires, session.tokenHash).run();
  }
  return json(
    { ok: true, uid: session.uid, provider: String(user.provider), createdAt: num(user.created_at) },
    200,
    { "set-cookie": sessionCookie(session.token, Math.max(1, Math.floor((expires - now) / 1000))) },
  );
}

async function readSave(db: D1Database, uid: string): Promise<{ rev: number; t: number; data: string | null }> {
  const row = await db.prepare("SELECT data, t, rev FROM bf_saves WHERE uid = ?").bind(uid).first<Row>();
  return row
    ? { rev: num(row.rev), t: num(row.t), data: typeof row.data === "string" ? row.data : null }
    : { rev: 0, t: 0, data: null };
}

async function handleGetSave(request: Request, db: D1Database): Promise<Response> {
  const session = await currentSession(request, db);
  if (!session) return signedOut();
  return json({ ok: true, ...(await readSave(db, session.uid)) });
}

async function handlePutSave(request: Request, db: D1Database): Promise<Response> {
  const session = await currentSession(request, db);
  if (!session) return signedOut();
  const body = await readJsonBody(request, MAX_SAVE_BODY);
  const data = body?.data;
  const t = num(body?.t);
  const baseRev = num(body?.baseRev);
  const force = body?.force === true;
  if (typeof data !== "string" || data.length > MAX_SAVE_CHARS || t < 0 || baseRev < 0 || !Number.isInteger(baseRev)) {
    return json({ ok: false, error: "bad_request" }, 400);
  }
  try {
    const parsed: unknown = JSON.parse(data);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("not an object");
  } catch {
    return json({ ok: false, error: "bad_data" }, 400);
  }

  const now = Date.now();
  let changes = 0;
  if (force) {
    const r = await db
      .prepare(
        "INSERT INTO bf_saves (uid, data, t, rev, updated_at) VALUES (?, ?, ?, 1, ?) " +
          "ON CONFLICT(uid) DO UPDATE SET data = excluded.data, t = excluded.t, rev = bf_saves.rev + 1, updated_at = excluded.updated_at",
      )
      .bind(session.uid, data, t, now)
      .run();
    changes = num((r.meta as Row | undefined)?.changes);
  } else if (baseRev === 0) {
    const r = await db
      .prepare("INSERT INTO bf_saves (uid, data, t, rev, updated_at) VALUES (?, ?, ?, 1, ?) ON CONFLICT(uid) DO NOTHING")
      .bind(session.uid, data, t, now)
      .run();
    changes = num((r.meta as Row | undefined)?.changes);
  } else {
    const r = await db
      .prepare("UPDATE bf_saves SET data = ?, t = ?, rev = rev + 1, updated_at = ? WHERE uid = ? AND rev = ?")
      .bind(data, t, now, session.uid, baseRev)
      .run();
    changes = num((r.meta as Row | undefined)?.changes);
  }

  const current = await readSave(db, session.uid);
  if (changes < 1) return json({ ok: false, error: "conflict", ...current }, 409);
  return json({ ok: true, rev: current.rev });
}

async function handleLogout(request: Request, db: D1Database): Promise<Response> {
  const token = readCookie(request, COOKIE);
  if (token && TOKEN_RE.test(token)) {
    await db.prepare("DELETE FROM bf_acct_sessions WHERE token_hash = ?").bind(await sha256Hex(token)).run();
  }
  return withClearedCookies(json({ ok: true }));
}

async function handleDelete(request: Request, db: D1Database, projectId: string): Promise<Response> {
  const session = await currentSession(request, db);
  if (!session) return signedOut();
  const claims = await claimsFrom(await readJsonBody(request, 8192), projectId);
  if (!claims) return json({ ok: false, error: "bad_token" }, 401);
  if (claims.uid !== session.uid) return json({ ok: false, error: "other_account" }, 403);
  if (Date.now() / 1000 - claims.authTime > RECENT_SIGN_IN_S) return json({ ok: false, error: "reauth" }, 403);
  await db.batch([
    db.prepare("DELETE FROM bf_saves WHERE uid = ?").bind(session.uid),
    db.prepare("DELETE FROM bf_acct_sessions WHERE uid = ?").bind(session.uid),
    db.prepare("DELETE FROM bf_users WHERE uid = ?").bind(session.uid),
    db.prepare("DELETE FROM bf_ai_usage WHERE uid = ?").bind(session.uid),
  ]);
  return withClearedCookies(json({ ok: true }));
}

/* ---------- dispatcher ---------- */

export async function handleAccount(request: Request, url: URL): Promise<Response | null> {
  const path = url.pathname;
  if (path === "/privacy/") return Response.redirect(`${url.origin}/privacy`, 301);
  if (path === "/privacy") {
    if (request.method !== "GET" && request.method !== "HEAD") {
      return new Response("Method Not Allowed", { status: 405, headers: { allow: "GET, HEAD" } });
    }
    return new Response(request.method === "HEAD" ? null : PRIVACY_HTML, {
      headers: { "content-type": "text/html; charset=utf-8", "cache-control": "public, max-age=600" },
    });
  }
  if (!path.startsWith("/api/account/")) return null;

  const route = path.slice("/api/account/".length);
  const config = FIREBASE_WEB_CONFIG;
  if (route === "config" && request.method === "GET") {
    return json({ enabled: !!config, firebase: config });
  }
  if (!config) return json({ ok: false, error: "disabled" }, 503);
  const db = bindings().DB;
  if (!db) return json({ ok: false, error: "no_db" }, 503);

  try {
    if (request.method === "GET") {
      if (route === "me") return await handleMe(request, db);
      if (route === "save") return await handleGetSave(request, db);
      return json({ ok: false, error: "not_found" }, 404);
    }
    if (request.method !== "POST" && request.method !== "PUT") {
      return json({ ok: false, error: "method" }, 405, { allow: "GET, POST, PUT" });
    }
    if (!isSameOrigin(request, url)) return json({ ok: false }, 403);
    if (request.method === "PUT" && route === "save") return await handlePutSave(request, db);
    if (request.method === "POST") {
      if (route === "session") return await handleSession(request, db, config.projectId);
      if (route === "logout") return await handleLogout(request, db);
      if (route === "delete") return await handleDelete(request, db, config.projectId);
    }
    return json({ ok: false, error: "not_found" }, 404);
  } catch (error) {
    if (error instanceof KeysUnavailableError) return json({ ok: false, error: "keys_unavailable" }, 502);
    console.error("account error:", error instanceof Error ? error.message : "unknown");
    return json({ ok: false, error: "server" }, 500);
  }
}
