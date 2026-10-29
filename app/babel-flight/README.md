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

## Installable app (PWA)

`parts/f14_pwa.js` (standalone site only) registers `public/sw.js` (network-first app page, offline fallback,
cached icons/fonts; APIs never cached) and shows an "App" card on the record screen with install steps.
`public/manifest.webmanifest` + `public/icons/app-*` (sunset app icon); the owner's `/stats` page has its own
`public/stats.webmanifest` + `public/icons/tower-*` (control tower). Icons are rendered by a small Playwright script
(see the commit that added them); `public/favicon.svg` matches the app icon. Bump `CORE_CACHE` in
`sw.js` when the cached file list changes.

## Full access (test account / future paid plans)

`src/lib/entitlements.server.ts` + `migrations/0006_entitlements.sql`. When the owner's test account signs in
(matched by a salted SHA-256 of its email), it gets plan `all` in `bf_entitlements`, stored by Firebase uid.
`/api/account/session` and `/api/account/me` return `ent: { plan, all }`; the page keeps it in `ENT`
(`parts/e8_perks.js`). With `all`: every status perk is open (`perkHas()`), the skip test is always offered,
and the AI routes skip the daily limits (`left` is reported as 999). Miles and status themselves stay real.
**Any future paid feature must check `entitled()` in the page and `fullAccess()` on the server**, so the test
account keeps getting everything automatically.

## Classes (搭乗クラス)

`parts/f17_cabin.js` + `f17_css.html` (検定 data in `f17_exam.js`). `cabinLv()`: -1 in the iPhone app (no classes
there), the test account's chosen class (switcher in 記録), otherwise `cabinPlanLv()`, which is エコノミー (0) for
everyone until paid plans open. エコノミー (website, signed in or not) gets 発音チェック and the 検定 tab; the paid
classes' features (検定コース, 模試, AI会話ロールプレイ, 弱点レポート, 授業の用語(くわしく), designs) show locked with
「もうすぐ申し込めます」. When billing goes live, `cabinPlanLv()` should return the class the account has paid for
(server-checked, like `entitled()`), and the plan card in `f21_billing.js` opens to everyone signed in.

## iPhone app (Capacitor)

`parts/a0_env.js` runs first: `BF_APP` is true inside the app, `BF_API` is the website's address there, and
`bfFetch()` is used for every call to this site's own `/api/*` (cookie on the website, `Authorization: Bearer`
in the app, where the page's origin is `capacitor://localhost`). Server side: `appOrigin` / `withAppCors` /
`readSessionToken` in `src/lib/http.server.ts`; `/api/account/session` returns the token to the app.
`parts/f20_native.js` + `f20_css.html` hold the app-only features (daily reminder, haptics, swipe back,
offline note, native share, links in an in-app browser, AI consent sheet, native Google / Apple sign-in) and
switch the class / paid-plan screens off. The native project and its build live in `ios-app/` (see its README).

## Full-format mock tests (英検 5級〜1級)

`parts/f23_mx.js` + `parts/f23_css.html` (ファースト class — the test account for now; English only). The real exam's order,
question counts and timing: 筆記 (reading, then writing, one timer) → listening read aloud by the browser,
once or twice like the real test, with the real answer time. Original questions only.

The tests are written in `mock/<key>.py` (helpers in `mock/mxh.py`) and built into `public/mx/<key>.json`,
which the page loads only when a test is opened:

    python3 babel-flight/mock/build.py

`build.py` checks every test against the real format (`SPEC`: parts, question counts, option counts,
listening plays, writing word limits incl. the model answers) and stops with a list of problems.
