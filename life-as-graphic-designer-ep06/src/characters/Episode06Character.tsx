import React from 'react';
import {Sequence,Freeze,useCurrentFrame,useVideoConfig} from 'remotion';
import {PixelCharacter} from './PixelCharacter';
import type {CharacterAction} from './CharacterExpressions';
import tracks from '../data/performance.json';
import waveform from '../data/waveform.json';
import {sceneStarts,FPS,DURATION,beat} from '../data/episode06Timings';
type Props=React.ComponentProps<typeof PixelCharacter>&{sceneIndex:number};
export const Episode06Character:React.FC<Props>=({sceneIndex,...props})=>{
 const f=useCurrentFrame();const {fps}=useVideoConfig();
 const seconds=(sceneStarts[sceneIndex]+f)/fps;
 const cue=tracks[sceneIndex].find(c=>seconds>=c.start&&seconds<c.end);
 const voiced=(waveform[Math.max(0,Math.round(seconds*FPS))]??0)>.018;
 let action=(cue?.action??props.action??'idle') as CharacterAction;
 if(action==='talking'&&!voiced)action='idle';
 // The unchanged rig stays on the global clock for continuous breathing/blinks.
 const freeze=sceneIndex===0&&seconds>=4.55&&seconds<4.95;
 return <Sequence name="Original Fadly rig / continuous clock" from={-sceneStarts[sceneIndex]} durationInFrames={DURATION} layout="none"><Freeze active={freeze} frame={Math.round(4.55*fps)}><PixelCharacter {...props} action={action} speaking={Boolean(cue?.talk&&voiced)}/></Freeze></Sequence>;
};
