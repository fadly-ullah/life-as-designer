import metadata from './audioMetadata.json';
export const FPS=30;
export const DURATION=metadata.durationInFrames;
export const sceneStarts=[0, 12.92, 28.62, 41.6, 49.58, 57.08].map(s=>Math.round(s*FPS));
export const sceneEnds=[...sceneStarts.slice(1),DURATION];
export const sceneLengths=sceneStarts.map((s,i)=>sceneEnds[i]-s);
export const beat={
  "morning": 0.100839,
  "notification": 1.659025,
  "open": 4.146621,
  "approval": 6.569546,
  "thanks": 7.783696,
  "disbelief": 8.766372,
  "accepted": 9.300748,
  "joy": 10.239501,
  "onePoster": 13.084717,
  "seven": 14.825374,
  "brief": 16.747324,
  "pinterest": 18.106259,
  "color": 19.31941,
  "font": 20.51254,
  "feedback": 22.331837,
  "freeze": 24.169615,
  "suffering": 26.759841,
  "lesson": 28.855374,
  "learn": 30.075828,
  "problem": 32.026372,
  "audience": 36.478571,
  "message": 37.899977,
  "priority": 39.363832,
  "decisions": 41.758798,
  "decisionsEnd": 45.619524,
  "revision": 45.935805,
  "listen": 48.355828,
  "finish": 49.68746,
  "project": 50.688186,
  "singlePoster": 52.104286,
  "lessons": 53.134875,
  "journey": 54.513039,
  "season2": 57.210884,
  "price": 58.816599,
  "portfolio": 59.731474,
  "firstClient": 60.598776,
  "comment": 62.179751,
  "goodbye": 63.697234,
  "sting": 65.35
} as const;
export const localBeat=(i:number,s:number)=>Math.round(s*FPS)-sceneStarts[i];
