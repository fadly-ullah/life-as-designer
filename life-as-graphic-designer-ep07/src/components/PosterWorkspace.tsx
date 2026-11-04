import React from 'react';
import {PixelComputer,Cursor} from './PixelComputer';
import {RevisionPoster,RevisionProps} from './RevisionPoster';
export const PosterWorkspace:React.FC<RevisionProps&{style?:React.CSSProperties;label?:string;cursor?:{x:number;y:number}}>=({style,label='Poster promo / Revisi terarah',cursor,...poster})=><PixelComputer style={{left:330,top:650,width:630,height:610,...style}} label={label}><div style={{position:'absolute',inset:'3% 2%',display:'flex',justifyContent:'center'}}><div style={{height:'100%',aspectRatio:'3/4',flexShrink:0,position:'relative',boxShadow:'0 6px 14px #0B0C0A1A'}}><RevisionPoster {...poster}/></div></div>{cursor&&<Cursor x={cursor.x} y={cursor.y} scale={.6}/>}</PixelComputer>;
