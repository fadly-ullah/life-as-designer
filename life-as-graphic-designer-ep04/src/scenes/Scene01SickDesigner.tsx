import React from 'react';
import {useCurrentFrame} from 'remotion';
import {SceneLabel,Headline} from '../components/SceneCamera';
import {EditorialShot} from '../components/EditorialShot';
import {PosterWorkspace} from '../components/PosterWorkspace';
import {ShotCharacter} from '../components/ShotCharacter';
import {PixelDesk} from '../components/PixelDesk';
import {Tissue} from '../components/Tissue';
import {E} from '../data/episodeColors';
import {beat,localBeat} from '../data/episode04Timings';
export const Scene01SickDesigner:React.FC=()=>{
 const f=useCurrentFrame();const working=f>=localBeat(0,beat.colors);
 return <EditorialShot mode="push"><SceneLabel number="01">MEJA YANG SAMA / KONDISI SEDIKIT BEDA</SceneLabel><Headline size={94}>{working?<>WARNA BERES.<br/><span style={{background:E.lime}}>TINGGAL FONT.</span></>:<>PILEK TIPIS.<br/>DESAIN LANJUT.</>}</Headline><PosterWorkspace style={{left:360,top:715,width:600,height:490}} label="Poster EP03 / Lanjut tipografi" cursor={{x:75+Math.min(f,140)*1.8,y:145}}/><ShotCharacter scene={0} x={100} y={980} width={285} seated/><PixelDesk style={{top:1190}}/><Tissue/></EditorialShot>;
};
