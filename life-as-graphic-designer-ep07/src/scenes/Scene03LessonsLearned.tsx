import React from 'react';
import {useCurrentFrame} from 'remotion';
import {EditorialShot} from '../components/EditorialShot';
import {SceneLabel,Headline} from '../components/SceneCamera';
import {FloatingCard} from '../components/FloatingCard';
import {BriefCard} from '../components/BriefCard';
import {RevisionPoster} from '../components/RevisionPoster';
import {ShotCharacter} from '../components/ShotCharacter';
import {beat,localBeat} from '../data/episode07Timings';
import {E} from '../data/episodeColors';
export const Scene03LessonsLearned:React.FC=()=>{
 const f=useCurrentFrame();const questions=f>=localBeat(2,beat.audience);const concepts=[{at:beat.audience,title:'AUDIENS',answer:'Anak muda.'},{at:beat.message,title:'PESAN UTAMA',answer:'Diskon 50%.'},{at:beat.priority,title:'PRIORITAS VISUAL',answer:'Angka diskon, duluan.'}];
 return <EditorialShot mode="push"><SceneLabel number="03">KEMBALI KE BRIEF / PAHAMI MASALAH</SceneLabel><Headline size={98}>PAHAMI MASALAH.<br/><span style={{background:E.lime}}>BARU BIKIN DESAIN.</span></Headline><BriefCard/>{!questions?<FloatingCard x={420} y={660} width={560} style={{height:650}}><div style={{fontSize:22,color:E.darkOlive,letterSpacing:2,marginBottom:27}}>TUJUAN KOMUNIKASI</div><div style={{fontSize:49,lineHeight:1.12}}>Promonya harus<br/><span style={{background:E.lime}}>langsung kebaca.</span></div><div style={{position:'absolute',left:148,bottom:29,width:240,height:320}}><RevisionPoster enlarge={1} contrast={1} cta={1}/></div></FloatingCard>:concepts.map((c,i)=><FloatingCard key={c.title} delay={localBeat(2,c.at)} x={420} y={660+i*210} width={560} style={{minHeight:182}}><div style={{fontSize:23,letterSpacing:2,color:E.darkOlive,marginBottom:17}}>{String(i+1).padStart(2,'0')} / {c.title}</div><div style={{fontSize:43,fontWeight:700,lineHeight:1.1}}>{c.answer}</div></FloatingCard>)}<ShotCharacter scene={2} x={95} y={1060} width={270}/></EditorialShot>;
};
