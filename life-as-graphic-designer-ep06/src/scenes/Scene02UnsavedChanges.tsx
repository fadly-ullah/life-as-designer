import React from 'react';
import {useCurrentFrame,interpolate} from 'remotion';
import {EditorialShot} from '../components/EditorialShot';
import {SceneLabel,Headline} from '../components/SceneCamera';
import {DesignApplication} from '../components/DesignApplication';
import {NarrativeClock} from '../components/NarrativeClock';
import {NightEnvironment} from '../components/NightEnvironment';
import {ShotCharacter} from '../components/ShotCharacter';
import {beat,localBeat,sceneLengths} from '../data/episode06Timings';
import {clamp} from '../utils/animations';
import {E} from '../data/episodeColors';
export const Scene02UnsavedChanges:React.FC=()=>{
 const f=useCurrentFrame();const unsaved=f>=localBeat(1,beat.unsaved);const clicked=f>=localBeat(1,beat.click1);const count=f>=localBeat(1,beat.click2)?2:1;
 return <EditorialShot mode={unsaved?'push':'steady'}><NightEnvironment/><SceneLabel number="02">APLIKASI DIAM / WAKTU TETAP JALAN</SceneLabel><Headline size={98}>{unsaved?<>EDIT TERAKHIR.<br/><span style={{background:E.lime}}>BELUM DISIMPAN?!</span></>:<>KLIK LAGI.<br/>TETAP DIAM.</>}</Headline><NarrativeClock phase="working" progress={interpolate(f,[0,sceneLengths[1]],[.9,.59],clamp)}/>{clicked&&!unsaved&&<div style={{position:'absolute',left:96,top:950,width:285,fontSize:26,lineHeight:1.25,fontWeight:600,color:E.darkOlive}}>{count}× klik.<br/>Tetap tidak merespons.</div>}<DesignApplication state={unsaved?'unsaved':'frozen'} clickFrames={[localBeat(1,beat.click1),localBeat(1,beat.click2)]} style={{left:440,top:650,width:540,height:680}}/><ShotCharacter scene={1} x={90} y={1050} width={300}/></EditorialShot>;
};
