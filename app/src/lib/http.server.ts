// Small server-only helpers shared by the analytics and account routes.

export type Row = Record<string, unknown>;

export const encoder = new TextEncoder();

export function num(v: unknown): number {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

export function json(data: unknown, status = 200, headers: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      ...headers,
    },
  });
}

export function noContent(): Response {
  return new Response(null, { status: 204, headers: { "cache-control": "no-store" } });
}

// The iPhone / Android app (Capacitor) loads the page from its own bundle, so its requests come
// from one of these origins. They authenticate with a bearer token, never a cookie, so another
// website can't ride on them.
export const APP_ORIGINS: readonly string[] = ["capacitor://localhost", "https://localhost"];

/** The app origin a request came from, or null for the website and everything else. */
export function appOrigin(request: Request): string | null {
  const origin = request.headers.get("origin");
  return origin && APP_ORIGINS.includes(origin) ? origin : null;
}

/** Lets the app read an API response (CORS). Website responses pass through unchanged. */
export function withAppCors(request: Request, response: Response): Response {
  const origin = appOrigin(request);
  if (!origin) return response;
  const headers = new Headers(response.headers);
  headers.set("access-control-allow-origin", origin);
  headers.append("vary", "Origin");
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}

/** Answers the app's CORS preflight for /api/*; null when this isn't one. */
export function appPreflight(request: Request, url: URL): Response | null {
  if (request.method !== "OPTIONS" || !url.pathname.startsWith("/api/")) return null;
  const origin = appOrigin(request);
  if (!origin) return new Response(null, { status: 403 });
  return new Response(null, {
    status: 204,
    headers: {
      "access-control-allow-origin": origin,
      "access-control-allow-methods": "GET, POST, PUT",
      "access-control-allow-headers": "content-type, authorization",
      "access-control-max-age": "86400",
      vary: "Origin",
    },
  });
}

/** Session token from the cookie (website) or `Authorization: Bearer` (app). */
export function readSessionToken(request: Request, cookieName: string): string | null {
  const cookie = readCookie(request, cookieName);
  if (cookie) return cookie;
  if (!appOrigin(request)) return null;
  const auth = request.headers.get("authorization") || "";
  const m = /^Bearer ([0-9a-f]{64})$/.exec(auth.trim());
  return m ? m[1] : null;
}

// Browsers send Sec-Fetch-Site on every fetch; older ones fall back to Origin.
export function isSameOrigin(request: Request, url: URL): boolean {
  if (appOrigin(request)) return true;
  const site = request.headers.get("sec-fetch-site");
  if (site) return site === "same-origin";
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try {
    return new URL(origin).host === url.host;
  } catch {
    return false;
  }
}

/** Reads a JSON object body of at most `max` characters; anything else is null. */
export async function readJsonBody(request: Request, max: number): Promise<Row | null> {
  if (num(request.headers.get("content-length")) > max) return null;
  const text = await request.text();
  if (text.length > max) return null;
  try {
    const value: unknown = JSON.parse(text);
    return value && typeof value === "object" && !Array.isArray(value) ? (value as Row) : null;
  } catch {
    return null;
  }
}

export function readCookie(request: Request, name: string): string | null {
  const header = request.headers.get("cookie");
  if (!header) return null;
  for (const part of header.split(";")) {
    const i = part.indexOf("=");
    if (i > 0 && part.slice(0, i).trim() === name) return part.slice(i + 1).trim();
  }
  return null;
}

export function toHex(buf: ArrayBuffer | Uint8Array): string {
  const bytes = buf instanceof Uint8Array ? buf : new Uint8Array(buf);
  let out = "";
  for (const b of bytes) out += b.toString(16).padStart(2, "0");
  return out;
}

export function fromHex(hex: string) {
  const out = new Uint8Array(hex.length >> 1);
  for (let i = 0; i < out.length; i++) out[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  return out;
}

export function randomHex(bytes: number): string {
  const a = new Uint8Array(bytes);
  crypto.getRandomValues(a);
  return toHex(a);
}

export async function sha256Hex(text: string): Promise<string> {
  return toHex(await crypto.subtle.digest("SHA-256", encoder.encode(text)));
}

export function timingSafeEqualHex(a: string, b: string): boolean {
  const x = encoder.encode(a);
  const y = encoder.encode(b);
  if (x.byteLength !== y.byteLength) return false;
  const subtle = crypto.subtle as unknown as {
    timingSafeEqual?: (p: ArrayBufferView, q: ArrayBufferView) => boolean;
  };
  if (typeof subtle.timingSafeEqual === "function") return subtle.timingSafeEqual(x, y);
  let diff = 0;
  for (let i = 0; i < x.length; i++) diff |= (x[i] ?? 0) ^ (y[i] ?? 0);
  return diff === 0;
}
