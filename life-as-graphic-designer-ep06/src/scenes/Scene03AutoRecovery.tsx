import React from 'react';
import {useCurrentFrame,interpolate} from 'remotion';
import {EditorialShot} from '../components/EditorialShot';
import {SceneLabel,Headline} from '../components/SceneCamera';
import {DesignApplication} from '../components/DesignApplication';
import {NarrativeClock} from '../components/NarrativeClock';
import {NightEnvironment} from '../components/NightEnvironment';
import {ShotCharacter} from '../components/ShotCharacter';
import {beat,localBeat,sceneLengths} from '../data/episode06Timings';
import {ramp,clamp} from '../utils/animations';
import {E} from '../data/episodeColors';
export const Scene03AutoRecovery:React.FC=()=>{
 const f=useCurrentFrame();const available=f>=localBeat(2,beat.recovery),opened=f>=localBeat(2,beat.relief);
 return <EditorialShot mode={available?'push':'steady'}><NightEnvironment/><SceneLabel number="03">BUKA ULANG / SEMOGA MASIH AMAN</SceneLabel><Headline size={100}>{opened?<>ALHAMDULILLAH.<br/><span style={{background:E.lime}}>MASIH SELAMAT!</span></>:available?<>ADA FILE<br/><span style={{background:E.lime}}>AUTO RECOVERY!</span></>:<>BUKA LAGI.<br/>SEMOGA AMAN.</>}</Headline><NarrativeClock phase="working" progress={interpolate(f,[0,sceneLengths[2]],[.59,.36],clamp)}/><DesignApplication state={opened?'recovered':available?'recovery':'restart'} progress={ramp(f,localBeat(2,beat.restart),localBeat(2,beat.recovery))} style={{left:440,top:650,width:540,height:680}}/><ShotCharacter scene={2} x={93} y={1045} width={300}/></EditorialShot>;
};
