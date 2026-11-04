"""Original EP06 instrumental and DSP effects. No sampled/commercial recordings."""
from pathlib import Path
import wave, math, json
import numpy as np
r=Path(__file__).resolve().parents[1];out=r/'public/audio';rate=48000;rng=np.random.default_rng(606)
def write(name,a,peak=.22):
 a=np.asarray(a,dtype=float);a*=peak/max(.0001,np.max(np.abs(a)))
 n=min(500,len(a)//4);a[:n]*=np.linspace(0,1,n);a[-n:]*=np.linspace(1,0,n)
 with wave.open(str(out/name),'wb') as w:w.setnchannels(1);w.setsampwidth(2);w.setframerate(rate);w.writeframes((a*32767).astype('<i2').tobytes())
def t(d):return np.arange(round(d*rate))/rate
def tone(notes,d=.6):
 tt=t(d);a=np.zeros(len(tt))
 for j,(hz,at) in enumerate(notes):
  q=tt-at;mask=q>=0;a+=np.where(mask,(np.sin(2*np.pi*hz*q)+.12*np.sin(4*np.pi*hz*q))*np.exp(-np.maximum(0,q)*10),0)
 return a
length=json.loads((r/'src/data/audioMetadata.json').read_text())['durationInFrames']/30
music=np.zeros(round(length*rate));beat=60/96;progression=[[48,55,58,62],[45,52,55,60],[41,48,53,57],[43,50,53,58]]
for b in range(math.ceil(length/beat)):
 at=b*beat;notes=progression[(b//8)%4];start=round(at*rate);tt=t(2.4);hit=np.zeros(len(tt))
 if b%2==0:
  for j,midi in enumerate(notes):
   hz=440*2**((midi+12-69)/12);hit+=(np.sin(2*np.pi*hz*tt)+.10*np.sin(4*np.pi*hz*tt))*np.exp(-tt*(3+j*.12))*.09
 else:
  hz=440*2**((notes[(b//2)%4]+24-69)/12);hit+=.055*np.sin(2*np.pi*hz*tt)*np.exp(-tt*8)
 k=t(.15);hit[:len(k)]+=.075*np.sin(2*np.pi*(50*k+8*(1-np.exp(-k*25))))*np.exp(-k*35)
 if 31.5<at<40.5:
  h=t(.07);noise=rng.normal(0,1,len(h));hit[:len(h)]+=.009*np.diff(noise,prepend=0)*np.exp(-h*70)
 end=min(len(music),start+len(hit));music[start:end]+=hit[:end-start]
write('music-original.wav',music,.22)
write('sfx/error.wav',tone([(329.63,0),(233.08,.12)],.36),.28)
write('sfx/startup.wav',tone([(261.63,0),(392,.14),(523.25,.29)],.65),.26)
write('sfx/loading.wav',tone([(440,0),(440,.17)],.4),.18)
write('sfx/recovery.wav',tone([(392,0),(493.88,.14),(587.33,.28),(783.99,.42)],.85),.28)
print('Created original 96 BPM instrumental and error/startup/loading/recovery DSP cues; retained original series SFX.')
