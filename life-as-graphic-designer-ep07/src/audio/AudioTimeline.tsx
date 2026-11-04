import React from 'react';
import {Audio} from '@remotion/media';
import {Sequence,staticFile,useVideoConfig,interpolate} from 'remotion';
import metadata from '../data/audioMetadata.json';
import waveform from '../data/waveform.json';
import {DURATION,beat} from '../data/episode07Timings';
import {clamp} from '../utils/animations';
const smooth=waveform.map((_,i)=>{const a=waveform.slice(Math.max(0,i-6),i+9);return a.reduce((s,n)=>s+n,0)/a.length;});
const effects=[{at:beat.notification,file:'notification',v:.22},...[4.4,5.15,5.85].map(at=>({at,file:'heartbeat',v:.10})),{at:beat.approval,file:'click',v:.14},{at:beat.joy,file:'success',v:.23},...[beat.brief,beat.pinterest,beat.color,beat.font,beat.feedback,beat.freeze].map(at=>({at,file:'whoosh',v:.16})),{at:beat.feedback,file:'notification',v:.14},{at:beat.freeze,file:'error',v:.16},{at:beat.suffering,file:'impact',v:.13},...[beat.audience,beat.message,beat.priority].map(at=>({at,file:'click',v:.13})),...[beat.decisions,beat.decisions+1.3,beat.decisions+2.6,beat.revision].map(at=>({at,file:'click',v:.14})),{at:beat.finish,file:'success',v:.20},...[beat.price,beat.portfolio,beat.firstClient].map(at=>({at,file:'pop',v:.15})),{at:beat.sting,file:'closing',v:.25}];
export const AudioTimeline:React.FC<{music?:boolean}>=({music=true})=>{
 const {fps}=useVideoConfig();
 return <>
  <Sequence name="EP07 original uploaded MP3 / complete narration" durationInFrames={DURATION} premountFor={fps}><Audio src={staticFile('audio/ep07-voiceover.mp3')} volume={metadata.voiceGain}/></Sequence>
  {music&&<Sequence name="Original finale instrumental / suspense, montage, reflection, closing" durationInFrames={DURATION} premountFor={fps}><Audio src={staticFile('audio/music-original.wav')} volume={f=>{
   const speech=Math.min(1,(smooth[Math.min(smooth.length-1,Math.max(0,f))]||0)/.045),s=f/fps;
   const story=interpolate(s,[0,1.65,4.14,6.56,8.42,10.23,10.24,12.8,13.08,16.74,24.16,26.35,26.75,28.37,28.85,32.02,41.6,45.93,49.58,52.1,54.51,57.08,58.81,62.17,63.69,65.35,67,68],[.3,.35,.42,.22,0,0,.9,.9,.75,1,1,.25,.35,.2,.4,.48,.5,.45,.65,.8,.75,.75,.8,.8,.75,.85,.7,0],clamp);
   return (.22-.12*speech)*story*Math.min(1,f/18,Math.max(0,(DURATION-f)/30));
  }}/></Sequence>}
  {effects.map((e,i)=>{const start=Math.round(e.at*fps),length=Math.min(e.file==='closing'?70:30,DURATION-start);return <Sequence key={i} name={`SFX / ${e.file}`} from={start} durationInFrames={length} premountFor={fps}><Audio src={staticFile(`audio/sfx/${e.file}.wav`)} volume={f=>e.v*Math.min(1,Math.max(0,(length-f)/Math.min(12,length)))}/></Sequence>})}
 </>;
};
