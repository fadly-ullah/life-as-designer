import React from 'react';
import {AbsoluteFill,Sequence,useCurrentFrame,useVideoConfig} from 'remotion';
import {Scene01EmptyCanvas} from '../scenes/Scene01EmptyCanvas';
import {Scene02InspirationSpiral} from '../scenes/Scene02InspirationSpiral';
import {Scene03ThirtyMinutes} from '../scenes/Scene03ThirtyMinutes';
import {Scene04Overthinking} from '../scenes/Scene04Overthinking';
import {Scene05Reset} from '../scenes/Scene05Reset';
import {Scene06Keywords} from '../scenes/Scene06Keywords';
import {Scene07Direction} from '../scenes/Scene07Direction';
import {Scene08ColorDisaster} from '../scenes/Scene08ColorDisaster';
import {Subtitle} from '../components/Subtitle';
import {Transition} from '../components/Transition';
import {AudioTimeline} from '../audio/AudioTimeline';
import {E} from '../data/episodeColors';
import {DURATION,sceneStarts as S,sceneLengths as L} from '../data/episode02Timings';
export const episodeScenes=[Scene01EmptyCanvas,Scene02InspirationSpiral,Scene03ThirtyMinutes,Scene04Overthinking,Scene05Reset,Scene06Keywords,Scene07Direction,Scene08ColorDisaster];
export const sceneNames=['Empty canvas','Inspiration spiral','Thirty minutes later','Overthinking','Reset and focus','Three keywords','Design direction','Color disaster'];
export const Episode02:React.FC<{music:boolean}>=({music=true})=>{
 const f=useCurrentFrame();const {fps}=useVideoConfig();
 return <AbsoluteFill style={{background:E.white,fontFamily:'Space, sans-serif',color:E.charcoal,overflow:'hidden'}}>
  <AbsoluteFill style={{backgroundImage:`radial-gradient(${E.beige}66 1.5px,transparent 1.7px)`,backgroundSize:'32px 32px',opacity:.4}}/>
  <div style={{position:'absolute',left:90,top:185,right:90,height:75,display:'flex',justifyContent:'space-between',borderBottom:`2px solid ${E.line}`,paddingBottom:19,alignItems:'center'}}><div style={{display:'flex',gap:17,alignItems:'center'}}><span style={{display:'inline-block',width:27,height:27,background:E.lime,boxShadow:`7px 7px 0 ${E.charcoal}`}}/><span style={{fontSize:23,fontWeight:700,lineHeight:1.1,letterSpacing:1}}>LIFE AS<br/>GRAPHIC DESIGNER</span></div><div style={{textAlign:'right',fontSize:21,lineHeight:1.4}}><strong>SEASON 01 / EPISODE 02</strong><br/><span style={{color:E.darkOlive}}>@fadly_hisbullah</span></div></div>
  <Sequence name="01 / Empty canvas" from={S[0]} durationInFrames={L[0]} premountFor={fps}><Scene01EmptyCanvas/></Sequence>
  <Sequence name="02 / Inspiration spiral" from={S[1]} durationInFrames={L[1]} premountFor={fps}><Scene02InspirationSpiral/></Sequence>
  <Sequence name="03 / Thirty minutes later" from={S[2]} durationInFrames={L[2]} premountFor={fps}><Scene03ThirtyMinutes/></Sequence>
  <Sequence name="04 / Overthinking" from={S[3]} durationInFrames={L[3]} premountFor={fps}><Scene04Overthinking/></Sequence>
  <Sequence name="05 / Reset and focus" from={S[4]} durationInFrames={L[4]} premountFor={fps}><Scene05Reset/></Sequence>
  <Sequence name="06 / Three keywords" from={S[5]} durationInFrames={L[5]} premountFor={fps}><Scene06Keywords/></Sequence>
  <Sequence name="07 / Design direction" from={S[6]} durationInFrames={L[6]} premountFor={fps}><Scene07Direction/></Sequence>
  <Sequence name="08 / Color disaster" from={S[7]} durationInFrames={L[7]} premountFor={fps}><Scene08ColorDisaster/></Sequence>
  <Transition/>
  <Subtitle/>
  <div style={{position:'absolute',left:90,right:90,bottom:280,height:4,background:E.line}}><div style={{width:`${f/(DURATION-1)*100}%`,height:4,background:E.olive}}/></div>
  <AudioTimeline music={music}/>
 </AbsoluteFill>;
};
