import React from 'react';
import {E} from '../data/episodeColors';
export const ReferencePoster:React.FC<{variant:number;compact?:boolean}>=({variant,compact=false})=>{
 const v=variant%4;const dark=v===0||v===3;
 return <div style={{position:'relative',width:'100%',height:'100%',overflow:'hidden',padding:compact?16:24,background:dark?E.charcoal:v===1?E.lime:E.paper,color:dark?E.white:E.charcoal,fontFamily:'Space, sans-serif'}}>
  <div style={{fontSize:compact?13:17,letterSpacing:2,opacity:.8}}>STUDY / {String(variant+1).padStart(2,'0')}</div>
  {v===0?<><div style={{fontSize:compact?35:57,fontWeight:700,lineHeight:.9,marginTop:24,letterSpacing:-3}}>LESS.<br/><span style={{color:E.lime}}>BETTER.</span></div><div style={{position:'absolute',left:24,right:24,bottom:34,height:5,background:E.lime}}/></>:
   v===1?<><div style={{fontSize:compact?39:66,fontWeight:700,lineHeight:.9,marginTop:25,letterSpacing:-4}}>TYPE<br/>THAT<br/>TALKS.</div><div style={{marginTop:18,height:3,background:E.charcoal}}/></>:
   v===2?<><div style={{width:'65%',aspectRatio:'1',border:`${compact?10:18}px solid ${E.darkOlive}`,borderRadius:'50%',margin:'25px auto 10px',boxShadow:`13px 8px 0 ${E.lime}`}}/><div style={{fontSize:compact?20:33,fontWeight:700,letterSpacing:-1}}>FORM / FOCUS</div></>:
   <><div style={{fontSize:compact?45:74,fontWeight:700,lineHeight:.85,marginTop:25,color:E.lime,letterSpacing:-4}}>Aa</div><div style={{fontSize:compact?20:35,fontWeight:300,marginTop:20}}>BOLD<br/>BY DESIGN.</div></>}
 </div>;
};
