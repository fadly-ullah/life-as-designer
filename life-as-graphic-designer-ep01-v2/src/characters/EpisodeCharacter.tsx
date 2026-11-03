import React from 'react';
import {PixelCharacter} from './PixelCharacter';
import {CharacterPerformance,PerformanceCue} from './CharacterPerformance';
import performance from '../data/performance.json';
import waveform from '../data/waveform.json';
import {sceneStarts,FPS} from '../data/sceneTimings';

type Props=React.ComponentProps<typeof PixelCharacter>&{sceneIndex:number};
const tracks=performance as PerformanceCue[][];
// No wrapper DOM or new drawing. Exact original dimensions and all original
// props flow through to PixelCharacter. Only its existing poses are selected.
export const EpisodeCharacter:React.FC<Props>=({sceneIndex,...props})=> <CharacterPerformance {...props} cues={tracks[sceneIndex]} sequenceStartSeconds={sceneStarts[sceneIndex]/FPS} speechEnergy={waveform}/>;
