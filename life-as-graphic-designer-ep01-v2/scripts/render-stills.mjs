import {bundle} from '@remotion/bundler';
import {openBrowser,getCompositions,renderStill} from '@remotion/renderer';
import {resolve} from 'node:path';
import {mkdir,writeFile} from 'node:fs/promises';

const serveUrl=await bundle({entryPoint:resolve('src/index.ts')});
const browser=await openBrowser('chrome',{browserExecutable:process.env.REMOTION_BROWSER_EXECUTABLE||'/usr/bin/chromium'});
try {
 const comps=await getCompositions(serveUrl,{puppeteerInstance:browser});
 await mkdir('out/stills',{recursive:true});
 await writeFile('out/compositions.json',JSON.stringify(comps,null,2));
 const composition=comps.find(c=>c.id==='LifeAsGraphicDesignerEP01V2');
 if(!composition)throw new Error('Composition not registered');
 const frames=process.env.FRAMES?process.env.FRAMES.split(',').map(Number):[30,60,150,240,370,480,720,800,990,1080,1210,1300,1460,1570,1690,1770];
 for(const frame of frames){
   await renderStill({serveUrl,composition,frame,puppeteerInstance:browser,imageFormat:'png',output:`out/stills/frame-${String(frame).padStart(4,'0')}.png`});
   console.log(`Still ${frame} / ${(frame/30).toFixed(2)}s`);
 }
}finally{await browser.close({silent:true});}
