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
    titles = [(c['card'].get('title'), c['card'].get('start')) for c in t['cards']]
    if len(t['cards']) > 1 and 'topics' not in spec and len(set(titles)) != len(titles): bad(k, 'two cards with the same title / first sentence')
    tops = [tp['t'] for c in t['cards'] for tp in c['card'].get('topics', [])]
    if len(set(tops)) != len(tops): bad(k, 'a topic on two cards')
    for c in t['cards']:
        for tp in c['card'].get('topics', []):
            if len(tp.get('qs', [])) != 2 or len(tp.get('outline', [])) != 4: bad(k, 'topic needs 2 questions + a 4-line outline: ' + tp['t'][:30])
    tq = [q for c in t['cards'] for tp in c['card'].get('topics', []) for q in tp['qs']]
    if len(set(tq)) != len(tq): bad(k, 'a topic question twice')
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
# ---------------------------------------------------------------- IELTS, TOEFL (intl.py)
from intl import INTL
from icao import ICAO
from romance import ROMANCE
from jobs import OET, CREW
from guide import GUIDES
INTL['icao'] = ICAO
INTL.update(ROMANCE)
INTL.update({'oet': OET, 'crew': CREW}, **GUIDES)
INTL_SPEC = {
  'ielts': {'parts': ['p1a', 'p1b', 'p1c', 'p2', 'p2r', 'p3a', 'p3b', 'p3c', 'p3d'], 'overall': 4},
  'toefl': {'reps': 7, 'interview': 4},
  'icao': {'parts': ['wu1', 'wu2', 'pic', 'f1', 'fd', 'seq', 'f2', 'wd1', 'wd2'], 'overall': 6, 'atc': True},
  'delea2': {'overall': 4, 'sets': {'temas': (2, ['t', 'pts', 'model']), 'fotos': (2, ['t', 'pic', 'model', 'rp', 'rpc', 'rpm'])}},
  'deleb1': {'overall': 4, 'sets': {'temas': (2, ['t', 'pts', 'model', 'qs', 'qsm']), 'fotos': (2, ['t', 'pic', 'model', 'qs', 'qsm', 'rol', 'rp', 'rpc', 'rpm'])}},
  'cilsa2': {'overall': 4, 'sets': {'argomenti': (3, ['t', 'qs', 'qsm']), 'temi': (3, ['t', 'model'])}},
  'cilsb1': {'overall': 4, 'sets': {'argomenti': (3, ['t', 'qs', 'qsm']), 'temi': (3, ['t', 'model'])}},
  'oet': {'overall': 9, 'roles': 2},
  'crew': {'read': True},
}
for g in GUIDES: INTL_SPEC[g] = {'overall': 5, 'sets': {'themes': (3, ['t', 'model', 'qs', 'qsm'])}}
def expand(t, steps):
    """the steps of one run, with the first entry of each pool (groups get their ids prefixed)"""
    out = []
    for s in steps:
        if s['k'] != 'pool': out.append(s); continue
        e = t['pools'][s['pool']][0]
        if 'steps' in e: out += [dict(x, id=s['id'] + '_' + x['id']) if x.get('id') else x for x in e['steps']]
        else: out += [{'k': 'say', 't': e['q']}, {'k': 'yn' if e.get('yn') else 'ans', 'id': s['id']}]
    return out
for k, spec in INTL_SPEC.items():
    t = INTL[k]
    for pn, pl in t['pools'].items():
        if len(pl) < 4: bad(k, 'pool %s needs at least 4 entries' % pn)
        for e in pl:
            if 'steps' in e:
                ids = [x['id'] for x in e['steps'] if x.get('id')]
                if sorted(ids) != sorted(e['items']): bad(k, '%s: group %s ids and items differ' % (pn, e.get('name')))
                for i, it in e['items'].items():
                    if it.get('rep'):
                        st = [x for x in e['steps'] if x.get('id') == i][0]
                        if st['k'] != 'rep' or st['t'] != it['rep']: bad(k, '%s: repeat text differs' % pn)
                    elif not it.get('model') or not it.get('ja'): bad(k, '%s: %s needs ja + model' % (pn, i))
                    for m in models(it.get('model')):
                        if JA.search(m): bad(k, 'Japanese in a model answer: ' + m[:30])
            else:
                if not e.get('ja') or not e.get('model') or not e.get('points'): bad(k, '%s: %s needs ja + model + points' % (pn, e['q'][:30]))
                for m in models(e.get('model')):
                    if JA.search(m): bad(k, 'Japanese in a model answer: ' + m[:30])
        if len(set(json.dumps(e, sort_keys=True) for e in pl)) != len(pl): bad(k, 'pool %s repeats an entry' % pn)
    for ci, c in enumerate(t['cards']):
        kk = '%s#%d' % (k, ci + 1)
        for s in c['steps']:
            if s['k'] == 'pool' and s['pool'] not in t['pools']: bad(kk, 'no pool ' + s['pool'])
        steps = expand(t, t['open'] + c['steps'] + t['close'])
        ids = [s.get('id') or 'tq%d' % s['n'] if s['k'] == 'tq' else s['id'] for s in steps if s['k'] in ('ans', 'yn', 'rep', 'tq')] + ['read' for s in steps if s['k'] == 'read']
        if len(ids) != len(set(ids)): bad(kk, 'an answer id twice')
        if steps[-1]['k'] != 'end': bad(kk, 'last step must be end')
        items = dict(t.get('items', {}), **c['items'])
        for i, it in c['items'].items():
            if i not in ids: bad(kk, 'item %s is never asked' % i)
            fromcard = it.get('set') or any(x['k'] == 'tq' and x.get('id') == i for x in c['steps'])   # the model comes from the choice
            if it.get('pts') and not it.get('model') and not fromcard and i != 'read': bad(kk, '%s has no model answer' % i)
            for m in models(it.get('model')):
                if JA.search(m): bad(kk, 'Japanese in a model answer: ' + m[:30])
        if 'parts' in spec:
            for q in spec['parts']:
                if not any(x == q or x.startswith(q + '_') for x in ids): bad(kk, 'missing ' + q)

        if spec.get('overall') and len([i for i in items.values() if i.get('overall')]) != spec['overall']: bad(kk, 'needs %d overall marks' % spec['overall'])
        for set_, (n, fields) in spec.get('sets', {}).items():
            l = c['card'].get(set_, [])
            if len(l) != n: bad(kk, '%s: %d choices' % (set_, n))
            for e in l:
                for fl in fields:
                    if not e.get(fl): bad(kk, '%s: %s needs %s' % (set_, e.get('t', '?')[:20], fl))
                for fl in ('qs', 'rp'):
                    if fl in e and not (len(e[fl]) == len(e.get(fl + 'm', [])) and (fl != 'rp' or len(e['rpc']) == len(e['rp']))): bad(kk, '%s: %s and its models differ' % (set_, fl))
                for m in [e.get('model', '')] + e.get('qsm', []) + e.get('rpm', []) + e.get('qs', []) + e.get('rp', []):
                    if JA.search(m): bad(kk, 'Japanese in the test language: ' + m[:30])
                if e.get('pic'): check_scene(kk, e['pic'])
            if set_ not in c['card'].get('sets', []): bad(kk, '%s not in sets' % set_)
        for s in c['steps']:
            if s['k'] == 'tq':
                l = c['card'].get(s.get('set', 'topics'), [])
                if not l or any(len(e.get(s.get('f', 'qs'), [])) <= s['n'] for e in l): bad(kk, 'tq %s: no line %d in every choice' % (s.get('id'), s['n']))
                if s.get('id') not in c['items']: bad(kk, 'tq %s has no item' % s.get('id'))
        if spec.get('roles'):
            rs = c['card'].get('roles', [])
            if len(rs) != spec['roles'] or any(len(r.get('task', [])) < 4 for r in rs): bad(kk, 'role cards: %d, each with 4+ tasks' % spec['roles'])
            for n in range(len(rs)):
                if len([i for i in c['items'] if i.startswith('r%d_' % (n + 1))]) < 5: bad(kk, 'role-play %d: 5 exchanges' % (n + 1))
                if not any(s['k'] == 'prep' and s['sec'] == 180 for s in c['steps']): bad(kk, '3 minutes to prepare')
        if spec.get('read'):
            if not c['card'].get('passage') or 'read' not in c['items'] or not any(s['k'] == 'read' for s in c['steps']): bad(kk, 'announcement to read aloud')
        if k == 'ielts':
            cue = c['card'].get('cue') or {}
            if len(cue.get('b', [])) != 3 or not cue.get('e', '').startswith('and explain'): bad(kk, 'cue card: 3 points + and explain')
            pr = [s for s in c['steps'] if s['k'] == 'prep']
            if not pr or pr[0]['sec'] != 60 or not pr[0].get('notes'): bad(kk, 'Part 2: 1 minute to prepare with notes')
            if [s for s in c['steps'] if s.get('id') == 'p2'][0]['sec'] != 120: bad(kk, 'Part 2: up to 2 minutes')
        if spec.get('atc'):
            ex = [i for i in c['items'] if re.match(r'^a\d+$', i)]
            ms = ' '.join(c['items'][i]['model'][0] for i in ex)
            if len(ex) < 5: bad(kk, 'ATC: at least 5 exchanges')
            if not re.search(r'MAYDAY|PAN PAN', ms): bad(kk, 'ATC: an emergency (MAYDAY / PAN PAN)')
            if not re.search(r'Confirm|[Ss]ay again', ms): bad(kk, 'ATC: a misunderstanding to clear up (Confirm / Say again)')
            if re.search(r'\d', ms): bad(kk, 'ATC: numbers in words, as on the radio')
            if len(c['card'].get('panels', [])) != 4: bad(kk, 'sequence: 4 pictures')
            for sc in [c['card']['pic']] + c['card']['panels']: check_scene(kk, sc)
            if len(c['card']['info']['rows']) < 5: bad(kk, 'flight information')
        if 'reps' in spec:
            if len([s for s in steps if s['k'] == 'rep']) != spec['reps']: bad(kk, 'needs %d sentences to repeat' % spec['reps'])
            iq = [s for s in c['steps'] if s['k'] == 'ans']
            if len(iq) != spec['interview'] or any(s['sec'] != 45 for s in iq): bad(kk, 'interview: 4 questions x 45 s')
    for e in t['pools'].get('toefl_lr', []):
        n = [len(x['t'].split()) for x in e['steps'] if x['k'] == 'rep']
        if len(n) != 7 or n != sorted(n): bad(k, 'listen and repeat: 7 sentences, getting longer: %r' % n)
    data = dict(t); data['key'] = k
    with open(os.path.join(out_dir, k + '.json'), 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, separators=(',', ':'))
if probs:
    print('\n'.join(probs)); sys.exit(1)
print('ok:', ', '.join('%s %s: %d cards, pools %s' % (k, CARDS[k]['grade'], len(CARDS[k]['cards']), {p: len(v) for p, v in CARDS[k]['pools'].items()}) for k in SPEC))
print('intl:', ', '.join('%s: %d sets, pools %d' % (k, len(INTL[k]['cards']), len(INTL[k]['pools'])) for k in INTL_SPEC))
print('passage words:', {k: [words(c['card']['passage']) for c in CARDS[k]['cards']] for k in SPEC if 'passage' in CARDS[k]['cards'][0]['card']})
