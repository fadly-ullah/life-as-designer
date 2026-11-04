import React from 'react';
import {Episode07Character} from '../characters/Episode07Character';
export const ShotCharacter:React.FC<{scene:number;x?:number;y?:number;width?:number;seated?:boolean}>=({scene,x=100,y=1010,width=285,seated=false})=><div style={{position:'absolute',left:x,top:y}}><Episode07Character sceneIndex={scene} width={width} seated={seated}/></div>;
