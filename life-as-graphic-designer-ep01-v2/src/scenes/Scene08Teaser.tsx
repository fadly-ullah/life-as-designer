import React from 'react';
import {beats as B} from '../data/beats';
import {useCurrentFrame} from 'remotion';
import {SceneCamera,SceneLabel,Headline} from '../components/SceneCamera';
import {EpisodeCharacter as PixelCharacter} from '../characters/EpisodeCharacter';
import {C} from '../data/colors';
import {localBeat} from '../data/sceneTimings';
import {enter,ramp} from '../utils/animations';
export const Scene08Teaser:React.FC=()=>{
 const f=useCurrentFrame();const question=f<localBeat(7,B.episodeTwo);const teaser=!question;
 return <SceneCamera push={.008}>
  <SceneLabel number="08">{question?'GILIRAN KAMU':'TO BE CONTINUED / EPISODE 02'}</SceneLabel>
  <Headline size={question?98:94}>{question?<>MULAI DARI<br/><span style={{background:C.lime}}>YANG MANA?</span></>:teaser?<>INSPIRASI ATAU<br/><span style={{background:C.lime}}>OVERTHINKING?</span></>:<>TERNYATA,<br/>BARU AWALNYA.</>}</Headline>
  {!question&&Array.from({length:6},(_,i)=>{const p=enter(f,localBeat(7,B.episodeTwo)+i*8);return <div key={i} style={{position:'absolute',left:100+(i%3)*293,top:720+Math.floor(i/3)*153,width:272,height:184,background:i%2?C.lime:C.charcoal,color:i%2?C.charcoal:C.lime,padding:20,border:`6px solid ${C.white}`,boxShadow:'0 12px 25px #0D0F0C10',opacity:p,transform:`translateY(${(1-p)*110}px) rotate(${(i%3-1)*7+Math.sin(f/30+i)*2}deg)`}}><div style={{fontSize:16,letterSpacing:2}}>SAVED / 00{i+1}</div><div style={{marginTop:18,fontSize:34,fontWeight:700,lineHeight:1.05}}>{['TYPE &\nLAYOUT','COLOR\nSTUDY','POSTER\nINSPIRATION','DARK\nMOOD','BOLD\nIDEAS','ONE\nMORE...'][i]}</div></div>})}
  {question&&<div style={{position:'absolute',left:90,top:740,width:900,display:'flex',gap:20}}>{['01 / SKETSA','02 / REFERENSI'].map((s,i)=><div key={s} style={{width:440,height:170,background:i?C.charcoal:C.lime,color:i?C.lime:C.charcoal,padding:30,borderRadius:18,fontSize:36,fontWeight:700,opacity:enter(f,localBeat(7,B.question)+i*13)}}><div style={{height:55,marginBottom:8}}><svg width="44" height="44" viewBox="0 0 44 44">{i?<g fill="none" stroke={C.lime} strokeWidth="3"><rect x="3" y="3" width="32" height="32" rx="2"/><path d="M11 11H27M11 18H27M11 25H22M40 12V40H12"/></g>:<g stroke={C.charcoal} strokeWidth="3" fill="none"><path d="M7 27L28 6L37 15L16 36L5 39Z M24 10L33 19 M7 27L16 36"/><path d="M6 32L12 38"/></g>}</svg></div>{s}</div>)}</div>}
  <div style={{position:'absolute',left:question?355:385,top:question?910:1040}}><PixelCharacter sceneIndex={7} width={question?315:245} action={question?'happy':teaser?'surprised':'talking'} speaking={!teaser}/></div>
  <div style={{position:'absolute',left:90,top:1340,width:900,display:'flex',justifyContent:'space-between',alignItems:'center',fontSize:26,color:C.darkOlive,borderTop:`2px solid ${C.line}`,paddingTop:17}}><span>{question?'TULIS DI KOMENTAR ↓':'EPISODE 02 / SEGERA'}</span><strong>@fadly_hisbullah</strong></div>
  <div style={{position:'absolute',right:90,top:970,width:12,height:330,background:C.lime,transformOrigin:'bottom',scale:`1 ${ramp(f,localBeat(7,B.overthinking),localBeat(7,B.overthinking+2.35))}`}}/>
 </SceneCamera>;
};
