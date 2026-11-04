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
export const Scene03FontReunion:React.FC=()=>{
 const f=useCurrentFrame();const heavy=ramp(f,localBeat(2,beat.heavy),localBeat(2,beat.heavy)+12);const serif=ramp(f,localBeat(2,beat.serif),localBeat(2,beat.serif)+12);const punch=f>=localBeat(2,beat.buset);const lost=f>=localBeat(2,beat.hardTitle);
 return <EditorialShot mode={lost?'push':'reframe'}><SceneLabel number="03">SATU POSTER / TIGA KELUARGA FONT</SceneLabel><Headline size={93}>{lost?<>JUDUL SUSAH DIBACA.<br/><span style={{color:E.darkOlive}}>DISKON KALAH.</span></>:punch?<>REUNI<br/><span style={{background:E.lime}}>KELUARGA FONT?</span></>:<>SEMUA FONT<br/>IKUT MASUK.</>}</Headline><FontInspector active={lost?(f>=localBeat(2,beat.invitation)?0:f>=localBeat(2,beat.weakDiscount)?1:0):serif>.5?2:heavy>.5?1:0}/><PosterWorkspace script={1} heavy={heavy} serif={serif} focus={lost?(f>=localBeat(2,beat.invitation)?'title':f>=localBeat(2,beat.weakDiscount)?'discount':'title'):undefined} style={{left:465,top:640,width:500,height:675}} label="Typography / Tiga pilihan bertabrakan"/><ShotCharacter scene={2} x={100} y={1050} width={260}/></EditorialShot>;
};
