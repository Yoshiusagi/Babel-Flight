# every English 授業の用語(くわしく) term -> shared fields (jp, meaning, class sentence and its translations in ja/ko/zh)
import os, re, importlib
APP = os.path.normpath(os.path.dirname(os.path.abspath(__file__)) + '/..')
def tsv(lang, name):
    d = {}
    for line in open(APP + '/i18n/%s/%s.tsv' % (lang, name)):
        if '\t' in line and not line.startswith('#'):
            k, v = line.rstrip('\n').split('\t', 1); d[k] = v
    return d
def load():
    D = {}
    src = open(APP + '/parts/f17_exam.js').read()
    part = src[src.index("SU('sd-num1'"):src.index("var XBANK")]
    ko, zh = tsv('ko', 'sdterms'), tsv('zh', 'sdterms')
    for en, jp, note in re.findall(r'^ \["([^"]*)","([^"]*)","([^"]*)"\]', part, re.M):
        m = re.match(r'^(.*)。授業では (.*)\((.*)\)$', note)
        mk = re.match(r'^(.*)\. 수업에서는 (.*)\((.*)\)$', ko[note]); mz = re.match(r'^(.*)。课堂上会说 (.*)（(.*)）$', zh[note])
        assert m and mk and mz, (en, note)
        D[en] = dict(jp=jp, m=m.group(1), s=m.group(2), sj=m.group(3), jk=ko[jp], mk=mk.group(1), sk=mk.group(3), jz=zh[jp], mz=mz.group(1), sz=mz.group(3))
    for mod in ['sd_soc', 'sd_ela', 'sd_cs', 'sd_pe', 'sd_mus', 'sd_art']:
        for uid, *_, terms in importlib.import_module(mod).UNITS:
            for en, j, m, s, sj, jk, mk, sk, jz, mz, sz in terms:
                D[en] = dict(jp=j, m=m, s=s, sj=sj, jk=jk, mk=mk, sk=sk, jz=jz, mz=mz, sz=sz)
    return D
