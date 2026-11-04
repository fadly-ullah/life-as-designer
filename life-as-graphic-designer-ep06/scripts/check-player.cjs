const {chromium}=require('playwright-core');
const fs=require('node:fs');
const assert=require('node:assert/strict');
const metadata=require('../src/data/audioMetadata.json');
const duration=metadata.durationInFrames/metadata.fps;
// Run npm run preview:video in another terminal before this check.
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.REMOTION_BROWSER_EXECUTABLE||'/usr/bin/chromium',args:['--no-sandbox','--autoplay-policy=no-user-gesture-required']});
 try{
  const page=await browser.newPage({viewport:{width:1000,height:1080}});const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:3012');
  await page.waitForFunction(()=>document.querySelector('video').readyState>=3);
  const videoMetadata=await page.$eval('video',v=>({duration:v.duration,width:v.videoWidth,height:v.videoHeight,canPlayMP4:v.canPlayType('video/mp4; codecs="avc1.42E01F, mp4a.40.2"')}));
  assert.equal(videoMetadata.width,540);assert.equal(videoMetadata.height,960);assert.equal(videoMetadata.duration,duration);
  const times=[.6,2.9,4.2,5.6,7.2,8.7,10.2,11.5,13.3,15.9,17.5,20,22.5,24.5,26.1,27.6,29.8,31.9,33.8,35.8,37.6,39.5,41.7,42.7,44.7,46.1,47.8,49.5,50.9,52,53.4,55.4,58];
  fs.mkdirSync('out/playback-check',{recursive:true});
  for(const t of times){
   const png=await page.$eval('video',async(v,t)=>{v.pause();v.currentTime=t;await new Promise(r=>v.addEventListener('seeked',r,{once:true}));const c=document.createElement('canvas');c.width=v.videoWidth;c.height=v.videoHeight;c.getContext('2d').drawImage(v,0,0);return c.toDataURL('image/png').split(',')[1];},t);
   fs.writeFileSync(`out/playback-check/${String(t).replace('.','-')}.png`,Buffer.from(png,'base64'));
  }
  await page.$eval('video',v=>{v.currentTime=0;v.muted=true;return v.play();});
  await page.waitForFunction(()=>document.querySelector('video').ended,{},{timeout:(duration+15)*1000});
  const state=await page.$eval('video',v=>({ended:v.ended,currentTime:v.currentTime,error:v.error?.message||null,quality:{total:v.getVideoPlaybackQuality().totalVideoFrames,dropped:v.getVideoPlaybackQuality().droppedVideoFrames}}));
  assert.equal(errors.length,0);assert.equal(state.error,null);assert.equal(state.ended,true);assert.equal(state.currentTime,duration);
  const report={metadata:videoMetadata,seekPoints:times,fullPlaybackAtNormalSpeed:state,browserAudioPlayback:'muted for autoplay; audio independently verified by decode/correlation/loudness',errors};
  fs.writeFileSync('out/player-verification.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1)});
