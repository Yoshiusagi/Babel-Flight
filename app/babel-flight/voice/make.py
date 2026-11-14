"""Records the examiners' sentences with natural voices (Kokoro v1.0, Apache-2.0), for .github/workflows/voices.yml.

  python3 make.py --voice af_heart --have have --out out --model ~/kokoro   # one voice: reuse what exists, record the rest
  python3 make.py --index arts                                             # write arts/index.json for the page

Files: <voice>/<key>.mp3, key = lines.key(voice, sentence). The page loads index.json, and plays a line from the
recordings only when every sentence of it is there (f25_iv.js).
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
SPEED = 0.93   # a little slower than normal: examiners speak clearly


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
    want = sorted(lines.wanted().get(voice, set()))
    os.makedirs(os.path.join(out, voice), exist_ok=True)
    todo = []
    for s in want:
        k = lines.key(voice, s)
        src = os.path.join(have, voice, k + '.mp3')
        if os.path.exists(src):
            shutil.copyfile(src, os.path.join(out, voice, k + '.mp3'))
        else:
            todo.append((k, s))
    print(f'{voice}: {len(want)} sentences, {len(want) - len(todo)} already recorded, {len(todo)} to record', flush=True)
    if not todo:
        return
    from kokoro_onnx import Kokoro
    kk = Kokoro(os.path.join(model, 'kokoro-v1.0.onnx'), os.path.join(model, 'voices-v1.0.bin'))
    t0 = time.time()
    for i, (k, s) in enumerate(todo):
        samples, rate = kk.create(s, voice=voice, speed=SPEED, lang=LANG[voice[0]])
        encode(samples, rate, os.path.join(out, voice, k + '.mp3'))
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
