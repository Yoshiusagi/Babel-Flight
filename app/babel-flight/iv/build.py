"""Checks the 面接 practice cards against the real interview format and writes public/iv/<key>.json.
Run:  python3 babel-flight/iv/build.py"""
import json, os, re, sys
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from cards import CARDS

# real format: passage words (approx.), silent reading, questions after reading, card turned after No.x
SPEC = {
  'ek3':   {'words': (25, 35), 'qs': ['q1', 'q2', 'q3', 'q4', 'q5'], 'hide_after': 'q3', 'pic': 'pic'},
  'ekp2':  {'words': (42, 55), 'qs': ['q1', 'q2', 'q3', 'q4', 'q5'], 'hide_after': 'q3', 'pic': 'picA'},
  'ekp2p': {'words': (48, 62), 'qs': ['q1', 'q2', 'q3', 'q4'], 'hide_after': 'q2', 'panels': 3},
  'ek2':   {'words': (55, 68), 'qs': ['q1', 'q2', 'q3', 'q4'], 'hide_after': 'q2', 'panels': 3},
  'ekp1':  {'qs': ['narr', 'q1', 'q2', 'q3', 'q4'], 'hide_after': 'q1', 'panels': 4},
  'ek1':   {'qs': ['speech'], 'topics': 5},
}
def words(s): return len(re.findall(r"[A-Za-z0-9]+(?:['’\-][A-Za-z0-9]+)*", s))
probs = []
def bad(k, m): probs.append('%s: %s' % (k, m))
out_dir = os.path.join(HERE, '..', '..', 'public', 'iv')
os.makedirs(out_dir, exist_ok=True)
for k, spec in SPEC.items():
    c = CARDS[k]; steps = c['steps']; items = c['items']; card = c['card']
    if 'words' in spec:
        n = words(card['passage']); lo, hi = spec['words']
        if not lo <= n <= hi: bad(k, 'passage has %d words (%d-%d)' % (n, lo, hi))
        kinds = [s['k'] for s in steps]
        if 'prep' not in kinds or 'read' not in kinds or kinds.index('prep') > kinds.index('read'): bad(k, 'silent reading must come before reading aloud')
        p = [s for s in steps if s['k'] == 'prep'][0]
        if p['sec'] != 20: bad(k, 'silent reading is 20 seconds')
    if spec.get('pic') and spec['pic'] not in card: bad(k, 'no picture')
    if spec.get('panels') and len(card.get('panels', [])) != spec['panels']: bad(k, 'needs %d panels' % spec['panels'])
    if spec.get('panels') and not card.get('start'): bad(k, 'narration needs the first sentence')
    if spec.get('topics') and len(card.get('topics', [])) != spec['topics']: bad(k, 'needs %d topics' % spec['topics'])
    ids = [s['id'] for s in steps if s['k'] in ('ans', 'yn')]
    for q in spec['qs']:
        if q not in ids: bad(k, 'missing %s' % q)
    for i in ids:
        if i in ('name', 'how'): continue
        if i not in items: bad(k, 'no item for %s' % i)
    for i, it in items.items():
        if i in ('read', 'gv', 'pf') or i.startswith('tq'): continue
        if i not in ids: bad(k, 'item %s is never asked' % i)
        if not it.get('model') and it.get('pts', 0) and i not in ('speech',): bad(k, '%s has no model answer' % i)
    if 'hide_after' in spec:
        ks = [(s['k'], s.get('id')) for s in steps]
        hi = [j for j, x in enumerate(ks) if x[0] == 'hide'][0]
        qa = [j for j, x in enumerate(ks) if x[1] == spec['hide_after']][0]
        if not qa < hi: bad(k, 'card must be turned over after %s' % spec['hide_after'])
        later = [x[1] for x in ks[hi:] if x[1]]
        before = [x[1] for x in ks[:hi] if x[1]]
        if any(q in later for q in before if q.startswith('q')): bad(k, 'order')
    yn = [s for s in steps if s['k'] == 'yn']
    for s in yn:
        m = items[s['id']].get('model')
        if not isinstance(m, dict) or 'yes' not in m or 'no' not in m: bad(k, '%s: yes/no model answers' % s['id'])
    if steps[-1]['k'] != 'end': bad(k, 'last step must be end')
    for it in items.values():
        for m in (it.get('model') if isinstance(it.get('model'), list) else list((it.get('model') or {}).values())):
            if re.search(r'[぀-ヿ一-鿿]', m.replace('→', '')): bad(k, 'Japanese in a model answer: ' + m[:30])
    data = dict(c); data['key'] = k
    with open(os.path.join(out_dir, k + '.json'), 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, separators=(',', ':'))
if probs:
    print('\n'.join(probs)); sys.exit(1)
print('ok:', ', '.join('%s %s' % (k, CARDS[k]['grade']) for k in SPEC),
      '| passage words:', {k: words(CARDS[k]['card']['passage']) for k in SPEC if 'passage' in CARDS[k]['card']})
