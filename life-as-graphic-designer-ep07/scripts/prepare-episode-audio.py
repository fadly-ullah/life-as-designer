"""Original EP07 finale instrumental and DSP effects; no sampled recordings."""
from pathlib import Path
import wave,math,json
import numpy as np
r=Path(__file__).resolve().parents[1];out=r/'public/audio';rate=48000;rng=np.random.default_rng(707)
def write(name,a,peak=.22):
 a=np.asarray(a,dtype=float);a*=peak/max(.0001,np.max(np.abs(a)));n=min(500,len(a)//4);a[:n]*=np.linspace(0,1,n);a[-n:]*=np.linspace(1,0,n)
 with wave.open(str(out/name),'wb') as w:w.setnchannels(1);w.setsampwidth(2);w.setframerate(rate);w.writeframes((a*32767).astype('<i2').tobytes())
def t(d):return np.arange(round(d*rate))/rate
length=json.loads((r/'src/data/audioMetadata.json').read_text())['durationInFrames']/30
music=np.zeros(round(length*rate));beat=60/90;progression=[[48,55,59,64],[45,52,55,60],[41,48,52,57],[43,50,55,59]]
for b in range(math.ceil(length/beat)):
 at=b*beat;notes=progression[(b//8)%4];start=round(at*rate);tt=t(3.0);hit=np.zeros(len(tt));reflect=28.5<=at<49.6
 if b%2==0:
  for j,midi in enumerate(notes):
   hz=440*2**((midi+12-69)/12);hit+=(np.sin(2*np.pi*hz*tt)+.1*np.sin(4*np.pi*hz*tt))*np.exp(-tt*(1.9+j*.10))*.075
 elif not reflect:
  hz=440*2**((notes[(b//2)%4]+24-69)/12);hit+=.045*np.sin(2*np.pi*hz*tt)*np.exp(-tt*7)
 if at>10 and not reflect:
  k=t(.17);hit[:len(k)]+=.055*np.sin(2*np.pi*(50*k+8*(1-np.exp(-k*25))))*np.exp(-k*32)
 if 16.6<at<26.5:
  h=t(.065);noise=rng.normal(0,1,len(h));hit[:len(h)]+=.007*np.diff(noise,prepend=0)*np.exp(-h*60)
 end=min(len(music),start+len(hit));music[start:end]+=hit[:end-start]
write('music-original.wav',music,.22)
tt=t(.56);pulse=np.zeros(len(tt))
for at in [0,.19]:
 q=np.maximum(0,tt-at);pulse+=np.where(tt>=at,np.sin(2*np.pi*62*q)*np.exp(-q*38),0)
write('sfx/heartbeat.wav',pulse,.22)
tt=t(1.4);closing=np.zeros(len(tt))
for hz,at in [(523.25,0),(659.25,.12),(783.99,.24),(1046.5,.43)]:
 q=np.maximum(0,tt-at);closing+=np.where(tt>=at,np.sin(2*np.pi*hz*q)*np.exp(-q*5),0)
write('sfx/closing.wav',closing,.28)
print('Created original 90 BPM finale music, heartbeat-like suspense pulse and closing chime; retained original series SFX.')
