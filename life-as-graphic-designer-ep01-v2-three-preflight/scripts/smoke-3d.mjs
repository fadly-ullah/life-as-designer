import {bundle} from '@remotion/bundler';
import {openBrowser,getCompositions,renderStill,renderMedia} from '@remotion/renderer';
import {mkdir,writeFile} from 'node:fs/promises';
import {existsSync} from 'node:fs';
import {resolve} from 'node:path';

const serveUrl=await bundle({entryPoint:resolve('src/index.ts')});
const executable=process.env.REMOTION_BROWSER_EXECUTABLE||(existsSync('/usr/bin/chromium')?'/usr/bin/chromium':undefined);
const chromiumOptions={gl:'swangle'};
const browser=await openBrowser('chrome',{browserExecutable:executable,chromiumOptions});
try{
 const compositions=await getCompositions(serveUrl,{puppeteerInstance:browser,chromiumOptions});
 const composition=compositions.find(c=>c.id==='EnginePreflight3D');
 if(!composition)throw new Error('EnginePreflight3D not registered');
 await mkdir('out',{recursive:true});
 for(const frame of [0,45,90]){
  await renderStill({serveUrl,composition,frame,puppeteerInstance:browser,chromiumOptions,imageFormat:'png',output:`out/preflight-${frame}.png`});
 }
 await renderMedia({serveUrl,composition,puppeteerInstance:browser,chromiumOptions,frameRange:[0,29],codec:'h264',pixelFormat:'yuv420p',outputLocation:'out/engine-preflight.mp4',concurrency:1,crf:20});
 const result={status:'passed',composition:'EnginePreflight3D',renderer:'ThreeCanvas / swangle',nodeVersion:process.version,resolution:[1080,1920],stills:[0,45,90],videoFrames:30,narrativeStatus:'Not implemented: required docs/ unavailable.'};
 await writeFile('out/preflight-report.json',JSON.stringify(result,null,2)+'\n');
 console.log(JSON.stringify(result,null,2));
}finally{await browser.close({silent:true});}
