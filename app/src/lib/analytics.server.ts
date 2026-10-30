// Anonymous usage counting for Babel Flight and the passphrase-protected /stats page.
//
// What is stored: a random per-browser id (made in the browser, not linked to a
// person), the Japan-time date, and which language / mode a lesson used.
// What is NOT stored: names, IP addresses, user agents, answers.
//
// Routes (dispatched from server.ts before the SSR handler):
//   POST /api/hit            record one visit or lesson start (same-origin only)
//   GET  /stats              the dashboard page (static HTML, data loaded by fetch)
//   GET  /api/stats/state    { configured, authed }
//   POST /api/stats/setup    first visit only: choose the passphrase
//   POST /api/stats/login    passphrase -> HttpOnly session cookie
//   POST /api/stats/logout
//   GET  /api/stats/data     aggregated numbers (session required)
import type { D1Database } from "@cloudflare/workers-types";

import STATS_HTML from "../stats.html?raw";
import { bindings } from "./bindings.server";
import {
  encoder,
  fromHex,
  isSameOrigin,
  json,
  noContent,
  num,
  randomHex,
  readCookie,
  readJsonBody,
  sha256Hex,
  timingSafeEqualHex,
  toHex,
  type Row,
} from "./http.server";

const LANGS = new Set(["ko", "en", "es", "it", "zh", "fr", "de", "pt"]);
const MODES = new Set(["daily", "job", "study", "exam"]);
const KINDS = new Set(["visit", "lesson"]);
const TRACK_RE = /^[a-z0-9-]{1,24}$/;
const VID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
const TOKEN_RE = /^[0-9a-f]{64}$/;

const COOKIE = "bf_stats";
const SESSION_MS = 30 * 86_400_000;
const PBKDF2_ITER = 100_000;
const MAX_FAILS_PER_HOUR = 20;
const VISITOR_DAILY_CAP = 300;
const SITE_DAILY_CAP = 50_000;
const MAX_BODY = 2048;
const JST_MS = 9 * 3_600_000;
const DAY_MS = 86_400_000;

type Range = "30d" | "12m" | "all";
type Buckets = { len: number; start: string; keys: string[]; unit: "day" | "month" | "year" };

function jstDay(ms: number): string {
  return new Date(ms + JST_MS).toISOString().slice(0, 10);
}

function readBody(request: Request): Promise<Row | null> {
  return readJsonBody(request, MAX_BODY);
}

/* ---------- crypto helpers ---------- */

async function pbkdf2Hex(pass: string, saltHex: string, iterations: number): Promise<string> {
  const key = await crypto.subtle.importKey("raw", encoder.encode(pass), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", hash: "SHA-256", salt: fromHex(saltHex), iterations },
    key,
    256,
  );
  return toHex(bits);
}

/* ---------- session ---------- */

function sessionCookie(token: string, maxAgeSeconds: number): string {
  return `${COOKIE}=${token}; Path=/api/stats; HttpOnly; Secure; SameSite=Strict; Max-Age=${maxAgeSeconds}`;
}

async function isAuthed(request: Request, db: D1Database): Promise<boolean> {
  const token = readCookie(request, COOKIE);
  if (!token || !TOKEN_RE.test(token)) return false;
  const row = await db
    .prepare("SELECT expires FROM bf_sessions WHERE token_hash = ?")
    .bind(await sha256Hex(token))
    .first<Row>();
  return !!row && num(row.expires) > Date.now();
}

async function startSession(db: D1Database): Promise<Response> {
  const token = randomHex(32);
  const now = Date.now();
  await db.batch([
    db.prepare("DELETE FROM bf_sessions WHERE expires < ?").bind(now),
    db
      .prepare("INSERT INTO bf_sessions (token_hash, expires) VALUES (?, ?)")
      .bind(await sha256Hex(token), now + SESSION_MS),
  ]);
  return json({ ok: true }, 200, { "set-cookie": sessionCookie(token, SESSION_MS / 1000) });
}

function readPass(body: Row | null): string | null {
  const pass = body?.pass;
  if (typeof pass !== "string") return null;
  const length = [...pass].length;
  return length >= 6 && length <= 64 ? pass : null;
}

/* ---------- handlers ---------- */

async function handleHit(request: Request, db: D1Database): Promise<Response> {
  const body = await readBody(request);
  if (!body) return json({ ok: false }, 400);
  const vid = typeof body.vid === "string" ? body.vid.toLowerCase() : "";
  const kind = typeof body.kind === "string" ? body.kind : "";
  const lang = typeof body.lang === "string" ? body.lang : "";
  const mode = typeof body.mode === "string" ? body.mode : "";
  const track = typeof body.track === "string" ? body.track : "";
  if (
    !VID_RE.test(vid) ||
    !KINDS.has(kind) ||
    !LANGS.has(lang) ||
    !MODES.has(mode) ||
    (track !== "" && !TRACK_RE.test(track))
  ) {
    return json({ ok: false }, 400);
  }

  const now = Date.now();
  const day = jstDay(now);
  const caps = await db
    .prepare(
      "SELECT (SELECT COUNT(*) FROM bf_events WHERE vid = ? AND day = ?) AS mine, " +
        "(SELECT COUNT(*) FROM bf_events WHERE day = ?) AS total",
    )
    .bind(vid, day, day)
    .first<Row>();
  if (caps && (num(caps.mine) >= VISITOR_DAILY_CAP || num(caps.total) >= SITE_DAILY_CAP)) {
    return noContent();
  }

  await db.batch([
    db
      .prepare(
        "INSERT INTO bf_visitors (vid, first_day, last_day) VALUES (?, ?, ?) " +
          "ON CONFLICT(vid) DO UPDATE SET last_day = excluded.last_day",
      )
      .bind(vid, day, day),
    db
      .prepare("INSERT INTO bf_events (day, ts, vid, kind, lang, mode, track) VALUES (?, ?, ?, ?, ?, ?, ?)")
      .bind(day, now, vid, kind, lang, mode, track),
  ]);
  return noContent();
}

async function handleState(request: Request, db: D1Database): Promise<Response> {
  const auth = await db.prepare("SELECT 1 AS x FROM bf_auth WHERE id = 1").first<Row>();
  return json({ configured: !!auth, authed: auth ? await isAuthed(request, db) : false });
}

async function handleSetup(request: Request, db: D1Database): Promise<Response> {
  const pass = readPass(await readBody(request));
  if (!pass) return json({ ok: false, error: "bad_pass" }, 400);
  const salt = randomHex(16);
  const hash = await pbkdf2Hex(pass, salt, PBKDF2_ITER);
  const result = await db
    .prepare("INSERT OR IGNORE INTO bf_auth (id, salt, hash, iter, created_at) VALUES (1, ?, ?, ?, ?)")
    .bind(salt, hash, PBKDF2_ITER, Date.now())
    .run();
  const changes = num((result.meta as Row | undefined)?.changes);
  if (changes < 1) return json({ ok: false, error: "already_set" }, 409);
  return startSession(db);
}

async function handleLogin(request: Request, db: D1Database): Promise<Response> {
  const hour = Math.floor(Date.now() / 3_600_000);
  const fails = await db.prepare("SELECT n FROM bf_login_fail WHERE hour = ?").bind(hour).first<Row>();
  if (fails && num(fails.n) >= MAX_FAILS_PER_HOUR) return json({ ok: false, error: "locked" }, 429);

  const pass = readPass(await readBody(request));
  const auth = await db.prepare("SELECT salt, hash, iter FROM bf_auth WHERE id = 1").first<Row>();
  if (!auth) return json({ ok: false, error: "not_set" }, 409);

  const ok =
    pass !== null &&
    timingSafeEqualHex(await pbkdf2Hex(pass, String(auth.salt), num(auth.iter)), String(auth.hash));
  if (!ok) {
    await db.batch([
      db.prepare("DELETE FROM bf_login_fail WHERE hour < ?").bind(hour - 48),
      db
        .prepare("INSERT INTO bf_login_fail (hour, n) VALUES (?, 1) ON CONFLICT(hour) DO UPDATE SET n = n + 1")
        .bind(hour),
    ]);
    return json({ ok: false, error: "wrong" }, 401);
  }
  return startSession(db);
}

async function handleLogout(request: Request, db: D1Database): Promise<Response> {
  const token = readCookie(request, COOKIE);
  if (token && TOKEN_RE.test(token)) {
    await db.prepare("DELETE FROM bf_sessions WHERE token_hash = ?").bind(await sha256Hex(token)).run();
  }
  return json({ ok: true }, 200, { "set-cookie": sessionCookie("", 0) });
}

function bucketsFor(range: Range, now: number, firstDay: string | null): Buckets {
  const today = jstDay(now);
  const keys: string[] = [];
  if (range === "12m") {
    const monthIndex = Number(today.slice(0, 4)) * 12 + Number(today.slice(5, 7)) - 1;
    for (let i = 11; i >= 0; i--) {
      const t = monthIndex - i;
      keys.push(`${Math.floor(t / 12)}-${String((t % 12) + 1).padStart(2, "0")}`);
    }
    return { len: 7, start: `${keys[0] ?? today.slice(0, 7)}-01`, keys, unit: "month" };
  }
  if (range === "all") {
    const thisYear = Number(today.slice(0, 4));
    const firstYear = firstDay ? Math.min(thisYear, Number(firstDay.slice(0, 4)) || thisYear) : thisYear;
    for (let y = firstYear; y <= thisYear; y++) keys.push(String(y));
    return { len: 4, start: `${firstYear}-01-01`, keys, unit: "year" };
  }
  for (let i = 29; i >= 0; i--) keys.push(jstDay(now - i * DAY_MS));
  return { len: 10, start: keys[0] ?? today, keys, unit: "day" };
}

function rowsOf(result: { results?: Row[] } | undefined): Row[] {
  return result?.results ?? [];
}

async function handleData(request: Request, url: URL, db: D1Database): Promise<Response> {
  if (!(await isAuthed(request, db))) return json({ ok: false, error: "auth" }, 401);
  const param = url.searchParams.get("range");
  const range: Range = param === "12m" || param === "all" ? param : "30d";

  const now = Date.now();
  const today = jstDay(now);
  const yesterday = jstDay(now - DAY_MS);
  const monthStart = `${today.slice(0, 7)}-01`;
  const yearStart = `${today.slice(0, 4)}-01-01`;

  const visitors = await db
    .prepare(
      "SELECT COUNT(*) AS total, " +
        "SUM(CASE WHEN first_day = ? THEN 1 ELSE 0 END) AS today_new, " +
        "SUM(CASE WHEN first_day >= ? THEN 1 ELSE 0 END) AS month_new, " +
        "SUM(CASE WHEN first_day >= ? THEN 1 ELSE 0 END) AS year_new, " +
        "MIN(first_day) AS first_day FROM bf_visitors",
    )
    .bind(today, monthStart, yearStart)
    .first<Row>();
  const firstDay = typeof visitors?.first_day === "string" ? visitors.first_day : null;
  const b = bucketsFor(range, now, firstDay);

  const [kpiRes, seriesRes, freshRes, langRes, modeRes] = await db.batch<Row>([
    db
      .prepare(
        "SELECT " +
          "SUM(CASE WHEN kind = 'visit' AND day = ? THEN 1 ELSE 0 END) AS tv, " +
          "SUM(CASE WHEN kind = 'visit' AND day = ? THEN 1 ELSE 0 END) AS yv, " +
          "COUNT(DISTINCT CASE WHEN day = ? THEN vid END) AS tu, " +
          "SUM(CASE WHEN kind = 'visit' AND day >= ? THEN 1 ELSE 0 END) AS mv, " +
          "COUNT(DISTINCT CASE WHEN day >= ? THEN vid END) AS mu, " +
          "SUM(CASE WHEN kind = 'visit' AND day >= ? THEN 1 ELSE 0 END) AS yrv, " +
          "COUNT(DISTINCT CASE WHEN day >= ? THEN vid END) AS yru, " +
          "SUM(CASE WHEN kind = 'visit' THEN 1 ELSE 0 END) AS av, " +
          "SUM(CASE WHEN kind = 'lesson' THEN 1 ELSE 0 END) AS al " +
          "FROM bf_events",
      )
      .bind(today, yesterday, today, monthStart, monthStart, yearStart, yearStart),
    db
      .prepare(
        "SELECT substr(day, 1, ?) AS k, " +
          "SUM(CASE WHEN kind = 'visit' THEN 1 ELSE 0 END) AS v, " +
          "COUNT(DISTINCT vid) AS u, " +
          "SUM(CASE WHEN kind = 'lesson' THEN 1 ELSE 0 END) AS l " +
          "FROM bf_events WHERE day >= ? GROUP BY k",
      )
      .bind(b.len, b.start),
    db
      .prepare("SELECT substr(first_day, 1, ?) AS k, COUNT(*) AS n FROM bf_visitors WHERE first_day >= ? GROUP BY k")
      .bind(b.len, b.start),
    db
      .prepare(
        "SELECT lang AS k, COUNT(*) AS n, COUNT(DISTINCT vid) AS u FROM bf_events " +
          "WHERE kind = 'lesson' AND day >= ? GROUP BY lang",
      )
      .bind(b.start),
    db
      .prepare(
        "SELECT mode AS k, COUNT(*) AS n, COUNT(DISTINCT vid) AS u FROM bf_events " +
          "WHERE kind = 'lesson' AND day >= ? GROUP BY mode",
      )
      .bind(b.start),
  ]);

  const byKey = new Map<string, Row>();
  for (const r of rowsOf(seriesRes)) byKey.set(String(r.k), r);
  const newByKey = new Map<string, number>();
  for (const r of rowsOf(freshRes)) newByKey.set(String(r.k), num(r.n));

  const series = b.keys.map((k) => {
    const r = byKey.get(k);
    const users = num(r?.u);
    const newUsers = Math.min(users, newByKey.get(k) ?? 0);
    return { k, visits: num(r?.v), users, newUsers, returning: users - newUsers, lessons: num(r?.l) };
  });
  const pick = (res: { results?: Row[] } | undefined) =>
    rowsOf(res).map((r) => ({ k: String(r.k), n: num(r.n), u: num(r.u) }));

  const k = rowsOf(kpiRes)[0] ?? {};
  return json({
    ok: true,
    range,
    unit: b.unit,
    today,
    since: firstDay,
    kpi: {
      today: { visits: num(k.tv), users: num(k.tu), newUsers: num(visitors?.today_new) },
      yesterday: { visits: num(k.yv) },
      month: { visits: num(k.mv), users: num(k.mu), newUsers: num(visitors?.month_new) },
      year: { visits: num(k.yrv), users: num(k.yru), newUsers: num(visitors?.year_new) },
      total: { visits: num(k.av), users: num(visitors?.total), lessons: num(k.al) },
    },
    series,
    langs: pick(langRes),
    modes: pick(modeRes),
  });
}

/* ---------- dispatcher ---------- */

export async function handleAnalytics(request: Request, url: URL): Promise<Response | null> {
  const path = url.pathname;

  if (path === "/stats/") return Response.redirect(`${url.origin}/stats`, 301);
  if (path === "/stats") {
    if (request.method !== "GET" && request.method !== "HEAD") {
      return new Response("Method Not Allowed", { status: 405, headers: { allow: "GET, HEAD" } });
    }
    return new Response(request.method === "HEAD" ? null : STATS_HTML, {
      headers: {
        "content-type": "text/html; charset=utf-8",
        "cache-control": "no-store",
        "x-robots-tag": "noindex, nofollow",
      },
    });
  }

  const isHit = path === "/api/hit";
  if (!isHit && !path.startsWith("/api/stats/")) return null;

  const db = bindings().DB;
  if (!db) return json({ ok: false, error: "no_db" }, 503);

  try {
    if (isHit) {
      if (request.method !== "POST") return json({ ok: false }, 405, { allow: "POST" });
      if (!isSameOrigin(request, url)) return json({ ok: false }, 403);
      return await handleHit(request, db);
    }
    const route = path.slice("/api/stats/".length);
    if (request.method === "GET") {
      if (route === "state") return await handleState(request, db);
      if (route === "data") return await handleData(request, url, db);
    } else if (request.method === "POST") {
      if (!isSameOrigin(request, url)) return json({ ok: false }, 403);
      if (route === "setup") return await handleSetup(request, db);
      if (route === "login") return await handleLogin(request, db);
      if (route === "logout") return await handleLogout(request, db);
    }
    return json({ ok: false, error: "not_found" }, 404);
  } catch (error) {
    console.error("analytics error:", error instanceof Error ? error.message : "unknown");
    return json({ ok: false, error: "server" }, 500);
  }
}
