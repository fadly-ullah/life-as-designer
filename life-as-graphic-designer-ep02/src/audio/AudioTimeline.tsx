import React from 'react';
import {Audio} from '@remotion/media';
import {Sequence,staticFile,useVideoConfig,interpolate} from 'remotion';
import metadata from '../data/audioMetadata.json';
import waveform from '../data/waveform.json';
import {DURATION,beat} from '../data/episode02Timings';
import {clamp} from '../utils/animations';
const smoothed=waveform.map((_,i)=>{const a=waveform.slice(Math.max(0,i-6),i+9);return a.reduce((s,n)=>s+n,0)/a.length;});
const effects=[
 {at:.5,file:'click',v:.28},{at:5.7,file:'pop',v:.20},{at:6.1,file:'pop',v:.18},{at:6.5,file:'pop',v:.16},
 {at:8.29,file:'click',v:.24},{at:11.38,file:'success',v:.18},{at:12.42,file:'scroll',v:.26},{at:13.26,file:'pop',v:.20},
 {at:14.26,file:'pop',v:.21},{at:15.12,file:'scroll',v:.27},
 ...[15.30,15.60,15.84,16.03].map(at=>({at,file:'tick',v:.25})),
 {at:16.25,file:'scratch',v:.34},{at:16.65,file:'impact',v:.20},
 {at:21.09,file:'pop',v:.18},{at:22.36,file:'pop',v:.18},{at:23.41,file:'pop',v:.18},
 {at:25.1,file:'confused',v:.16},{at:28.39,file:'browser-close',v:.30},
 ...[32.20,32.91,33.56,34.24,34.45,34.66].map(at=>({at,file:'click',v:.22})),
 ...[36.39,36.75,37.12].map(at=>({at,file:'pencil',v:.26})),
 {at:39.73,file:'success',v:.24},{at:44.28,file:'pop',v:.24},{at:44.85,file:'pop',v:.24},
 {at:47.28,file:'impact',v:.28},{at:51.45,file:'ending-sting',v:.35},
];
export const AudioTimeline:React.FC<{music?:boolean}>=({music=true})=>{
 const {fps}=useVideoConfig();
 return <>
  <Sequence name="EP02 supplied VO / original pitch, untrimmed" durationInFrames={DURATION}><Audio src={staticFile('audio/ep02-voiceover.mp3')} volume={metadata.voiceGain}/></Sequence>
  {music&&<Sequence name="Original series lo-fi / speech ducking" durationInFrames={DURATION}><Audio src={staticFile('audio/music-original.wav')} volume={f=>{
   const speech=Math.min(1,(smoothed[Math.min(smoothed.length-1,Math.max(0,f))]||0)/.045);
   const s=f/fps;
   const story=interpolate(s,[0,15.99,16.16,17.55,17.72,24.7,25.1,26.68,26.96,38.22,43.45,47.12,47.28,48.5,48.8,51.45,54,55],[1,1,0,0,.7,.7,.28,.28,.6,.9,1,1,0,0,.45,.7,.7,0],clamp);
   const fade=Math.min(1,f/24,Math.max(0,(DURATION-f)/30));
   return (.22-.12*speech)*story*fade;
  }}/></Sequence>}
  {music&&<Sequence name="Spiral rhythmic energy" from={Math.round(8.16*fps)} durationInFrames={8*fps}><Audio src={staticFile('audio/sfx/spiral-pulse.wav')} volume={f=>interpolate(f,[0,190,231,240],[.15,.29,.22,0],clamp)}/></Sequence>}
  <Sequence name="Quiet computer ambience" durationInFrames={Math.round(beat.close*fps)}><Audio src={staticFile('audio/sfx/computer-ambience.wav')} volume={.10}/></Sequence>
  {effects.map((e,i)=><Sequence key={i} name={`SFX / ${e.file}`} from={Math.round(e.at*fps)} durationInFrames={e.file==='ending-sting'?66:30}><Audio src={staticFile(`audio/sfx/${e.file}.wav`)} volume={e.v}/></Sequence>)}
 </>;
};
