import React from 'react';
import {useCurrentFrame,interpolate} from 'remotion';
import {SceneLabel,Headline} from '../components/SceneCamera';
import {EditorialShot} from '../components/EditorialShot';
import {AnimatedChatBubble} from '../components/ChatBubble';
import {Clock} from '../components/Clock';
import {ShotCharacter} from '../components/ShotCharacter';
import {beat,localBeat} from '../data/episode05Timings';
import {clamp,enter} from '../utils/animations';
import {E} from '../data/episodeColors';
export const Scene06DeadlineReveal:React.FC=()=>{
 const f=useCurrentFrame();const deadline=f>=localBeat(5,beat.deadline),shock=f>=localBeat(5,beat.shock),ending=f>=localBeat(5,beat.ep6);const p=enter(f,localBeat(5,beat.deadline));const angle=interpolate(f,[localBeat(5,beat.deadline),localBeat(5,beat.shock)+15],[0,360],clamp);
 return <EditorialShot mode="impact" impactAt={localBeat(5,beat.shock)}><SceneLabel number={ending?'EP06':'06'}>{ending?'DEADLINE TINGGAL 1 JAM!':'NOTIFIKASI LAGI / BELUM SELESAI'}</SceneLabel><Headline size={ending?103:105}>{ending?<>DEADLINE<br/><span style={{background:E.lime}}>TINGGAL 1 JAM!</span></>:shock?<>HAH?!<br/>MALAM INI?!</>:<>EH...<br/>CHAT LAGI?</>}</Headline><AnimatedChatBubble delay={localBeat(5,beat.again)} label="KLIEN" style={{top:650,minHeight:295}}>{deadline?<div style={{fontSize:65,lineHeight:1.12}}>“Bisa final<br/><span style={{background:E.lime}}>malam ini?</span>”</div>:<div style={{fontSize:42,color:E.darkOlive}}>Sedang mengetik...</div>}</AnimatedChatBubble><div style={{position:'absolute',left:560,top:990,width:390,height:390,opacity:p}}><Clock angle={angle} style={{width:380,height:380}}/><div style={{position:'absolute',left:31,right:31,bottom:-17,padding:'9px 12px',background:E.charcoal,color:E.lime,fontSize:43,fontWeight:700,textAlign:'center',letterSpacing:2}}>01:00:00</div></div><ShotCharacter scene={5} x={100} y={1010} width={285}/></EditorialShot>;
};
