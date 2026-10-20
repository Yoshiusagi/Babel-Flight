// Verifies Firebase Authentication ID tokens (RS256 JWTs) without the Admin SDK.
// Checks follow https://firebase.google.com/docs/auth/admin/verify-id-tokens#verify_id_tokens_using_a_third-party_jwt_library
import { encoder, num, type Row } from "./http.server";

const JWKS_URL = "https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com";
const CLOCK_SKEW_S = 60;

type Jwk = { kid?: string; kty?: string; n?: string; e?: string };

export type FirebaseClaims = { uid: string; provider: string; authTime: number };

export class KeysUnavailableError extends Error {}

function b64urlToBytes(input: string) {
  const b64 = input.replace(/-/g, "+").replace(/_/g, "/");
  const bin = atob(b64 + "=".repeat((4 - (b64.length % 4)) % 4));
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

function decodeJson(part: string): Row | null {
  try {
    const value: unknown = JSON.parse(new TextDecoder().decode(b64urlToBytes(part)));
    return value && typeof value === "object" && !Array.isArray(value) ? (value as Row) : null;
  } catch {
    return null;
  }
}

async function fetchKeys(): Promise<Jwk[]> {
  // Cloudflare caches the key set at the edge; Google rotates keys every few hours.
  const init = { cf: { cacheTtl: 3600, cacheEverything: true } } as unknown as RequestInit;
  let res: Response;
  try {
    res = await fetch(JWKS_URL, init);
  } catch {
    throw new KeysUnavailableError("fetch failed");
  }
  if (!res.ok) throw new KeysUnavailableError(`status ${res.status}`);
  const body = (await res.json()) as { keys?: unknown };
  return Array.isArray(body.keys) ? (body.keys as Jwk[]) : [];
}

/** Returns the verified claims, or null when the token is invalid for this project. */
export async function verifyFirebaseIdToken(
  token: unknown,
  projectId: string,
  allowedProviders: readonly string[],
  nowMs = Date.now(),
): Promise<FirebaseClaims | null> {
  if (typeof token !== "string" || token.length < 20 || token.length > 4096) return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [h, p, s] = parts as [string, string, string];
  const header = decodeJson(h);
  const payload = decodeJson(p);
  if (!header || !payload || header.alg !== "RS256" || typeof header.kid !== "string") return null;

  const jwk = (await fetchKeys()).find((k) => k.kid === header.kid);
  if (!jwk || jwk.kty !== "RSA" || typeof jwk.n !== "string" || typeof jwk.e !== "string") return null;

  let valid = false;
  try {
    const key = await crypto.subtle.importKey(
      "jwk",
      { kty: "RSA", n: jwk.n, e: jwk.e, alg: "RS256", ext: true },
      { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
      false,
      ["verify"],
    );
    valid = await crypto.subtle.verify("RSASSA-PKCS1-v1_5", key, b64urlToBytes(s), encoder.encode(`${h}.${p}`));
  } catch {
    return null;
  }
  if (!valid) return null;

  const now = Math.floor(nowMs / 1000);
  const exp = num(payload.exp);
  const iat = num(payload.iat);
  const authTime = num(payload.auth_time);
  const sub = payload.sub;
  const firebase = payload.firebase as Row | undefined;
  const provider = typeof firebase?.sign_in_provider === "string" ? firebase.sign_in_provider : "";
  if (
    exp + CLOCK_SKEW_S < now ||
    iat - CLOCK_SKEW_S > now ||
    authTime <= 0 ||
    authTime - CLOCK_SKEW_S > now ||
    payload.aud !== projectId ||
    payload.iss !== `https://securetoken.google.com/${projectId}` ||
    typeof sub !== "string" ||
    sub.length === 0 ||
    sub.length > 128 ||
    !allowedProviders.includes(provider)
  ) {
    return null;
  }
  return { uid: sub, provider, authTime };
}
