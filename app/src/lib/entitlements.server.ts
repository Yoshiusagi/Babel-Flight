// What each account is allowed to use beyond the free app.
//
// Plans in bf_entitlements: "all" (the test account: every feature, no status locks, no daily AI
// limits), "family" (every class feature, First-class AI limits) and "friend-eiken" (a friend of the
// owner: only the 英検3級・準2級 lessons, mock tests and interview practice; the rest stays free).
// Plans that open single 検定 levels list them in PLAN_GRANTS; the page gets them as `grants`. Future paid plans
// (エコノミー / ビジネス / ファースト) should be written to the same table, and every paid feature
// checked with `fullAccess()` on the server / `entitled()` in the page, so the test account keeps
// getting everything.
//
// The hidden reward (裏設定, reward.server.ts) is kept in its own table, bf_reward, and shows here
// as `until`: ファースト (First-class AI limits on the server, cabinLv 3 in the page) until then.
//
// The test account is recognised by its sign-in email. Only a salted SHA-256 of the
// address is kept in the code (the repository is public). Once matched, the grant is
// stored by Firebase uid, so it stays even if the email check is removed later.
import type { D1Database } from "@cloudflare/workers-types";

import type { FirebaseClaims } from "./firebase-token.server";
import { sha256Hex, type Row } from "./http.server";

const SALT = "babel-flight:tester:";

/** sha256(SALT + lower-case email) of the accounts that get every feature. */
const TESTER_EMAIL_HASHES: readonly string[] = [
  "4733d10e34943cbf467e60ecf8991ff99a5eb26b0e5cbfcd436bc9fc5f7a49b7",
];

/**
 * sha256(SALT + lower-case email) of family accounts (the owner's brother): every class feature,
 * but the AI keeps First-class daily limits and the Stripe purchase test stays the owner's only.
 */
const FAMILY_EMAIL_HASHES: readonly string[] = [
  "da9591957bf899abe62d880c2d86fa1739233e9029071eab23870a51c716ec27",
];

/**
 * sha256(SALT + lower-case email) of friends of the owner who get single 検定 levels (plan
 * "friend-eiken"). Only these levels open; AI limits and everything else stay those of a free account.
 */
const FRIEND_EMAIL_HASHES: readonly string[] = [
  "3c701339c602753b5a09bc9302030379573f9a2866891433d757058fa4dd7916",
];

/** The 検定 levels (bank keys of the page) each partial plan opens. */
const PLAN_GRANTS: Readonly<Record<string, readonly string[]>> = {
  "friend-eiken": ["ek3", "ekp2"],
};

/** until: when the hidden reward's ファースト ends (ms; 0 = none, see reward.server.ts).
 *  grants: single 検定 levels open to this account (bank keys), see PLAN_GRANTS. */
export type Entitlements = { plan: string; all: boolean; family: boolean; until: number; grants: string[] };
export type AiTier = "all" | "family" | "free";

const FREE: Entitlements = { plan: "", all: false, family: false, until: 0, grants: [] };

/** Called when someone signs in: records the "all" plan for the test account. */
export async function grantOnSignIn(db: D1Database, claims: FirebaseClaims): Promise<void> {
  if (!claims.email) return;
  // Email sign-up keeps one account per address, so the owner's existing account is the only match.
  if (!claims.emailVerified && claims.provider !== "password") return;
  const hash = await sha256Hex(SALT + claims.email);
  if (FAMILY_EMAIL_HASHES.includes(hash)) {
    // never lowers an account that already has "all"
    await db
      .prepare(
        "INSERT INTO bf_entitlements (uid, plan, source, granted_at) VALUES (?, 'family', 'family', ?) " +
          "ON CONFLICT(uid) DO UPDATE SET plan = 'family', source = 'family' WHERE bf_entitlements.plan <> 'all'",
      )
      .bind(claims.uid, Date.now())
      .run();
    return;
  }
  if (FRIEND_EMAIL_HASHES.includes(hash)) {
    // only for an account without a plan of its own (never lowers "all", "family" or a paid plan)
    await db
      .prepare(
        "INSERT INTO bf_entitlements (uid, plan, source, granted_at) VALUES (?, 'friend-eiken', 'friend', ?) " +
          "ON CONFLICT(uid) DO UPDATE SET plan = 'friend-eiken', source = 'friend' WHERE bf_entitlements.plan IN ('', 'friend-eiken')",
      )
      .bind(claims.uid, Date.now())
      .run();
    return;
  }
  if (!TESTER_EMAIL_HASHES.includes(hash)) return;
  await db
    .prepare(
      "INSERT INTO bf_entitlements (uid, plan, source, granted_at) VALUES (?, 'all', 'tester', ?) " +
        "ON CONFLICT(uid) DO UPDATE SET plan = 'all', source = 'tester'",
    )
    .bind(claims.uid, Date.now())
    .run();
}

/** When the hidden reward's ファースト ends (ms; 0 = none). A missing table counts as none. */
export async function rewardUntil(db: D1Database, uid: string): Promise<number> {
  try {
    const r = await db.prepare("SELECT until FROM bf_reward WHERE uid = ?").bind(uid).first<Row>();
    return Number(r?.until) || 0;
  } catch {
    return 0;
  }
}

export async function entitlementsOf(db: D1Database, uid: string): Promise<Entitlements> {
  const row = await db.prepare("SELECT plan FROM bf_entitlements WHERE uid = ?").bind(uid).first<Row>();
  const until = await rewardUntil(db, uid);
  if (!row || typeof row.plan !== "string") return { ...FREE, until };
  return { plan: row.plan, all: row.plan === "all", family: row.plan === "family", until, grants: [...(PLAN_GRANTS[row.plan] ?? [])] };
}

/** How much AI the account gets per day: unlimited (test account), First-class (family, or the
 *  hidden reward while it lasts) or free. */
export async function aiTier(db: D1Database, uid: string): Promise<AiTier> {
  const e = await entitlementsOf(db, uid);
  return e.all ? "all" : e.family || e.until > Date.now() ? "family" : "free";
}

/** True when the account may use every feature, including paid ones and unlimited AI. */
export async function fullAccess(db: D1Database, uid: string): Promise<boolean> {
  return (await entitlementsOf(db, uid)).all;
}
