import {Easing,interpolate} from 'remotion';
export const clamp={extrapolateLeft:'clamp',extrapolateRight:'clamp'} as const;
export const smooth=Easing.bezier(.4,0,.2,1);
export const phase=(f:number,a:number,b:number)=>interpolate(f,[a,b],[0,1],{...clamp,easing:smooth});
export const rigClock=(f:number)=>Math.round(31+f*.72);
const keys=[{f:0,x:0,y:0,s:1},{f:100,x:-12,y:4,s:1.045},{f:120,x:-12,y:4,s:1.045},{f:172,x:32,y:-6,s:1.075},{f:225,x:32,y:-6,s:1.075},{f:295,x:-44,y:-10,s:1.13},{f:352,x:-44,y:-10,s:1.13},{f:414,x:-18,y:2,s:1.06},{f:449,x:-18,y:2,s:1.06}];
/** Continuous position/speed at shot boundaries. No shake or rotation. */
export const cameraAt=(f:number)=>{
 const i=Math.max(0,keys.findIndex((k,n)=>n<keys.length-1&&f>=k.f&&f<keys[n+1].f));
 if(f>=449)return {x:-18,y:2,scale:1.06};
 const a=keys[i],b=keys[i+1],p=phase(f,a.f,b.f);
 return {x:a.x+(b.x-a.x)*p,y:a.y+(b.y-a.y)*p,scale:a.s+(b.s-a.s)*p};
};
