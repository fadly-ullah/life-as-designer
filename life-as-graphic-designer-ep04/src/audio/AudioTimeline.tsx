import React from 'react';
import {Audio} from '@remotion/media';
import {Sequence,staticFile,useVideoConfig,interpolate} from 'remotion';
import metadata from '../data/audioMetadata.json';
import waveform from '../data/waveform.json';
import {DURATION,beat} from '../data/episode04Timings';
import {clamp} from '../utils/animations';
const smooth=waveform.map((_,i)=>{const a=waveform.slice(Math.max(0,i-6),i+9);return a.reduce((s,n)=>s+n,0)/a.length;});
// No cough, sniffle or extra breath effects. The supplied nasal VO is untouched.
const effects=[{at:beat.colors,file:'click',v:.19},{at:beat.wedding-.2,file:'click',v:.25},{at:beat.wedding+.18,file:'romance-slip',v:.23},{at:beat.intent,file:'pop',v:.14},...[beat.decorative,beat.heavy,beat.serif].map(at=>({at,file:'pop',v:.22})),{at:beat.buset,file:'impact',v:.21},{at:beat.focus,file:'browser-close',v:.22},{at:beat.family,file:'click',v:.24},{at:beat.weight,file:'typing',v:.14},...[beat.title,beat.discount,beat.info,beat.spacing].map(at=>({at,file:'click',v:.22})),{at:beat.success,file:'success',v:.22},{at:beat.send,file:'send',v:.24},{at:beat.reply,file:'notification',v:.27},{at:beat.feedback,file:'impact',v:.20},{at:beat.sting,file:'ending-sting',v:.28}];
export const AudioTimeline:React.FC<{music?:boolean}>=({music=true})=>{
 const {fps}=useVideoConfig();
 return <>
  <Sequence name="EP04 supplied nasal VO / no extra filter, original timing" durationInFrames={DURATION} premountFor={fps}><Audio src={staticFile('audio/ep04-voiceover.mp3')} volume={metadata.voiceGain}/></Sequence>
  {music&&<Sequence name="Original EP04 lo-fi / smooth speech ducking" durationInFrames={DURATION} premountFor={fps}><Audio src={staticFile('audio/music-original.wav')} volume={f=>{
   const speech=Math.min(1,(smooth[Math.min(smooth.length-1,Math.max(0,f))]||0)/.045),s=f/fps;
   const story=interpolate(s,[0,3.59,7.1,7.32,8.2,13.04,18.95,19.07,20.1,22.8,29.94,30.96,32.72,43.99,48.72,50.11,50.32,51.9,54.1,54.37,56.57,59.1,60,61],[.45,.75,.85,.2,.6,.9,.9,0,.2,.45,.35,.35,.65,.9,.85,.85,.2,0,0,.18,.45,.6,.45,0],clamp);
   const fade=Math.min(1,f/24,Math.max(0,(DURATION-f)/30));return (.20-.105*speech)*story*fade;
  }}/></Sequence>}
  <Sequence name="Quiet desk room tone" durationInFrames={Math.round(7.1*fps)} premountFor={fps}><Audio src={staticFile('audio/sfx/desk-ambience.wav')} volume={.07}/></Sequence>
  {effects.map((e,i)=>{const start=Math.round(e.at*fps);const length=Math.min(e.file==='typing'?60:e.file==='ending-sting'?66:30,DURATION-start);return <Sequence key={i} name={`SFX / ${e.file}`} from={start} durationInFrames={length} premountFor={fps}><Audio src={staticFile(`audio/sfx/${e.file}.wav`)} volume={f=>e.v*Math.min(1,Math.max(0,(length-f)/Math.min(12,length)))}/></Sequence>})}
 </>;
};
