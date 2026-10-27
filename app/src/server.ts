import "./lib/error-capture";

import APP_HTML from "./babel-flight.html?raw";
import { applySecurityHeaders } from "./lib/security-headers.server";
import { handleAccount } from "./lib/account.server";
import { handleAi } from "./lib/ai.server";
import { handleAnalytics } from "./lib/analytics.server";
import { appPreflight, withAppCors } from "./lib/http.server";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!body.includes('"unhandled":true') || !body.includes('"message":"HTTPError"')) {
    return response;
  }

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    const url = new URL(request.url);
    if ((request.method === "GET" || request.method === "HEAD") && (url.pathname === "/" || url.pathname === "/index.html")) {
      // The whole Babel Flight app is one self-contained page (see babel-flight/README.md).
      const html = APP_HTML.split("%ORIGIN%").join(url.origin);
      return applySecurityHeaders(
        new Response(request.method === "HEAD" ? null : html, {
          headers: {
            "content-type": "text/html; charset=utf-8",
            "cache-control": "public, max-age=300",
          },
        }),
      );
    }
    // The iPhone app calls the same APIs from its own origin (see lib/http.server.ts).
    const preflight = appPreflight(request, url);
    if (preflight) return preflight;
    // Anonymous usage counting + the owner-only /stats dashboard (see lib/analytics.server.ts).
    const analytics = await handleAnalytics(request, url);
    if (analytics) return applySecurityHeaders(withAppCors(request, analytics));
    // Optional accounts (Firebase sign-in, progress sync) + /privacy (see lib/account.server.ts).
    const account = await handleAccount(request, url);
    if (account) return applySecurityHeaders(withAppCors(request, account));
    // AI for the standalone site (Claude API, signed-in accounts, daily limits; see lib/ai.server.ts).
    const ai = await handleAi(request, url);
    if (ai) return applySecurityHeaders(withAppCors(request, ai));
    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
