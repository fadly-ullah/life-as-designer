import {bundle} from '@remotion/bundler';
import {openBrowser,getCompositions,renderStill} from '@remotion/renderer';
import {resolve} from 'node:path';
import {mkdirSync,writeFileSync} from 'node:fs';
import './check-identity.mjs';
import {productionFingerprint} from './production-fingerprint.mjs';
const fingerprint=productionFingerprint();
const serveUrl=await bundle({entryPoint:resolve('src/index.ts')});
const browser=await openBrowser('chrome',{browserExecutable:process.env.REMOTION_BROWSER_EXECUTABLE||'/usr/bin/chromium'});
const shots=[['01-client-feedback',130],['02-imagined-kick',259],['03-imagined-clutter',535],['04-clarification',870],['05-corrected-poster',1165],['06-deadline-shock',1490],['07-back-to-reality',600],['08-contrast-revision',1020],['09-cta-revision',1080],['10-client-approval',1295],['11-relief',1340],['12-ep06-teaser',1650]];
try{
 const comps=await getCompositions(serveUrl,{puppeteerInstance:browser});
 const composition=comps.find(c=>c.id==='LifeAsGraphicDesignerEP05');
 if(!composition)throw Error('EP05 composition is not registered');
 mkdirSync('out/visual-check',{recursive:true});
 for(const [name,frame] of shots){await renderStill({serveUrl,composition,frame,puppeteerInstance:browser,imageFormat:'png',output:`out/visual-check/${name}.png`});console.log(`${name}: ${frame}/30 seconds`);}
 if(fingerprint!==productionFingerprint())throw Error('Source changed during visual rendering. Run QC again.');
 writeFileSync('out/visual-check/frames.json',JSON.stringify({productionFingerprint:fingerprint,shots:shots.map(([name,frame])=>({name,frame,seconds:frame/30})),review:'pending',concurrency:1},null,2));
}finally{await browser.close({silent:true});}
