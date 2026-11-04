import React from 'react';
import {useCurrentFrame} from 'remotion';
import {EditorialShot} from '../components/EditorialShot';
import {SceneLabel,Headline} from '../components/SceneCamera';
import {RevisionPoster} from '../components/RevisionPoster';
import {NarrativeClock} from '../components/NarrativeClock';
import {NightEnvironment} from '../components/NightEnvironment';
import {ShotCharacter} from '../components/ShotCharacter';
import {beat,localBeat} from '../data/episode06Timings';
import {ramp} from '../utils/animations';
import {E} from '../data/episodeColors';
export const Scene05FileSent:React.FC=()=>{
 const f=useCurrentFrame();const sent=f>=localBeat(4,beat.sent);const p=sent?1:ramp(f,localBeat(4,beat.upload),localBeat(4,beat.sent)-1);const relaxed=f>=localBeat(4,beat.rest);
 return <EditorialShot mode={sent?'push':'steady'}><NightEnvironment/><SceneLabel number="05">FILE FINAL / KIRIM SEBELUM BATAS</SceneLabel><Headline size={103}>{sent?<>TERKIRIM.<br/><span style={{background:E.lime}}>SEBELUM 23:00!</span></>:<>UPLOAD...<br/>LOADING...</>}</Headline><div style={{position:'absolute',left:90,right:90,top:665,padding:32,background:E.white,border:`2px solid ${sent?E.olive:E.line}`,borderRadius:22,boxShadow:'0 14px 0 #0B0C0A08'}}><div style={{display:'flex',gap:26,alignItems:'center'}}><div style={{width:110,height:147,flexShrink:0}}><RevisionPoster enlarge={1} contrast={1} cta={1}/></div><div style={{flex:1}}><div style={{fontSize:22,letterSpacing:2,color:E.darkOlive,marginBottom:12}}>KE KLIEN / LAMPIRAN</div><div style={{fontSize:34,fontWeight:700}}>promo-akhir-pekan-final.png</div><div style={{fontSize:25,color:E.darkOlive,marginTop:9}}>1080 × 1440 px · PNG</div></div></div><div style={{height:13,margin:'25px 0 15px',background:E.line}}><div style={{height:13,width:`${p*100}%`,background:E.olive}}/></div><div style={{fontSize:30,fontWeight:700,color:sent?E.charcoal:E.darkOlive}}>{sent?'TERKIRIM ✓':`${Math.round(p*100)}% / Mengunggah...`}</div></div><NarrativeClock phase={sent?'sent':'urgent'} progress={.08} style={{left:595,top:1090,width:365}}/><div style={{rotate:relaxed?'2deg':'0deg',transformOrigin:'230px 1400px'}}><ShotCharacter scene={4} x={105} y={1030} width={285}/></div></EditorialShot>;
};
