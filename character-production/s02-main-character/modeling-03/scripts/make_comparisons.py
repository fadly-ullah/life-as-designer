"""Compose original image crops, no generative image substitution or color adjustment."""
from pathlib import Path
from PIL import Image,ImageDraw,ImageFont,ImageOps
R=Path(__file__).resolve().parents[1];C=Image.open(R.parent/'Season02_Approved_Character_Concept.png').convert('RGB')
A={n:Image.open(R.parent/'modeling-02/evaluation'/f'{n}.png').convert('RGB') for n in ['front','side','three-quarter','back']}
B={n:Image.open(R/'evaluation'/f'{n}.png').convert('RGB') for n in A}
font='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
def ft(n):return ImageFont.truetype(font,n)
boxes={'front':(338,402,494,740),'side':(544,403,685,740),'three-quarter':(720,403,879,740),'back':(922,403,1072,740)}
# Subject crop bounds in original 960x1200 Model02 and 640x800 Model03 renders.
ba={'front':(285,90,675,1115),'side':(346,90,640,1115),'three-quarter':(289,90,661,1115),'back':(286,90,674,1115)}
bb={'front':(185,55,454,742),'side':(225,55,415,742),'three-quarter':(185,55,449,742),'back':(185,55,455,742)}
def panel(im,x,y,img,label,w=398,h=600):
 d=ImageDraw.Draw(im);d.rectangle((x,y,x+w,y+h),fill='#20262e');d.text((x+12,y+10),label,font=ft(21),fill='white')
 p=ImageOps.contain(img,(w-20,h-52),Image.Resampling.LANCZOS);im.paste(p,(x+(w-p.width)//2,y+44+(h-52-p.height)//2))
def sheet(kind):
 im=Image.new('RGB',(1800,1680),'#11151a');d=ImageDraw.Draw(im)
 d.text((35,25),'TASK 04 / MODEL 03 - '+kind,font=ft(32),fill='#f1f3e9')
 d.text((35,76),'UNTUK REVIEW - BELUM APPROVED | base commit 2f6a28a0ae70eda0901646bbcf6ba1e450f15d26',font=ft(21),fill='#b4ce43')
 d.text((35,115),'Branch feature/s02-character-model-revision-03 | crop asli; tidak ada recolor, distorsi, atau gambar generatif',font=ft(19),fill='#bec5cf')
 for i,n in enumerate(A):
  x=35+i%2*890;y=165+i//2*710
  d.text((x,y),n.upper()+' / PARTIAL',font=ft(25),fill='#b4ce43')
  first=C.crop(boxes[n]) if kind=='APPROVED CONCEPT vs MODEL 03' else A[n].crop(ba[n])
  panel(im,x,y+42,first,'APPROVED CONCEPT' if kind.startswith('APPROVED') else 'MODEL 02')
  panel(im,x+425,y+42,B[n].crop(bb[n]),'MODEL 03')
 d.text((35,1615),'Figur disetarakan tinggi tampilannya, bukan ukuran mesh. Kamera dan lighting concept berbeda; detail concept terbatas.',font=ft(19),fill='#bec5cf')
 d.text((35,1645),'Rambut lebih angular; mata lebih pendek; kerah terbuka; kantong persegi; kaki dipendekkan lokal; toe box direndahkan.',font=ft(18),fill='#bec5cf')
 return im
sheets=[]
for k,name in [('APPROVED CONCEPT vs MODEL 03','approved-vs-model03'),('MODEL 02 vs MODEL 03','model02-vs-model03')]:
 im=sheet(k);im.save(R/'evaluation'/f'{name}.png');sheets.append(im)
sheets[0].save(R/'evaluation/comparisons.pdf',save_all=True,append_images=sheets[1:],resolution=150)
