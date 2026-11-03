import React from 'react';
import {Audio} from '@remotion/media';
import {Sequence,staticFile,useVideoConfig,interpolate} from 'remotion';
import metadata from '../data/audioMetadata.json';
import waveform from '../data/waveform.json';
import {DURATION,beat} from '../data/episode03Timings';
import {clamp} from '../utils/animations';
const smoothed=waveform.map((_,i)=>{const a=waveform.slice(Math.max(0,i-6),i+9);return a.reduce((s,n)=>s+n,0)/a.length;});
const effects=[
 {at:beat.colors,file:'click',v:.25},{at:2.06,file:'pop',v:.20},{at:beat.disaster,file:'impact',v:.28},
 ...[6.65,7.05,7.45,7.85,8.25].map(at=>({at,file:'pop',v:.22})),
 {at:beat.combine,file:'click',v:.25},{at:beat.buset,file:'confused',v:.20},
 {at:beat.titleLost,file:'confused',v:.15},{at:beat.scroll,file:'whoosh',v:.20},
 {at:beat.brief,file:'browser-close',v:.25},{at:beat.goal,file:'pop',v:.16},
 ...[beat.charcoal,beat.cream,beat.lime,beat.sparing].map(at=>({at,file:'click',v:.24})),
 {at:beat.remove,file:'delete',v:.24},{at:38.1,file:'delete',v:.20},{at:beat.reorder,file:'click',v:.20},
 {at:beat.success,file:'success',v:.25},{at:48.54,file:'click',v:.27},
 {at:beat.wedding,file:'romance-slip',v:.28},{at:49.7,file:'impact',v:.16},
 {at:beat.sting,file:'ending-sting',v:.32},
];
export const AudioTimeline:React.FC<{music?:boolean}>=({music=true})=>{
 const {fps}=useVideoConfig();
 return <>
  <Sequence name="EP03 user-supplied VO / original pitch and speed, complete" durationInFrames={DURATION}><Audio src={staticFile('audio/ep03-voiceover.mp3')} volume={metadata.voiceGain}/></Sequence>
  {music&&<Sequence name="EP03 original lo-fi / measured speech ducking" durationInFrames={DURATION}><Audio src={staticFile('audio/music-original.wav')} volume={f=>{
   const speech=Math.min(1,(smoothed[Math.min(smoothed.length-1,Math.max(0,f))]||0)/.045);const s=f/fps;
   const story=interpolate(s,[0,6.38,11.09,12.3,12.43,12.9,13.23,15.57,21.16,23.36,25.51,29.74,36.27,40.9,46.73,49.3,49.47,50.99,51.32,54.02,57,58],[.9,.95,1.1,1.1,.12,.12,.7,.5,.35,.25,.55,.75,.7,1,.9,.9,0,0,.3,.7,.7,0],clamp);
   const fade=Math.min(1,f/24,Math.max(0,(DURATION-f)/30));return (.22-.12*speech)*story*fade;
  }}/></Sequence>}
  {music&&<Sequence name="Five-color experiment / accelerating rhythmic pulse" from={Math.round(6.604603*fps)} durationInFrames={270}><Audio src={staticFile('audio/sfx/color-pulse.wav')} volume={f=>interpolate(f,[0,225,270],[.14,.26,0],clamp)}/></Sequence>}
  {effects.map((e,i)=><Sequence key={i} name={`SFX / ${e.file}`} from={Math.round(e.at*fps)} durationInFrames={e.file==='ending-sting'?66:30}><Audio src={staticFile(`audio/sfx/${e.file}.wav`)} volume={e.v}/></Sequence>)}
 </>;
};
