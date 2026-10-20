# Babel Flight (standalone page)

The app is a single self-contained HTML page. Its source lives in `parts/`
(CSS, data and script pieces); `parts/order.txt` lists the assembly order.

Rebuild the page after editing any part:

    python3 babel-flight/parts/assemble.py src/babel-flight.html

`src/server.ts` serves `src/babel-flight.html` at `/` and fills in `%ORIGIN%`.

## Usage counting

`parts/f12_track.js` (standalone site only, never in the Claude version) sends an anonymous
visit / lesson-start ping to `/api/hit`: a random per-browser id plus language and mode.
The owner reads the totals at `/stats` (passphrase chosen on first visit).
Server side: `src/lib/analytics.server.ts`; schema: `migrations/0002_usage_stats.sql`.

## Accounts (optional sign-in)

`parts/f13_account.js` + `parts/f13_css.html` (standalone site only) add Google / email sign-in
through Firebase Authentication and sync the save between devices. The Firebase web config lives in
`src/lib/firebase-config.ts` (public values; `null` hides sign-in). Server side:
`src/lib/account.server.ts` (+ `firebase-token.server.ts`), schema `migrations/0003_accounts.sql`,
privacy policy `src/privacy.html`. The profile icon on the ID card (`ICONS` in `parts/e4_core.js`) is shared
with the Claude version.
