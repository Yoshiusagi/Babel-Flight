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
A language graduates by getting its row in every `PJ()` unit of `d1_prof.js`…`d8_more5.js` (13 jobs and the 留学
subjects), the 3 study scenes (`sc-class`, `sc-teacher`, `sc-home`) in `e3g_<lang>.js`, and dropping `starter:true`.
Every learning language has graduated now (中国語 … ロシア語); only the 日本語 course (for the en / ko / zh display
languages) is still a スターター.

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
that are still Japanese-only (英検 with its 模試 and 面接練習, the plan purchase card) are hidden.
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
- **New phrases**: a card before the first question (default at はじめて) or a hint button on it (default from 少しわかる);
  記録 → 新しいフレーズの出し方 picks either. The hint never gives the answer away (`qHint`): the 1st press shows a clue
  (the phrase's note, or its reading and a slow replay), the 2nd takes one wrong choice away. Using it is not a
  mistake, but the phrase comes back once more later in the same flight, without a hint.
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

## AI features in the other display languages

- AI会話ロールプレイ, AI管制官, AIの例文練習 and the AIコーチ work in English / 한국어 / 简体中文 too: the page sends `ui`
  and the server (`src/lib/ai.server.ts`) writes the feedback and the drill translations in that language (the prompt
  calls the field `feedback`, the reply to the page still says `feedback_ja`). The role-play also runs for the 日本語
  course (`role:<scene>:ja`, Japanese starter lines in `ROLE_SC`).
- What the AI wrote is already in the display language, so the page translation leaves it alone: feedback in
  `translate="no"` spans, the AI answer boxes while showing an answer, and the drill sentences via `uiKeep()`.
- 搭乗クラス (記録) shows in every display language: `cabFeat()` / `cabPitch()` leave out what is 日本語 only (英検 and
  its 面接練習, 授業の用語(くわしく)) and name the exams by level. Buying a plan (`f21_billing.js`, with its 特定商取引法
  confirmation) stays 日本語 only for now.
- リスニング特訓 (機長アナウンス, in 復習) works in every display language; the card only shows for the courses that
  have the announcements (`pilot-ann`: 英語・韓国語・スペイン語・イタリア語).

## 検定モード for the スターター languages and JLPT — `parts/f17_xstarter.js`

- Every スターター language has an exam course now: 中国語 HSK (2級・3級), フランス語 DELF (A2・B1), ドイツ語
  Goethe-Zertifikat (A2・B1), ロシア語 ТРКИ/TORFL (A2・B1), トルコ語 TYS (A2・B1), ポルトガル語 Celpe-Bras (中級・上級),
  インドネシア語 UKBI (基礎・実用), アラビア語 CEFR A2・B1 (for tests like the Hamza test). The 日本語 course (other
  display languages only) has JLPT N5・N4・N3. First lesson プレミアムエコノミー, second ビジネス (JLPT: N5・N4 / N3).
- `XSTARTER` lists each language's group, banks and goals; the exam tab label (`xSwLabel`), the hint under 目標を選ぶ
  (`XHINT`) and the trademark line (`xTmHTML`) follow the language being learnt. Most meanings are shared with
  DELE/CILS, so the dictionaries reuse them (`i18n/<ui>/xstarter.tsv`; JLPT notes in `ja.tsv`).
- Chinese and Japanese exam phrases carry the word split (5th column of `XU`) for 並べ替え; the Arabic readings for
  the other display languages are in `ROM_AR` (`f27_rom.js`).
- Every 英検 level (5級〜1級) has 15 steps (120 phrases): ステップ6〜15 (`x-ek3f` … `x-ek3o`) are grammar, vocabulary,
  idiom, writing/summary, reading-flow and speaking themes, original sentences. `XBANK_FULL` (40) is only the minimum for the meter, which is always
  worked out over the whole bank, so it goes down when a bank grows (the remembered phrases stay).
- Each level is 5 steps of 8 phrases, like 英検 (`x-hsk2`, `x-hsk2b` … `x-hsk2e`; `xSteps` collects them into the
  bank; DELE・CILS・TOPIK in `f17_exam.js` list their steps in `XBANK`; TOEIC・IELTS・TOEFL・ICAO・英検準1級/1級 and
  TOEIC Speaking・OPIc・CET too, with their own meanings, translated in `i18n/<ui>/xen.tsv`), so a goal has the 40 phrases (`XBANK_FULL`) the 合格圏メーター needs. Steps 2–5 have themes (初級: 買い物・食事 /
  旅行・道案内 / 家族・趣味・予定 / 体調・天気・連絡, 中級: 意見・比較 / 仕事・学校 / 経験 / 社会・環境・未来), and their meanings
  are shared by every language, so each display language translates a meaning once (`i18n/<ui>/xstarter2.tsv`,
  together with the step titles and the notes). JLPT does the same: N5 has its own simple sentences, N4 and N3
  are the 初級 and 中級 meanings said in Japanese (notes in `ja.tsv`). The meter and the training texts
  for the other display languages are in `i18n/<ui>/meter.tsv`.
- The 職業の資格 banks (`f26_jobx.js`: 航空無線通信士・OET・TOLES・ビジネス英語・ServSafe・CELTA・観光英語検定・
  全国通訳案内士・研究・大学院・客室乗務員・IT・美容師・スポーツ) are 5 lessons of 8 phrases too. Certificates that were
  already called ステップ1 keep step titles; the others have a theme per lesson (OET 病棟の英語, TOLES 訴訟と紛争 …).
  Korean lessons carry a katakana reading like the rest of the Korean course.

## 検定モード in the other display languages — `parts/f30_xui.js`

- English / 한국어 / 简体中文 show the international exams (TOEIC・IELTS・TOEFL・ICAO・TOPIK・DELE・CILS) and their own
  country's tests: 한국어 → **TOEIC Speaking・OPIc**, 简体中文 → **CET-4・CET-6**. 英検 (with its 模試 and 面接練習)
  and the AI practice stay with 日本語. `xuiApply()` rebuilds `EXAMS` / `XGOALS` for the display language after
  `jobxApply()`; `XUI_EXTRA` lists each country's tests.
- The job certificates show too (`XUI_JOB`: OET・TOLES・ServSafe・CELTA・研究・大学院・客室乗務員 and
  the IT / 美容師 / スポーツ practice), with the 💼 line naming them (`jobxLineList`). The ones made for working in Japan
  (航空無線通信士・観光英語検定・全国通訳案内士) stay with 日本語. Their texts are in `i18n/<ui>/xjobc.tsv`; the certificate
  titles are names for the dictionary (`uiNames`), so 「{0}」の資格: {1} finds them inside the line.
- ケンブリッジ英検ビジネス (BEC) is held only in China since 2024: it is the ビジネス certificate (with its goals) in
  简体中文 only. Everywhere else the same bank is ビジネス英語 practice and the 💼 line points to TOEIC L&R (`jobxC()`).
- The lessons are written like any unit (Japanese meaning + note); `i18n/keys.cjs` lists the ones each display language
  shows (`xuiUnits`), and `build.py` checks they are translated (`i18n/<ui>/exam.tsv`, `xui.tsv`).

## Animations and the update notice — `parts/f29_fx.js`

- Opening the app (and coming back after 15 minutes): a plane climbs out of the bottom (under 1 s, tap to skip, none with
  reduced motion). Sky by time of day × 8 flight paths (climb, bank, swoop, clouds, formation, loop, zig, runway).
- Right answers in a row (3, 5, 8, 12…): a plane flies past with the count. Landing: the goal bar fills and the streak ticks.
- **NOTAM** (アップデートのお知らせ): `NOTAM` lists what is new, newest first. After an update it shows once on the home
  screen (`save.seen`); new users never see it; 記録 → このアプリについて keeps all of them. Items marked as paid plans
  are never shown in the iPhone app. Add a new entry at the top of `NOTAM` with each update worth announcing.

## ファーストクラス: FIRST CLASS LOUNGE — `parts/f32_first.js` + `f32_css.html`

Only for ファースト (`cabinLv()` 3; `fcOn()`), never in the iPhone app.
- **Lounge**: a card under the mode switch on the home screen (its own page, the 2nd, in the スイート design; the
  「All flights」 button then jumps to page 5): greeting, seat 1A, the chosen title, today's task of the coach's plan,
  and tiles for AI日記 / AIコーチ / 称号. 復習 gets the coach card above the 弱点レポート.
- **専属AIコーチ**: `POST /api/ai/coach` (`src/lib/ai.server.ts`, ファースト only, 3 a day) makes a plan for the week
  (Monday to Sunday: focus, why, 7 days of `{task, kind, min}`, tip) from `coachStats()` (level, reason, weak points,
  job, exam goal, 14-day answers and accuracy, kinds, weak phrases, due count, the next lesson, last week's result).
  The first time the lounge or 復習 shows in a new week it is made by itself (once per session if it fails);
  「プランを立て直す」 makes it again. Each day's task has a start button (`coachDo`: next lesson, review, weak, free,
  exam mode, role-play, diary) and a check; plans and checks are kept per language on this device (`babelflight.coach`).
- **AI添削つき日記**: `POST /api/ai/diary` (2 a day: the entry and one rewrite) returns the corrected diary, a native
  version, up to 6 fixes with the reason for each, one good point, an expression for tomorrow and the meaning. Entries
  (90 at most) stay on this device (`babelflight.diary`). Reminder (`babelflight.diarySet`, default 21:00, the learner
  chooses): after that time the AI日記 tile asks 「今日は何があった？」; with notifications allowed, a notification is
  shown at that time while the page (or the installed app) is open. Notifications to a closed site need Web Push
  (not built yet).
- **称号** (`FT_TITLES`, shown on the ID card and in the lounge) and six first-class icons (`'F'` in `ICONS`,
  `e4_core.js`): only while flying ファースト; a first-class icon falls back to the plane otherwise.
- **リアル路線シミュレーション** (`parts/f33_route.js` + `f33_css.html`, 日本語 display only): one real route flown
  from start to finish on the scene engine (通話モード or 入力モード): 機内 (飲み物 → 機内食 → 通路を通してもらう) →
  入国審査 → タクシー → ホテル → 次の朝の朝ごはん. Each flight picks one or two troubles at random (スーツケースが
  出てこない after immigration / タクシーでカードが使えない instead of the taxi / 予約が見つからない instead of the hotel),
  hidden as ？？？ until they happen. Routes in `RT_ROUTES`: 英語 HND → JFK, 韓国語 HND → ICN, スペイン語 HND → MAD,
  イタリア語 HND → FCO (original dialogues; Korean with katakana readings). The stages are scene units `rt-…` registered
  after `e3e_reg.js` (not in `ALL_IDS`, never on the map); `sceneFinish` is wrapped so a stage goes back to the route
  screen (`view 'route'`), and the whole flight lands as one lesson (`completeLesson`, mode `route`). Results per
  language on this device (`babelflight.routes`). Entry: the lounge tile; the coach can plan it (kind `route`).
- **発音の細かい分析** (`parts/f34_pron.js` + `f34_css.html`): while flying ファースト the 発音チェック after an answer
  shows the words heard live while speaking, then the phrase word by word (言えた / おしい / ちがって聞こえた /
  聞こえなかった; tap a word to hear it slowly), a score, and up to three fixes: what it sounded like, which sound
  (`PRON_TIPS`: L と R, th, V と B, F, S と SH, 語尾の子音, -ed, 語尾の s, 母音, 小さい単語, パッチム, 激音・濃音,
  ㅓ と ㅗ, ㅡ と ㅜ, 巻き舌の rr, 二重子音) and how to say it, with a slow model. The phrase and the heard words are
  aligned word by word (characters for Chinese and Japanese; ㅐ/ㅔ count as the same). Browser speech recognition
  only: nothing is sent to the site, and intonation/tones are not judged. 発音のクセ (sounds and words missed most,
  per language, `babelflight.pron`) shows in 復習 and goes to the AI coach. Other classes keep the simple check.
- **家族シェア** (`parts/f35_family.js` + `f35_css.html`, server `src/lib/family.server.ts`, `migrations/0015_family.sql`):
  an account flying ファースト by itself (`ownsFirst`: test account, family account, hidden reward, paid ファースト
  being paid for) shares it with up to 2 members. 記録 → 家族シェア: invite codes (8 characters, one use, 7 days, 3 open
  at most), sent as `/?family=CODE` (the link waits for sign-in, then asks to join), the seats, removing a member.
  Members get `fam` (the sharer's name) in their entitlements: ファースト in the page (`cabinPlanLv` 3), First-class
  AI limits on the server, only while the sharer still flies ファースト. No sharing on, one family per account, an
  account with its own ファースト can't join, at most 4 joins per sharer in 30 days. Members see only each other's
  name and icon. Deleting an account removes its family and its seat.
- **オフライン完全版** (`parts/f36_offline.js` + `f36_css.html`, `public/sw.js`): 記録 → オフライン完全版 downloads the
  基本データ (the page, mock tests `/mx`, interview cards `/iv`, display dictionaries `/i18n`, `/voice/index.json`;
  about 5MB) and, per learning language, the recorded voices (`/voice/<set>/*.mp3`: English a*/b* sets, Spanish e*,
  Italian i*; English is about 100MB, so it warns to use Wi-Fi) into caches `bf-off-base` / `bf-off-voice-<L>`
  (6 at a time, one retry each, can be stopped, `navigator.storage.persist`). The service worker keeps `bf-off-*`,
  serves the JSON network first with the downloaded copy offline (and refreshes a downloaded copy), and recordings
  cache first. State in `babelflight.offline`; 「保存したデータを消す」 deletes the caches.
- **先行公開**: `FIRST_EARLY` + `earlyOpen(id)` for features ファースト gets before everyone (empty for now).
- Schema: `migrations/0014_first_ai.sql` (columns `coach`, `diary` of `bf_ai_usage`). `GET /api/ai/first` tells how
  many are left today.

## 全クラス共通の底上げ — `parts/f37_common.js` + `f37_css.html`

- **フライト遅延チケット** (`dayAgo`, `weekOfDay`, `dlyPending` in `e4_core.js`; used in `completeLesson`): one a week
  (the week of the missed day). Missing a single day keeps the streak; the next lesson uses the ticket by itself
  (`save.dly`, the covered days, synced as a union). Home shows it while pending, 記録 shows this week's ticket.
- **どうしてちがう？**: after a wrong answer, one reason made from the answer (no AI): the picked option's real
  meaning and the word that tells them apart; for build/type the first difference (missing/extra word, a/an/the,
  s, -ed, -ing, spelling, word order).
- **単語帳** (`save.wb`, per language, ☆ on the answer sheet and in search; missed phrases are added by themselves)
  and **単語をさがす** (all phrases of the learning language, by the phrase, its reading or its Japanese meaning; for
  English with the 日本語 display, the 英和辞典 below):
  view `words`, from 復習. 「この単語帳で練習する」 is a 10-question flight (mode `wb`).
- **復習の間隔の自動調整** (`srsNext`, called from `land`): per phrase ease `e` (1.3–3.0) and interval `iv` (days, up to
  180, ±8% spread): fast answers stretch it, slow or hinted ones shorten it, overdue time counts, a miss comes back
  in half a day. The box `b` still moves 1→6 as before (mastery, the ladder).
- **3分クイック** (home, mode `quick`): 8 phrases — up to 3 due, 2 weak, 2 new from the next lesson (with their card),
  the rest learned ones — asked in the harder forms (listen, write, order, type, cloze).
- **フレンドとランキング** (`parts/f38_social.js` + `f38_css.html`, server `src/lib/social.server.ts`,
  `migrations/0016_social.sql`): 記録 → フレンド (signed in). Each account has a friend code (it can be changed);
  typing a friend's code or opening `/?friend=CODE` makes both friends (30 at most, 15 adds a day). Friends see
  only each other's name and icon (sent by the page to `bf_rank`). The weekly ranking (Monday to Sunday, Japan
  time) is OFF at first: only while on are the miles of each lesson sent (400 a post, 3,000 a day, one post every
  20 seconds), and only friends who also turned it on are ranked. Turning it off deletes this week's miles.

## 英和辞典 (単語をさがす, English with the Japanese display, every class, free) — `parts/f45_dict.js` + `f45_css.html`

- 単語をさがす for English with the 日本語 display is a real English-Japanese dictionary (other languages and display
  languages keep the phrase search). It shows, per word: いまの英語 (labels, example, note), the dictionary's meanings
  (『』 bold, 《話》《米》… as labels, 〈C〉〈U〉 as 数えられる / 数えられない, `=word` as a link), the app's phrases with the
  word, ☆ (`d:<word>` in `save.wb.en`, listed under 「辞書で保存した単語」 in the 単語帳) and 「AIにくわしくきく」
  (`/api/ai/ask`, the AIに質問 count; inside Claude, `claude.use('sample')`).
- Search: English by the start of the word (exact first, then いまの英語, then common words), a few inflection rules
  (studied → studied + study, planes → plane), spelling suggestions (1–2 edits, a swap counts as one); 日本語 by the
  meaning (hiragana and katakana alike): いまの英語 whose meaning matches, then the dictionary's words for that meaning.
- Data `public/dict/en/` (about 8MB, 615 files, fetched only when needed): `meta.json`; `m.json` いまの英語
  `[[word, [[品詞, 意味, tags, 例文, 訳, メモ]…]]…]`; `w/<first 2 letters>.json` ejdict-hand rows `[word, meaning, rank]`
  (rank 3/2/1 = the 100/850/2000 basic words); `j/<n>.json` 日本語 → 英語 `{h:[words], g:{gloss in hiragana:[index]}}`
  with n = the gloss's first character code % 64. `public/sw.js` keeps every dictionary file fetched (`bf-off-dict`),
  so looked-up words work offline; オフライン完全版 (日本語の表示) can save the whole dictionary.
- Sources: **ejdict-hand** (くじらはんど, https://github.com/kujirahand/EJDict, Public Domain / CC0), about 47,000 entries;
  **いまの英語**, written for this app (slang, SNS and chat, new words and meanings, aviation English, K-POP, …; tags
  `new mean slang sns avi tech kpop game biz eco rude fit beauty sport school travel food money music talk feel bike
  idiom`). Clearly sexual words are left out; rude ones carry ⚠ 注意 and no example. The generator (Python) reads
  the ejdict `src/*.txt` and `frequency/`, the いまの英語 lists and the app's own English phrases (for ranking 日本語
  results) and writes the files above; rebuild after changing the lists. Generator and lists: `dict/gen_dict.py`,
  `dict/mod_*.py` (one tuple per sense: word, 品詞, 意味, tags, 例文, 訳, メモ), `dict/en_corpus.txt`; ejdict-hand is
  cloned into `dict/ejdict/` (ignored by git) or given with `EJDICT=`.

## 他のアプリにない練習 — `parts/e3g_special.js`, `f39_special.js` … `f42_noise.js` (CSS in `f39_css.html`, `f40_css.html`)

All free to run (no AI). 日本語 display only unless noted.
- **日本人のための特別コース** (`e3g_special.js`): one more section of 日常会話モード — 和製英語のワナ ①②, 相手で変わる言い方
  (英語 and 韓国語), 日本を説明する ①②. Units with `track:'daily', special:1`.
- **できることリスト** (`f39_special.js`, 記録): what you can now do in the language (旅行 / 日常 / 留学 / 日本を説明 / the
  chosen job), each line from the units it needs: ◐ after one lesson, ✓ once remembered after a gap.
- **次のフライト** (`f39_special.js`, home): the date of a real trip (`save.trip`): a countdown, what to learn each day
  before it, 出発前ブリーフィング (mode `brief`) in the last days, and 現地モード (tap to say a phrase) while away.
- **共同フライト** (`f40_coop.js`, server `social.server.ts` coop-*, `migrations/0017_coop.sql`): two friends share a
  weekly goal of 14 lessons (each person counts at most 6 a day); it only starts when both said yes. Reaching it moves
  the pair to the next city (`COOP_DEST`). Shown in 記録 → フレンド and on the home screen while flying together.
- **職業の1日** (`f41_jobday.js`, English, 職業モード home): a working day of パイロット / 客室乗務員 / 医師・看護師 /
  ITエンジニア on the route-simulation engine (`RTX.job`), with one trouble picked at random from two. Mode `jobday`.
- **雑音の中で聞き取る** (`f42_noise.js`, 学習の設定): 機内 / 空港 / 無線 / カフェ noise made with Web Audio, played under
  each voice in lessons, conversations, the route and the job day (not under 「ゆっくり」). Kept per device.
- **訛りのある英語** (`f43_accent.js`, AI管制官): the controller works at the airport of the course (`LANGS[L].code`: Dubai
  for アラビア語, Incheon for 韓国語 …; New York for 英語), or 羽田 / an English-speaking airport, chosen per course
  (`save.atcApt`). 訛り (`save.atcAcc`): なし (en-US) / 弱 (the English read by the device voice of that language) /
  強 (the server also asks the AI for `atc_local`, the line respelled in that language's letters, e.g. katakana).
  Airports, stations and runways are in `ATC_APTS`, mirrored in `src/lib/ai.server.ts` (harness test `atcapt_sync`).
  中国語 (北京) has no accent until a good voice is found.
- **現地の人と英語で話す** (`e3h_local.js`, scene `sc-local`, 旅行モード): one scene per course (not 英語) in its city —
  a Dubai taxi, a Seoul street stall, the Istanbul bazaar … The local speaks English in that country's accent (the
  AI管制官's voice and 訛りの強さ; for 強, `LOCAL_SC[L].resp` has each line in that language's letters), you answer in
  English (en-US). Each ワンポイント explains why the accent sounds the way it does. Hidden in the English display
  (the task would be the answer itself). The scene's own place and person come from `scMeta(L, uid)`.

## AI代とクラスの決め方 (rule for new features)

Decide a feature's class by (cost of one AI call) × (calls a person makes a day):
| 段階 | What it does | Examples | Classes |
|---|---|---|---|
| 0 AIなし | runs on the device (or plain D1 reads/writes) | f37–f42, search, 単語帳 | all |
| 1 軽いAI | one short text call | AIの例文練習 (`ask`), 管制官 (`atc`), `drill` — daily limits in `ai.server.ts` | all, more per day in higher classes |
| 2 重いAI | long output, free conversation, or daily automatic generation | AIコーチ, 日記, (planned) 職業の先輩AIキャラ | ファースト |
| 3 とても重い | images, or voice processed on the server | (planned) 写真からフレーズ | ファースト + a daily limit |

Keep each person's AI cost per month well under the class price (aim: under 20–30%), by daily limits.
Planned for when paid plans go live (not before): let free accounts try one 段階2 feature once a week.

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

Single 検定 levels can be opened for one account without a class: plan `friend-eiken` (a friend of the owner,
also matched by a salted SHA-256 of the email, never stored in plain text since the repository is public) gets
`grants: ["ek3", "ekp2"]` from `PLAN_GRANTS`. The page (`entGrant()` / `grantBanks()`) then opens those levels'
lessons (`bankLocked` / `examLocked`), the 目標 sheet, the mini 模試 and the full 模試 (`mockOK` / `mxOK`, only
those grades listed) and the interview practice (`ivLocked`), with a 🎁 note on the 検定 card; the class stays
エコノミー, the AI stays free, and the iPhone app shows none of it. The grant never lowers an account that already
has `all`, `family` or another plan. To stop it, remove the hash and the account's `bf_entitlements` row.

## Classes (搭乗クラス)

`parts/f17_cabin.js` + `f17_css.html` (検定 data in `f17_exam.js`). `cabinLv()`: -1 in the iPhone app (no classes
there), the test account's chosen class (switcher in 記録), otherwise `cabinPlanLv()`, which is エコノミー (0) for
everyone until paid plans open. エコノミー (website, signed in or not) gets 発音チェック and the 検定 tab; the paid
classes' features (検定コース, 模試, AI会話ロールプレイ, 弱点レポート, 授業の用語(くわしく), designs) show locked with
「もうすぐ申し込めます」. When billing goes live, `cabinPlanLv()` should return the class the account has paid for
(server-checked, like `entitled()`), and the plan card in `f21_billing.js` opens to everyone signed in.

授業の用語(くわしく) (留学モード, 英語, プレミアムエコノミーから): 8 subjects × 64 terms (8 units of 8). 数学・理科 are
in `f17_exam.js`; 社会・国語(英語の授業)・情報・保健体育・音楽・美術 in `f17_sdmore.js`, whose 한국어 / 中文
translations are in `i18n/<ui>/sdmore.tsv` (both were generated together; a changed note needs its line in both). Each item is [English term, 日本語, meaning + a sentence a
teacher might say in class]. `STUDY_MORE` (`f17_cabin.js`) lists the banks for the map and the card; the card folds
each subject (the first one, or the ones already started, open; `SM_OPEN` keeps what was opened by hand).
The other 11 languages get 8 subjects × 16 core terms in 2 banks of 64 (`sd-<lang>-a` 数学・理科・社会・国語,
`sd-<lang>-b` 情報・保健体育・音楽・美術; units `sd-<lang>-<subject><1|2>`) in `f17_sdlang.js` (`SUL()`, `SDL_MORE`), with
the term, its reading and a classroom sentence in that language; the meaning and the 日本語 / English / 한국어 / 中文
parts are shared with the English terms (`i18n/<ui>/sdlang.tsv`). Arabic sentences are wrapped in bidi isolates (U+2067…2069)
so they stay in one piece inside a left-to-right note.

### 裏設定 (the hidden reward)

`src/lib/reward.server.ts` + `migrations/0012_reward.sql` (table `bf_reward`). The landing screen of every lesson
sends its right answers to `POST /api/reward/tick` (`rewardTick()` in `f17_cabin.js`, signed-in accounts only).
The server counts at most 60 per lesson, 300 a day (Japan time) and one lesson per 20 s, so faking it is no
faster than studying; the count starts at 0 when this shipped (counts kept on the device can be edited, so
they are not used). Reaching 10,000 once gives ファースト for 90 days: `entitlementsOf()` reports `until`,
`aiTier()` gives First-class AI limits, and `cabinPlanLv()` returns 3 while `ENT.until` is in the future.
Nothing in the app mentions it until then; the replies never say how far along an account is. On the day it
is reached a 🏆 sheet says so, and the cabin card in 記録 shows 🏆 ごほうび with the end date. Not in the iPhone
app (`cabinOn()`). Account deletion removes the row; the data move keeps the larger count.

## 職業の資格 (検定モード)

`parts/f26_jobx.js`. The third group of 検定 follows the job chosen in 職業モード (`save.prof`), replacing the
fixed 航空英語(ICAO) group: `JOBX` maps job → language → certificates, `JOBX_C` holds each certificate's group
title and 目標 levels. `jobxApply()` rebuilds `EXAMS` / `XGOALS` from the base lists on every render, so a job
change shows at once (a target of the old job is simply ignored). Lessons are ordinary `XU()` units in banks
(`XBANK`, tier 2 = ビジネス like ICAO); banks under 40 phrases stay 準備中 (no meter). 研究者 has IELTS / TOPIK /
DELE / CILS (graduate school and research) in all four languages, 客室乗務員 TOEIC (interview, announcements). Jobs with
no language certificate (IT・美容師・スポーツ選手) get a practice group instead (`practice:true`: no 目標, marked
「公式の資格ではありません」 on the 検定 card).

## 面接練習 (英検 二次試験 3級〜1級, IELTS・TOEFL, 航空英語能力証明, DELE・CILS, OET・客室乗務員・全国通訳案内士)

`parts/f25_iv.js` + `f25_css.html`. Entry: the 検定 card of the course language (`IV_TESTS`: key, name, class,
minutes, language, group) and the 英検 模試 result (「続けて二次試験(面接)へ」). Classes like 検定コース: 英検3級・準2級
from プレミアムエコノミー, the rest from ビジネス; not in the iPhone app. 日本語 display only for now.

The cards are written in `iv/cards.py` (original passages, emoji pictures, examiner lines, model answers) and
built into `public/iv/<key>.json` by `python3 babel-flight/iv/build.py`, which checks every card as the page runs
it, with and without the entry (`SPEC`: passage length, 20 s silent reading before reading aloud, the questions of
each grade, the card turned over after the same question as in the real test, yes/no model answers, pools).

A grade = `entry` (knock, Hello, the 面接カード: "Can I have your card, please?", "Please have a seat.") + `open`
(the examiner's name, the grade) + one of ten `cards` (every grade; 1級: ten cards of five topics; pools of 12〜24 questions) + `exit` (the card back, "You may go now."); without
the entry (switch on the intro screen) `close` is used and the greeting starts with "Hello.". `{ex}` is the
examiner (name + voice, a different one each time, `IV_EX`). Like the real test you don't choose the card: the
one not done for the longest time is used (`ivPickCard`), or a card picked on the intro screen; history keeps
the card. The questions after the card is turned over (and the 自由会話 of 準1級・1級) are `pool` steps: drawn
from `pools` each run, not one of the last few asked (`ivPoolPick`, `babelflight.ivpool`). Each card is a list of steps:
`say` (examiner, browser voice), `card` / `hide`, `prep` (silent reading / preparation countdown), `read`,
`ans`, `yn` (Yes/No, then "Why?" / "Why not?" / "Please tell me more."), `topics` + `tq` (1級). Answers are
transcribed by the browser's speech recognition (en-US) where available; the result screen marks the words
heard while reading aloud and the learner rates each answer against the model answers (an estimate, not
the CSE score). History is kept on the device. AI marking can be added once the AI key is set.

IELTS, TOEFL and 航空英語能力証明 are in `iv/intl.py` and `iv/icao.py` (built by the same `build.py`, which checks
their own format: IELTS Part 1 groups + a cue card with 1 minute of notes + Part 3 (4 overall bands); TOEFL 2026
Listen and Repeat (7 sentences, getting longer) + Take an Interview (4 × 45 s); ICAO 導入 → Single Picture →
模擬ATC with an emergency (MAYDAY / PAN PAN) and a misunderstanding to clear up (Confirm / Say again), numbers
in words → flight description → 4 sequence pictures → 終結, the six ICAO areas). What the engine adds for them:
`card {show}` (one face of the card at a time: pic / info / panels / cue …), `prep {notes}` (a notes box that
stays during the countdown, shown again while speaking and in the result), `rep` (listen and repeat: the
sentence is spoken but not shown, marked like reading aloud), `ans {cue}` (a situation under the answer
window) and `{tip}`, `say {r:'atc'}` (the controller), pool entries that are whole groups of questions
(`{steps, items}`, ids prefixed by the pool step), items with `overall` (rated at the end), and per-test
texts (`flow`, `unit`, `voiceNote`, `origNote`, `markNote`, `sumNote`, `pardon`, `noPardon`, `att:false`).

DELE A2 / B1 and CILS A2 / B1 (`iv/romance.py`, Spanish / Italian voice and speech recognition) add choices on the
card: `card.sets` names lists of options (`temas`, `fotos`, `argomenti`, `temi`, 1級 `topics`) chosen with
`{k:'topics', set}` (or by tapping the card at any time); `{k:'tq', set, f, n, id}` speaks line n of field f of the
chosen option (`qs` questions, `rp` role-play lines, with `qsm` / `rpm` models and `rpc` cues), and items with
`set` show the chosen option and its `model`. `card.rolSet` + face `rol` shows the chosen photo's role card (DELE
B1 tarea 4); `hide {keep}` keeps the notes. Job interviews (`iv/jobs.py`, `iv/guide.py`) are listed only for the
profession that has the certificate (`job`, via `jobxList`, like ICAO for pilots): OET (two role-plays with
`card.roles` faces `role0` / `role1`, the patient as `say {r:'pt'}` with `data.roles`), the cabin crew interview
(door steps, an announcement to read aloud, a passenger role-play) and 全国通訳案内士 口述 in English / Korean /
Spanish / Italian (Japanese read aloud with `say {v:'ja-JP'}`, then a presentation on a chosen theme).

Other display languages get their own country's test: OPIc in 한국어 and CET-SET4 / CET-SET6 in 简体中文
(`iv/asia.py`, `IV_TESTS` entries with `ui`). Their JSON texts are written in that language; the page's own words
around them are translated in `i18n/ko/iv.tsv` and `i18n/zh/iv.tsv` (kept free of mixed text nodes so the
dictionary can find them). The CET pair discussion uses a simulated partner (`say {r:'pt'}`).

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
which the page loads only when a test is opened. A grade can have several tests (第1回 `ek3.py` → `ek3.json`,
第2回 `ek3_2.py` → `ek3-2.json`, …): `MX_VERS` in `f23_mx.js` says how many, the intro screen has a 第n回 switch, a
grade opens on the test with a run kept, else the first not taken, else the one taken longest ago (`mxPickVer`), and
the history is kept per test (`mxTid`: the grade key for 第1回, as before). `build.py` checks `MX_VERS` against the
files and stops when two tests of a grade share a question:

    python3 babel-flight/mock/build.py

`build.py` checks every test against the real format (`SPEC`: parts, question counts, option counts,
listening plays, writing word limits incl. the model answers) and stops with a list of problems.

## DUTY FREE 機内販売 (single cosmetic items) — `parts/f44_duty.js` + `f44_css.html`

Test account only, website only (`dfOn()` = `cabinOn() && cabinTester()`); every other account and the iPhone app see
nothing. A card under 搭乗クラス in 記録 opens the shop (a sheet): リバリー (the plane on the home map canvas via
`dfPlaneFill()` in `f5_home.js`, the flight bar `#pp`, the 搭乗券 icon, the takeoff film, the suite home line),
搭乗券デザイン (`html[data-ps]` overrides the pass colours), サウンドパック (wraps `clack()`, the flight board sound),
アイコン枠 (`html[data-fr]`) and 称号 (a badge on the ID card, `recordHTML` wrapper). Items: `DF_ITEMS`
(kind, id, name, 円, マイル or 0, text, look, 限定). Prices 80〜160円.
- **Save**: `save.df` = `{own, eq, ms, mon, cap, log}` (cleaned by `dfClean`; `unionSave` keeps items bought on either
  copy via `dfUnion`). Miles exchanged (`ms`) never touch `save.miles`, so the status does not drop.
- **Brakes**: a final confirmation sheet for every purchase (item, price, monthly total, no refund for digital goods) and
  a monthly limit (`cap`, default 500円; 購入しない / 300 / 500 / 1,000 / なし). Raising it needs the guardian checkbox.
- **Payments are TEST only**: nothing is charged. Before real sales: record purchases on the server (Stripe one-time
  Checkout on the website, In-App Purchase in the iPhone app — Apple's rules), make `own` come from the server like the
  classes, and keep the limit server-side too.
