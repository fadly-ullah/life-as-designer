"""Controlled Model 02 mesh refinement; run with Blender -b -t 2 --python this_file."""
import bpy,bmesh,json,math,hashlib
from pathlib import Path
from mathutils import Vector
ROOT=Path(__file__).resolve().parents[1]
BASE=ROOT.parent/'modeling-02/source/s02-character-modeling-02.blend'
bpy.ops.wm.open_mainfile(filepath=str(BASE))
s=bpy.context.scene;col=bpy.data.collections['CHARACTER | MODELING REVIEW ONLY']
root=bpy.data.objects['S02_MainCharacter_MODELING_02_UNAPPROVED_UNRIGGED']
def snapshot():
 return {o.name:{'vertices':[list(v.co) for v in o.data.vertices],'materials':[m.name for m in o.data.materials]} for o in col.objects if o.type=='MESH'}
before=snapshot()
materials={m.name:{'diffuse':list(m.diffuse_color),'nodes':[(n.name,{i.name:list(i.default_value) if hasattr(i.default_value,'__len__') else i.default_value for i in n.inputs if hasattr(i,'default_value') and isinstance(i.default_value,(int,float)) or hasattr(i,'default_value') and i.type in ['RGBA','VECTOR']}) for n in m.node_tree.nodes] if m.use_nodes else []} for m in bpy.data.materials}
# Reuse original mesh construction helpers only, without running the Model 02 rebuild.
source=(ROOT.parent/'modeling-02/scripts/revise_character.py').read_text()
exec(source[source.index('M={}'):source.index('# 1. Re-contour')])
# Four angular replacement fringe/crown strips; all other head parts stay in place.
removed=[]
def remove(prefixes):
 for o in list(col.objects):
  if o.type=='MESH' and o.name.startswith(tuple(prefixes)):
   removed.append(o.name);bpy.data.objects.remove(o,do_unlink=True)
remove(['Hair | primary swept fringe','Hair | upper offset sweep','Hair | left lifted crest','Hair | right tucked forelock','Hair | back tier'])
# Deliberate stepped outlines, broad planar faces and single-segment tiny bevels.
def hair(name,profile,front,back,mat='hair'):
 o=extrusion(name,profile,front,back,mat,.006)
 for m in o.modifiers:
  if m.type=='BEVEL':m.segments=1
 return o
hair('Hair | M03 stepped fringe',[(-.55,3.65),(-.38,3.65),(-.38,3.73),(-.10,3.73),(-.10,3.69),(.20,3.69),(.20,3.64),(.44,3.64),(.44,3.84),(.16,3.84),(.16,3.91),(-.20,3.91),(-.20,3.88),(-.55,3.88)],-.529,-.26)
hair('Hair | M03 upper angular layer',[(-.53,3.86),(-.28,3.86),(-.28,3.94),(.16,3.94),(.16,3.90),(.38,3.90),(.38,4.10),(.07,4.10),(.07,4.16),(-.28,4.16),(-.28,4.12),(-.53,4.12)],-.44,-.04,'hairmid')
hair('Hair | M03 crown step',[(-.42,4.08),(.30,4.08),(.30,4.21),(.12,4.21),(.12,4.29),(-.20,4.29),(-.20,4.25),(-.42,4.25)],-.18,.21)
# Replace twelve rear tiles by three wide overlapping stepped layers.
hair('Hair | M03 rear lower',[(-.50,3.34),(.47,3.34),(.47,3.53),(.54,3.53),(.54,3.70),(-.54,3.70),(-.54,3.51),(-.50,3.51)],.39,.58)
hair('Hair | M03 rear middle',[(-.56,3.58),(-.29,3.58),(-.29,3.53),(.17,3.53),(.17,3.59),(.55,3.59),(.55,3.92),(.40,3.92),(.40,4.00),(-.41,4.00),(-.41,3.93),(-.56,3.93)],.44,.63)
hair('Hair | M03 rear upper',[(-.49,3.92),(.48,3.92),(.48,4.12),(.29,4.12),(.29,4.20),(-.28,4.20),(-.28,4.15),(-.49,4.15)],.37,.59)
# Keep the angular fringe above the original thick brows.
for v in bpy.data.objects['Hair | M03 stepped fringe'].data.vertices:
 if v.co.z<3.80:v.co.z+=.12
# Reduce eye height 17%; preserve width, pupil alignment, brows and expression.
for o in col.objects:
 if o.type!='MESH':continue
 if o.name.startswith(('Eye white.','Pupil.','Eye glint.','Upper eyelid.')):
  for v in o.data.vertices:v.co.z=3.51+(v.co.z-3.51)*.83
 if o.name.startswith('Head |'):
  # Increase lower plane widths toward the upper jaw, rather than rounding.
  for v in o.data.vertices:
   if v.co.z<3.28:v.co.x*=1+.045*max(0,(3.28-v.co.z)/.15)
  for m in o.modifiers:
   if m.type=='BEVEL':m.segments=1;m.width=.008
# Collar opens in a shallow V; retain the existing rim mesh and lip objects.
for o in col.objects:
 if o.type!='MESH':continue
 if o.name.startswith(('Hood | open layered rim','Hood | front folded lip.')):
  for v in o.data.vertices:
   if v.co.y<.03:
    front=max(0,min(1,(.03-v.co.y)/.26));center=max(0,1-abs(v.co.x)/.39)
    v.co.z-=front*(.045+.085*center)
 if o.name.startswith(('Hood | draped back shell','Hood back seam')):
  for v in o.data.vertices:v.co.y=.16+(v.co.y-.16)*.77;v.co.z=3.09+(v.co.z-3.09)*.85
# Replace only pouch and its seams: horizontal top and nearly rectangular body.
remove(['Kangaroo pouch','Pouch bottom stitch','Pouch hand opening','Pouch opening stitch'])
extrusion('Kangaroo pouch | M03 rectangular', [(-.28,2.025),(.28,2.025),(.28,2.225),(.235,2.29),(-.235,2.29),(-.28,2.225)],-.334,-.289,'hoodie',.006)
for sign,side in [(-1,'L'),(1,'R')]:
 line('Pouch opening stitch.M03.'+side,[(sign*.266,-.339,2.17),(sign*.266,-.339,2.24),(sign*.235,-.339,2.28)],'hoodshade',.003)
# Straighten the knee and widen each existing trouser leg 4%, keeping center spacing.
for o in col.objects:
 if o.type!='MESH':continue
 if o.name.startswith(('Trousers.','Trouser outer seam.')):
  cx=-.2425 if o.name.endswith('.L') else .2425
  for v in o.data.vertices:
   v.co.x=cx+(v.co.x-cx)*1.04
   # remove rear knee bulge gradually, retain ankle and hip volumes
   t=max(0,1-abs(v.co.z-1.05)/.55)
   v.co.y=.03+(v.co.y-.03)*(1-.12*t)
# Shoes retain all original material assignments; remove decorative toe seams only.
remove(['Toe stitch.'])
for o in col.objects:
 if o.type!='MESH':continue
 if o.name.startswith(('Shoe upper.','Toe panel.')):
  for v in o.data.vertices:
   t=max(0,min(1,(-v.co.y-.04)/.30))
   v.co.z=.126+(v.co.z-.126)*(1-.15*t)
 if o.name.startswith('Outsole.'):
  for v in o.data.vertices:v.co.z=.035+(v.co.z-.035)*1.10
# Shorten leg region by .10 units; translate torso/head intact, no head rescaling.
for o in col.objects:
 if o.type!='MESH':continue
 for v in o.data.vertices:
  z=v.co.z
  v.co.z=z-.10*max(0,min(1,(z-.48)/(1.77-.48)))
bpy.context.view_layer.update()
root.name='S02_MainCharacter_MODELING_03_UNAPPROVED_UNRIGGED';root['approved']=False;root['rigged']=False
s['approval_stage']='MODELING 03 | identity refinement | awaiting user review'
after=snapshot()
changes={'removed':removed,'added':[k for k in after if k not in before], 'modified':[k for k in after if k in before and after[k]!=before[k]],'unchanged':[k for k in after if k in before and after[k]==before[k]],'materials':'No materials created, removed, recolored or reassigned. Original Model 02 node trees retained.'}
(ROOT/'docs/geometry-material-changes.json').write_text(json.dumps(changes,indent=2))
# Original camera direction and lighting, low-cost sequential Cycles CPU renders.
pts=[o.matrix_world@v.co for o in col.objects if o.type=='MESH' for v in o.data.vertices]
head=[o.matrix_world@v.co for o in col.objects if o.type=='MESH' and o.name.startswith(('Head |','Hair |','Ear.')) for v in o.data.vertices]
floor=min(p.z for p in pts);top=max(p.z for p in pts);chin=min(p.z for o in col.objects if o.name.startswith('Head |') for p in [o.matrix_world@v.co for v in o.data.vertices]);height=top-floor;heads=height/(top-chin)
root['head_count_measured']=heads
s.render.engine='CYCLES';s.cycles.device='CPU';s.cycles.samples=48;s.cycles.use_denoising=False
s.render.threads_mode='FIXED';s.render.threads=2
s.render.resolution_x=640;s.render.resolution_y=800;s.render.resolution_percentage=100
s.render.image_settings.file_format='PNG';s.render.use_file_extension=True
center=(floor+top)/2;cam=s.camera;cam.data.ortho_scale=height*1.19
views={'front':(0,-10,center+.72),'side':(10,0,center+.72),'three-quarter':(-6.5,-9,center+1.30),'back':(0,10,center+.72)}
def view(n):
 cam.location=views[n];cam.rotation_euler=(Vector((0,0,center))-cam.location).to_track_quat('-Z','Y').to_euler();s.render.filepath=str(ROOT/f'evaluation/{n}.png')
view('three-quarter')
bpy.ops.wm.save_as_mainfile(filepath=str(ROOT/'source/s02-character-modeling-03.blend'))
report={'baseCommit':'2f6a28a0ae70eda0901646bbcf6ba1e450f15d26','baseBlendSHA256':hashlib.sha256(BASE.read_bytes()).hexdigest(),'blender':bpy.app.version_string,'headHeightRatio':heads,'headRangePass':3.5<=heads<=4,'height':height,'headHeight':top-chin,'meshObjects':len(after),'armatures':sum(o.type=='ARMATURE' for o in bpy.data.objects),'animationActions':len(bpy.data.actions),'approved':False,'materialCount':len(bpy.data.materials),'render':{'engine':'Cycles CPU','samples':48,'denoising':False,'threads':2,'resolution':[640,800],'sequential':True},'limitations':['Visual refinement only; no deformation or production topology approval.','Concept has differing light/camera and low-resolution turnaround.'],'renders':[]}
(ROOT/'docs/technical-validation.json').write_text(json.dumps(report,indent=2))
for name in views:
 view(name);bpy.ops.render.render(write_still=True);report['renders'].append(name)
 (ROOT/'docs/technical-validation.json').write_text(json.dumps(report,indent=2))
print('MODEL03_DONE',heads)
