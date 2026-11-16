# the English 授業の用語(くわしく) layout: subject -> [(uid, jp title, LAT, [8 keys])] (the order of the English course)
import os, re, importlib, sys
APP = os.path.normpath(os.path.dirname(os.path.abspath(__file__)) + '/..')
def layout():
    src = open(APP + '/parts/f17_exam.js').read()
    part = src[src.index("SU('sd-num1'"):src.index("var XBANK")]
    L = {'ma': [], 'sc': []}
    for uid, jp, lat, body in re.findall(r"SU\('(sd-[a-z]+\d)','([^']*)','([^']*)',\[(.*?)\]\);", part, re.S):
        L['ma' if re.match(r'sd-(num|geo|func|prob)', uid) else 'sc'].append((uid, jp, lat, re.findall(r'^ \["([^"]*)"', body, re.M)))
    for code, mod in [('so', 'sd_soc'), ('la', 'sd_ela'), ('it', 'sd_cs'), ('pe', 'sd_pe'), ('mu', 'sd_mus'), ('ar', 'sd_art')]:
        L[code] = [(u[0], u[1], u[2], [t[0] for t in u[-1]]) for u in importlib.import_module(mod).UNITS]
    return L
