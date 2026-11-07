const {chromium}=require('playwright-core');
const fs=require('node:fs');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
 try{
  const page=await browser.newPage({viewport:{width:1440,height:1100}});const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:3015/Season02PrototypeV2');await page.waitForSelector('[data-prototype-root="v2"]');
  await page.getByRole('button',{name:'Go to beginning',exact:true}).click();
  const metadata=await page.locator('[data-prototype-root="v2"]').evaluate(e=>({frames:Number(e.dataset.durationFrames),fps:Number(e.dataset.fps)}));assert.deepEqual(metadata,{frames:450,fps:30});
  const samples=await page.evaluate(async()=>{
   const root=document.querySelector('[data-prototype-root="v2"]');const next=document.querySelector('button[aria-label="Go forward 1 frame"]');
   const tick=()=>new Promise(r=>requestAnimationFrame(r));
   const point=(e)=>{if(!e)return null;const m=e.getScreenCTM();const p=new DOMPoint(95,120.5).matrixTransform(m);return {x:p.x,y:p.y};};
   const read=()=>{
    const f=Number(root.getAttribute('data-current-frame'));const world=root.querySelector(`[data-workspace-frame="${f}"]`);if(!world)throw Error('Active scene missing at frame '+f);
    const camera=world.querySelector('[data-camera-scale]');const rig=world.querySelector('.performance-rig');const body=rig.querySelector('.rig-body svg');const head=rig.querySelector('.rig-head svg');const b=body.getBoundingClientRect(),h=head.getBoundingClientRect();const hg=head.querySelector(':scope>g>g>g:last-child');const matrix=hg.getScreenCTM();const message=world.querySelector('[data-client-notification]');
    const phone=world.querySelector('[data-placed-phone] rect[x="86"][y="106"]')||body.querySelector('rect[x="86"][y="106"]');
    return {f,x:Number(camera.dataset.cameraX),y:Number(camera.dataset.cameraY),scale:Number(camera.dataset.cameraScale),headAngle:Math.atan2(matrix.b,matrix.a)*180/Math.PI,canvasAlignment:Math.max(Math.abs(b.x-h.x),Math.abs(b.y-h.y),Math.abs(b.width-h.width),Math.abs(b.height-h.height)),body:rig.dataset.rigBody,face:rig.dataset.rigFace,visibleHead:getComputedStyle(hg).visibility,hiddenOriginalHead:getComputedStyle(body.querySelector(':scope>g>g>g:last-child')).visibility,phone:point(phone),keyboard:world.querySelector('[data-keyboard-side]').getAttribute('data-keyboard-side'),intro:Number(world.querySelector('[data-intro-fraction]').getAttribute('data-intro-fraction')),monitor:world.querySelector('[data-monitor-state]').getAttribute('data-monitor-state'),message:message?{opacity:Number(getComputedStyle(message).opacity),text:message.textContent}:null,mediaElements:root.querySelectorAll('audio,video').length};
   };
   const out=[read()];
   for(let f=1;f<450;f++){
    next.click();let count=0;
    while(Number(root.getAttribute('data-current-frame'))!==f){await tick();if(++count>120)throw Error('Cannot advance to frame '+f);}
    await tick();out.push(read());
   }
   return out;
  });
  assert.equal(samples.length,450);assert.equal(errors.length,0);
  let maxCameraStep=0,maxScaleStep=0,maxHeadStep=0;
  for(let i=0;i<samples.length;i++){
   const s=samples[i];assert.equal(s.f,i);assert.equal(s.visibleHead,'visible');assert.equal(s.hiddenOriginalHead,'hidden');assert(s.canvasAlignment<.1);assert.equal(s.mediaElements,0);
   assert.equal(s.body,i<374?'reading':'typing');
   if(i>=374)assert.equal(s.keyboard,String(1-Math.floor(Math.round(31+i*.72)/3)%2));
   if(i){const p=samples[i-1];maxCameraStep=Math.max(maxCameraStep,Math.hypot(s.x-p.x,s.y-p.y));maxScaleStep=Math.max(maxScaleStep,Math.abs(s.scale-p.scale));maxHeadStep=Math.max(maxHeadStep,Math.abs(s.headAngle-p.headAngle));}
  }
  assert(maxCameraStep<4,'Abrupt camera movement');assert(maxScaleStep<.006,'Abrupt scale jump');assert(maxHeadStep<1.6,'Abrupt head movement');
  assert(samples[45].message&&samples[45].message.opacity>.8&&samples[45].message.text.includes('Views-nya masih sepi'));
  assert(samples[300].intro>.6&&samples[449].intro<.1);assert.equal(samples[449].monitor,'hook-first');
  const handoff=Math.hypot(samples[374].phone.x-samples[373].phone.x,samples[374].phone.y-samples[373].phone.y);assert(handoff<3,'Phone jumped at handoff');
  const stablePhone=Math.hypot(samples[449].phone.x-samples[420].phone.x,samples[449].phone.y-samples[420].phone.y);assert(stablePhone<.1,'Placed phone moved with breathing');
  await page.getByRole('button',{name:'Go to beginning',exact:true}).click();await page.getByRole('button',{name:'Play',exact:true}).click();
  const playback=await page.evaluate(async()=>{const root=document.querySelector('[data-prototype-root="v2"]');const samples=[];const start=performance.now();while(performance.now()-start<15400){samples.push({at:performance.now()-start,f:Number(root.getAttribute('data-current-frame'))});await new Promise(r=>setTimeout(r,80));}return {elapsedMs:performance.now()-start,samples};});
  const maxFrame=Math.max(...playback.samples.map(s=>s.f));assert(maxFrame>430,'Full 15-second Studio playback did not reach the ending');
  const pause=page.getByRole('button',{name:'Pause',exact:true});if(await pause.count())await pause.click();assert.equal(errors.length,0);
  fs.mkdirSync('out',{recursive:true});fs.writeFileSync('out/frame-audit.json',JSON.stringify({samples},null,2)+'\n');
  const report={status:'passed',composition:'Season02PrototypeV2',durationSeconds:15,frames:450,fps:30,all450FrameStatesChecked:true,maxCameraPixelsPerFrame:maxCameraStep,maxScaleChangePerFrame:maxScaleStep,maxHeadDegreesPerFrame:maxHeadStep,originalRigLayersAligned:true,phoneHandoffScreenPixels:handoff,placedPhoneMovementScreenPixels:stablePhone,clientProblemVisibleBySeconds:1.5,introFractionBefore:samples[300].intro,introFractionAfter:samples[449].intro,fullStudioPlayback:{elapsedMs:playback.elapsedMs,maxFrame,errors},audioElements:0,videoElements:0,mp4Rendered:false,externalReferenceCompared:false,oldPrototypeCompared:false};
  fs.writeFileSync('out/studio-verification.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1)});
