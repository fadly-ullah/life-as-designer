"""Lay out the three actual Blender renders without repainting or generating pixels."""
from pathlib import Path
from PIL import Image,ImageDraw,ImageFont
ROOT=Path(__file__).resolve().parents[1]
font='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
bold='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
f=lambda size,weight=False:ImageFont.truetype(bold if weight else font,size)
board=Image.new('RGB',(2160,1250),'#10130F');d=ImageDraw.Draw(board)
d.text((58,35),'LIFE AS A GRAPHIC DESIGNER',font=f(22,True),fill='#B4CE43')
d.text((58,76),'SEASON 02 / CHARACTER MODELING 01',font=f(39,True),fill='#F7F5EC')
d.text((59,131),'STATIC SHAPE REVIEW  ·  BELUM DISETUJUI  ·  TANPA RIG',font=f(21),fill='#B6B7AA')
d.line((58,176,2102,176),fill='#3E4631',width=2)
for idx,(file,label) in enumerate([('front','01 / DEPAN'),('side','02 / SAMPING'),('three-quarter','03 / SUDUT 3/4')]):
 x=60+idx*700
 d.text((x,199),label,font=f(23,True),fill='#F7F5EC')
 im=Image.open(ROOT/f'evaluation/{file}.png').convert('RGB');assert im.size==(960,1200),im.size
 # Resizing only for board layout; original 960x1200 render is retained alongside it.
 im=im.resize((640,800),Image.Resampling.LANCZOS);board.paste(im,(x,245))
 d.rectangle((x,245,x+640,1045),outline='#30352C',width=1)
d.text((60,1080),'PALET MATERIAL',font=f(17,True),fill='#B6B7AA')
for i,(label,color) in enumerate([('HOODIE','#F5EBDD'),('CHARCOAL','#2B2B2B'),('SKIN','#F2C8A0'),('RAMBUT','#1A140F'),('AKSEN','#B4CE43'),('OLIVE','#A1A13A')]):
 x=60+i*215;d.rectangle((x,1116,x+45,1155),fill=color,outline='#555A4C');d.text((x+57,1116),label,font=f(14,True),fill='#F7F5EC');d.text((x+57,1138),color,font=f(13),fill='#B6B7AA')
d.text((60,1200),'Bentuk menunggu review pengguna. Rigging, GLB dan animasi Episode 01 belum dikerjakan.',font=f(20),fill='#CFD2C2')
board.save(ROOT/'evaluation/character-review-board.png')
