import React from 'react';
import {useCurrentFrame} from 'remotion';
import {E as C} from '../data/episodeColors';
import {enter} from '../utils/animations';
export const AnimatedChatBubble:React.FC<{children:React.ReactNode;delay?:number;label?:string;style?:React.CSSProperties;outgoing?:boolean;time?:string}>=({children,delay=0,label='KLIEN',style,outgoing=false,time='Baru saja'})=>{
 const f=useCurrentFrame();const p=enter(f,delay);
 return <div style={{position:'absolute',left:90,top:700,width:900,padding:34,background:outgoing?C.lime:C.white,border:`2px solid ${C.line}`,borderRadius:'26px 26px 26px 4px',boxShadow:'0 18px 40px #0D0F0C0B',opacity:p,transform:`translateY(${(1-p)*70}px) scale(${.94+.06*p})`,...style}}>
  <div style={{display:'flex',alignItems:'center',gap:15,marginBottom:22,fontSize:24,letterSpacing:2,color:C.darkOlive,fontWeight:700}}><span style={{width:38,height:38,background:outgoing?C.charcoal:C.lime,color:outgoing?C.lime:C.charcoal,display:'grid',placeItems:'center',borderRadius:12,fontSize:22}}>{outgoing?'F':'K'}</span>{label}<span style={{marginLeft:'auto',fontSize:22,color:C.muted,letterSpacing:0}}>{time}</span></div>
  <div style={{fontSize:44,lineHeight:1.23,fontWeight:600,letterSpacing:-1.2}}>{children}</div>
 </div>;
};
export const ChatBubble=AnimatedChatBubble;
