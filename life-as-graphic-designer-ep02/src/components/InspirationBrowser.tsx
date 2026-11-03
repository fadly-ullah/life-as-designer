import React from 'react';
import {useCurrentFrame,interpolate} from 'remotion';
import {E} from '../data/episodeColors';
import {ReferencePoster} from './ReferencePoster';
import {clamp} from '../utils/animations';
export const InspirationBrowser:React.FC<{scroll?:number;saved?:number;style?:React.CSSProperties}>=({scroll=0,saved=1,style})=>{
 const f=useCurrentFrame();
 return <div style={{position:'absolute',left:90,top:540,width:900,height:720,border:`2px solid ${E.line}`,borderRadius:22,overflow:'hidden',background:E.white,boxShadow:'0 16px 0 #0D0F0C09',...style}}>
  <div style={{height:75,display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 24px',borderBottom:`1px solid ${E.line}`,background:E.paper}}><div style={{fontSize:29,fontWeight:700}}>IDEA / BOARD</div><div style={{fontSize:22,padding:'8px 14px',background:E.lime,borderRadius:8}}>TERSIMPAN: {saved}</div></div>
  <div style={{position:'absolute',left:20,right:20,top:95,display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:18,transform:`translateY(${-scroll}px)`}}>{Array.from({length:15},(_,i)=><div key={i} style={{height:265,border:`6px solid ${E.white}`,boxShadow:'0 3px 9px #00000015',position:'relative'}}><ReferencePoster variant={i}/>{i<saved&&<div style={{position:'absolute',right:8,top:8,background:E.white,padding:'7px 8px',fontSize:15,fontWeight:700,borderRadius:5}}>SAVED</div>}</div>)}</div>
  <div style={{position:'absolute',right:6,top:110+interpolate(scroll,[0,750],[0,200],clamp),height:80,width:5,background:E.beige,borderRadius:4}}/>
 </div>;
};
