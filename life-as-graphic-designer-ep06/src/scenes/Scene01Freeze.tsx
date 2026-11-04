import React from 'react';
import {useCurrentFrame} from 'remotion';
import {EditorialShot} from '../components/EditorialShot';
import {SceneLabel,Headline} from '../components/SceneCamera';
import {DesignApplication} from '../components/DesignApplication';
import {NarrativeClock} from '../components/NarrativeClock';
import {NightEnvironment} from '../components/NightEnvironment';
import {ShotCharacter} from '../components/ShotCharacter';
import {beat,localBeat} from '../data/episode06Timings';
import {ramp} from '../utils/animations';
import {E} from '../data/episodeColors';
export const Scene01Freeze:React.FC=()=>{
 const f=useCurrentFrame();const frozen=f>=localBeat(0,beat.freeze),reaction=f>=localBeat(0,beat.shock);const cut=ramp(f,localBeat(0,beat.shock)-3,localBeat(0,beat.shock)+8);
 return <EditorialShot mode="impact" impactAt={localBeat(0,beat.shock)}><NightEnvironment/><SceneLabel number="01">BATAS KIRIM / SATU JAM LAGI</SceneLabel><Headline size={102}>{reaction?<>HAH?!<br/><span style={{background:E.lime}}>SERIUS SEKARANG?!</span></>:frozen?<>APLIKASINYA...<br/><span style={{background:E.lime}}>NGE-FREEZE?!</span></>:<>DEADLINE<br/>TINGGAL 1 JAM!</>}</Headline><NarrativeClock phase="start" style={{top:675,width:180+cut*100,padding:'18px 16px'}}/><DesignApplication state={frozen?'frozen':'editing'} style={{left:300+cut*175,top:650,width:680-cut*180,height:710-cut*70}}/><ShotCharacter scene={0} x={83} y={1040} width={285+cut*20}/></EditorialShot>;
};
