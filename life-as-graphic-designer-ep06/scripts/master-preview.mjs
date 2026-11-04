import {spawnSync} from 'node:child_process';
import {mkdirSync,renameSync,writeFileSync,readFileSync} from 'node:fs';

const source='out/.ep06-preview-mix.mp4';
const output='out/ep06-full-preview.mp4';
const temporary='out/.mastered-preview.mp4';
const metadata=JSON.parse(readFileSync('src/data/audioMetadata.json','utf8'));
const timelineSeconds=metadata.durationInFrames/metadata.fps;
mkdirSync('out',{recursive:true});
const run=(command,args)=>{
 const r=spawnSync(command,args,{encoding:'utf8',maxBuffer:16*1024*1024});
 if(r.status!==0)throw new Error(r.stderr||r.error?.message||`${command} failed`);
 return r;
};
const streams=JSON.parse(run('ffprobe',['-v','error','-show_streams','-of','json',source]).stdout).streams;
const video=streams.find(s=>s.codec_type==='video');
if(video.width!==540||video.height!==960)throw new Error('Preview mastering accepts only 540x960 video. No 1080x1920 movie is authorized.');
console.log('Measuring the 540x960 preview mix...');
const analysis=run('ffmpeg',['-hide_banner','-i',source,'-af','loudnorm=I=-16:TP=-1.5:LRA=9:print_format=json','-vn','-f','null','-']).stderr;
const stats=JSON.parse(analysis.slice(analysis.lastIndexOf('{'),analysis.lastIndexOf('}')+1));
const filter=`loudnorm=I=-16:TP=-1.5:LRA=9:measured_I=${stats.input_i}:measured_TP=${stats.input_tp}:measured_LRA=${stats.input_lra}:measured_thresh=${stats.input_thresh}:offset=${stats.target_offset}:linear=true:print_format=json`;
const log=run('ffmpeg',['-y','-hide_banner','-i',source,'-map','0:v:0','-map','0:a:0','-vf','scale=in_range=auto:out_range=tv,format=yuv420p','-c:v','libx264','-profile:v','baseline','-level:v','3.1','-preset','fast','-crf','19','-threads','2','-pix_fmt','yuv420p','-color_range','tv','-colorspace','bt709','-color_primaries','bt709','-color_trc','bt709','-af',filter,'-c:a','aac','-b:a','128k','-ar','48000','-ac','2','-t',String(timelineSeconds),'-movflags','+faststart',temporary]).stderr;
const report={type:'evaluation-preview',resolution:[540,960],sourceSha256:metadata.sourceSha256,targetLUFS:-16,targetTruePeakDb:-1.5,input:stats,normalization:JSON.parse(log.slice(log.lastIndexOf('{'),log.lastIndexOf('}')+1)),final1080pRendered:false};
writeFileSync('out/mastering-preview.json',JSON.stringify(report,null,2)+'\n');
renameSync(temporary,output);
console.log(`Complete preview created: ${output}`);
