// App Store screenshots (6.9" iPhone: 1320 x 2868) from the app page in www/.
// Run after build-www.mjs:  node scripts/screenshots.mjs [outDir]
// Uses Playwright's Chromium with the app's own fonts; the page runs in "app" mode with a stand-in
// for the native plugins, so what you see is what the iPhone app shows.
import { chromium } from "playwright";
import { createServer } from "node:http";
import { readFile, mkdir } from "node:fs/promises";
import { extname, join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const www = join(root, "www");
const out = process.argv[2] || join(root, "screenshots");
await mkdir(out, { recursive: true });

const types = { ".html": "text/html", ".css": "text/css", ".woff2": "font/woff2", ".svg": "image/svg+xml" };
const server = createServer(async (req, res) => {
  const p = decodeURIComponent(new URL(req.url, "http://x").pathname);
  try {
    const body = await readFile(join(www, p === "/" ? "index.html" : p));
    res.writeHead(200, { "content-type": types[extname(p)] || (p === "/" ? "text/html" : "application/octet-stream") });
    res.end(body);
  } catch {
    res.writeHead(404).end();
  }
});
await new Promise((r) => server.listen(0, r));
const base = `http://127.0.0.1:${server.address().port}/`;

const NATIVE = `window.Capacitor={isNativePlatform:()=>true,getPlatform:()=>'ios',Plugins:new Proxy({},{get:(t,name)=>new Proxy({},{get:(o,m)=>()=>Promise.resolve(
  m==='checkPermissions'||m==='requestPermissions'?{display:'granted'}:{})})})};`;

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 440, height: 956 },
  deviceScaleFactor: 3,
  isMobile: true,
  hasTouch: true,
  locale: "ja-JP",
  timezoneId: "Asia/Tokyo",
  reducedMotion: "reduce",
});
await ctx.addInitScript(NATIVE);
// the app's server isn't needed for screenshots
await ctx.route("https://babel-flight.higgsfield.app/**", (r) =>
  r.request().url().endsWith("/api/account/config") ? r.fulfill({ json: { enabled: false } }) : r.fulfill({ status: 503, json: { ok: false } }),
);
const page = await ctx.newPage();
await page.goto(base);
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(800);

let n = 0;
async function shot(name) {
  await page.waitForTimeout(700);
  n++;
  const file = join(out, `${String(n).padStart(2, "0")}-${name}.png`);
  await page.screenshot({ path: file });
  console.log(file);
}

await shot("welcome");
// onboarding: language → profession → level → goal
const click = (sel) => page.locator(sel).first().click();
await click('[data-ob-lang="en"]');
await click('[data-ob-next]');
await click('[data-ob-prof="pilot"]').catch(() => click("[data-ob-prof]"));
await click('[data-ob-next]');
await click('[data-ob-next]');
await click('[data-ob-next]').catch(() => {});
await page.waitForTimeout(1200);
await shot("route-map");

// a lesson
await click("[data-node]");
await page.waitForTimeout(500);
await shot("lesson-sheet");
await click("[data-go]");
await page.waitForTimeout(1500);
if (await page.locator("#cine:not([hidden])").count()) await click("#cine");
await page.waitForTimeout(800);
await shot("question");
await click("[data-abort]");
await click("[data-abort-yes]");

// professions / record
await page.evaluate(() => window.scrollTo(0, 0));
await click('[data-tab="record"]');
await shot("record");

await browser.close();
server.close();
