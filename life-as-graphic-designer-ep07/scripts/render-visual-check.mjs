import {bundle} from '@remotion/bundler';
import {openBrowser,getCompositions,renderStill} from '@remotion/renderer';
import {resolve} from 'node:path';
import {mkdirSync,writeFileSync} from 'node:fs';
import './check-identity.mjs';
import {productionFingerprint} from './production-fingerprint.mjs';
const fingerprint=productionFingerprint();
const serveUrl=await bundle({entryPoint:resolve('src/index.ts')});
const browser=await openBrowser('chrome',{browserExecutable:process.env.REMOTION_BROWSER_EXECUTABLE||'/usr/bin/chromium'});
const shots=[["01-nervous-opening", 151], ["02-client-approved", 338], ["03-flashback-montage", 616], ["04-reflection", 1188], ["05-poster-evolution", 1345], ["06-season-completed", 1607], ["07-season-two-teaser", 1910], ["08-approval-message", 222], ["09-disbelief", 284], ["10-archive-ep01", 520], ["11-archive-ep02", 561], ["12-archive-ep03", 596], ["13-archive-ep05", 702], ["14-archive-ep06", 760], ["15-original-brief", 1017], ["16-feedback-lesson", 1461], ["17-final-hold", 2020]];
try{
 const comps=await getCompositions(serveUrl,{puppeteerInstance:browser});
 const composition=comps.find(c=>c.id==='LifeAsGraphicDesignerEP07');
 if(!composition)throw Error('EP07 composition is not registered');
 mkdirSync('out/visual-check',{recursive:true});
 for(const [name,frame] of shots){await renderStill({serveUrl,composition,frame,puppeteerInstance:browser,imageFormat:'png',output:`out/visual-check/${name}.png`});console.log(`${name}: ${frame}/30 seconds`);}
 if(fingerprint!==productionFingerprint())throw Error('Source changed during visual rendering. Run QC again.');
 writeFileSync('out/visual-check/frames.json',JSON.stringify({productionFingerprint:fingerprint,shots:shots.map(([name,frame])=>({name,frame,seconds:frame/30})),review:'pending',concurrency:1},null,2));
}finally{await browser.close({silent:true});}
