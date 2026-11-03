import React from 'react';
import {Audio} from '@remotion/media';
import {Sequence,staticFile,useVideoConfig} from 'remotion';
import {beats as B} from '../data/beats';
import metadata from '../data/audioMetadata.json';
import waveform from '../data/waveform.json';
import {DURATION,sceneStarts} from '../data/sceneTimings';

const smoothed=waveform.map((_,i)=>{
 const slice=waveform.slice(Math.max(0,i-7),i+8);
 return slice.reduce((s,n)=>s+n,0)/slice.length;
});
const sfx=[
 {at:.18,file:'notification',volume:.22},{at:B.wow,file:'impact',volume:.32},
 {at:B.huh,file:'confused',volume:.17},{at:B.openChat,file:'pop',volume:.26},
 {at:B.poster,file:'click',volume:.25},{at:B.elegan,file:'pop',volume:.16},
 {at:B.minimalis,file:'pop',volume:.16},{at:B.which,file:'confused',volume:.15},
 {at:B.stop,file:'click',volume:.20},{at:B.askThree,file:'typing',volume:.18},
 {at:B.audienceQuestion,file:'click',volume:.25},{at:B.messageQuestion,file:'click',volume:.25},
 {at:B.styleQuestion,file:'click',volume:.25},{at:B.clarity,file:'success',volume:.27},
 {at:B.discountAnswer,file:'pop',volume:.20},{at:B.visualAnswer,file:'pop',volume:.20},
 {at:B.sketch,file:'typing',volume:.14},{at:B.openCanvas,file:'click',volume:.32},
 {at:B.elapsed,file:'tick',volume:.30},{at:B.elapsed+.8,file:'tick',volume:.24},
 {at:B.elapsed+1.55,file:'tick',volume:.22},{at:B.elapsed+2.25,file:'tick',volume:.16},
 {at:B.zero,file:'impact',volume:.24},{at:B.question,file:'click',volume:.22},
 {at:B.sketchChoice,file:'pop',volume:.14},{at:B.referenceChoice,file:'pop',volume:.14},
 {at:B.episodeTwo,file:'pop',volume:.27},{at:B.overthinking,file:'confused',volume:.15},
];
export const AudioTimeline:React.FC<{music?:boolean}>=({music=true})=>{
 const {fps}=useVideoConfig();
 return <>
  <Sequence name="Latest V2 VO — untrimmed, natural pitch" from={0} durationInFrames={DURATION} premountFor={fps}>
   <Audio src={staticFile(metadata.staticSource)} volume={metadata.voiceGain}/>
  </Sequence>
  {music&&<Sequence name="Original lo-fi / speech ducking" from={0} durationInFrames={DURATION} premountFor={fps}>
   <Audio src={staticFile('audio/music-original.wav')} volume={(f)=>{
     const speech=Math.min(1,(smoothed[Math.min(smoothed.length-1,Math.max(0,f))]||0)/.045);
     const fade=Math.min(1,f/28,Math.max(0,(DURATION-f)/25));
     return (.25-.14*speech)*fade;
   }}/>
  </Sequence>}
  {sfx.map((s,i)=><Sequence key={i} name={`SFX / ${s.file}`} from={Math.round(s.at*fps)} durationInFrames={s.file==='typing'?2*fps:fps} premountFor={fps}><Audio src={staticFile(`audio/sfx/${s.file}.wav`)} volume={s.volume}/></Sequence>)}
  {sceneStarts.slice(1).map((f,i)=><Sequence key={`w${i}`} name="Scene whoosh" from={f-4} durationInFrames={Math.ceil(fps*.5)} premountFor={fps}><Audio src={staticFile('audio/sfx/whoosh.wav')} volume={.12}/></Sequence>)}
 </>;
};
