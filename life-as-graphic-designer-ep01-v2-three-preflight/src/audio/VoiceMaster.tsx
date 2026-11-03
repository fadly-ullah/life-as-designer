import React from 'react';
import {Audio} from '@remotion/media';
import {staticFile} from 'remotion';
// Original file, no speed changes, pitch effects or trims.
export const VoiceMaster:React.FC=()=> <Audio src={staticFile('audio/episode01-vo.mp3')} volume={.79}/>;
