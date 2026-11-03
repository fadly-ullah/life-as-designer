import metadata from './audioMetadata.json';
export const FPS = 30;
export const AUDIO_DURATION = metadata.audioDurationSeconds;
export const AUDIO_FRAMES = Math.ceil(AUDIO_DURATION * FPS);
export const ENDING_PADDING = 36;
export const DURATION = AUDIO_FRAMES + ENDING_PADDING;
// Boundaries follow speech pauses, not equally divided storyboard slots.
export const sceneStarts = [0, 8.85, 19.42, 27.34, 34.96, 43.73, 46.28, 51.95].map(s => Math.round(s * FPS));
export const sceneEnds = [...sceneStarts.slice(1), DURATION];
export const sceneLengths = sceneStarts.map((s,i) => sceneEnds[i] - s);
export const localBeat = (scene: number, absoluteSeconds: number) => Math.round(absoluteSeconds * FPS) - sceneStarts[scene];
