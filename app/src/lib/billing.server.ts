// Paid classes (プレミアムエコノミー / ビジネス / ファースト) through Stripe.
//
// For now this runs in Stripe's test mode only (no real money): a live key is ignored until
// LIVE_ALLOWED in stripe.server.ts is switched on, which should happen only after the
// 特定商取引法に基づく表記 and 利用規約 pages are published. Only accounts with full access
// (the owner's test account) may buy; everyone else sees nothing new. Website only: the iPhone
// app neither shows nor reaches these routes (App Store rules for digital goods).
//
// Routes (dispatched from server.ts):
//   GET  /api/billing/status     { ok, enabled, test, plans, sub }
//   POST /api/billing/checkout   { plan, agree: true, guardian: true } -> { ok, url } (Stripe Checkout)
//   POST /api/billing/portal     -> { ok, url } (Stripe's page to change plan, cancel, update the card)
//   POST /api/billing/webhook    Stripe events, signature checked
//
// Website secrets (Higgsfield website settings): STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET.
// Prices and the customer-portal settings are created here on first use (found again by lookup
// key / metadata), so the only thing to set up in the Stripe dashboard is the webhook endpoint.
// Each plan has a monthly and a yearly price (both include consumption tax). A payment that fails
// on renewal (past_due / unpaid) drops the account to エコノミー at once; it comes back by itself
// when Stripe's retry succeeds.
import type { D1Database } from "@cloudflare/workers-types";

import { accountUid } from "./account.server";
import { bindings } from "./bindings.server";
import { fullAccess } from "./entitlements.server";
import { appOrigin, isSameOrigin, json, num, readJsonBody, type Row } from "./http.server";
import {
  GRANT_STATUSES,
  LIVE_ALLOWED,
  LIVE_STATUSES,
  stripe,
  StripeError,
  stripeKeys,
  verifyStripeSignature,
  type StripeKeys,
} from "./stripe.server";

export const PLANS = {
  // yearly: 12% / 17% / 22% off twelve months (the higher the class, the bigger the saving)
  premium: { name: "プレミアムエコノミー", amount: 500, yearly: 5280, level: 1 },
  business: { name: "ビジネス", amount: 800, yearly: 7980, level: 2 },
  first: { name: "ファースト", amount: 1280, yearly: 11980, level: 3 },
} as const;
export type PlanKey = keyof typeof PLANS;
export type Interval = "month" | "year";
const PLAN_KEYS = Object.keys(PLANS) as PlanKey[];
const INTERVALS: Interval[] = ["month", "year"];
const MAX_WEBHOOK_BODY = 262_144;

function priceAmount(plan: PlanKey, iv: Interval): number {
  return iv === "year" ? PLANS[plan].yearly : PLANS[plan].amount;
}
export function lookupKey(plan: PlanKey, iv: Interval = "month"): string {
  return `bf_${plan}_jpy${priceAmount(plan, iv)}_${iv === "year" ? "yearly" : "monthly"}`;
}
function priceFromLookup(key: unknown): { plan: PlanKey; iv: Interval } | null {
  for (const plan of PLAN_KEYS) for (const iv of INTERVALS) if (lookupKey(plan, iv) === key) return { plan, iv };
  return null;
}
function isPlan(v: unknown): v is PlanKey {
  return typeof v === "string" && (PLAN_KEYS as string[]).includes(v);
}
/** Percent saved by paying yearly instead of twelve months. */
function yearlySaving(plan: PlanKey): number {
  return Math.round((1 - PLANS[plan].yearly / (PLANS[plan].amount * 12)) * 100);
}

type PriceRef = { price: string; product: string };
type PlanPrices = Record<Interval, PriceRef>;
let PRICES: { secret: string; map: Record<PlanKey, PlanPrices> } | null = null;
let PORTAL: { secret: string; id: string } | null = null;

/** The monthly and yearly Stripe prices of each plan, created the first time they are needed. */
async function ensurePrices(keys: StripeKeys): Promise<Record<PlanKey, PlanPrices>> {
  if (PRICES && PRICES.secret === keys.secret) return PRICES.map;
  const wanted = PLAN_KEYS.flatMap((p) => INTERVALS.map((iv) => lookupKey(p, iv)));
  const found = await stripe(keys, "GET", "prices", { lookup_keys: wanted, active: "true", limit: 20 });
  const map: Partial<Record<PlanKey, Partial<PlanPrices>>> = {};
  for (const p of (Array.isArray(found.data) ? found.data : []) as Row[]) {
    const hit = priceFromLookup(p.lookup_key);
    if (hit) (map[hit.plan] ??= {})[hit.iv] = { price: String(p.id), product: String(p.product) };
  }
  for (const plan of PLAN_KEYS) {
    const have = (map[plan] ??= {});
    for (const iv of INTERVALS) {
      if (have[iv]) continue;
      // Both prices live on one product, so the portal can switch between monthly and yearly.
      const product = have.month?.product ?? have.year?.product;
      const p = await stripe(
        keys,
        "POST",
        "prices",
        {
          currency: "jpy",
          unit_amount: priceAmount(plan, iv),
          recurring: { interval: iv },
          lookup_key: lookupKey(plan, iv),
          product: product || undefined,
          product_data: product ? undefined : { name: `Babel Flight ${PLANS[plan].name}` },
          metadata: { app: "babel-flight", plan, interval: iv },
        },
        `bf-price-${lookupKey(plan, iv)}${product ? `-${product}` : ""}`,
      );
      have[iv] = { price: String(p.id), product: String(p.product) };
    }
  }
  PRICES = { secret: keys.secret, map: map as Record<PlanKey, PlanPrices> };
  return PRICES.map;
}

/** Settings for Stripe's customer portal: switch between the three plans, cancel at period end, card, receipts. */
async function ensurePortal(keys: StripeKeys, prices: Record<PlanKey, PlanPrices>): Promise<string> {
  if (PORTAL && PORTAL.secret === keys.secret) return PORTAL.id;
  const tag = `babel-flight-${PLAN_KEYS.map((p) => PLANS[p].amount).join("-")}-y${PLAN_KEYS.map((p) => PLANS[p].yearly).join("-")}`;
  const list = await stripe(keys, "GET", "billing_portal/configurations", { active: "true", limit: 50 });
  let id = "";
  for (const c of (Array.isArray(list.data) ? list.data : []) as Row[]) {
    if ((c.metadata as Row | undefined)?.app === tag) id = String(c.id);
  }
  if (!id) {
    const c = await stripe(
      keys,
      "POST",
      "billing_portal/configurations",
      {
        business_profile: { headline: "Babel Flight の契約の管理" },
        features: {
          customer_update: { enabled: false },
          invoice_history: { enabled: true },
          payment_method_update: { enabled: true },
          subscription_cancel: { enabled: true, mode: "at_period_end" },
          subscription_update: {
            enabled: true,
            default_allowed_updates: ["price"],
            proration_behavior: "create_prorations",
            products: PLAN_KEYS.map((p) => ({
              product: prices[p].month.product,
              prices: [prices[p].month.price, prices[p].year.price],
            })),
          },
        },
        metadata: { app: tag },
      },
      `bf-portal-${tag}`,
    );
    id = String(c.id);
  }
  PORTAL = { secret: keys.secret, id };
  return id;
}

async function billingRow(db: D1Database, uid: string): Promise<Row | null> {
  return db.prepare("SELECT * FROM bf_billing WHERE uid = ?").bind(uid).first<Row>();
}

/** Records the state of a subscription (always re-read from Stripe, so event order doesn't matter). */
export async function saveSubscription(db: D1Database, sub: Row, uidHint: string | null): Promise<string | null> {
  const meta = (sub.metadata ?? {}) as Row;
  const customer = typeof sub.customer === "string" ? sub.customer : String((sub.customer as Row | undefined)?.id ?? "");
  let uid = typeof meta.uid === "string" && meta.uid ? meta.uid : uidHint;
  if (!uid && customer) {
    const r = await db.prepare("SELECT uid FROM bf_billing WHERE customer = ?").bind(customer).first<Row>();
    uid = r && typeof r.uid === "string" ? r.uid : null;
  }
  if (!uid || !customer) return null;
  const items = (sub.items as Row | undefined)?.data;
  const item = (Array.isArray(items) ? items[0] : undefined) as Row | undefined;
  const price = (item?.price ?? {}) as Row;
  const hit = priceFromLookup(price.lookup_key);
  const plan = hit?.plan ?? (isPlan(meta.plan) ? meta.plan : "");
  const recurring = (price.recurring ?? {}) as Row;
  const iv: Interval = hit?.iv ?? (recurring.interval === "year" ? "year" : "month");
  const status = String(sub.status ?? "");
  const periodEnd = num(item?.current_period_end ?? sub.current_period_end) * 1000;
  const cancelAt = sub.cancel_at ? num(sub.cancel_at) * 1000 : sub.cancel_at_period_end ? periodEnd : 0;
  const existing = await billingRow(db, uid);
  // A late event about an older, finished subscription must not replace the one that is running.
  if (
    existing &&
    existing.subscription &&
    existing.subscription !== sub.id &&
    LIVE_STATUSES.includes(String(existing.status)) &&
    !LIVE_STATUSES.includes(status)
  ) {
    return uid;
  }
  await db
    .prepare(
      "INSERT INTO bf_billing (uid, customer, subscription, plan, status, period_end, cancel_at, livemode, updated_at, billing_interval) " +
        "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ON CONFLICT(uid) DO UPDATE SET customer = excluded.customer, " +
        "subscription = excluded.subscription, plan = excluded.plan, status = excluded.status, " +
        "billing_interval = excluded.billing_interval, " +
        "period_end = excluded.period_end, cancel_at = excluded.cancel_at, livemode = excluded.livemode, updated_at = excluded.updated_at",
    )
    .bind(uid, customer, String(sub.id ?? ""), plan, status, periodEnd, cancelAt, sub.livemode ? 1 : 0, Date.now(), iv)
    .run();
  return uid;
}

function subView(row: Row | null) {
  if (!row || !row.subscription) return null;
  const status = String(row.status);
  return {
    plan: String(row.plan),
    interval: row.billing_interval === "year" ? "year" : "month",
    status,
    // active = the class is given now; failed = the renewal payment didn't go through, so the
    // account flies エコノミー until the card is fixed (the subscription itself still exists)
    active: GRANT_STATUSES.includes(status),
    failed: status === "past_due" || status === "unpaid",
    periodEnd: num(row.period_end),
    cancelAt: num(row.cancel_at),
  };
}

/* ---------- handlers ---------- */

async function handleStatus(request: Request, db: D1Database): Promise<Response> {
  const uid = await accountUid(request, db);
  if (!uid) return json({ ok: false, error: "signin" }, 401);
  const keys = stripeKeys();
  const open = !!keys && (await fullAccess(db, uid));
  if (!open) return json({ ok: true, enabled: false });
  return json({
    ok: true,
    enabled: true,
    test: keys.test,
    plans: PLAN_KEYS.map((p) => ({
      key: p,
      name: PLANS[p].name,
      amount: PLANS[p].amount,
      yearly: PLANS[p].yearly,
      saving: yearlySaving(p),
      level: PLANS[p].level,
    })),
    sub: subView(await billingRow(db, uid)),
  });
}

async function handleCheckout(request: Request, url: URL, db: D1Database): Promise<Response> {
  const uid = await accountUid(request, db);
  if (!uid) return json({ ok: false, error: "signin" }, 401);
  const keys = stripeKeys();
  if (!keys || !(await fullAccess(db, uid))) return json({ ok: false, error: "closed" }, 403);
  const body = await readJsonBody(request, 1000);
  if (!isPlan(body?.plan)) return json({ ok: false, error: "bad_request" }, 400);
  const iv: Interval = body?.interval === "year" ? "year" : "month";
  // The final confirmation screen: terms accepted and, for anyone under 18, a guardian's consent.
  if (body?.agree !== true || body?.guardian !== true) return json({ ok: false, error: "consent" }, 400);
  const plan = body.plan;
  const row = await billingRow(db, uid);
  // A subscription that still exists (even one waiting for a failed payment) is changed in the portal, never bought twice.
  if (row && LIVE_STATUSES.includes(String(row.status))) return json({ ok: false, error: "active" }, 409);
  const prices = await ensurePrices(keys);
  const session = await stripe(keys, "POST", "checkout/sessions", {
    mode: "subscription",
    line_items: [{ price: prices[plan][iv].price, quantity: 1 }],
    client_reference_id: uid,
    customer: row && typeof row.customer === "string" && row.customer ? row.customer : undefined,
    metadata: { uid, plan, interval: iv },
    subscription_data: { metadata: { uid, plan } },
    success_url: `${url.origin}/?billing=success`,
    cancel_url: `${url.origin}/?billing=cancel`,
    locale: "ja",
  });
  if (typeof session.url !== "string") return json({ ok: false, error: "stripe" }, 502);
  return json({ ok: true, url: session.url });
}

async function handlePortal(request: Request, url: URL, db: D1Database): Promise<Response> {
  const uid = await accountUid(request, db);
  if (!uid) return json({ ok: false, error: "signin" }, 401);
  const keys = stripeKeys();
  if (!keys || !(await fullAccess(db, uid))) return json({ ok: false, error: "closed" }, 403);
  const row = await billingRow(db, uid);
  if (!row || typeof row.customer !== "string" || !row.customer) return json({ ok: false, error: "no_customer" }, 404);
  const configuration = await ensurePortal(keys, await ensurePrices(keys));
  const session = await stripe(keys, "POST", "billing_portal/sessions", {
    customer: row.customer,
    return_url: `${url.origin}/?billing=portal`,
    configuration,
  });
  if (typeof session.url !== "string") return json({ ok: false, error: "stripe" }, 502);
  return json({ ok: true, url: session.url });
}

async function handleWebhook(request: Request, db: D1Database): Promise<Response> {
  const keys = stripeKeys();
  if (!keys || !keys.webhook) return json({ ok: false, error: "disabled" }, 503);
  if (num(request.headers.get("content-length")) > MAX_WEBHOOK_BODY) return json({ ok: false }, 413);
  const payload = await request.text();
  if (payload.length > MAX_WEBHOOK_BODY) return json({ ok: false }, 413);
  if (!(await verifyStripeSignature(payload, request.headers.get("stripe-signature"), keys.webhook))) {
    return json({ ok: false, error: "signature" }, 400);
  }
  let event: Row;
  try {
    event = JSON.parse(payload) as Row;
  } catch {
    return json({ ok: false }, 400);
  }
  if (event.livemode === true && !LIVE_ALLOWED) return json({ ok: true, ignored: "live" });
  const type = String(event.type ?? "");
  const obj = ((event.data as Row | undefined)?.object ?? {}) as Row;
  let subId: unknown = null;
  let uidHint: unknown = null;
  if (type === "checkout.session.completed") {
    subId = obj.subscription;
    uidHint = obj.client_reference_id ?? (obj.metadata as Row | undefined)?.uid;
  } else if (type.startsWith("customer.subscription.")) {
    subId = obj.id;
  } else if (type === "invoice.paid" || type === "invoice.payment_failed") {
    const details = ((obj.parent as Row | undefined)?.subscription_details ?? {}) as Row;
    subId = details.subscription ?? obj.subscription;
  } else {
    return json({ ok: true, ignored: type });
  }
  if (typeof subId !== "string" || !subId) return json({ ok: true, ignored: "no_subscription" });
  const sub = await stripe(keys, "GET", `subscriptions/${encodeURIComponent(subId)}`);
  const uid = await saveSubscription(db, sub, typeof uidHint === "string" ? uidHint : null);
  return json({ ok: true, saved: !!uid });
}

/* ---------- dispatcher ---------- */

export async function handleBilling(request: Request, url: URL): Promise<Response | null> {
  if (!url.pathname.startsWith("/api/billing/")) return null;
  const route = url.pathname.slice("/api/billing/".length);
  if (appOrigin(request)) return json({ ok: false, error: "app" }, 403);
  const db = bindings().DB;
  if (!db) return json({ ok: false, error: "no_db" }, 503);
  try {
    if (route === "status" && request.method === "GET") return await handleStatus(request, db);
    if (request.method !== "POST") return json({ ok: false, error: "method" }, 405, { allow: "GET, POST" });
    if (route === "webhook") return await handleWebhook(request, db);
    if (!isSameOrigin(request, url)) return json({ ok: false }, 403);
    if (route === "checkout") return await handleCheckout(request, url, db);
    if (route === "portal") return await handlePortal(request, url, db);
    return json({ ok: false, error: "not_found" }, 404);
  } catch (error) {
    if (error instanceof StripeError) {
      console.error("billing stripe error:", error.status, error.code);
      return json({ ok: false, error: "stripe" }, 502);
    }
    console.error("billing error:", error instanceof Error ? error.message : "unknown");
    return json({ ok: false, error: "server" }, 500);
  }
}
