// Makes the App Store in-app purchases (non-consumable) for Babel Flight, through the App Store Connect API.
//
//   node ios-app/scripts/asc-iap.mjs ios-app/iap/products.json      (MODE=dry-run: only shows what would happen)
//
// Environment: ASC_KEY (contents of the .p8), ASC_KEY_ID, ASC_ISSUER_ID, BUNDLE_ID, MODE (dry-run | create).
// For each product in products.json it:
//   1. creates the product if it does not exist yet (same product ID = nothing is created twice)
//   2. sets the price in Japan (the price must be one of Apple's price points)
//   3. adds the Japanese name and description if they are missing
// It never changes a product that already has a price and a Japanese localization.
// Submitting for review is NOT done here.
import { createSign } from "node:crypto";
import { readFileSync, appendFileSync } from "node:fs";

const API = "https://api.appstoreconnect.apple.com";
const MODE = process.env.MODE || "dry-run";
const file = process.argv[2];
const spec = JSON.parse(readFileSync(file, "utf8"));
const TERR = spec.territory || "JPN";

const b64url = (buf) => Buffer.from(buf).toString("base64url");
function token() {
  const now = Math.floor(Date.now() / 1000);
  const head = b64url(JSON.stringify({ alg: "ES256", kid: process.env.ASC_KEY_ID, typ: "JWT" }));
  const body = b64url(JSON.stringify({ iss: process.env.ASC_ISSUER_ID, iat: now, exp: now + 15 * 60, aud: "appstoreconnect-v1" }));
  const input = `${head}.${body}`;
  const sig = createSign("SHA256").update(input).sign({ key: process.env.ASC_KEY, dsaEncoding: "ieee-p1363" });
  return `${input}.${b64url(sig)}`;
}
async function api(method, path, body) {
  const url = path.startsWith("http") ? path : API + path;
  const res = await fetch(url, {
    method,
    headers: { Authorization: `Bearer ${token()}`, "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let json = null;
  try { json = text ? JSON.parse(text) : null; } catch { /* not JSON */ }
  if (!res.ok) throw new Error(`${method} ${path} -> ${res.status}: ${text.slice(0, 600)}`);
  return json;
}
async function all(path) {
  // follows the paging links, so every item is found
  let out = [];
  let next = path;
  while (next) {
    const j = await api("GET", next);
    out = out.concat(j.data || []);
    next = j.links && j.links.next ? j.links.next : null;
  }
  return out;
}
// the price schedule of a product; 404 = no price set yet
async function priceSet(id) {
  try {
    const j = await api("GET", `/v2/inAppPurchases/${id}/iapPriceSchedule`);
    return !!(j && j.data);
  } catch (e) {
    if (String(e.message).includes("-> 404")) return false;
    throw e;
  }
}
const log = [];
function say(line) { console.log(line); log.push(line); }

async function main() {
  const apps = await api("GET", `/v1/apps?filter[bundleId]=${encodeURIComponent(process.env.BUNDLE_ID || "com.babelflight.app")}`);
  if (!apps.data || apps.data.length !== 1) throw new Error(`app not found (${apps.data ? apps.data.length : 0})`);
  const appId = apps.data[0].id;
  say(`App: ${apps.data[0].attributes.name} (${appId}) mode=${MODE}`);

  const existing = await all(`/v1/apps/${appId}/inAppPurchasesV2?limit=200`);
  const byProduct = new Map(existing.map((x) => [x.attributes.productId, x]));
  say(`App Store にある課金商品: ${existing.length}件`);

  if (MODE === "points") {
    // read-only: the yen price points Apple offers for this app (for checking the price steps)
    const first = existing[0];
    const pts = await all(`/v2/inAppPurchases/${first.id}/pricePoints?filter[territory]=${TERR}&limit=200`);
    const vals = [...new Set(pts.map((x) => Number(x.attributes.customerPrice)))].sort((a, b) => a - b);
    say(`${TERR} の価格ポイント: ${vals.length}件（全部）`);
    say("0〜3000円: " + vals.filter((v) => v <= 3000).join(", "));
    const steps = vals.slice(1).map((v, i) => v - vals[i]);
    say("隣り合う価格の差（重複なし）: " + [...new Set(steps)].sort((a, b) => a - b).join(", "));
    if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, "```\n" + log.join("\n") + "\n```\n");
    return;
  }
  let created = 0, priced = 0, localized = 0;
  for (const p of spec.products) {
    const row = [p.key, p.productId, `${p.priceYen}円`];
    let iap = byProduct.get(p.productId);
    if (!iap) {
      row.push("作成して、価格と日本語を設定する");
      if (MODE === "create") {
        const j = await api("POST", "/v2/inAppPurchases", {
          data: {
            type: "inAppPurchases",
            attributes: { name: p.referenceName, productId: p.productId, inAppPurchaseType: "NON_CONSUMABLE" },
            relationships: { app: { data: { type: "apps", id: appId } } },
          },
        });
        iap = j.data;
        created++;
      }
    }
    if (iap) {
      const id = iap.id;
      const hasPrice = await priceSet(id);
      if (!hasPrice) {
        row.push("価格を設定する");
        if (MODE === "create") {
          const points = await all(`/v2/inAppPurchases/${id}/pricePoints?filter[territory]=${TERR}&limit=200`);
          const pt = points.find((x) => Number(x.attributes.customerPrice) === p.priceYen);
          if (!pt) throw new Error(`${p.productId}: ${p.priceYen}円 の価格がありません（Apple の価格表にない）`);
          await api("POST", "/v1/inAppPurchasePriceSchedules", {
            data: {
              type: "inAppPurchasePriceSchedules",
              relationships: {
                inAppPurchase: { data: { type: "inAppPurchases", id } },
                baseTerritory: { data: { type: "territories", id: TERR } },
                manualPrices: { data: [{ type: "inAppPurchasePrices", id: "${price1}" }] },
              },
            },
            included: [{
              type: "inAppPurchasePrices",
              id: "${price1}",
              attributes: { startDate: null },
              relationships: { inAppPurchasePricePoint: { data: { type: "inAppPurchasePricePoints", id: pt.id } } },
            }],
          });
          priced++;
        }
      }
      const locs = await all(`/v2/inAppPurchases/${id}/inAppPurchaseLocalizations?limit=50`);
      const ja = locs.find((l) => l.attributes.locale === "ja");
      if (!ja) {
        row.push("日本語を追加する");
        if (MODE === "create") {
          await api("POST", "/v1/inAppPurchaseLocalizations", {
            data: {
              type: "inAppPurchaseLocalizations",
              attributes: { locale: "ja", name: p.nameJa, description: p.descriptionJa },
              relationships: { inAppPurchaseV2: { data: { type: "inAppPurchases", id } } },
            },
          });
          localized++;
        }
      }
      if (hasPrice && ja) row.push("設定済み");
    }
    say(`- ${row.join(" | ")}`);
  }
  say(`結果（${MODE}）: 作成 ${created} / 価格 ${priced} / 日本語 ${localized}`);
  if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, "```\n" + log.join("\n") + "\n```\n");
}

main().catch((e) => { console.error(e.message); process.exit(1); });
