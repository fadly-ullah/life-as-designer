import React from 'react';
import {E} from '../data/episodeColors';
/** Fictional video under inspection. Qualitative feedback, no invented analytics. */
export const VideoInterface:React.FC<{frame:number;editing?:boolean;simple?:boolean}>=({frame,editing=false,simple=false})=>{
 const progress=simple?.2:Math.min(1,Math.max(0,(frame-245)/100));
 return <div style={{position:'absolute',inset:0,background:E.paper,padding:18}}>
  <div style={{fontSize:19,fontWeight:600,color:E.darkOlive,marginBottom:12}}>VIDEO KLIEN / 9:16</div>
  <div style={{position:'absolute',left:22,top:54,width:140,height:190,background:E.charcoal,display:'flex',alignItems:'center',justifyContent:'center',color:E.lime,fontSize:30,fontWeight:700}}>LOGO</div>
  <div style={{position:'absolute',left:183,right:17,top:64,fontSize:22,fontWeight:600,lineHeight:1.3}}>{editing?'POTONG INTRO':'Opening panjang.'}<div style={{fontSize:17,fontWeight:400,marginTop:14,color:E.darkOlive}}>{editing?'Mulai dari yang menarik.':'Isi utama belum masuk.'}</div></div>
  <div style={{position:'absolute',left:20,right:20,bottom:23,height:24,background:E.line}}><div style={{width:'62%',height:24,background:E.olive}}/><div style={{position:'absolute',left:`${progress*100}%`,top:-6,bottom:-6,width:3,background:E.charcoal}}/></div>
 </div>;
};
