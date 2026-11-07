import React from 'react';
import {AbsoluteFill,Sequence,useCurrentFrame,useVideoConfig} from 'remotion';
import {EditorialFrame} from '../components/EditorialFrame';
import {PixelComputer} from '../components/PixelComputer';
import {MonitorContent} from '../components/MonitorContent';
import {ClientNotification} from '../components/ClientNotification';
import {RoomSurfaces,Chair,DeskBack,DeskFront,Keyboard,PhoneStand} from '../components/WorkspaceDepth';
import {RigPerformer,performerAt} from '../characters/RigPerformer';
import {TimelineForeground} from '../components/EditingTimeline';
import {cameraAt,phase} from '../utils/motion';

export const ContinuousWorkspace:React.FC<{frame:number}>=({frame})=>{
 const cam=cameraAt(frame);const actor=performerAt(frame);const titlePhase=phase(frame,360,384);
 return <div data-workspace-frame={frame} style={{position:'absolute',inset:0}}><EditorialFrame frame={frame} motion>
  <div data-camera-scale={cam.scale.toFixed(5)} data-camera-x={cam.x.toFixed(4)} data-camera-y={cam.y.toFixed(4)} style={{position:'absolute',inset:0,transform:`translate(${cam.x}px,${cam.y}px) scale(${cam.scale})`,transformOrigin:'540px 1040px'}}>
   <RoomSurfaces cameraX={cam.x} cameraY={cam.y}/>
   <Chair/><DeskBack/>
   <PixelComputer style={{left:500,top:705,width:470,height:365}} label="Video klien / Opening"><MonitorContent frame={frame}/></PixelComputer>
   <Keyboard frame={frame}/><PhoneStand/>
   <RigPerformer frame={frame}/><DeskFront/>
   <ClientNotification frame={frame}/><TimelineForeground frame={frame}/>
  </div>
  <div data-title-reveal={titlePhase.toFixed(4)} data-body-pose={actor.body} data-face-pose={actor.face}/>
 </EditorialFrame></div>;
};
export const Shot01Notification:React.FC=()=> <ContinuousWorkspace frame={useCurrentFrame()}/>;
export const Shot02Reaction:React.FC=()=> <ContinuousWorkspace frame={useCurrentFrame()+120}/>;
export const Shot03Analysis:React.FC=()=> <ContinuousWorkspace frame={useCurrentFrame()+240}/>;
export const Shot04Editing:React.FC=()=> <ContinuousWorkspace frame={useCurrentFrame()+360}/>;
export const Season02PrototypeV2:React.FC=()=>{
 const f=useCurrentFrame();const {fps}=useVideoConfig();
 return <AbsoluteFill data-prototype-root="v2" data-current-frame={f} data-duration-frames="450" data-fps="30">
  <Sequence name="01 / Notification" from={0} durationInFrames={4*fps} premountFor={fps}><Shot01Notification/></Sequence>
  <Sequence name="02 / Reaction and decision" from={4*fps} durationInFrames={4*fps} premountFor={fps}><Shot02Reaction/></Sequence>
  <Sequence name="03 / Weak opening" from={8*fps} durationInFrames={4*fps} premountFor={fps}><Shot03Analysis/></Sequence>
  <Sequence name="04 / Editing and Season 02" from={12*fps} durationInFrames={3*fps} premountFor={fps}><Shot04Editing/></Sequence>
 </AbsoluteFill>;
};
