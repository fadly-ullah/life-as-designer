import React from 'react';
import {useCurrentFrame,interpolate} from 'remotion';
import {PixelCharacter} from '../characters/PixelCharacter';
import {RevisionPoster} from './RevisionPoster';
import {E} from '../data/episodeColors';
import {beat,localBeat} from '../data/episode05Timings';
import {clamp} from '../utils/animations';
export const AlmostKick:React.FC=()=>{
 const f=useCurrentFrame()-localBeat(0,beat.kick);const p=interpolate(f,[0,6,14,23,31,38],[0,0,.8,1,.3,0],clamp);
 return <><div style={{position:'absolute',left:90,top:640,width:900,height:770,border:`2px dashed ${E.darkOlive}`,borderRadius:24,background:E.paper}}><div style={{position:'absolute',left:28,top:25,fontSize:25,fontWeight:700,letterSpacing:2,color:E.darkOlive}}>IMAJINASI / NGGAK JADI</div></div><div className="almost-kick" style={{position:'absolute',left:165,top:920,'--kick-angle':`${-48*p}deg`} as React.CSSProperties}><PixelCharacter width={350} action="frustrated"/></div><div style={{position:'absolute',left:540+p*12,top:895,width:330,height:440,padding:8,background:E.white,border:`2px solid ${E.line}`,borderRadius:10,rotate:`${p*3}deg`,transformOrigin:'50% 100%'}}><RevisionPoster/></div></>;
};
