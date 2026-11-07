import {bundle} from '@remotion/bundler';
import {openBrowser,getCompositions,renderStill} from '@remotion/renderer';
import {resolve} from 'node:path';
import {mkdirSync,writeFileSync,readFileSync,readdirSync} from 'node:fs';
import {createHash} from 'node:crypto';
import './check-identity.mjs';
const mode=process.argv[2]||'v2';if(!['baseline','v2'].includes(mode))throw Error('Use baseline or v2; no video export is enabled.');
const id=mode==='baseline'?'Season02Foundation':'Season02PrototypeV2';
const out=mode==='baseline'?'out/visual-review-baseline':'out/visual-review-v2';
const shots=[['01-opening-notification',75],['02-character-reaction',182],['03-video-analysis',300],['04-editing-transition',386],['05-ending-title',438]];
const walk=p=>readdirSync(p,{withFileTypes:true}).flatMap(d=>d.isDirectory()?walk(p+'/'+d.name):[p+'/'+d.name]);
const fingerprint=()=>{const h=createHash('sha256');for(const p of [...walk('src'),...walk('public')].sort())h.update(p).update(readFileSync(p));return h.digest('hex');};
const hash=fingerprint();const serveUrl=await bundle({entryPoint:resolve('src/index.ts')});const browser=await openBrowser('chrome',{browserExecutable:'/usr/bin/chromium'});
try{const comps=await getCompositions(serveUrl,{puppeteerInstance:browser});const composition=comps.find(c=>c.id===id);if(!composition)throw Error('Composition not registered: '+id);if(composition.durationInFrames!==450||composition.fps!==30)throw Error('Prototype must stay exactly 15 seconds / 30 FPS.');mkdirSync(out,{recursive:true});
 for(const [name,frame] of shots){const file=out+'/'+name+'.png';await renderStill({serveUrl,composition,frame,scale:.5,puppeteerInstance:browser,imageFormat:'png',output:file});console.log(name+' @ '+frame+'/30 seconds');}
 if(hash!==fingerprint())throw Error('Production source changed during QC');
 writeFileSync(out+'/frames.json',JSON.stringify({composition:id,basis:mode==='baseline'?'New adaptation of original Season 01 components, not a recovered previous S02 prototype':'Refinement of the documented adaptation baseline',durationSeconds:15,durationInFrames:450,fps:30,resolution:[540,960],productionFingerprint:hash,shots:shots.map(([name,frame])=>({file:name+'.png',frame,seconds:frame/30,sha256:createHash('sha256').update(readFileSync(out+'/'+name+'.png')).digest('hex')})),concurrency:1,audioRendered:false,mp4Rendered:false},null,2)+'\n');
}finally{await browser.close({silent:true});}
