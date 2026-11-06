// The hidden reward (裏設定): answer a lot, get ファースト for a while, once.
//
// Right answers are counted here, on the server, so editing the browser's data can't fake them.
// The landing screen of a lesson sends its number of right answers. At most PER_LESSON count per
// lesson, at most PER_DAY a day (Japan time), and a lesson counts only GAP_MS after the last one,
// so answering at full speed (or sending requests by hand) gets there no sooner than studying.
// Reaching GOAL once gives ファースト for DAYS days. Nothing in the app mentions it before that,
// and the replies never say how far along an account is.
//
// Route (dispatched from server.ts):
//   POST /api/reward/tick  { n }  -> { ok, until, just }   (just: reached with this lesson)
import type { D1Database } from "@cloudflare/workers-types";

import { accountUid } from "./account.server";
import { bindings } from "./bindings.server";
import { rewardUntil } from "./entitlements.server";
import { isSameOrigin, json, num, readJsonBody, type Row } from "./http.server";

export const REWARD = { GOAL: 10_000, PER_DAY: 300, PER_LESSON: 60, GAP_MS: 20_000, DAYS: 90 } as const;
const DAY_MS = 86_400_000;
const JST_MS = 9 * 3_600_000;

function jstDay(ms: number): string {
  return new Date(ms + JST_MS).toISOString().slice(0, 10);
}

/** Counts one lesson's right answers; returns the new total, or null when this lesson didn't count. */
async function count(db: D1Database, uid: string, n: number, now: number): Promise<number | null> {
  const day = jstDay(now);
  const add = Math.min(Math.max(0, Math.floor(n)), REWARD.PER_LESSON);
  if (add < 1) return null;
  // today's count so far (0 on a new day); everything below is read from the row as it was
  const today = "(CASE WHEN bf_reward.day = ?4 THEN bf_reward.day_n ELSE 0 END)";
  const r = await db
    .prepare(
      "INSERT INTO bf_reward (uid, total, day, day_n, last_at) VALUES (?1, MIN(?2, ?3), ?4, MIN(?2, ?3), ?5) " +
        "ON CONFLICT(uid) DO UPDATE SET " +
        `total = bf_reward.total + MIN(?2, ?3 - ${today}), ` +
        `day_n = ${today} + MIN(?2, ?3 - ${today}), ` +
        "day = ?4, last_at = ?5 " +
        `WHERE ?5 - bf_reward.last_at >= ?6 AND ${today} < ?3 ` +
        "RETURNING total",
    )
    .bind(uid, add, REWARD.PER_DAY, day, now, REWARD.GAP_MS)
    .first<Row>();
  return r ? num(r.total) : null;
}

/** Gives ファースト once the goal is reached (only the first time); returns its end, or 0. */
async function grant(db: D1Database, uid: string, now: number): Promise<number> {
  const until = now + REWARD.DAYS * DAY_MS;
  const r = await db
    .prepare("UPDATE bf_reward SET granted_at = ?2, until = ?3 WHERE uid = ?1 AND granted_at = 0 AND total >= ?4 RETURNING until")
    .bind(uid, now, until, REWARD.GOAL)
    .first<Row>();
  return r ? num(r.until) : 0;
}

async function handleTick(request: Request, db: D1Database): Promise<Response> {
  const uid = await accountUid(request, db);
  if (!uid) return json({ ok: false, error: "signin" }, 401);
  const body = await readJsonBody(request, 200);
  const now = Date.now();
  const total = await count(db, uid, num(body?.n), now);
  const just = total !== null && total >= REWARD.GOAL ? await grant(db, uid, now) : 0;
  return json({ ok: true, until: just || (await rewardUntil(db, uid)), just: just > 0 });
}

export async function handleReward(request: Request, url: URL): Promise<Response | null> {
  if (!url.pathname.startsWith("/api/reward/")) return null;
  const db = bindings().DB;
  if (!db) return json({ ok: false, error: "no_db" }, 503);
  try {
    if (url.pathname !== "/api/reward/tick") return json({ ok: false, error: "not_found" }, 404);
    if (request.method !== "POST") return json({ ok: false, error: "method" }, 405, { allow: "POST" });
    if (!isSameOrigin(request, url)) return json({ ok: false }, 403);
    return await handleTick(request, db);
  } catch (error) {
    console.error("reward error:", error instanceof Error ? error.message : "unknown");
    return json({ ok: false, error: "server" }, 500);
  }
}
