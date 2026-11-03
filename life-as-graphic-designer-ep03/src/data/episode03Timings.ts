import metadata from './audioMetadata.json';
export const FPS=30;
export const DURATION=metadata.durationInFrames;
export const sceneStarts=[0, 6.3848525, 15.568934500000001, 23.1907145, 29.7451475, 36.273514500000005, 40.903900500000006, 46.73805].map(s=>Math.round(s*FPS));
export const sceneEnds=[...sceneStarts.slice(1),DURATION];
export const sceneLengths=sceneStarts.map((s,i)=>sceneEnds[i]-s);
export const beat={
  "sketch": 0,
  "colors": 1.357732,
  "eh": 3.262381,
  "disaster": 4.112426,
  "favorites": 6.604603,
  "individual": 9.000726,
  "combine": 11.089796,
  "buset": 12.42551,
  "compete": 13.230476,
  "titleLost": 15.731973,
  "discountLost": 17.011156,
  "confused": 19.28932,
  "scroll": 21.160499,
  "stop": 23.362449,
  "brief": 25.516077,
  "goal": 26.569705,
  "charcoal": 29.924762,
  "cream": 31.469637,
  "lime": 32.536576,
  "olive": 34.606803,
  "sparing": 35.293764,
  "contrast": 36.406349,
  "remove": 37.457755,
  "reorder": 38.887959,
  "success": 41.044558,
  "titleRead": 44.167392,
  "font": 46.879161,
  "fontApply": 48.693356,
  "wedding": 49.473107,
  "waduh": 51.328095,
  "ep4": 52.100884,
  "sting": 54.020249
} as const;
export const localBeat=(i:number,s:number)=>Math.round(s*FPS)-sceneStarts[i];
