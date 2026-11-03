import {bundle} from '@remotion/bundler';
import {openBrowser,getCompositions,renderStill} from '@remotion/renderer';
import {resolve} from 'node:path';
import {mkdirSync,writeFileSync} from 'node:fs';
import './check-identity.mjs';
import {productionFingerprint} from './production-fingerprint.mjs';
const fingerprint=productionFingerprint();
const serveUrl=await bundle({entryPoint:resolve('src/index.ts')});
const browser=await openBrowser('chrome',{browserExecutable:process.env.REMOTION_BROWSER_EXECUTABLE||'/usr/bin/chromium'});
const shots=[['01-opening-color-disaster',150],['02-five-color-experiment',420],['03-hierarchy-failure',550],['04-return-to-brief',840],['05-color-functions',1068],['06-professional-poster',1330],['07-typography-disaster',1515],['08-five-swatches',285],['09-cleanup-contrast',1190],['10-ep04-teaser',1680]];
try{
 const comps=await getCompositions(serveUrl,{puppeteerInstance:browser});
 const composition=comps.find(c=>c.id==='LifeAsGraphicDesignerEP03');
 if(!composition)throw Error('EP03 composition is not registered');
 mkdirSync('out/visual-check',{recursive:true});
 for(const [name,frame] of shots){await renderStill({serveUrl,composition,frame,puppeteerInstance:browser,imageFormat:'png',output:`out/visual-check/${name}.png`});console.log(`${name}: ${frame}/30 seconds`);}
 if(fingerprint!==productionFingerprint())throw Error('Source changed during visual rendering. Run QC again.');
 writeFileSync('out/visual-check/frames.json',JSON.stringify({productionFingerprint:fingerprint,shots:shots.map(([name,frame])=>({name,frame,seconds:frame/30})),review:'pending',concurrency:1},null,2));
}finally{await browser.close({silent:true});}
