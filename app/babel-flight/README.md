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
  questions off (they would need that language's keyboard). `rtl:true` (アラビア語) shows the whole phrase on the flight
  board (Arabic letters join, so no split-flap letters) and runs the word tiles and text right to left.
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

## 表示言語 (display language: 日本語 / English / 한국어 / 简体中文)

`parts/f27_i18n.js` + `f27_css.html`. The page is written in Japanese; for another display language the dictionary
`public/i18n/<ui>.json` is loaded (kept on the device in localStorage `bf.i18n.<ui>`, refreshed when `I18N_V` in
`parts/f27_i18nv.js` changes) and a MutationObserver swaps every Japanese text node and `aria-label` / `title` /
`placeholder` / `alt` as it reaches the page, so the render functions stay in Japanese. Lookup: the exact text, then a
template with numbers / Latin words as `{0}` `{1}` …, then also names (languages, cities, jobs, unit titles, scene roles,
statuses). `T(s)` does the same for text in code (canvas drawing goes through it automatically, the share post text,
the AI question). Learning-language text (`.ko .zh .ar`, the flight board, `[translate=no]`) is never touched;
`data-tk="…"` on an element gives the dictionary key when one Japanese word means two things (やめる = Quit / Cancel).

The choice (`bf.ui`, per device) is made at the top of the first screen (preselected from the browser's language on a
first visit) or in 記録 → 学習の設定; switching reloads the page. With another display language: that language's own
course is hidden (`learnOrder()`), every mode is open (`uiModeOpen`; 職業 only for the jobs in `JOB_UI`),
phrase readings are romanized (Korean and Russian computed in `f27_i18n.js`, Chinese pinyin from the data, Arabic from `ROM_AR` in `f27_rom.js`; none for Latin-script languages), answer choices only
use phrases whose meaning is translated, and the AI teacher answers in that language (`ui` in `/api/ai/ask`). Cards
that are still Japanese-only (機長アナウンス, AI管制官, AI会話ロールプレイ, AIの例文練習, 搭乗クラス) are hidden.
The few phrases written for a learner from Japan (「日本人です」「東京に住んでいます」…) are swapped for the display
language's country (`f27_swap.js`: 한국어 → Korea / Seoul, 简体中文 → China / Beijing; English keeps Japan), and the
dictionaries give those meanings the same country. 中文 is Simplified Chinese. Only the display languages that have a
dictionary are offered (`I18N_UIS`).

Dictionaries: `i18n/<ui>/*.tsv` (`japanese<TAB>translation`, templates with `{n}`), built by

    python3 babel-flight/i18n/build.py

which checks placeholders, leftover kana and that every text of 日常会話モード (`i18n/keys.cjs`) is translated, adds the
city names from the route data (unless `<ui>/cities.tsv` names them), and writes `public/i18n/*.json` and `parts/f27_i18nv.js`. To find screen texts that are
still missing, run the app with a display language and read `UI_MISS` (set it to `{}` to start recording) — every text
that had no translation is counted there.

## あなたに合わせる (level per language, reasons, weak points) — `parts/f28_start.js`

- **First questions**: 言語 → 学ぶ理由 (one) → 職業 (only for 仕事, 日本語 only) → レベル → 苦手なこと (any) → 1日の目標.
  Someone who started before sees a home card (2 questions) once; both can be changed in 記録 → 学習の設定.
- **レベル per language** (`save.lv`): a language opened for the first time asks for its level. Older saves give their one
  level to every language already started. 「少しわかる」 and up can take the 飛び級テスト in a new language right away.
- **はじめて**: the `first` unit (はじめの一歩, `parts/e3h_first.js`, 8 short words in all 12 languages) comes first until
  あいさつ is flown; lessons start with their shortest phrases; 3 choices instead of 4; readings shown.
- **New phrases**: a card before the first question (default at はじめて) or a hint button on it that is not a mistake
  (default from 少しわかる); 記録 → 新しいフレーズの出し方 picks either.
- **学ぶ理由** picks the starting mode (仕事 → 職業, 留学 → 留学, 検定/学校+英語 → 検定 only where its lessons are open)
  and the 日常会話 order (旅行: travel first; 友達・推し: 雑談・気持ち earlier). **苦手なこと** makes every other round-2
  question train it (発音・聞き取り: listening, とっさに言えない: 言い方/並べ替え, 文法: 並べ替え/穴うめ), 単語 halves the
  review spacing, 文字 keeps readings on, 発音 replays the answer slowly. The map position is kept on the same lesson
  when the path changes (`keepPos`).

## 日本語 course (for the other display languages) — `parts/p3c_ja.js`, `parts/e3g_ja.js`

- A starter course like the others (はじめの一歩, 日常会話, travel phrases, the 8 travel scenes, a route map of Japan from
  Tokyo). Offered only in English / 한국어 / 简体中文 (`learnOrder()` hides the course of the display language).
- `jp` is the plain Japanese meaning, translated by the display language as usual; the phrase itself (`t`, `s`) and the
  scene lines start with an invisible WORD JOINER (`JA_M`) and carry the `.ja` class, so the translation never touches
  the Japanese being learnt (speech and the split-flap board drop the joiner). Readings are romaji.
- 한국어 / 简体中文 swap "I'm American / I live in New York / I'm from the US" for their own country (`f27_swap.js`).
  The notes of this course quote Japanese, so `i18n/<ui>/ja.tsv` may contain kana.

## Smooth motion — `parts/f31_motion.js`

- A screen change no longer cuts: a copy of the old screen floats away in a closed shadow layer (nothing can find or
  click it) while the new one rises in; tabs and steps slide sideways; re-drawing the same screen does not move.
- Sheets slide down when closed and dim what is behind dialogs; the answered question slides out to the left.
- Small touches: a tapped choice bounces, the right answer pops and a wrong one shakes, segmented buttons slide their
  marker, the tab you move to lifts. All off with reduced motion.

## 留学モード in the other display languages

- English / 한국어 / 简体中文 get the whole 留学モード of the English, Spanish, Italian and Korean courses: the 4
  school-life lessons and scenes (自己紹介・先生への質問・ホームステイ・学校生活) and the subject terms (数学・理科・社会・
  国語・歴史・音楽・体育・情報). Translations: `i18n/<ui>/study.tsv`; `i18n/keys.cjs` lists every study unit and scene.
- 「日本から来ました」 in the self-introduction becomes the display language's country (`UI_SWAP_SC` in `f27_swap.js`:
  한국어 → Korea, 简体中文 → China; English keeps Japan), and the dictionaries give it the same meaning.
- The paid 「授業の用語(くわしく)」 and the AI practice stay with 日本語. 「留学したい」 is now a reason in every display
  language. `i18n/<ui>/scene.tsv`: the 通話モード texts and scene results, which every scene in every mode uses.

## 職業モード in the other display languages

- All 13 jobs, translated in `i18n/<ui>/job.tsv`, `job2.tsv`, `job3.tsv` (`keys.cjs` checks every job in `JOB_UI`,
  `parts/d3_prof.js`). A job left out of `JOB_UI` shows 準備中 in the job grid (`.prof.soon`) and a save with it asks
  to pick again. 「仕事で使いたい」 and the job question are in every display language.
- AI管制官, the job certificates (検定モード) and the AI practice stay with 日本語.

## 検定モード in the other display languages — `parts/f30_xui.js`

- English / 한국어 / 简体中文 show the international exams (TOEIC・IELTS・TOEFL・ICAO・TOPIK・DELE・CILS) and their own
  country's tests: 한국어 → **TOEIC Speaking・OPIc**, 简体中文 → **CET-4・CET-6**. 英検 (with its 模試 and 面接練習),
  the job certificates and the AI practice stay with 日本語. `xuiApply()` rebuilds `EXAMS` / `XGOALS` for the display
  language after `jobxApply()`; `XUI_EXTRA` lists each country's tests.
- The lessons are written like any unit (Japanese meaning + note); `i18n/keys.cjs` lists the ones each display language
  shows (`xuiUnits`), and `build.py` checks they are translated (`i18n/<ui>/exam.tsv`, `xui.tsv`).

## Animations and the update notice — `parts/f29_fx.js`

- Opening the app (and coming back after 15 minutes): a plane climbs out of the bottom (under 1 s, tap to skip, none with
  reduced motion). Sky by time of day × 8 flight paths (climb, bank, swoop, clouds, formation, loop, zig, runway).
- Right answers in a row (3, 5, 8, 12…): a plane flies past with the count. Landing: the goal bar fills and the streak ticks.
- **NOTAM** (アップデートのお知らせ): `NOTAM` lists what is new, newest first. After an update it shows once on the home
  screen (`save.seen`); new users never see it; 記録 → このアプリについて keeps all of them. Items marked as paid plans
  are never shown in the iPhone app. Add a new entry at the top of `NOTAM` with each update worth announcing.

## Usage counting

`parts/f12_track.js` (standalone site only, never in the Claude version) sends an anonymous
visit / lesson-start ping to `/api/hit`: a random per-browser id plus language, mode and display language (表示言語).
The owner reads the totals at `/stats` (passphrase chosen on first visit).
Server side: `src/lib/analytics.server.ts`; schema: `migrations/0002_usage_stats.sql` (+ `0010_ui_lang.sql`: the display
language, shown as 表示言語 on `/stats`; rows from before it count as 日本語; `0011_why_weak.sql`: the ids of the
学ぶ理由 / 苦手なこと choices, shown on `/stats` as people per answer, by each browser's latest answer in the period).

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
(`XBANK`, tier 2 = ビジネス like ICAO); banks under 40 phrases stay 準備中 (no meter). 研究者 has IELTS / TOPIK /
DELE / CILS (graduate school and research) in all four languages, 客室乗務員 TOEIC (interview, announcements). Jobs with
no language certificate (IT・美容師・スポーツ選手) get a practice group instead (`practice:true`: no 目標, marked
「公式の資格ではありません」 on the 検定 card).

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
