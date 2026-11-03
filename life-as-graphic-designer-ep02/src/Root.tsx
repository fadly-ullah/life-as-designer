import React from 'react';
import {Composition,Folder} from 'remotion';
import {Episode02,episodeScenes,sceneNames} from './compositions/Episode02';
import metadata from './data/audioMetadata.json';
import {sceneLengths} from './data/episode02Timings';
import './style.css';
export const Root:React.FC=()=> <><Composition id="LifeAsGraphicDesignerEP02" component={Episode02} defaultProps={{music:true}} width={1080} height={1920} fps={30} durationInFrames={metadata.durationInFrames}/><Folder name="Episode-02-scenes">{episodeScenes.map((component,i)=><Composition key={sceneNames[i]} id={`EP02-Scene-${String(i+1).padStart(2,'0')}`} component={component} width={1080} height={1920} fps={30} durationInFrames={sceneLengths[i]}/>)}</Folder></>;
