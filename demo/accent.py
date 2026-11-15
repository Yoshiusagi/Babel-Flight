"""Accent demo for the 訛りの英語 idea: English sentences read by Kokoro's non-English voices,
(a) with English pronunciation rules and (b) with the voice's own language rules. Writes demo/out/<voice>-<rule>-<n>.mp3"""
import os, subprocess, sys, tempfile
from kokoro_onnx import Kokoro
import soundfile as sf

M = os.path.expanduser('~/kokoro')
kk = Kokoro(os.path.join(M, 'kokoro-v1.0.onnx'), os.path.join(M, 'voices-v1.0.bin'))
LINES = [
    "Japan Air four five one, descend and maintain flight level one two zero.",
    "Cleared to land runway two five right, wind two seven zero at eight knots.",
    "Turn left heading three four zero, contact tower one one eight decimal six.",
    "Ladies and gentlemen, we have started our descent. Please fasten your seat belts.",
    "Good morning! Would you like a room with a sea view? Breakfast is from seven o'clock.",
]
VOICES = {  # voice: its own espeak language (None = only the English reading)
    'ff_siwis': 'fr-fr', 'em_alex': 'es', 'im_nicola': 'it', 'pm_alex': 'pt-br',
    'hm_omega': 'hi', 'jm_kumo': None, 'zm_yunjian': None, 'am_michael': None,
}
os.makedirs('demo/out', exist_ok=True)
for v, own in VOICES.items():
    for rule, lang in (('en', 'en-us'), ('own', own)):
        if not lang:
            continue
        for i, t in enumerate(LINES):
            try:
                s, r = kk.create(t, voice=v, speed=0.95, lang=lang)
            except Exception as e:
                print('skip', v, rule, i, e); continue
            with tempfile.NamedTemporaryFile(suffix='.wav') as w:
                sf.write(w.name, s, r)
                subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', w.name, '-af', 'loudnorm=I=-16:TP=-1.5:LRA=11,aresample=24000',
                                '-ac', '1', '-c:a', 'libmp3lame', '-b:a', '40k', 'demo/out/%s-%s-%d.mp3' % (v, rule, i)], check=True)
            print(v, rule, i, flush=True)
