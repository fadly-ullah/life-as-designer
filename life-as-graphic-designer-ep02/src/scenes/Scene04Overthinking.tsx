import React from 'react';
import {useCurrentFrame} from 'remotion';
import {SceneLabel,Headline} from '../components/SceneCamera';
import {EditorialShot} from '../components/EditorialShot';
import {ReferencePoster} from '../components/ReferencePoster';
import {Episode02Character} from '../characters/Episode02Character';
import {beat,localBeat} from '../data/episode02Timings';
import {E} from '../data/episodeColors';
import {enter} from '../utils/animations';
export const Scene04Overthinking:React.FC=()=>{
 const f=useCurrentFrame();const confused=f>=localBeat(3,beat.duh);
 const active=f>=localBeat(3,beat.earlier)?2:f>=localBeat(3,beat.font)?1:0;
 return <EditorialShot mode={confused?'push':'steady'}>
  <SceneLabel number="04">BANYAK PILIHAN / NOL KEPUTUSAN</SceneLabel>
  <Headline size={98}>{confused?<>MALAH MAKIN<br/><span style={{background:E.lime}}>BINGUNG.</span></>:<>MULAI DARI<br/>MANA?</>}</Headline>
  {['LAYOUT','FONT','YANG TADI'].map((t,i)=>{const p=enter(f,i*6);return <div key={t} style={{position:'absolute',left:90+i*305,top:680-(active===i&&!confused?18:0),width:285,height:345,padding:14,background:active===i?E.lime:E.white,border:`2px solid ${active===i?E.darkOlive:E.line}`,borderRadius:18,boxShadow:'0 15px 0 #0B0C0A09',opacity:p,transform:`translateY(${(1-p)*60}px) rotate(${confused?(i-1)*3:0}deg)`}}><div style={{fontSize:28,fontWeight:700,margin:'4px 8px 15px'}}>{t}</div><div style={{height:260}}><ReferencePoster variant={i===1?3:i}/></div></div>})}
  <div style={{position:'absolute',left:355,top:1030}}><Episode02Character sceneIndex={3} width={280}/></div>
 </EditorialShot>;
};
