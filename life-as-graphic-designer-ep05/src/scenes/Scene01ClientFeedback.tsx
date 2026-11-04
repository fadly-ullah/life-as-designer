import React from 'react';
import {useCurrentFrame} from 'remotion';
import {SceneLabel,Headline} from '../components/SceneCamera';
import {EditorialShot} from '../components/EditorialShot';
import {AnimatedChatBubble} from '../components/ChatBubble';
import {ShotCharacter} from '../components/ShotCharacter';
import {RevisionPoster} from '../components/RevisionPoster';
import {ramp} from '../utils/animations';
import {AlmostKick} from '../components/AlmostKick';
import {beat,localBeat} from '../data/episode05Timings';
import {E} from '../data/episodeColors';
export const Scene01ClientFeedback:React.FC=()=>{
 const f=useCurrentFrame();const kick=f>=localBeat(0,beat.kick)&&f<localBeat(0,beat.back);const confused=f>=localBeat(0,beat.confused);const incoming=ramp(f,localBeat(0,beat.feedback)-8,localBeat(0,beat.feedback)+8);
 return <EditorialShot mode="impact" impactAt={localBeat(0,beat.confused)}><SceneLabel number="01">POSTER YANG SAMA / KOMENTAR BARU</SceneLabel><Headline size={94}>{kick?<>MAU DITENDANG?<br/><span style={{color:E.darkOlive}}>CUMA KEBAYANG.</span></>:confused?<>KURANG NENDANG<br/><span style={{background:E.lime}}>GIMANA, BANG?!</span></>:<>BARU DIKIRIM.<br/>SUDAH DIBALAS.</>}</Headline>{kick?<AlmostKick/>:<><div style={{opacity:1-incoming}}><AnimatedChatBubble outgoing label="KE KLIEN" style={{left:90,top:700,width:480,padding:26}}><div style={{fontSize:39}}>Poster promo terbaru.</div></AnimatedChatBubble><div style={{position:'absolute',left:680,top:640,width:275,height:365,padding:8,background:E.white,border:`1px solid ${E.line}`,borderRadius:12}}><RevisionPoster/></div></div><AnimatedChatBubble delay={localBeat(0,beat.feedback)-8} label="KLIEN" style={{top:650,minHeight:320}}><div style={{fontSize:63,lineHeight:1.13,letterSpacing:-2}}>“Bagus sih,<br/>tapi <span style={{background:E.lime}}>kurang nendang!</span>”</div></AnimatedChatBubble><ShotCharacter scene={0} x={355} y={1000} width={300}/></>}</EditorialShot>;
};
