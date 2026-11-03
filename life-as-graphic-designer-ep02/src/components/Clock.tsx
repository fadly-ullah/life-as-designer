import React from 'react';
import {E} from '../data/episodeColors';
export const Clock:React.FC<{angle:number;style?:React.CSSProperties}>=({angle,style})=><svg viewBox="0 0 240 240" width="400" height="400" style={style}>
 <circle cx="120" cy="120" r="111" fill={E.white} stroke={E.charcoal} strokeWidth="5"/>
 {Array.from({length:12},(_,i)=><rect key={i} x="117" y="21" width="6" height="15" fill={E.beige} transform={`rotate(${i*30} 120 120)`}/>)}
 <path d="M120 120V48" stroke={E.charcoal} strokeWidth="7" transform={`rotate(${angle} 120 120)`}/><path d="M120 120H172" stroke={E.darkOlive} strokeWidth="7" transform={`rotate(${angle/12} 120 120)`}/><circle cx="120" cy="120" r="9" fill={E.charcoal}/>
</svg>;
