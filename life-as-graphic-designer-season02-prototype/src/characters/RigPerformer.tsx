import React from 'react';
import {Freeze} from 'remotion';
import {PixelCharacter} from './PixelCharacter';
import {expressionFor,type CharacterAction} from './CharacterExpressions';
import {C} from '../data/colors';
import {beat} from '../data/prototypeTimings';
import {phase,rigClock} from '../utils/motion';
import '../performance.css';
export const performerAt=(f:number)=>{
 const body:CharacterAction=f<beat.phoneRelease?'reading':'typing';
 const face:CharacterAction=f<28?'idle':f<62?'reading':f<120?'confused':f<151?'surprised':f<326?'thinking':f<360?'confused':f<410?'typing':'happy';
 const monitor=phase(f,178,232),keyboard=f>=360&&f<400?1-phase(f,386,410):0;
 const desiredTilt=2*phase(f,20,50)-7*phase(f,62,80)+6*phase(f,120,141)-phase(f,151,177)-3*phase(f,198,232)-2*phase(f,326,345)+5*phase(f,360,385);
 // Counter the original action's fixed tilt so an expression switch does not snap the neck.
 return {body,face,eyeX:.2+monitor*.85,eyeY:1.05-monitor*1.45+keyboard*.8,head:desiredTilt-expressionFor(face).tilt,desiredTilt};
};
/** Two masks of the exact original rig allow an expressive head with a stable prop-holding body. */
export const RigPerformer:React.FC<{frame:number}>=({frame})=>{
 const p=performerAt(frame);const clock=rigClock(frame);const release=rigClock(beat.phoneRelease);
 const breathAtRelease=Math.sin(release/15)*1.1;const oldAngle=-7+Math.sin(release/20)*2;const settle=phase(frame,beat.phoneRelease,beat.phoneRelease+16);
 const style={'--eye-x':`${p.eyeX}px`,'--eye-y':`${p.eyeY}px`,'--head-turn':`${p.head}deg`} as React.CSSProperties;
 return <div className="performance-rig" data-rig-body={p.body} data-rig-face={p.face} style={{position:'absolute',left:145,top:770,width:410,height:574,...style}}>
  <Freeze frame={clock}><div className="rig-body"><PixelCharacter width={410} seated action={p.body}/></div><div className="rig-head"><PixelCharacter width={410} seated action={p.face}/></div></Freeze>
  {frame>=beat.phoneRelease&&<svg data-placed-phone viewBox="0 0 160 224" width="410" height="574" style={{position:'absolute',inset:0,imageRendering:'pixelated'}} aria-label="Ponsel asli sudah diletakkan di penyangga meja"><g shapeRendering="crispEdges" transform={`translate(0 ${breathAtRelease})`}><g transform={`rotate(${oldAngle*(1-settle)} 96 116)`}><rect x="86" y="106" width="18" height="29" fill={C.charcoal}/><rect x="89" y="110" width="12" height="19" fill={C.lime}/><rect x="93" y="132" width="4" height="2" fill={C.beige}/><rect x="91" y="114" width="8" height="2" fill={C.darkOlive}/><rect x="91" y="119" width="6" height="2" fill={C.darkOlive}/></g></g></svg>}
 </div>;
};
