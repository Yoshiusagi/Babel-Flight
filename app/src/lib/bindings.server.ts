// Server-only access to this app's Cloudflare bindings. Each is present ONLY if
// opted into via app.manifest.json (D1 `DB`, R2 `STORAGE`, KV `KV`, and the
// container `CONTAINER`) — so the accessors are optional; guard before use.
// `cloudflare:workers` is the Workers-runtime module that exposes the Worker
// env (bindings) — usable inside any server-side code (server functions,
// server routes). It is NOT bundled; the runtime provides it.
import { env } from "cloudflare:workers";
// Import the binding types directly — NOT via the global tsconfig `types` list,
// which would clobber the DOM globals the client/SSR React code relies on.
import type {
  D1Database,
  DurableObjectNamespace,
  KVNamespace,
  R2Bucket,
} from "@cloudflare/workers-types";

type AppEnv = {
  DB?: D1Database;
  STORAGE?: R2Bucket;
  KV?: KVNamespace;
  // The container's Durable Object — present only when "container" is set in
  // the manifest. Reach an instance with env.CONTAINER.getByName(id), then
  // .fetch(). See skills/containers.md.
  CONTAINER?: DurableObjectNamespace;
  HF_ENV?: string;
  // Website secret (set in Higgsfield website settings): Claude API key for the AI features.
  ANTHROPIC_API_KEY?: string;
  // Website secrets for paid classes through Stripe (see lib/billing.server.ts).
  STRIPE_SECRET_KEY?: string;
  STRIPE_WEBHOOK_SECRET?: string;
  // Moving to the owner's Cloudflare account (see lib/move.server.ts): the same secret on both
  // sites, and on the new site the old site's address.
  MOVE_KEY?: string;
  MOVE_FROM?: string;
  // "cloudflare" on the owner's own Cloudflare account (wrangler.cloudflare.jsonc); unset on Higgsfield.
  HOSTING?: string;
  APP_SLUG?: string;
};

export function bindings(): AppEnv {
  return env as unknown as AppEnv;
}
