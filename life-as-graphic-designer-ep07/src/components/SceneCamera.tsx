import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {E as C} from '../data/episodeColors';
import {clamp, ease, enter} from '../utils/animations';

export const SceneCamera:React.FC<{children:React.ReactNode;push?:number;impactAt?:number}>=({children,push=.025,impactAt=-100})=>{
  const f=useCurrentFrame();const {durationInFrames}=useVideoConfig();
  const hit=Math.max(0,1-(f-impactAt)/12)*(f>=impactAt?1:0);
  return <AbsoluteFill style={{transform:`translate(${Math.sin(f*2.5)*hit*7}px,${(1-enter(f))*35}px) scale(${interpolate(f,[0,durationInFrames],[1,1+push],clamp)+hit*.025})`,transformOrigin:'50% 52%'}}>{children}</AbsoluteFill>;
};
export const SceneLabel:React.FC<{number:string;children:React.ReactNode}>=({number,children})=><div style={{position:'absolute',left:90,top:301,display:'flex',alignItems:'center',gap:16,color:C.darkOlive,fontSize:25,fontWeight:600,letterSpacing:2}}><span style={{background:C.lime,padding:'7px 12px',fontSize:22}}>{number}</span>{children}</div>;
export const Headline:React.FC<{children:React.ReactNode;top?:number;size?:number;style?:React.CSSProperties}>=({children,top=385,size=98,style})=><div style={{position:'absolute',top,left:90,right:90,fontSize:size,fontWeight:700,lineHeight:1.04,letterSpacing:-5,color:C.charcoal,...style}}>{children}</div>;
export const BodyNote:React.FC<{children:React.ReactNode;top?:number;style?:React.CSSProperties}>=({children,top=625,style})=><div style={{position:'absolute',left:94,right:90,top,fontSize:32,lineHeight:1.35,color:C.muted,...style}}>{children}</div>;
