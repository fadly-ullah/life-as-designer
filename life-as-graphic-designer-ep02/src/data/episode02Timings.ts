import metadata from './audioMetadata.json';
export const FPS=30;
export const DURATION=metadata.durationInFrames;
export const sceneStarts=[0, 8.08, 16.16, 17.72, 26.8, 30.82, 38.22, 43.45].map(s=>Math.round(s*FPS));
export const sceneEnds=[...sceneStarts.slice(1),DURATION];
export const sceneLengths=sceneStarts.map((s,i)=>sceneEnds[i]-s);
export const beat={
  "warehouse": 5.63,
  "startSearch": 8.29,
  "found": 11.38,
  "scrollOne": 12.42,
  "better": 13.26,
  "save": 14.26,
  "scrollTwo": 15.12,
  "clock": 16.25,
  "realize": 16.65,
  "many": 17.86,
  "where": 19.24,
  "layout": 21.09,
  "font": 22.36,
  "earlier": 23.41,
  "duh": 24.72,
  "confused": 25.1,
  "stop": 26.96,
  "close": 28.39,
  "brief": 29.57,
  "keywords": 31.0,
  "young": 32.2,
  "bold": 32.91,
  "value": 33.56,
  "selectRefs": 34.24,
  "sketch": 36.39,
  "reject": 38.38,
  "choose": 39.73,
  "color": 41.9,
  "eh": 43.68,
  "green": 44.28,
  "yellow": 44.85,
  "overload": 46.04,
  "disaster": 47.28,
  "ep3": 48.61,
  "sting": 51.45
} as const;
export const localBeat=(i:number,s:number)=>Math.round(s*FPS)-sceneStarts[i];
