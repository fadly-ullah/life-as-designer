"""Layout original crops with uniform resizing only. No recolor or generated imagery."""
from pathlib import Path
from PIL import Image,ImageDraw,ImageFont,ImageOps
R=Path(__file__).resolve().parents[1];C=Image.open(R.parent/'Season02_Approved_Character_Concept.png').convert('RGB')
views=['front','side','three-quarter','back'];A={n:Image.open(R/'evaluation/model04-reference'/f'{n}.png').convert('RGB') for n in views};B={n:Image.open(R/'evaluation'/f'{n}.png').convert('RGB') for n in views}
font='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
def ft(n):return ImageFont.truetype(font,n)
def base(title,h):
 im=Image.new('RGB',(1800,h),'#11151a');d=ImageDraw.Draw(im)
 d.text((35,25),'TASK 06 / MODEL04 POLISH - '+title,font=ft(29),fill='#f1f3e9')
 d.text((35,73),'UNAPPROVED / IDENTITY NOT LOCKED | base Model04: 8a108a6a75420e11d9f1e603e3295188c7c5d9c5',font=ft(21),fill='#b4ce43')
 d.text((35,112),'feature/s02-character-model04-final-polish | Hanya crop asli dan resize seragam; tanpa recolor atau rekonstruksi gambar.',font=ft(18),fill='#bec5cf')
 return im

def panel(im,x,y,w,h,pic,label):
 d=ImageDraw.Draw(im);d.rectangle((x,y,x+w,y+h),fill='#20262e');d.text((x+12,y+10),label,font=ft(21),fill='white')
 pic=ImageOps.contain(pic,(w-20,h-52),Image.Resampling.LANCZOS);im.paste(pic,(x+(w-pic.width)//2,y+44+(h-52-pic.height)//2))
concept={'front':(338,402,494,740),'side':(544,403,685,740),'three-quarter':(720,403,879,740),'back':(922,403,1072,740)}
notes={'front':['Mata lebih besar; jarak pusat tetap. Poni depan tidak diubah.','Torso, rahang, alis, blush, mulut, celana dan sepatu dikunci.'],'side':['Relief dangkal memecah bidang samping yang datar.','Batas luar rambut dan panjang sleeve tetap sama.'],'three-quarter':['Mata dan volume bahu/lengan lebih terbaca.','Panel dasar samping masih lebar: perlu review visual.'],'back':['Relief belakang staggered, bukan baris blok identik.','Massa utama dipertahankan; tepi panel masih terlihat.']}
sheets=[]
for approved in [True,False]:
 im=base('APPROVED CONCEPT vs POLISHED' if approved else 'MODEL04 vs POLISHED',1690);d=ImageDraw.Draw(im)
 for i,n in enumerate(views):
  x=35+(i%2)*890;y=165+(i//2)*710
  d.text((x,y),n.upper()+' / PARTIAL',font=ft(25),fill='#b4ce43')
  window=(140,35,500,765)
  first=C.crop(concept[n]) if approved else A[n].crop(window)
  panel(im,x,y+42,405,560,first,'APPROVED CONCEPT' if approved else 'MODEL04 / ROLLBACK')
  panel(im,x+425,y+42,405,560,B[n].crop(window),'POLISHED / UNAPPROVED')
  for j,line in enumerate(notes[n]):d.text((x,y+620+j*28),line,font=ft(18),fill='#e1e6ed')
 d.text((35,1615),'Model04/polish: kamera, framing, crop, lighting, world, color management dan render settings sama.',font=ft(19),fill='#bec5cf')
 d.text((35,1648),'Concept: kamera/lighting berbeda. Tinggi dan proporsi polish sama dengan Model04; tidak disetarakan dengan distorsi.',font=ft(18),fill='#bec5cf')
 name='approved-vs-polished-model04' if approved else 'model04-vs-polished-model04'
 im.save(R/'evaluation'/f'{name}.png');sheets.append(im)
# Four detail rows compare original approved crops with matched Model04/polish pixel windows.
im=base('CLOSE-UPS: HAIR / EYES / HOODIE',2300);d=ImageDraw.Draw(im)
rows=[('HAIR / SIDE','side',(544,403,685,532),(225,60,435,285),'Relief dangkal berada dalam envelope asli; bidang dasar tetap dipertahankan.'),('HAIR / BACK','back',(924,405,1068,529),(175,55,466,283),'Staggered berbeda lebar/tinggi; tanpa mengganti cap atau crown depan.'),('EYES / FRONT','front',(374,465,463,501),(248,175,395,235),'Lebar +22%, tinggi +15%; pusat mata, alis dan blush tidak berubah.'),('HOODIE / FRONT','front',(339,533,493,646),(165,274,475,524),'Volume cross-section sleeve/cuff bertambah; torso, tali, pouch dan lime tetap.')]
for i,(title,n,cb,mb,note) in enumerate(rows):
 y=165+i*510;d.text((35,y),title,font=ft(25),fill='#b4ce43')
 for j,(pic,label) in enumerate([(C.crop(cb),'APPROVED CONCEPT'),(A[n].crop(mb),'MODEL04 / ROLLBACK'),(B[n].crop(mb),'POLISHED / UNAPPROVED')]):panel(im,35+j*585,y+42,555,392,pic,label)
 d.text((35,y+450),note,font=ft(20),fill='#e1e6ed')
d.text((35,2230),'Concept beresolusi rendah; crop diperbesar seragam. Noise render tidak dihapus atau disamarkan.',font=ft(19),fill='#bec5cf')
d.text((35,2262),'Detail rambut dangkal, bukan klaim exact match. Persetujuan identitas hanya oleh pengguna.',font=ft(19),fill='#bec5cf')
im.save(R/'evaluation/hair-eyes-hoodie-closeups.png');sheets.append(im)
sheets[0].save(R/'evaluation/comparisons.pdf',save_all=True,append_images=sheets[1:],resolution=150)
print('POLISH_COMPARISONS_DONE')
