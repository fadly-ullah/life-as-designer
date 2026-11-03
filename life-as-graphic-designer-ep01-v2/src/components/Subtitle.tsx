import React from 'react';
import {interpolate,useCurrentFrame,useVideoConfig} from 'remotion';
import {subtitles,subtitleKeywords} from '../data/subtitles';
import {C} from '../data/colors';
import {clamp} from '../utils/animations';
export const Subtitle:React.FC=()=>{
 const f=useCurrentFrame();const {fps}=useVideoConfig();const ms=f/fps*1000;
 const cue=subtitles.find(c=>ms>=c.startMs&&ms<c.endMs);
 if(!cue)return null;
 const p=interpolate(ms-cue.startMs,[0,90],[0,1],clamp);
 return <div style={{position:'absolute',left:90,right:90,bottom:325,minHeight:113,display:'flex',alignItems:'center',justifyContent:'center',padding:'19px 20px',borderRadius:20,background:'#F5F5F7F5',border:`1px solid ${C.line}`,boxShadow:'0 10px 36px #0D0F0C08',opacity:p,translate:`0 ${(1-p)*5}px`,color:C.charcoal,fontSize:45,lineHeight:1.3,fontWeight:700,textAlign:'center',letterSpacing:-1.2}}>
  <div>{cue.text.split('\n').map((line,i)=><div key={i} style={{whiteSpace:'nowrap'}}>{line.split(' ').map((word,j)=>{const key=word.toLowerCase().replace(/[^a-z]/g,'');return <React.Fragment key={j}>{j>0?' ':''}<span style={{background:subtitleKeywords.has(key)?`linear-gradient(transparent 22%, ${C.lime} 22%, ${C.lime} 94%, transparent 94%)`:undefined,padding:'0 2px'}}>{word}</span></React.Fragment>})}</div>)}</div>
 </div>;
};
