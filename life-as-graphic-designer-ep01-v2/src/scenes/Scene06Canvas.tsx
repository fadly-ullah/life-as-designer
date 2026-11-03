import React from 'react';
import {beats as B} from '../data/beats';
import {localBeat} from '../data/sceneTimings';
import {useCurrentFrame} from 'remotion';
import {SceneCamera,SceneLabel,Headline} from '../components/SceneCamera';
import {PixelComputer,DesignCanvas} from '../components/PixelComputer';
import {PixelDesk} from '../components/PixelDesk';
import {EpisodeCharacter as PixelCharacter} from '../characters/EpisodeCharacter';
import {C} from '../data/colors';
import {enter} from '../utils/animations';
export const Scene06Canvas:React.FC=()=>{
 const f=useCurrentFrame();const p=enter(f,4);const opened=f>=localBeat(5,B.openCanvas);
 return <SceneCamera push={.04}>
  <SceneLabel number="06">NEW FILE / NEW ENERGY</SceneLabel>
  <Headline>{opened?'KANVAS BARU.':'PRIORITAS DULU.'}<br/><span style={{background:C.lime}}>{opened?'SIAP MULAI.':'SKETSA KASAR.'}</span></Headline>
  <div style={{opacity:p,transform:`translateY(${(1-p)*95}px)`}}><PixelComputer style={{left:180,top:725,width:735,height:480}} label="Poster-promosi / Untitled—01"><DesignCanvas/></PixelComputer></div>
  <div style={{position:'absolute',left:100,top:1030}}><PixelCharacter sceneIndex={5} width={255} seated action="typing"/></div>
  <PixelDesk style={{top:1300}}/>
  <div style={{position:'absolute',left:590,top:1270,padding:'14px 20px',background:C.lime,fontSize:24,fontWeight:600}}>{opened?'1080 × 1350 PX':'PRIORITAS / SKETSA'}</div>
 </SceneCamera>;
};
