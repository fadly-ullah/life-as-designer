import React from 'react';
import {useCurrentFrame} from 'remotion';
import {EditorialShot} from '../components/EditorialShot';
import {SceneLabel,Headline} from '../components/SceneCamera';
import {SeasonCompletion} from '../components/SeasonCompletion';
import {RevisionPoster} from '../components/RevisionPoster';
import {ShotCharacter} from '../components/ShotCharacter';
import {beat,localBeat} from '../data/episode07Timings';
import {enter} from '../utils/animations';
import {E} from '../data/episodeColors';
export const Scene05SeasonComplete:React.FC=()=>{
 const f=useCurrentFrame();const onwards=f>=localBeat(4,beat.journey);const p=enter(f,0);
 return <EditorialShot mode="push"><SceneLabel number="05">SEASON 01 / SATU PROYEK SELESAI</SceneLabel><Headline size={99}>{onwards?<>PROYEK SELESAI.<br/><span style={{background:E.lime}}>CERITA BERLANJUT.</span></>:<>SATU POSTER.<br/><span style={{background:E.lime}}>BANYAK PELAJARAN.</span></>}</Headline><SeasonCompletion/><div style={{position:'absolute',left:440,top:650,width:530,height:707,opacity:p,translate:`${(1-p)*25}px 0`,boxShadow:'12px 16px 0 #0B0C0A0A'}}><RevisionPoster enlarge={1} contrast={1} cta={1}/></div><ShotCharacter scene={4} x={95} y={1035} width={285}/></EditorialShot>;
};
