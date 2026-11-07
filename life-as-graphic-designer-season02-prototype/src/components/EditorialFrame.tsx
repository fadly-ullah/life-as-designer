import React from 'react';
import {AbsoluteFill} from 'remotion';
import {E} from '../data/episodeColors';
export const shotAt=(f:number)=>f<120?0:f<240?1:f<360?2:3;
export const EditorialFrame:React.FC<{frame:number;children:React.ReactNode}>=({frame,children})=>{
 const shot=shotAt(frame);
 return <AbsoluteFill style={{background:E.white,color:E.charcoal,fontFamily:'Space, sans-serif',overflow:'hidden'}}>
  <AbsoluteFill style={{backgroundImage:`radial-gradient(${E.beige}55 1.3px,transparent 1.5px)`,backgroundSize:'32px 32px',opacity:.3}}/>
  {children}
  <div style={{position:'absolute',left:90,top:185,right:90,height:75,display:'flex',justifyContent:'space-between',borderBottom:`2px solid ${E.line}`,paddingBottom:19,alignItems:'center'}}><div style={{display:'flex',gap:17,alignItems:'center'}}><span style={{display:'inline-block',width:27,height:27,background:E.lime,boxShadow:`7px 7px 0 ${E.charcoal}`}}/><span style={{fontSize:23,fontWeight:700,lineHeight:1.1,letterSpacing:1}}>LIFE AS<br/>GRAPHIC DESIGNER</span></div><div style={{textAlign:'right',fontSize:21,lineHeight:1.4}}><strong>SEASON 02</strong><br/><span style={{color:E.darkOlive}}>@fadly_hisbullah</span></div></div>
  <div style={{position:'absolute',left:90,top:302,fontSize:23,letterSpacing:2,fontWeight:600,color:E.darkOlive}}><span style={{background:E.lime,padding:'6px 10px',marginRight:15}}>0{shot+1}</span>{['CHAT DARI KLIEN','REAKSI / CEK DULU','VIDEO / OPENING LEMAH','MULAI MENGEDIT'][shot]}</div>
  <div style={{position:'absolute',left:90,right:90,top:385,fontSize:shot===3?91:99,fontWeight:700,lineHeight:1.04,letterSpacing:-5}}>{shot===0?<>VIEWS-NYA<br/>MASIH SEPI?</>:shot===1?<>BENTAR.<br/><span style={{background:E.lime}}>GUE CEK DULU.</span></>:shot===2?<>BUKAANNYA<br/><span style={{background:E.lime}}>KEPANJANGAN.</span></>:<>SEASON 02<br/><span style={{background:E.lime}}>MULAI DARI OPENING.</span></>}</div>
  <div style={{position:'absolute',left:90,right:90,top:1515,display:'flex',gap:12}}>{['CHAT','REAKSI','CEK VIDEO','EDIT'].map((label,i)=><div key={label} style={{flex:1,borderTop:`3px solid ${i<=shot?E.olive:E.line}`,paddingTop:13,fontSize:22,letterSpacing:1,color:i===shot?E.charcoal:E.darkOlive,fontWeight:i===shot?700:500}}>{String(i+1).padStart(2,'0')} / {label}</div>)}</div>
 </AbsoluteFill>;
};
