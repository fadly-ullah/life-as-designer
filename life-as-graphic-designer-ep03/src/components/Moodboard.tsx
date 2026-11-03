import React from 'react';
import {useCurrentFrame} from 'remotion';
import {E as C} from '../data/episodeColors';
import {enter} from '../utils/animations';
export const Moodboard:React.FC<{delay?:number;style?:React.CSSProperties}>=({delay=0,style})=>{
 const f=useCurrentFrame();
 return <div style={{position:'absolute',left:90,top:895,width:900,height:365,...style}}>
  {[0,1,2].map((i)=>{const p=enter(f,delay+i*7);return <div key={i} style={{position:'absolute',left:i*288,top:i===1?0:22,width:277,height:320,padding:25,background:i===1?C.lime:C.charcoal,color:i===1?C.charcoal:C.white,border:`8px solid ${C.white}`,boxShadow:'0 15px 25px #0D0F0C18',opacity:p,transform:`translateY(${(1-p)*80}px) rotate(${(i-1)*5}deg)`}}>
   <div style={{fontSize:15,letterSpacing:3,marginBottom:22}}>VISUAL DIRECTION / 0{i+1}</div>
   {i===0?<><div style={{fontSize:52,fontWeight:700,lineHeight:.95}}>LESS.<br/>BUT<br/><span style={{color:C.lime}}>LOUD.</span></div><div style={{height:5,background:C.lime,width:90,marginTop:25}}/></>:i===1?<><div style={{fontSize:25,fontWeight:700}}>WEEKEND<br/>SPECIAL</div><div style={{fontSize:88,fontWeight:700,letterSpacing:-8}}>50<span style={{fontSize:35,letterSpacing:-1}}>%</span></div><div style={{fontSize:18,borderTop:`1px solid ${C.charcoal}`,paddingTop:8}}>OFF / FOR THE YOUNG</div></>:<><div style={{width:125,height:125,border:`20px solid ${C.lime}`,borderRadius:'50%',margin:'25px auto',boxShadow:`22px 12px 0 ${C.darkOlive}`}}/><div style={{fontSize:24,fontWeight:700}}>DARK + GREEN</div></>}
  </div>})}
 </div>;
};
