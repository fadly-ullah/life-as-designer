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
 const composition=comps.find(c=>c.id==='LifeAsGraphicDesignerEP01');
 if(!composition)throw new Error('Composition not registered');
 const frames=process.env.FRAMES?process.env.FRAMES.split(',').map(Number):[30,126,220,355,500,655,735,900,1000,1110,1300,1360,1455,1620,1810,1950];
 for(const frame of frames){
   await renderStill({serveUrl,composition,frame,puppeteerInstance:browser,imageFormat:'png',output:`out/stills/frame-${String(frame).padStart(4,'0')}.png`});
   console.log(`Still ${frame} / ${(frame/30).toFixed(2)}s`);
 }
}finally{await browser.close({silent:true});}
