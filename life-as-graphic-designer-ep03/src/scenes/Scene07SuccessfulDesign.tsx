import React from 'react';
import {useCurrentFrame} from 'remotion';
import {SceneLabel,Headline} from '../components/SceneCamera';
import {EditorialShot} from '../components/EditorialShot';
import {PromoPoster} from '../components/PromoPoster';
import {ShotCharacter} from '../components/ShotCharacter';
import {beat,localBeat} from '../data/episode03Timings';
import {E} from '../data/episodeColors';
export const Scene07SuccessfulDesign:React.FC=()=>{
 const f=useCurrentFrame();const title=f>=localBeat(6,beat.titleRead);
 return <EditorialShot mode="push"><SceneLabel number="07">PESAN UTAMA / AKHIRNYA TERBACA</SceneLabel><Headline size={94}>{title?<>JUDUL KEBACA.<br/><span style={{color:E.darkOlive}}>DESAIN LEBIH RAPI.</span></>:<>DISKONNYA<br/><span style={{background:E.lime}}>KELIHATAN DULUAN.</span></>}</Headline>
  <div style={{position:'absolute',left:90,top:640,width:280}}><div style={{fontSize:22,fontWeight:700,letterSpacing:2,marginBottom:14,color:E.darkOlive}}>SEBELUM</div><div style={{height:385,padding:8,background:E.white,border:`1px solid ${E.line}`,borderRadius:10}}><PromoPoster/></div></div>
  <div style={{position:'absolute',left:465,top:640,width:500}}><div style={{display:'flex',justifyContent:'space-between',fontSize:22,fontWeight:700,letterSpacing:2,marginBottom:14,color:E.darkOlive}}>SESUDAH <span style={{background:E.lime,padding:'1px 8px',color:E.charcoal}}>✓</span></div><div style={{height:655,padding:10,background:E.white,border:`2px solid ${E.line}`,borderRadius:12,boxShadow:'0 16px 0 #0B0C0A08'}}><PromoPoster base={1} text={1} offer={1} olive={1} cleanup={1}/></div></div>
  <ShotCharacter scene={6} x={110} y={1040} width={260}/>
 </EditorialShot>;
};
