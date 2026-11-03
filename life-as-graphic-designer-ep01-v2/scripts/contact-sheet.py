from pathlib import Path
from PIL import Image, ImageDraw
root=Path(__file__).resolve().parents[1]
files=sorted((root/'out/stills').glob('*.png'))
w,h=270,480
sheet=Image.new('RGB',(w*4,(h+35)*((len(files)+3)//4)),'#deded7')
draw=ImageDraw.Draw(sheet)
for i,p in enumerate(files):
    im=Image.open(p); im.thumbnail((w,h))
    x=(i%4)*w; y=(i//4)*(h+35)
    sheet.paste(im,(x,y));draw.text((x+8,y+h+9),p.stem,fill='black')
sheet.save(root/'out/contact-sheet.png')
