import React from 'react';
import {useCurrentFrame} from 'remotion';
import {SceneLabel,Headline} from '../components/SceneCamera';
import {EditorialShot} from '../components/EditorialShot';
import {PixelComputer,DesignCanvas} from '../components/PixelComputer';
import {PixelDesk} from '../components/PixelDesk';
import {ReferencePoster} from '../components/ReferencePoster';
import {Episode02Character} from '../characters/Episode02Character';
import {beat,localBeat} from '../data/episode02Timings';
import {E} from '../data/episodeColors';
import {enter} from '../utils/animations';
export const Scene01EmptyCanvas:React.FC=()=>{
 const f=useCurrentFrame();const warehouse=f>=localBeat(0,beat.warehouse);
 const cards=[[100,695,195],[760,630,190],[700,1120,200],[135,740,205]];
 return <EditorialShot mode="push">
  <SceneLabel number="01">BRIEF JELAS / KANVAS MASIH KOSONG</SceneLabel>
  <Headline size={96}>{warehouse?<>REFERENSI<br/>MULAI NUMPUK.</>:<>BRIEF JELAS.<br/><span style={{color:E.darkOlive}}>KANVAS KOSONG.</span></>}</Headline>
  <PixelComputer style={{left:350,top:770,width:620,height:440}} label="Untitled / Blank canvas"><DesignCanvas/></PixelComputer>
  {cards.map(([x,y,w],i)=>{const p=enter(f,localBeat(0,beat.warehouse)+i*7);return <div key={i} style={{position:'absolute',left:x,top:y,width:w,height:w*1.17,border:`6px solid ${E.white}`,boxShadow:'0 12px 26px #0B0C0A18',opacity:p,transform:`translateY(${(1-p)*60}px) rotate(${(i%2?1:-1)*5}deg)`}}><ReferencePoster variant={i} compact/></div>})}
  <div style={{position:'absolute',left:100,top:1010}}><Episode02Character sceneIndex={0} width={300} seated/></div>
  <PixelDesk style={{top:1255}}/>
 </EditorialShot>;
};
