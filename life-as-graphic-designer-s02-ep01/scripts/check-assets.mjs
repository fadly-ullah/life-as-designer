import {existsSync,readFileSync} from 'node:fs';
const manifest=JSON.parse(readFileSync('docs/asset-audit.json','utf8'));
console.log('VO:',existsSync('public/audio/s02-ep01-voiceover.wav')?'present':'MISSING');
if(!manifest.approvedCharacter){console.error('BLOCKED: approved rigged character and production pack are missing. No episode render allowed.');process.exitCode=2;}
