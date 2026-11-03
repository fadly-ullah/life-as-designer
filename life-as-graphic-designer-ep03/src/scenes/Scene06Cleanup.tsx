import React from 'react';
import {useCurrentFrame} from 'remotion';
import {SceneLabel,Headline} from '../components/SceneCamera';
import {EditorialShot} from '../components/EditorialShot';
import {PosterWorkspace} from '../components/PosterWorkspace';
import {PromoPoster} from '../components/PromoPoster';
import {ShotCharacter} from '../components/ShotCharacter';
import {beat,localBeat} from '../data/episode03Timings';
import {E} from '../data/episodeColors';
import {ramp} from '../utils/animations';
export const Scene06Cleanup:React.FC=()=>{
 const f=useCurrentFrame();const remove=ramp(f,localBeat(5,beat.remove),localBeat(5,beat.remove)+18);const order=ramp(f,localBeat(5,beat.reorder),localBeat(5,beat.reorder)+37);
 return <EditorialShot><SceneLabel number="06">CEK KONTRAS / RAPIKAN PRIORITAS</SceneLabel><Headline size={94}>{order>.3?<>ATUR ULANG<br/><span style={{background:E.lime}}>PRIORITASNYA.</span></>:<>BUANG YANG<br/>NGGAK PERLU.</>}</Headline>
  {[false,true].map((after,i)=><div key={i} style={{position:'absolute',left:90,top:665+i*220,width:280,height:195,padding:15,border:`1px solid ${E.line}`,borderRadius:14,background:E.white}}><div style={{fontSize:20,letterSpacing:2,fontWeight:700,marginBottom:10}}>{after?'SETELAH':'SEBELUM'}</div><div data-poster-artwork style={{height:102,overflow:'hidden',position:'relative',background:after?E.charcoal:'#8FC44C',color:after?E.white:'#F1D548',display:'grid',placeItems:'center',fontSize:54,fontWeight:700,letterSpacing:-2}}>PROMO</div><div style={{fontSize:19,color:E.darkOlive,marginTop:8}}>{after?'Lebih mudah dibaca.':'Teksnya tenggelam.'}</div></div>)}
  <PosterWorkspace base={1} text={1} offer={1} olive={1} chaos={.35*(1-remove)} cleanup={order} style={{left:430,top:640,width:540,height:675}} label="Cleanup / Contrast and hierarchy"/>
  <ShotCharacter scene={5} x={125} y={1060} width={250}/>
 </EditorialShot>;
};
