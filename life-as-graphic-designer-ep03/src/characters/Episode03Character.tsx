import React from 'react';
import {Sequence,useCurrentFrame,useVideoConfig} from 'remotion';
import {PixelCharacter} from './PixelCharacter';
import type {CharacterAction} from './CharacterExpressions';
import tracks from '../data/performance.json';
import waveform from '../data/waveform.json';
import {sceneStarts,FPS,DURATION} from '../data/episode03Timings';
type Props=React.ComponentProps<typeof PixelCharacter>&{sceneIndex:number};
export const Episode03Character:React.FC<Props>=({sceneIndex,...props})=>{
 const f=useCurrentFrame();const {fps}=useVideoConfig();
 const seconds=(sceneStarts[sceneIndex]+f)/fps;
 const cue=tracks[sceneIndex].find(c=>seconds>=c.start&&seconds<c.end);
 const voiced=(waveform[Math.max(0,Math.round(seconds*FPS))]??0)>.018;
 let action=(cue?.action??props.action??'idle') as CharacterAction;
 if(action==='talking'&&!voiced)action='idle';
 // Keep the unchanged rig on the global clock: blinks/breathing do not restart at cuts.
 return <Sequence name="Original Fadly rig / continuous clock" from={-sceneStarts[sceneIndex]} durationInFrames={DURATION} layout="none"><PixelCharacter {...props} action={action} speaking={Boolean(cue?.talk&&voiced)}/></Sequence>;
};
