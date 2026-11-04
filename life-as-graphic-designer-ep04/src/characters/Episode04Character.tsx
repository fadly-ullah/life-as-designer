import React from 'react';
import {Sequence,Freeze,useCurrentFrame,useVideoConfig,interpolate} from 'remotion';
import {PixelCharacter} from './PixelCharacter';
import type {CharacterAction} from './CharacterExpressions';
import tracks from '../data/performance.json';
import waveform from '../data/waveform.json';
import {sceneStarts,FPS,DURATION,beat} from '../data/episode04Timings';
import {clamp} from '../utils/animations';
type Props=React.ComponentProps<typeof PixelCharacter>&{sceneIndex:number};
export const Episode04Character:React.FC<Props>=({sceneIndex,...props})=>{
 const f=useCurrentFrame();const {fps}=useVideoConfig();
 const seconds=(sceneStarts[sceneIndex]+f)/fps;
 const cue=tracks[sceneIndex].find(c=>seconds>=c.start&&seconds<c.end);
 const voiced=(waveform[Math.max(0,Math.round(seconds*FPS))]??0)>.018;
 let action=(cue?.action??props.action??'idle') as CharacterAction;
 if(action==='talking'&&!voiced)action='idle';
 // Continuous rig clock preserves natural breathing and blinking across cuts.
 const globalFrame=sceneStarts[sceneIndex]+f;
 const early=sceneIndex===0?interpolate(seconds,[0,1.2,3.4,4.9],[.4,1,.6,0],clamp):0;
 const sigh=sceneIndex===3?interpolate(seconds,[beat.resetSigh,beat.resetSigh+.22,beat.focus],[0,1,0],clamp):0;
 const fatigue=Math.max(early,sigh);
 const freeze=sceneIndex===5&&seconds>=beat.feedback&&seconds<beat.feedback+8/fps;
 return <div style={{rotate:`${fatigue*1.5}deg`,translate:`0 ${fatigue*4}px`,transformOrigin:'50% 78%'}}><Sequence name="Original Fadly rig / continuous clock" from={-sceneStarts[sceneIndex]} durationInFrames={DURATION} layout="none"><Freeze active={freeze} frame={Math.round(beat.feedback*fps)}><PixelCharacter {...props} action={action} speaking={Boolean(cue?.talk&&voiced)}/></Freeze></Sequence></div>;
};
