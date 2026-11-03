import http from 'node:http';
import {createReadStream,existsSync,statSync} from 'node:fs';
import {fileURLToPath} from 'node:url';

const root=fileURLToPath(new URL('../',import.meta.url));
const files={
 '/preview.mp4':['out/ep03-full-preview.mp4','video/mp4'],
 '/poster.png':['out/visual-check/01-opening-color-disaster.png','image/png'],
};
const html=`<!doctype html><html lang="id"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Life as Graphic Designer · EP03</title><style>*{box-sizing:border-box}body{margin:0;background:#0d0f0c;color:#f5f5f7;font:16px system-ui}main{max-width:960px;margin:auto;min-height:100vh;display:flex;align-items:center;justify-content:center;gap:40px;padding:24px}video{height:90vh;max-height:960px;max-width:100%;aspect-ratio:9/16;background:#171d18;border-radius:12px}section{max-width:300px}h1{font-size:36px;line-height:1.1;margin:12px 0 20px}small{color:#cfd768;letter-spacing:2px}p{line-height:1.6;color:#bcb5a5}a{display:block;color:#0d0f0c;background:#cfd768;border-radius:8px;padding:14px;text-decoration:none;font-weight:650;margin-top:14px}#status{font-size:13px}@media(max-width:700px){main{flex-direction:column;padding:18px}video{height:76vh}section{max-width:450px;text-align:center}h1{font-size:26px}}</style><main><video id="video" controls playsinline preload="metadata" poster="poster.png"><source src="preview.mp4" type="video/mp4">Browser ini tidak mendukung video MP4.</video><section><small>SEASON 01 / EPISODE 02</small><h1>Warna bagus,<br>desain berantakan!</h1><p>@fadly_hisbullah<br>Preview 540 × 960 · 58 detik</p><p id="status">Memuat video…</p><a href="preview.mp4" download="ep03-full-preview.mp4">Unduh preview</a></section></main><script>const v=document.getElementById('video'),s=document.getElementById('status');v.addEventListener('loadedmetadata',()=>s.textContent='Siap diputar · '+v.duration.toFixed(2)+' detik');v.addEventListener('error',()=>s.textContent='Video gagal dimuat. Gunakan tombol unduh untuk membukanya di pemutar perangkat.');</script></html>`;
const server=http.createServer((req,res)=>{
 const path=new URL(req.url,'http://localhost').pathname;
 if(path==='/'){res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});res.end(html);return;}
 const file=files[path];
 if(!file||!existsSync(root+file[0])){res.writeHead(404);res.end('File not found');return;}
 const full=root+file[0],size=statSync(full).size;
 res.setHeader('Content-Type',file[1]);res.setHeader('Accept-Ranges','bytes');
 const range=req.headers.range;
 if(range){
  const match=/^bytes=(\d+)-(\d*)$/.exec(range);
  if(!match){res.writeHead(416,{'Content-Range':`bytes */${size}`});res.end();return;}
  const start=Number(match[1]),end=Math.min(size-1,match[2]?Number(match[2]):size-1);
  if(start>end||start>=size){res.writeHead(416,{'Content-Range':`bytes */${size}`});res.end();return;}
  res.writeHead(206,{'Content-Range':`bytes ${start}-${end}/${size}`,'Content-Length':end-start+1});
  if(req.method==='HEAD'){res.end();return;}
  createReadStream(full,{start,end}).pipe(res);
 }else{
  res.writeHead(200,{'Content-Length':size});
  if(req.method==='HEAD'){res.end();return;}
  createReadStream(full).pipe(res);
 }
});
server.listen(3006,'0.0.0.0',()=>console.log('Video preview server listening on port 3006. In Codespaces: Ports → 3006 → Open in Browser.'));
