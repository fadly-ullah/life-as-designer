import React from 'react';
import {interpolate,useCurrentFrame} from 'remotion';
import {SceneLabel,Headline} from '../components/SceneCamera';
import {EditorialShot} from '../components/EditorialShot';
import {PixelComputer} from '../components/PixelComputer';
import {Sketch} from '../components/Sketch';
import {Episode02Character} from '../characters/Episode02Character';
import {beat,localBeat} from '../data/episode02Timings';
import {E} from '../data/episodeColors';
import {ramp,enter,clamp} from '../utils/animations';
export const Scene08ColorDisaster:React.FC=()=>{
 const f=useCurrentFrame();const green=ramp(f,localBeat(7,beat.green),localBeat(7,beat.green)+10);const yellow=ramp(f,localBeat(7,beat.yellow),localBeat(7,beat.yellow)+10);
 const busy=ramp(f,localBeat(7,beat.overload),localBeat(7,beat.disaster));const ending=f>=localBeat(7,beat.ep3);
 return <EditorialShot mode="impact" impactAt={localBeat(7,beat.disaster)}>
  <SceneLabel number={ending?'EP03':'08'}>{ending?'WARNA BAGUS, DESAIN BERANTAKAN':'HIJAU + KUNING / HARUSNYA COCOK'}</SceneLabel>
  <Headline size={ending?84:88}>{ending?<>WARNA BAGUS,<br/>DESAIN BERANTAKAN.</>:busy>.4?<>KOK JADI<br/><span style={{background:E.lime}}>SPANDUK DISKON?!</span></>:<>TINGGAL<br/>PILIH WARNA.</>}</Headline>
  <PixelComputer style={{left:330,top:650,width:630,height:555}} label="Color exploration / Poster promo">
   <div style={{position:'absolute',left:'18%',top:'4%',width:'66%',height:'88%',background:green>.1?'#90C642':E.white,overflow:'hidden',border:`${Math.round(2+busy*8)}px solid ${yellow>.5?'#E8DC26':E.line}`}}>
    <div style={{position:'absolute',inset:0,opacity:1-green}}><Sketch variant={1}/></div>
    <div style={{position:'absolute',inset:0,opacity:green,padding:'26px 20px',textAlign:'center',color:E.charcoal}}>
     <div style={{fontSize:38,fontWeight:700,transform:`rotate(${-busy*4}deg)`,background:yellow>.1?'#F2E03D':'transparent',padding:8}}>HEMAT BANGET!</div>
     <div style={{fontSize:74,fontWeight:700,lineHeight:.9,marginTop:23,letterSpacing:-5}}>DISKON<br/><span style={{fontSize:122}}>50%</span></div>
     <div style={{fontSize:29,fontWeight:700,background:'#F2E03D',padding:10,marginTop:24,opacity:yellow}}>PROMO SPESIAL</div>
     {busy>.05&&<><div style={{position:'absolute',left:-8,right:-8,bottom:38,padding:12,fontSize:39,fontWeight:700,background:'#F2E03D',transform:`rotate(${busy*6}deg)`}}>BURUAN! PROMO!</div><div style={{position:'absolute',left:5,top:175,padding:9,fontSize:19,fontWeight:700,color:E.white,background:E.charcoal,transform:'rotate(-18deg)',opacity:busy}}>SUPER HEMAT</div><div style={{position:'absolute',right:4,top:218,padding:10,fontSize:22,fontWeight:700,background:'#F2E03D',transform:'rotate(12deg)',opacity:busy}}>50% OFF</div></>}
    </div>
   </div>
  </PixelComputer>
  <div style={{position:'absolute',left:100,top:1000}}><Episode02Character sceneIndex={7} width={290}/></div>
  <div style={{position:'absolute',left:600,top:1270,display:'flex',gap:12}}>{[['#90C642','HIJAU',green],['#F2E03D','KUNING',yellow]].map(([c,t,p])=><div key={t} style={{opacity:Number(p),width:150}}><div style={{height:45,background:String(c),border:`1px solid ${E.line}`}}/><div style={{fontSize:18,marginTop:7,letterSpacing:2}}>{t}</div></div>)}</div>
  {ending&&<div style={{position:'absolute',right:90,top:1350,color:E.darkOlive,fontSize:24,fontWeight:600}}>BERSAMBUNG / EPISODE 03</div>}
 </EditorialShot>;
};
