import React from 'react';
import {Composition,Folder} from 'remotion';
import {Episode03,episodeScenes,sceneNames} from './compositions/Episode03';
import metadata from './data/audioMetadata.json';
import {sceneLengths} from './data/episode03Timings';
import './style.css';
import './poster-font.css';
export const Root:React.FC=()=> <><Composition id="LifeAsGraphicDesignerEP03" component={Episode03} defaultProps={{music:true}} width={1080} height={1920} fps={30} durationInFrames={metadata.durationInFrames}/><Folder name="Episode-03-scenes">{episodeScenes.map((component,i)=><Composition key={sceneNames[i]} id={`EP03-Scene-${String(i+1).padStart(2,'0')}`} component={component} width={1080} height={1920} fps={30} durationInFrames={sceneLengths[i]}/>)}</Folder></>;
