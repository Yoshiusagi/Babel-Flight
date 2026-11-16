# Builds parts/f17_sdmore.js and i18n/{ko,zh}/sdmore.tsv from the sd_*.py term lists (授業の用語(くわしく), English).
import json, re, sys, importlib, collections
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
MODS = [m for m in sys.argv[1:] if not m.startswith('--')] or ['sd_soc', 'sd_ela', 'sd_cs', 'sd_pe', 'sd_mus', 'sd_art']
APP = os.path.normpath(os.path.dirname(os.path.abspath(__file__)) + '/..')
KANA = re.compile('[぀-ヿ]')

# the existing math & science terms (to keep every English term and Japanese prompt unique)
src = open(APP + '/parts/f17_exam.js').read()
old = re.findall(r'^ \["([^"]*)","([^"]*)","', src[src.index("SU('sd-num1'"):src.index("var XBANK")], re.M)
seen_en = collections.Counter(t.lower() for t, _ in old)
seen_jp = collections.Counter(j for _, j in old)

js = ["/* ================= 授業の用語(くわしく): 社会・国語・情報・保健体育・音楽・美術 in English (プレミアムエコノミーから) =================",
      "   Generated from the term lists (xd/sd_*.py). Same item shape as the math & science units in f17_exam.js:",
      "   [English term, Japanese, what it means + how a teacher might use it in class]. Original material. */"]
tsv = {'ko': ["# 授業の用語(くわしく): 社会・国語・情報・保健体育・音楽・美術 (generated)"], 'zh': ["# 授業の用語(くわしく): 社会・国語・情報・保健体育・音楽・美術 (generated)"]}
banks, bad, total = [], [], 0


def note(lang, m, s, t):
    if lang == 'ja': return '%s。授業では %s(%s)' % (m, s, t)
    if lang == 'ko': return '%s. 수업에서는 %s(%s)' % (m, s, t)
    return '%s。课堂上会说 %s（%s）' % (m, s, t)


for mod in MODS:
    M = importlib.import_module(mod)
    key, name, title, sub = M.BANK
    ids = []
    assert len(M.UNITS) == 8, (mod, len(M.UNITS))
    for uid, jp, lat, ko_t, zh_t, terms in M.UNITS:
        assert len(terms) == 8, (uid, len(terms))
        ids.append(uid)
        items = []
        for x in terms:
            assert len(x) == 11, (uid, x[0], len(x))
            en, j, m, s, sj, jk, mk, sk, jz, mz, sz = x
            seen_en[en.lower()] += 1; seen_jp[j] += 1
            n_ja = note('ja', m, s, sj)
            items.append(json.dumps([en, j, n_ja], ensure_ascii=False, separators=(',', ':')))
            for lang, a, b in (('ko', jk, note('ko', mk, s, sk)), ('zh', jz, note('zh', mz, s, sz))):
                for v in (a, b):
                    if KANA.search(v) or '\t' in v: bad.append((uid, en, lang, v))
                tsv[lang].append(j + '\t' + a)
                tsv[lang].append(n_ja + '\t' + b)
            if KANA.search(en) or not s.strip(): bad.append((uid, en, 'en'))
            total += 1
        js.append("SU('%s','%s','%s',[\n %s]);" % (uid, jp, lat, ',\n '.join(items)))
        tsv['ko'].append(jp + '\t' + ko_t); tsv['zh'].append(jp + '\t' + zh_t)
    banks.append((key, name, ids))
    js.append("XBANK['%s']={L:'en',name:'%s',tier:1,study:1,ids:%s,key:'%s'};" % (key, name, json.dumps(ids), key))
js.append("['" + "','".join(b[0] for b in banks) + "'].forEach(function(k){XBANK[k].ids.forEach(function(u){XBANK_OF[u]=k;});});")

dups = [k for k, c in seen_en.items() if c > 1] + [k for k, c in seen_jp.items() if c > 1]
print('terms', total, 'banks', [b[0] for b in banks])
print('bad', bad)
print('dups', dups)
# a key may appear twice in a tsv only with the same translation
for lang in tsv:
    d = {}
    for line in tsv[lang][1:]:
        k, v = line.split('\t')
        if k in d and d[k] != v: print('conflict', lang, k, d[k], v)
        d[k] = v
EXTRA = [
 ("国語(英語)の用語", "국어(영어) 용어", "语文(英语)用语"),
 ("情報の用語", "정보 용어", "信息科技用语"),
 ("保健体育の用語", "보건 체육 용어", "体育与健康用语"),
 ("音楽の用語", "음악 용어", "音乐用语"),
 ("美術の用語", "미술 용어", "美术用语"),
 ("社会の用語(くわしく)", "사회 용어(자세히)", "社会科术语（详细）"),
 ("国語(英語)の用語(くわしく)", "국어(영어) 용어(자세히)", "语文(英语)术语（详细）"),
 ("情報の用語(くわしく)", "정보 용어(자세히)", "信息科技术语（详细）"),
 ("保健体育の用語(くわしく)", "보건 체육 용어(자세히)", "体育与健康术语（详细）"),
 ("音楽の用語(くわしく)", "음악 용어(자세히)", "音乐术语（详细）"),
 ("美術の用語(くわしく)", "미술 용어(자세히)", "美术术语（详细）"),
 ("地理・歴史・政治・経済 ・ 英語", "지리·역사·정치·경제 · 영어", "地理·历史·政治·经济 · 英语"),
 ("文法・読解と文学・作文・スピーチ ・ 英語", "문법·독해와 문학·작문·스피치 · 영어", "语法·阅读与文学·写作·演讲 · 英语"),
 ("コンピューター・プログラミング・ネット・データ ・ 英語", "컴퓨터·프로그래밍·네트워크·데이터 · 영어", "计算机·编程·网络·数据 · 英语"),
 ("体のしくみ・健康・応急手当・スポーツ ・ 英語", "몸의 구조·건강·응급 처치·스포츠 · 영어", "身体结构·健康·急救·运动 · 英语"),
 ("楽譜・楽器・演奏・ジャンルと作曲 ・ 英語", "악보·악기·연주·장르와 작곡 · 영어", "乐谱·乐器·演奏·音乐类型与作曲 · 英语"),
 ("絵・色・材料と技法・デザイン・鑑賞 ・ 英語", "그림·색·재료와 기법·디자인·감상 · 영어", "绘画·色彩·材料与技法·设计·欣赏 · 英语"),
 ("8教科(英語)", "8과목(영어)", "8个科目(英语)"),
 ("数学・理科・社会・国語・情報・保健体育・音楽・美術の用語512語を、意味と授業での使われ方つきで。", "수학·과학·사회·국어·정보·보건 체육·음악·미술 용어 512개를 뜻과 수업에서 쓰이는 방식과 함께.", "数学、理科、社会、语文、信息科技、体育与健康、音乐、美术共512个术语，附带含义和课堂上的用法。"),
 ("数学・理科・社会・国語・情報・保健体育・音楽・美術の用語を、意味と授業での使われ方つきで。答えたあとの説明に、先生が授業で言いそうな英文がのっています。", "수학·과학·사회·국어·정보·보건 체육·음악·미술 용어를 뜻과 수업에서 쓰이는 방식과 함께 배워요. 답한 뒤의 설명에 선생님이 수업에서 할 법한 영어 문장이 실려 있어요.", "学习数学、理科、社会、语文、信息科技、体育与健康、音乐、美术的术语，附带含义和课堂上的用法。答题后的解说里有老师上课时可能会说的英语句子。"),
]
for j, k, z in EXTRA:
    tsv['ko'].append(j + '\t' + k); tsv['zh'].append(j + '\t' + z)
import glob, os
for lang in tsv:   # a text another .tsv already translates keeps that translation
    have = {}
    for f in glob.glob(APP + '/i18n/%s/*.tsv' % lang):
        if os.path.basename(f) == 'sdmore.tsv': continue
        for line in open(f):
            if '\t' in line and not line.startswith('#'):
                k, v = line.rstrip('\n').split('\t', 1); have[k] = v
    keep = [tsv[lang][0]]
    for line in tsv[lang][1:]:
        k, v = line.split('\t')
        if k in have:
            if have[k] != v: print('kept existing', lang, k, '->', have[k], '(mine:', v, ')')
            continue
        keep.append(line)
    tsv[lang] = keep
if '--write' in sys.argv:
    open(APP + '/parts/f17_sdmore.js', 'w').write('\n'.join(js) + '\n')
    for lang in tsv:
        seen = set(); out = []
        for line in tsv[lang]:
            if line in seen: continue
            seen.add(line); out.append(line)
        open(APP + '/i18n/%s/sdmore.tsv' % lang, 'w').write('\n'.join(out) + '\n')
    print('wrote')
