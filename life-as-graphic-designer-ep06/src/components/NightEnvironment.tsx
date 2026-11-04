import React from 'react';
import {E} from '../data/episodeColors';
/** Local monitor/desk accents keep the established cream editorial background. */
export const NightEnvironment:React.FC<{morning?:number}>=({morning=0})=><>
 <div style={{position:'absolute',left:405,top:670,width:565,height:690,borderRadius:26,boxShadow:`0 0 75px ${E.olive}12`,opacity:1-morning}}/>
 <div style={{position:'absolute',left:90,right:90,top:1425,height:2,background:E.line,opacity:.5}}/>
 <svg viewBox="0 0 180 140" width="130" height="102" style={{position:'absolute',left:820,top:1310,opacity:.85}} aria-label="Lampu meja"><path d="M15 126H150V135H15ZM100 126V76L70 38" stroke={E.darkOlive} strokeWidth="8" fill="none"/><path d="M70 21L110 66L40 84L22 65Z" fill={E.olive}/><path d="M43 83L110 66" stroke={E.lime} strokeWidth="6" opacity={1-morning}/></svg>
 <div style={{position:'absolute',left:94,top:1393,fontSize:19,letterSpacing:2,color:E.darkOlive,opacity:.75}}>{morning>.5?'PAGI BERIKUTNYA':'MALAM / PROYEK YANG SAMA'}</div>
</>;
