import React from 'react';
import {E} from '../data/episodeColors';
export type ClockPhase='start'|'working'|'urgent'|'sent'|'morning';
/** Story milestones, never the system clock. No invented delivery minute. */
export const NarrativeClock:React.FC<{phase:ClockPhase;progress?:number;style?:React.CSSProperties}>=({phase,progress=.85,style})=>{
 const title=phase==='start'?'SEKARANG':phase==='sent'?'BERHASIL DIKIRIM':phase==='morning'?'HARI BERGANTI':'BATAS KIRIM';
 const value=phase==='start'?'22:00':phase==='sent'?'< 23:00':phase==='morning'?'ESOK PAGI':'23:00';
 return <div style={{position:'absolute',left:90,top:680,width:285,padding:'22px 24px',background:E.charcoal,color:E.white,border:`2px solid ${E.darkOlive}`,borderRadius:15,boxShadow:`6px 8px 0 ${E.beige}44`,...style}}><div style={{fontSize:20,letterSpacing:2,color:E.lime,fontWeight:600}}>{title}</div><div style={{fontSize:phase==='morning'?43:61,fontWeight:700,lineHeight:1.15,letterSpacing:-2,margin:'10px 0 12px'}}>{value}</div>{phase==='start'?<div style={{fontSize:20,color:E.beige}}>Batas kirim 23:00</div>:phase==='morning'?<div style={{fontSize:20,color:E.beige}}>Notifikasi baru.</div>:phase==='sent'?<div style={{fontSize:20,color:E.lime}}>Sebelum batas waktu.</div>:<><div style={{height:7,background:E.darkOlive,marginBottom:12}}><div style={{width:`${Math.max(0,Math.min(1,progress))*100}%`,height:7,background:E.lime}}/></div><div style={{fontSize:20,color:E.beige}}>{phase==='urgent'?'Waktunya makin mepet.':'Waktu terus berjalan.'}</div></>}</div>;
};
