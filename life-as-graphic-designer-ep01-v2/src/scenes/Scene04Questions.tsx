import React from 'react';
import {beats as B} from '../data/beats';
import {useCurrentFrame} from 'remotion';
import {SceneCamera,SceneLabel,Headline} from '../components/SceneCamera';
import {FloatingCard} from '../components/FloatingCard';
import {EpisodeCharacter as PixelCharacter} from '../characters/EpisodeCharacter';
import {C} from '../data/colors';
import {localBeat} from '../data/sceneTimings';
export const Scene04Questions:React.FC=()=>{
 const f=useCurrentFrame();
 const questions=[['01','SIAPA AUDIENSNYA?',B.audienceQuestion],['02','APA PESAN UTAMANYA?',B.messageQuestion],['03','GAYA VISUAL SEPERTI APA?',B.styleQuestion]] as const;
 const current=f>=localBeat(3,B.styleQuestion)?2:f>=localBeat(3,B.messageQuestion)?1:0;
 return <SceneCamera push={.015}>
  <SceneLabel number="04">KLARIFIKASI, BUKAN ASUMSI</SceneLabel>
  <Headline>TANYA DULU.<br/><span style={{color:C.darkOlive}}>CUKUP 3 HAL.</span></Headline>
  {questions.map(([n,t,s],i)=><FloatingCard key={n} x={90} y={690+i*150} width={900} delay={localBeat(3,s)-4} accent={current===i} style={{height:125,padding:'30px 28px',display:'flex',gap:25,alignItems:'center'}}><span style={{fontSize:26,color:C.darkOlive,border:`1px solid ${C.darkOlive}`,padding:'8px 11px'}}>{n}</span><span style={{fontSize:i===2?35:39,letterSpacing:-1.2}}>{t}</span><svg width="30" height="30" viewBox="0 0 30 30" style={{marginLeft:'auto',flexShrink:0}}><path d="M5 25L25 5M8 5H25V22" fill="none" stroke={C.charcoal} strokeWidth="3"/></svg></FloatingCard>)}
  <div style={{position:'absolute',left:155,top:1100}}><PixelCharacter sceneIndex={3} width={230} seated action={f<localBeat(3,B.audienceQuestion)?'typing':'pointing'}/></div>
  <div style={{position:'absolute',left:490,top:1210,width:410,borderBottom:`3px solid ${C.line}`,paddingBottom:24,fontSize:30,color:C.darkOlive}}>Brief jelas.<br/>Desain lebih terarah.<span style={{opacity:Math.floor(f/16)%2,marginLeft:4,color:C.charcoal}}>▌</span></div>
 </SceneCamera>;
};
