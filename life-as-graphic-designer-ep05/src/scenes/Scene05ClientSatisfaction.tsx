import React from 'react';
import {useCurrentFrame} from 'remotion';
import {SceneLabel,Headline} from '../components/SceneCamera';
import {EditorialShot} from '../components/EditorialShot';
import {AnimatedChatBubble} from '../components/ChatBubble';
import {ShotCharacter} from '../components/ShotCharacter';
import {beat,localBeat} from '../data/episode05Timings';
import {E} from '../data/episodeColors';
export const Scene05ClientSatisfaction:React.FC=()=>{
 const f=useCurrentFrame();const approved=f>=localBeat(4,beat.approved);const relief=f>=localBeat(4,beat.relief);
 return <EditorialShot mode={relief?'push':'steady'}><SceneLabel number="05">MAKSUDNYA KETEMU / AKHIRNYA SEPAKAT</SceneLabel><Headline size={relief?111:96}>{relief?<><span style={{background:E.lime}}>AKHIRNYAAA!</span></>:approved?<>NAH,<br/>INI MAKSUDNYA.</>:<>REVISI TERARAH.<br/>KIRIM LAGI.</>}</Headline><AnimatedChatBubble outgoing delay={localBeat(4,beat.resend)} label="KE KLIEN" style={{left:90,top:650,width:630,padding:26,minHeight:235}}><div style={{fontSize:43,lineHeight:1.16}}>Ini revisinya.<br/>Fokus ke angka diskon.</div></AnimatedChatBubble><AnimatedChatBubble delay={localBeat(4,beat.approved)} label="KLIEN" style={{left:90,top:950,width:630,padding:26,minHeight:245}}><div style={{fontSize:46,lineHeight:1.16}}>“Nah,<br/><span style={{background:E.lime}}>ini maksud saya!</span>”</div></AnimatedChatBubble><ShotCharacter scene={4} x={735} y={1030} width={245}/></EditorialShot>;
};
