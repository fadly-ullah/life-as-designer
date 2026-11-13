import {CanvasTexture, SRGBColorSpace} from 'three';
// A fictional editor drawn into an actual 3D monitor texture.
export function createEditorTexture(playback:number,diagnosis:boolean){
 const canvas=document.createElement('canvas');canvas.width=1200;canvas.height=750;
 const c=canvas.getContext('2d')!;
 c.fillStyle='#171a16';c.fillRect(0,0,1200,750);
 c.font='bold 28px sans-serif';c.fillStyle='#F7F5EC';c.fillText('STUDIO / KONTEN KLIEN',35,48);
 c.fillStyle='#34382e';c.fillRect(32,75,1136,397);
 c.fillStyle='#b7ae96';c.fillRect(60,104,790,338);
 c.fillStyle='#89816d';c.fillRect(60,306,790,136);
 const reveal=playback>=15;
 if(reveal){c.fillStyle='#B4CE43';c.fillRect(360,162,150,210);c.fillStyle='#F7F5EC';c.fillRect(375,210,120,65);c.fillStyle='#22251d';c.font='bold 23px sans-serif';c.fillText('KOPI',403,252);}
 else {c.fillStyle='#e3d9bc';c.font='bold 55px sans-serif';c.fillText('SELAMAT DATANG',142,240);c.font='26px sans-serif';c.fillText('Sebuah cerita dari kami...',220,290);}
 c.fillStyle='#F7F5EC';c.font='24px sans-serif';c.fillText('PREVIEW',910,120);c.fillText(`${String(Math.floor(playback)).padStart(2,'0')} s`,930,180);
 if(diagnosis){c.fillStyle='#B4CE43';c.font='23px sans-serif';c.fillText('Produk terlambat',885,270);c.fillText('Manfaat belum jelas',885,310);}
 c.fillStyle='#eee9db';c.font='25px sans-serif';c.fillText('▶   00:'+String(Math.floor(playback)).padStart(2,'0')+' / 00:20',35,516);
 for(let i=0;i<=20;i+=5){c.fillStyle='#aaa996';c.font='21px sans-serif';c.fillText(String(i).padStart(2,'0')+'s',45+i*52,564);}
 c.fillStyle='#575949';c.fillRect(45,590,780,78);c.fillStyle='#B4CE43';c.fillRect(825,590,260,78);
 c.fillStyle='#F7F5EC';c.font='24px sans-serif';c.fillText('INTRO PANJANG',70,637);c.fillStyle='#171a16';c.fillText('PRODUK',875,637);
 const x=45+Math.min(playback,20)*52;c.fillStyle='#F7F5EC';c.fillRect(x,572,4,120);
 c.fillStyle='#B4CE43';c.fillRect(45,704,156,5);
 const texture=new CanvasTexture(canvas);texture.colorSpace=SRGBColorSpace;return texture;
}
