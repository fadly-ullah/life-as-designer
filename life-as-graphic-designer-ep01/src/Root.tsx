import React from 'react';
import {Composition,Folder} from 'remotion';
import {Episode01} from './compositions/Episode01';
import {DURATION,sceneLengths as L} from './data/sceneTimings';
import {Scene01Hook} from './scenes/Scene01Hook';
import {Scene02ClientMessage} from './scenes/Scene02ClientMessage';
import {Scene03Confusion} from './scenes/Scene03Confusion';
import {Scene04Questions} from './scenes/Scene04Questions';
import {Scene05Answer} from './scenes/Scene05Answer';
import {Scene06Canvas} from './scenes/Scene06Canvas';
import {Scene07CreativeBlock} from './scenes/Scene07CreativeBlock';
import {Scene08Teaser} from './scenes/Scene08Teaser';
import {AbsoluteFill} from 'remotion';
import {C} from './data/colors';
import './style.css';
// Standalone timelines retain the exact scene component reference.
const scene=(Component:React.FC)=>{const Wrapped:React.FC=()=> <AbsoluteFill style={{background:C.white,fontFamily:'Space, sans-serif',overflow:'hidden'}}><Component/></AbsoluteFill>;return Wrapped;};
const Hook=scene(Scene01Hook),Client=scene(Scene02ClientMessage),Confusion=scene(Scene03Confusion),Questions=scene(Scene04Questions),Answer=scene(Scene05Answer),Canvas=scene(Scene06Canvas),Block=scene(Scene07CreativeBlock),Teaser=scene(Scene08Teaser);
export const Root:React.FC=()=> <>
 <Composition id="LifeAsGraphicDesignerEP01" component={Episode01} width={1080} height={1920} fps={30} durationInFrames={DURATION} defaultProps={{music:true}} calculateMetadata={()=>({durationInFrames:DURATION,defaultOutName:'LifeAsGraphicDesigner_EP01',defaultCodec:'h264'})}/>
 <Folder name="Scenes">
  <Composition id="Scene01-Hook" component={Hook} width={1080} height={1920} fps={30} durationInFrames={L[0]}/>
  <Composition id="Scene02-ClientMessage" component={Client} width={1080} height={1920} fps={30} durationInFrames={L[1]}/>
  <Composition id="Scene03-Confusion" component={Confusion} width={1080} height={1920} fps={30} durationInFrames={L[2]}/>
  <Composition id="Scene04-Questions" component={Questions} width={1080} height={1920} fps={30} durationInFrames={L[3]}/>
  <Composition id="Scene05-Answer" component={Answer} width={1080} height={1920} fps={30} durationInFrames={L[4]}/>
  <Composition id="Scene06-Canvas" component={Canvas} width={1080} height={1920} fps={30} durationInFrames={L[5]}/>
  <Composition id="Scene07-CreativeBlock" component={Block} width={1080} height={1920} fps={30} durationInFrames={L[6]}/>
  <Composition id="Scene08-Teaser" component={Teaser} width={1080} height={1920} fps={30} durationInFrames={L[7]}/>
 </Folder>
</>;
