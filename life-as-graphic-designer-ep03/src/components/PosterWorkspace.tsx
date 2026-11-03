import React from 'react';
import {PixelComputer,Cursor} from './PixelComputer';
import {PromoPoster,PosterProps} from './PromoPoster';
export const PosterWorkspace:React.FC<PosterProps&{style?:React.CSSProperties;label?:string;cursor?:{x:number;y:number}}>=({style,label='Poster promo / Color study',cursor,...poster})=><PixelComputer style={{left:330,top:650,width:630,height:610,...style}} label={label}><div style={{position:'absolute',left:'18%',right:'9%',top:'3%',bottom:'3%',boxShadow:'0 6px 14px #0B0C0A1A'}}><PromoPoster {...poster}/></div>{cursor&&<Cursor x={cursor.x} y={cursor.y} scale={.6}/>}</PixelComputer>;
