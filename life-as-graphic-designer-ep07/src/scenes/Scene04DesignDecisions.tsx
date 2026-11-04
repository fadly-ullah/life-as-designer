import React from 'react';
import {useCurrentFrame} from 'remotion';
import {EditorialShot} from '../components/EditorialShot';
import {SceneLabel,Headline} from '../components/SceneCamera';
import {PosterEvolution} from '../components/PosterEvolution';
import {PromoPoster} from '../components/PromoPoster';
import {RevisionPoster} from '../components/RevisionPoster';
import {ShotCharacter} from '../components/ShotCharacter';
import {beat,localBeat} from '../data/episode07Timings';
import {ramp} from '../utils/animations';
import {E} from '../data/episodeColors';
export const Scene04DesignDecisions:React.FC=()=>{
 const f=useCurrentFrame();const revision=f>=localBeat(3,beat.revision);const p=ramp(f,localBeat(3,beat.decisions),localBeat(3,beat.decisionsEnd));const edit=ramp(f,localBeat(3,beat.revision),localBeat(3,beat.listen));const active=p<.33?0:p<.67?1:2;
 return <EditorialShot mode="steady"><SceneLabel number="04">WARNA / FONT / LAYOUT / PESAN YANG SAMA</SceneLabel><Headline size={97}>{revision?<>DENGARKAN.<br/><span style={{background:E.lime}}>REVISI YANG PERLU.</span></>:<>DESAINNYA KERJA.<br/>PESANNYA SAMPAI.</>}</Headline>{revision?<div style={{position:'absolute',left:90,top:665,width:285,padding:25,border:`2px solid ${E.line}`,borderRadius:15,background:E.white}}><div style={{fontSize:22,color:E.darkOlive,letterSpacing:1,marginBottom:22}}>KLIEN / EP05</div><div style={{fontSize:35,fontWeight:600,lineHeight:1.2}}>“Angka diskonnya perlu lebih kelihatan.”</div></div>:<><div style={{position:'absolute',left:95,top:620,fontSize:22,fontWeight:700,letterSpacing:2,color:E.darkOlive}}>SEBELUM</div><div style={{position:'absolute',left:95,top:665,width:270,height:360}}><PromoPoster/></div></>}<div style={{position:'absolute',left:465,top:620,width:500,display:'flex',justifyContent:'space-between',fontSize:21,fontWeight:600,letterSpacing:1}}>{['WARNA','FONT','LAYOUT'].map((t,i)=><span key={t} style={{color:E.darkOlive,background:!revision&&i===active?E.lime:undefined,padding:'4px 9px'}}>{t}</span>)}</div><div style={{position:'absolute',left:465,top:675,width:500,height:667,boxShadow:'10px 13px 0 #0B0C0A0A'}}>{revision?<RevisionPoster enlarge={edit} contrast={edit} cta={edit}/>:<PosterEvolution progress={p}/>}</div><ShotCharacter scene={3} x={95} y={1080} width={250}/></EditorialShot>;
};
