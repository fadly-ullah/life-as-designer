import React from 'react';
import {useCurrentFrame} from 'remotion';
import {E as C} from '../data/episodeColors';
export const Cursor:React.FC<{x:number;y:number;scale?:number}>=({x,y,scale=1})=><svg width={40*scale} height={50*scale} viewBox="0 0 40 50" style={{position:'absolute',left:x,top:y,filter:'drop-shadow(2px 3px 0 #fff)'}}><path d="M3 2V38L12 29L21 47L29 43L20 26L35 25Z" fill={C.charcoal} stroke={C.white} strokeWidth="2"/></svg>;
export const PixelComputer:React.FC<{children?:React.ReactNode;style?:React.CSSProperties;label?:string}>=({children,style,label='Untitled—01'})=><div style={{position:'absolute',left:310,top:815,width:650,height:400,background:C.charcoal,padding:13,borderRadius:15,boxShadow:'12px 15px 0 #0D0F0C10',...style}}>
 <div style={{height:35,background:'#30372D',display:'flex',alignItems:'center',padding:'0 14px',gap:8,color:C.paper,fontSize:16}}><span style={{background:C.lime,width:9,height:9,borderRadius:8}}/><span style={{width:9,height:9,background:C.beige,borderRadius:8,opacity:.7}}/><span style={{width:9,height:9,background:C.beige,borderRadius:8,opacity:.7}}/><span style={{marginLeft:16}}>{label}</span><span style={{marginLeft:'auto',background:C.lime,width:8,height:8,rotate:'45deg'}}/></div>
 <div style={{position:'relative',height:'calc(100% - 35px)',background:'#DDDCD6',overflow:'hidden'}}>{children}</div>
 <div style={{position:'absolute',left:'43%',bottom:-35,width:'14%',height:35,background:C.beige}}/><div style={{position:'absolute',left:'34%',bottom:-45,width:'32%',height:12,background:C.darkOlive,borderRadius:3}}/>
</div>;
export const DesignCanvas:React.FC<{busy?:boolean}>=({busy=false})=>{
 const f=useCurrentFrame();
 const x=busy?170+Math.sin(f/18)*120:150+Math.min(1,f/50)*200;
 const y=busy?120+Math.cos(f/25)*65:150;
 return <><div style={{position:'absolute',left:0,top:0,bottom:0,width:35,background:'#F5F5F2',borderRight:`1px solid ${C.beige}`,paddingTop:15}}>{['V','R','O','T','+'].map(t=><div key={t} style={{fontSize:18,textAlign:'center',marginBottom:12,color:C.darkOlive}}>{t}</div>)}</div><div style={{position:'absolute',right:12,top:16,color:C.muted,fontSize:12}}>1080 × 1350</div><div style={{position:'absolute',left:'28%',top:33,width:'40%',height:'78%',background:'white',boxShadow:'0 2px 14px #00000012'}}/><Cursor x={x} y={y} scale={.7}/></>;
};
