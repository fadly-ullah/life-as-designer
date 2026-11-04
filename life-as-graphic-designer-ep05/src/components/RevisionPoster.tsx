import React from 'react';
import {interpolateColors} from 'remotion';
import {TypographyPoster} from './TypographyPoster';
import {E} from '../data/episodeColors';
const mix=(a:number,b:number,p:number)=>a+(b-a)*p;
export type RevisionProps={enlarge?:number;contrast?:number;cta?:number;clutter?:number;style?:React.CSSProperties};
/** Persistent EP04 artwork; only discount, contrast and CTA grouping are revised. */
export const RevisionPoster:React.FC<RevisionProps>=({enlarge=0,contrast=0,cta=0,clutter=0,style})=>{
 const infoMove=Math.min(1,Math.max(0,(cta-.15)/.6));const infoOpacity=cta<.15?1-cta/.15:cta>.85?(cta-.85)/.15:0;
 const background=contrast>=.5?E.charcoal:E.lime;const ink=contrast>=.5?E.white:E.charcoal;const label=contrast>=.5?E.lime:E.charcoal;
 return <div data-poster-artwork style={{position:'relative',height:'100%',width:'100%',overflow:'hidden',background:E.charcoal,...style}}><TypographyPoster/><svg viewBox="0 0 420 560" width="100%" height="100%" preserveAspectRatio="none" style={{position:'absolute',inset:0,overflow:'hidden'}} aria-label="Revisi terarah pada poster promo yang sama">
  <rect x="0" y="178" width="420" height="382" fill={E.charcoal}/>
  <rect x="23" y={mix(187,180,enlarge)} width="374" height={mix(175,210,enlarge)} rx="3" fill={background} stroke={E.lime} strokeWidth={contrast*3}/>
  <text x="35" y={mix(218,207,enlarge)} fontFamily="Space" fontSize="17" fontWeight="600" letterSpacing="2" fill={label}>HEMAT HINGGA</text>
  <text x={mix(33,30,enlarge)} y={mix(344,369,enlarge)} fontFamily="Space" fontSize={mix(139,194,enlarge)} fontWeight="700" letterSpacing={mix(-9,-11,enlarge)} fill={ink}>50<tspan fontSize={mix(139,110,enlarge)} dx={enlarge*5} dy={-enlarge*12}>%</tspan></text>
  <g opacity={infoOpacity} fontFamily="Space" fill={E.white} fontWeight="500"><text x="30" y={mix(411,489,infoMove)} fontSize="22">Pilihan favoritmu.</text><text x="30" y={mix(442,517,infoMove)} fontSize="16" letterSpacing="1">JUMAT — MINGGU</text></g>
  <rect x="29" y={mix(471,407,cta)} width="360" height={mix(47,53,cta)} fill={E.lime} fillOpacity={cta} stroke={interpolateColors(cta,[0,1],[E.white,E.lime])} strokeWidth="1"/>
  <text x="210" y={mix(500,441,cta)} textAnchor="middle" fontFamily="Space" fontSize={mix(17,19,cta)} fontWeight={mix(600,700,cta)} letterSpacing="2" fill={cta>.55?E.charcoal:E.white}>LIHAT PROMONYA</text>
  <text x="30" y="546" fontFamily="Space" fontSize="9" letterSpacing="1.5" fill={E.white}>PERIODE TERBATAS · SYARAT BERLAKU</text>
  <g opacity={clutter} fontFamily="Space" fontWeight="700"><path d="M-20 70L300 40L326 167L0 200Z" fill="#D8558C"/><text x="32" y="128" fontSize="56" fill="#F1DD3B" transform="rotate(-6 32 128)">PROMO! PROMO!</text><circle cx="340" cy="282" r="90" fill="#4CB6C8"/><text x="260" y="290" fontSize="34" fill={E.charcoal}>SPESIAL!</text><path d="M-10 390L440 430L430 500L-20 455Z" fill="#E0784B"/><text x="5" y="450" fontSize="50" fill="#F1DD3B" transform="rotate(5 5 450)">BURUAN! HEMAT!</text><path d="M34 200L43 218L63 221L48 235L51 254L34 246L17 254L20 235L5 221L25 218Z" fill={E.lime}/></g>
 </svg></div>;
};
