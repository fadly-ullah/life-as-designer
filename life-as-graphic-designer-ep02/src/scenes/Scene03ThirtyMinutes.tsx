import React from 'react';
import {interpolate,useCurrentFrame} from 'remotion';
import {SceneLabel,Headline} from '../components/SceneCamera';
import {EditorialShot} from '../components/EditorialShot';
import {Clock} from '../components/Clock';
import {ReferencePoster} from '../components/ReferencePoster';
import {Episode02Character} from '../characters/Episode02Character';
import {E} from '../data/episodeColors';
import {clamp} from '../utils/animations';
export const Scene03ThirtyMinutes:React.FC=()=>{
 const f=useCurrentFrame();const angle=interpolate(f,[0,8],[0,1800],clamp);
 return <EditorialShot mode="impact" impactAt={3}>
  <SceneLabel number="03">WAKTU JALAN. DESAIN BELUM.</SceneLabel>
  <Headline size={112}>30 MENIT?!</Headline>
  <Clock angle={angle} style={{position:'absolute',left:130,top:570,width:440,height:440}}/>
  <div style={{position:'absolute',left:145,top:1050,padding:'20px 35px',background:E.charcoal,color:E.lime,fontSize:88,fontWeight:700,letterSpacing:-5}}>00:30</div>
  <div style={{position:'absolute',left:610,top:920}}><Episode02Character sceneIndex={2} width={330}/></div>
  {[0,1].map((n)=><div key={n} style={{position:'absolute',left:110+n*245,top:1220-n*40,width:190,height:190,opacity:.18,transform:`rotate(${n?5:-5}deg)`}}><ReferencePoster variant={n} compact/></div>)}
 </EditorialShot>;
};
