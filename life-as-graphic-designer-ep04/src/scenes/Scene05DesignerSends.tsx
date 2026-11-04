import React from 'react';
import {useCurrentFrame} from 'remotion';
import {SceneLabel,Headline} from '../components/SceneCamera';
import {EditorialShot} from '../components/EditorialShot';
import {TypographyPoster} from '../components/TypographyPoster';
import {AnimatedChatBubble} from '../components/ChatBubble';
import {ShotCharacter} from '../components/ShotCharacter';
import {beat,localBeat} from '../data/episode04Timings';
import {ramp} from '../utils/animations';
import {E} from '../data/episodeColors';
export const Scene05DesignerSends:React.FC=()=>{
 const f=useCurrentFrame();const send=localBeat(4,beat.send);const p=ramp(f,send,send+13);
 return <EditorialShot mode="push"><SceneLabel number="05">RAPI DI MATA DESAINER / KIRIM DULU</SceneLabel><Headline size={96}>{p>.5?<>OKE.<br/><span style={{background:E.lime}}>KIRIM KE KLIEN.</span></>:<>FONTNYA RAPI.<br/><span style={{color:E.darkOlive}}>PROMONYA KEBACA.</span></>}</Headline><div style={{position:'absolute',left:90,top:640,width:280,opacity:1-p,translate:`${-p*55}px 0`}}><div style={{fontSize:22,fontWeight:700,letterSpacing:2,marginBottom:14}}>SEBELUM</div><div style={{height:385,padding:8,border:`1px solid ${E.line}`,borderRadius:10,background:E.white}}><TypographyPoster script={1} heavy={1} serif={1}/></div></div><div style={{position:'absolute',left:465,top:640,width:500}}><div style={{display:'flex',justifyContent:'space-between',fontSize:22,fontWeight:700,letterSpacing:2,marginBottom:14}}>SESUDAH <span style={{color:E.darkOlive,fontSize:19}}>{p>.5?'TERKIRIM':'SPACE GROTESK'}</span></div><div style={{height:655,padding:10,border:`2px solid ${E.line}`,borderRadius:12,background:E.white,boxShadow:'0 16px 0 #0B0C0A08'}}><TypographyPoster/></div></div><AnimatedChatBubble delay={send} outgoing label="KE KLIEN" style={{left:90,top:710,width:330,padding:24}}><div style={{fontSize:32}}>Poster promo<br/>terbaru.</div></AnimatedChatBubble><ShotCharacter scene={4} x={105} y={1050} width={260}/></EditorialShot>;
};
