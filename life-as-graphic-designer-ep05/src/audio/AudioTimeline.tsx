import React from 'react';
import {Audio} from '@remotion/media';
import {Sequence,staticFile,useVideoConfig,interpolate} from 'remotion';
import metadata from '../data/audioMetadata.json';
import waveform from '../data/waveform.json';
import {DURATION,beat} from '../data/episode05Timings';
import {clamp} from '../utils/animations';
const smooth=waveform.map((_,i)=>{const a=waveform.slice(Math.max(0,i-6),i+9);return a.reduce((s,n)=>s+n,0)/a.length;});
const effects=[{at:beat.feedback-.2,file:'notification',v:.25},{at:beat.confused,file:'impact',v:.17},{at:beat.kick+.45,file:'whoosh',v:.25},...[beat.ornaments,beat.colors,beat.other].map(at=>({at,file:'pop',v:.20})),{at:beat.clutter,file:'confused',v:.18},{at:beat.ask,file:'typing',v:.14},{at:beat.ask+1.6,file:'send',v:.21},{at:beat.answer,file:'notification',v:.23},{at:beat.clear,file:'success',v:.20},...[beat.enlarge,beat.contrast,beat.cta].map(at=>({at,file:'click',v:.24})),{at:beat.resend,file:'send',v:.25},{at:beat.approved,file:'notification',v:.25},{at:beat.relief,file:'success',v:.28},{at:beat.again,file:'notification',v:.23},{at:beat.deadline,file:'click',v:.20},...[47.35,47.85,48.15,48.4,48.65,48.9,49.15,49.4].map(at=>({at,file:'tick',v:.22})),{at:beat.shock,file:'impact',v:.29},{at:beat.sting,file:'ending-sting',v:.30}];
export const AudioTimeline:React.FC<{music?:boolean}>=({music=true})=>{
 const {fps}=useVideoConfig();
 return <>
  <Sequence name="EP05 uploaded WAV master / untrimmed, natural timing" durationInFrames={DURATION} premountFor={fps}><Audio src={staticFile('audio/ep05-voiceover.wav')} volume={metadata.voiceGain}/></Sequence>
  {music&&<Sequence name="Original EP05 lo-fi / narration ducking and comic stops" durationInFrames={DURATION} premountFor={fps}><Audio src={staticFile('audio/music-original.wav')} volume={f=>{
   const speech=Math.min(1,(smooth[Math.min(smooth.length-1,Math.max(0,f))]||0)/.045),s=f/fps;
   const story=interpolate(s,[0,3.15,5.3,5.42,7.87,9.44,12.92,17.12,18.42,20.60,20.74,27,30.62,36.7,42.47,44.18,45.49,47.1,47.24,50.17,50.76,52.96,55,56],[.8,.8,.8,0,.2,.6,.65,.85,0,0,.4,.5,.75,.85,.9,1,.25,.25,0,0,.2,.55,.55,0],clamp);
   return (.21-.115*speech)*story*Math.min(1,f/24,Math.max(0,(DURATION-f)/30));
  }}/></Sequence>}
  {effects.map((e,i)=>{const start=Math.round(e.at*fps),length=Math.min(e.file==='typing'?60:e.file==='ending-sting'?66:30,DURATION-start);return <Sequence key={i} name={`SFX / ${e.file}`} from={start} durationInFrames={length} premountFor={fps}><Audio src={staticFile(`audio/sfx/${e.file}.wav`)} volume={f=>e.v*Math.min(1,Math.max(0,(length-f)/Math.min(12,length)))}/></Sequence>})}
 </>;
};
