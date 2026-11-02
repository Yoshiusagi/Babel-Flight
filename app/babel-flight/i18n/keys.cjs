/* Lists the Japanese texts of 日常会話モード that a display language must translate:
   phrase meanings, notes, the 8 travel scenes and the unit / scene titles, for every learning language.
   Prints JSON: {"<japanese>": {"cat": "m" | "n" | "u", "langs": [...]}} (langs: the courses that use it).
   Used by build.py to check that each dictionary covers them all. */
const fs = require('fs'), vm = require('vm'), path = require('path');
const P = path.join(__dirname, '..', 'parts') + '/';
const order = fs.readFileSync(P + 'order.txt', 'utf8').split(/\s+/).filter(f => /^(p3|e3|d[1-8])/.test(f));
const stub = () => new Proxy(function () {}, { get: (t, k) => k === Symbol.toPrimitive ? () => '' : stub(), apply: () => stub() });
const ctx = { console, document: stub(), navigator: { userAgent: '' }, localStorage: { getItem: () => null, setItem() {} }, location: { href: '', search: '', hostname: '' } };
ctx.window = ctx; vm.createContext(ctx);
vm.runInContext(order.map(f => fs.readFileSync(P + f, 'utf8')).join('\n') + '\n;this.__d={LANGS,DU,SCN,ORDER,UM,SCENE_META,CITIES,PROF,EN_UK,SC_UK,USUK};', ctx);
const d = ctx.__d, JP = /[぀-ヿ㐀-鿿]/, out = {};
const add = (k, cat, L) => { if (!k || !JP.test(k)) return; const o = out[k] || (out[k] = { cat, langs: [] }); if (L && !o.langs.includes(L)) o.langs.push(L); };
const ids = new Set();
for (const L of d.ORDER) {
  for (const u of [...d.LANGS[L].units, ...(d.DU[L] || [])]) { ids.add(u.id); for (const it of u.items) { add(it.jp, 'm', L); add(it.n, 'n', L); } }
  for (const id in d.SCN[L]) {
    if (!d.SCENE_META[id] || d.SCENE_META[id].grp !== 'travel') continue;
    const s = d.SCN[L][id];
    for (const t of s.turns) { add(t.pj, 'm', L); add(t.aj, 'm', L); add(t.n, 'n', L); }
    if (s.end) add(s.end[1], 'm', L);
  }
}
/* American / British English (the English course): British notes, scene lines and the 米英の違い unit */
for (const k in d.EN_UK) if (ids.has(k.replace(/\.\d+$/, ''))) add(d.EN_UK[k][1], 'n', 'en');
for (const k in d.SC_UK) { const o = d.SC_UK[k]; if (!/^sc-(class|teacher|home)/.test(k)) { add(o.pj, 'm', 'en'); add(o.aj, 'm', 'en'); } }
for (const x of d.USUK) { add(x[0], 'm', 'en'); add(x[3], 'n', 'en'); }
for (const t of ['米英の違い', 'アメリカ英語との違い', 'イギリス英語との違い', 'アメリカ英語とイギリス英語', '同じ意味でも、国によって言い方やつづりが変わる',
  '(アメリカ英語で)', '(イギリス英語で)', '(アメリカ英語では{0})', '(イギリス英語では{0})', '英語(イギリス)',
  'この端末にはイギリス英語の音声が入っていないので、ほかの英語の音声で読み上げます。']) add(t, 'u', 'en');
for (const id of ids) if (d.UM[id]) add(d.UM[id].jp, 'u');
for (const id in d.SCENE_META) { const m = d.SCENE_META[id]; if (m.grp !== 'travel') continue; add(m.jp, 'u'); add(m.role, 'u'); add(m.sit, 'u'); add(m.ini, 'u'); }
if (process.argv.includes('--names')) {
  /* names shown inside sentences: cities (with their Latin spelling from the route data) and jobs */
  const cities = {};
  for (const L of d.ORDER) { for (const c of d.CITIES[L] || []) cities[c[1]] = c[0]; cities[d.LANGS[L].city] = d.LANGS[L].cityEn; }
  process.stdout.write(JSON.stringify({ cities, profs: d.PROF.map(p => [p.jp, p.en]) }));
} else process.stdout.write(JSON.stringify(out));
