/**
 * Security headers applied to every Worker response. Import in app/src/server.ts
 * and wrap the final response: `return applySecurityHeaders(response)`.
 */
import { bindings } from "./bindings.server";

export function applySecurityHeaders(response: Response): Response {
  const headers = new Headers(response.headers);
  // On the owner's own Cloudflare account (HOSTING=cloudflare) there is no platform to add
  // frame-ancestors, so the page may only be framed by itself there.
  const ownHosting = bindings().HOSTING === "cloudflare";
  // Framing: the Supercomputer Design-mode inspector + preview render this app
  // cross-origin inside an iframe. The Higgsfield hosting platform injects the
  // canonical `frame-ancestors` allowlist on every app response, so this app
  // MUST NOT set its own — browsers intersect multiple CSP headers, so a second
  // (stricter) list here can only ever subtract from the platform's allowlist
  // and silently block the embed. We also deliberately do NOT set
  // `X-Frame-Options` (no cross-origin allowlist; SAMEORIGIN/DENY would blank
  // the preview) and leave framing entirely to the platform.
  headers.set(
    'Content-Security-Policy',
    "default-src 'self'; " +
      "script-src 'self' 'unsafe-inline' https://www.gstatic.com https://apis.google.com; " +
      // Firebase Authentication's sign-in helper frame (accounts)
      "frame-src 'self' https://*.firebaseapp.com; " +
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
      "font-src 'self' https://fonts.gstatic.com; " +
      "img-src 'self' data: https:; media-src 'self' https:; " +
      "connect-src 'self' https:; " +
      "base-uri 'self'; form-action 'self'" +
      (ownHosting ? "; frame-ancestors 'self'" : ""),
  );
  if (ownHosting) headers.set('X-Frame-Options', 'SAMEORIGIN');
  headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  headers.set('Permissions-Policy', 'camera=(), microphone=(self), geolocation=()');
  headers.set('X-XSS-Protection', '0');
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
