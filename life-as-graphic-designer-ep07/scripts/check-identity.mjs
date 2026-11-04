import {readFileSync,existsSync,mkdirSync,writeFileSync,readdirSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {resolve,join} from 'node:path';
import {execFileSync} from 'node:child_process';
const root=resolve(import.meta.dirname,'..');process.chdir(root);
const lock=JSON.parse(readFileSync('source-lock.json'));
const sha=p=>createHash('sha256').update(readFileSync(p)).digest('hex');
const check=(p,expected)=>{if(!existsSync(p)||sha(p)!==expected)throw Error(`Identity/source lock mismatch: ${p}`);};
for(const [p,h] of Object.entries({...lock.lockedLocalFiles,...lock.fonts,...lock.posterFonts}))check(p,h);
for(const record of lock.protectedProjects)check(resolve(root,'..',record.path),record.sha256);
const meta=JSON.parse(readFileSync('src/data/audioMetadata.json'));check(meta.sourcePath,meta.sourceSha256);
if(meta.compatibilityMp3)check(meta.compatibilityMp3,meta.compatibilityMp3Sha256);
const duration=Number(execFileSync('ffprobe',['-v','error','-show_entries','format=duration','-of','default=nw=1:nk=1',meta.sourcePath],{encoding:'utf8'}).trim());
if(Math.abs(duration-meta.audioDurationSeconds)>.001)throw Error('VO duration changed: update real timing first');
if(meta.audioFrames!==Math.ceil(duration*30)||meta.durationInFrames!==meta.audioFrames+meta.endingPaddingFrames)throw Error('Timeline duration mismatch');
const captions=JSON.parse(readFileSync('src/subtitles/captions.json'));
for(const [i,c] of captions.entries())if(c.startMs>=c.endMs||c.endMs>duration*1000||c.text.split('\n').length>2||(i&&c.startMs<captions[i-1].endMs))throw Error(`Invalid subtitle ${i}`);
const walk=p=>readdirSync(p,{withFileTypes:true}).flatMap(d=>d.isDirectory()?walk(join(p,d.name)):[join(p,d.name)]);
for(const p of walk('src').filter(p=>/\.[jt]sx?$/.test(p))){if(/audio\/(episode0[123456]-vo|ep0[123456]-voiceover)/.test(readFileSync(p,'utf8')))throw Error(`Wrong episode audio in ${p}`);}
const montage=JSON.parse(readFileSync('public/montage/provenance.json'));
for(const c of montage.clips){check('public/'+c.file,c.sha256);const streams=JSON.parse(execFileSync('ffprobe',['-v','error','-show_streams','-of','json','public/'+c.file],{encoding:'utf8'})).streams;const v=streams.find(s=>s.codec_type==='video');if(v.width!==540||v.height!==600||v.r_frame_rate!=='30/1'||streams.some(s=>s.codec_type==='audio'))throw Error('Archive format/audio mismatch: '+c.file);}
const report={referenceCommit:lock.referenceCommit,lockedCharacterAndDesignFiles:Object.keys(lock.lockedLocalFiles),protectedLegacyFiles:lock.protectedProjects.length,allLegacySourcesUnmodified:true,characterGeometryByteIdentical:true,originalFontsByteIdentical:true,voiceSourceSha256:meta.sourceSha256,voiceDurationSeconds:duration,frames:meta.durationInFrames,captionCues:captions.length,authenticArchiveClips:montage.clips.length};
mkdirSync('out',{recursive:true});writeFileSync('out/identity-check.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));
