import React from 'react';
import {Composition} from 'remotion';
import {Episode01} from './compositions/Episode01';
import {WorkspaceCheck} from './compositions/WorkspaceCheck';
export const Root=()=> <>
  <Composition id="LifeAsDesignerS02EP01" component={Episode01} width={1080} height={1920} fps={30} durationInFrames={1356}/>
  <Composition id="WorkspaceEnvironmentCheck" component={WorkspaceCheck} width={1080} height={1920} fps={30} durationInFrames={180}/>
</>;
