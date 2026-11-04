import metadata from './audioMetadata.json';
export const FPS=30;
export const DURATION=metadata.durationInFrames;
export const sceneStarts=[0, 6.65, 21.09, 31.37, 40.64, 48.45].map(s=>Math.round(s*FPS));
export const sceneEnds=[...sceneStarts.slice(1),DURATION];
export const sceneLengths=sceneStarts.map((s,i)=>sceneEnds[i]-s);
export const beat={
  "deadline": 0.296542,
  "app": 2.375292,
  "freeze": 3.812125,
  "shock": 4.991083,
  "night": 6.865917,
  "clientDeadline": 8.043625,
  "click1": 9.901,
  "click2": 11.125667,
  "silent": 12.4275,
  "sulk": 14.07375,
  "problem": 15.634833,
  "unsaved": 16.797125,
  "worry": 18.825708,
  "restart": 21.242125,
  "hope": 23.08,
  "reveal": 25.439625,
  "recovery": 26.997625,
  "relief": 28.799417,
  "urgent": 31.638083,
  "checkInfo": 33.319,
  "checkDiscount": 34.1,
  "layout": 35.1,
  "dimensions": 35.977,
  "export": 37.12,
  "exported": 38.35,
  "details": 38.529833,
  "upload": 40.789625,
  "loading": 41.6365,
  "sent": 42.508458,
  "sigh": 43.457375,
  "beforeDeadline": 45.34225,
  "rest": 46.751125,
  "morning": 48.587,
  "notification": 50.267375,
  "accepted": 51.504042,
  "revisions": 52.969667,
  "ep7": 54.233542,
  "sting": 56.5
} as const;
export const localBeat=(i:number,s:number)=>Math.round(s*FPS)-sceneStarts[i];
