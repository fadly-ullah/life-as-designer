import React from 'react';
import {interpolate,useCurrentFrame} from 'remotion';
import {SceneLabel,Headline} from '../components/SceneCamera';
import {EditorialShot} from '../components/EditorialShot';
import {Sketch} from '../components/Sketch';
import {PixelComputer,DesignCanvas} from '../components/PixelComputer';
import {Episode02Character} from '../characters/Episode02Character';
import {beat,localBeat} from '../data/episode02Timings';
import {E} from '../data/episodeColors';
import {ramp,clamp} from '../utils/animations';
export const Scene07Direction:React.FC=()=>{
 const f=useCurrentFrame();const choose=localBeat(6,beat.choose);const p=ramp(f,choose,choose+25);const color=f>=localBeat(6,beat.color);
 return <EditorialShot mode="push">
  <SceneLabel number="07">PILIH ARAH / BUKAN SEMUANYA</SceneLabel>
  <Headline size={96}>{color?<>TINGGAL<br/><span style={{background:E.lime}}>PILIH WARNA.</span></>:<>ARAHNYA<br/>KETEMU.</>}</Headline>
  <div style={{opacity:p}}><PixelComputer style={{left:280,top:690,width:680,height:450}} label="Selected direction / Sketch 02"><DesignCanvas/></PixelComputer></div>
  {[0,1,2].map(i=>{const selected=i===1;return <div key={i} style={{position:'absolute',left:selected?395+p*115:90+i*305,top:selected?640+p*130:640,width:selected?285-p*65:285,height:selected?390-p*90:390,padding:10,background:selected&&p<.8?E.lime:E.white,border:`2px solid ${selected?E.darkOlive:E.line}`,borderRadius:15,opacity:selected?1:1-p,transform:`translateX(${!selected?(i?1:-1)*p*100:0}px)`,boxShadow:'0 12px 0 #0B0C0A08'}}><Sketch variant={i} selected={selected&&p<.8}/>{!selected&&f>=choose-8&&<svg viewBox="0 0 80 80" width="70" height="70" style={{position:'absolute',left:100,top:145}}><path d="M15 15L65 65M65 15L15 65" stroke={E.darkOlive} strokeWidth="7"/></svg>}{selected&&p<.8&&<div style={{position:'absolute',right:15,top:15,fontSize:20,fontWeight:700,background:E.charcoal,color:E.lime,padding:'7px 10px'}}>PILIH</div>}</div>})}
  <div style={{position:'absolute',left:100,top:1040}}><Episode02Character sceneIndex={6} width={270}/></div>
  {color&&<div style={{position:'absolute',left:600,top:1250,display:'flex',gap:12}}>{[E.darkOlive,E.lime,'#E9D742'].map(c=><div key={c} style={{width:80,height:65,background:c,border:`2px solid ${E.line}`}}/>)}</div>}
 </EditorialShot>;
};
