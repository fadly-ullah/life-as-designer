import React from 'react';
import {Episode05Character} from '../characters/Episode05Character';
export const ShotCharacter:React.FC<{scene:number;x?:number;y?:number;width?:number;seated?:boolean}>=({scene,x=100,y=1010,width=285,seated=false})=><div style={{position:'absolute',left:x,top:y}}><Episode05Character sceneIndex={scene} width={width} seated={seated}/></div>;
