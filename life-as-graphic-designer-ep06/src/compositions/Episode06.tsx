import React from 'react';
import {AbsoluteFill,Sequence,useCurrentFrame,useVideoConfig} from 'remotion';
import {Scene01Freeze} from '../scenes/Scene01Freeze';
import {Scene02UnsavedChanges} from '../scenes/Scene02UnsavedChanges';
import {Scene03AutoRecovery} from '../scenes/Scene03AutoRecovery';
import {Scene04FinalSprint} from '../scenes/Scene04FinalSprint';
import {Scene05FileSent} from '../scenes/Scene05FileSent';
import {Scene06NextMorning} from '../scenes/Scene06NextMorning';
import {Subtitle} from '../components/Subtitle';
import {Transition} from '../components/Transition';
import {AudioTimeline} from '../audio/AudioTimeline';
import {E} from '../data/episodeColors';
import {DURATION,sceneStarts as S,sceneLengths as L} from '../data/episode06Timings';
export const Episode06:React.FC<{music:boolean}>=({music=true})=>{
 const f=useCurrentFrame();const {fps}=useVideoConfig();
 return <AbsoluteFill style={{background:E.white,fontFamily:'Space, sans-serif',color:E.charcoal,overflow:'hidden'}}>
  <AbsoluteFill style={{backgroundImage:`radial-gradient(${E.beige}66 1.5px,transparent 1.7px)`,backgroundSize:'32px 32px',opacity:.4}}/>
  <div style={{position:'absolute',left:90,top:185,right:90,height:75,display:'flex',justifyContent:'space-between',borderBottom:`2px solid ${E.line}`,paddingBottom:19,alignItems:'center'}}><div style={{display:'flex',gap:17,alignItems:'center'}}><span style={{display:'inline-block',width:27,height:27,background:E.lime,boxShadow:`7px 7px 0 ${E.charcoal}`}}/><span style={{fontSize:23,fontWeight:700,lineHeight:1.1,letterSpacing:1}}>LIFE AS<br/>GRAPHIC DESIGNER</span></div><div style={{textAlign:'right',fontSize:21,lineHeight:1.4}}><strong>SEASON 01 / EPISODE 06</strong><br/><span style={{color:E.darkOlive}}>@fadly_hisbullah</span></div></div>
  <Sequence name="01 / The freeze" from={S[0]} durationInFrames={L[0]} premountFor={fps}><Scene01Freeze/></Sequence>
  <Sequence name="02 / Unsaved changes" from={S[1]} durationInFrames={L[1]} premountFor={fps}><Scene02UnsavedChanges/></Sequence>
  <Sequence name="03 / Auto Recovery" from={S[2]} durationInFrames={L[2]} premountFor={fps}><Scene03AutoRecovery/></Sequence>
  <Sequence name="04 / Final sprint" from={S[3]} durationInFrames={L[3]} premountFor={fps}><Scene04FinalSprint/></Sequence>
  <Sequence name="05 / File sent" from={S[4]} durationInFrames={L[4]} premountFor={fps}><Scene05FileSent/></Sequence>
  <Sequence name="06 / Next morning" from={S[5]} durationInFrames={L[5]} premountFor={fps}><Scene06NextMorning/></Sequence>
  <Transition/>
  <Subtitle/>
  <div style={{position:'absolute',left:90,right:90,bottom:280,height:4,background:E.line}}><div style={{width:`${f/(DURATION-1)*100}%`,height:4,background:E.olive}}/></div>
  <AudioTimeline music={music}/>
 </AbsoluteFill>;
};
