import React from 'react';
import {useCurrentFrame,interpolate} from 'remotion';
import {SceneLabel,Headline} from '../components/SceneCamera';
import {EditorialShot} from '../components/EditorialShot';
import {AnimatedChatBubble} from '../components/ChatBubble';
import {PosterWorkspace} from '../components/PosterWorkspace';
import {ShotCharacter} from '../components/ShotCharacter';
import {beat,localBeat} from '../data/episode03Timings';
import {E} from '../data/episodeColors';
import {clamp} from '../utils/animations';
export const Scene04ReturnToBrief:React.FC=()=>{
 const f=useCurrentFrame();const back=localBeat(3,beat.brief);const goal=f>=localBeat(3,beat.goal);const p=interpolate(f,[back,back+15],[0,1],clamp);
 return <EditorialShot><SceneLabel number="04">RESET / BALIK KE BRIEF</SceneLabel><Headline size={95}>{p>.5?<>PROMONYA HARUS<br/><span style={{background:E.lime}}>LANGSUNG KEBACA.</span></>:<>OKE.<br/>ADA YANG SALAH.</>}</Headline><div style={{opacity:(1-p)*.3,transform:`translateX(${-p*1100}px)`}}><PosterWorkspace style={{top:650,height:540}}/></div><AnimatedChatBubble label="BRIEF KLIEN / TUJUAN UTAMA" delay={back+4} style={{top:650,minHeight:370}}><div style={{fontSize:29,color:E.darkOlive,marginBottom:26}}>AUDIENS / ANAK MUDA</div><div style={{fontSize:62,lineHeight:1.08,letterSpacing:-2}}>Promo harus<br/><span style={{background:goal?E.lime:undefined}}>langsung kebaca.</span></div><div style={{height:2,background:E.line,marginTop:25}}/><div style={{fontSize:25,marginTop:20,color:E.darkOlive}}>Muda. Tegas. Hemat.</div></AnimatedChatBubble><ShotCharacter scene={3} x={130} y={1050} width={260}/>{p>.9&&<div style={{position:'absolute',left:500,top:1210,fontSize:31,color:E.darkOlive}}>Fungsi dulu.<br/>Favorit belakangan.</div>}</EditorialShot>;
};
