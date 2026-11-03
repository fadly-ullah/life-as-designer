import React from 'react';
import {interpolate,useCurrentFrame} from 'remotion';
import {SceneLabel,Headline} from '../components/SceneCamera';
import {EditorialShot} from '../components/EditorialShot';
import {InspirationBrowser} from '../components/InspirationBrowser';
import {AnimatedChatBubble} from '../components/ChatBubble';
import {Episode02Character} from '../characters/Episode02Character';
import {beat,localBeat} from '../data/episode02Timings';
import {E} from '../data/episodeColors';
import {clamp,ease} from '../utils/animations';
export const Scene05Reset:React.FC=()=>{
 const f=useCurrentFrame();const close=localBeat(4,beat.close);const closed=f>=close;
 const slide=interpolate(f,[close,close+15],[0,-1120],{...clamp,easing:ease});
 return <EditorialShot>
  <SceneLabel number="05">RESET / BALIK KE TUJUAN</SceneLabel>
  <Headline size={closed?96:130}>{closed?<>BALIK KE<br/><span style={{background:E.lime}}>BRIEF.</span></>:<>STOP.</>}</Headline>
  <div style={{opacity:interpolate(f,[close,close+13],[.4,0],clamp),transform:`translateX(${slide}px)`}}><InspirationBrowser scroll={500} saved={12} style={{top:650,height:540}}/></div>
  <AnimatedChatBubble delay={close+9} label="BRIEF KLIEN" style={{top:650,minHeight:440}}><div style={{display:'grid',gap:22}}>{[['AUDIENS','Anak muda'],['PESAN','Promo yang jelas'],['ARAH','Tegas & terarah']].map(([label,t])=><div key={label} style={{borderBottom:`1px solid ${E.line}`,paddingBottom:15}}><div style={{fontSize:21,letterSpacing:2,color:E.darkOlive,marginBottom:5}}>{label}</div><div style={{fontSize:40}}>{t}</div></div>)}</div></AnimatedChatBubble>
  <div style={{position:'absolute',left:130,top:1100}}><Episode02Character sceneIndex={4} width={240}/></div>
  {closed&&<div style={{position:'absolute',left:485,top:1220,fontSize:33,color:E.darkOlive}}>Kurangi pilihan.<br/>Perjelas tujuan.</div>}
 </EditorialShot>;
};
