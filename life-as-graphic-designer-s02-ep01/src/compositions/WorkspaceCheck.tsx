import React from 'react';
import {AbsoluteFill,useVideoConfig} from 'remotion';
import {ThreeCanvas} from '@remotion/three';
import {Workspace} from '../components/Workspace';
export const WorkspaceCheck=()=>{const {width,height}=useVideoConfig();return <AbsoluteFill style={{background:'#181b17'}}>
 <ThreeCanvas width={width} height={height} shadows camera={{fov:38,near:.1,far:60}} gl={{antialias:true,preserveDrawingBuffer:true}}><Workspace/></ThreeCanvas>
 <div style={{position:'absolute',top:140,left:70,right:70,color:'#F7F5EC',fontFamily:'sans-serif',fontSize:28,letterSpacing:3}}>S02 / EP01 · ENVIRONMENT STUDY</div>
 <div style={{position:'absolute',bottom:250,left:70,right:70,color:'#B4CE43',fontFamily:'sans-serif',fontSize:25,lineHeight:1.5}}>ENVIRONMENT ONLY<br/>Karakter belum tersedia · timing provisional</div>
 </AbsoluteFill>};
