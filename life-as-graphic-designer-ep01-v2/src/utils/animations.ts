import {Easing, interpolate, spring} from 'remotion';
export const clamp = {extrapolateLeft:'clamp',extrapolateRight:'clamp'} as const;
export const ease = Easing.bezier(0.22, 1, 0.36, 1);
export const enter = (f:number, delay=0) => spring({fps:30,frame:f-delay,config:{damping:18,stiffness:160,mass:.85}});
export const ramp = (f:number,a:number,b:number) => interpolate(f,[a,b],[0,1],{...clamp,easing:ease});
export const bob = (f:number,offset=0,amount=4) => Math.sin(f/24+offset)*amount;
