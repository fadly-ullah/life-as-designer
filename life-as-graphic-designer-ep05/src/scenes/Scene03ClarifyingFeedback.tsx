import React from 'react';
import {useCurrentFrame} from 'remotion';
import {SceneLabel,Headline} from '../components/SceneCamera';
import {EditorialShot} from '../components/EditorialShot';
import {AnimatedChatBubble} from '../components/ChatBubble';
import {ShotCharacter} from '../components/ShotCharacter';
import {beat,localBeat} from '../data/episode05Timings';
import {E} from '../data/episodeColors';
export const Scene03ClarifyingFeedback:React.FC=()=>{
 const f=useCurrentFrame();const ask=f>=localBeat(2,beat.ask);const answered=f>=localBeat(2,beat.answer);
 return <EditorialShot><SceneLabel number="03">JANGAN MENEBAK / KLARIFIKASI DULU</SceneLabel><Headline size={95}>{answered?<>TERNYATA,<br/><span style={{background:E.lime}}>ANGKA DISKONNYA.</span></>:<>JANGAN TEBAK.<br/>TANYA DULU.</>}</Headline>{ask?<AnimatedChatBubble outgoing delay={localBeat(2,beat.ask)} label="FADLY → KLIEN" style={{top:650,width:630,padding:26,minHeight:235}}><div style={{fontSize:43,lineHeight:1.15}}>Bagian mana yang<br/>kurang menonjol?</div></AnimatedChatBubble>:<AnimatedChatBubble label="KLIEN" style={{top:650,width:630,padding:26,minHeight:235}}><div style={{fontSize:43,lineHeight:1.15}}>Bagus sih,<br/>tapi kurang nendang!</div></AnimatedChatBubble>}<AnimatedChatBubble delay={localBeat(2,beat.answer)} label="KLIEN" style={{top:950,width:630,padding:26,minHeight:245}}><div style={{fontSize:42,lineHeight:1.16}}>Angka diskonnya<br/>perlu lebih kelihatan.</div></AnimatedChatBubble><ShotCharacter scene={2} x={735} y={1030} width={245}/></EditorialShot>;
};
