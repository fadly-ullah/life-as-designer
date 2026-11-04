import React from 'react';
import {Composition,Folder} from 'remotion';
import {Episode06} from './compositions/Episode06';
import {Scene01Freeze} from './scenes/Scene01Freeze';
import {Scene02UnsavedChanges} from './scenes/Scene02UnsavedChanges';
import {Scene03AutoRecovery} from './scenes/Scene03AutoRecovery';
import {Scene04FinalSprint} from './scenes/Scene04FinalSprint';
import {Scene05FileSent} from './scenes/Scene05FileSent';
import {Scene06NextMorning} from './scenes/Scene06NextMorning';
import metadata from './data/audioMetadata.json';
import {sceneLengths} from './data/episode06Timings';
import './style.css';
import './poster-font.css';
export const Root:React.FC=()=> <>
 <Composition id="LifeAsGraphicDesignerEP06" component={Episode06} defaultProps={{music:true}} width={1080} height={1920} fps={30} durationInFrames={metadata.durationInFrames}/>
 <Folder name="Episode-06-scenes">
  <Composition id="EP06-Scene-01" component={Scene01Freeze} width={1080} height={1920} fps={30} durationInFrames={sceneLengths[0]}/>
  <Composition id="EP06-Scene-02" component={Scene02UnsavedChanges} width={1080} height={1920} fps={30} durationInFrames={sceneLengths[1]}/>
  <Composition id="EP06-Scene-03" component={Scene03AutoRecovery} width={1080} height={1920} fps={30} durationInFrames={sceneLengths[2]}/>
  <Composition id="EP06-Scene-04" component={Scene04FinalSprint} width={1080} height={1920} fps={30} durationInFrames={sceneLengths[3]}/>
  <Composition id="EP06-Scene-05" component={Scene05FileSent} width={1080} height={1920} fps={30} durationInFrames={sceneLengths[4]}/>
  <Composition id="EP06-Scene-06" component={Scene06NextMorning} width={1080} height={1920} fps={30} durationInFrames={sceneLengths[5]}/>
 </Folder>
</>;
