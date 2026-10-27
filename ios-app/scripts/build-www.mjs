// Builds www/ (what the iPhone app shows) from the same page source the website uses.
//  1. assemble app/babel-flight/parts into one page (same as the website)
//  2. point canonical / og URLs at the website
//  3. bundle the Google Fonts so the app looks right offline (skipped if there's no network)
import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, rmSync, writeFileSync, copyFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");
const repo = join(root, "..");
const www = join(root, "www");
const SITE = "https://babel-flight.higgsfield.app";
// iOS Safari's user agent makes Google Fonts answer with woff2 split by unicode-range
const UA =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1";

rmSync(www, { recursive: true, force: true });
mkdirSync(join(www, "fonts"), { recursive: true });

const page = join(www, "index.html");
execFileSync("python3", [join(repo, "app/babel-flight/parts/assemble.py"), page], { stdio: "inherit" });
let html = readFileSync(page, "utf8").split("%ORIGIN%").join(SITE);

// the website's install-as-app bits mean nothing inside the app
html = html.replace(/<link rel="manifest"[^>]*>\s*/g, "");

async function bundleFonts() {
  const m = html.match(/<link href="(https:\/\/fonts\.googleapis\.com\/css2\?[^"]+)" rel="stylesheet">/);
  if (!m) return "no font link";
  const cssUrl = m[1].replace(/&amp;/g, "&");
  const res = await fetch(cssUrl, { headers: { "user-agent": UA } });
  if (!res.ok) throw new Error(`fonts css ${res.status}`);
  let css = await res.text();
  const urls = [...new Set([...css.matchAll(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+)\)/g)].map((x) => x[1]))];
  let bytes = 0;
  // a few at a time
  for (let i = 0; i < urls.length; i += 8) {
    await Promise.all(
      urls.slice(i, i + 8).map(async (u) => {
        const r = await fetch(u);
        if (!r.ok) throw new Error(`font ${r.status} ${u}`);
        const buf = Buffer.from(await r.arrayBuffer());
        bytes += buf.length;
        const name = createHash("sha1").update(u).digest("hex").slice(0, 16) + ".woff2";
        writeFileSync(join(www, "fonts", name), buf);
        css = css.split(u).join("fonts/" + name);
      }),
    );
  }
  writeFileSync(join(www, "fonts", "fonts.css"), css.replace(/url\(fonts\//g, "url("));
  html = html
    .replace(/<link rel="preconnect" href="https:\/\/fonts\.(googleapis|gstatic)\.com"[^>]*>\s*/g, "")
    .replace(m[0], '<link href="fonts/fonts.css" rel="stylesheet">');
  return `${urls.length} font files, ${(bytes / 1048576).toFixed(1)} MB`;
}

try {
  console.log("fonts:", await bundleFonts());
} catch (e) {
  console.warn("fonts not bundled (the app will load them online):", e.message);
}

writeFileSync(page, html);
copyFileSync(join(repo, "app/public/favicon.svg"), join(www, "favicon.svg"));
console.log("www/index.html", (Buffer.byteLength(html) / 1024).toFixed(0), "KB");
