# Builds the 英和辞典 for 単語をさがす: app/public/dict/en/   (see README: 英和辞典)
#   git clone --depth 1 https://github.com/kujirahand/EJDict app/babel-flight/dict/ejdict   (or EJDICT=<that folder>)
#   python3 app/babel-flight/dict/gen_dict.py
# Inputs: ejdict-hand src/*.txt + frequency/ (Public Domain / CC0), the いまの英語 lists mod_*.py (this folder),
# en_corpus.txt (the app's English phrases, one per line; only for ranking 日本語 results).
#   w/<k>.json  ejdict-hand (CC0) rows by the first 2 letters of the normalised head: [head, definitions, rank]
#   j/<n>.json  Japanese -> English: {hiragana-folded gloss: [[head, short meaning, rank], ...]} by ord(first char) % 64
#   m.json      いまの英語 (written for the app): [[head, [[pos, meaning, tags, example, example_ja, note], ...]], ...]
import glob, re, json, os, sys, importlib.util, collections
HERE = os.path.dirname(os.path.abspath(__file__))
EJ = os.environ.get('EJDICT', HERE + '/ejdict')
OUT = os.path.normpath(HERE + '/../../public/dict/en')
NB = 64


def norm(s): return re.sub(r'[^a-z0-9]', '', s.lower())
def hira(s): return ''.join(chr(ord(c) - 0x60) if 'ァ' <= c <= 'ヶ' else c for c in s)
def key2(h):
    n = norm(h)
    return '' if not n else (n[:2] if len(n) > 1 else n + '_')


# ---- frequency (ranks) ----
RANK = {}
for f, r in (('2000', 1), ('850', 2), ('100', 3)):
    for w in open(EJ + '/frequency/%s.txt' % f, encoding='utf-8'):
        w = w.strip().lower()
        if w: RANK[w] = max(RANK.get(w, 0), r)

# ---- how often a word appears in the app's own English phrases ----
APPF = collections.Counter()
if os.path.exists(HERE + '/en_corpus.txt'):
    APPF.update(w for line in open(HERE + '/en_corpus.txt', encoding='utf-8') for w in re.findall(r"[a-z]+(?:'[a-z]+)?", line.lower()))
OLD = re.compile('《(古|詩|文|まれ|方|俗|卑|廃)》')

# ---- いまの英語 ----
MOD = collections.OrderedDict()
bad = []
TAGS = set('new mean slang sns avi tech kpop game biz eco rude fit beauty sport school travel food money music talk feel bike idiom'.split())
for f in sorted(glob.glob(HERE + '/mod_*.py')):
    s = importlib.util.spec_from_file_location('m', f); m = importlib.util.module_from_spec(s); s.loader.exec_module(m)
    for t in m.M:
        if len(t) != 7: bad.append((f, t)); continue
        h, pos, mean, tags, ex, exj, note = t
        for tg in tags.split():
            if tg not in TAGS: bad.append((f, h, 'tag', tg))
        if not h or not mean or not pos: bad.append((f, h, 'empty'))
        if bool(ex) != bool(exj): bad.append((f, h, 'example without translation'))
        if not mean.startswith('= ') and re.search('[A-Za-z]', mean) and not re.search('[぀-ヿ一-龯]', mean): bad.append((f, h, 'meaning not Japanese'))
        k = h.lower()
        e = MOD.setdefault(k, [h, []])
        if any(x[1] == mean for x in e[1]): continue
        e[1].append([pos, mean, tags, ex, exj, note])
if bad:
    for b in bad[:40]: print('BAD', b)
    sys.exit(1)

# ---- ejdict-hand ----
ROWS = []
for f in sorted(glob.glob(EJ + '/src/*.txt')):
    for line in open(f, encoding='utf-8'):
        line = line.rstrip('\n')
        if '\t' not in line: continue
        h, d = line.split('\t', 1)
        d = d.strip()
        if not d: continue
        for v in h.split(','):
            v = v.strip()
            if v and key2(v): ROWS.append([v, d, RANK.get(v.lower(), 0)])


def short(d, n=46):
    out = []
    for s in d.split(' / '):
        if s.startswith('='): continue
        s = re.sub(r'〈[CU]〉', '', s); s = re.sub(r'《[^》]*》', '', s).replace('『', '').replace('』', '').strip()
        if s: out.append(s)
        if len(' / '.join(out)) > n: break
    t = ' / '.join(out)
    return t if len(t) <= n + 8 else t[:n] + '…'


def glosses(d):
    for si, s in enumerate(d.split(' / ')[:6]):
        if s.startswith('='): continue
        imp = '『' in s
        t = re.sub(r'《[^》]*》', '', s); t = re.sub(r'〈[^〉]*〉', '', t)
        t = re.sub(r'\([^)]*\)', '', t); t = re.sub(r'（[^）]*）', '', t); t = re.sub(r'\[[^\]]*\]', '', t)
        t = t.replace('『', '').replace('』', '')
        for p in re.split(r'[,;、，；]', t):
            p = p.strip(' 　…').lstrip('をにのがとへで').strip(' 　…')
            if not p or len(p) > 14 or re.search('[A-Za-z0-9=]', p) or not re.search('[぀-ヿ一-龯]', p): continue
            yield p, imp, si, s


IDX = collections.defaultdict(dict)
for h, d, r in ROWS:
    for g, imp, si, sense in glosses(d):
        k = hira(g)
        plain = re.sub(r'[『』]', '', sense).strip()
        f = APPF.get(h.lower(), 0)
        sc = (3 if imp else 0) + 2 * r + min(4, f.bit_length()) + (1 if si == 0 else 0) + (1 if g == plain else 0) \
             - (1 if re.search('[ -]', h) else 0) - (0.5 if h[:1].isupper() else 0) - (2 if OLD.search(sense) else 0) + (2 if h.lower() in MOD else 0)
        cur = IDX[k].get(h)
        if cur is None or sc > cur[0]:
            IDX[k][h] = (sc, r)

os.makedirs(OUT + '/w', exist_ok=True); os.makedirs(OUT + '/j', exist_ok=True)
for f in glob.glob(OUT + '/w/*.json') + glob.glob(OUT + '/j/*.json'): os.remove(f)
W = collections.defaultdict(list)
for row in ROWS: W[key2(row[0])].append(row)
sizes = collections.Counter()
for k, rows in W.items():
    rows.sort(key=lambda x: (norm(x[0]), x[0]))
    s = json.dumps(rows, ensure_ascii=False, separators=(',', ':'))
    open('%s/w/%s.json' % (OUT, k), 'w', encoding='utf-8').write(s); sizes['w'] += len(s.encode())
B = collections.defaultdict(dict)
for k, heads in IDX.items():
    top = sorted(heads.items(), key=lambda x: (-x[1][0], len(x[0])))[:10]
    B[ord(k[0]) % NB][k] = [h for h, v in top]
for n in range(NB):
    tab, at, g = [], {}, {}
    for k, lst in sorted(B.get(n, {}).items()):
        ids = []
        for h in lst:
            if h not in at: at[h] = len(tab); tab.append(h)
            ids.append(at[h])
        g[k] = ids
    s = json.dumps({'h': tab, 'g': g}, ensure_ascii=False, separators=(',', ':'))
    open('%s/j/%d.json' % (OUT, n), 'w', encoding='utf-8').write(s); sizes['j'] += len(s.encode())
M = list(MOD.values())
s = json.dumps({'v': 1, 'e': M}, ensure_ascii=False, separators=(',', ':'))
open(OUT + '/m.json', 'w', encoding='utf-8').write(s); sizes['m'] += len(s.encode())
meta = {'v': 1, 'w': sorted(W.keys()), 'nb': NB, 'n': len(ROWS), 'nm': len(M),
        'src': 'ejdict-hand (Public Domain, CC0) + いまの英語 (Babel Flight)'}
open(OUT + '/meta.json', 'w', encoding='utf-8').write(json.dumps(meta, ensure_ascii=False, separators=(',', ':')))
print('rows', len(ROWS), 'chunks', len(W), 'glosses', len(IDX), 'modern', len(M), 'senses', sum(len(x[1]) for x in M))
print({k: '%.2fMB' % (v / 1e6) for k, v in sizes.items()}, 'biggest chunk', max((len(v), k) for k, v in W.items()))
