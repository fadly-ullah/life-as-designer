import React from 'react';
import {E} from '../data/episodeColors';
const tasks=['Informasi promo','Diskon 50%','Jarak & layout','1080 × 1440 px','Ekspor PNG','File siap dikirim'];
export const SprintChecklist:React.FC<{step:number}>=({step})=><div style={{position:'absolute',left:90,top:640,width:307}}>{tasks.map((text,i)=><div key={text} style={{padding:'14px 16px',marginBottom:9,border:`1px solid ${i<=step?E.olive:E.line}`,background:i===step?E.lime:E.white,borderRadius:9,opacity:i>step?.5:1,display:'flex',gap:11,alignItems:'center'}}><span style={{fontSize:20,color:E.darkOlive,fontWeight:700}}>{i<step?'✓':String(i+1).padStart(2,'0')}</span><span style={{fontSize:25,fontWeight:i===step?700:500}}>{text}</span></div>)}</div>;
