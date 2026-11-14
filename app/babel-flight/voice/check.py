"""Listens to a sample of the recordings with a speech recognizer (faster-whisper) and checks that the words
come out right: a quick test that the voices are clear. Fails when the average match is too low.

  python3 check.py out af_heart 15
"""
import os
import random
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import lines  # noqa: E402

root, voice, n = sys.argv[1], sys.argv[2], int(sys.argv[3])
lang = {'a': 'en', 'b': 'en', 'e': 'es', 'i': 'it'}[voice[0]]
by_key = {lines.key(voice, s): s for s in lines.wanted().get(voice, set())}
files = sorted(f[:-4] for f in os.listdir(os.path.join(root, voice)) if f.endswith('.mp3'))
random.seed(7)
pick = random.sample(files, min(n, len(files)))

from faster_whisper import WhisperModel  # noqa: E402
model = WhisperModel('small', device='cpu', compute_type='int8')


def words(t):
    return re.findall(r"[a-záéíóúñüàèìòùç0-9']+", t.lower())


scores = []
for k in pick:
    segs, _ = model.transcribe(os.path.join(root, voice, k + '.mp3'), language=lang, beam_size=5)
    heard = ' '.join(s.text for s in segs)
    a, b = words(by_key[k]), words(heard)
    hit = sum(1 for w in a if w in b) / max(1, len(a))
    scores.append(hit)
    print(f'{hit:4.0%}  {by_key[k][:70]!r}  ->  {heard.strip()[:70]!r}')
avg = sum(scores) / max(1, len(scores))
print(f'{voice}: average word match {avg:.0%} over {len(scores)} sentences')
sys.exit(0 if avg >= 0.8 else 1)
