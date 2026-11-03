import React from 'react';
import {useCurrentFrame} from 'remotion';
import {SceneCamera,SceneLabel,Headline} from '../components/SceneCamera';
import {PixelComputer,DesignCanvas} from '../components/PixelComputer';
import {PixelDesk} from '../components/PixelDesk';
import {PixelCharacter} from '../characters/PixelCharacter';
import {C} from '../data/colors';
import {enter} from '../utils/animations';
export const Scene06Canvas:React.FC=()=>{
 const f=useCurrentFrame();const p=enter(f,4);
 return <SceneCamera push={.04}>
  <SceneLabel number="06">NEW FILE / NEW ENERGY</SceneLabel>
  <Headline>KANVAS BARU.<br/><span style={{background:C.lime}}>SIAP MULAI.</span></Headline>
  <div style={{opacity:p,transform:`translateY(${(1-p)*95}px)`}}><PixelComputer style={{left:180,top:725,width:735,height:480}} label="Poster-promosi / Untitled—01"><DesignCanvas/></PixelComputer></div>
  <div style={{position:'absolute',left:100,top:1030}}><PixelCharacter width={255} seated action="typing"/></div>
  <PixelDesk style={{top:1300}}/>
  <div style={{position:'absolute',left:590,top:1270,padding:'14px 20px',background:C.lime,fontSize:24,fontWeight:600}}>1080 × 1350 PX</div>
 </SceneCamera>;
};
