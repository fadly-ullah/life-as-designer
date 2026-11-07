from pathlib import Path
import json
from PIL import Image,ImageDraw
r=Path(__file__).resolve().parents[1];v=r/'out/visual-review-v2';b=r/'out/visual-review-baseline'
frames=json.loads((v/'frames.json').read_text())['shots'];w=270;h=480
sheet=Image.new('RGB',(5*w,2*(h+32)), '#DDDCD6');draw=ImageDraw.Draw(sheet)
for row,(folder,label) in enumerate([(b,'DASAR ADAPTASI BARU'),(v,'V2')]):
 for i,s in enumerate(frames):
  x=i*w;y=row*(h+32);draw.text((x+5,y+7),label+' / '+str(s['seconds'])+'s',fill='black');sheet.paste(Image.open(folder/s['file']).convert('RGB').resize((w,h)),(x,y+32))
sheet.save(v/'baseline-v2-comparison.jpg',quality=94)
current=sheet.crop((0,h+32,5*w,2*(h+32)));current.save(v/'contact-sheet.jpg',quality=94)
original=r.parent/'life-as-graphic-designer-ep01/out/stills/frame-0355.png'
if original.exists():
 names=[('EP01 ORIGINAL',original),('DASAR ADAPTASI',b/frames[0]['file']),('V2 / NOTIFIKASI',v/frames[0]['file']),('V2 / AKHIR',v/frames[-1]['file'])]
 im=Image.new('RGB',(4*w,h+32),'#DDDCD6');d=ImageDraw.Draw(im)
 for i,(label,f) in enumerate(names):d.text((i*w+5,7),label,fill='black');im.paste(Image.open(f).convert('RGB').resize((w,h)),(i*w,32))
 im.save(v/'ep01-identity-comparison.jpg',quality=94)
print('Comparison sheets created; previous S02 prototype and external video were not compared.')
