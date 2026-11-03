import React from 'react';
import {ThreeCanvas} from '@remotion/three';
import {AbsoluteFill,useCurrentFrame,useVideoConfig} from 'remotion';

export const Preflight3D:React.FC=()=>{
 const frame=useCurrentFrame();const {width,height}=useVideoConfig();
 return <AbsoluteFill style={{background:'#F5F5F7'}}>
  <ThreeCanvas width={width} height={height} camera={{position:[5,4,8],fov:38}} gl={{antialias:true,preserveDrawingBuffer:true}}>
   <ambientLight intensity={1.4}/><directionalLight position={[4,7,8]} intensity={2}/>
   <mesh rotation={[.2,frame/120,0]}><boxGeometry args={[2,2,2]}/><meshStandardMaterial color="#CFD768" roughness={.8}/></mesh>
  </ThreeCanvas>
  <div style={{position:'absolute',left:90,right:90,top:200,fontFamily:'sans-serif',fontSize:46,fontWeight:700,color:'#0D0F0C'}}>3D engine preflight</div>
 </AbsoluteFill>;
};
