// Babel Flight AI on the standalone site: the 「AIに質問」 explanation and the ATC role-play,
// answered by Claude through the Anthropic API.
//
// - Signed-in accounts only, with daily limits per account and for the whole site.
// - Prompts are built here from fixed templates (the browser only sends the phrase, the
//   question or the pilot's radio call), so the endpoint is not a general-purpose chatbot.
// - Users may be teenagers: a child-safety instruction is part of every system prompt and the
//   app labels everything as AI.
// - The API key is a website secret (ANTHROPIC_API_KEY); without it the AI stays "coming soon".
//
// Routes (dispatched from server.ts):
//   GET  /api/ai/status   { enabled, signedIn, left? }
//   POST /api/ai/ask      { lang, phrase, jp, reading?, note?, question } -> streamed plain text
//   POST /api/ai/atc      { scenario, history[], pilot } -> { atc, score, feedback_ja, better, done, left }
//   POST /api/ai/drill    { lang, variant?, items[{t,jp}] } -> { qs[{t,jp,wrong[3]}], left }
import type { D1Database, D1PreparedStatement } from "@cloudflare/workers-types";

import { accountUid } from "./account.server";
import { fullAccess } from "./entitlements.server";
import { bindings } from "./bindings.server";
import { FIREBASE_WEB_CONFIG } from "./firebase-config";
import { isSameOrigin, json, num, readJsonBody, type Row } from "./http.server";

const MODEL = "claude-haiku-5-5";
const API_URL = "https://api.anthropic.com/v1/messages";
const ASK_PER_DAY = 20;
const ATC_SESSIONS_PER_DAY = 5;
const ATC_TURNS_PER_DAY = 60;
const DRILL_PER_DAY = 10;
const ATC_MAX_HISTORY = 8;
const SITE_CALLS_PER_DAY = 3000;
// Accounts with full access (the test account) have no daily limits; "left" is reported as this number.
const UNLIMITED = 999;
const NO_LIMIT = 1_000_000_000;
const JST_MS = 9 * 3_600_000;
const LANG_NAMES: Record<string, string> = { ko: "韓国語", en: "英語", es: "スペイン語", it: "イタリア語" };
const LANG_EN: Record<string, string> = { ko: "Korean", en: "English", es: "Spanish (Spain)", it: "Italian" };

const SAFETY_JA =
  "利用者には中学生・高校生(13〜17歳)も含まれます。年齢にふさわしい、やさしく安全な内容だけで答えてください。" +
  "語学の学習に関係のない質問、危険・暴力・性的・差別的な内容、個人情報(住所・学校名・連絡先など)を求める話題には答えず、" +
  "「ごめんね、ここでは語学の質問に答えるよ」のように短く伝えて、語学の話に戻してください。" +
  "あなたはAIです。人間のふりはしないでください。";

const SAFETY_EN =
  "Some learners are teenagers (13-17). Keep everything age-appropriate and safe. Stay strictly inside this radio training " +
  "scenario; if the learner writes about anything unrelated, unsafe, or personal (address, school, contact details), do not " +
  "engage with it: give a short kind note in feedback_ja steering back to the exercise, and repeat your previous transmission. " +
  "You are an AI; never claim to be a human.";

type Scenario = { fac: string; en: string; first: string };

// AI会話ロールプレイ (a paid feature; only accounts with full access for now). Must stay in step with
// ROLE_SC in babel-flight/parts/f17_cabin.js. The learner always speaks first.
type RoleScene = { who: string; place: string; goal: string };
const ROLE_SCENES: Record<string, RoleScene> = {
  cabin: { who: "a friendly flight attendant on an international flight", place: "on board, during the meal service",
    goal: "The passenger (the learner) calls you to ask for a drink or help. Offer the meal choices, answer the request, and handle one small extra request such as a blanket." },
  immigration: { who: "an immigration officer", place: "at passport control at the airport",
    goal: "Ask the purpose of the visit, the length of stay and where the learner will stay, then finish by welcoming them to the country." },
  hotel: { who: "a hotel front desk clerk", place: "at the hotel front desk",
    goal: "Check the learner in: confirm the reservation and the number of nights, ask for the passport, and explain breakfast time and the Wi-Fi." },
  restaurant: { who: "a server at a casual restaurant", place: "at a restaurant",
    goal: "Seat the learner, take the order (one dish and a drink), ask about allergies, and bring the bill at the end." },
  directions: { who: "a kind local person on the street", place: "on a street in the city",
    goal: "The learner asks the way to the station. Give simple directions in two or three steps and check that they understood." },
  homestay: { who: "a host parent at a homestay", place: "at home on the learner's first evening",
    goal: "Welcome the learner, ask about the trip, explain one or two house rules (dinner time, the bathroom), and ask what food they like." },
  class: { who: "a school teacher", place: "in a classroom after a lesson at a school abroad",
    goal: "The learner asks about the homework. Explain it simply, give the deadline, and ask if they have any other questions." },
  interview: { who: "a speaking-test examiner", place: "in a speaking test room",
    goal: "Greet the learner and ask four short questions, one at a time, about their hometown, hobbies, school life and future dream, with one follow-up question." },
};

const SAFETY_ROLE =
  "Some learners are teenagers (13-17). Keep everything age-appropriate and safe. Stay strictly inside this practice " +
  "conversation; if the learner writes about anything unrelated, unsafe, or personal (address, school name, contact " +
  "details), do not engage with it: give a short kind note in feedback_ja steering back to the exercise, and repeat or " +
  "simplify your previous line. You are an AI playing a role; never claim to be a real human.";

/** "role:<scene>:<lang>" -> the system prompt for that conversation, or null. */
function roleSystem(id: string): string | null {
  const m = /^role:([a-z]+):(ko|en|es|it)$/.exec(id);
  const s = m ? ROLE_SCENES[m[1] ?? ""] : undefined;
  if (!m || !s) return null;
  const lang = LANG_EN[m[2] ?? ""] ?? "English";
  return (
    `You are role-playing ${s.who} for Babel Flight, a language-learning app. The learner is a Japanese student ` +
    `practising ${lang}. This is a practice conversation only.\nPlace: ${s.place}.\nWhat happens: ${s.goal}\n` +
    `The learner speaks first. Speak ONLY in ${lang}, in short, natural, polite sentences at a beginner-to-intermediate ` +
    "level (at most two sentences per turn).\n" +
    "After each learner message, reply with ONLY one JSON object and no other text, in this shape:\n" +
    `{"atc":"your next line in ${lang}. Use an empty string only when the conversation is finished.",` +
    '"score":3,"feedback_ja":"1-2 short sentences in easy Japanese for the student: what was good and what to fix ' +
    '(grammar, word choice, politeness, missing information).",' +
    `"better":"a natural model version of the learner's last message in ${lang}","done":false}\n` +
    `score: 3 = natural and correct, 2 = understandable with small mistakes, 1 = hard to understand, 0 = not usable or not in ${lang}.\n` +
    "Keep the conversation to about five learner messages, then finish with done true and a short friendly closing line " +
    "in \"atc\". If the learner writes in Japanese or seems stuck, kindly explain in feedback_ja what to say and repeat " +
    "or simplify your previous line in \"atc\".\n" +
    SAFETY_ROLE
  );
}
// Must stay in step with ATC_SC in babel-flight/parts/c8_ai.js (ids, station, opening call).
const ATC_SCENARIOS: Record<string, Scenario> = {
  taxi: {
    fac: "TOKYO GROUND",
    en: "The aircraft is parked at spot 12 at Tokyo Haneda and ready for departure. The pilot must call you and request taxi. Give a taxi clearance to runway 34R, check the readback, then tell the pilot to contact Tokyo Tower on 124.35 when holding short.",
    first: "",
  },
  takeoff: {
    fac: "TOKYO TOWER",
    en: "The aircraft is holding short of runway 34R at Tokyo Haneda. You have already told the pilot to line up and wait. Next, issue the takeoff clearance with the wind, check the readback, and after takeoff tell the pilot to contact Tokyo Departure on 126.0.",
    first: "Babel 201, Tokyo Tower, runway 34R, line up and wait.",
  },
  landing: {
    fac: "TOKYO TOWER",
    en: "The aircraft is on final approach to runway 34L at Tokyo Haneda, about 8 miles out, and has just switched to your frequency. The pilot must check in. Give a landing clearance with the wind, check the readback, and after landing tell the pilot to vacate the runway and contact Tokyo Ground on 121.7.",
    first: "",
  },
  emergency: {
    fac: "TOKYO DEPARTURE",
    en: "Shortly after departure from Tokyo Haneda, climbing through 5000 feet, the aircraft has an engine failure. The pilot should declare an emergency (MAYDAY) and request to return. Acknowledge, ask for persons on board and fuel endurance, and give a heading and altitude for an approach to runway 34L.",
    first: "",
  },
};

type Usage = { ask: number; atcStart: number; atcTurn: number; drill: number };
type Exchange = { pilot: string; atc: string; score: number; feedback: string; better: string };

function jstDay(ms: number): string {
  return new Date(ms + JST_MS).toISOString().slice(0, 10);
}

function text(v: unknown, max: number, required = false): string | null {
  if (v === undefined || v === null || v === "") return required ? null : "";
  if (typeof v !== "string") return null;
  const t = v.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "").trim();
  if (t.length > max || (required && !t)) return null;
  return t;
}

/* ---------- usage limits ---------- */

async function usage(db: D1Database, uid: string, day: string): Promise<Usage> {
  const r = await db
    .prepare("SELECT ask, atc_start, atc_turn, drill FROM bf_ai_usage WHERE uid = ? AND day = ?")
    .bind(uid, day)
    .first<Row>();
  return { ask: num(r?.ask), atcStart: num(r?.atc_start), atcTurn: num(r?.atc_turn), drill: num(r?.drill) };
}

function leftOf(u: Usage, unlimited = false) {
  if (unlimited) return { ask: UNLIMITED, atc: UNLIMITED, drill: UNLIMITED };
  return {
    ask: Math.max(0, ASK_PER_DAY - u.ask),
    atc: Math.max(0, ATC_SESSIONS_PER_DAY - u.atcStart),
    drill: Math.max(0, DRILL_PER_DAY - u.drill),
  };
}

async function siteBusy(db: D1Database, day: string): Promise<boolean> {
  const r = await db
    .prepare("SELECT COALESCE(SUM(ask + atc_turn + drill), 0) AS n FROM bf_ai_usage WHERE day = ?")
    .bind(day)
    .first<Row>();
  return num(r?.n) >= SITE_CALLS_PER_DAY;
}

/** Counts one call if the account is under its limit; returns the new usage row or null. */
async function reserve(
  db: D1Database,
  uid: string,
  day: string,
  kind: "ask" | "atc" | "drill",
  start: boolean,
  unlimited = false,
): Promise<Usage | null> {
  const lim = (n: number) => (unlimited ? NO_LIMIT : n);
  let stmt: D1PreparedStatement;
  if (kind === "drill") {
    stmt = db
      .prepare(
        "INSERT INTO bf_ai_usage (uid, day, drill) VALUES (?, ?, 1) ON CONFLICT(uid, day) DO UPDATE " +
          "SET drill = bf_ai_usage.drill + 1 WHERE bf_ai_usage.drill < ? RETURNING ask, atc_start, atc_turn, drill",
      )
      .bind(uid, day, lim(DRILL_PER_DAY));
  } else if (kind === "ask") {
    stmt = db
      .prepare(
        "INSERT INTO bf_ai_usage (uid, day, ask) VALUES (?, ?, 1) ON CONFLICT(uid, day) DO UPDATE " +
          "SET ask = bf_ai_usage.ask + 1 WHERE bf_ai_usage.ask < ? RETURNING ask, atc_start, atc_turn, drill",
      )
      .bind(uid, day, lim(ASK_PER_DAY));
  } else if (start) {
    stmt = db
      .prepare(
        "INSERT INTO bf_ai_usage (uid, day, atc_start, atc_turn) VALUES (?, ?, 1, 1) ON CONFLICT(uid, day) DO UPDATE " +
          "SET atc_start = bf_ai_usage.atc_start + 1, atc_turn = bf_ai_usage.atc_turn + 1 " +
          "WHERE bf_ai_usage.atc_start < ? AND bf_ai_usage.atc_turn < ? RETURNING ask, atc_start, atc_turn, drill",
      )
      .bind(uid, day, lim(ATC_SESSIONS_PER_DAY), lim(ATC_TURNS_PER_DAY));
  } else {
    stmt = db
      .prepare(
        "INSERT INTO bf_ai_usage (uid, day, atc_turn) VALUES (?, ?, 1) ON CONFLICT(uid, day) DO UPDATE " +
          "SET atc_turn = bf_ai_usage.atc_turn + 1 WHERE bf_ai_usage.atc_turn < ? RETURNING ask, atc_start, atc_turn, drill",
      )
      .bind(uid, day, lim(ATC_TURNS_PER_DAY));
  }
  const r = await stmt.first<Row>();
  return r ? { ask: num(r.ask), atcStart: num(r.atc_start), atcTurn: num(r.atc_turn), drill: num(r.drill) } : null;
}

/** Gives the call back when the AI could not answer (so a failed request doesn't use up the day). */
async function refund(db: D1Database, uid: string, day: string, kind: "ask" | "atc" | "drill", start: boolean): Promise<void> {
  const sql =
    kind === "drill"
      ? "UPDATE bf_ai_usage SET drill = MAX(drill - 1, 0) WHERE uid = ? AND day = ?"
      : kind === "ask"
      ? "UPDATE bf_ai_usage SET ask = MAX(ask - 1, 0) WHERE uid = ? AND day = ?"
      : start
        ? "UPDATE bf_ai_usage SET atc_start = MAX(atc_start - 1, 0), atc_turn = MAX(atc_turn - 1, 0) WHERE uid = ? AND day = ?"
        : "UPDATE bf_ai_usage SET atc_turn = MAX(atc_turn - 1, 0) WHERE uid = ? AND day = ?";
  await db.prepare(sql).bind(uid, day).run();
}

/* ---------- Anthropic API ---------- */

function callClaude(key: string, body: Record<string, unknown>): Promise<Response> {
  return fetch(API_URL, {
    method: "POST",
    headers: { "x-api-key": key, "anthropic-version": "2023-06-01", "content-type": "application/json" },
    body: JSON.stringify({ model: MODEL, ...body }),
  });
}

/** Turns Anthropic's server-sent events into a plain stream of answer text. */
function sseToText(body: ReadableStream<Uint8Array>): ReadableStream<Uint8Array> {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  const out = new TextEncoder();
  let buffer = "";
  return new ReadableStream<Uint8Array>({
    async pull(controller) {
      for (;;) {
        const { done, value } = await reader.read();
        if (done) {
          controller.close();
          return;
        }
        buffer += decoder.decode(value, { stream: true });
        let chunk = "";
        let nl = buffer.indexOf("\n");
        while (nl >= 0) {
          const line = buffer.slice(0, nl).trim();
          buffer = buffer.slice(nl + 1);
          if (line.startsWith("data:")) {
            try {
              const ev = JSON.parse(line.slice(5)) as Row;
              const delta = ev.delta as Row | undefined;
              if (ev.type === "content_block_delta" && delta?.type === "text_delta" && typeof delta.text === "string") {
                chunk += delta.text;
              }
            } catch {
              // ignore keep-alives and partial lines
            }
          }
          nl = buffer.indexOf("\n");
        }
        if (chunk) {
          controller.enqueue(out.encode(chunk));
          return;
        }
      }
    },
    cancel(reason) {
      return reader.cancel(reason);
    },
  });
}

/* ---------- handlers ---------- */

async function handleStatus(request: Request, db: D1Database, enabled: boolean): Promise<Response> {
  if (!enabled) return json({ enabled: false, signedIn: false });
  const uid = await accountUid(request, db);
  if (!uid) return json({ enabled: true, signedIn: false });
  const all = await fullAccess(db, uid);
  return json({ enabled: true, signedIn: true, unlimited: all, left: leftOf(await usage(db, uid, jstDay(Date.now())), all) });
}

async function handleAsk(request: Request, db: D1Database, key: string): Promise<Response> {
  const uid = await accountUid(request, db);
  if (!uid) return json({ ok: false, error: "signin" }, 401);
  const body = await readJsonBody(request, 4000);
  const lang = typeof body?.lang === "string" ? body.lang : "";
  const phrase = text(body?.phrase, 300, true);
  const jp = text(body?.jp, 300, true);
  const reading = text(body?.reading, 300);
  const note = text(body?.note, 600);
  const question = text(body?.question, 200, true);
  if (!LANG_NAMES[lang] || phrase === null || jp === null || reading === null || note === null || question === null) {
    return json({ ok: false, error: "bad_request" }, 400);
  }

  const day = jstDay(Date.now());
  const all = await fullAccess(db, uid);
  if (!all && (await siteBusy(db, day))) return json({ ok: false, error: "busy" }, 429);
  const used = await reserve(db, uid, day, "ask", false, all);
  if (!used) return json({ ok: false, error: "quota", left: leftOf(await usage(db, uid, day)) }, 429);

  const system =
    "あなたは語学学習アプリ「Babel Flight」の中で、学習者の質問に答えるAIの語学の先生です。" +
    "日本の中学生にもわかるように説明するのが得意です。" +
    SAFETY_JA;
  const prompt =
    `学習中の言語: ${LANG_NAMES[lang]}\nフレーズ: ${phrase}\n日本語の意味: ${jp}` +
    (reading ? `\n読み(カタカナ): ${reading}` : "") +
    (note ? `\nアプリのワンポイント解説: ${note}` : "") +
    `\n\n生徒の質問: ${question}` +
    "\n\n答え方: 日本語で、理由まで納得できるように説明してください。300字程度。見出しやMarkdownの記号(#や*)は使わず、" +
    "短い段落で書いてください。最後に「例:」として似た例文を1つ(原文と日本語訳)添えてください。確かでないことは断定しないでください。";

  let upstream: Response | null = null;
  try {
    upstream = await callClaude(key, {
      max_tokens: 1000,
      stream: true,
      system,
      messages: [{ role: "user", content: prompt }],
    });
  } catch {
    upstream = null;
  }
  if (!upstream || !upstream.ok || !upstream.body) {
    console.error("ai ask upstream failed:", upstream ? upstream.status : "network");
    await refund(db, uid, day, "ask", false);
    return json({ ok: false, error: "upstream" }, 502);
  }
  return new Response(sseToText(upstream.body as unknown as ReadableStream<Uint8Array>), {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "no-store",
      "x-ai-left": String(leftOf(used, all).ask),
    },
  });
}

function readHistory(v: unknown): Exchange[] | null {
  if (!Array.isArray(v) || v.length > ATC_MAX_HISTORY) return null;
  const out: Exchange[] = [];
  for (const item of v) {
    if (!item || typeof item !== "object") return null;
    const r = item as Row;
    const pilot = text(r.pilot, 300, true);
    const atc = text(r.atc, 400);
    const feedback = text(r.feedback, 400);
    const better = text(r.better, 400);
    const score = Math.round(num(r.score));
    if (pilot === null || atc === null || feedback === null || better === null || score < 0 || score > 3) return null;
    out.push({ pilot, atc, score, feedback, better });
  }
  return out;
}

function atcSystem(sc: Scenario): string {
  return (
    "You are role-playing an air traffic controller for a pilot-training app called Babel Flight. The learner is a Japanese " +
    "student who dreams of becoming an airline pilot. Use standard ICAO radiotelephony phraseology in English. This is a " +
    "training simulation only.\n" +
    `Airport: Tokyo Haneda (RJTT). Your station: ${sc.fac}. The pilot's callsign is "Babel 201".\nScenario: ${sc.en}\n` +
    (sc.first ? `You have already transmitted: "${sc.first}"\n` : "") +
    "After each pilot transmission, reply with ONLY one JSON object and no other text, in this shape:\n" +
    '{"atc":"your next radio transmission in English, short and realistic. Use an empty string only when the scenario is finished.",' +
    '"score":3,"feedback_ja":"1-2 short sentences in easy Japanese for the student: what was good and what to fix, such as the callsign, ' +
    'the readback of runway, altitude or frequency, or missing words.","better":"a model version of the pilot\'s last transmission in English",' +
    '"done":false}\n' +
    "score: 3 = correct and complete, 2 = understandable with small mistakes, 1 = important items missing, 0 = not usable.\n" +
    "Keep the scenario to about 4 pilot transmissions, then finish with done true and a short friendly sign-off in \"atc\". " +
    "If the pilot writes in Japanese or seems confused, kindly explain in feedback_ja what to say and repeat your previous " +
    "transmission in \"atc\".\n" +
    SAFETY_EN
  );
}

function parseAtc(raw: string): { atc: string; score: number; feedback_ja: string; better: string; done: boolean } | null {
  const a = raw.indexOf("{");
  const b = raw.lastIndexOf("}");
  if (a < 0 || b <= a) return null;
  try {
    const r = JSON.parse(raw.slice(a, b + 1)) as Row;
    const score = Math.round(num(r.score));
    return {
      atc: String(r.atc ?? "").slice(0, 400),
      score: score < 0 ? 0 : score > 3 ? 3 : score,
      feedback_ja: String(r.feedback_ja ?? "").slice(0, 400),
      better: String(r.better ?? "").slice(0, 400),
      done: r.done === true,
    };
  } catch {
    return null;
  }
}

async function handleAtc(request: Request, db: D1Database, key: string): Promise<Response> {
  const uid = await accountUid(request, db);
  if (!uid) return json({ ok: false, error: "signin" }, 401);
  const body = await readJsonBody(request, 12000);
  const scName = typeof body?.scenario === "string" ? body.scenario : "";
  const role = roleSystem(scName);
  const sc = role ? undefined : ATC_SCENARIOS[scName];
  const history = readHistory(body?.history ?? []);
  const pilot = text(body?.pilot, 300, true);
  if ((!sc && !role) || !history || pilot === null) return json({ ok: false, error: "bad_request" }, 400);
  if (history.length >= ATC_MAX_HISTORY) return json({ ok: false, error: "too_long" }, 400);

  const day = jstDay(Date.now());
  const start = history.length === 0;
  const all = await fullAccess(db, uid);
  if (role && !all) return json({ ok: false, error: "plan" }, 403);
  if (!all && (await siteBusy(db, day))) return json({ ok: false, error: "busy" }, 429);
  const used = await reserve(db, uid, day, "atc", start, all);
  if (!used) return json({ ok: false, error: "quota", left: leftOf(await usage(db, uid, day)) }, 429);

  const messages: { role: "user" | "assistant"; content: string }[] = [];
  const said = role ? "Learner" : "Pilot transmission";
  for (const ex of history) {
    messages.push({ role: "user", content: `${said}: "${ex.pilot}"` });
    messages.push({
      role: "assistant",
      content: JSON.stringify({ atc: ex.atc, score: ex.score, feedback_ja: ex.feedback, better: ex.better, done: false }),
    });
  }
  messages.push({ role: "user", content: `${said}: "${pilot}"` });

  let reply: ReturnType<typeof parseAtc> = null;
  let upstreamOk = false;
  try {
    const res = await callClaude(key, { max_tokens: 600, system: role ?? atcSystem(sc as Scenario), messages });
    if (res.ok) {
      upstreamOk = true;
      const data = (await res.json()) as { content?: { type?: string; text?: string }[] };
      const raw = (data.content ?? []).map((c) => (c.type === "text" ? c.text ?? "" : "")).join("");
      reply = parseAtc(raw);
    } else {
      console.error("ai atc upstream failed:", res.status);
    }
  } catch {
    console.error("ai atc upstream failed: network");
  }
  if (!upstreamOk) {
    await refund(db, uid, day, "atc", start);
    return json({ ok: false, error: "upstream" }, 502);
  }
  if (!reply) {
    // The reply was paid for, so the turn still counts; but a first turn that failed does not use up a session.
    if (start) {
      await db
        .prepare("UPDATE bf_ai_usage SET atc_start = MAX(atc_start - 1, 0) WHERE uid = ? AND day = ?")
        .bind(uid, day)
        .run();
    }
    return json({ ok: false, error: "invalid_json" }, 502);
  }
  return json({ ok: true, ...reply, left: leftOf(used, all) });
}

/* ---------- AI example drill ---------- */

type DrillQ = { t: string; jp: string; wrong: string[] };

function cleanDrill(raw: string): DrillQ[] {
  const a = raw.indexOf("{");
  const b = raw.lastIndexOf("}");
  if (a < 0 || b <= a) return [];
  let data: Row;
  try {
    data = JSON.parse(raw.slice(a, b + 1)) as Row;
  } catch {
    return [];
  }
  const out: DrillQ[] = [];
  const qs = Array.isArray(data.qs) ? data.qs : [];
  for (const q of qs) {
    if (out.length >= 6 || !q || typeof q !== "object") continue;
    const r = q as Row;
    const t = text(r.t, 160, true);
    const jp = text(r.jp, 120, true);
    if (t === null || jp === null || !Array.isArray(r.wrong)) continue;
    const seen = new Set([jp]);
    const wrong: string[] = [];
    for (const w of r.wrong) {
      const x = text(w, 120, true);
      if (x !== null && !seen.has(x) && wrong.length < 3) {
        seen.add(x);
        wrong.push(x);
      }
    }
    if (wrong.length === 3) out.push({ t, jp, wrong });
  }
  return out;
}

async function handleDrill(request: Request, db: D1Database, key: string): Promise<Response> {
  const uid = await accountUid(request, db);
  if (!uid) return json({ ok: false, error: "signin" }, 401);
  const body = await readJsonBody(request, 4000);
  const lang = typeof body?.lang === "string" ? body.lang : "";
  const variant = body?.variant === "uk" ? "British" : "American";
  const items: { t: string; jp: string }[] = [];
  const list = Array.isArray(body?.items) ? body.items : null;
  if (!LANG_EN[lang] || !list || list.length < 1 || list.length > 3) return json({ ok: false, error: "bad_request" }, 400);
  for (const it of list) {
    const r = (it && typeof it === "object" ? it : {}) as Row;
    const t = text(r.t, 200, true);
    const jp = text(r.jp, 200, true);
    if (t === null || jp === null) return json({ ok: false, error: "bad_request" }, 400);
    items.push({ t, jp });
  }

  const day = jstDay(Date.now());
  const all = await fullAccess(db, uid);
  if (!all && (await siteBusy(db, day))) return json({ ok: false, error: "busy" }, 429);
  const used = await reserve(db, uid, day, "drill", false, all);
  if (!used) return json({ ok: false, error: "quota", left: leftOf(await usage(db, uid, day)) }, 429);

  const language = lang === "en" ? `${variant} English` : LANG_EN[lang];
  const system =
    "You write practice questions for Babel Flight, a language-learning app. The learner is a Japanese junior high school " +
    `student learning ${language}. Some learners are teenagers (13-17): use only everyday, friendly, age-appropriate ` +
    "content. Never include anything violent, sexual, hateful, dangerous or personal. Use only correct, natural, standard " +
    "language; when unsure, choose a simpler sentence. Reply with JSON only.";
  const prompt =
    "The learner just got these phrases wrong:\n" +
    items.map((d, i) => `${i + 1}. ${d.t} (= ${d.jp})`).join("\n") +
    `\nFor EACH phrase, write 2 NEW short example sentences (at most 12 words) in ${language} that reuse the same key word ` +
    "or pattern in a different everyday situation. Give a natural Japanese translation of each, and 3 wrong Japanese " +
    "translations that look plausible but clearly mean something else.\n" +
    'Reply with ONLY this JSON: {"qs":[{"t":"sentence","jp":"correct Japanese","wrong":["wrong 1","wrong 2","wrong 3"]}]}';

  let qs: DrillQ[] = [];
  let upstreamOk = false;
  try {
    const res = await callClaude(key, { max_tokens: 1500, system, messages: [{ role: "user", content: prompt }] });
    if (res.ok) {
      upstreamOk = true;
      const data = (await res.json()) as { content?: { type?: string; text?: string }[] };
      qs = cleanDrill((data.content ?? []).map((c) => (c.type === "text" ? c.text ?? "" : "")).join(""));
    } else {
      console.error("ai drill upstream failed:", res.status);
    }
  } catch {
    console.error("ai drill upstream failed: network");
  }
  if (!upstreamOk || !qs.length) {
    await refund(db, uid, day, "drill", false);
    return json({ ok: false, error: upstreamOk ? "invalid_json" : "upstream" }, 502);
  }
  return json({ ok: true, qs, left: leftOf(used, all) });
}

/* ---------- dispatcher ---------- */

export async function handleAi(request: Request, url: URL): Promise<Response | null> {
  if (!url.pathname.startsWith("/api/ai/")) return null;
  const route = url.pathname.slice("/api/ai/".length);
  const key = bindings().ANTHROPIC_API_KEY;
  const enabled = typeof key === "string" && key.length > 20 && !!FIREBASE_WEB_CONFIG;
  const db = bindings().DB;
  if (!db) return json({ ok: false, error: "no_db" }, 503);
  try {
    if (route === "status" && request.method === "GET") return await handleStatus(request, db, enabled);
    if (request.method !== "POST") return json({ ok: false, error: "method" }, 405, { allow: "GET, POST" });
    if (!isSameOrigin(request, url)) return json({ ok: false }, 403);
    if (!enabled || !key) return json({ ok: false, error: "disabled" }, 503);
    if (route === "ask") return await handleAsk(request, db, key);
    if (route === "atc") return await handleAtc(request, db, key);
    if (route === "drill") return await handleDrill(request, db, key);
    return json({ ok: false, error: "not_found" }, 404);
  } catch (error) {
    console.error("ai error:", error instanceof Error ? error.message : "unknown");
    return json({ ok: false, error: "server" }, 500);
  }
}
