"""Offline metadata, waveform, original procedural music and SFX. No network/API."""
from pathlib import Path
import subprocess, json, wave, hashlib, math, shutil
import numpy as np

ROOT = Path(__file__).resolve().parents[1]
AUDIO = ROOT / 'public/audio'
DATA = ROOT / 'src/data'
DATA.mkdir(parents=True, exist_ok=True)
(AUDIO / 'sfx').mkdir(exist_ok=True)
source = AUDIO / 'episode01-vo.mp3'
pcm = subprocess.check_output(['ffmpeg','-v','error','-i',str(source),'-f','f32le','-ac','1','-ar','44100','-'])
voice = np.frombuffer(pcm, dtype='<f4')
duration = len(voice) / 44100
frames = math.ceil(duration * 30)
levels = [round(float(np.sqrt(np.mean(voice[i:i+1470] ** 2))), 5) for i in range(0,len(voice),1470)]
metadata = {'audioDurationSeconds':duration,'audioSamples':len(voice),'sampleRate':44100,'fps':30,'audioFrames':frames,'endingPaddingFrames':36,'durationInFrames':frames+36,'sourceSha256':hashlib.sha256(source.read_bytes()).hexdigest(),'voiceGain':0.79,'alignment':'Waveform-informed phrase timing; approximate, human review required. No ASR/forced alignment.'}
(DATA/'audioMetadata.json').write_text(json.dumps(metadata,indent=2)+'\n')
(DATA/'waveform.json').write_text(json.dumps(levels))

SR = 48000
rng = np.random.default_rng(1701)
def write(name, samples, peak):
    samples = np.array(samples, dtype=float)
    samples *= peak / max(0.001, np.max(np.abs(samples)))
    # Short sample-accurate fades prevent clicks at file boundaries.
    n = min(400,len(samples)//4)
    samples[:n] *= np.linspace(0,1,n)
    samples[-n:] *= np.linspace(1,0,n)
    with wave.open(str(AUDIO/name),'wb') as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes((samples*32767).astype('<i2').tobytes())
def tone(freq,dur=.25):
    t=np.arange(int(dur*SR))/SR
    return (np.sin(2*np.pi*freq*t)+.22*np.sin(4*np.pi*freq*t))*np.exp(-t*14)
def chord(freqs,dur=.5):
    return sum(tone(f,dur) for f in freqs)
write('sfx/notification.wav',np.concatenate([tone(880,.12),tone(1320,.28)]),.20)
write('sfx/success.wav',np.concatenate([chord([523,659],.13),chord([659,784],.13),chord([784,1046],.4)]),.18)
t=np.arange(int(.11*SR))/SR
write('sfx/click.wav',rng.normal(size=len(t))*np.exp(-t*80)+np.sin(2*np.pi*1400*t)*np.exp(-t*110),.15)
write('sfx/pop.wav',np.sin(2*np.pi*(430*t-1400*t*t))*np.exp(-t*35),.2)
t=np.arange(int(.42*SR))/SR
noise=rng.normal(size=len(t)); noise=np.convolve(noise,np.ones(15)/15,'same')
write('sfx/whoosh.wav',noise*np.sin(np.pi*t/.42)**2,.14)
t=np.arange(int(.5*SR))/SR
write('sfx/confused.wav',np.sin(2*np.pi*(440*t-200*t*t))*np.exp(-t*9),.16)
write('sfx/impact.wav',(np.sin(2*np.pi*(90*t-60*t*t))+.2*rng.normal(size=len(t)))*np.exp(-t*14),.22)
t=np.arange(int(.10*SR))/SR
write('sfx/tick.wav',(np.sin(2*np.pi*1800*t)+rng.normal(size=len(t))*.6)*np.exp(-t*80),.12)
typing=np.zeros(SR*2)
for start in [.0,.14,.24,.43,.54,.75,.9,1.04,1.22,1.41,1.53,1.74]:
    hit=tone(float(rng.choice([800,1000,1250])),.055)+rng.normal(size=int(.055*SR))*.2*np.exp(-np.arange(int(.055*SR))/SR*70)
    idx=int(start*SR); typing[idx:idx+len(hit)] += hit
write('sfx/typing.wav',typing,.12)

# Original 78 BPM warm electric-piano bed, deterministic synthesis, no samples.
length=(frames+36)/30
music=np.zeros(math.ceil(length*SR))
beat=60/78
progression=[[48,55,59,62],[45,52,55,59],[41,48,52,55],[43,50,53,57]]
for b in range(math.ceil(length/beat)):
    start=int(b*beat*SR)
    notes=progression[(b//8)%4]
    if b%2==0:
        tt=np.arange(int(2.6*SR))/SR
        hit=np.zeros(len(tt))
        for j,midi in enumerate(notes):
            f=440*2**((midi+12-69)/12)
            hit+=(np.sin(2*np.pi*f*tt)+.15*np.sin(2*np.pi*f*2*tt))*np.exp(-tt*(2.3+j*.18))*.13
        end=min(len(music),start+len(hit)); music[start:end]+=hit[:end-start]
    # Muted kick / soft rim, sparse rather than a distracting full drum kit.
    tt=np.arange(int(.16*SR))/SR
    hit=np.sin(2*np.pi*(52*tt+12*(1-np.exp(-tt*30))))*np.exp(-tt*35)*(.12 if b%2==0 else .04)
    end=min(len(music),start+len(hit));music[start:end]+=hit[:end-start]
write('music-original.wav',music,.24)

# Raster-free bundled font, SIL OFL license retained next to the font.
fonts=ROOT/'public/fonts'; fonts.mkdir(exist_ok=True)
fontroot=ROOT/'node_modules/@fontsource-variable/space-grotesk'
shutil.copy2(fontroot/'files/space-grotesk-latin-wght-normal.woff2',fonts/'SpaceGrotesk.woff2')
shutil.copy2(fontroot/'LICENSE',fonts/'OFL-SpaceGrotesk.txt')
print(json.dumps(metadata,indent=2))
print('Original VO decoded peak:',float(np.max(np.abs(voice))))
