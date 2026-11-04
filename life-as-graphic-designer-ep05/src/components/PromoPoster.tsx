import React from 'react';
import {interpolateColors} from 'remotion';
import {E} from '../data/episodeColors';
import {Sketch} from './Sketch';
export const FAVORITES=['#8FC44C','#F1D548','#E84C93','#49C2D0','#EC6651'];
const mix=(a:string,b:string,p:number)=>interpolateColors(Math.min(1,Math.max(0,p)),[0,1],[a,b]);
const lerp=(a:number,b:number,p:number)=>a+(b-a)*p;
export type PosterProps={apply?:number;chaos?:number;base?:number;text?:number;offer?:number;olive?:number;cleanup?:number;wedding?:boolean;palette?:number;style?:React.CSSProperties};
/** One continuous fictional poster. Conflicting colors are clipped to this artwork. */
export const PromoPoster:React.FC<PosterProps>=({apply=1,chaos=1,base=0,text=0,offer=0,olive=0,cleanup=0,wedding=false,palette=0,style})=>{
 const mess=chaos*(1-cleanup);const paper=mix(FAVORITES[0],E.charcoal,base);
 const ink=mix(FAVORITES[1],E.white,text);const primary=mix(FAVORITES[0],E.charcoal,offer);
 const font=wedding?'WeddingScript, cursive':'Space, sans-serif';
 return <div data-poster-artwork style={{position:'relative',width:'100%',height:'100%',background:E.white,overflow:'hidden',...style}}>
  <div style={{position:'absolute',inset:0,opacity:1-apply}}><Sketch variant={1}/></div>
  <svg viewBox="0 0 420 560" width="100%" height="100%" preserveAspectRatio="none" style={{position:'absolute',inset:0,opacity:apply,overflow:'hidden'}} role="img" aria-label={wedding?'Poster promo dengan font script yang menyerupai undangan':cleanup>.9?'Poster promo rapi: diskon 50 persen sebagai fokus utama':'Poster dengan lima warna yang saling berebut perhatian'}>
   <rect width="420" height="560" fill={paper}/>
   <g opacity={mess}>
    <path d="M-20 62L310 32L328 176L0 204Z" fill={FAVORITES[2]}/>
    <path d="M-10 225L450 255L435 350L-25 305Z" fill={FAVORITES[1]}/>
    <circle cx="340" cy="365" r="114" fill={FAVORITES[3]}/>
    <path d="M-20 449L445 420L450 547L0 560Z" fill={FAVORITES[4]}/>
    <text x="234" y="430" fontSize="43" fontWeight="700" fill={FAVORITES[2]} transform="rotate(12 234 430)">BURUAN!</text>
    <text x="34" y="491" fontSize="50" fontWeight="700" fill={FAVORITES[1]} transform="rotate(-7 34 491)">PROMO! PROMO!</text>
   </g>
   <rect x="25" y="29" width="12" height="12" fill={mix(FAVORITES[2],E.lime,text)}/>
   <text x="46" y="40" fontSize="13" fontWeight="700" letterSpacing="2" fill={ink}>PILIHAN AKHIR PEKAN</text>
   {!wedding?<g fill={ink} fontWeight="700"><text x="29" y="108" fontSize="44" letterSpacing="-2">PROMO</text><text x="29" y="148" fontSize="32" letterSpacing="-1">AKHIR PEKAN.</text></g>:<g fill={E.white} textAnchor="middle" fontFamily={font}><text x="210" y="93" fontSize="66">Promo</text><text x="210" y="150" fontSize="56">Akhir Pekan</text></g>}
   <rect x="23" y={lerp(228,187,cleanup)} width="374" height={lerp(118,175,cleanup)} rx={3} fill={E.lime} opacity={offer}/>
   <text x={wedding?210:35} y={lerp(243,218,cleanup)} textAnchor={wedding?'middle':'start'} fontFamily={font} fontWeight={wedding?400:600} fontSize={wedding?32:17} letterSpacing={wedding?0:2} fill={mix(FAVORITES[2],E.charcoal,offer)}>{wedding?'Hemat hingga':'HEMAT HINGGA'}</text>
   <text x={wedding?210:lerp(92,33,cleanup)} y={lerp(330,344,cleanup)} textAnchor={wedding?'middle':'start'} fontFamily={font} fontWeight={wedding?400:700} fontSize={wedding?145:lerp(88,139,cleanup)} letterSpacing={wedding?-3:-9} fill={primary}>50%</text>
   <g opacity={cleanup} fill={E.white}>
    <text x="30" y="411" fontSize={wedding?34:22} fontFamily={font}>Pilihan favoritmu.</text>
    <text x="30" y="442" fontSize="16" letterSpacing="1">JUMAT — MINGGU</text>
    <rect x="29" y="471" width="360" height="47" fill="none" stroke={E.white} strokeWidth="1"/>
    <text x="210" y="500" fontSize={wedding?30:17} fontFamily={font} fontWeight={wedding?400:600} letterSpacing={wedding?0:2} textAnchor="middle">{wedding?'Lihat promonya':'LIHAT PROMONYA'}</text>
    <text x="30" y="546" fontSize="9" letterSpacing="1.5">PERIODE TERBATAS · SYARAT BERLAKU</text>
   </g>
   <path d="M31 166H103" stroke={E.olive} strokeWidth="4" opacity={olive}/>
   <rect x="365" y="28" width="24" height="12" fill={E.olive} opacity={olive*.7}/>
  </svg>
  {palette>0&&<div style={{position:'absolute',inset:0,background:E.white,padding:'9%',display:'flex',flexDirection:'column',justifyContent:'center'}}><div style={{fontSize:22,fontWeight:700,marginBottom:25,letterSpacing:2}}>COLOR STUDY / 05</div><div style={{display:'flex',height:'45%',gap:5,alignItems:'stretch'}}>{FAVORITES.map((c,i)=><div key={c} style={{flex:1,background:c,opacity:Math.min(1,Math.max(0,palette-i)),transform:`translateY(${(1-Math.min(1,Math.max(0,palette-i)))*35}px)`}}/>)}</div><div style={{fontSize:16,letterSpacing:2,marginTop:25}}>LIMA WARNA FAVORIT</div></div>}
 </div>;
};
