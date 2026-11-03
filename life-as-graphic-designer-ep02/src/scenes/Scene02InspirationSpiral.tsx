import React from 'react';
import {interpolate,useCurrentFrame} from 'remotion';
import {SceneLabel,Headline} from '../components/SceneCamera';
import {EditorialShot} from '../components/EditorialShot';
import {InspirationBrowser} from '../components/InspirationBrowser';
import {Episode02Character} from '../characters/Episode02Character';
import {beat,localBeat} from '../data/episode02Timings';
import {E} from '../data/episodeColors';
import {clamp,ease} from '../utils/animations';
export const Scene02InspirationSpiral:React.FC=()=>{
 const f=useCurrentFrame();
 const scroll=interpolate(f,[0,localBeat(1,beat.scrollOne),localBeat(1,beat.better),localBeat(1,beat.save),localBeat(1,beat.scrollTwo),localBeat(1,beat.scrollTwo)+24],[0,100,240,400,530,740],{...clamp,easing:ease});
 const saved=f>=localBeat(1,beat.scrollTwo)?12:f>=localBeat(1,beat.save)?6:f>=localBeat(1,beat.better)?3:1;
 return <EditorialShot mode="reframe">
  <SceneLabel number="02">SATU INSPIRASI... KATANYA</SceneLabel>
  <Headline size={91}>CUMA SATU<br/><span style={{background:E.lime}}>INSPIRASI...</span></Headline>
  <InspirationBrowser scroll={scroll} saved={saved} style={{top:630,height:630}}/>
  <div style={{position:'absolute',left:120,top:1100}}><Episode02Character sceneIndex={1} width={240} seated/></div>
  <div style={{position:'absolute',left:440,top:1315,fontSize:29,fontWeight:600,color:E.darkOlive}}>SIMPAN LAGI. SCROLL LAGI.</div>
 </EditorialShot>;
};
