import React from 'react';
import {useCurrentFrame} from 'remotion';
import {SceneLabel,Headline} from '../components/SceneCamera';
import {EditorialShot} from '../components/EditorialShot';
import {PosterWorkspace} from '../components/PosterWorkspace';
import {FontInspector} from '../components/FontInspector';
import {ShotCharacter} from '../components/ShotCharacter';
import {beat,localBeat} from '../data/episode04Timings';
import {ramp} from '../utils/animations';
import {E} from '../data/episodeColors';
export const Scene02TypographyDisaster:React.FC=()=>{
 const f=useCurrentFrame();const p=ramp(f,localBeat(1,beat.wedding)-6,localBeat(1,beat.wedding)+3);
 return <EditorialShot mode="impact" impactAt={localBeat(1,beat.wedding)+4}><SceneLabel number="02">NIATNYA KEREN / HASILNYA UNDANGAN</SceneLabel><Headline size={92}>KOK JADI<br/><span style={{background:E.lime}}>UNDANGAN NIKAHAN?</span></Headline><FontInspector active={0}/><PosterWorkspace script={p} style={{left:465,top:640,width:500,height:675}} label="Headline / Great Vibes"/><ShotCharacter scene={1} x={100} y={1040} width={270}/></EditorialShot>;
};
