import React from 'react';
import {Composition,Folder} from 'remotion';
import {Season02Foundation} from './baseline/Season02Foundation';
import {Season02PrototypeV2,Shot01Notification,Shot02Reaction,Shot03Analysis,Shot04Editing} from './compositions/Season02PrototypeV2';
import './style.css';
export const Root:React.FC=()=> <>
 <Composition id="Season02PrototypeV2" component={Season02PrototypeV2} width={1080} height={1920} fps={30} durationInFrames={450}/>
 <Composition id="Season02Foundation" component={Season02Foundation} width={1080} height={1920} fps={30} durationInFrames={450}/>
 <Folder name="Prototype-shots">
  <Composition id="S02-Shot-01" component={Shot01Notification} width={1080} height={1920} fps={30} durationInFrames={120}/>
  <Composition id="S02-Shot-02" component={Shot02Reaction} width={1080} height={1920} fps={30} durationInFrames={120}/>
  <Composition id="S02-Shot-03" component={Shot03Analysis} width={1080} height={1920} fps={30} durationInFrames={120}/>
  <Composition id="S02-Shot-04" component={Shot04Editing} width={1080} height={1920} fps={30} durationInFrames={90}/>
 </Folder>
</>;
