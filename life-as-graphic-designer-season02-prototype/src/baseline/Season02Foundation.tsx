import React from 'react';
import {useCurrentFrame} from 'remotion';
import {PixelCharacter} from '../characters/PixelCharacter';
import {EditorialFrame,shotAt} from '../components/EditorialFrame';
import {PixelDesk} from '../components/PixelDesk';
import {PixelComputer} from '../components/PixelComputer';
import {VideoInterface} from '../components/VideoInterface';
import {E} from '../data/episodeColors';
/** Newly adapted Season 01 foundation; never presented as a recovered S02 prototype. */
export const Season02Foundation:React.FC=()=>{
 const f=useCurrentFrame();const shot=shotAt(f);
 return <EditorialFrame frame={f}>
  <PixelComputer style={{left:490,top:740,width:480,height:365}} label="Video klien"><VideoInterface frame={f} editing={shot===3} simple/></PixelComputer>
  <div style={{position:'absolute',left:145,top:770}}><PixelCharacter width={410} seated action={shot===0?'reading':shot===1?'confused':shot===2?'thinking':'typing'}/></div>
  <PixelDesk style={{top:1080}}/>
  {f>=15&&f<120&&<div style={{position:'absolute',left:480,top:590,width:500,padding:28,border:`2px solid ${E.line}`,background:E.white,borderRadius:20}}><div style={{fontSize:22,color:E.darkOlive,letterSpacing:2,marginBottom:18}}>KLIEN</div><div style={{fontSize:38,fontWeight:600,lineHeight:1.2}}>Views-nya masih sepi.<br/>Bisa dibantu cek?</div></div>}
 </EditorialFrame>;
};
