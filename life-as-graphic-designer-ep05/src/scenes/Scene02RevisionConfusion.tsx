import React from 'react';
import {useCurrentFrame,interpolate} from 'remotion';
import {SceneLabel,Headline} from '../components/SceneCamera';
import {EditorialShot} from '../components/EditorialShot';
import {PosterWorkspace} from '../components/PosterWorkspace';
import {ShotCharacter} from '../components/ShotCharacter';
import {beat,localBeat} from '../data/episode05Timings';
import {E} from '../data/episodeColors';
import {clamp} from '../utils/animations';
export const Scene02RevisionConfusion:React.FC=()=>{
 const f=useCurrentFrame();const imagined=f>=localBeat(1,beat.thinking)&&f<localBeat(1,beat.clutter)+30;
 const p=interpolate(f,[localBeat(1,beat.ornaments),localBeat(1,beat.colors),localBeat(1,beat.other),localBeat(1,beat.clutter),localBeat(1,beat.clutter)+28],[0,.5,1,1,0],clamp);
 return <EditorialShot mode="reframe"><SceneLabel number="02">KALAU LANGSUNG TAMBAH / APA JADINYA?</SceneLabel><Headline size={94}>{p>.4?<>TAMBAH ELEMEN?<br/><span style={{background:E.lime}}>BALIK BERANTAKAN.</span></>:<>DARI MINIMALIS<br/>JADI LEBIH RAMAI?</>}</Headline><div style={{position:'absolute',left:465,top:598,width:500,fontSize:22,letterSpacing:2,fontWeight:700,color:E.darkOlive}}>{imagined?'IMAJINASI / BELUM DITERAPKAN':'DESAIN ASLI / BELUM DIUBAH'}</div><PosterWorkspace clutter={p} style={{left:465,top:650,width:500,height:665}} label={imagined?'Bayangan revisi / bukan hasil final':'Desain asli / kembali ke awal'}/><div style={{position:'absolute',left:90,top:710,width:290,padding:20,border:`1px dashed ${E.darkOlive}`,borderRadius:14,color:E.darkOlive,fontSize:30,lineHeight:1.3}}>{imagined?<>Ornamen?<br/>Warna?<br/>Elemen lagi?</>:<>Minimalis<br/>atau ramai?</>}</div><ShotCharacter scene={1} x={100} y={1040} width={270}/></EditorialShot>;
};
