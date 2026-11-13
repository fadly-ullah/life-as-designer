import React,{useEffect,useMemo} from 'react';
import {useCurrentFrame,useVideoConfig} from 'remotion';
import {useThree} from '@react-three/fiber';
import {createEditorTexture} from './EditorTexture';
type V=[number,number,number];
const Box=({position,size,color='#302e26'}:{position:V;size:V;color?:string})=><mesh castShadow receiveShadow position={position}><boxGeometry args={size}/><meshStandardMaterial color={color} roughness={0.88}/></mesh>;
function Camera(){const {camera}=useThree();const f=useCurrentFrame();const {fps}=useVideoConfig();camera.position.set(5.2-f/fps*.055,4.1,7.2-f/fps*.09);camera.lookAt(0,1.55,0);camera.updateMatrixWorld();return null;}
export const Workspace=()=>{
 const f=useCurrentFrame();const {fps}=useVideoConfig();const playback=[1,5,10,15][Math.min(3,Math.floor(f/(fps*1.5)))];
 const texture=useMemo(()=>createEditorTexture(playback,playback>=15),[playback]);
 useEffect(()=>()=>texture.dispose(),[texture]);
 const vibration=f<30?Math.sin(f*2.1)*.012:0;
 return <><Camera/><color attach="background" args={['#181b17']}/><ambientLight intensity={0.55}/>
 <directionalLight castShadow position={[-3,6,4]} intensity={2.4} color="#ffe0aa" shadow-mapSize={[2048,2048]} shadow-camera-left={-7} shadow-camera-right={7} shadow-camera-top={7} shadow-camera-bottom={-7} shadow-normalBias={.03}/>
 <pointLight position={[1,3,-2]} color="#b6ce91" intensity={10}/>
 <Box position={[0,-.12,0]} size={[12,.2,12]} color="#292e25"/>
 <Box position={[0,2,-2.4]} size={[12,4,.2]} color="#33362e"/>
 <Box position={[-3.1,2,0]} size={[.2,4,5]} color="#262b23"/>
 <Box position={[0,1.35,0]} size={[3.7,.18,1.7]} color="#76634c"/>
 <Box position={[-1.55,.64,0]} size={[.13,1.3,1.4]}/><Box position={[1.55,.64,0]} size={[.13,1.3,1.4]}/>
 <Box position={[.25,1.49,-.48]} size={[.8,.08,.4]} color="#171b16"/>
 <Box position={[.25,1.8,-.48]} size={[.12,.65,.12]} color="#171b16"/>
 <Box position={[.25,2.25,-.52]} size={[2.35,1.48,.12]} color="#11140f"/>
 <mesh position={[.25,2.25,-.452]}><planeGeometry args={[2.22,1.385]}/><meshBasicMaterial map={texture}/></mesh>
 <Box position={[.1,1.48,.36]} size={[1.25,.05,.38]} color="#20251d"/>
 {Array.from({length:12},(_,i)=><Box key={i} position={[-.43+i*.09,1.516,.37]} size={[.065,.018,.24]} color={i===0?'#B4CE43':'#666957'}/>)}
 <Box position={[1.04,1.49,.4]} size={[.2,.08,.29]} color="#acb39b"/>
 <group position={[-1.17+vibration,1.47,.38]} rotation={[-Math.PI/2,0,-.17]}>
 <Box position={[0,0,0]} size={[.35,.68,.045]} color="#10150f"/>
 <mesh position={[0,0,.024]}><planeGeometry args={[.29,.58]}/><meshStandardMaterial color="#B4CE43" emissive="#B4CE43" emissiveIntensity={.18}/></mesh>
 <Box position={[0,.12,.03]} size={[.22,.045,.006]} color="#27331d"/>
 </group>
 <Box position={[-1.48,1.48,-.48]} size={[.3,.08,.3]} color="#131910"/>
 <Box position={[-1.48,1.95,-.48]} size={[.055,.9,.055]} color="#33372a"/>
 <mesh position={[-1.48,2.43,-.45]} rotation={[.4,0,0]} castShadow><coneGeometry args={[.24,.28,8,1,true]}/><meshStandardMaterial color="#262c20" roughness={.9}/></mesh>
 <pointLight position={[-1.48,2.3,-.3]} color="#ffd28a" intensity={3}/>
 <Box position={[0,.9,1.38]} size={[.95,.18,.8]} color="#34382f"/>
 <Box position={[0,1.4,1.72]} size={[1,.95,.17]} color="#34382f"/>
 <Box position={[0,.45,1.38]} size={[.1,.8,.1]} color="#171b16"/>
 <Box position={[0,.12,1.38]} size={[1,.09,.7]} color="#171b16"/>
 <Box position={[-1.5,2.9,-2.18]} size={[2,.1,.4]} color="#76634c"/>
 {[0,1,2,3].map(i=><Box key={i} position={[-2+i*.24,3.15,-2.18]} size={[.18,.4+i*.04,.22]} color={i===2?'#B4CE43':'#b4ab90'}/>)}
 <Box position={[1.85,.7,-1.8]} size={[.7,1.4,.65]} color="#494c3d"/>
 </>;
};
