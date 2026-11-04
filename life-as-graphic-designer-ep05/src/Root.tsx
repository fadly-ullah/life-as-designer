import React from 'react';
import {Composition,Folder} from 'remotion';
import {Episode05,episodeScenes,sceneNames} from './compositions/Episode05';
import metadata from './data/audioMetadata.json';
import {sceneLengths} from './data/episode05Timings';
import './style.css';
import './poster-font.css';
import './imagination.css';
export const Root:React.FC=()=> <><Composition id="LifeAsGraphicDesignerEP05" component={Episode05} defaultProps={{music:true}} width={1080} height={1920} fps={30} durationInFrames={metadata.durationInFrames}/><Folder name="Episode-05-scenes">{episodeScenes.map((component,i)=><Composition key={sceneNames[i]} id={`EP05-Scene-${String(i+1).padStart(2,'0')}`} component={component} width={1080} height={1920} fps={30} durationInFrames={sceneLengths[i]}/>)}</Folder></>;
