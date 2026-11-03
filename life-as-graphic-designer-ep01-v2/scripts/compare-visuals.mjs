import {bundle} from '@remotion/bundler';
import {openBrowser,getCompositions,renderStill} from '@remotion/renderer';
import {readFileSync,existsSync,mkdirSync,writeFileSync} from 'node:fs';
import {resolve} from 'node:path';
import ts from 'typescript';
import {createHash} from 'node:crypto';

await import('./check-identity.mjs');
const baseline=JSON.parse(readFileSync('preservation-baseline.json','utf8'));
const original=existsSync(baseline.source)?baseline.source:resolve('../life-as-graphic-designer-ep01');
const sourceMetadata=JSON.parse(readFileSync('src/data/audioMetadata.json','utf8'));
const sourceVoice=readFileSync(sourceMetadata.sourcePath);
if(createHash('sha256').update(sourceVoice).digest('hex')!==sourceMetadata.sourceSha256)throw new Error('Latest VO hash mismatch');
const sceneNames=['Scene01Hook','Scene02ClientMessage','Scene03Confusion','Scene04Questions','Scene05Answer','Scene06Canvas','Scene07CreativeBlock','Scene08Teaser'];
const animationKeys=new Set(['transform','opacity','scale','rotate','translate']);
const printer=ts.createPrinter({removeComments:true});
const signature=(path)=>{
 const sf=ts.createSourceFile(path,readFileSync(path,'utf8'),ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
 const values=[];
 const print=(n)=>printer.printNode(ts.EmitHint.Unspecified,n,sf).replace(/\s+/g,'');
 const visit=(n)=>{
  if(ts.isJsxAttribute(n)){
   const name=n.name.getText(sf);
   if(name==='style'&&n.initializer&&ts.isJsxExpression(n.initializer)&&n.initializer.expression&&ts.isObjectLiteralExpression(n.initializer.expression)){
    const props=n.initializer.expression.properties.filter(p=>!animationKeys.has(p.name?.getText(sf))).map(print);
    values.push(['style',...props]);
   }else if(['width','height','viewBox','seated','flip'].includes(name))values.push([name,n.initializer?print(n.initializer):true]);
  }
  ts.forEachChild(n,visit);
 };visit(sf);return values;
};
for(const name of sceneNames){
 const old=signature(resolve(original,`src/scenes/${name}.tsx`));
 const next=signature(resolve(`src/scenes/${name}.tsx`));
 if(JSON.stringify(old)!==JSON.stringify(next))throw new Error(`Static layout/typography changed in ${name}`);
}
mkdirSync('out/comparison',{recursive:true});
const oldUrl=await bundle({entryPoint:resolve(original,'src/index.ts'),publicDir:resolve(original,'public')});
const newUrl=await bundle({entryPoint:resolve('src/index.ts'),publicDir:resolve('public')});
const browser=await openBrowser('chrome',{browserExecutable:process.env.REMOTION_BROWSER_EXECUTABLE||'/usr/bin/chromium'});
try{
 const oldComps=await getCompositions(oldUrl,{puppeteerInstance:browser});
 const newComps=await getCompositions(newUrl,{puppeteerInstance:browser});
 const old=oldComps.find(c=>c.id==='LifeAsGraphicDesignerEP01');
 const next=newComps.find(c=>c.id==='LifeAsGraphicDesignerEP01V2');
 if(!old||!next)throw new Error('Original or V2 composition missing');
 const pairs=[
  {name:'Hook-WOW',originalFrame:126,v2Frame:60},
  {name:'Questions',originalFrame:1000,v2Frame:800},
  {name:'Moodboard',originalFrame:1300,v2Frame:1080},
 ];
 for(const p of pairs){
  for(const [label,url,composition,frame] of [['original',oldUrl,old,p.originalFrame],['v2',newUrl,next,p.v2Frame]]){
   await renderStill({serveUrl:url,composition,frame,puppeteerInstance:browser,imageFormat:'png',output:`out/comparison/${p.name}-${label}.png`});
  }
  console.log(`Compared ${p.name}: original ${p.originalFrame}/30s -> V2 ${p.v2Frame}/30s`);
 }
 const report={status:'rendered-awaiting-visual-review',sourceSha256:sourceMetadata.sourceSha256,source:'original EP01',pairs,visualFilesByteIdentical:true,sceneStaticLayoutSignatures:'all eight identical',note:'Pose, timing and narration change; model geometry, typography, colors, layout positions and dimensions are preserved.'};
 writeFileSync('out/visual-comparison.json',JSON.stringify(report,null,2)+'\n');
}finally{await browser.close({silent:true});}
