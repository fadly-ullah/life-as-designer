import React from 'react';
import {useCurrentFrame} from 'remotion';
import {SceneLabel,Headline} from '../components/SceneCamera';
import {EditorialShot} from '../components/EditorialShot';
import {PosterWorkspace} from '../components/PosterWorkspace';
import {ShotCharacter} from '../components/ShotCharacter';
import {FunctionRow} from '../components/FunctionRow';
import {beat,localBeat} from '../data/episode03Timings';
import {E} from '../data/episodeColors';
import {ramp} from '../utils/animations';
export const Scene05ColorFunctions:React.FC=()=>{
 const f=useCurrentFrame();const p=(s:number)=>ramp(f,localBeat(4,s),localBeat(4,s)+12);const b=p(beat.charcoal),t=p(beat.cream),o=p(beat.lime),v=p(beat.sparing);
 return <EditorialShot><SceneLabel number="05">SETIAP WARNA / ADA FUNGSINYA</SceneLabel><Headline size={96}>WARNA PUNYA<br/><span style={{background:E.lime}}>TUGAS.</span></Headline>
  {[['CHARCOAL','Dasar',E.charcoal,beat.charcoal],['CREAM','Teks',E.white,beat.cream],['LIME','Fokus diskon',E.lime,beat.lime],['OLIVE','Aksen secukupnya',E.olive,beat.olive]].map(([label,role,color,s],i)=><FunctionRow key={label} label={String(label)} role={String(role)} color={String(color)} delay={localBeat(4,Number(s))} top={665+i*104} active={f>=localBeat(4,Number(s))&&(i===3||f<localBeat(4,Number([beat.cream,beat.lime,beat.olive,beat.sparing][i])))}/>)}
  <PosterWorkspace base={b} text={t} offer={o} olive={v} chaos={1-.65*b} style={{left:465,top:640,width:500,height:675}} label="Color roles / Poster promo"/>
  <ShotCharacter scene={4} x={125} y={1060} width={250}/>
 </EditorialShot>;
};
