"""Controlled FK rig: explicit per-region weights, existing-mesh facial morphs, no export."""
import bpy,json,math,hashlib
from pathlib import Path
from mathutils import Vector
R=Path(__file__).resolve().parents[1];PREP=R.parent/'rigging-prep';BASE=PREP/'source/s02-character-rigging-prep.blend'
bpy.ops.wm.open_mainfile(filepath=str(BASE));s=bpy.context.scene
mapping=json.loads((PREP/'docs/hierarchy-bindings.json').read_text());LM={k:Vector(v['position']) for k,v in mapping['landmarks'].items()}
meshes=[bpy.data.objects[v['object']] for v in mapping['meshes']];root=bpy.data.objects['S02_MainCharacter_IDENTITY_LOCKED_RIG_PREP_NOT_RIGGED']
arm=bpy.data.armatures.new('S02_FK_RIG_V1_SKELETON');rig=bpy.data.objects.new('S02_RIG_V1',arm);s.collection.objects.link(rig);rig.parent=root;rig.show_in_front=True
bpy.context.view_layer.objects.active=rig;rig.select_set(True);bpy.ops.object.mode_set(mode='EDIT')
bones=[]
def bone(n,h,t,parent=None):
 b=arm.edit_bones.new(n);b.head=h;b.tail=t;b.roll=0
 if parent:b.parent=arm.edit_bones[parent]
 b.use_deform=True;bones.append(n);return b
pel=LM['PELVIS'];ch=LM['CHEST'];hb=LM['HEAD_BASE'];sp=Vector((0,.03,2.08));neck=Vector((0,.02,2.85))
bone('root',(0,0,.035),(0,0,.335));bone('pelvis',pel,sp,'root');bone('spine',sp,ch,'pelvis');bone('chest',ch,neck,'spine');bone('neck',neck,hb,'chest');bone('head',hb,(0,.02,3.88),'neck')
for side in ['L','R']:
 shoulder=LM['SHOULDER_'+side];elbow=LM['ELBOW_'+side];wrist=LM['WRIST_'+side];hip=LM['HIP_'+side];knee=LM['KNEE_'+side];ankle=LM['ANKLE_'+side]
 bone('clavicle.'+side,ch,shoulder,'chest');bone('upperArm.'+side,shoulder,elbow,'clavicle.'+side);bone('forearm.'+side,elbow,wrist,'upperArm.'+side)
 bone('hand.'+side,wrist,wrist+Vector((0,-.02,-.25)),'forearm.'+side)
 bone('thigh.'+side,hip,knee,'pelvis');bone('shin.'+side,knee,ankle,'thigh.'+side);bone('foot.'+side,ankle,LM['TOE_'+side],'shin.'+side)
bpy.ops.object.mode_set(mode='OBJECT');rig.select_set(False)
for pb in rig.pose.bones:pb.rotation_mode='QUATERNION'
def clamp(x):return max(0,min(1,x))
def blend(z,a,b,na,nb):
 f=clamp((z-a)/(b-a));return {na:1-f,nb:f}
def torso(z):
 if z<2.08:return blend(z,1.80,2.08,'pelvis','spine')
 return blend(z,2.08,2.60,'spine','chest')
def sleeve(z,side):
 e=LM['ELBOW_'+side].z;sh=LM['SHOULDER_'+side].z
 lower=1-clamp((z-(e-.15))/.30);cap=clamp((z-(sh-.17))/.17)*.22
 return {'clavicle.'+side:cap,'upperArm.'+side:(1-lower)*(1-cap),'forearm.'+side:lower*(1-cap)}
def legs(z,side):
 k=LM['KNEE_'+side].z;h=LM['HIP_'+side].z
 lower=1-clamp((z-(k-.14))/.28);hip=clamp((z-(h-.12))/.20)*.55
 return {'pelvis':hip,'thigh.'+side:(1-lower)*(1-hip),'shin.'+side:lower*(1-hip)}
weight_report=[]
for item in mapping['meshes']:
 o=bpy.data.objects[item['object']];group=item['prepGroup'];n=o.name;side='L' if group.endswith('_L') else 'R' if group.endswith('_R') else None
 if group in ['PREP_GROUP_HEAD','PREP_GROUP_FACE','PREP_GROUP_HAIR']:policy='rigid';fn=lambda z:{'head':1}
 elif group.startswith('PREP_GROUP_HAND'):policy='rigid';fn=lambda z,side=side:{'hand.'+side:1}
 elif group.startswith('PREP_GROUP_FOOT'):policy='rigid';fn=lambda z,side=side:{'foot.'+side:1}
 elif group.startswith('PREP_GROUP_ARM'):
  if n.startswith(('Cuff |','Cuff rib.')):policy='rigid_cuff';fn=lambda z,side=side:{'forearm.'+side:1}
  else:policy='manual_sleeve';fn=lambda z,side=side:sleeve(z,side)
 elif group.startswith('PREP_GROUP_LEG'):
  if n.startswith('Hem fold.'):policy='rigid_hem';fn=lambda z,side=side:{'shin.'+side:1}
  else:policy='manual_trouser';fn=lambda z,side=side:legs(z,side)
 elif n.startswith(('Hoodie torso','Hoodie hem','Hem seam','Kangaroo pouch','Pouch opening')):policy='manual_torso';fn=torso
 elif n=='Neck':policy='manual_neck';fn=lambda z:blend(z,2.87,3.08,'neck','head')
 else:policy='rigid_chest_accessory';fn=lambda z:{'chest':1}
 groups={b:o.vertex_groups.new(name=b) for b in bones}
 used=set()
 for v in o.data.vertices:
  ws={b:w for b,w in fn(v.co.z).items() if w>1e-8};total=sum(ws.values())
  for b,w in ws.items():groups[b].add([v.index],w/total,'REPLACE');used.add(b)
 for b in bones:
  if b not in used:o.vertex_groups.remove(groups[b])
 mod=o.modifiers.new('S02 Manual Skin | FK V1','ARMATURE');mod.object=rig;mod.use_deform_preserve_volume=False
 bpy.context.view_layer.objects.active=o;bpy.ops.object.modifier_move_to_index(modifier=mod.name,index=0)
 weight_report.append({'mesh':n,'policy':policy,'bones':sorted(used),'automaticWeights':False})
# User-facing scalar controls drive export-friendly existing-mesh shape keys.
props={'blink':(0,0,1),'blinkL':(0,0,1),'blinkR':(0,0,1),'eyeDirectionX':(0,-1,1),'eyeDirectionZ':(0,-1,1),'eyeSquint':(0,0,1),'eyeWide':(0,0,1),'browRaise':(0,-1,1),'browTiltL':(0,-1,1),'browTiltR':(0,-1,1),'mouthSmile':(0,0,1),'mouthOpenSmall':(0,0,1),'mouthThought':(0,0,1),'mouthOffsetX':(0,-1,1)}
for n,(v,lo,hi) in props.items():
 rig[n]=float(v);rig.id_properties_ui(n).update(min=lo,max=hi,soft_min=lo,soft_max=hi,description='S02 V1 facial control; zero restores locked neutral')
facial=[]
def key(o,name,fn,expr,variables):
 if not o.data.shape_keys:o.shape_key_add(name='Basis')
 k=o.shape_key_add(name=name)
 for v,d in zip(o.data.vertices,k.data):d.co=fn(v.co.copy())
 fc=k.driver_add('value');driver=fc.driver;driver.type='SCRIPTED';driver.expression=expr
 for variable,prop in variables.items():
  dv=driver.variables.new();dv.name=variable;dv.type='SINGLE_PROP';dv.targets[0].id=rig;dv.targets[0].data_path='["'+prop+'"]'
 facial.append({'mesh':o.name,'shapeKey':name,'driver':expr,'controlVariables':variables})
def scale(p,c,sx=1,sz=1,dy=0):return Vector((c.x+(p.x-c.x)*sx,p.y+dy,c.z+(p.z-c.z)*sz))
for side in ['L','R']:
 white=bpy.data.objects['Eye white.'+side];vs=[v.co for v in white.data.vertices];c=Vector(((min(v.x for v in vs)+max(v.x for v in vs))/2,0,(min(v.z for v in vs)+max(v.z for v in vs))/2));ww=max(v.x for v in vs)-min(v.x for v in vs)
 pupil=bpy.data.objects['Pupil.'+side];glint=bpy.data.objects['Eye glint.'+side]
 pts=[v.co for o in [pupil,glint] for v in o.data.vertices]
 margins={'posX':.8*(max(v.x for v in vs)-max(v.x for v in pts)),'negX':.8*(min(v.x for v in pts)-min(v.x for v in vs)),'posZ':.8*(max(v.z for v in vs)-max(v.z for v in pts)),'negZ':.8*(min(v.z for v in pts)-min(v.z for v in vs))}
 for prefix in ['Eye white.','Pupil.','Eye glint.']:
  o=bpy.data.objects[prefix+side];vv=[v.co for v in o.data.vertices]
  if prefix=='Pupil.':
   pc=Vector(((min(v.x for v in vv)+max(v.x for v in vv))/2,0,c.z));ph=max(v.z for v in vv)-min(v.z for v in vv);pw=max(v.x for v in vv)-min(v.x for v in vv)
   close=lambda p,pc=pc,ph=ph,pw=pw:scale(p,pc,sx=ww*.80/pw,sz=.009/ph)
  else:close=lambda p,c=c:scale(p,c,sz=.02,dy=.025)
  expr='max(b,s)';var={'b':'blink','s':'blink'+side}
  key(o,'Blink',close,expr,var)
  key(o,'Squint',lambda p,c=c:scale(p,c,sz=.65),'q*(1-max(b,s))',{'q':'eyeSquint',**var})
  key(o,'Wide',lambda p,c=c:scale(p,c,sz=1.12),'w*(1-max(b,s))',{'w':'eyeWide',**var})
  if prefix!='Eye white.':
   for axis,prop in [('X','eyeDirectionX'),('Z','eyeDirectionZ')]:
    for sign,label in [(1,'pos'),(-1,'neg')]:
     amount=max(0,margins[label+axis])*sign
     def move(p,axis=axis,amount=amount):p[0 if axis=='X' else 2]+=amount;return p
     key(o,'Gaze'+axis+label,move,('max(g,0)' if sign>0 else 'max(-g,0)')+'*(1-max(b,s))',{'g':prop,**var})
 brow=bpy.data.objects['Brow.'+side];bc=sum((v.co for v in brow.data.vertices),Vector())/len(brow.data.vertices)
 key(brow,'Raise',lambda p:p+Vector((0,0,.055)),'max(v,0)',{'v':'browRaise'})
 key(brow,'Lower',lambda p:p-Vector((0,0,.025)),'max(-v,0)',{'v':'browRaise'})
 for sign,label in [(1,'pos'),(-1,'neg')]:
  def tilt(p,sign=sign,bc=bc):p.z+=sign*(p.x-bc.x)*.25;return p
  key(brow,'Tilt'+label,tilt,'max('+('v' if sign>0 else '-v')+',0)',{'v':'browTilt'+side})
# Existing 8-vertex minimal mouth only; no new topology, teeth, tongue or realistic anatomy.
mouth=bpy.data.objects['Neutral mouth | original minimal line'];mv=[v.co for v in mouth.data.vertices];mc=sum(mv,Vector())/len(mv);minz=min(p.z for p in mv);maxz=max(p.z for p in mv);height=maxz-minz
mouthvars={'s':'mouthSmile','o':'mouthOpenSmall','t':'mouthThought'}
def smile(p):
 upper=p.z>mc.z;p.x=mc.x+(p.x-mc.x)*(1.18 if upper else .74);p.z=mc.z+(.014 if upper else -.018);return p
def opened(p):
 p.x=mc.x+(p.x-mc.x)*.58;p.z=mc.z+(.052 if p.z>mc.z else -.052);return p
def thought(p):
 p.x=mc.x+(p.x-mc.x)*.85+.006;p.z+=.14*(p.x-mc.x);return p
for name,fn,v in [('Smile',smile,'s'),('OpenSmall',opened,'o'),('Thought',thought,'t')]:key(mouth,name,fn,v+'/max(1,s+o+t)',mouthvars)
for sign,label in [(1,'pos'),(-1,'neg')]:key(mouth,'Offset'+label,lambda p,sign=sign:p+Vector((sign*.014,0,0)),'max('+('v' if sign>0 else '-v')+',0)',{'v':'mouthOffsetX'})
rig['identity_locked']=True;rig['rig_status']='V1 functional FK and facial controls; evaluation required; not production approved';rig['glb_export_approved']=False
rig['control_help']='Pose bones for body FK; Custom Properties for face. See embedded S02_RIG_CONTROLS.py and docs.'
root.name='S02_MainCharacter_IDENTITY_LOCKED_RIG_V1';root['rigged']=True;root['rig_approved']=False;root['export_approved']=False
root['status']='Approved neutral identity; functional rig V1 under testing, not production-ready.';s['approval_stage']='IDENTITY LOCKED | RIG V1 EVALUATION | NO GLB OR EPISODE PRODUCTION'
rig.data.display_type='OCTAHEDRAL'
text=bpy.data.texts.new('S02_RIG_CONTROLS.py');text.write((R/'scripts/rig_controls.py').read_text())
bpy.context.view_layer.update();s.render.filepath='//../evaluation/body/neutral.png'
bpy.ops.wm.save_as_mainfile(filepath=str(R/'source/s02-character-rig-v1.blend'))
(R/'docs/bindings.json').write_text(json.dumps({'sourcePrepCommit':'6ebeb1604d8800c22c6bd1833700b17006b1d6e1','skeleton':[{'name':b.name,'parent':b.parent.name if b.parent else None,'head':list(b.head_local),'tail':list(b.tail_local),'matrixLocal':[list(row) for row in b.matrix_local]} for b in rig.data.bones],'weights':weight_report,'facial':facial,'controlProperties':{n:{'neutral':v,'min':lo,'max':hi} for n,(v,lo,hi) in props.items()},'topologyChanged':False,'newMeshes':[],'automaticWeightsUsed':False,'exported':False},indent=2))
print('RIG_BUILD_DONE',len(bones),'bones',len(facial),'driven morphs')
