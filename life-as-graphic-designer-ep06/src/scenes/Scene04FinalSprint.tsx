import React from 'react';
import {useCurrentFrame} from 'remotion';
import {EditorialShot} from '../components/EditorialShot';
import {SceneLabel,Headline} from '../components/SceneCamera';
import {DesignApplication} from '../components/DesignApplication';
import {SprintChecklist} from '../components/SprintChecklist';
import {NightEnvironment} from '../components/NightEnvironment';
import {ShotCharacter} from '../components/ShotCharacter';
import {beat,localBeat} from '../data/episode06Timings';
import {ramp} from '../utils/animations';
import {E} from '../data/episodeColors';
export const Scene04FinalSprint:React.FC=()=>{
 const f=useCurrentFrame();const events=[beat.checkInfo,beat.checkDiscount,beat.layout,beat.dimensions,beat.export,beat.exported];const step=Math.max(0,events.filter(t=>f>=localBeat(3,t)).length-1);const detail=f>=localBeat(3,beat.details);
 return <EditorialShot mode="steady"><NightEnvironment/><SceneLabel number="04">FINALISASI / BATAS KIRIM 23:00</SceneLabel><Headline size={100}>{detail?<>DETAIL KECIL?<br/><span style={{background:E.lime}}>NANTI DULU.</span></>:<>WAKTU MEPET.<br/>CEK YANG PENTING.</>}</Headline><SprintChecklist step={step}/><DesignApplication state={step===5?'exported':step===4?'exporting':'finalizing'} step={step} progress={ramp(f,localBeat(3,beat.export),localBeat(3,beat.exported))} style={{left:445,top:645,width:535,height:690}}/><ShotCharacter scene={3} x={95} y={1065} width={260}/></EditorialShot>;
};
