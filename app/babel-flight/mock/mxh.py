"""Small helpers for writing the mock tests compactly (used by ek5.py … ek1.py)."""


def G(q, o, a, ex):
    """A multiple-choice question: q text, options, answer index (0-based), explanation (Japanese)."""
    return {'q': q, 'o': list(o), 'a': a, 'ex': ex}


def O(jp, pre, w, ans, post, ex):
    """語句整序: Japanese sentence, words before the boxes, the boxed pieces (shown in this order,
    ① ② ③ …), the right order as box numbers, words after the boxes, explanation."""
    return {'jp': jp, 'pre': pre, 'w': list(w), 'ans': list(ans), 'post': post, 'ex': ex}


def lines(s):
    """'M: Hello.\\nW: Hi.' -> [['M','Hello.'],['W','Hi.']]  (M man, W woman, B boy, G girl, N narrator)"""
    out = []
    for ln in s.strip().split('\n'):
        ln = ln.strip()
        if not ln:
            continue
        who, text = ln.split(':', 1)
        out.append([who.strip(), text.strip()])
    return out


def L(script, q, o, a, ex, pic=None, situ=None):
    """A listening item with one question. q may be '' when the question is the last line itself."""
    it = {'lines': lines(script), 'q': q, 'o': list(o), 'a': a, 'ex': ex}
    if pic:
        it['pic'] = pic
    if situ:
        it['situ'] = situ
    return it


def LQ(script, qs, pic=None, situ=None, title=None):
    """A listening item with several questions: qs = [G(...), …]."""
    it = {'lines': lines(script), 'qs': qs}
    if pic:
        it['pic'] = pic
    if situ:
        it['situ'] = situ
    if title:
        it['title'] = title
    return it


def P(pic, o, a, ex):
    """イラストの内容一致 (5級): three sentences are read aloud; pick the one that matches the picture."""
    return {'pic': pic, 'o': list(o), 'a': a, 'ex': ex, 'lines': [], 'q': ''}


def B(label, kind, body, qs, title=''):
    """A reading passage block: label ([A] …), kind (notice / email / text), body, questions."""
    return {'label': label, 'kind': kind, 'title': title, 'body': body.strip(), 'qs': qs}
