import React from 'react';
import {useCurrentFrame,interpolate} from 'remotion';
import {EditorialShot} from '../components/EditorialShot';
import {SceneLabel,Headline} from '../components/SceneCamera';
import {AnimatedChatBubble} from '../components/ChatBubble';
import {RevisionPoster} from '../components/RevisionPoster';
import {NightEnvironment} from '../components/NightEnvironment';
import {ShotCharacter} from '../components/ShotCharacter';
import {beat,localBeat} from '../data/episode07Timings';
import {ramp,clamp} from '../utils/animations';
import {E} from '../data/episodeColors';
export const Scene01ClientApproval:React.FC=()=>{
 const f=useCurrentFrame();const approval=f>=localBeat(0,beat.approval),opening=f>=localBeat(0,beat.open),disbelief=f>=localBeat(0,beat.disbelief),joy=f>=localBeat(0,beat.joy);const p=ramp(f,localBeat(0,beat.joy),localBeat(0,beat.joy)+18);const hop=joy?interpolate(f-localBeat(0,beat.joy),[0,5,12,19,27],[0,-25,0,-8,0],clamp):0;
 return <EditorialShot mode="impact" impactAt={localBeat(0,beat.joy)}><NightEnvironment morning={1}/><SceneLabel number="01">PAGI BERIKUTNYA / BUKA PELAN-PELAN</SceneLabel><Headline size={101}>{joy?<>ALHAMDULILLAH.<br/><span style={{background:E.lime}}>AKHIRNYAAA!</span></>:disbelief?<>HAH?!<br/><span style={{background:E.lime}}>DITERIMA?!</span></>:<>PAGI INI.<br/>CHAT DARI KLIEN.</>}</Headline><AnimatedChatBubble delay={localBeat(0,beat.notification)} label="KLIEN" time="Pagi" style={{top:650,minHeight:300}}>{approval?<div style={{fontSize:64,lineHeight:1.1,opacity:ramp(f,localBeat(0,beat.approval),localBeat(0,beat.approval)+7)}}>“Desainnya udah pas.<br/><span style={{background:E.lime}}>Terima kasih!</span>”</div>:<><div style={{fontSize:55,lineHeight:1.15}}>1 pesan baru.</div><div style={{fontSize:31,color:E.darkOlive,fontWeight:500,marginTop:22}}>{opening?'Membuka pesan...':'Belum dibuka.'}</div></>}</AnimatedChatBubble><div style={{position:'absolute',left:610,top:1010,width:270}}><div style={{fontSize:20,fontWeight:600,letterSpacing:1,marginBottom:15,color:E.darkOlive}}>DESAIN YANG DIKIRIM</div><div style={{height:360,position:'relative'}}><RevisionPoster enlarge={1} contrast={1} cta={1}/>{disbelief&&<div style={{position:'absolute',right:-35,top:-15,padding:'10px 16px',background:E.lime,border:`2px solid ${E.olive}`,fontSize:26,fontWeight:700}}>DITERIMA ✓</div>}</div></div><div style={{translate:`0 ${hop}px`}}><ShotCharacter scene={0} x={95} y={1035-p*40} width={300+p*20}/></div></EditorialShot>;
};
