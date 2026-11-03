import React from 'react';
import {C} from '../data/colors';
export const PixelDesk:React.FC<{style?:React.CSSProperties}>=({style})=><svg width="900" height="245" viewBox="0 0 900 245" style={{position:'absolute',left:90,top:1155,...style}} shapeRendering="crispEdges">
 <path d="M15 20H870V42H885V65H0V42H15Z" fill={C.hoodieShade}/><path d="M0 58H885V78H0Z" fill={C.beige}/>
 <path d="M45 78H67V226H45ZM817 78H839V226H817Z" fill={C.darkOlive}/><rect x="67" y="90" width="750" height="10" fill="#D8D2C4"/>
 <path d="M738 1H784V49H738Z" fill={C.white}/><path d="M784 10H801V35H784" fill="none" stroke={C.hoodieShade} strokeWidth="7"/><rect x="744" y="4" width="34" height="4" fill={C.darkOlive}/>
</svg>;
