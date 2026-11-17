# Rebuilds kanji.json from two open datasets (run with the two clones as arguments; read only, as data):
#   python3 -I vendor.py <mimneko/kanji-data> <davidluzgouveia/kanji-data> kanji.json
import csv, json, sys
SRC1, SRC2, OUT = sys.argv[1], sys.argv[2], sys.argv[3]
def k2h(s): return ''.join(chr(ord(c)-0x60) if 'ァ'<=c<='ヶ' else c for c in s)
LV = {'10級':'10','9級':'9','8級':'8','7級':'7','6級':'6','5級':'5','4級':'4','3級':'3','準2級':'p2','2級':'2','準1級':'p1','1級':'1'}
lv = {}
for r in csv.DictReader(open(SRC1+'/漢検漢字辞典漢字.csv', encoding='utf-8-sig')):
    if r['字体'] == '親字' and r['漢検級'] in LV: lv[r['漢字テキスト']] = LV[r['漢検級']]
grade = {r['漢字']: int(r['学年']) for r in csv.DictReader(open(SRC1+'/教育漢字.csv', encoding='utf-8-sig'))}
joyo = {}
for e in json.load(open(SRC1+'/常用漢字表本表.json', encoding='utf-8')):
    joyo[e['漢字']['通用字体']] = [[o['読み'], o['例']] for o in e['音訓']]
fuhyo = [[x['語'], x['読み']] for x in json.load(open(SRC1+'/常用漢字表付表.json', encoding='utf-8'))]
kd = json.load(open(SRC2+'/kanji.json', encoding='utf-8'))
K = {}
for ch, l in lv.items():
    x = kd.get(ch, {})
    K[ch] = {'l': l, 's': x.get('strokes') or 0}
    if ch in grade: K[ch]['g'] = grade[ch]
    on = [k2h(r) for r in (x.get('readings_on') or [])]
    kun = [r.replace('-', '') for r in (x.get('readings_kun') or [])]
    if ch in joyo:
        K[ch]['y'] = joyo[ch]
        if on or kun: K[ch]['xo'] = on + kun     # 表外の読み too, only for the 準1級・1級 checks
    elif on or kun: K[ch]['x'] = on + kun
    if x.get('readings_kun'): K[ch]['ok'] = sorted(set(r.replace('-', '') for r in x['readings_kun'] if '.' in r))
json.dump({'_src': 'mimneko/kanji-data (CC0): 漢検級・教育漢字の学年・常用漢字表の音訓と例・付表; davidluzgouveia/kanji-data (MIT, from KANJIDIC): 画数・表外の読み・送りがなの区切り',
           'k': K, 'fuhyo': fuhyo}, open(OUT, 'w', encoding='utf-8'), ensure_ascii=False, separators=(',', ':'))
print(len(K), 'kanji;', sum(1 for v in K.values() if v['s']), 'with strokes;', sum(1 for v in K.values() if 'y' in v), 'joyo')
