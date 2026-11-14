"""Static evaluation layout using actual Blender renders; no retouching or synthetic concept."""
from pathlib import Path
from PIL import Image,ImageDraw,ImageFont,ImageOps,ImageChops
import json,shutil
R=Path(__file__).resolve().parents[1];E=R/'evaluation';font='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
def ft(n):return ImageFont.truetype(font,n)
def img(p):return Image.open(p).convert('RGB')
def base(title,size):
 im=Image.new('RGB',size,'#14191d');d=ImageDraw.Draw(im);d.text((25,18),'TASK08 / RIG V1 - '+title,font=ft(29),fill='#f1f3e9');d.text((25,65),'IDENTITY LOCKED | RIG UNDER TEST - NOT PRODUCTION APPROVED | NO GLB / EPISODE ANIMATION',font=ft(17),fill='#b4ce43');return im

def panel(im,box,pic,label,note='',status=''):
 x,y,w,h=box;d=ImageDraw.Draw(im);d.rectangle((x,y,x+w,y+h),fill='#222a32');d.text((x+10,y+8),label,font=ft(20),fill='white')
 p=ImageOps.contain(pic,(w-12,h-76),Image.Resampling.LANCZOS);im.paste(p,(x+(w-p.width)//2,y+37+(h-76-p.height)//2))
 d.text((x+10,y+h-30),status or note,font=ft(16),fill='#b4ce43' if 'PARTIAL' not in status else '#f1bd6b')
poses=[('neutral','NEUTRAL','PASS neutral'),('head_left','HEAD YAW +25','PASS tested range'),('head_right','HEAD YAW -25','PASS tested range'),('arm_raised','ARM RAISED 80','PARTIAL shoulder fold'),('elbow_bent','ELBOW BENT 85','PARTIAL sleeve pinch'),('torso_lean','TORSO LEAN 23','PARTIAL cloth contacts'),('seated','SEATED FK / NO CHAIR','PARTIAL hip/knee pinch'),('mouse_reach','MOUSE REACH / NO PROP','PARTIAL elbow / no grasp')]
im=base('BODY POSE EVALUATION',(1800,1290))
for i,(n,label,status) in enumerate(poses):panel(im,(25+i%4*445,110+i//4*570,420,550),img(E/'body'/f'{n}.png'),label,status=status)
ImageDraw.Draw(im).text((25,1250),'Same 3/4 camera and lighting for all body tests. Failed/partial cloth poses retained; no chair/desk scene produced.',font=ft(18),fill='#d1d8e2');im.save(E/'body-pose-sheet.png')
im=base('CONTACT DETAILS - PARTIAL / NOT HIDDEN',(1400,1040))
for i,n in enumerate(['elbow_bent_side','seated_side']):panel(im,(25+i*690,110,660,850),img(E/'body'/f'{n}.png'),n.upper(),status='PARTIAL - see deformation report')
ImageDraw.Draw(im).text((25,985),'Side views expose compressed elbow and seated hip/knee volume. Original neutral geometry/topology remains unchanged.',font=ft(18),fill='#d1d8e2');im.save(E/'contact-issues-sheet.png')
expressions=['neutral','senang','kaget','mikir','semangat']
im=base('FIVE FACIAL EXPRESSIONS',(1800,630))
for i,n in enumerate(expressions):panel(im,(25+i*355,110,335,480),img(E/'expressions'/f'{n}.png'),n.upper(),status='V1 endpoint - review')
ImageDraw.Draw(im).text((25,603),'Fixed facial close-up; hair outer edges cropped by camera. Existing mesh morphs only, no new face anatomy or palette.',font=ft(17),fill='#d1d8e2');im.save(E/'expression-sheet.png')
# Blink-open is the exact neutral facial evaluation, not an extra fabricated render.
shutil.copyfile(E/'expressions/neutral.png',E/'expressions/blink_open.png')
im=base('BLINK AND GAZE LIMITS',(1800,1190))
look=[('blink_open','BLINK OPEN = NEUTRAL'),('blink_closed','BLINK CLOSED'),('gaze_x_neg','GAZE X -1'),('gaze_x_pos','GAZE X +1'),('gaze_z_neg','GAZE Z -1'),('gaze_z_pos','GAZE Z +1')]
for i,(n,label) in enumerate(look):panel(im,(25+i%3*590,110+i//3*510,565,490),img(E/'expressions'/f'{n}.png'),label,status='Bounds checked; Z travel subtle')
ImageDraw.Draw(im).text((25,1150),'Gaze clamped to 80% of directional white/pupil/glint margin. Blink suppresses gaze; no white/glint leak observed.',font=ft(18),fill='#d1d8e2');im.save(E/'blink-gaze-sheet.png')
# Practical mobile-size head-shot sheet. This is not a full-body Reels readability certification.
im=base('MOBILE THUMBNAILS / HEAD SHOT',(1080,490))
for i,n in enumerate(expressions):
 p=ImageOps.contain(img(E/'expressions'/f'{n}.png'),(180,240),Image.Resampling.LANCZOS);x=25+i*210;im.paste(p,(x,120));ImageDraw.Draw(im).text((x,370),n.upper(),font=ft(18),fill='white')
ImageDraw.Draw(im).text((25,420),'180 x 225 px head-shot thumbnails. Happy/enthusiastic remain close; subtle gaze/mouth',font=ft(17),fill='#d1d8e2');ImageDraw.Draw(im).text((25,449),'will be weaker in a full-body Reels frame. Mobile performance review still required.',font=ft(17),fill='#d1d8e2');im.save(E/'mobile-expression-check.png')
a=img(R.parent/'modeling-04-final-polish/evaluation/three-quarter.png');b=img(E/'identity/locked-neutral-identity.png');diff=ImageChops.difference(a,b);pixels=list(diff.get_flattened_data());hi=max(v[1] for v in diff.getextrema());changed=sum(p!=(0,0,0) for p in pixels);mae=sum(sum(p) for p in pixels)/(len(pixels)*3)
metric={'reference':'Approved polished Model04 neutral three-quarter','resolution':list(a.size),'samples':48,'maxChannelDifference':hi,'changedPixels':changed,'totalPixels':len(pixels),'meanAbsoluteRGBDifference0to255':mae,'pixelIdentical':hi==0,'interpretation':'Not pixel-identical. Raw approved mesh/Basis/materials unchanged; rest LBS world error <1e-5 and tiny sampling/edge differences quantified. No intentional neutral redesign.'}
(R/'docs/neutral-render-comparison.json').write_text(json.dumps(metric,indent=2))
im=base('LOCKED NEUTRAL vs RIGGED NEUTRAL',(1340,1010))
im.paste(a,(15,125));im.paste(b,(685,125));d=ImageDraw.Draw(im);d.text((25,95),'LOCKED POLISHED MODEL04',font=ft(21),fill='white');d.text((695,95),'RIG V1 / ALL CONTROLS ZERO',font=ft(21),fill='white');d.text((25,946),f'RGB max {hi}/255 | changed pixels {changed}/{len(pixels)} | mean absolute RGB difference {mae:.7f}',font=ft(18),fill='#d1d8e2');d.text((25,976),'No topology or neutral design edits. Exact mesh/Basis/material and numerical world-space checks in reports.',font=ft(18),fill='#d1d8e2');im.save(E/'neutral-identity-comparison.png')
diff.point(lambda x:min(255,x*16)).save(E/'identity/neutral-difference-x16.png')
pages=[img(E/n) for n in ['body-pose-sheet.png','contact-issues-sheet.png','expression-sheet.png','blink-gaze-sheet.png','mobile-expression-check.png','neutral-identity-comparison.png']]
pages[0].save(E/'evaluation-sheets.pdf',save_all=True,append_images=pages[1:],resolution=150)
print('SHEETS_DONE',metric)
