import React from 'react';
import {useCurrentFrame} from 'remotion';
import {SceneCamera,SceneLabel,Headline} from '../components/SceneCamera';
import {Moodboard} from '../components/Moodboard';
import {FloatingCard} from '../components/FloatingCard';
import {PixelCharacter} from '../characters/PixelCharacter';
import {localBeat} from '../data/sceneTimings';
import {C} from '../data/colors';
import {enter} from '../utils/animations';
export const Scene05Answer:React.FC=()=>{
 const f=useCurrentFrame();const resolved=f>localBeat(4,40.76);
 return <SceneCamera>
  <SceneLabel number="05">ARAH VISUAL DITEMUKAN</SceneLabel>
  <Headline>{resolved?<>OKE.<br/>SEKARANG <span style={{background:C.lime}}>JELAS.</span></>:<>TERNYATA,<br/><span style={{color:C.darkOlive}}>INI MAUNYA.</span></>}</Headline>
  {[['AUDIENS','ANAK MUDA',35.07],['PESAN','DISKON',37.09],['VISUAL','DARK + GREEN',38.35]].map(([label,text,time],i)=><FloatingCard key={label} x={90+i*305} y={675} width={285} delay={localBeat(4,Number(time))} accent={i===1} style={{padding:'24px 21px',height:156,borderRadius:15}}><div style={{fontSize:18,letterSpacing:2,color:C.darkOlive,marginBottom:14}}>{label}</div><div style={{fontSize:i===2?31:35,lineHeight:1.12,fontWeight:700,letterSpacing:-1}}>{text}</div></FloatingCard>)}
  <Moodboard delay={localBeat(4,38.35)} style={{top:872}}/>
  <div style={{position:'absolute',left:115,top:1260,display:'flex',gap:8}}>{[C.charcoal,C.darkOlive,C.olive,C.lime,C.beige].map((color,i)=><div key={color} style={{width:76,height:50,background:color,opacity:enter(f,localBeat(4,38.35)+i*5)}}/>)}</div>
  <div style={{position:'absolute',left:650,top:1160}}><PixelCharacter width={170} action={resolved?'happy':'idle'}/></div>
 </SceneCamera>;
};
