import React from 'react';
import {AbsoluteFill,interpolate,useCurrentFrame,useVideoConfig} from 'remotion';
import {E} from '../data/episodeColors';
import {clamp,ease} from '../utils/animations';
export const EditorialShot:React.FC<{children:React.ReactNode;mode?:'steady'|'push'|'reframe'|'impact';impactAt?:number}>=({children,mode='steady',impactAt=0})=>{
 const f=useCurrentFrame();const standalone=useVideoConfig().id.startsWith('EP04-Scene-');
 const push=mode==='push'?interpolate(f,[0,42],[1,1.035],{...clamp,easing:ease}):1;
 const shift=mode==='reframe'?interpolate(f,[0,24,65,88],[0,-14,-14,0],{...clamp,easing:ease}):0;
 const hit=mode==='impact'&&f>=impactAt?interpolate(f,[impactAt,impactAt+5,impactAt+15],[1.055,1.025,1],clamp):1;
 return <AbsoluteFill style={{fontFamily:'Space, sans-serif',color:E.charcoal,background:standalone?E.white:undefined,transform:`translateX(${shift}px) scale(${push*hit})`,transformOrigin:'50% 52%'}}>{children}</AbsoluteFill>;
};
