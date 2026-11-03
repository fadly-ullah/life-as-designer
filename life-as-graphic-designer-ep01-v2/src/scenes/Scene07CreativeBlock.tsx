import React from 'react';
import {beats as B} from '../data/beats';
import {interpolate,useCurrentFrame} from 'remotion';
import {SceneCamera,SceneLabel,Headline} from '../components/SceneCamera';
import {PixelComputer,DesignCanvas} from '../components/PixelComputer';
import {EpisodeCharacter as PixelCharacter} from '../characters/EpisodeCharacter';
import {C} from '../data/colors';
import {clamp,enter} from '../utils/animations';
import {localBeat} from '../data/sceneTimings';
export const Scene07CreativeBlock:React.FC=()=>{
 const f=useCurrentFrame();const ten=true;const blocked=f>=localBeat(6,B.zero);
 const angle=interpolate(f,[0,localBeat(6,B.elapsed)+10,localBeat(6,B.emptyCanvas)-7],[0,150,300],clamp);
 return <SceneCamera push={.05}>
  <SceneLabel number="07">CREATIVE BLOCK HAS ENTERED</SceneLabel>
  <Headline>{blocked?<>KURSOR JALAN.<br/><span style={{color:C.darkOlive}}>IDE-NYA ENGGA.</span></>:<>SUDAH<br/>{ten?'10':'5'} MENIT...</>}</Headline>
  <div style={{position:'absolute',left:90,top:690,width:210,height:210,border:`5px solid ${C.charcoal}`,borderRadius:'50%',background:C.white}}><svg width="200" height="200" viewBox="0 0 200 200">{Array.from({length:12},(_,i)=><rect key={i} x="97" y="12" width="6" height="14" fill={C.beige} transform={`rotate(${i*30} 100 100)`}/>)}<path d="M100 100V45" stroke={C.charcoal} strokeWidth="8" transform={`rotate(${angle} 100 100)`}/><path d="M100 100H139" stroke={C.olive} strokeWidth="8" transform={`rotate(${angle/12} 100 100)`}/><circle cx="100" cy="100" r="8" fill={C.charcoal}/></svg></div>
  <div style={{position:'absolute',left:367,top:705,background:C.charcoal,color:C.lime,padding:'27px 40px',fontSize:76,fontWeight:700,letterSpacing:-4,transform:`rotate(-2deg) scale(${.95+.05*enter(f,14)})`}}>{blocked?'IDE: 0%':'IDE: ...'}</div>
  <PixelComputer style={{left:420,top:970,width:540,height:343}}><DesignCanvas busy/></PixelComputer>
  <div style={{position:'absolute',left:110,top:925,transform:`rotate(${blocked?-8:0}deg)`}}><PixelCharacter sceneIndex={6} width={310} seated action={blocked?'frustrated':'thinking'}/></div>
  <div style={{position:'absolute',left:480,top:1350,width:430,height:9,background:C.line}}><div style={{width:7,height:9,background:C.olive}}/></div>
 </SceneCamera>;
};
