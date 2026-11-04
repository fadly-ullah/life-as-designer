import React from 'react';
import {Episode06Character} from '../characters/Episode06Character';
export const ShotCharacter:React.FC<{scene:number;x?:number;y?:number;width?:number;seated?:boolean}>=({scene,x=100,y=1010,width=285,seated=false})=><div style={{position:'absolute',left:x,top:y}}><Episode06Character sceneIndex={scene} width={width} seated={seated}/></div>;
