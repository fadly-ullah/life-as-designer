import React from 'react';
import {beats as B} from '../data/beats';
import {localBeat} from '../data/sceneTimings';
import {interpolate,useCurrentFrame} from 'remotion';
import {EpisodeCharacter as PixelCharacter} from '../characters/EpisodeCharacter';
import {AnimatedChatBubble} from '../components/ChatBubble';
import {SceneCamera,SceneLabel,Headline} from '../components/SceneCamera';
import {C} from '../data/colors';
import {clamp,enter} from '../utils/animations';
export const Scene01Hook:React.FC=()=>{
 const f=useCurrentFrame();const hit=localBeat(0,B.wow);const shift=localBeat(0,B.riddle);const wow=f>=hit&&f<shift;const after=f>=shift;
 return <SceneCamera impactAt={hit} push={.015}>
  <SceneLabel number="01">BRIEF PALING BERBAHAYA</SceneLabel>
  <Headline size={after?94:98}>{after?<>INI BRIEF...<br/>ATAU <span style={{color:C.darkOlive}}>TEKA-TEKI?</span></>:<>“SIMPLE AJA...”</>}</Headline>
  {!after&&<div style={{position:'absolute',left:90,top:535,width:900,background:C.charcoal,color:C.lime,padding:'24px 30px 32px',fontSize:133,fontWeight:700,lineHeight:.95,letterSpacing:-7,opacity:enter(f,hit),transform:`rotate(-2deg) scale(${.78+.22*enter(f,hit)})`}}>HARUS WOW!</div>}
  <AnimatedChatBubble delay={15} label="PESAN BARU" style={{left:100,top:after?750:805,width:425,transform:`rotate(-4deg) translateY(${Math.sin(f/23)*5}px)`,opacity:enter(f,15)}}><span style={{fontSize:40}}>“Simple aja,<br/>tapi harus<br/><strong>WOW!</strong>”</span></AnimatedChatBubble>
  <div style={{position:'absolute',left:470,top:800,transform:`translateY(${(1-enter(f))*150}px)`}}><PixelCharacter sceneIndex={0} width={420} action={wow?'surprised':after?'talking':'reading'} speaking={after}/></div>
  <div style={{position:'absolute',left:126,top:1290,fontSize:25,letterSpacing:2,color:C.darkOlive,opacity:interpolate(f,[0,20],[0,1],clamp)}}>S01 / EP01<br/><span style={{fontSize:22,letterSpacing:0}}>Satu brief. Banyak pertanyaan.</span></div>
 </SceneCamera>;
};
