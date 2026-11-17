# 国語の検定 (漢検・日本語検定) for the 日本語 course with the Japanese display: builds the drill files.
#   python3 gen_kk.py            check every level (errors stop it; warnings are listed for a look by hand)
#   python3 gen_kk.py --write    also write public/kk/<key>.json and parts/f46_kkidx.js
# A level is kk/src/<key>.py with STEPS = [(title, kind, [question, ...]), ...]; a question is
# (stem, answer, wrong1, wrong2, wrong3, explanation). The part of the stem the question is about is in [ ].
# Every question is original practice material for Babel Flight (nothing from real papers).
import os, sys, json, re, importlib.util

HERE = os.path.dirname(os.path.abspath(__file__))
APP = os.path.normpath(HERE + '/..')
OUT_JSON = os.path.normpath(APP + '/../public/kk')
OUT_JS = APP + '/parts/f46_kkidx.js'
DATA = json.load(open(HERE + '/data/kanji.json', encoding='utf-8'))
K = DATA['k']
FUHYO = {w: r for ws, rs in DATA['fuhyo'] for w in ws for r in rs[:1]}
ORD = ['10', '9', '8', '7', '6', '5', '4', '3', 'p2', '2', 'p1', '1']

# key, name, family, kanji allowed up to (漢検 level code), pass mark %
LEVELS = [
    ('kj10', '漢検10級', 'kj', '10', 80), ('kj9', '漢検9級', 'kj', '9', 80), ('kj8', '漢検8級', 'kj', '8', 80),
    ('kj7', '漢検7級', 'kj', '7', 70), ('kj6', '漢検6級', 'kj', '6', 70), ('kj5', '漢検5級', 'kj', '5', 70),
    ('kj4', '漢検4級', 'kj', '4', 70), ('kj3', '漢検3級', 'kj', '3', 70), ('kjp2', '漢検準2級', 'kj', 'p2', 70),
    ('kj2', '漢検2級', 'kj', '2', 80), ('kjp1', '漢検準1級', 'kj', 'p1', 80), ('kj1', '漢検1級', 'kj', '1', 80),
    ('nk7', '日本語検定7級', 'nk', '9', 70), ('nk6', '日本語検定6級', 'nk', '7', 70), ('nk5', '日本語検定5級', 'nk', '5', 70),
    ('nk4', '日本語検定4級', 'nk', '3', 70), ('nk3', '日本語検定3級', 'nk', '2', 70), ('nk2', '日本語検定2級', 'nk', '2', 70),
    ('nk1', '日本語検定1級', 'nk', '1', 70),
]
KINDS = {'hitsujun', 'yomi', 'kaki', 'bushu', 'kousei', 'yoji', 'yojii', 'taigi', 'ruigi', 'doon', 'goji', 'okuri', 'shiki', 'kakusu',
         'onkun', 'hyogai', 'kotowaza', 'keigo', 'bunpo', 'goi', 'imi', 'hyoki', 'kanji', 'sogo'}
READ_KINDS = {'yomi', 'hyogai'}            # [kanji] -> the answer is the reading
WRITE_KINDS = {'kaki', 'doon', 'okuri'}     # [カタカナ] -> the answer is the kanji (with okurigana)

def is_kanji(c): return '一' <= c <= '鿿' or c in '々〆' or '㐀' <= c <= '䶿' or '\U00020000' <= c <= '\U0002ffff'
def k2h(s): return ''.join(chr(ord(c) - 0x60) if 'ァ' <= c <= 'ヶ' else c for c in s)
VOICE = dict(zip('かきくけこさしすせそたちつてとはひふへほ', 'がぎぐげござじずぜぞだぢづでどばびぶべぼ'))
HALF = dict(zip('はひふへほ', 'ぱぴぷぺぽ'))

def stems(c):
    """readings a kanji can take inside a word (hiragana), from the 常用漢字表 (and the 表外 list for 準1級・1級)"""
    e = K.get(c)
    if not e: return set()
    out = set()
    for r, ex in e.get('y', []):
        r = k2h(r); out.add(r)
        for ok in e.get('ok', []):
            a, _, b = ok.partition('.')
            if a + b == r: out.add(a)
    for r in e.get('x', []):
        out.add(k2h(r.replace('.', '')))
    for ok in e.get('ok', []):
        out.add(ok.partition('.')[0])
    return {s for s in out if s}

def variants(s, first, last):
    v = {s}
    if not first and s[0] in VOICE: v.add(VOICE[s[0]] + s[1:])
    if not first and s[0] in HALF: v.add(HALF[s[0]] + s[1:])
    if not last and len(s) >= 2 and s[-1] in 'つちくきう': v.add(s[:-1] + 'っ')
    return v

def reads_as(word, kana):
    """can `word` (kanji and kana) be read as `kana`? A rough check for the reading questions
    (連濁・半濁音・促音 and the 付表 words are allowed)."""
    kana = k2h(kana)
    if FUHYO.get(word) == kana: return True
    memo = {}
    def go(i, j):
        if (i, j) in memo: return memo[(i, j)]
        if i == len(word): return j == len(kana)
        c = word[i]; ok = False
        if not is_kanji(c):
            h = k2h(c)
            ok = kana.startswith(h, j) and go(i + 1, j + len(h))
        else:
            cand = stems(word[i - 1]) if c == '々' and i > 0 else stems(c)
            for s in cand:
                for v in variants(s, i == 0, i == len(word) - 1):
                    if kana.startswith(v, j) and go(i + 1, j + len(v)): ok = True; break
                if ok: break
            if not ok:   # a 付表 word starting here
                for w, r in FUHYO.items():
                    if word.startswith(w, i) and kana.startswith(r, j) and go(i + len(w), j + len(r)): ok = True; break
        memo[(i, j)] = ok
        return ok
    return go(0, 0)

def level_ok(c, upto):
    e = K.get(c)
    return bool(e) and ORD.index(e['l']) <= ORD.index(upto)

def load(key):
    p = HERE + '/src/' + key + '.py'
    if not os.path.exists(p): return None
    spec = importlib.util.spec_from_file_location('kk_' + key, p)
    m = importlib.util.module_from_spec(spec); spec.loader.exec_module(m)
    return m.STEPS

def check(key, name, fam, upto, steps, errs, warns, seen):
    own = 0; targets = 0
    for si, (title, kind, qs) in enumerate(steps):
        if kind not in KINDS: errs.append('%s step %d: kind %s' % (key, si + 1, kind))
        if len(qs) != 10: warns.append('%s step %d (%s): %d questions' % (key, si + 1, title, len(qs)))
        for qi, q in enumerate(qs):
            where = '%s %d-%d' % (key, si + 1, qi + 1)
            if len(q) != 6: errs.append(where + ': needs 6 fields'); continue
            stem, ans, w1, w2, w3, ex = q
            opts = [ans, w1, w2, w3]
            if len(set(opts)) != 4 or not all(o.strip() for o in opts): errs.append(where + ': 4 different options needed ' + repr(opts))
            if not ex.strip(): errs.append(where + ': no explanation')
            if (key, stem) in seen: errs.append(where + ': same question as ' + seen[(key, stem)])
            seen[(key, stem)] = where
            m = re.search(r'\[([^\]]+)\]', stem)
            if kind in READ_KINDS | WRITE_KINDS and not m: errs.append(where + ': no [target]')
            # the kanji of the question and of the options stay within the level (日本語検定 and 準1級・1級: a warning)
            txt = stem.replace('[', '').replace(']', '') + ('' if kind in ('bushu', 'hitsujun') else ''.join(opts))
            bad = sorted({c for c in txt if is_kanji(c) and c != '々' and not level_ok(c, upto)})
            if bad:
                (errs if fam == 'kj' and upto not in ('p1', '1') else warns).append(where + ': kanji above the level ' + ''.join(bad))
            # how often the level's own kanji is what is asked
            if fam == 'kj' and m:
                t = m.group(1) if kind in READ_KINDS else ans
                tk = [c for c in t if is_kanji(c) and c in K]
                if tk:
                    targets += 1
                    if any(K[c]['l'] == upto for c in tk): own += 1
            # readings
            if fam == 'kj' and upto not in ('p1', '1') and m:
                if kind in READ_KINDS and not reads_as(m.group(1), ans):
                    warns.append(where + ': reading? %s = %s' % (m.group(1), ans))
                if kind in WRITE_KINDS and re.fullmatch(r'[ぁ-んァ-ヶー]+', m.group(1)) and not reads_as(ans, m.group(1)):
                    warns.append(where + ': writing? %s = %s' % (m.group(1), ans))
            if kind == 'kakusu':
                ch = m.group(1) if m else ''
                if len(ch) == 1 and K.get(ch, {}).get('s') and str(K[ch]['s']) not in ans:
                    errs.append(where + ': strokes of %s are %d' % (ch, K[ch]['s']))
    return own, targets

def main(write):
    errs, warns, idx, seen, stats = [], [], {}, {}, []
    for key, name, fam, upto, pas in LEVELS:
        steps = load(key)
        if steps is None: continue
        own, targets = check(key, name, fam, upto, steps, errs, warns, seen)
        nq = sum(len(s[2]) for s in steps)
        stats.append('%s %d steps %d questions%s' % (name, len(steps), nq, (' ・ the level\'s own kanji in %d/%d' % (own, targets)) if targets else ''))
        idx[key] = [name, pas, [[t, k, len(q)] for t, k, q in steps]]
        if write:
            os.makedirs(OUT_JSON, exist_ok=True)
            json.dump({'v': 1, 'k': key, 'n': name, 'p': pas, 's': [[t, k, [[q[0], list(q[1:5]), q[5]] for q in qs]] for t, k, qs in steps]},
                      open(OUT_JSON + '/' + key + '.json', 'w', encoding='utf-8'), ensure_ascii=False, separators=(',', ':'))
    for s in stats: print(s)
    for w in warns: print('warn', w)
    for e in errs: print('ERROR', e)
    if errs: sys.exit(1)
    if write:
        js = ('/* generated by kk/gen_kk.py: the levels that have drills, their pass mark and steps [title, kind, questions] */\n'
              'var KK_IDX=' + json.dumps(idx, ensure_ascii=False, separators=(',', ':')) + ';\n')
        open(OUT_JS, 'w', encoding='utf-8').write(js)
        print('wrote', len(idx), 'levels')

if __name__ == '__main__':
    main('--write' in sys.argv)
