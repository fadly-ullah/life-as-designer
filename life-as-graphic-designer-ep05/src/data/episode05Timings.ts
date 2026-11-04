import metadata from './audioMetadata.json';
export const FPS=30;
export const DURATION=metadata.durationInFrames;
export const sceneStarts=[0, 9.293167, 20.604792, 30.4888545, 40.9257705, 45.369].map(s=>Math.round(s*FPS));
export const sceneEnds=[...sceneStarts.slice(1),DURATION];
export const sceneLengths=sceneStarts.map((s,i)=>sceneEnds[i]-s);
export const beat={
  "sent": 0.16,
  "feedback": 3.153333,
  "confused": 5.422292,
  "kick": 7.872042,
  "back": 9.142667,
  "minimal": 9.443667,
  "busy": 11.0595,
  "thinking": 12.920208,
  "ornaments": 14.49725,
  "colors": 16.308458,
  "other": 17.127333,
  "clutter": 18.423125,
  "stop": 20.736542,
  "ask": 23.587125,
  "answer": 27.008125,
  "clear": 30.626792,
  "enlarge": 32.133167,
  "contrast": 33.645125,
  "cta": 34.646042,
  "focus": 36.706708,
  "simple": 39.1695,
  "resend": 41.032958,
  "approved": 42.470792,
  "relief": 44.186208,
  "again": 45.492333,
  "deadline": 47.239625,
  "shock": 48.58175,
  "waduh": 50.174167,
  "ep6": 50.766,
  "oneHour": 51.889458,
  "sting": 52.960125
} as const;
export const localBeat=(i:number,s:number)=>Math.round(s*FPS)-sceneStarts[i];
