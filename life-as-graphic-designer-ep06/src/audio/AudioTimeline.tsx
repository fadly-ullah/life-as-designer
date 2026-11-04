import React from 'react';
import {Audio} from '@remotion/media';
import {Sequence,staticFile,useVideoConfig,interpolate} from 'remotion';
import metadata from '../data/audioMetadata.json';
import waveform from '../data/waveform.json';
import {DURATION,beat} from '../data/episode06Timings';
import {clamp} from '../utils/animations';
const smooth=waveform.map((_,i)=>{const a=waveform.slice(Math.max(0,i-6),i+9);return a.reduce((s,n)=>s+n,0)/a.length;});
const effects=[
 {at:beat.app,file:'click',v:.20},{at:beat.freeze,file:'error',v:.21},{at:beat.shock,file:'impact',v:.22},
 {at:beat.click1,file:'click',v:.25},{at:beat.click2,file:'click',v:.25},{at:beat.unsaved,file:'confused',v:.18},
 ...[8.1,10,12,14.1,17.0,19.5,23.1,25.3,32.1,34.0,36.1,38.7].map(at=>({at,file:'tick',v:.12})),
 {at:beat.restart,file:'startup',v:.20},{at:beat.hope,file:'loading',v:.13},{at:beat.recovery,file:'recovery',v:.24},{at:beat.relief,file:'success',v:.20},
 {at:beat.checkInfo,file:'click',v:.22},{at:beat.checkDiscount,file:'click',v:.19},{at:beat.layout,file:'typing',v:.12},{at:beat.dimensions,file:'click',v:.22},{at:beat.export,file:'click',v:.24},{at:beat.exported,file:'success',v:.17},
 {at:beat.upload,file:'click',v:.20},{at:beat.loading,file:'loading',v:.12},{at:beat.sent,file:'send',v:.28},
 {at:beat.notification,file:'notification',v:.25},{at:beat.revisions,file:'confused',v:.13},{at:beat.sting,file:'ending-sting',v:.25},
];
export const AudioTimeline:React.FC<{music?:boolean}>=({music=true})=>{
 const {fps}=useVideoConfig();
 return <>
  <Sequence name="EP06 uploaded WAV master / original bytes, complete speech" durationInFrames={DURATION} premountFor={fps}><Audio src={staticFile('audio/ep06-voiceover.wav')} volume={metadata.voiceGain}/></Sequence>
  {music&&<Sequence name="Original EP06 music / panic, relief, sprint, morning suspense" durationInFrames={DURATION} premountFor={fps}><Audio src={staticFile('audio/music-original.wav')} volume={f=>{
   const speech=Math.min(1,(smooth[Math.min(smooth.length-1,Math.max(0,f))]||0)/.045),s=f/fps;
   const story=interpolate(s,[0,3.65,3.81,6.5,7,14.1,15.6,16.79,18.82,21.24,25.3,25.44,26.99,28.8,31.63,33.31,38.26,40.48,40.79,42.50,43.46,46.75,48.45,50.26,51.5,54.23,56.5,58,59],[.9,.9,0,0,.65,.75,.8,0,.15,.45,.4,0,0,.8,.7,1,1,.65,.4,.3,.55,.45,.22,.3,.18,.27,.5,.5,0],clamp);
   return (.22-.12*speech)*story*Math.min(1,f/15,Math.max(0,(DURATION-f)/30));
  }}/></Sequence>}
  {effects.map((e,i)=>{const start=Math.round(e.at*fps),length=Math.min(e.file==='typing'?36:e.file==='ending-sting'?66:30,DURATION-start);return <Sequence key={i} name={`SFX / ${e.file}`} from={start} durationInFrames={length} premountFor={fps}><Audio src={staticFile(`audio/sfx/${e.file}.wav`)} volume={f=>e.v*Math.min(1,Math.max(0,(length-f)/Math.min(12,length)))}/></Sequence>})}
 </>;
};
