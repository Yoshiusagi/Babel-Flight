#!/usr/bin/env python3
"""Builds the 英検 full-format mock tests (public/mx/<key>.json) from the sources in this folder.

Each source (ek5.py, ek4.py, …) defines TEST = {...}. This script checks every test against the
real exam's format (SPEC below: parts, question counts, option counts, how often audio plays,
word limits) and writes the JSON the page loads on demand (parts/f23_mx.js).

    python3 babel-flight/mock/build.py          # from app/
"""
import hashlib, importlib.util, json, os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
OUT = os.path.join(HERE, '..', '..', 'public', 'mx')

# Real format, checked from the official 英検 pages (2024 renewal onward).
# part: (type, questions, extra)   extra for listening: (play count, 'read' = 3 options read aloud | 'print' = 4 printed, picture?)
SPEC = {
    'ek5': {'name': '英検5級', 'R': (25 * 60, [('gap', 15), ('dgap', 5), ('order', 5, 4)]),
            'L': [('resp', 10, (2, 'read', True)), ('dlg', 5, (2, 'print', False)), ('picsent', 10, (2, 'read', True))]},
    'ek4': {'name': '英検4級', 'R': (35 * 60, [('gap', 15), ('dgap', 5), ('order', 5, 5), ('passage', 10, [2, 3, 5])]),
            'L': [('resp', 10, (2, 'read', True)), ('dlg', 10, (2, 'print', False)), ('mono', 10, (2, 'print', False))]},
    'ek3': {'name': '英検3級', 'R': (65 * 60, [('gap', 15), ('dgap', 5), ('passage', 10, [2, 3, 5]), ('email', 1, (15, 25)), ('opinion', 1, (25, 35))]),
            'L': [('resp', 10, (1, 'read', True)), ('dlg', 10, (2, 'print', False)), ('mono', 10, (2, 'print', False))]},
    'ekp2': {'name': '英検準2級', 'R': (80 * 60, [('gap', 15), ('dgap', 5), ('pgap', 2, [2]), ('passage', 7, [3, 4]), ('email', 1, (40, 50)), ('opinion', 1, (50, 60))]),
             'L': [('resp', 10, (1, 'read', False)), ('dlg', 10, (1, 'print', False)), ('mono', 10, (1, 'print', False))]},
    'ekp2p': {'name': '英検準2級プラス', 'R': (85 * 60, [('gap', 17), ('pgap', 6, [3, 3]), ('passage', 8, [3, 5]), ('summary', 1, (25, 35)), ('opinion', 1, (50, 60))]),
              'L': [('dlg', 15, (1, 'print', False)), ('mono', 15, (1, 'print', False))]},
    'ek2': {'name': '英検2級', 'R': (85 * 60, [('gap', 17), ('pgap', 6, [3, 3]), ('passage', 8, [3, 5]), ('summary', 1, (45, 55)), ('opinion', 1, (80, 100))]),
            'L': [('dlg', 15, (1, 'print', False)), ('mono', 15, (1, 'print', False))]},
    'ekp1': {'name': '英検準1級', 'R': (90 * 60, [('gap', 18), ('pgap', 6, [3, 3]), ('passage', 7, [3, 4]), ('summary', 1, (60, 70)), ('opinion', 1, (120, 150))]),
             'L': [('dlg', 12, (1, 'print', False)), ('mono', 12, (1, 'print', False)), ('real', 5, (1, 'print', False))]},
    'ek1': {'name': '英検1級', 'R': (100 * 60, [('gap', 22), ('pgap', 6, [3, 3]), ('passage', 7, [3, 4]), ('summary', 1, (90, 110)), ('opinion', 1, (200, 240))]),
            'L': [('dlg', 10, (1, 'print', False)), ('mono', 10, (1, 'print', False)), ('real', 5, (1, 'print', False)), ('interview', 2, (1, 'print', False))]},
}
ORDER = list(SPEC.keys())
TITLES = {
    'gap': '短文の語句空所補充', 'dgap': '会話文の文空所補充', 'order': '日本文付き短文の語句整序',
    'pgap': '長文の語句空所補充', 'passage': '長文の内容一致選択',
    'email': 'ライティング(Eメール)', 'opinion': 'ライティング(英作文)', 'summary': 'ライティング(英文要約)',
    'resp': '会話の応答文選択', 'dlg': '会話の内容一致選択', 'picsent': 'イラストの内容一致選択',
    'mono': '文の内容一致選択', 'real': 'Real-Life形式の内容一致選択', 'interview': 'インタビューの内容一致選択',
}
SPEAKERS = {'M', 'W', 'B', 'G', 'N'}
WRITE = {'email', 'opinion', 'summary'}

errors = []


def err(key, where, msg):
    errors.append(f'{key} {where}: {msg}')


def words(s):
    return len(re.findall(r"[A-Za-z0-9]+(?:['’\-][A-Za-z0-9]+)*", s))


def seeded(s):
    return int(hashlib.sha256(s.encode()).hexdigest(), 16)


def check_q(key, where, q, n_opts, need_q=True):
    if need_q and not str(q.get('q', '')).strip():
        err(key, where, 'no question')
    o = q.get('o')
    if not isinstance(o, list) or len(o) != n_opts or any(not str(x).strip() for x in o):
        err(key, where, f'needs {n_opts} options')
    elif len(set(o)) != len(o):
        err(key, where, 'duplicate options')
    if not isinstance(q.get('a'), int) or not (0 <= q['a'] < n_opts):
        err(key, where, 'bad answer index')
    if not str(q.get('ex', '')).strip():
        err(key, where, 'no explanation')


def build_order(key, where, it, n):
    w, ans = it.get('w'), it.get('ans')
    if not isinstance(w, list) or len(w) != n:
        err(key, where, f'order needs {n} pieces')
        return
    if sorted(ans or []) != list(range(1, n + 1)):
        err(key, where, 'ans must use each box once')
        return
    marks = '①②③④⑤'
    right = (ans[1], ans[3])
    pairs = [(x, y) for x in range(1, n + 1) for y in range(1, n + 1) if x != y and (x, y) != right]
    r = seeded(it['jp'])
    picks = []
    while len(picks) < 3:
        p = pairs[r % len(pairs)]
        r //= 7
        if p not in picks:
            picks.append(p)
        else:
            r += 1
    opts = picks + [right]
    pos = seeded(it['jp'] + '#') % 4
    opts[3], opts[pos] = opts[pos], opts[3]
    it['o'] = [f'{marks[x - 1]} - {marks[y - 1]}' for x, y in opts]
    it['a'] = pos
    full = ' '.join([it.get('pre', '')] + [w[i - 1] for i in ans] + [it.get('post', '')]).strip()
    it['full'] = re.sub(r'\s+([?.!,])', r'\1', full)
    if not str(it.get('ex', '')).strip():
        err(key, where, 'no explanation')


def check_lines(key, where, item):
    lines = item.get('lines')
    if not isinstance(lines, list) or not lines:
        err(key, where, 'no audio lines')
        return
    for ln in lines:
        if not (isinstance(ln, list) and len(ln) == 2 and ln[0] in SPEAKERS and str(ln[1]).strip()):
            err(key, where, f'bad line {ln!r}')


def build(key):
    spec = SPEC[key]
    path = os.path.join(HERE, key + '.py')
    if not os.path.exists(path):
        return None
    sp = importlib.util.spec_from_file_location('mx_' + key, path)
    mod = importlib.util.module_from_spec(sp)
    sp.loader.exec_module(mod)
    t = mod.TEST
    out = {'key': key, 'name': spec['name'], 'sections': []}
    # 筆記 (reading, then writing from 3級)
    rtime, rparts = spec['R']
    src = t['R']
    if len(src) != len(rparts):
        err(key, 'R', f'{len(src)} parts, format has {len(rparts)}')
    rw = any(p[0] in WRITE for p in rparts)
    sec = {'id': 'R', 'title': 'リーディング・ライティング' if rw else 'リーディング', 'time': rtime, 'parts': []}
    for i, (p, s) in enumerate(zip(src, rparts)):
        typ, n = s[0], s[1]
        where = f'R{i + 1}'
        if p.get('type') != typ:
            err(key, where, f'type {p.get("type")} but format has {typ}')
            continue
        part = dict(p)
        part['title'] = TITLES[typ]
        if typ in ('gap', 'dgap'):
            items = p['items']
            if len(items) != n:
                err(key, where, f'{len(items)} questions, format has {n}')
            for j, q in enumerate(items):
                check_q(key, f'{where}.{j + 1}', q, 4)
                if typ == 'gap' and '(　)' not in q.get('q', ''):
                    err(key, f'{where}.{j + 1}', 'gap needs (　)')
        elif typ == 'order':
            if len(p['items']) != n:
                err(key, where, f'{len(p["items"])} questions, format has {n}')
            for j, it in enumerate(p['items']):
                build_order(key, f'{where}.{j + 1}', it, s[2])
        elif typ in ('passage', 'pgap'):
            blocks = p['blocks']
            if [len(b['qs']) for b in blocks] != s[2]:
                err(key, where, f'blocks {[len(b["qs"]) for b in blocks]}, format has {s[2]}')
            for b in blocks:
                if not str(b.get('body', '')).strip():
                    err(key, where, 'empty passage')
                for j, q in enumerate(b['qs']):
                    check_q(key, f'{where}.{b.get("label", "")}{j + 1}', q, 4, need_q=(typ == 'passage'))
                if typ == 'pgap':
                    marks = re.findall(r'\(\s*(\d+)\s*\)', b['body'])
                    if len(marks) != len(b['qs']):
                        err(key, where, f'{len(marks)} blanks in the passage, {len(b["qs"])} questions')
        elif typ in WRITE:
            lo, hi = s[2]
            part['words'] = [lo, hi]
            m = words(p.get('model', ''))
            if not (lo <= m <= hi):
                err(key, where, f'model answer has {m} words, needs {lo}-{hi}')
            if not p.get('checks'):
                err(key, where, 'no self-check points')
            if not str(p.get('prompt', '')).strip():
                err(key, where, 'no prompt')
        sec['parts'].append(part)
    out['sections'].append(sec)
    # リスニング
    lsec = {'id': 'L', 'title': 'リスニング', 'parts': []}
    src = t['L']
    if len(src) != len(spec['L']):
        err(key, 'L', f'{len(src)} parts, format has {len(spec["L"])}')
    for i, (p, s) in enumerate(zip(src, spec['L'])):
        typ, n, (play, opts, pic) = s
        where = f'L{i + 1}'
        if p.get('type') != typ:
            err(key, where, f'type {p.get("type")} but format has {typ}')
            continue
        part = dict(p)
        part.update({'title': TITLES[typ], 'play': play, 'read': opts == 'read'})
        nq = 0
        for j, it in enumerate(p['items']):
            w2 = f'{where}.{j + 1}'
            if pic and not str(it.get('pic', '')).strip():
                err(key, w2, 'needs a picture')
            if typ != 'picsent':
                check_lines(key, w2, it)
            if typ == 'real' and not str(it.get('situ', '')).strip():
                err(key, w2, 'Real-Life needs a situation')
            qs = it.get('qs') or [it]
            for k, q in enumerate(qs):
                check_q(key, f'{w2}.{k + 1}', q, 3 if opts == 'read' else 4, need_q=typ in ('dlg', 'mono', 'real', 'interview'))
            nq += len(qs)
        if nq != n:
            err(key, where, f'{nq} questions, format has {n}')
        lsec['parts'].append(part)
    out['sections'].append(lsec)
    out['nq'] = {'R': sum(len(p.get('items', [])) + sum(len(b['qs']) for b in p.get('blocks', [])) for p in out['sections'][0]['parts'] if p['type'] not in WRITE),
                 'W': sum(1 for p in out['sections'][0]['parts'] if p['type'] in WRITE),
                 'L': sum(sum(len(it.get('qs') or [it]) for it in p['items']) for p in lsec['parts'])}
    return out


def main():
    os.makedirs(OUT, exist_ok=True)
    index = []
    for key in ORDER:
        t = build(key)
        if t is None:
            continue
        data = json.dumps(t, ensure_ascii=False, separators=(',', ':'))
        with open(os.path.join(OUT, key + '.json'), 'w', encoding='utf-8') as f:
            f.write(data)
        # answer positions, to catch a test where the answer is mostly in one place
        pos = [0, 0, 0, 0]
        for sec in t['sections']:
            for p in sec['parts']:
                for q in p.get('items', []):
                    for qq in (q.get('qs') or [q]):
                        if isinstance(qq.get('a'), int):
                            pos[qq['a']] += 1
                for b in p.get('blocks', []):
                    for qq in b['qs']:
                        pos[qq['a']] += 1
        index.append(key)
        print(f'{key}: R {t["nq"]["R"]} W {t["nq"]["W"]} L {t["nq"]["L"]}  answers by position {pos}  {len(data) // 1024} KB')
    if errors:
        print('\n'.join(errors))
        sys.exit(1)


if __name__ == '__main__':
    main()
