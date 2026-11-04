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
  await page.goto('http://127.0.0.1:3014');
  await page.waitForFunction(()=>document.querySelector('video').readyState>=3);
  const videoMetadata=await page.$eval('video',v=>({duration:v.duration,width:v.videoWidth,height:v.videoHeight,canPlayMP4:v.canPlayType('video/mp4; codecs="avc1.42E01F, mp4a.40.2"')}));
  assert.equal(videoMetadata.width,540);assert.equal(videoMetadata.height,960);assert.equal(videoMetadata.duration,duration);
  const times=[.6,2.5,5,6.9,8.9,10.5,12,13.6,15.5,17.3,18.7,19.9,21.4,23.2,25.3,27.5,29.5,31,34,36.9,38.4,40.1,42.2,43.3,44.7,46.8,48.8,50.5,52.5,54,56.1,57.7,59.1,60.1,61.1,62.7,64.3,67];
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
