import React from 'react';
import {useCurrentFrame} from 'remotion';
import {SceneCamera,SceneLabel,Headline} from '../components/SceneCamera';
import {PixelCharacter} from '../characters/PixelCharacter';
import {C} from '../data/colors';
import {enter,ramp} from '../utils/animations';
export const Scene03Confusion:React.FC=()=>{
 const f=useCurrentFrame();const collision=ramp(f,80,105);const revision=f>145;
 return <SceneCamera impactAt={96} push={.02}>
  <SceneLabel number="03">DIBACA ULANG × 3</SceneLabel>
  <Headline size={100}>{revision?<>REVISI BISA<br/><span style={{background:C.lime}}>PANJANG.</span></>:<>MINIMALIS<br/>ATAU RAMAI?</>}</Headline>
  {!revision&&<><div style={{position:'absolute',left:95+collision*160,top:652,width:300,textAlign:'center',padding:17,background:C.lime,fontSize:34,fontWeight:700,transform:`rotate(${-3+collision*3}deg)`}}>MINIMALIS</div><div style={{position:'absolute',left:680-collision*160,top:652,width:270,textAlign:'center',padding:17,background:C.charcoal,color:C.white,fontSize:34,fontWeight:700,transform:`rotate(${3-collision*3}deg)`}}>RAMAI</div></>}
  {[0,1,2].map((i)=>{const p=enter(f,i*17);return <div key={i} style={{position:'absolute',left:130+i*20,top:770+i*35,width:380,height:180,border:`2px solid ${C.line}`,borderRadius:20,background:i===2?C.white:C.paper,padding:24,opacity:p,transform:`rotate(${(i-1)*7}deg) translateX(${collision*-25}px)`,boxShadow:'0 15px 25px #0D0F0C0D'}}><div style={{fontSize:21,color:C.darkOlive,letterSpacing:2}}>BACA LAGI / 0{i+1}</div><div style={{fontSize:34,fontWeight:700,marginTop:15}}>“Simple, tapi wow.”</div><div style={{height:7,width:220,background:C.line,marginTop:17}}/></div>})}
  <div style={{position:'absolute',left:565-collision*35,top:780,fontSize:180,fontWeight:700,color:C.olive,transform:`rotate(${Math.sin(f/9)*7}deg)`,opacity:enter(f,40)}}>?</div>
  <div style={{position:'absolute',left:480,top:920,transform:`translateX(${Math.sin(f*1.3)*Math.max(0,1-Math.abs(f-98)/12)*8}px)`}}><PixelCharacter width={345} action={revision?'thinking':'confused'}/></div>
  <div style={{position:'absolute',left:110,top:1228,width:375,padding:25,background:C.charcoal,color:C.lime,fontSize:29,fontWeight:700,opacity:enter(f,145),transform:`rotate(-3deg)`}}>JANGAN LANGSUNG<br/>BUKA KANVAS.</div>
 </SceneCamera>;
};
