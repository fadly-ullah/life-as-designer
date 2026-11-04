import React from 'react';
import {interpolate} from 'remotion';
import {PromoPoster} from './PromoPoster';
import {TypographyPoster} from './TypographyPoster';
import {RevisionPoster} from './RevisionPoster';
import {clamp} from '../utils/animations';
/** Existing three generations of the same artwork; final state equals EP06. */
export const PosterEvolution:React.FC<{progress:number}>=({progress})=>{
 const color=interpolate(progress,[0,.3],[0,1],clamp),font=interpolate(progress,[.56,.64],[0,1],clamp),layout=interpolate(progress,[.69,1],[0,1],clamp);
 const a=interpolate(progress,[.29,.35],[1,0],clamp),c=interpolate(progress,[.64,.69],[0,1],clamp);
 return <div style={{position:'relative',height:'100%',width:'100%'}}>
  {a>0&&<div style={{position:'absolute',inset:0,opacity:a}}><PromoPoster apply={1} chaos={1} base={color} text={color} offer={color} olive={color} cleanup={color}/></div>}
  {progress>=.29&&c<1&&<div style={{position:'absolute',inset:0,opacity:(1-a)*(1-c)}}><TypographyPoster script={1} heavy={1} serif={1} family={font} weight={font} titleFix={font} discountFix={font} infoFix={font} spacing={font}/></div>}
  {c>0&&<div style={{position:'absolute',inset:0,opacity:c}}><RevisionPoster enlarge={layout} contrast={layout} cta={layout}/></div>}
 </div>;
};
