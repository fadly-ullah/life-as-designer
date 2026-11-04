import metadata from './audioMetadata.json';
export const FPS=30;
export const DURATION=metadata.durationInFrames;
export const sceneStarts=[0, 7.1110105, 13.040697999999999, 29.9375625, 43.9999685, 50.120354000000006].map(s=>Math.round(s*FPS));
export const sceneEnds=[...sceneStarts.slice(1),DURATION];
export const sceneLengths=sceneStarts.map((s,i)=>sceneEnds[i]-s);
export const beat={
  "sigh": 0.246521,
  "tired": 1.130021,
  "calm": 3.590042,
  "colors": 4.913917,
  "wedding": 7.311979,
  "intent": 10.240021,
  "decorative": 13.240021,
  "heavy": 15.207229,
  "serif": 16.837229,
  "buset": 19.07,
  "reunion": 20.130063,
  "hardTitle": 22.829979,
  "weakDiscount": 24.619979,
  "invitation": 26.42,
  "bride": 28.280021,
  "resetSigh": 30.13,
  "focus": 30.96,
  "family": 32.72,
  "weight": 34.720062,
  "title": 36.990187,
  "discount": 38.54,
  "info": 40.200292,
  "spacing": 41.850021,
  "success": 44.2,
  "promo": 47.120125,
  "send": 48.722812,
  "reply": 50.320708,
  "feedback": 51.900292,
  "revision": 54.3755,
  "ep5": 56.572708,
  "sting": 59.106
} as const;
export const localBeat=(i:number,s:number)=>Math.round(s*FPS)-sceneStarts[i];
