// PROVISIONAL story allocation. Actual VO length verified with FFprobe.
// Phrase alignment and recorded wording have NOT been verified.
export const audioMetadata={path:'audio/s02-ep01-voiceover.wav',durationSeconds:45.170958,sampleRate:24000,channels:1};
export const timingStatus='provisional-not-VO-synchronized' as const;
export const episode01Timings=[
 {id:1,start:0,end:5,title:'Negative hook',action:'Phone vibrates; glance; confused brow',camera:'Three-quarter dolly to phone, then face',sfx:['vibration','notification','comedic-accent']},
 {id:2,start:5,end:13,title:'Client problem',action:'Read physical phone; turn attention toward monitor',camera:'Lateral track phone to monitor',sfx:['message-open','mouse-click','playback']},
 {id:3,start:13,end:23,title:'Delayed product',action:'Watch 01 / 05 / 10 / 15 seconds; surprise; settle',camera:'Monitor close-up, reaction cut',sfx:['ticks','scratch','impact']},
 {id:4,start:23,end:33,title:'Diagnosis',action:'Scrub opening; mark late product and unclear benefit',camera:'Over shoulder to monitor',sfx:['scrub','click','confirmation']},
 {id:5,start:33,end:40,title:'Prepare edit',action:'Select first clip; return playhead to zero; no completed fix',camera:'Push toward timeline',sfx:['click','typing','transition']},
 {id:6,start:40,end:45.170958,title:'Cliffhanger',action:'Highlight first 3 seconds; EP02: 3 DETIK PERTAMA; @fadly_hisbullah',camera:'Slow push; hold',sfx:['soft-transition']},
] as const;
