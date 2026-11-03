import React from 'react';
import {useCurrentFrame} from 'remotion';
import {SceneCamera,SceneLabel,Headline} from '../components/SceneCamera';
import {AnimatedChatBubble} from '../components/ChatBubble';
import {PixelCharacter} from '../characters/PixelCharacter';
import {PixelDesk} from '../components/PixelDesk';
import {PixelComputer,DesignCanvas} from '../components/PixelComputer';
import {C} from '../data/colors';
import {localBeat} from '../data/sceneTimings';
import {enter} from '../utils/animations';
export const Scene02ClientMessage:React.FC=()=>{
 const f=useCurrentFrame();
 const words=[['ELEGAN',13.53],['RAMAI',15.0],['MINIMALIS',16.17],['SEMUA INFORMASI',17.12]] as const;
 return <SceneCamera>
  <SceneLabel number="02">09:00 / PESAN MASUK</SceneLabel>
  <Headline>BRIEF-NYA<br/><span style={{background:C.lime,padding:'0 13px'}}>SATU POSTER.</span></Headline>
  <AnimatedChatBubble delay={15} style={{top:680,paddingBottom:28}}><div style={{fontSize:38,marginBottom:24}}>Bikin poster promosi, ya. Harus...</div><div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>{words.map(([w,t],i)=>{const p=enter(f,localBeat(1,t));return <div key={w} style={{fontSize:i===3?30:38,fontWeight:700,padding:'20px 22px',background:i===2?C.lime:C.paper,border:`1px solid ${C.line}`,opacity:p,transform:`translateY(${(1-p)*25}px)`,minHeight:85,display:'flex',alignItems:'center'}}>{w}</div>})}</div></AnimatedChatBubble>
  <div style={{position:'absolute',left:135,top:1050}}><PixelCharacter width={285} seated action={f>220?'confused':'reading'}/></div>
  <PixelComputer style={{left:450,top:1100,width:495,height:268}}><DesignCanvas/></PixelComputer>
  <PixelDesk style={{top:1350}}/>
 </SceneCamera>;
};
