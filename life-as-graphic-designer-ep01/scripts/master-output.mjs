import {spawnSync} from 'node:child_process';
import {mkdirSync,renameSync,writeFileSync,readFileSync} from 'node:fs';

const source='out/.render-mix.mp4';
const output='out/LifeAsGraphicDesigner_EP01.mp4';
const temporary='out/.mastered.mp4';
const metadata=JSON.parse(readFileSync('src/data/audioMetadata.json','utf8'));
const timelineSeconds=metadata.durationInFrames/metadata.fps;
mkdirSync('out',{recursive:true});
const run=(args)=>{
 const result=spawnSync('ffmpeg',args,{encoding:'utf8',maxBuffer:16*1024*1024});
 if(result.status!==0)throw new Error(result.stderr||result.error?.message||'FFmpeg failed');
 return result.stderr;
};
console.log('Measuring mix loudness...');
const analysis=run(['-hide_banner','-i',source,'-af','loudnorm=I=-16:TP=-1.5:LRA=9:print_format=json','-vn','-f','null','-']);
const stats=JSON.parse(analysis.slice(analysis.lastIndexOf('{'),analysis.lastIndexOf('}')+1));
const filter=`loudnorm=I=-16:TP=-1.5:LRA=9:measured_I=${stats.input_i}:measured_TP=${stats.input_tp}:measured_LRA=${stats.input_lra}:measured_thresh=${stats.input_thresh}:offset=${stats.target_offset}:linear=true:print_format=json`;
console.log('Mastering to -16 LUFS / -1.5 dBTP and limited-range 4:2:0...');
// Convert range mathematically rather than merely changing H.264 metadata.
const log=run(['-y','-hide_banner','-i',source,'-map','0:v:0','-map','0:a:0','-vf','scale=in_range=auto:out_range=tv,format=yuv420p','-c:v','libx264','-preset','fast','-crf','18','-threads','3','-pix_fmt','yuv420p','-color_range','tv','-colorspace','bt709','-color_primaries','bt709','-color_trc','bt709','-af',filter,'-c:a','aac','-b:a','192k','-ar','48000','-t',String(timelineSeconds),'-movflags','+faststart',temporary]);
writeFileSync('out/mastering.json',JSON.stringify({targetLUFS:-16,targetTruePeakDb:-1.5,input:stats,normalization:JSON.parse(log.slice(log.lastIndexOf('{'),log.lastIndexOf('}')+1)),videoRange:'limited / yuv420p'},null,2)+'\n');
renameSync(temporary,output);
console.log(`Master created: ${output}`);
