import {C} from './colors';
// Episode graphics use the requested palette. The character imports the
// unmodified original colors.ts, preserving its exact skin/clothes/hair.
export const E={...C,white:'#F7F5EC',charcoal:'#0B0C0A',lime:'#B4CE43',paper:'#EEEBE3'} as const;
