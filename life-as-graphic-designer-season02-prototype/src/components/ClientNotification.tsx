import React from 'react';
import {spring} from 'remotion';
import {E} from '../data/episodeColors';
import {phase} from '../utils/motion';
export const ClientNotification:React.FC<{frame:number}>=({frame})=>{
 const enter=spring({fps:30,frame:frame-15,config:{damping:23,stiffness:165,mass:.9}});const leave=1-phase(frame,104,124);
 if(frame<15||frame>=124)return null;
 return <>
  <svg width="1080" height="1920" viewBox="0 0 1080 1920" style={{position:'absolute',inset:0,opacity:enter*leave*.6}} aria-hidden="true"><path d="M395 1048L447 1008V857L490 817" fill="none" stroke={E.olive} strokeWidth="2" strokeDasharray="5 6"/><rect x="391" y="1044" width="8" height="8" fill={E.lime}/></svg>
  <div data-client-notification style={{position:'absolute',left:470,top:625,width:510,padding:'25px 28px',border:`2px solid ${E.line}`,borderRadius:'22px 22px 22px 5px',background:E.white,boxShadow:'8px 13px 25px #0B0C0A12',opacity:enter*leave,translate:`${(1-enter)*15}px ${(1-enter)*90}px`,scale:.96+.04*enter}}><div style={{display:'flex',gap:12,alignItems:'center',fontSize:22,color:E.darkOlive,letterSpacing:2,fontWeight:700,marginBottom:18}}><span style={{width:31,height:31,display:'grid',placeItems:'center',background:E.lime,borderRadius:8,fontSize:18}}>K</span>KLIEN</div><div style={{fontSize:38,fontWeight:600,lineHeight:1.2}}>Views-nya masih sepi.<br/>Bisa dibantu cek?</div></div>
 </>;
};
