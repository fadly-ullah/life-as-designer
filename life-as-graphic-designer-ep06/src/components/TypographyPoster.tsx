import React from 'react';
import {E} from '../data/episodeColors';
const lerp=(a:number,b:number,p:number)=>a+(b-a)*p;
export type TypographyProps={script?:number;heavy?:number;serif?:number;family?:number;weight?:number;titleFix?:number;discountFix?:number;infoFix?:number;spacing?:number;focus?:'title'|'discount'|'info';style?:React.CSSProperties};
/** EP03's same poster artwork and colors. Text layers change family, weight, size and spacing. */
export const TypographyPoster:React.FC<TypographyProps>=({script=0,heavy=0,serif=0,family=0,weight=0,titleFix=0,discountFix=0,infoFix=0,spacing=0,focus,style})=>{
 const problem=Math.max(script,heavy,serif);const decorative=script*(1-family),black=heavy*(1-family),mixedInfo=serif*(1-family);
 const titleProblem=problem*(1-titleFix);const discountProblem=problem*(1-discountFix);const infoProblem=problem*(1-infoFix);const misalign=problem*(1-spacing);
 const x=lerp(33,164,discountProblem),y=lerp(344,326,misalign),size=lerp(139,78,discountProblem);
 const infoX=30+24*misalign,infoY=411+18*misalign,infoSize=22-8*infoProblem;
 const headingWeight=problem>0?Math.round(500+200*Math.max(weight,titleFix)):700;
 return <div data-poster-artwork style={{width:'100%',height:'100%',position:'relative',overflow:'hidden',background:E.charcoal,...style}}><svg viewBox="0 0 420 560" width="100%" height="100%" preserveAspectRatio="none" style={{overflow:'hidden'}} role="img" aria-label={family>.9&&spacing>.9?'Poster promo satu keluarga Space Grotesk dengan diskon 50 persen dominan':problem>.9?'Poster promo dengan pilihan tipografi yang saling bertabrakan':'Poster promo hasil koreksi warna EP03'}>
  <rect width="420" height="560" fill={E.charcoal}/><rect x="25" y="29" width="12" height="12" fill={E.lime}/><text x="46" y="40" fontSize="13" fontWeight="700" letterSpacing="2" fill={E.white}>PILIHAN AKHIR PEKAN</text>
  <g fill={E.white} opacity={1-decorative} fontFamily="Space" fontWeight={headingWeight}><text x={29+15*misalign} y={108+12*misalign} fontSize={44+12*titleProblem} letterSpacing={-2-titleProblem}>PROMO</text><text x={29+15*misalign} y={148+12*misalign} fontSize={32+10*titleProblem} letterSpacing={-1-titleProblem}>AKHIR PEKAN.</text></g>
  <g fill={E.white} opacity={decorative} textAnchor="middle" fontFamily="WeddingScript" fontWeight="400"><text x="210" y="112" fontSize="94">Promo</text><text x="210" y="176" fontSize="74">Akhir Pekan</text></g>
  <path d="M31 166H103" stroke={E.olive} strokeWidth="4"/><rect x="365" y="28" width="24" height="12" fill={E.olive} opacity=".7"/>
  <rect x="23" y="187" width="374" height="175" rx="3" fill={E.lime}/>
  <text x="35" y="218" fontSize="17" fontFamily="Space" fontWeight="600" letterSpacing="2" fill={E.charcoal}>HEMAT HINGGA</text>
  <g fill={E.charcoal}><text x={x} y={y} fontSize={size} fontFamily="Space" fontWeight={problem>0?Math.round(500+200*Math.max(weight,discountFix)):700} letterSpacing="-9" opacity={1-black}>50%</text><text x={x} y={y} fontSize={size} fontFamily="PosterBlack" fontWeight="400" letterSpacing="-3" opacity={black}>50%</text></g>
  {[false,true].map((bad,i)=><g key={i} fill={E.white} opacity={bad?mixedInfo:1-mixedInfo} fontFamily={bad?'PosterSerif':'Space'} fontWeight={bad?400:500}><text x={infoX} y={infoY} fontSize={infoSize}>Pilihan favoritmu.</text><text x={infoX} y={442+15*misalign} fontSize={16-2*infoProblem} letterSpacing={1+misalign}>JUMAT — MINGGU</text><text x="210" y="500" fontSize={17-2*infoProblem} textAnchor="middle" letterSpacing={2+misalign}>LIHAT PROMONYA</text></g>)}
  <rect x="29" y="471" width="360" height="47" fill="none" stroke={E.white} strokeWidth="1"/><text x="30" y="546" fontSize="9" letterSpacing="1.5" fill={E.white}>PERIODE TERBATAS · SYARAT BERLAKU</text>
  {focus&&<rect x={focus==='discount'?145:17} y={focus==='title'?58:focus==='discount'?246:390} width={focus==='discount'?252:386} height={focus==='title'?122:focus==='discount'?105:75} fill="none" stroke={E.lime} strokeWidth="2" strokeDasharray="7 5"/>}
 </svg></div>;
};
