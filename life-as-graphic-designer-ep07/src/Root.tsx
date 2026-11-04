import React from 'react';
import {Composition,Folder} from 'remotion';
import {Episode07} from './compositions/Episode07';
import {Scene01ClientApproval} from './scenes/Scene01ClientApproval';
import {Scene02Flashback} from './scenes/Scene02Flashback';
import {Scene03LessonsLearned} from './scenes/Scene03LessonsLearned';
import {Scene04DesignDecisions} from './scenes/Scene04DesignDecisions';
import {Scene05SeasonComplete} from './scenes/Scene05SeasonComplete';
import {Scene06SeasonTwo} from './scenes/Scene06SeasonTwo';
import metadata from './data/audioMetadata.json';
import {sceneLengths} from './data/episode07Timings';
import './style.css';
import './poster-font.css';
export const Root:React.FC=()=> <>
 <Composition id="LifeAsGraphicDesignerEP07" component={Episode07} defaultProps={{music:true}} width={1080} height={1920} fps={30} durationInFrames={metadata.durationInFrames}/>
 <Folder name="Episode-07-scenes">
  <Composition id="EP07-Scene-01" component={Scene01ClientApproval} width={1080} height={1920} fps={30} durationInFrames={sceneLengths[0]}/>
  <Composition id="EP07-Scene-02" component={Scene02Flashback} width={1080} height={1920} fps={30} durationInFrames={sceneLengths[1]}/>
  <Composition id="EP07-Scene-03" component={Scene03LessonsLearned} width={1080} height={1920} fps={30} durationInFrames={sceneLengths[2]}/>
  <Composition id="EP07-Scene-04" component={Scene04DesignDecisions} width={1080} height={1920} fps={30} durationInFrames={sceneLengths[3]}/>
  <Composition id="EP07-Scene-05" component={Scene05SeasonComplete} width={1080} height={1920} fps={30} durationInFrames={sceneLengths[4]}/>
  <Composition id="EP07-Scene-06" component={Scene06SeasonTwo} width={1080} height={1920} fps={30} durationInFrames={sceneLengths[5]}/>
 </Folder>
</>;
