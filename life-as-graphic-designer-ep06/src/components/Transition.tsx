import React from 'react';
import {interpolate,useCurrentFrame} from 'remotion';
import {sceneStarts} from '../data/sceneTimings';
import {E as C} from '../data/episodeColors';
import {clamp} from '../utils/animations';
export const Transition:React.FC=()=>{
 const f=useCurrentFrame();const start=[sceneStarts[5]].find(s=>f>=s-4&&f<s+9);
 if(start===undefined)return null;
 const x=interpolate(f,[start-4,start+9],[-1450,1500],clamp);
 return <div style={{position:'absolute',inset:0,pointerEvents:'none',overflow:'hidden'}}><div style={{position:'absolute',left:x,top:-100,width:320,height:2200,background:C.lime,transform:'rotate(12deg)',boxShadow:`-28px 0 0 ${C.darkOlive}`}}/></div>;
};
