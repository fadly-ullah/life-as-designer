import React from 'react';
import {E} from '../data/episodeColors';
import {EditingTimeline} from './EditingTimeline';
import {phase} from '../utils/motion';
export const MonitorContent:React.FC<{frame:number}>=({frame})=>{
 const trim=phase(frame,374,420);const hook=phase(frame,406,425);const reveal=frame<240?1:phase(frame,240,264);const magnified=frame>=360&&frame<=425;
 return <div data-monitor-state={frame<240?'queued':frame<360?'weak-opening':trim<.95?'trimming':'hook-first'} style={{position:'absolute',inset:0,background:E.paper}}>
  <div style={{position:'absolute',left:19,top:12,right:18,fontSize:18,fontWeight:600,letterSpacing:1,color:E.darkOlive}}>VIDEO KLIEN / PREVIEW</div>
  <div style={{position:'absolute',left:20,top:42,width:118,height:210,background:E.charcoal,borderRadius:3,overflow:'hidden'}}>
   <div style={{position:'absolute',inset:0,opacity:1-hook,display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',gap:15}}><div style={{width:39,height:39,display:'grid',gridTemplateColumns:'1fr 1fr',gap:3}}>{[0,1,2,3].map((n)=><span key={n} style={{background:E.lime,opacity:Math.max(.12,Math.min(1,reveal*4-n)),translate:`0 ${(1-Math.min(1,Math.max(0,reveal*4-n)))*8}px`}}/>)}</div><strong style={{fontSize:28,color:E.white,letterSpacing:1}}>LOGO</strong></div>
   <div style={{position:'absolute',inset:0,opacity:hook,background:E.lime,padding:'23px 11px',display:'flex',justifyContent:'center',flexDirection:'column'}}><div style={{fontSize:14,letterSpacing:1,fontWeight:700,marginBottom:21}}>HOOK</div><div style={{fontSize:26,fontWeight:700,lineHeight:1.08,letterSpacing:-1}}>LANGSUNG<br/>KE INTI.</div></div>
  </div>
  <div style={{position:'absolute',left:162,right:18,top:64}}><div style={{fontSize:29,fontWeight:700,lineHeight:1.1}}>{frame<360?<>Logo duluan.<br/>Isi belakangan.</>:hook>.8?<>Isi tampil<br/>lebih awal.</>:<>Potong intro.<br/>Utamakan isi.</>}</div><div style={{fontSize:20,lineHeight:1.3,marginTop:18,color:E.darkOlive}}>{frame<240?'Video siap diperiksa.':frame<360?'Playhead jalan, opening masih sama.':'Perbaiki awalnya dulu.'}</div>{frame>=240&&frame<360&&<div style={{marginTop:20,height:4,background:E.line}}><div style={{height:4,width:`${phase(frame,245,345)*100}%`,background:E.olive}}/></div>}</div>
  {!magnified&&<div style={{position:'absolute',left:18,top:244,width:418,height:46}}><EditingTimeline frame={frame}/></div>}
 </div>;
};
