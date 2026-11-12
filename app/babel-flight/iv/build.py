"""Checks the 面接 practice cards against the real interview format and writes public/iv/<key>.json.
Every card is checked as the page runs it: entry + open + the card + exit (and without the entry / exit).
Run:  python3 babel-flight/iv/build.py"""
import json, os, re, sys
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from cards import CARDS

# real format: passage words (approx.), the questions, the card turned over after No.x, the pictures
SPEC = {
  'ek3':   {'words': (25, 35), 'qs': ['q1', 'q2', 'q3', 'q4', 'q5'], 'hide_after': 'q3', 'pic': 'pic'},
  'ekp2':  {'words': (42, 55), 'qs': ['q1', 'q2', 'q3', 'q4', 'q5'], 'hide_after': 'q3', 'pic': 'picA'},
  'ekp2p': {'words': (48, 62), 'qs': ['q1', 'q2', 'q3', 'q4'], 'hide_after': 'q2', 'panels': 3},
  'ek2':   {'words': (55, 68), 'qs': ['q1', 'q2', 'q3', 'q4'], 'hide_after': 'q2', 'panels': 3},
  'ekp1':  {'qs': ['free1', 'free2', 'narr', 'q1', 'q2', 'q3', 'q4'], 'hide_after': 'q1', 'panels': 4},
  'ek1':   {'qs': ['free1', 'free2', 'speech'], 'topics': 5},
}
JA = re.compile(r'[぀-ヿ一-鿿]')
def words(s): return len(re.findall(r"[A-Za-z0-9]+(?:['’\-][A-Za-z0-9]+)*", s))
probs = []
def bad(k, m): probs.append('%s: %s' % (k, m))
def models(m): return m if isinstance(m, list) else list((m or {}).values())
def check_scene(k, sc):
    for it in sc.get('items', []):
        e, x, y, s = it
        if not (0 <= x <= 300 and 0 <= y <= 180 and 8 <= s <= 90): bad(k, 'item out of the picture: %r' % (it,))
out_dir = os.path.join(HERE, '..', '..', 'public', 'iv')
os.makedirs(out_dir, exist_ok=True)
for k, spec in SPEC.items():
    t = CARDS[k]
    pools = t.get('pools', {})
    for pn, pl in pools.items():
        if len(pl) < 4: bad(k, 'pool %s needs at least 4 questions' % pn)
        qs = [e['q'] for e in pl]
        if len(set(qs)) != len(qs): bad(k, 'pool %s repeats a question' % pn)
        for e in pl:
            if not e.get('ja') or not e.get('points'): bad(k, '%s: %s needs ja + points' % (pn, e['q'][:30]))
            if e.get('yn'):
                m = e.get('model')
                if not isinstance(m, dict) or 'yes' not in m or 'no' not in m: bad(k, '%s: yes/no model answers' % pn)
            elif not e.get('model'): bad(k, '%s: %s has no model answer' % (pn, e['q'][:30]))
            for m in models(e.get('model')):
                if JA.search(m.replace('→', '')): bad(k, 'Japanese in a model answer: ' + m[:30])
    titles = [c['card'].get('title') for c in t['cards']]
    if len(t['cards']) > 1 and 'topics' not in spec and len(set(titles)) != len(titles): bad(k, 'two cards with the same title')
    for ci, c in enumerate(t['cards']):
        kk = '%s#%d' % (k, ci + 1)
        card, items = c['card'], dict(t.get('items', {}), **c['items'])
        for entry in (True, False):
            steps = (t['entry'] if entry else []) + t['open'] + c['steps'] + (t['exit'] if entry else t['close'])
            ids = [s['id'] for s in steps if s['k'] in ('ans', 'yn', 'pool')]
            if len(ids) != len(set(ids)): bad(kk, 'an answer id twice')
            for q in spec['qs']:
                if q not in ids: bad(kk, 'missing %s' % q)
            for s in steps:
                if s['k'] == 'pool' and s['pool'] not in pools: bad(kk, 'no pool %s' % s['pool'])
                if s['k'] in ('ans', 'yn') and s['id'] not in ('name', 'how') and s['id'] not in items: bad(kk, 'no item for %s' % s['id'])
            if steps[-1]['k'] != 'end': bad(kk, 'last step must be end')
            if 'hide_after' in spec:
                ks = [(s['k'], s.get('id')) for s in steps]
                hi = [j for j, x in enumerate(ks) if x[0] == 'hide'][0]
                qa = [j for j, x in enumerate(ks) if x[1] == spec['hide_after']][0]
                if not qa < hi: bad(kk, 'card must be turned over after %s' % spec['hide_after'])
        if 'words' in spec:
            n = words(card['passage']); lo, hi = spec['words']
            if not lo <= n <= hi: bad(kk, 'passage has %d words (%d-%d)' % (n, lo, hi))
            kinds = [s['k'] for s in c['steps']]
            if 'prep' not in kinds or 'read' not in kinds or kinds.index('prep') > kinds.index('read'): bad(kk, 'silent reading must come before reading aloud')
            p = [s for s in c['steps'] if s['k'] == 'prep'][0]
            if p['sec'] != 20: bad(kk, 'silent reading is 20 seconds')
            if not items.get('read', {}).get('points'): bad(kk, 'reading aloud needs points')
        if spec.get('pic') and spec['pic'] not in card: bad(kk, 'no picture')
        for key in ('pic', 'picA', 'picB'):
            if key in card: check_scene(kk, card[key])
        if spec.get('panels'):
            if len(card.get('panels', [])) != spec['panels']: bad(kk, 'needs %d panels' % spec['panels'])
            if not card.get('start'): bad(kk, 'narration needs the first sentence')
            for p in card.get('panels', []): check_scene(kk, p)
            if any(not p.get('cap') for p in card.get('panels', [])): bad(kk, 'every panel needs its caption')
        if spec.get('topics') and len(card.get('topics', [])) != spec['topics']: bad(kk, 'needs %d topics' % spec['topics'])
        for i, it in c['items'].items():
            if i in ('read', 'gv', 'pf') or i.startswith('tq'): continue
            if i not in [s.get('id') for s in c['steps']]: bad(kk, 'item %s is never asked' % i)
            if not it.get('model') and it.get('pts', 0) and i not in ('speech',): bad(kk, '%s has no model answer' % i)
            for m in models(it.get('model')):
                if JA.search(m.replace('→', '')): bad(kk, 'Japanese in a model answer: ' + m[:30])
        for s in c['steps']:
            if s['k'] == 'yn':
                m = items[s['id']].get('model')
                if not isinstance(m, dict) or 'yes' not in m or 'no' not in m: bad(kk, '%s: yes/no model answers' % s['id'])
    data = dict(t); data['key'] = k
    with open(os.path.join(out_dir, k + '.json'), 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, separators=(',', ':'))
if probs:
    print('\n'.join(probs)); sys.exit(1)
print('ok:', ', '.join('%s %s: %d cards, pools %s' % (k, CARDS[k]['grade'], len(CARDS[k]['cards']), {p: len(v) for p, v in CARDS[k]['pools'].items()}) for k in SPEC))
print('passage words:', {k: [words(c['card']['passage']) for c in CARDS[k]['cards']] for k in SPEC if 'passage' in CARDS[k]['cards'][0]['card']})
