import {bundle} from '@remotion/bundler';
import {openBrowser,getCompositions,renderStill} from '@remotion/renderer';
import {resolve} from 'node:path';
import {mkdirSync,writeFileSync} from 'node:fs';
import './check-identity.mjs';
import {productionFingerprint} from './production-fingerprint.mjs';
const fingerprint=productionFingerprint();
const serveUrl=await bundle({entryPoint:resolve('src/index.ts')});
const browser=await openBrowser('chrome',{browserExecutable:process.env.REMOTION_BROWSER_EXECUTABLE||'/usr/bin/chromium'});
const shots=[['01-frozen-application',127],['02-panicked-character',168],['03-unsaved-changes',520],['04-auto-recovery',830],['05-finalization-montage',1075],['06-file-sent',1325],['07-next-morning-cliffhanger',1690],['08-normal-editing',50],['09-repeated-clicks',338],['10-recovered-file',906],['11-export-ready',1180],['12-upload-loading',1253],['13-morning-notification',1520]];
try{
 const comps=await getCompositions(serveUrl,{puppeteerInstance:browser});
 const composition=comps.find(c=>c.id==='LifeAsGraphicDesignerEP06');
 if(!composition)throw Error('EP06 composition is not registered');
 mkdirSync('out/visual-check',{recursive:true});
 for(const [name,frame] of shots){await renderStill({serveUrl,composition,frame,puppeteerInstance:browser,imageFormat:'png',output:`out/visual-check/${name}.png`});console.log(`${name}: ${frame}/30 seconds`);}
 if(fingerprint!==productionFingerprint())throw Error('Source changed during visual rendering. Run QC again.');
 writeFileSync('out/visual-check/frames.json',JSON.stringify({productionFingerprint:fingerprint,shots:shots.map(([name,frame])=>({name,frame,seconds:frame/30})),review:'pending',concurrency:1},null,2));
}finally{await browser.close({silent:true});}
