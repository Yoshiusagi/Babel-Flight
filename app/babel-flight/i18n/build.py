#!/usr/bin/env python3
"""Builds the display-language dictionaries (表示言語).

    python3 babel-flight/i18n/build.py

Sources: babel-flight/i18n/<ui>/*.tsv, one line per text: <Japanese as on screen><TAB><translation>.
Dynamic texts are written as templates: numbers and Latin words become {0} {1} … in order of appearance,
and so do names that appear inside sentences (language names, cities, jobs), e.g.
    {0}のレベルは？<TAB>Your {0} level?
City names come from the route data (CITIES, Latin spelling) unless a .tsv line gives them.
Output: public/i18n/<ui>.json ({"v": version, "d": {japanese: translation}}) and parts/f27_i18nv.js
(I18N_V, so a page holding an older copy on the device fetches the new one).

Checks (the build stops on any of them):
  - every line has exactly one tab and both sides are filled in
  - a key appears once (or always with the same translation)
  - the {n} placeholders of a key and its translation are the same set
  - no kana left in a translation (no Japanese left behind), except in ja.tsv: the notes of the 日本語 course
    quote the Japanese they explain
  - every text of 日常会話モード (i18n/keys.cjs) is translated, except texts used only by the course of the
    display language itself (an English speaker doesn't take the English course); the 検定モード lessons a display
    language shows (f30_xui.js) are checked for that display language only
"""
import glob, hashlib, json, os, re, subprocess, sys

HERE = os.path.dirname(os.path.abspath(__file__))
APP = os.path.dirname(os.path.dirname(HERE))
UIS = ['en', 'ko', 'zh']
KANA = re.compile(r'[぀-ヿ]')
PH = re.compile(r'\{\d+\}')


def load(ui):
    d, errs = {}, []
    for f in sorted(glob.glob(os.path.join(HERE, ui, '*.tsv'))):
        for n, line in enumerate(open(f, encoding='utf-8'), 1):
            line = line.rstrip('\n')
            if not line.strip() or line.startswith('#'):
                continue
            where = '%s:%d' % (os.path.relpath(f, HERE), n)
            parts = line.split('\t')
            if len(parts) != 2 or not parts[0].strip() or not parts[1].strip():
                errs.append(where + ': needs "japanese<TAB>translation"')
                continue
            k, v = parts[0].replace('\\n', '\n'), parts[1].replace('\\n', '\n')
            if k in d and d[k] != v:
                errs.append(where + ': %r translated twice differently' % k)
            if sorted(PH.findall(k)) != sorted(PH.findall(v)):
                errs.append(where + ': placeholders differ in %r' % k)
            if KANA.search(v) and os.path.basename(f) != 'ja.tsv':   # ja.tsv: notes of the 日本語 course quote Japanese
                errs.append(where + ': kana left in the translation of %r' % k)
            d[k] = v
    return d, errs


SMALL = {'de', 'del', 'la', 'las', 'los', 'do', 'da', 'dos', 'das', 'di', 'el', 'al', 'an', 'am', 'on', 'sur', 'upon'}


def title(en):
    words = en.lower().split(' ')
    out = []
    for i, w in enumerate(words):
        if i and w in SMALL:
            out.append(w)
        else:
            out.append('-'.join(x[:1].upper() + x[1:] for x in w.split('-')))
    return ' '.join(out)


def main():
    keys = json.loads(subprocess.check_output(['node', os.path.join(HERE, 'keys.cjs')]))
    names = json.loads(subprocess.check_output(['node', os.path.join(HERE, 'keys.cjs'), '--names']))
    out, errs = {}, []
    for ui in UIS:
        if not glob.glob(os.path.join(HERE, ui, '*.tsv')):
            continue
        d, e = load(ui)
        errs += e
        for jp, en in names['cities'].items():
            d.setdefault(jp, title(en))
        miss = [k for k, m in keys.items() if k not in d and m['langs'] != [ui] and ('uis' not in m or ui in m['uis'])]
        for k in miss[:30]:
            errs.append('%s: not translated: %r (%s)' % (ui, k, ','.join(keys[k]['langs'])))
        if len(miss) > 30:
            errs.append('%s: … %d more not translated' % (ui, len(miss) - 30))
        out[ui] = d
    if errs:
        print('\n'.join(errs))
        sys.exit(1)
    blob = json.dumps(out, ensure_ascii=False, sort_keys=True).encode()
    v = hashlib.sha256(blob).hexdigest()[:10]
    os.makedirs(os.path.join(APP, 'public', 'i18n'), exist_ok=True)
    for ui, d in out.items():
        with open(os.path.join(APP, 'public', 'i18n', ui + '.json'), 'w', encoding='utf-8') as f:
            json.dump({'v': v, 'd': d}, f, ensure_ascii=False, separators=(',', ':'), sort_keys=True)
        print('%s: %d texts' % (ui, len(d)))
    with open(os.path.join(APP, 'babel-flight', 'parts', 'f27_i18nv.js'), 'w', encoding='utf-8') as f:
        f.write("/* 表示言語: the version of public/i18n/*.json and the display languages that have one\n   (written by babel-flight/i18n/build.py) */\nvar I18N_V='%s',I18N_UIS=%s;\n" % (v, json.dumps(sorted(out))))
    print('version', v)


if __name__ == '__main__':
    main()
