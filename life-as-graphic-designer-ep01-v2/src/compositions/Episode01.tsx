import React from 'react';
import {AbsoluteFill,Sequence,useCurrentFrame,useVideoConfig} from 'remotion';
import {Scene01Hook} from '../scenes/Scene01Hook';
import {Scene02ClientMessage} from '../scenes/Scene02ClientMessage';
import {Scene03Confusion} from '../scenes/Scene03Confusion';
import {Scene04Questions} from '../scenes/Scene04Questions';
import {Scene05Answer} from '../scenes/Scene05Answer';
import {Scene06Canvas} from '../scenes/Scene06Canvas';
import {Scene07CreativeBlock} from '../scenes/Scene07CreativeBlock';
import {Scene08Teaser} from '../scenes/Scene08Teaser';
import {Subtitle} from '../components/Subtitle';
import {Transition} from '../components/Transition';
import {AudioTimeline} from '../audio/AudioTimeline';
import {C} from '../data/colors';
import {DURATION,sceneStarts as S,sceneLengths as L} from '../data/sceneTimings';
export type EpisodeProps={music:boolean};
export const Episode01:React.FC<EpisodeProps>=({music})=>{
 const f=useCurrentFrame();const {fps}=useVideoConfig();
 return <AbsoluteFill style={{background:C.white,fontFamily:'Space, sans-serif',color:C.charcoal,overflow:'hidden'}}>
  <AbsoluteFill style={{backgroundImage:`radial-gradient(${C.beige}66 1.5px,transparent 1.7px)`,backgroundSize:'32px 32px',opacity:.4}}/>
  <div style={{position:'absolute',left:90,top:185,right:90,height:75,display:'flex',justifyContent:'space-between',borderBottom:`2px solid ${C.line}`,paddingBottom:19,alignItems:'center'}}><div style={{display:'flex',gap:17,alignItems:'center'}}><span style={{display:'inline-block',width:27,height:27,background:C.lime,boxShadow:`7px 7px 0 ${C.charcoal}`}}/><span style={{fontSize:23,fontWeight:700,lineHeight:1.1,letterSpacing:1}}>LIFE AS<br/>GRAPHIC DESIGNER</span></div><div style={{textAlign:'right',fontSize:21,lineHeight:1.4}}><strong>SEASON 01 / EPISODE 01</strong><br/><span style={{color:C.darkOlive}}>@fadly_hisbullah</span></div></div>
  <Sequence name="01 — The Hook" from={S[0]} durationInFrames={L[0]} premountFor={fps}><Scene01Hook/></Sequence>
  <Sequence name="02 — Client Message" from={S[1]} durationInFrames={L[1]} premountFor={fps}><Scene02ClientMessage/></Sequence>
  <Sequence name="03 — Confusion" from={S[2]} durationInFrames={L[2]} premountFor={fps}><Scene03Confusion/></Sequence>
  <Sequence name="04 — Asking Questions" from={S[3]} durationInFrames={L[3]} premountFor={fps}><Scene04Questions/></Sequence>
  <Sequence name="05 — The Answer" from={S[4]} durationInFrames={L[4]} premountFor={fps}><Scene05Answer/></Sequence>
  <Sequence name="06 — Blank Canvas" from={S[5]} durationInFrames={L[5]} premountFor={fps}><Scene06Canvas/></Sequence>
  <Sequence name="07 — Creative Block" from={S[6]} durationInFrames={L[6]} premountFor={fps}><Scene07CreativeBlock/></Sequence>
  <Sequence name="08 — Episode 02 Teaser" from={S[7]} durationInFrames={L[7]} premountFor={fps}><Scene08Teaser/></Sequence>
  <Transition/>
  <Subtitle/>
  <div style={{position:'absolute',left:90,right:90,bottom:280,height:4,background:C.line}}><div style={{width:`${f/(DURATION-1)*100}%`,height:4,background:C.olive}}/></div>
  <AudioTimeline music={music}/>
 </AbsoluteFill>;
};
