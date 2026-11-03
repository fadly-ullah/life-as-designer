import React from 'react';
import {useCurrentFrame,interpolate} from 'remotion';
import {SceneLabel,Headline} from '../components/SceneCamera';
import {EditorialShot} from '../components/EditorialShot';
import {PosterWorkspace} from '../components/PosterWorkspace';
import {ShotCharacter} from '../components/ShotCharacter';
import {beat,localBeat} from '../data/episode03Timings';
import {E} from '../data/episodeColors';
import {clamp,ramp} from '../utils/animations';
export const Scene02FiveColors:React.FC=()=>{
 const f=useCurrentFrame();const combine=localBeat(1,beat.combine);const swatches=interpolate(f,[0,60],[.1,5],clamp);const chaos=ramp(f,combine,localBeat(1,beat.buset)+12);
 return <EditorialShot mode={f>=localBeat(1,beat.buset)?'push':'reframe'}><SceneLabel number="02">LIMA FAVORIT / SATU POSTER</SceneLabel><Headline size={92}>{f<combine?<>SATU-SATU<br/><span style={{color:E.darkOlive}}>CAKEP SEMUA.</span></>:<>SEMUA MAU<br/><span style={{background:E.lime}}>JADI UTAMA.</span></>}</Headline><PosterWorkspace palette={f<combine?swatches:0} chaos={chaos} style={{top:650,height:620}}/><ShotCharacter scene={1}/></EditorialShot>;
};
