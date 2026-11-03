import React from 'react';
import {useCurrentFrame} from 'remotion';
import {SceneLabel,Headline} from '../components/SceneCamera';
import {EditorialShot} from '../components/EditorialShot';
import {FloatingCard} from '../components/FloatingCard';
import {ReferencePoster} from '../components/ReferencePoster';
import {Sketch} from '../components/Sketch';
import {Episode02Character} from '../characters/Episode02Character';
import {beat,localBeat} from '../data/episode02Timings';
import {E} from '../data/episodeColors';
import {ramp,enter} from '../utils/animations';
export const Scene06Keywords:React.FC=()=>{
 const f=useCurrentFrame();const sketch=ramp(f,localBeat(5,beat.sketch),localBeat(5,beat.sketch)+12);
 return <EditorialShot>
  <SceneLabel number="06">PILIH BERDASARKAN BRIEF</SceneLabel>
  <Headline>TIGA KATA<br/><span style={{color:E.darkOlive}}>KUNCI.</span></Headline>
  {[['MUDA',beat.young],['TEGAS',beat.bold],['HEMAT',beat.value]].map(([t,s],i)=><FloatingCard key={t} x={90+i*305} y={640} width={285} delay={localBeat(5,Number(s))-3} accent style={{height:120,padding:'31px 20px',textAlign:'center',fontSize:44,fontWeight:700}}>{t}</FloatingCard>)}
  {[0,1,2].map(i=>{const p=enter(f,localBeat(5,beat.selectRefs)+i*5);return <div key={i} style={{position:'absolute',left:90+i*305,top:805,width:285,height:280,padding:10,border:`2px solid ${E.line}`,borderRadius:15,background:E.white,boxShadow:'0 12px 0 #0B0C0A08',opacity:p,transform:`translateY(${(1-p)*45}px)`}}><div style={{position:'absolute',inset:10,opacity:1-sketch}}><ReferencePoster variant={i}/></div><div style={{position:'absolute',inset:10,opacity:sketch}}><Sketch variant={i} progress={ramp(f,localBeat(5,beat.sketch)+i*3,localBeat(5,beat.sketch)+35+i*3)}/></div><div style={{position:'absolute',left:16,top:15,fontSize:20,fontWeight:700,background:E.white,padding:'4px 8px'}}>{i+1}</div></div>})}
  <div style={{position:'absolute',left:170,top:1100}}><Episode02Character sceneIndex={5} width={230} seated/></div>
  <div style={{position:'absolute',left:470,top:1245,fontSize:29,color:E.darkOlive,fontWeight:600}}>{sketch>.5?'3 SKETSA KASAR':'3 REFERENSI TERPILIH'}<div style={{height:5,width:280,background:E.lime,marginTop:18}}/></div>
 </EditorialShot>;
};
