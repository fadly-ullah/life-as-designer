import {spawnSync} from 'node:child_process';
import {existsSync} from 'node:fs';
for(const [name,args] of [['node',['--version']],['ffmpeg',['-version']]]){
 const r=spawnSync(name,args,{encoding:'utf8'});
 if(r.status!==0)throw new Error(`Missing ${name}`);
 console.log(r.stdout.split('\n')[0]);
}
const browser=process.env.REMOTION_BROWSER_EXECUTABLE||'/usr/bin/chromium';
if(!existsSync(browser))throw new Error('Set REMOTION_BROWSER_EXECUTABLE to an installed Chromium path');
if(Number(process.versions.node.split('.')[0])<22)throw new Error('Use Node 22 or newer');
console.log('Browser:',browser);
