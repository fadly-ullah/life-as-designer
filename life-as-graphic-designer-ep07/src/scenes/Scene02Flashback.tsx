import React from 'react';
import {useCurrentFrame} from 'remotion';
import {EditorialShot} from '../components/EditorialShot';
import {SceneLabel,Headline} from '../components/SceneCamera';
import {RevisionPoster} from '../components/RevisionPoster';
import {ShotCharacter} from '../components/ShotCharacter';
import {FlashbackMontage} from '../montage/FlashbackMontage';
import {beat,localBeat} from '../data/episode07Timings';
import {E} from '../data/episodeColors';
export const Scene02Flashback:React.FC=()=>{
 const f=useCurrentFrame();const archive=f>=localBeat(1,beat.brief)&&f<localBeat(1,beat.suffering);const summary=f>=localBeat(1,beat.suffering);
 return <EditorialShot mode="steady"><SceneLabel number="02">FLASHBACK / ENAM EPISODE SEBELUMNYA</SceneLabel><Headline size={102}>{summary?<>LENGKAP BANGET.<br/><span style={{background:E.lime}}>DRAMANYA.</span></>:<>SATU POSTER.<br/>TUJUH EPISODE.</>}</Headline><FlashbackMontage/>{!archive&&<><div style={{position:'absolute',left:465,top:640,width:500,height:667,boxShadow:'12px 15px 0 #0B0C0A0A'}}><RevisionPoster enlarge={1} contrast={1} cta={1}/></div><div style={{position:'absolute',left:95,top:680,width:285,color:E.darkOlive,fontSize:33,lineHeight:1.2,fontWeight:600}}>Brief. Referensi.<br/>Warna. Font.<br/>Revisi. Deadline.</div><ShotCharacter scene={1} x={95} y={1030} width={285}/></>}</EditorialShot>;
};
