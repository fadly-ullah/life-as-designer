import React from 'react';
import {useCurrentFrame} from 'remotion';
import {SceneLabel,Headline} from '../components/SceneCamera';
import {EditorialShot} from '../components/EditorialShot';
import {PosterWorkspace} from '../components/PosterWorkspace';
import {ShotCharacter} from '../components/ShotCharacter';
import {E} from '../data/episodeColors';
import {beat,localBeat} from '../data/episode03Timings';
import {ramp} from '../utils/animations';
export const Scene01ColorDisaster:React.FC=()=>{
 const f=useCurrentFrame();const applied=ramp(f,localBeat(0,beat.colors),localBeat(0,beat.colors)+25);const chaos=ramp(f,localBeat(0,beat.eh),localBeat(0,beat.disaster)+12);
 return <EditorialShot mode="impact" impactAt={localBeat(0,beat.disaster)}><SceneLabel number="01">SKETSA JADI / LANJUT PILIH WARNA</SceneLabel><Headline size={91}>{chaos>.4?<>WARNA BAGUS.<br/><span style={{background:E.lime}}>KOK BERANTAKAN?</span></>:<>TINGGAL<br/>PILIH WARNA.</>}</Headline><PosterWorkspace apply={applied} chaos={chaos} cursor={{x:100+Math.min(f,95)*2.1,y:145}}/><ShotCharacter scene={0}/></EditorialShot>;
};
