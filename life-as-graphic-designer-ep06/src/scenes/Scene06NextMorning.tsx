import React from 'react';
import {useCurrentFrame} from 'remotion';
import {EditorialShot} from '../components/EditorialShot';
import {SceneLabel,Headline} from '../components/SceneCamera';
import {NarrativeClock} from '../components/NarrativeClock';
import {NightEnvironment} from '../components/NightEnvironment';
import {AnimatedChatBubble} from '../components/ChatBubble';
import {ShotCharacter} from '../components/ShotCharacter';
import {beat,localBeat} from '../data/episode06Timings';
import {ramp} from '../utils/animations';
import {E} from '../data/episodeColors';
export const Scene06NextMorning:React.FC=()=>{
 const f=useCurrentFrame();const notification=f>=localBeat(5,beat.notification);const question=f>=localBeat(5,beat.accepted);const teaser=f>=localBeat(5,beat.ep7);
 return <EditorialShot mode={notification?'push':'steady'}><NightEnvironment morning={ramp(f,0,16)}/><SceneLabel number={teaser?'EP07':'06'}>{teaser?'AKHIRNYA DESAIN DITERIMA?':'ESOK PAGI / SATU PESAN BARU'}</SceneLabel><Headline size={99}>{teaser?<>AKHIRNYA DESAIN<br/><span style={{background:E.lime}}>DITERIMA?</span></>:question?<>DITERIMA...<br/>ATAU REVISI LAGI?</>:<>PAGI BERIKUTNYA.<br/>CHAT LAGI?</>}</Headline>{notification?<AnimatedChatBubble delay={localBeat(5,beat.notification)} label="KLIEN" time="Pagi" style={{top:665,minHeight:275}}><div style={{fontSize:57,lineHeight:1.1}}>1 pesan baru.</div><div style={{fontSize:30,color:E.darkOlive,fontWeight:500,marginTop:20}}>Isi pesan belum dibuka.</div><div style={{display:'flex',gap:9,marginTop:22}}>{[0,1,2].map(i=><span key={i} style={{width:9,height:9,background:E.olive,opacity:.35+.6*Math.max(0,Math.sin(f/10-i)),borderRadius:2}}/>)}</div></AnimatedChatBubble>:<div style={{position:'absolute',left:95,top:725,width:470,fontSize:48,lineHeight:1.15,fontWeight:600,color:E.darkOlive}}>Semalam terkirim.<br/>Pagi ini...</div>}<NarrativeClock phase="morning" style={{left:605,top:1080,width:350}}/><ShotCharacter scene={5} x={105} y={1035} width={300}/></EditorialShot>;
};
