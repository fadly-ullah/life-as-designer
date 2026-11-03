import {existsSync,readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const preview=process.argv.includes('--preview');
const voice='public/audio/ep01-voiceover.mp3';
if(!existsSync(voice))throw new Error(`Final V2 render blocked: latest VO is missing at ${voice}. The copied original VO must not be presented as the new recording.`);
const hash=createHash('sha256').update(readFileSync(voice)).digest('hex');
const metadata=JSON.parse(readFileSync('src/data/audioMetadata.json','utf8'));
if(metadata.sourcePath!==voice||metadata.sourceSha256!==hash)throw new Error('Final V2 render blocked: metadata/timeline have not been regenerated for the latest VO.');
if(!existsSync('src/data/voice-alignment.json'))throw new Error('Final V2 render blocked: scene and subtitle alignment for the latest VO has not been reviewed.');
const alignment=JSON.parse(readFileSync('src/data/voice-alignment.json','utf8'));
if(alignment.sourceSha256!==hash||alignment.status!=='reviewed')throw new Error('Final V2 render blocked: alignment must match the latest recording and be reviewed.');
await import('./check-identity.mjs');
if(!existsSync('out/visual-comparison.json'))throw new Error('Render blocked: three visual comparison frames have not been reviewed.');
const visual=JSON.parse(readFileSync('out/visual-comparison.json','utf8'));
if(visual.status!=='passed'||visual.pairs.length!==3||visual.sourceSha256!==hash)throw new Error('Render blocked: comparison review must match this VO and include three frames.');
if(!preview){
 if(!existsSync('out/preview-approval.json'))throw new Error('Final 1080x1920 render blocked: the complete 540x960 preview needs explicit user approval.');
 const approval=JSON.parse(readFileSync('out/preview-approval.json','utf8'));
 const previewFile='out/LifeAsGraphicDesigner_EP01_V2_preview.mp4';
 if(!existsSync(previewFile))throw new Error('Final render blocked: no complete preview exists.');
 const previewHash=createHash('sha256').update(readFileSync(previewFile)).digest('hex');
 if(approval.approved!==true||approval.previewSha256!==previewHash||approval.sourceSha256!==hash)throw new Error('Final render blocked: approval does not match this preview/voice.');
}
console.log(`Latest VO, timing, original identity and three comparisons verified for ${preview?'540x960 preview':'approved final'}.`);
