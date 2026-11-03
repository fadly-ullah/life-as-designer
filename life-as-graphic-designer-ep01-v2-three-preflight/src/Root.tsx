import React from 'react';
import {Composition} from 'remotion';
import {Preflight3D} from './three/Preflight3D';

// Engine validation only. The Episode 01 V2 storyboard is not registered until
// the user-specified docs/ production documents have been read.
export const Root:React.FC=()=> <Composition id="EnginePreflight3D" component={Preflight3D} width={1080} height={1920} fps={30} durationInFrames={360}/>;
