"""Original raster crops only: uniform resize and layout; no recolor or synthesis."""
from PIL import Image,ImageDraw,ImageFont,ImageOps
from pathlib import Path
R=Path(__file__).resolve().parents[1]
C=Image.open(R.parent/'Season02_Approved_Character_Concept.png').convert('RGB')
views=['front','side','three-quarter','back']
A={n:Image.open(R/'evaluation/model03-matched'/f'{n}.png').convert('RGB') for n in views}
B={n:Image.open(R/'evaluation'/f'{n}.png').convert('RGB') for n in views}
font='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
def ft(n):return ImageFont.truetype(font,n)
def base(title,h=1690):
 im=Image.new('RGB',(1800,h),'#11151a');d=ImageDraw.Draw(im)
 d.text((35,25),'TASK 05 / MODEL 04 - '+title,font=ft(31),fill='#f1f3e9')
 d.text((35,75),'UNAPPROVED - MENUNGGU REVIEW PENGGUNA | base Model03: 50e9b4ad13eb88d729d74732666c72d4a4ba6d88',font=ft(20),fill='#b4ce43')
 d.text((35,113),'feature/s02-character-model-revision-04 | Gambar sumber asli; tanpa recolor, distorsi atau rekonstruksi generatif.',font=ft(19),fill='#bec5cf')
 return im

def panel(im,x,y,w,h,img,label):
 d=ImageDraw.Draw(im);d.rectangle((x,y,x+w,y+h),fill='#20262e');d.text((x+12,y+10),label,font=ft(21),fill='white')
 p=ImageOps.contain(img,(w-20,h-52),Image.Resampling.LANCZOS)
 im.paste(p,(x+(w-p.width)//2,y+44+(h-52-p.height)//2))
concept={'front':(338,402,494,740),'side':(544,403,685,740),'three-quarter':(720,403,879,740),'back':(922,403,1072,740)}
notes={'front':['Kepala/rambut dan hoodie lebih lebar; kaki lebih pendek.','Poni angular; ukuran fitur wajah Model03 dipertahankan.'], 'side':['Layer samping lebih menyatu; tepi blok lebih angular.','Bidang samping kini lebih datar: perlu review.'], 'three-quarter':['Silhouette lebih kompak; collar terbuka tanpa ring depan.','Mata masih relatif kecil terhadap kepala yang lebih lebar.'], 'back':['Layer belakang asli Model03 dipertahankan, dilebarkan.','Sambungan samping-ke-belakang belum persis concept.']}
sheets=[]
for kind in ['APPROVED CONCEPT vs MODEL 04','MODEL 03 vs MODEL 04']:
 im=base(kind);d=ImageDraw.Draw(im)
 for i,n in enumerate(views):
  x=35+(i%2)*890;y=165+(i//2)*710
  d.text((x,y),n.upper()+' / PARTIAL',font=ft(25),fill='#b4ce43')
  # Identical fixed crop for both Blender models preserves common camera framing.
  window=(140,35,500,765)
  first=C.crop(concept[n]) if kind.startswith('APPROVED') else A[n].crop(window)
  panel(im,x,y+42,405,560,first,'APPROVED CONCEPT' if kind.startswith('APPROVED') else 'MODEL 03 / MATCHED')
  panel(im,x+425,y+42,405,560,B[n].crop(window),'MODEL 04 / UNAPPROVED')
  for j,line in enumerate(notes[n]):d.text((x,y+620+j*28),line,font=ft(18),fill='#e1e6ed')
 d.text((35,1615),'Model03/04: kamera, ortho scale, target, crop, lighting, color management dan render settings identik.',font=ft(19),fill='#bec5cf')
 d.text((35,1648),'Concept: crop asli diperbesar seragam; kamera/lighting berbeda. Ukuran gambar concept bukan pengukuran mesh.',font=ft(19),fill='#bec5cf')
 fname='approved-vs-model04' if kind.startswith('APPROVED') else 'model03-vs-model04'
 im.save(R/'evaluation'/f'{fname}.png');sheets.append(im)
# All three references for face + hair close-ups; shared pixel windows for Model03/04.
im=base('CLOSE-UP WAJAH & RAMBUT',1390);d=ImageDraw.Draw(im)
for i,(n,box) in enumerate([('front',(338,402,494,530)),('three-quarter',(720,403,879,530))]):
 y=170+i*535
 d.text((35,y),n.upper()+' / WAJAH & RAMBUT',font=ft(25),fill='#b4ce43')
 for j,(pic,label) in enumerate([(C.crop(box),'APPROVED CONCEPT'),(A[n].crop((160,45,485,280)),'MODEL 03 / MATCHED'),(B[n].crop((160,45,485,280)),'MODEL 04 / UNAPPROVED')]):
  panel(im,35+j*585,y+42,555,420,pic,label)
d.text((35,1250),'Fitur mata, alis, blush dan mulut mempertahankan bentuk/ukuran Model03; hanya posisi lateral mengikuti lebar kepala.',font=ft(19),fill='#bec5cf')
d.text((35,1285),'Trade-off terlihat: bidang rambut samping lebih datar; wajah dapat terbaca lebih lebar dan mata relatif lebih kecil.',font=ft(19),fill='#bec5cf')
d.text((35,1320),'Crop concept beresolusi rendah. Pembesaran seragam tidak menambah detail dan tidak menyamakan sudut kamera.',font=ft(19),fill='#bec5cf')
im.save(R/'evaluation/face-hair-comparison.png');sheets.append(im)
sheets[0].save(R/'evaluation/comparisons.pdf',save_all=True,append_images=sheets[1:],resolution=150)
print('COMPARISONS_DONE')
