"""EP02-only original procedural sound effects. No downloaded samples."""
from pathlib import Path
import wave
import numpy as np
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'public/audio/sfx'
OUT.mkdir(parents=True,exist_ok=True)
RATE=48000
rng=np.random.default_rng(20261103)
def write(name,samples):
 samples=np.asarray(samples); samples=np.clip(samples,-.8,.8)
 with wave.open(str(OUT/(name+'.wav')),'wb') as w:
  w.setnchannels(1);w.setsampwidth(2);w.setframerate(RATE);w.writeframes((samples*32767).astype('<i2').tobytes())
def time(seconds): return np.arange(round(seconds*RATE))/RATE
x=time(.24);write('scroll',rng.normal(0,.19,len(x))*np.exp(-x*17)*np.sin(2*np.pi*32*x)**2)
x=time(.36);write('scratch',(.19*np.sin(2*np.pi*(760*x-840*x*x))+.11*rng.normal(0,1,len(x)))*np.exp(-x*9)*np.sin(np.pi*x/.36))
x=time(.19);write('browser-close',(.3*np.sin(2*np.pi*(1100*x-1900*x*x))+.035*rng.normal(0,1,len(x)))*np.exp(-x*23))
x=time(.6);noise=rng.normal(0,.15,len(x));write('pencil',noise*np.sin(2*np.pi*7*x)**2*np.sin(np.pi*x/.6)**2)
x=time(2.2);notes=[523.25,659.25,783.99,1046.5];tone=np.zeros(len(x))
for i,hz in enumerate(notes):
 u=np.maximum(0,x-i*.16);tone+=(x>=i*.16)*(.16*np.sin(2*np.pi*hz*u)+.045*np.sin(2*np.pi*hz*2*u))*np.exp(-u*4)
write('ending-sting',tone*np.minimum(1,(2.2-x)/.25))
x=time(55);write('computer-ambience',.012*np.sin(2*np.pi*95*x)+rng.normal(0,.007,len(x)))
x=time(8);pulse=np.zeros(len(x))
for at in np.arange(0,8,.25):
 u=x-at;active=u>=0;u=np.maximum(0,u);pulse+=active*.12*np.sin(2*np.pi*135*u)*np.exp(-u*45)
write('spiral-pulse',pulse)
print('Generated 7 original EP02 effects at 48 kHz.')
