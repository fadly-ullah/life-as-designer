import React from 'react';
import {Audio} from '@remotion/media';
import {Sequence,staticFile,useVideoConfig} from 'remotion';
import {C} from '../data/colors';
import metadata from '../data/audioMetadata.json';
import waveform from '../data/waveform.json';
import {DURATION,sceneStarts} from '../data/sceneTimings';

const smoothed=waveform.map((_,i)=>{
 const slice=waveform.slice(Math.max(0,i-7),i+8);
 return slice.reduce((s,n)=>s+n,0)/slice.length;
});
const sfx=[
 {at:.7,file:'notification',volume:.42},{at:3.88,file:'impact',volume:.35},
 {at:10.25,file:'pop',volume:.32},{at:13.53,file:'click',volume:.35},
 {at:16.17,file:'pop',volume:.28},{at:21.49,file:'confused',volume:.28},
 {at:27.5,file:'typing',volume:.32},{at:29.48,file:'click',volume:.32},
 {at:31.03,file:'click',volume:.32},{at:32.47,file:'click',volume:.32},
 {at:35.07,file:'success',volume:.36},{at:38.35,file:'pop',volume:.3},
 {at:43.88,file:'click',volume:.4},{at:46.4,file:'tick',volume:.38},
 {at:47.15,file:'tick',volume:.38},{at:47.94,file:'tick',volume:.4},
 {at:48.7,file:'tick',volume:.4},{at:49.5,file:'tick',volume:.4},
 {at:50.35,file:'impact',volume:.18},{at:54.22,file:'pop',volume:.3},
 {at:59.08,file:'click',volume:.35},
];
export const AudioTimeline:React.FC<{music?:boolean}>=({music=true})=>{
 const {fps}=useVideoConfig();
 return <>
  <Sequence name="Original VO — untrimmed, natural pitch" from={0} durationInFrames={DURATION} premountFor={fps}>
   <Audio src={staticFile('audio/episode01-vo.mp3')} volume={metadata.voiceGain}/>
  </Sequence>
  {music&&<Sequence name="Original lo-fi / speech ducking" from={0} durationInFrames={DURATION} premountFor={fps}>
   <Audio src={staticFile('audio/music-original.wav')} volume={(f)=>{
     const speech=Math.min(1,(smoothed[Math.min(smoothed.length-1,Math.max(0,f))]||0)/.045);
     const fade=Math.min(1,f/28,Math.max(0,(DURATION-f)/25));
     return (.27-.15*speech)*fade;
   }}/>
  </Sequence>}
  {sfx.map((s,i)=><Sequence key={i} name={`SFX / ${s.file}`} from={Math.round(s.at*fps)} durationInFrames={s.file==='typing'?2*fps:fps} premountFor={fps}><Audio src={staticFile(`audio/sfx/${s.file}.wav`)} volume={s.volume}/></Sequence>)}
  {sceneStarts.slice(1).map((f,i)=><Sequence key={`w${i}`} name="Scene whoosh" from={f-4} durationInFrames={Math.ceil(fps*.5)} premountFor={fps}><Audio src={staticFile('audio/sfx/whoosh.wav')} volume={.18}/></Sequence>)}
 </>;
};
