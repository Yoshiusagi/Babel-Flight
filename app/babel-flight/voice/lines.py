"""Every sentence the recorded voices say: the interview examiners (public/iv/*.json) and the listening part of the
mock tests (public/mx/*.json).

The page reads a line sentence by sentence (ttsChunks in parts/e4_core.js); when every sentence of a line has a
recording for the examiner's voice, it plays the recordings, otherwise it uses the device's voice for the whole
line. So this file mirrors two things from the page and must be kept in step with them:
  - how a line is built (ivBuild / ivFollow / the tq step in parts/f25_iv.js; mxLSteps / mxListen in
    parts/f23_mx.js), and
  - how a line is cut into sentences (ttsChunks in parts/e4_core.js).
"""
import glob
import hashlib
import json
import os
import re

HERE = os.path.dirname(os.path.abspath(__file__))
APP = os.path.join(HERE, '..', '..')
IV_DIR = os.path.join(APP, 'public', 'iv')
MX_DIR = os.path.join(APP, 'public', 'mx')

# the recorded voices: test language -> examiner's sex -> voice (Kokoro v1.0). Languages left out (ko-KR, and the
# Japanese role lines) keep the device's voice.
VOICES = {
    'en-US': {'f': 'af_heart', 'm': 'am_michael'},
    'en-GB': {'f': 'bf_emma', 'm': 'bm_george'},
    'es-ES': {'f': 'ef_dora', 'm': 'em_alex'},
    'it-IT': {'f': 'if_sara', 'm': 'im_nicola'},
}


# the mock tests' listening (parts/f23_mx.js): speaker -> voice, and each grade's speed (mxRate). A recording
# set is named "<voice>-<speed x 100>", e.g. af_heart-82, so one voice can be recorded at several speeds.
MX_WHO = {'M': 'am_michael', 'W': 'af_heart', 'B': 'am_puck', 'G': 'af_bella', 'N': 'am_fenrir'}
MX_SPEED = {'ek5': 82, 'ek4': 82, 'ek3': 86, 'ekp2': 90, 'ekp2p': 90}   # the rest: 95
MX_NUM = ['One', 'Two', 'Three', 'Four']


def mx_tag(key, who):
    return MX_WHO.get(who, MX_WHO['N']) + '-' + str(MX_SPEED.get(key, 95))


def speed_of(tag):
    """the speaking speed of a recording set: 0.93 for the examiners, the number after "-" for the mocks"""
    return int(tag.rsplit('-', 1)[1]) / 100 if '-' in tag else 0.93


def mx_lines(d):
    """(speaker, line) pairs the listening part of one mock test says (mxLSteps, mxListen, the replay button)."""
    out = set()
    for p in d['sections'][1]['parts']:
        typ = p.get('type')
        for it in p['items']:
            qs = it.get('qs') or [it]
            if typ != 'picsent':
                for who, t in it.get('lines') or []:
                    out.add((who, t))
            for qi, q in enumerate(qs):
                if typ == 'picsent' or p.get('read'):
                    for j, o in enumerate(q.get('o') or []):
                        out.add(('N', MX_NUM[j] + '. ' + o))
                elif q.get('q') and typ not in ('real', 'interview'):
                    out.add(('N', 'Question. ' + q['q']))
                    if len(qs) > 1:
                        out.add(('N', 'Question number ' + str(qi + 1) + '. ' + q['q']))
    return out


def iv_ex_default():
    """IV_EX from parts/f25_iv.js: the examiners used when a test has no list of its own."""
    js = open(os.path.join(APP, 'babel-flight', 'parts', 'f25_iv.js'), encoding='utf-8').read()
    m = re.search(r"var IV_EX=(\[\[.*?\]\]);", js)
    return json.loads(m.group(1).replace("'", '"'))


_PIECE = re.compile(r"[^.!?。！？]+(?:[.!?。！？]+[\"'”’)]*|$)\s*")
_ABBR = re.compile(r"\b(Mr|Mrs|Ms|Dr|St|Mt|vs|etc|No|e\.g|i\.e|a\.m|p\.m|U\.S|U\.K)\.\s*$", re.I)


def chunks(text):
    """ttsChunks (parts/e4_core.js), sentence by sentence."""
    t = re.sub(r'\s+', ' ', str(text)).strip()
    out, cur = [], ''
    for m in _PIECE.finditer(t):
        piece = m.group(0)
        if not piece:
            break
        cur += piece
        if not re.search(r'\s$', piece) and m.end() < len(t):
            continue
        if _ABBR.search(cur) or len(cur.strip()) < 12:
            continue
        out.append(cur.strip())
        cur = ''
    if cur.strip():
        out.append(cur.strip())
    return out or [t]


def key(voice, sentence):
    return hashlib.sha1((voice + '|' + sentence).encode('utf-8')).hexdigest()[:16]


def _walk(o, fn):
    if isinstance(o, dict):
        fn(o)
        for v in o.values():
            _walk(v, fn)
    elif isinstance(o, list):
        for v in o:
            _walk(v, fn)


def lines_of(d):
    """(sex or '', line) pairs one test can say in its examiner's voice; sex '' = either examiner."""
    exs = d.get('exs') or iv_ex_default()
    out = set()

    def fills(t):
        res = set()
        for hello in ('', 'Hello. '):
            t2 = t.replace('{hello}', hello)
            if '{ex}' in t2:
                for name, sex in exs:
                    res.add((sex, t2.replace('{ex}', name)))
            else:
                res.add(('', t2))
        return res

    pres = {}

    def visit(o):
        k = o.get('k')
        if k in ('say', 'rep') and isinstance(o.get('t'), str) and not o.get('v'):
            out.update(fills(o['t']))
        if k == 'pool' and o.get('pool'):
            pres.setdefault(o['pool'], set()).add(o.get('pre') or '')
        if k == 'yn' and isinstance(o.get('follow'), dict):
            for v in o['follow'].values():
                if isinstance(v, str):
                    out.add(('', v))
    _walk(d, visit)
    # pool questions, with the "Number 4. " in front that the step adds
    for name, entries in (d.get('pools') or {}).items():
        for e in entries:
            if isinstance(e.get('q'), str) and not e.get('steps'):
                for pre in pres.get(name, {''}):
                    out.add(('', pre + e['q']))
            yn = e.get('yn')
            if isinstance(yn, dict):
                for v in (yn.get('yes'), yn.get('no')):
                    if isinstance(v, str):
                        out.add(('', v))
    # questions that depend on what was chosen on the card (tq steps)
    for c in d.get('cards') or []:
        card = c.get('card') or {}
        for s in c.get('steps') or []:
            if s.get('k') != 'tq':
                continue
            for entry in card.get(s.get('set') or 'topics') or []:
                lst = entry.get(s.get('f') or 'qs') or []
                n = s.get('n') or 0
                if n < len(lst) and isinstance(lst[n], str):
                    out.add(('', lst[n]))
    return out


def wanted():
    """{recording set: set(sentence)}: every interview with a recorded voice, and every mock test's listening."""
    need = {}
    for f in sorted(glob.glob(os.path.join(IV_DIR, '*.json'))):
        d = json.load(open(f, encoding='utf-8'))
        vs = VOICES.get(d.get('lang') or 'en-US')
        if not vs:
            continue
        for sex, line in lines_of(d):
            for sx in ([sex] if sex else ['f', 'm']):
                need.setdefault(vs[sx], set()).update(chunks(line))
    for f in sorted(glob.glob(os.path.join(MX_DIR, '*.json'))):
        k = os.path.basename(f)[:-5].split('-')[0]
        for who, line in mx_lines(json.load(open(f, encoding='utf-8'))):
            need.setdefault(mx_tag(k, who), set()).update(chunks(line))
    return need


def sets_of(voice, need=None):
    """the recording sets one voice records: its own name (examiners) and <voice>-<speed> (mocks)"""
    return sorted(t for t in (need or wanted()) if t == voice or t.startswith(voice + '-'))


if __name__ == '__main__':
    w = wanted()
    tot = sum(len(v) for v in w.values())
    chars = sum(len(s) for v in w.values() for s in v)
    for v, ss in sorted(w.items()):
        print(v, len(ss), sum(len(s) for s in ss))
    print('total', tot, 'chars', chars)
