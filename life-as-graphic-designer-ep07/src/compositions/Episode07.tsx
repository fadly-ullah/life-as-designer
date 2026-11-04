import React from 'react';
import {AbsoluteFill,Sequence,useCurrentFrame,useVideoConfig} from 'remotion';
import {Scene01ClientApproval} from '../scenes/Scene01ClientApproval';
import {Scene02Flashback} from '../scenes/Scene02Flashback';
import {Scene03LessonsLearned} from '../scenes/Scene03LessonsLearned';
import {Scene04DesignDecisions} from '../scenes/Scene04DesignDecisions';
import {Scene05SeasonComplete} from '../scenes/Scene05SeasonComplete';
import {Scene06SeasonTwo} from '../scenes/Scene06SeasonTwo';
import {Subtitle} from '../components/Subtitle';
import {Transition} from '../components/Transition';
import {AudioTimeline} from '../audio/AudioTimeline';
import {E} from '../data/episodeColors';
import {DURATION,sceneStarts as S,sceneLengths as L} from '../data/episode07Timings';
export const Episode07:React.FC<{music:boolean}>=({music=true})=>{
 const f=useCurrentFrame();const {fps}=useVideoConfig();
 return <AbsoluteFill style={{background:E.white,fontFamily:'Space, sans-serif',color:E.charcoal,overflow:'hidden'}}>
  <AbsoluteFill style={{backgroundImage:`radial-gradient(${E.beige}66 1.5px,transparent 1.7px)`,backgroundSize:'32px 32px',opacity:.4}}/>
  <div style={{position:'absolute',left:90,top:185,right:90,height:75,display:'flex',justifyContent:'space-between',borderBottom:`2px solid ${E.line}`,paddingBottom:19,alignItems:'center'}}><div style={{display:'flex',gap:17,alignItems:'center'}}><span style={{display:'inline-block',width:27,height:27,background:E.lime,boxShadow:`7px 7px 0 ${E.charcoal}`}}/><span style={{fontSize:23,fontWeight:700,lineHeight:1.1,letterSpacing:1}}>LIFE AS<br/>GRAPHIC DESIGNER</span></div><div style={{textAlign:'right',fontSize:21,lineHeight:1.4}}><strong>SEASON 01 / EPISODE 07</strong><br/><span style={{color:E.darkOlive}}>@fadly_hisbullah</span></div></div>
  <Sequence name="01 / Client approval" from={S[0]} durationInFrames={L[0]} premountFor={fps}><Scene01ClientApproval/></Sequence>
  <Sequence name="02 / Six-episode flashback" from={S[1]} durationInFrames={L[1]} premountFor={fps}><Scene02Flashback/></Sequence>
  <Sequence name="03 / Lessons learned" from={S[2]} durationInFrames={L[2]} premountFor={fps}><Scene03LessonsLearned/></Sequence>
  <Sequence name="04 / Design decisions" from={S[3]} durationInFrames={L[3]} premountFor={fps}><Scene04DesignDecisions/></Sequence>
  <Sequence name="05 / Season 01 complete" from={S[4]} durationInFrames={L[4]} premountFor={fps}><Scene05SeasonComplete/></Sequence>
  <Sequence name="06 / Season 02 topics" from={S[5]} durationInFrames={L[5]} premountFor={fps}><Scene06SeasonTwo/></Sequence>
  <Transition/><Subtitle/>
  <div style={{position:'absolute',left:90,right:90,bottom:280,height:4,background:E.line}}><div style={{width:`${f/(DURATION-1)*100}%`,height:4,background:E.olive}}/></div>
  <AudioTimeline music={music}/>
 </AbsoluteFill>;
};
