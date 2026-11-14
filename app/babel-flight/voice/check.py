"""Listens to a sample of the recordings with a speech recognizer (faster-whisper) and checks that the words
come out right: a quick test that the voices are clear. Fails when the average match is too low.

  python3 check.py out af_heart 15     # 15 sentences from each of the voice's sets (af_heart, af_heart-82, ...)
"""
import os
import random
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import lines  # noqa: E402

root, voice, n = sys.argv[1], sys.argv[2], int(sys.argv[3])
lang = {'a': 'en', 'b': 'en', 'e': 'es', 'i': 'it'}[voice[0]]
need = lines.wanted()
random.seed(7)
pick = []   # (set, key, sentence)
for tag in lines.sets_of(voice, need):
    by_key = {lines.key(tag, s): s for s in need[tag]}
    d = os.path.join(root, tag)
    files = sorted(f[:-4] for f in os.listdir(d) if f.endswith('.mp3')) if os.path.isdir(d) else []
    pick += [(tag, k, by_key[k]) for k in random.sample(files, min(n, len(files))) if k in by_key]

from faster_whisper import WhisperModel  # noqa: E402
model = WhisperModel('small', device='cpu', compute_type='int8')


def words(t):
    return re.findall(r"[a-záéíóúñüàèìòùç0-9']+", t.lower())


import subprocess  # noqa: E402
import numpy as np  # noqa: E402


def pcm(path):
    """mp3 -> 16 kHz mono floats (ffmpeg), so the recognizer does not need its own decoder"""
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', path, '-f', 'f32le', '-ac', '1', '-ar', '16000', '-'],
                         check=True, capture_output=True).stdout
    return np.frombuffer(raw, dtype=np.float32)


scores = []
for tag, k, said in pick:
    segs, _ = model.transcribe(pcm(os.path.join(root, tag, k + '.mp3')), language=lang, beam_size=5)
    heard = ' '.join(s.text for s in segs)
    a, b = words(said), words(heard)
    hit = sum(1 for w in a if w in b) / max(1, len(a))
    scores.append(hit)
    print(f'{hit:4.0%}  {tag:14} {said[:64]!r}  ->  {heard.strip()[:64]!r}')
avg = sum(scores) / max(1, len(scores))
print(f'{voice}: average word match {avg:.0%} over {len(scores)} sentences')
sys.exit(0 if avg >= 0.8 else 1)
