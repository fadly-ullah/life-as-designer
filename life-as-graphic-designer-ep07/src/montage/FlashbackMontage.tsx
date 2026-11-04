import React from 'react';
import {Video} from '@remotion/media';
import {Sequence,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';
import {E} from '../data/episodeColors';
import {beat,localBeat} from '../data/episode07Timings';

const ArchiveClip:React.FC<{episode:number;label:string;file:string}>=({episode,label,file})=>{
 const {fps}=useVideoConfig();const f=useCurrentFrame();
 return <div style={{position:'absolute',left:90,top:610,width:900,height:825,border:`2px solid ${E.line}`,borderRadius:18,overflow:'hidden',background:E.paper,boxShadow:'0 15px 0 #0B0C0A08'}}>
  <Video src={staticFile(file)} muted premountFor={fps} style={{height:825,width:742.5,position:'absolute',left:77,top:0}}/>
  <div style={{position:'absolute',left:0,right:0,top:0,padding:'12px 21px',background:E.white,borderBottom:`1px solid ${E.line}`,display:'flex',justifyContent:'space-between',fontSize:22,fontWeight:600,letterSpacing:1}}><span>FLASHBACK / EP{String(episode).padStart(2,'0')}</span><span style={{color:E.darkOlive}}>{label}</span></div>
  <div style={{position:'absolute',left:0,right:0,bottom:0,padding:'10px 20px',display:'flex',gap:8,background:E.white}}>{[1,2,3,4,5,6].map(n=><div key={n} style={{height:5,flex:1,background:n===episode?E.olive:E.line}}/>)}</div>
  <div style={{position:'absolute',left:0,top:0,bottom:0,width:Math.max(0,1-f/5)*14,background:E.lime}}/>
 </div>;
};
/** Real animated excerpts, each authored separately and without previous audio. */
export const FlashbackMontage:React.FC=()=>{
 const {fps}=useVideoConfig();
 return <>
  <Sequence name="Archive EP01 / confusing brief" from={localBeat(1,beat.brief)} durationInFrames={localBeat(1,beat.pinterest)-localBeat(1,beat.brief)} premountFor={fps}><ArchiveClip episode={1} label="SIMPLE AJA, HARUS WOW" file="montage/ep01.mp4"/></Sequence>
  <Sequence name="Archive EP02 / too many references" from={localBeat(1,beat.pinterest)} durationInFrames={localBeat(1,beat.color)-localBeat(1,beat.pinterest)} premountFor={fps}><ArchiveClip episode={2} label="KEBANYAKAN REFERENSI" file="montage/ep02.mp4"/></Sequence>
  <Sequence name="Archive EP03 / color chaos" from={localBeat(1,beat.color)} durationInFrames={localBeat(1,beat.font)-localBeat(1,beat.color)} premountFor={fps}><ArchiveClip episode={3} label="WARNA BERANTAKAN" file="montage/ep03.mp4"/></Sequence>
  <Sequence name="Archive EP04 / wedding typography" from={localBeat(1,beat.font)} durationInFrames={localBeat(1,beat.feedback)-localBeat(1,beat.font)} premountFor={fps}><ArchiveClip episode={4} label="UNDANGAN NIKAHAN?" file="montage/ep04.mp4"/></Sequence>
  <Sequence name="Archive EP05 / ambiguous feedback" from={localBeat(1,beat.feedback)} durationInFrames={localBeat(1,beat.freeze)-localBeat(1,beat.feedback)} premountFor={fps}><ArchiveClip episode={5} label="KURANG NENDANG" file="montage/ep05.mp4"/></Sequence>
  <Sequence name="Archive EP06 / frozen application" from={localBeat(1,beat.freeze)} durationInFrames={localBeat(1,beat.suffering)-localBeat(1,beat.freeze)} premountFor={fps}><ArchiveClip episode={6} label="FREEZE SAAT DEADLINE" file="montage/ep06.mp4"/></Sequence>
 </>;
};
