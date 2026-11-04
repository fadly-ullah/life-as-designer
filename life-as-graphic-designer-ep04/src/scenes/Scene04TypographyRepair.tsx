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
export const Scene04TypographyRepair:React.FC=()=>{
 const f=useCurrentFrame();const p=(s:number,n=18)=>ramp(f,localBeat(3,s),localBeat(3,s)+n);const family=p(beat.family,26),weight=p(beat.weight,35),title=p(beat.title),discount=p(beat.discount,22),info=p(beat.info),space=p(beat.spacing,32);const selected=family>.25;
 return <EditorialShot><SceneLabel number="04">KURANGI PILIHAN / PERJELAS HIERARKI</SceneLabel><Headline size={96}>{selected?<>SATU KELUARGA.<br/><span style={{background:E.lime}}>BANYAK PERAN.</span></>:<>OKE.<br/>FOKUS, FOKUS.</>}</Headline><FontInspector single={selected} weight={weight} note={space>.5?'Jarak rapi. Kelompok jelas.':info>.5?'Info kecil tetap kebaca.':discount>.5?'Diskon jadi paling besar.':title>.5?'Judul tegas dan terbaca.':undefined}/><PosterWorkspace script={1} heavy={1} serif={1} family={family} weight={weight} titleFix={title} discountFix={discount} infoFix={info} spacing={space} focus={space>.1?undefined:info>.1?'info':discount>.1?'discount':title>.1?'title':undefined} style={{left:465,top:640,width:500,height:675}} label="Space Grotesk / Family, weight, size"/><ShotCharacter scene={3} x={100} y={1040} width={270}/></EditorialShot>;
};
