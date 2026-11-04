import React from 'react';
import {useCurrentFrame} from 'remotion';
import {SceneLabel,Headline} from '../components/SceneCamera';
import {EditorialShot} from '../components/EditorialShot';
import {PosterWorkspace} from '../components/PosterWorkspace';
import {RevisionPoster} from '../components/RevisionPoster';
import {RevisionSteps} from '../components/RevisionSteps';
import {ShotCharacter} from '../components/ShotCharacter';
import {beat,localBeat} from '../data/episode05Timings';
import {ramp} from '../utils/animations';
import {E} from '../data/episodeColors';
export const Scene04TargetedRevision:React.FC=()=>{
 const f=useCurrentFrame();const p=(s:number,n:number)=>ramp(f,localBeat(3,s),localBeat(3,s)+n);const size=p(beat.enlarge,26),contrast=p(beat.contrast,12),cta=p(beat.cta,40);const compare=f>=localBeat(3,beat.focus);
 return <EditorialShot mode={compare?'push':'steady'}><SceneLabel number="04">REVISI SPESIFIK / BUKAN TAMBAH SEMUANYA</SceneLabel><Headline size={94}>{compare?<>FOKUS LEBIH JELAS.<br/><span style={{color:E.darkOlive}}>NGGAK HARUS RAMAI.</span></>:<>OKE, JELAS.<br/><span style={{background:E.lime}}>REVISI YANG PERLU.</span></>}</Headline>{compare?<><div style={{position:'absolute',left:90,top:640,width:280}}><div style={{fontSize:22,fontWeight:700,letterSpacing:2,marginBottom:14}}>SEBELUM</div><div style={{height:385,padding:8,background:E.white,border:`1px solid ${E.line}`,borderRadius:10}}><RevisionPoster/></div></div><div style={{position:'absolute',left:465,top:640,width:500}}><div style={{fontSize:22,fontWeight:700,letterSpacing:2,marginBottom:14}}>SESUDAH</div><div style={{height:655,padding:10,background:E.white,border:`2px solid ${E.line}`,borderRadius:12,boxShadow:'0 16px 0 #0B0C0A08'}}><RevisionPoster enlarge={1} contrast={1} cta={1}/></div></div></>:<><RevisionSteps active={cta>.05?2:contrast>.05?1:0}/><PosterWorkspace enlarge={size} contrast={contrast} cta={cta} style={{left:465,top:640,width:500,height:675}} label="Revisi / Diskon, kontras, CTA"/></>}<ShotCharacter scene={3} x={105} y={1040} width={260}/></EditorialShot>;
};
