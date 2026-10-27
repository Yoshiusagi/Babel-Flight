// A small Stripe REST client for the Worker (no SDK): form-encoded requests, webhook signature
// checks, and the cancel-on-account-deletion step. See billing.server.ts for the routes.
import type { D1Database } from "@cloudflare/workers-types";

import { bindings } from "./bindings.server";
import { encoder, num, timingSafeEqualHex, toHex, type Row } from "./http.server";

const API = "https://api.stripe.com/v1/";
/** Pinned so the shape of the objects we read never changes under us. */
export const STRIPE_VERSION = "2025-03-31.basil";
/**
 * Real charges stay off until the 特定商取引法に基づく表記 and 利用規約 pages are published and the
 * owner decides to start. Until then a live key is ignored, as if no key were set.
 */
export const LIVE_ALLOWED = false;
/** Subscription states that still give the paid class. */
export const ACTIVE_STATUSES: readonly string[] = ["active", "trialing", "past_due"];

export type StripeKeys = { secret: string; webhook: string; test: boolean };

/** The keys from the website secrets, or null when billing can't run (missing, or live while not allowed). */
export function stripeKeys(): StripeKeys | null {
  const env = bindings();
  const secret = (env.STRIPE_SECRET_KEY ?? "").trim();
  const webhook = (env.STRIPE_WEBHOOK_SECRET ?? "").trim();
  const test = /^(sk|rk)_test_/.test(secret);
  const live = /^(sk|rk)_live_/.test(secret);
  if (!test && !(live && LIVE_ALLOWED)) return null;
  return { secret, webhook, test };
}

/** {a:{b:[{c:1}]}} -> "a[b][0][c]=1", the encoding Stripe's API expects. */
export function formEncode(data: Row, prefix = "", out: string[] = []): string {
  for (const [k, v] of Object.entries(data)) {
    if (v === undefined || v === null) continue;
    const key = prefix ? `${prefix}[${k}]` : k;
    if (Array.isArray(v)) {
      v.forEach((x: unknown, i: number) => {
        if (x !== null && typeof x === "object") formEncode(x as Row, `${key}[${i}]`, out);
        else out.push(`${encodeURIComponent(`${key}[${i}]`)}=${encodeURIComponent(String(x))}`);
      });
    } else if (typeof v === "object") {
      formEncode(v as Row, key, out);
    } else {
      out.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(v))}`);
    }
  }
  return out.join("&");
}

export class StripeError extends Error {
  constructor(
    public status: number,
    public code: string,
  ) {
    super(`stripe ${status} ${code}`);
  }
}

export async function stripe(
  keys: StripeKeys,
  method: "GET" | "POST" | "DELETE",
  path: string,
  data?: Row,
  idempotencyKey?: string,
): Promise<Row> {
  const body = data ? formEncode(data) : "";
  const url = API + path + (method !== "POST" && body ? `?${body}` : "");
  const headers: Record<string, string> = { authorization: `Bearer ${keys.secret}`, "stripe-version": STRIPE_VERSION };
  if (method === "POST") headers["content-type"] = "application/x-www-form-urlencoded";
  if (idempotencyKey) headers["idempotency-key"] = idempotencyKey;
  const res = await fetch(url, { method, headers, body: method === "POST" ? body : undefined });
  let json: Row = {};
  try {
    json = (await res.json()) as Row;
  } catch {
    json = {};
  }
  if (!res.ok) {
    const e = (json.error ?? {}) as Row;
    throw new StripeError(res.status, String(e.code ?? e.type ?? "error"));
  }
  return json;
}

/** Checks the Stripe-Signature header (v1 = HMAC-SHA256 of "<t>.<payload>") within 5 minutes. */
export async function verifyStripeSignature(
  payload: string,
  header: string | null,
  secret: string,
  nowS = Math.floor(Date.now() / 1000),
  toleranceS = 300,
): Promise<boolean> {
  if (!header || !secret) return false;
  let t = 0;
  const sigs: string[] = [];
  for (const part of header.split(",")) {
    const i = part.indexOf("=");
    if (i < 1) continue;
    const k = part.slice(0, i).trim();
    const v = part.slice(i + 1).trim();
    if (k === "t") t = num(v);
    else if (k === "v1" && /^[0-9a-f]{64}$/.test(v)) sigs.push(v);
  }
  if (!t || !sigs.length || Math.abs(nowS - t) > toleranceS) return false;
  const key = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const mac = toHex(await crypto.subtle.sign("HMAC", key, encoder.encode(`${t}.${payload}`)));
  return sigs.some((s) => timingSafeEqualHex(s, mac));
}

/**
 * Before an account is deleted: stop its subscription right away so nobody keeps paying for an
 * account that no longer exists, then forget it. Returns false if a running subscription could
 * not be stopped (the deletion should wait and be retried).
 */
export async function cancelBillingOnDelete(db: D1Database, uid: string): Promise<boolean> {
  let row: Row | null = null;
  try {
    row = await db.prepare("SELECT subscription, status FROM bf_billing WHERE uid = ?").bind(uid).first<Row>();
  } catch {
    return true; // no billing table yet: nothing was ever bought
  }
  if (!row) return true;
  const sub = typeof row.subscription === "string" ? row.subscription : "";
  if (sub && ACTIVE_STATUSES.includes(String(row.status))) {
    const keys = stripeKeys();
    if (!keys) return false;
    try {
      await stripe(keys, "DELETE", `subscriptions/${encodeURIComponent(sub)}`);
    } catch (error) {
      // Already gone at Stripe is fine; anything else means it may still be charging.
      if (!(error instanceof StripeError && error.status === 404)) return false;
    }
  }
  await db.prepare("DELETE FROM bf_billing WHERE uid = ?").bind(uid).run();
  return true;
}
