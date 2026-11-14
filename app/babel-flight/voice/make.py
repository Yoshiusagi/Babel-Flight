"""Records the examiners' and the mock listening's sentences with natural voices (Kokoro v1.0, Apache-2.0), for
.github/workflows/voices.yml.

  python3 make.py --voice af_heart --have have --out out --model ~/kokoro   # one voice: reuse what exists, record the rest
  python3 make.py --index arts                                             # write arts/index.json for the page

A voice records one or more sets (lines.sets_of): "af_heart" for the examiners, "af_heart-82" etc. for the mocks at
each grade's speed. Files: <set>/<key>.mp3, key = lines.key(set, sentence). The page loads index.json, and plays a
line from the recordings only when every sentence of it is there (recGet in parts/e4_core.js).
"""
import argparse
import json
import os
import shutil
import subprocess
import sys
import tempfile
import time

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import lines  # noqa: E402

# espeak language for each voice (Kokoro's first letter: a = American, b = British, e = Spanish, i = Italian)
LANG = {'a': 'en-us', 'b': 'en-gb', 'e': 'es', 'i': 'it'}


def encode(samples, rate, path):
    """float samples -> mp3, loudness evened out so every sentence is equally clear."""
    import soundfile as sf
    with tempfile.NamedTemporaryFile(suffix='.wav') as w:
        sf.write(w.name, samples, rate)
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', w.name,
                        '-af', 'silenceremove=start_periods=1:start_threshold=-50dB,areverse,'
                               'silenceremove=start_periods=1:start_threshold=-50dB,areverse,'
                               'loudnorm=I=-16:TP=-1.5:LRA=11,aresample=24000',
                        '-ac', '1', '-c:a', 'libmp3lame', '-b:a', '48k', path], check=True)


def make(voice, have, out, model):
    need = lines.wanted()
    todo = []
    for tag in lines.sets_of(voice, need):
        want = sorted(need[tag])
        os.makedirs(os.path.join(out, tag), exist_ok=True)
        n = len(todo)
        for s in want:
            k = lines.key(tag, s)
            src = os.path.join(have, tag, k + '.mp3')
            if os.path.exists(src):
                shutil.copyfile(src, os.path.join(out, tag, k + '.mp3'))
            else:
                todo.append((tag, k, s))
        print(f'{tag}: {len(want)} sentences, {len(want) - (len(todo) - n)} already recorded, {len(todo) - n} to record',
              flush=True)
    if not todo:
        return
    from kokoro_onnx import Kokoro
    kk = Kokoro(os.path.join(model, 'kokoro-v1.0.onnx'), os.path.join(model, 'voices-v1.0.bin'))
    t0 = time.time()
    for i, (tag, k, s) in enumerate(todo):
        samples, rate = kk.create(s, voice=voice, speed=lines.speed_of(tag), lang=LANG[voice[0]])
        encode(samples, rate, os.path.join(out, tag, k + '.mp3'))
        if i % 100 == 99:
            print(f'  {i + 1}/{len(todo)}  {time.time() - t0:.0f}s', flush=True)
    print(f'{voice}: done in {time.time() - t0:.0f}s', flush=True)


def index(root):
    voices = {}
    for v in sorted(os.listdir(root)):
        d = os.path.join(root, v)
        if os.path.isdir(d) and not v.startswith('.'):
            voices[v] = sorted(f[:-4] for f in os.listdir(d) if f.endswith('.mp3'))
    with open(os.path.join(root, 'index.json'), 'w') as f:
        json.dump({'v': 1, 'voices': voices}, f, separators=(',', ':'))
    print({v: len(k) for v, k in voices.items()})


if __name__ == '__main__':
    ap = argparse.ArgumentParser()
    ap.add_argument('--voice')
    ap.add_argument('--have', default='have')
    ap.add_argument('--out', default='out')
    ap.add_argument('--model', default=os.path.expanduser('~/kokoro'))
    ap.add_argument('--index')
    a = ap.parse_args()
    if a.index:
        index(a.index)
    else:
        make(a.voice, a.have, a.out, a.model)
