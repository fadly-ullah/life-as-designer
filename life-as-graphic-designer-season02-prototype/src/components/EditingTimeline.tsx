import React from 'react';
import {E} from '../data/episodeColors';
import {phase} from '../utils/motion';
export const EditingTimeline:React.FC<{frame:number;expanded?:number}>=({frame,expanded=0})=>{
 const trim=phase(frame,374,420);const intro=.62-.55*trim;const playing=frame<360?phase(frame,245,345)*.59:trim<.8?.59*(1-trim):.07+phase(frame,414,449)*.55;
 return <div data-intro-fraction={intro.toFixed(4)} style={{position:'absolute',inset:0,background:E.white,border:`${1+expanded}px solid ${E.line}`,borderRadius:6+expanded*8,boxShadow:`${expanded*9}px ${expanded*15}px ${expanded*32}px #0B0C0A22`,padding:`${5+expanded*14}px ${7+expanded*15}px`}}>
  {expanded>.1&&<div style={{fontSize:18+expanded*8,fontWeight:700,letterSpacing:1,color:E.darkOlive,opacity:expanded,marginBottom:9+expanded*9}}>EDIT / POTONG INTRO</div>}
  <div style={{height:26+expanded*40,position:'relative',display:'flex',gap:5,marginTop:expanded<.1?0:expanded*4}}>
   <div style={{width:`${intro*100}%`,height:'100%',background:E.olive,overflow:'hidden',display:'grid',placeItems:'center',color:E.white,fontSize:15+expanded*11,fontWeight:700,opacity:.95}}>{intro>.15?'INTRO':''}</div>
   <div style={{flex:1,height:'100%',background:E.lime,display:'flex',alignItems:'center',justifyContent:'center',fontSize:15+expanded*11,fontWeight:700,letterSpacing:1,color:E.charcoal}}>{trim>.6?'ISI / HOOK':'ISI VIDEO'}</div>
   <div style={{position:'absolute',top:-5,bottom:-5,left:`${playing*100}%`,width:3+expanded,background:E.charcoal}}><div style={{position:'absolute',top:-3,left:-4,width:11,height:6,background:E.charcoal}}/></div>
  </div>
  {expanded>.15&&<div style={{fontSize:19+expanded*4,fontWeight:600,color:E.darkOlive,marginTop:14+expanded*9,opacity:expanded}}>{trim>.8?'Mulai langsung dari isi.':'Buang pembuka yang terlalu lama.'}</div>}
 </div>;
};
export const TimelineForeground:React.FC<{frame:number}>=({frame})=>{
 if(frame<360||frame>425)return null;
 const p=phase(frame,360,374)*(1-phase(frame,396,425));
 return <div data-timeline-cover style={{position:'absolute',left:531-231*p,top:997+9*p,width:418+262*p,height:46+174*p,zIndex:20}}><EditingTimeline frame={frame} expanded={p}/></div>;
};
