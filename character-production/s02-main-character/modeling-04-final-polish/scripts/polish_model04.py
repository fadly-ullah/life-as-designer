"""Minimal Model04 component polish. No global transform, rig, animation or export."""
import bpy,bmesh,json,hashlib,math
from pathlib import Path
from mathutils import Vector
R=Path(__file__).resolve().parents[1];BASE=R.parent/'modeling-04/source/s02-character-modeling-04.blend'
bpy.ops.wm.open_mainfile(filepath=str(BASE));s=bpy.context.scene
col=bpy.data.collections['CHARACTER | MODELING REVIEW ONLY'];root=bpy.data.objects['S02_MainCharacter_MODELING_04_UNAPPROVED_UNRIGGED']
def state():
 return {o.name:{'vertices':[list(v.co) for v in o.data.vertices],'faces':[list(p.vertices) for p in o.data.polygons],'matrix':[list(row) for row in o.matrix_world],'materialSlots':[m.name for m in o.data.materials],'modifiers':[(m.name,m.type,getattr(m,'width',None),getattr(m,'segments',None)) for m in o.modifiers]} for o in col.objects if o.type=='MESH'}
before=state()
# Reuse existing mesh helpers only, not the older Model02 construction workflow.
utils=(R.parent/'modeling-02/scripts/revise_character.py').read_text();exec(utils[utils.index('M={}'):utils.index('# 1. Re-contour')])
def relief(name,profile,front,back,mat='hair'):
 o=extrusion(name,profile,front,back,mat,.003)
 for mod in o.modifiers:
  if mod.type=='BEVEL':mod.segments=1
 return o
# Inset only outward planes of existing side panels by .018; silhouette outlines remain.
# New shallow, unequal stepped overlays restore relief inside the existing hair envelope.
for sign,side in [(-1,'L'),(1,'R')]:
 for band in ['upper','lower']:
  o=bpy.data.objects[f'Hair | M04 {side} {band} side step'];outer=max(sign*v.co.x for v in o.data.vertices)
  for v in o.data.vertices:
   if abs(sign*v.co.x-outer)<1e-5:v.co.x-=sign*.018
 def side_relief(name,profile,outer):
  o=relief(name,profile,outer-.043,outer)
  for v in o.data.vertices:
   y,x,z=v.co;v.co=(sign*x,y,z)
  bm=bmesh.new();bm.from_mesh(o.data);bmesh.ops.recalc_face_normals(bm,faces=list(bm.faces));bm.to_mesh(o.data);bm.free()
 side_relief(f'Hair | Polish {side} upper stagger',[(-.30,3.66),(.12,3.66),(.12,3.71),(.22,3.71),(.22,3.88),(-.03,3.88),(-.03,3.81),(-.30,3.81)],.779)
 side_relief(f'Hair | Polish {side} temple step',[(-.245,3.37),(-.035,3.37),(-.035,3.62),(-.12,3.62),(-.12,3.65),(-.245,3.65)],.802)
 side_relief(f'Hair | Polish {side} center side step',[(-.035,3.29),(.13,3.29),(.13,3.34),(.21,3.34),(.21,3.58),(.07,3.58),(.07,3.55),(-.035,3.55)],.8085)
 side_relief(f'Hair | Polish {side} rear side step',[(.21,3.25),(.435,3.25),(.435,3.51),(.34,3.51),(.34,3.55),(.21,3.55)],.797)
# Rear plates retain their original perimeter; shallow inset avoids a single flat back cap.
for suffix in ['lower','middle','upper']:
 o=bpy.data.objects['Hair | M03 rear '+suffix];outer=max(v.co.y for v in o.data.vertices)
 for v in o.data.vertices:
  if abs(v.co.y-outer)<1e-5:v.co.y-=.018
rear=[
 ('lower sweep',[(-.48,3.20),(.45,3.20),(.45,3.35),(.20,3.35),(.20,3.38),(-.23,3.38),(-.23,3.34),(-.48,3.34)],.578),
 ('left middle',[(-.585,3.41),(-.22,3.41),(-.22,3.66),(-.34,3.66),(-.34,3.73),(-.585,3.73)],.625),
 ('central middle',[(-.25,3.37),(.14,3.37),(.14,3.42),(.28,3.42),(.28,3.69),(.03,3.69),(.03,3.72),(-.25,3.72)],.630),
 ('right middle',[(.25,3.43),(.58,3.43),(.58,3.70),(.44,3.70),(.44,3.74),(.25,3.74)],.619),
 ('upper left',[(-.49,3.78),(.08,3.78),(.08,3.95),(-.18,3.95),(-.18,3.97),(-.49,3.97)],.588),
 ('upper right',[(.08,3.77),(.48,3.77),(.48,3.92),(.27,3.92),(.27,3.99),(.08,3.99)],.583)]
for name,profile,outer in rear:relief('Hair | Polish rear '+name,profile,outer-.043,outer)
# Eye assembly: +22% width, +15% height about original white center; spacing unchanged.
# Brows, blush, mouth, jaw, nose and ears are untouched.
for side in ['L','R']:
 white=bpy.data.objects['Eye white.'+side]
 xs=[v.co.x for v in white.data.vertices];zs=[v.co.z for v in white.data.vertices]
 cx=(min(xs)+max(xs))/2;cz=(min(zs)+max(zs))/2
 for prefix in ['Eye white.','Pupil.','Eye glint.','Upper eyelid.']:
  o=bpy.data.objects[prefix+side]
  for v in o.data.vertices:v.co.x=cx+(v.co.x-cx)*1.22;v.co.z=cz+(v.co.z-cz)*1.15
# Sleeve ring centers and Z positions stay fixed; increase only cross-sectional volume.
for side in ['L','R']:
 o=bpy.data.objects['Sleeve | continuous shaped elbow.'+side]
 assert len(o.data.vertices)%12==0
 for start in range(0,len(o.data.vertices),12):
  ringverts=list(o.data.vertices)[start:start+12]
  cx=sum(v.co.x for v in ringverts)/12;cy=sum(v.co.y for v in ringverts)/12;z=sum(v.co.z for v in ringverts)/12
  t=max(0,min(1,(z-1.85)/.75));sx=1.04+.05*t;sy=1.05+.04*t
  for v in ringverts:v.co.x=cx+(v.co.x-cx)*sx;v.co.y=cy+(v.co.y-cy)*sy
 for mod in o.modifiers:
  if mod.type=='BEVEL':mod.width=.006;mod.segments=1
 cuff=bpy.data.objects['Cuff | shaped rib knit.'+side]
 cx=sum(v.co.x for v in cuff.data.vertices)/len(cuff.data.vertices);cy=sum(v.co.y for v in cuff.data.vertices)/len(cuff.data.vertices)
 for obj in [cuff]+[o for o in col.objects if o.name.startswith('Cuff rib.'+side+'.')]:
  for v in obj.data.vertices:v.co.x=cx+(v.co.x-cx)*1.06;v.co.y=cy+(v.co.y-cy)*1.07
 for mod in cuff.modifiers:
  if mod.type=='BEVEL':mod.width=.005;mod.segments=1
 seam=bpy.data.objects['Shoulder seam.'+side]
 for v in seam.data.vertices:v.co.y-=.008
bpy.context.view_layer.update()
after=state();added=sorted(set(after)-set(before));changed=sorted(n for n in before if before[n]!=after.get(n));removed=sorted(set(before)-set(after))
allowed=('Hair | M04 L upper side step','Hair | M04 L lower side step','Hair | M04 R upper side step','Hair | M04 R lower side step','Hair | M03 rear ','Eye white.','Pupil.','Eye glint.','Upper eyelid.','Sleeve |','Cuff |','Cuff rib.','Shoulder seam.')
assert not removed and all(n.startswith(allowed) for n in changed),changed
assert all(n.startswith('Hair | Polish ') for n in added)
changes={'baseCommit':'8a108a6a75420e11d9f1e603e3295188c7c5d9c5','added':added,'removed':removed,'modified':changed,'unchanged':sorted(n for n in before if before[n]==after.get(n)),'geometry':{n:{'before':before.get(n),'after':after.get(n)} for n in sorted(set(changed+added))},'materialChanges':[],'eyeScale':[1.22,1,1.15],'eyeCentersAndSpacingChanged':False,'globalTransformsApplied':False,'hairDetail':'Shallow staggered relief over inset original side/back planes, not a new hair foundation.'}
(R/'docs/changed-geometry.json').write_text(json.dumps(changes,indent=2))
root.name='S02_MainCharacter_MODEL04_FINAL_POLISH_UNAPPROVED_UNRIGGED';root['approved']=False;root['rigged']=False
root['status']='Minimal Model04 identity polish; UNAPPROVED; identity not locked.'
s['approval_stage']='MODEL04 FINAL POLISH | UNAPPROVED | awaiting explicit identity approval'
s.render.filepath='//../evaluation/three-quarter.png'
bpy.ops.wm.save_as_mainfile(filepath=str(R/'source/s02-character-model04-final-polish.blend'))
print('POLISH_BUILD_DONE',len(added),len(changed),len(changes['unchanged']))
