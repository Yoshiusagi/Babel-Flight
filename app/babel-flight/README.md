# Babel Flight (standalone page)

The app is a single self-contained HTML page. Its source lives in `parts/`
(CSS, data and script pieces); `parts/order.txt` lists the assembly order.

Rebuild the page after editing any part:

    python3 babel-flight/parts/assemble.py src/babel-flight.html

`src/server.ts` serves `src/babel-flight.html` at `/` and fills in `%ORIGIN%`.

## Learning languages (スターター languages)

`ORDER` (end of `parts/p3b_data.js`) lists the languages. 韓国語・英語・スペイン語・イタリア語 have every mode; a
**スターター** language (`starter:true`: 中国語, フランス語, …) has only 日常会話モード to begin with: 基本の日常会話, 旅行フレーズ
and the 8 travel scenes. Its 職業 / 留学 / 検定 modes show a 準備中 card (`modeSoonHTML` in `f5_home.js`).

Adding one (中国語 is the example):
- `parts/p3c_<lang>.js` (after `p3b_data.js` in `order.txt`): `LANGS.<lang>={…, units:[U('checkin',…), …]}` with the
  6 travel units, then `ORDER.push('<lang>')`. Each phrase is `[日本語, phrase, reading, note, words]`; the 5th
  column splits the phrase into words for 並べ替え when the language has no spaces. `noType:true` turns the typing
  questions off (they would need that language's keyboard).
- `parts/e3g_<lang>.js` (after `e3d_geo.js`): `DU.<lang>` (6 daily units), `SC('<lang>', …)` for the 8 scenes,
  `CITIES.<lang>` (28 stops) and `REGIONS.<lang>` (the dotted map).
- the colour `--c-<lang>` and, if the script needs it, a font (`--f-<lang>` and `lfc()` in `e4_core.js`) in
  `p1_head.html`; the share card colour `SHR_LC` (`f16_share.js`); the server lists in `src/lib/analytics.server.ts`
  (`LANGS`) and `src/lib/ai.server.ts` (`LANG_NAMES`, `LANG_EN`, the role-play id pattern); `LANG_JP` /
  `LANG_ORDER` in `src/stats.html`; role-play first-line hints (`ROLE_SC` in `f17_cabin.js`).

The language chips (home hero, 復習, 記録) show the current language and every language with a lesson flown;
「＋ ほかの言語」 opens the 言語を選ぶ sheet with all of them. Pinyin tone marks (ǎ ǐ ǒ ǔ ǚ …) come from a tiny embedded
subset of Noto Sans CJK SC (SIL Open Font License 1.1) at the top of `p1_head.html`, because some Japanese fonts
draw them full-width. Progress in a language an older version doesn't know is kept as it is (`mergeSave`).

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

## 職業の資格 (検定モード)

`parts/f26_jobx.js`. The third group of 検定 follows the job chosen in 職業モード (`save.prof`), replacing the
fixed 航空英語(ICAO) group: `JOBX` maps job → language → certificates, `JOBX_C` holds each certificate's group
title and 目標 levels. `jobxApply()` rebuilds `EXAMS` / `XGOALS` from the base lists on every render, so a job
change shows at once (a target of the old job is simply ignored). Lessons are ordinary `XU()` units in banks
(`XBANK`, tier 2 = ビジネス like ICAO); banks under 40 phrases stay 準備中 (no meter). Jobs without a
certificate yet show a 準備中 line on the 検定 card.

## 面接練習 (英検 二次試験 3級〜1級)

`parts/f25_iv.js` + `f25_css.html`. Entry: the 検定 card (English) and the 模試 result (「続けて二次試験(面接)へ」).
Classes like 検定コース: 3級・準2級 from プレミアムエコノミー, 準2級プラス〜1級 from ビジネス; not in the iPhone app.

The cards are written in `iv/cards.py` (original passages, emoji pictures, examiner lines, model answers) and
built into `public/iv/<key>.json` by `python3 babel-flight/iv/build.py`, which checks them against the real
format (`SPEC`: passage length, 20 s silent reading before reading aloud, the questions of each grade, the card
turned over after the same question as in the real test, yes/no model answers). Each card is a list of steps:
`say` (examiner, browser voice), `card` / `hide`, `prep` (silent reading / preparation countdown), `read`,
`ans`, `yn` (Yes/No, then "Why?" / "Why not?" / "Please tell me more."), `topics` + `tq` (1級). Answers are
transcribed by the browser's speech recognition (en-US) where available; the result screen marks the words
heard while reading aloud and the learner rates each answer against the model answers (an estimate, not
the CSE score). History is kept on the device. AI marking can be added once the AI key is set.

## 筆記体なぞり (cursive tracing)

`parts/f24_cursive.js` + `f24_css.html`, letters in `parts/f24_cdata.js`. Entry: the 「筆記体なぞり」 card in 復習.
Steps: 小文字 a–z and 大文字 A–Z (free), つなげ書き (short words in the learning language) and 自分の名前
(プレミアムエコノミーから; not shown in the iPhone app). Results (◎◯△ per letter) stay on the device.

The letters are Hershey "Script Simplex" (`cursive/scripts.jhf`). `python3 babel-flight/cursive/build.py`
rebuilds `f24_cdata.js`: its `SPEC` joins and reorders the font's plotter strokes into handwriting order
(one pen movement per letter where cursive has one; i/j dots and t/x crosses last). Words are joined at
run time (`curLayout`), with the over-the-top connector before a c d g o q. Tracing (`curMove`): the pen
moves the progress forward only while it stays within the tolerance of the current stroke, so the
direction and the start point matter; lifting keeps the progress. A pen switches on pen-only mode
(touches are ignored). The Hershey acknowledgement the font data requires is in `f24_cdata.js` and in
このアプリについて.

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
