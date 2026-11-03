"""Original EP03 lo-fi music and DSP effects; no sampled/commercial recordings."""
from pathlib import Path
import wave,math,json
import numpy as np
r=Path(__file__).resolve().parents[1];out=r/'public/audio';rate=48000;rng=np.random.default_rng(303)
def write(name,a,peak=.22):
 a=np.asarray(a,dtype=float);a*=peak/max(.0001,np.max(np.abs(a)))
 n=min(500,len(a)//4);a[:n]*=np.linspace(0,1,n);a[-n:]*=np.linspace(1,0,n)
 with wave.open(str(out/name),'wb') as w:w.setnchannels(1);w.setsampwidth(2);w.setframerate(rate);w.writeframes((a*32767).astype('<i2').tobytes())
def t(d):return np.arange(round(d*rate))/rate
length=json.loads((r/'src/data/audioMetadata.json').read_text())['durationInFrames']/30
music=np.zeros(round(length*rate));beat=60/82;progression=[[48,55,59,62],[45,52,55,59],[41,48,52,55],[43,50,53,57]]
for b in range(math.ceil(length/beat)):
 notes=progression[(b//8)%4];start=round(b*beat*rate)
 tt=t(2.4);hit=np.zeros(len(tt))
 if b%2==0:
  for j,midi in enumerate(notes):
   hz=440*2**((midi+12-69)/12);hit+=(np.sin(2*np.pi*hz*tt)+.13*np.sin(4*np.pi*hz*tt))*np.exp(-tt*(2.6+j*.17))*.105
 else:
  hz=440*2**((notes[(b//2)%4]+24-69)/12);hit+=.055*np.sin(2*np.pi*hz*tt)*np.exp(-tt*8)
 k=t(.18);hit[:len(k)]+=.09*np.sin(2*np.pi*(52*k+9*(1-np.exp(-k*28))))*np.exp(-k*32)
 end=min(len(music),start+len(hit));music[start:end]+=hit[:end-start]
write('music-original.wav',music,.22)
x=t(.19);write('sfx/delete.wav',np.sin(2*np.pi*(940*x-2000*x*x))*np.exp(-x*25),.18)
x=t(.9);tone=np.zeros(len(x))
for i,f in enumerate([659.25,783.99,987.77]):
 u=np.maximum(0,x-i*.14);tone+=(x>=i*.14)*np.sin(2*np.pi*f*u)*np.exp(-u*6)
write('sfx/romance-slip.wav',tone,.20)
x=t(9);pulse=np.zeros(len(x));at=0
while at<8.7:
 u=np.maximum(0,x-at);pulse+=(x>=at)*np.sin(2*np.pi*150*u)*np.exp(-u*48)*.11
 at+=.58-.35*min(1,at/8.7)
write('sfx/color-pulse.wav',pulse,.14)
print('EP03 original 82 BPM lo-fi bed, delete sound, accelerating color pulse and typography sting generated.')
