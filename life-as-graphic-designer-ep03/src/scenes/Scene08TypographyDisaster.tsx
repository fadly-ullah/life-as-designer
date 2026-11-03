import React from 'react';
import {useCurrentFrame} from 'remotion';
import {SceneLabel,Headline} from '../components/SceneCamera';
import {EditorialShot} from '../components/EditorialShot';
import {PosterWorkspace} from '../components/PosterWorkspace';
import {ShotCharacter} from '../components/ShotCharacter';
import {beat,localBeat} from '../data/episode03Timings';
import {E} from '../data/episodeColors';
import {enter} from '../utils/animations';
export const Scene08TypographyDisaster:React.FC=()=>{
 const f=useCurrentFrame();const applied=f>=localBeat(7,beat.fontApply);const ending=f>=localBeat(7,beat.ep4);const selector=enter(f,localBeat(7,beat.font));
 return <EditorialShot mode="impact" impactAt={localBeat(7,beat.wedding)}><SceneLabel number={ending?'EP04':'08'}>{ending?'GARA-GARA FONT, DESAIN JADI ANEH':'TINGGAL FONT / HARUSNYA GAMPANG'}</SceneLabel><Headline size={ending?86:94}>{ending?<>GARA-GARA FONT,<br/>DESAIN JADI ANEH.</>:applied?<>KOK JADI<br/><span style={{background:E.lime}}>UNDANGAN NIKAHAN?</span></>:<>TINGGAL<br/>PILIH FONT.</>}</Headline>
  <div style={{position:'absolute',left:90,top:665,width:310,padding:22,background:E.white,border:`2px solid ${E.line}`,borderRadius:16,opacity:selector,transform:`translateY(${(1-selector)*25}px)`}}><div style={{fontSize:21,fontWeight:700,letterSpacing:2,marginBottom:20}}>FONT / PILIH</div><div style={{fontSize:25,padding:'14px 8px',borderBottom:`1px solid ${E.line}`,color:E.darkOlive}}>Space Grotesk</div><div style={{fontSize:44,fontFamily:'WeddingScript',padding:'17px 8px',background:applied?E.lime:undefined,marginTop:7}}>Great Vibes</div></div>
  <PosterWorkspace base={1} text={1} offer={1} olive={1} cleanup={1} wedding={applied} style={{left:430,top:640,width:540,height:675}} label={applied?'Typography / Great Vibes':'Typography / Space Grotesk'}/>
  <ShotCharacter scene={7} x={90} y={1010} width={285}/>
  {ending&&<div style={{position:'absolute',right:95,top:1380,color:E.darkOlive,fontSize:23,fontWeight:600}}>BERSAMBUNG / EPISODE 04</div>}
 </EditorialShot>;
};
