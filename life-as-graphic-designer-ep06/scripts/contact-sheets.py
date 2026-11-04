"""Assemble inspection evidence. Does not alter production images or artwork."""
from pathlib import Path
import json
from PIL import Image,ImageDraw

r=Path(__file__).resolve().parents[1];p=r/'out/visual-check'
reference=r.parent/'life-as-graphic-designer-ep01/out/stills/frame-0355.png'
shots=json.loads((p/'frames.json').read_text())['shots']

def sheet(files,target,cols,width=360):
 height=round(width*1920/1080);rows=(len(files)+cols-1)//cols
 image=Image.new('RGB',(cols*width,rows*(height+28)),'#dddcd6');draw=ImageDraw.Draw(image)
 for i,(label,path) in enumerate(files):
  x=i%cols*width;y=i//cols*(height+28)
  draw.text((x+5,y+7),label,fill='black')
  image.paste(Image.open(path).convert('RGB').resize((width,height)),(x,y+28))
 image.save(target,quality=92)

main=([('EP01 original',reference)] if reference.exists() else [])+[(s['name'],p/(s['name']+'.png')) for s in shots[:7]]
sheet(main,p/'contact-sheet.jpg',4)
sheet([(s['name'],p/(s['name']+'.png')) for s in shots[7:]],p/'extra-checks.jpg',3)
player=r/'out/player-verification.json'
if player.exists():
 data=json.loads(player.read_text());frames=[]
 for t in data['seekPoints']:
  name=(str(t).removesuffix('.0')).replace('.','-')+'.png'
  frames.append((str(t)+' seconds',r/'out/playback-check'/name))
 sheet(frames,r/'out/playback-check/contact-sheet.jpg',6,216)
