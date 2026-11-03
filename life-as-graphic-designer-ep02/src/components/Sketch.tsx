import React from 'react';
import {E} from '../data/episodeColors';
export const Sketch:React.FC<{variant:number;progress?:number;selected?:boolean}>=({variant,progress=1,selected=false})=>{
 const paths=variant===0?['M20 20H200V240H20Z','M35 40H180V85H35Z','M35 105H115V205H35Z','M132 110H180M132 128H180M132 145H176M132 165H180M35 220H180']:
 variant===1?['M20 20H200V240H20Z','M35 38H185V96H35Z','M35 113H185M35 126H166','M65 144H155V212H65Z','M42 225H178']:
 ['M20 20H200V240H20Z','M35 38H88V210H35Z','M105 40H185M105 56H180M105 72H168','M105 95H183V166H105Z','M106 188H183M106 204H174M35 225H181'];
 return <svg viewBox="0 0 220 260" width="100%" height="100%" style={{background:selected?E.lime:E.white}}><g fill="none" stroke={E.charcoal} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">{paths.map((d,i)=><path key={d} d={d} opacity={.8} strokeDasharray="900" strokeDashoffset={900*(1-Math.max(0,Math.min(1,(progress-i*.05)*1.3)))}/>)}</g></svg>;
};
