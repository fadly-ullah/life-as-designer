"""Composite actual Blender renders only. No synthesized approved reference.
Optional --concept requires the exact approved PNG/JPG file supplied by the user.
"""
from pathlib import Path
from PIL import Image,ImageDraw,ImageFont,ImageOps
import argparse
ROOT=Path(__file__).resolve().parents[1]
a=argparse.ArgumentParser();a.add_argument('--concept',type=Path);args=a.parse_args()
regular='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf';bold='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
def font(n,b=False):return ImageFont.truetype(bold if b else regular,n)
views=[('front','DEPAN'),('side','SAMPING'),('three-quarter','SUDUT 3/4'),('back','BELAKANG')]
notes=['Rambut: fringe menyapu; lapisan temple, samping, crown dan nape.','Wajah: cheek/jaw dibentuk ulang; bevel dan fitur dirapikan.','Hoodie: hood terbuka, lipatan, pouch, cuff knit dan tali baru.','Proporsi: 3,65 kepala, diukur crown–dagu; palet tetap.','Status: belum final; tidak ada rig, GLB atau animasi.']
# Native four-view plate: keep every render pixel intact, only add labels outside it.
im=Image.new('RGB',(3840,1300),'#10130F');d=ImageDraw.Draw(im)
for i,(name,label) in enumerate(views):
 render=Image.open(ROOT/f'evaluation/{name}.png').convert('RGB');assert render.size==(960,1200)
 im.paste(render,(960*i,75));d.text((960*i+35,24),label+' / MODELING 02',font=font(26,True),fill='#F7F5EC')
im.save(ROOT/'evaluation/four-views-native.png')
# Before / after front view normalized by the same image frame, no independent axis stretching.
b=Image.new('RGB',(2560,1940),'#10130F');d=ImageDraw.Draw(b)
d.text((60,35),'S02 / MODELING 02 — EVALUASI REVISI',font=font(44,True),fill='#F7F5EC')
d.text((60,101),'MODEL 01 → MODEL 02 | belum disetujui',font=font(27),fill='#B4CE43')
for idx,(path,label) in enumerate([(ROOT.parent/'modeling-01/evaluation/front.png','SEBELUM / MODEL 01'),(ROOT/'evaluation/front.png','REVISI / MODEL 02')]):
 x=60+idx*700;d.text((x,168),label,font=font(26,True),fill='#F7F5EC');image=Image.open(path).convert('RGB').resize((640,800),Image.Resampling.LANCZOS);b.paste(image,(x,215))
d.text((1510,210),'PERUBAHAN UTAMA',font=font(28,True),fill='#B4CE43')
for i,text in enumerate(['Rambut lebih berlapis dan menyapu.','Cap samping/belakang ditutup lapisan.','Cheek/jaw dan detail wajah dirapikan.','Hood, cuff dan pouch dibentuk ulang.','Proporsi terukur: 3,65 kepala.','Palet material utama dipertahankan.','Belum rigging, GLB atau animasi.']):d.text((1510,280+i*68),text,font=font(25),fill='#F7F5EC')
d.text((1510,840),'Approved concept art belum tercantum.',font=font(24,True),fill='#CFD2C2')
d.text((1510,884),'File referensi PNG/JPG diperlukan.',font=font(24),fill='#CFD2C2')
for i,(name,label) in enumerate(views):
 x=60+i*620;d.text((x,1080),label,font=font(26,True),fill='#F7F5EC');image=Image.open(ROOT/f'evaluation/{name}.png').convert('RGB').resize((560,700),Image.Resampling.LANCZOS);b.paste(image,(x,1130))
d.text((60,1875),'Perbandingan ini memakai render Model 01 dan Model 02. Bukan comparison sheet dengan approved concept art.',font=font(25),fill='#B4CE43')
b.save(ROOT/'evaluation/revision-review-sheet.png')
if args.concept:
 assert args.concept.is_file(),'Approved concept art file not found.'
 c=Image.new('RGB',(2800,1650),'#10130F');d=ImageDraw.Draw(c)
 d.text((60,35),'APPROVED CHARACTER SHEET / MODELING 02',font=font(43,True),fill='#F7F5EC')
 d.text((60,107),'Perbandingan bentuk — model belum disetujui',font=font(26),fill='#B4CE43')
 ref=Image.open(args.concept).convert('RGB');ref=ImageOps.contain(ref,(1536,1024),Image.Resampling.LANCZOS);c.paste(ref,(60,190))
 for i,(name,label) in enumerate(views):
  x=1700+(i%2)*520;y=170+(i//2)*680
  d.text((x,y),label,font=font(22,True),fill='#F7F5EC');image=Image.open(ROOT/f'evaluation/{name}.png').convert('RGB').resize((480,600),Image.Resampling.LANCZOS);c.paste(image,(x,y+40))
 for i,n in enumerate(notes):d.text((60,1290+i*52),n,font=font(23),fill='#F7F5EC')
 c.save(ROOT/'evaluation/approved-concept-comparison.png')
 print('Approved concept comparison generated from exact supplied image:',args.concept)
else:print('Four-view and before/after sheets saved. Approved concept comparison NOT produced: original image file unavailable.')
