import React from 'react';
import {interpolate,useCurrentFrame} from 'remotion';
import {SceneLabel,Headline} from '../components/SceneCamera';
import {EditorialShot} from '../components/EditorialShot';
import {PromoPoster} from '../components/PromoPoster';
import {ShotCharacter} from '../components/ShotCharacter';
import {beat,localBeat} from '../data/episode03Timings';
import {E} from '../data/episodeColors';
import {clamp} from '../utils/animations';
export const Scene03HierarchyFailure:React.FC=()=>{
 const f=useCurrentFrame();const scroll=localBeat(2,beat.scroll);const travel=interpolate(f,[scroll,scroll+24],[0,-595],clamp);const scanning=f>=scroll;
 return <EditorialShot><SceneLabel number="03">WARNA RAMAI / PESAN TENGGELAM</SceneLabel><Headline size={92}>{scanning?<>KELEWAT.<br/><span style={{color:E.darkOlive}}>TANPA TERBACA.</span></>:<>LIHAT YANG<br/><span style={{background:E.lime}}>MANA DULU?</span></>}</Headline><div style={{position:'absolute',left:380,top:640,width:550,height:650,padding:18,background:E.white,border:`2px solid ${E.line}`,borderRadius:18,overflow:'hidden'}}><div style={{fontSize:19,fontWeight:700,padding:'5px 0 16px'}}>FEED / SEKILAS AJA</div><div style={{position:'absolute',left:18,right:18,top:65,transform:`translateY(${travel}px)`}}><div style={{height:570}}><PromoPoster/></div><div style={{height:570,marginTop:18,background:E.paper,padding:32,fontSize:38,fontWeight:700,lineHeight:1.2}}>KONTEN<br/>BERIKUTNYA.<div style={{height:8,width:145,background:E.lime,marginTop:25}}/></div></div></div><ShotCharacter scene={2} y={1015}/>{!scanning&&<div style={{position:'absolute',left:90,top:700,width:260,color:E.darkOlive,fontSize:27,lineHeight:1.4}}>{f>=localBeat(2,beat.discountLost)?<>Diskon 50%<br/>ikut tenggelam.</>:<>Judulnya<br/>tenggelam.</>}</div>}</EditorialShot>;
};
