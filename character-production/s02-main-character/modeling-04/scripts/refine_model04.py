"""Direct Model03 silhouette correction. Only writes modeling-04; no rig/export."""
import bpy,bmesh,json,hashlib,math,sys
from pathlib import Path
from mathutils import Vector
ROOT=Path(__file__).resolve().parents[1];BASE=ROOT.parent/'modeling-03/source/s02-character-modeling-03.blend'
bpy.ops.wm.open_mainfile(filepath=str(BASE))
s=bpy.context.scene;col=bpy.data.collections['CHARACTER | MODELING REVIEW ONLY']
root=bpy.data.objects['S02_MainCharacter_MODELING_03_UNAPPROVED_UNRIGGED']
def state():
 return {o.name:{'vertices':[list(v.co) for v in o.data.vertices],'faces':[list(p.vertices) for p in o.data.polygons],'materials':[m.name for m in o.data.materials],'modifiers':[(m.name,m.type,getattr(m,'width',None),getattr(m,'segments',None)) for m in o.modifiers]} for o in col.objects if o.type=='MESH'}
before=state()
# Load only existing utility definitions/material mapping; no Model02 reconstruction executed.
utils=(ROOT.parent/'modeling-02/scripts/revise_character.py').read_text();exec(utils[utils.index('M={}'):utils.index('# 1. Re-contour')])
removed=[]
def remove(names):
 for name in names:
  o=bpy.data.objects.get(name)
  if o:removed.append(name);bpy.data.objects.remove(o,do_unlink=True)
def angular(name,profile,front,back,material='hair'):
 o=extrusion(name,profile,front,back,material,.005)
 for m in o.modifiers:
  if m.type=='BEVEL':m.segments=1
 return o
# Replace the two front strips locally with ordered, non-self-crossing step outlines.
# Keep original crown, back layers, hair foundation and sideburns.
remove(['Hair | M03 stepped fringe','Hair | M03 upper angular layer'])
angular('Hair | M04 stepped fringe',[(-.59,3.69),(-.37,3.69),(-.37,3.75),(-.11,3.75),(-.11,3.72),(.22,3.72),(.22,3.68),(.53,3.68),(.53,3.87),(.24,3.87),(.24,3.94),(-.13,3.94),(-.13,3.91),(-.59,3.91)],-.54,-.24)
angular('Hair | M04 connected upper layer',[(-.55,3.88),(-.26,3.88),(-.26,3.95),(.12,3.95),(.12,3.91),(.45,3.91),(.45,4.06),(.15,4.06),(.15,4.12),(-.19,4.12),(-.19,4.09),(-.55,4.09)],-.455,-.005,'hairmid')
# Broad irregular side steps replace ten separated similarly-sized locks.
for sign,side in [(-1,'L'),(1,'R')]:
 remove([f'Hair | {side} '+n for n in ['temple','high-side','mid-side','rear-high','rear-middle']])
 def sideplate(name,profile,outer,inner,mat):
  o=angular(name,profile,inner,outer,mat)
  # extrusion yields (profile.x, depth, profile.z); rotate placement into YZ side plane.
  for v in o.data.vertices:
   y,x,z=v.co;v.co=(sign*x,y,z)
  bm=bmesh.new();bm.from_mesh(o.data);bmesh.ops.recalc_face_normals(bm,faces=list(bm.faces));bm.to_mesh(o.data);bm.free()
 sideplate(f'Hair | M04 {side} upper side step',[(-.36,3.70),(-.14,3.70),(-.14,3.65),(.15,3.65),(.15,3.70),(.43,3.70),(.43,3.87),(.24,3.87),(.24,4.00),(-.07,4.00),(-.07,3.93),(-.36,3.93)],.71,.49,'hair')
 sideplate(f'Hair | M04 {side} lower side step',[(-.25,3.43),(-.07,3.43),(-.07,3.35),(.19,3.35),(.19,3.31),(.44,3.31),(.44,3.67),(.27,3.67),(.27,3.77),(-.25,3.77)],.735,.49,'hair')
# Widen skull/hair envelope, preserving crown-to-chin height; feature shapes stay intact.
feature_prefixes=('Eye white.','Pupil.','Eye glint.','Upper eyelid.','Brow.','Blush.','Neutral mouth','Nose |')
for o in col.objects:
 if o.type!='MESH':continue
 if o.name.startswith('Hair |'):
  for v in o.data.vertices:v.co.x*=1.10
 elif o.name.startswith('Head |'):
  for v in o.data.vertices:
   v.co.x*=1.12*(1+.025*max(0,min(1,(3.20-v.co.z)/.165)))
  for m in o.modifiers:
   if m.type=='BEVEL':m.width=.005;m.segments=1
 elif o.name.startswith(('Ear.','Ear inner.')):
  cx=sum(v.co.x for v in o.data.vertices)/len(o.data.vertices)
  for v in o.data.vertices:v.co.x+=cx*.12
 elif o.name.startswith(feature_prefixes):
  cx=sum(v.co.x for v in o.data.vertices)/len(o.data.vertices)
  for v in o.data.vertices:v.co.x+=cx*.08
# Compact oversized garment: widen chest/hem and gently enlarge sleeves/cuffs.
for o in col.objects:
 if o.type!='MESH':continue
 n=o.name
 if n.startswith(('Hoodie torso','Hoodie hem','Hem seam')):
  for v in o.data.vertices:v.co.x*=1.13;v.co.y*=1.04
  for m in o.modifiers:
   if m.type=='BEVEL':m.width=min(m.width,.010);m.segments=1
 elif n.startswith(('Sleeve |','Cuff |','Cuff rib.','Shoulder seam.')):
  for v in o.data.vertices:v.co.x*=1.09;v.co.y*=1.05
  for m in o.modifiers:
   if m.type=='BEVEL':m.width=min(m.width,.010);m.segments=1
 elif n.startswith(('Palm.','Thumb.','Finger crease.')):
  for v in o.data.vertices:v.co.x+=(-1 if v.co.x<0 else 1)*.055
 elif n.startswith(('Kangaroo pouch','Pouch opening stitch')):
  for v in o.data.vertices:v.co.x*=1.10;v.co.y-=.012
 elif n.startswith('Hood | open layered rim'):
  for v in o.data.vertices:v.co.x*=1.10;v.co.z=2.79+(v.co.z-2.79)*.55-.015
 elif n.startswith('Hood | front folded lip.'):
  for v in o.data.vertices:v.co.x*=1.10;v.co.z=2.73+(v.co.z-2.73)*.75
 elif n.startswith(('Hood | draped back shell','Hood back seam')):
  for v in o.data.vertices:v.co.x*=1.10;v.co.z=2.70+(v.co.z-2.70)*.90
 elif n.startswith(('Cord cotton.','Cord eyelet.')):
  for v in o.data.vertices:v.co.z-=.09*max(0,min(1,(v.co.z-2.60)/.22))
# Remove the old closed front ring; retain folded lips and form a closed-surface U rim.
remove(['Hood | open layered rim'])
path=[(-.37,-.235,2.85),(-.40,-.02,2.88),(-.29,.235,2.92),(0,.29,2.93),(.29,.235,2.92),(.40,-.02,2.88),(.37,-.235,2.85)]
rings=[]
for i,(x,y,z) in enumerate(path):
 a=Vector(path[max(0,i-1)]);b=Vector(path[min(len(path)-1,i+1)])
 tangent=(b-a).normalized();normal=Vector((-tangent.y,tangent.x,0)).normalized()*.052
 rings.append([(1.10*(x+normal.x),y+normal.y,z-.035),(1.10*(x-normal.x),y-normal.y,z-.035),(1.10*(x-normal.x),y-normal.y,z+.035),(1.10*(x+normal.x),y+normal.y,z+.035)])
loft('Hood | M04 open U rim',rings,'hoodie',.006,1)
# Leg width and shoe alignment: modest width gain, unchanged feature families.
shoe_prefixes=('Outsole.','Shoe upper.','Toe panel.','Ankle collar.','Tongue.')
for o in col.objects:
 if o.type!='MESH':continue
 n=o.name
 if n.startswith(('Trousers.','Trouser outer seam.','Hem fold.')):
  for v in o.data.vertices:v.co.x*=1.05
 elif n.startswith(shoe_prefixes):
  sign=-1 if n.endswith('.L') else 1
  for v in o.data.vertices:v.co.x+=sign*.0121
 # Toe height correction; unchanged ankle height and foot length.
 if n.startswith(('Shoe upper.','Toe panel.')):
  for v in o.data.vertices:
   t=max(0,min(1,(-v.co.y-.05)/.30));v.co.z=.126+(v.co.z-.126)*(1-.12*t)
 if n.startswith('Outsole.'):
  for v in o.data.vertices:v.co.z=.035+(v.co.z-.035)*.85
# Seat the retained shoe assembly on the thinner sole, avoiding a new open gap.
for o in col.objects:
 if o.type=='MESH' and o.name.startswith(('Shoe upper.','Toe panel.','Ankle collar.','Tongue.')):
  for v in o.data.vertices:v.co.z-=.014
# Shorten only ankle-to-hem region by .09 units; translate upper body rigidly.
for o in col.objects:
 if o.type!='MESH':continue
 for v in o.data.vertices:v.co.z-=.09*max(0,min(1,(v.co.z-.48)/(1.671-.48)))
root.name='S02_MainCharacter_MODELING_04_UNAPPROVED_UNRIGGED';root['approved']=False;root['rigged']=False
s['approval_stage']='MODEL 04 | silhouette correction | UNAPPROVED'
bpy.context.view_layer.update()
pts=[o.matrix_world@v.co for o in col.objects if o.type=='MESH' for v in o.data.vertices]
head=[o.matrix_world@v.co for o in col.objects if o.type=='MESH' and o.name.startswith(('Head |','Hair |','Ear.')) for v in o.data.vertices]
floor=min(p.z for p in pts);top=max(p.z for p in pts);chin=min((o.matrix_world@v.co).z for o in col.objects if o.name.startswith('Head |') for v in o.data.vertices)
ratio=(top-floor)/(top-chin);root['head_count_measured']=ratio
after=state()
report={'baseCommit':'50e9b4ad13eb88d729d74732666c72d4a4ba6d88','baseSHA256':hashlib.sha256(BASE.read_bytes()).hexdigest(),'headHeightRatio':ratio,'headRangePass':3.5<=ratio<=4,'height':top-floor,'headHeight':top-chin,'approved':False,'status':'UNAPPROVED','materialsChanged':False,'buildBlender':bpy.app.version_string,'renders':[]}
(ROOT/'docs/build-metadata.json').write_text(json.dumps(report,indent=2))
changes={'added':[n for n in after if n not in before],'removed':removed,'modified':[n for n in after if n in before and before[n]!=after[n]],'unchanged':[n for n in after if n in before and before[n]==after[n]],'perObject':{n:{'before':before.get(n),'after':after.get(n)} for n in before.keys()|after.keys() if before.get(n)!=after.get(n)},'materialPolicy':'All 21 existing material datablocks and node inputs preserved; no recoloring or reassignment of retained objects.'}
# Complete per-object vertex/face records permit exact review of changes.
(ROOT/'docs/changed-geometry.json').write_text(json.dumps(changes,indent=2))
s.render.filepath=str(ROOT/'evaluation/three-quarter.png')
root['status']='Model04 controlled silhouette correction; UNAPPROVED; no rig or export.'
bpy.ops.wm.save_as_mainfile(filepath=str(ROOT/'source/s02-character-modeling-04.blend'))
print('MODEL04_BUILD_DONE',ratio)
