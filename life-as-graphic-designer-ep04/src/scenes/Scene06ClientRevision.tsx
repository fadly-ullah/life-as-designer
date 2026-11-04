import React from 'react';
import {useCurrentFrame} from 'remotion';
import {SceneLabel,Headline} from '../components/SceneCamera';
import {EditorialShot} from '../components/EditorialShot';
import {AnimatedChatBubble} from '../components/ChatBubble';
import {ShotCharacter} from '../components/ShotCharacter';
import {beat,localBeat} from '../data/episode04Timings';
import {E} from '../data/episodeColors';
export const Scene06ClientRevision:React.FC=()=>{
 const f=useCurrentFrame();const revision=f>=localBeat(5,beat.revision),ending=f>=localBeat(5,beat.ep5);
 return <EditorialShot mode="impact" impactAt={localBeat(5,beat.feedback)}><SceneLabel number={ending?'EP05':'06'}>{ending?'REVISI LAGI? SERIUS NIH?':'BALASAN KLIEN / DATANG CEPAT'}</SceneLabel><Headline size={ending?108:96}>{ending?<>REVISI LAGI?<br/><span style={{background:E.lime}}>SERIUS NIH?</span></>:revision?<>HADUH.<br/>REVISI LAGI.</>:<>EH, LANGSUNG<br/>DIBALES?</>}</Headline><AnimatedChatBubble delay={localBeat(5,beat.reply)} label="KLIEN" style={{top:650,minHeight:330}}><div style={{fontSize:63,lineHeight:1.13,letterSpacing:-2}}>“Bagus sih,<br/>tapi <span style={{background:E.lime}}>kurang nendang.</span>”</div></AnimatedChatBubble><ShotCharacter scene={5} x={355} y={1000} width={300}/>{ending&&<div style={{position:'absolute',right:95,top:1370,fontSize:24,fontWeight:600,color:E.darkOlive}}>BERSAMBUNG / EPISODE 05</div>}</EditorialShot>;
};
