import React from 'react';
import {useCurrentFrame,useVideoConfig} from 'remotion';
import {PixelCharacter} from './PixelCharacter';
import type {CharacterAction} from './CharacterExpressions';

export type PerformanceCue={startSeconds:number;endSeconds:number;action:CharacterAction;talk?:boolean};
type Props=React.ComponentProps<typeof PixelCharacter>&{cues:readonly PerformanceCue[];sequenceStartSeconds?:number;speechEnergy?:readonly number[]};

// No geometry, styling, proportions, position or dimensions are changed here.
// Authored cues select poses from the ORIGINAL character rig. Supply the
// latest voice's reviewed timing when that file becomes available.
export const CharacterPerformance:React.FC<Props>=({cues,sequenceStartSeconds=0,speechEnergy,action='idle',speaking=false,...originalProps})=>{
 const frame=useCurrentFrame();const {fps}=useVideoConfig();
 const seconds=sequenceStartSeconds+frame/fps;
 const cue=cues.find(c=>seconds>=c.startSeconds&&seconds<c.endSeconds);
 const wantsToTalk=cue?.talk??speaking;
 const energy=speechEnergy?.[Math.max(0,Math.round(seconds*fps))];
 const voiced=energy===undefined||energy>.018;
 const pose=cue?.action??action;
 // The original talking pose opens its mouth on its own; use the original
 // idle pose during pauses instead of changing the original face artwork.
 return <PixelCharacter {...originalProps} action={pose==='talking'&&!voiced?'idle':pose} speaking={wantsToTalk&&voiced}/>;
};
