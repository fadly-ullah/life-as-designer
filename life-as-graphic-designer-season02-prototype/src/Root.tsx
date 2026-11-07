import React from 'react';
import {Composition} from 'remotion';
import {Season02Foundation} from './baseline/Season02Foundation';
import './style.css';
export const Root:React.FC=()=> <Composition id="Season02Foundation" component={Season02Foundation} width={1080} height={1920} fps={30} durationInFrames={450}/>;
