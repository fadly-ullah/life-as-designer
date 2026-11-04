import React from 'react';
import {useCurrentFrame} from 'remotion';
import {E} from '../data/episodeColors';
import {enter} from '../utils/animations';
export const FunctionRow:React.FC<{label:string;role:string;color:string;delay:number;top:number;active?:boolean}>=({label,role,color,delay,top,active=false})=>{
 const p=enter(useCurrentFrame(),delay);
 return <div style={{position:'absolute',left:90,top,width:345,display:'flex',alignItems:'center',gap:18,padding:'20px 18px',background:active?E.lime:E.white,border:`1px solid ${E.line}`,borderRadius:13,opacity:p,transform:`translateX(${(1-p)*-25}px)`}}><span style={{background:color,width:48,height:48,border:`1px solid ${E.line}`,flexShrink:0}}/><div><div style={{fontSize:24,fontWeight:700}}>{label}</div><div style={{fontSize:20,color:E.darkOlive,marginTop:3}}>{role}</div></div></div>;
};
