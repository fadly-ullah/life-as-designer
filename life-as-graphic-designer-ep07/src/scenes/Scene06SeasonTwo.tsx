import React from 'react';
import {useCurrentFrame} from 'remotion';
import {EditorialShot} from '../components/EditorialShot';
import {SceneLabel,Headline} from '../components/SceneCamera';
import {FloatingCard} from '../components/FloatingCard';
import {ShotCharacter} from '../components/ShotCharacter';
import {beat,localBeat} from '../data/episode07Timings';
import {ramp} from '../utils/animations';
import {E} from '../data/episodeColors';
export const Scene06SeasonTwo:React.FC=()=>{
 const f=useCurrentFrame();const comment=f>=localBeat(5,beat.comment);const topics=[{at:beat.price,title:'HARGA JASA DESAIN'},{at:beat.portfolio,title:'BANGUN PORTOFOLIO'},{at:beat.firstClient,title:'CARI KLIEN PERTAMA'}];
 return <EditorialShot mode="steady"><SceneLabel number="S02">GILIRAN PENONTON / PILIH TOPIK BERIKUTNYA</SceneLabel><Headline size={99}>SEASON 02?<br/>{comment?<span style={{background:E.lime}}>KOMEN PILIHAN LO!</span>:<>MAU BAHAS APA?</>}</Headline>{topics.map((topic,i)=><FloatingCard key={topic.title} delay={localBeat(5,topic.at)} x={420} y={660+i*200} width={560} style={{height:168,display:'flex',alignItems:'center',gap:23}}><div style={{fontSize:27,fontWeight:700,color:E.darkOlive}}>{String(i+1).padStart(2,'0')}</div><div style={{fontSize:42,fontWeight:700,lineHeight:1.08}}>{topic.title}</div></FloatingCard>)}<div style={{position:'absolute',left:420,top:1315,right:90,opacity:ramp(f,localBeat(5,beat.comment),localBeat(5,beat.comment)+12)}}><div style={{fontSize:31,fontWeight:600,color:E.darkOlive}}>Pilih di kolom komentar.</div><div style={{fontSize:27,marginTop:20,color:E.darkOlive}}>@fadly_hisbullah</div></div><ShotCharacter scene={5} x={95} y={1025} width={285}/></EditorialShot>;
};
