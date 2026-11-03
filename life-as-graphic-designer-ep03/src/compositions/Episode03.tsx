import React from 'react';
import {AbsoluteFill,Sequence,useCurrentFrame,useVideoConfig} from 'remotion';
import {Scene01ColorDisaster} from '../scenes/Scene01ColorDisaster';
import {Scene02FiveColors} from '../scenes/Scene02FiveColors';
import {Scene03HierarchyFailure} from '../scenes/Scene03HierarchyFailure';
import {Scene04ReturnToBrief} from '../scenes/Scene04ReturnToBrief';
import {Scene05ColorFunctions} from '../scenes/Scene05ColorFunctions';
import {Scene06Cleanup} from '../scenes/Scene06Cleanup';
import {Scene07SuccessfulDesign} from '../scenes/Scene07SuccessfulDesign';
import {Scene08TypographyDisaster} from '../scenes/Scene08TypographyDisaster';
import {Subtitle} from '../components/Subtitle';
import {Transition} from '../components/Transition';
import {AudioTimeline} from '../audio/AudioTimeline';
import {E} from '../data/episodeColors';
import {DURATION,sceneStarts as S,sceneLengths as L} from '../data/episode03Timings';
export const episodeScenes=[Scene01ColorDisaster,Scene02FiveColors,Scene03HierarchyFailure,Scene04ReturnToBrief,Scene05ColorFunctions,Scene06Cleanup,Scene07SuccessfulDesign,Scene08TypographyDisaster];
export const sceneNames=['Color disaster', 'Five favorite colors', 'Hierarchy failure', 'Return to brief', 'Color functions', 'Cleanup and contrast', 'Successful design', 'Typography disaster'];
export const Episode03:React.FC<{music:boolean}>=({music=true})=>{
 const f=useCurrentFrame();const {fps}=useVideoConfig();
 return <AbsoluteFill style={{background:E.white,fontFamily:'Space, sans-serif',color:E.charcoal,overflow:'hidden'}}>
  <AbsoluteFill style={{backgroundImage:`radial-gradient(${E.beige}66 1.5px,transparent 1.7px)`,backgroundSize:'32px 32px',opacity:.4}}/>
  <div style={{position:'absolute',left:90,top:185,right:90,height:75,display:'flex',justifyContent:'space-between',borderBottom:`2px solid ${E.line}`,paddingBottom:19,alignItems:'center'}}><div style={{display:'flex',gap:17,alignItems:'center'}}><span style={{display:'inline-block',width:27,height:27,background:E.lime,boxShadow:`7px 7px 0 ${E.charcoal}`}}/><span style={{fontSize:23,fontWeight:700,lineHeight:1.1,letterSpacing:1}}>LIFE AS<br/>GRAPHIC DESIGNER</span></div><div style={{textAlign:'right',fontSize:21,lineHeight:1.4}}><strong>SEASON 01 / EPISODE 03</strong><br/><span style={{color:E.darkOlive}}>@fadly_hisbullah</span></div></div>
  <Sequence name="01 / Color disaster" from={S[0]} durationInFrames={L[0]} premountFor={fps}><Scene01ColorDisaster/></Sequence>
  <Sequence name="02 / Five favorite colors" from={S[1]} durationInFrames={L[1]} premountFor={fps}><Scene02FiveColors/></Sequence>
  <Sequence name="03 / Hierarchy failure" from={S[2]} durationInFrames={L[2]} premountFor={fps}><Scene03HierarchyFailure/></Sequence>
  <Sequence name="04 / Return to brief" from={S[3]} durationInFrames={L[3]} premountFor={fps}><Scene04ReturnToBrief/></Sequence>
  <Sequence name="05 / Color functions" from={S[4]} durationInFrames={L[4]} premountFor={fps}><Scene05ColorFunctions/></Sequence>
  <Sequence name="06 / Cleanup and contrast" from={S[5]} durationInFrames={L[5]} premountFor={fps}><Scene06Cleanup/></Sequence>
  <Sequence name="07 / Successful design" from={S[6]} durationInFrames={L[6]} premountFor={fps}><Scene07SuccessfulDesign/></Sequence>
  <Sequence name="08 / Typography disaster" from={S[7]} durationInFrames={L[7]} premountFor={fps}><Scene08TypographyDisaster/></Sequence>
  <Transition/>
  <Subtitle/>
  <div style={{position:'absolute',left:90,right:90,bottom:280,height:4,background:E.line}}><div style={{width:`${f/(DURATION-1)*100}%`,height:4,background:E.olive}}/></div>
  <AudioTimeline music={music}/>
 </AbsoluteFill>;
};
