import React from 'react';
import {useCurrentFrame} from 'remotion';
import {E as C} from '../data/episodeColors';
import {bob,enter} from '../utils/animations';
export const FloatingCard:React.FC<{children:React.ReactNode;delay?:number;x?:number;y?:number;width?:number;rotate?:number;accent?:boolean;style?:React.CSSProperties}>=({children,delay=0,x=90,y=700,width=900,rotate=0,accent=false,style})=>{
  const f=useCurrentFrame();const p=enter(f,delay);
  return <div style={{position:'absolute',left:x,top:y,width,background:accent?C.lime:C.white,border:`2px solid ${C.line}`,borderRadius:22,padding:'28px 32px',boxShadow:'0 14px 0 #0D0F0C09, 0 26px 38px #0D0F0C08',opacity:p,transform:`translateY(${(1-p)*54+bob(f,delay,3)}px) rotate(${rotate}deg) scale(${.95+p*.05})`,fontSize:42,fontWeight:600,...style}}>{children}</div>;
};
