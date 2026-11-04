import {bundle} from '@remotion/bundler';
import {openBrowser,getCompositions,renderStill} from '@remotion/renderer';
import {resolve} from 'node:path';
import {mkdirSync,writeFileSync} from 'node:fs';
import './check-identity.mjs';
import {productionFingerprint} from './production-fingerprint.mjs';
const fingerprint=productionFingerprint();
const serveUrl=await bundle({entryPoint:resolve('src/index.ts')});
const browser=await openBrowser('chrome',{browserExecutable:process.env.REMOTION_BROWSER_EXECUTABLE||'/usr/bin/chromium'});
const shots=[['01-mild-cold',60],['02-wedding-typography',270],['03-conflicting-fonts',630],['04-typography-correction',1170],['05-professional-poster',1425],['06-client-revision',1665],['07-family-selection',1010],['08-spacing-repair',1300],['09-send-message',1485],['10-ep05-teaser',1800],['11-font-reaction',222],['12-reply-arrival',1512]];
try{
 const comps=await getCompositions(serveUrl,{puppeteerInstance:browser});
 const composition=comps.find(c=>c.id==='LifeAsGraphicDesignerEP04');
 if(!composition)throw Error('EP04 composition is not registered');
 mkdirSync('out/visual-check',{recursive:true});
 for(const [name,frame] of shots){await renderStill({serveUrl,composition,frame,puppeteerInstance:browser,imageFormat:'png',output:`out/visual-check/${name}.png`});console.log(`${name}: ${frame}/30 seconds`);}
 if(fingerprint!==productionFingerprint())throw Error('Source changed during visual rendering. Run QC again.');
 writeFileSync('out/visual-check/frames.json',JSON.stringify({productionFingerprint:fingerprint,shots:shots.map(([name,frame])=>({name,frame,seconds:frame/30})),review:'pending',concurrency:1},null,2));
}finally{await browser.close({silent:true});}
