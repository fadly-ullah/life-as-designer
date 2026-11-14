"""Run this embedded text once, then reset_rig(), expression('senang'), pose('seated'). No keyframes."""
import bpy,math
from mathutils import Vector,Quaternion
RIG_NAME='S02_RIG_V1'
PRESETS={'neutral':{},'senang':{'mouthSmile':.75,'eyeSquint':.35,'browRaise':.12},'kaget':{'browRaise':.65,'eyeWide':.35,'mouthOpenSmall':.90},'mikir':{'browTiltL':.75,'browTiltR':-.35,'mouthThought':.65},'semangat':{'mouthSmile':1.0,'mouthOpenSmall':.30,'browRaise':.30,'eyeSquint':.12}}
FACE=['blink','blinkL','blinkR','eyeDirectionX','eyeDirectionZ','eyeSquint','eyeWide','browRaise','browTiltL','browTiltR','mouthSmile','mouthOpenSmall','mouthThought','mouthOffsetX']
def update():
 rig=bpy.data.objects[RIG_NAME];rig.update_tag();bpy.context.view_layer.update()
def reset_rig():
 rig=bpy.data.objects[RIG_NAME]
 for b in rig.pose.bones:b.location=(0,0,0);b.rotation_quaternion=(1,0,0,0);b.scale=(1,1,1)
 for p in FACE:rig[p]=0.0
 update()
def expression(name):
 rig=bpy.data.objects[RIG_NAME]
 for p in FACE:rig[p]=0.0
 for p,v in PRESETS[name].items():rig[p]=v
 update()
def rotate(bone,axis,degrees):
 b=bpy.data.objects[RIG_NAME].pose.bones[bone];a=b.bone.matrix_local.to_3x3().inverted()@Vector(axis)
 b.rotation_quaternion=Quaternion(a.normalized(),math.radians(degrees))
def root_position(x=0,y=0,z=0):
 b=bpy.data.objects[RIG_NAME].pose.bones['root'];b.location=b.bone.matrix_local.to_3x3().inverted()@Vector((x,y,z))
def ground_feet():
 update();dep=bpy.context.evaluated_depsgraph_get();z=10
 for o in bpy.data.objects:
  if o.type=='MESH' and o.name.startswith(('Outsole.','Shoe upper.')):
   ev=o.evaluated_get(dep);m=ev.to_mesh();z=min(z,min((ev.matrix_world@v.co).z for v in m.vertices));ev.to_mesh_clear()
 root_position(z=.035-z);update()
def pose(name):
 reset_rig()
 if name=='head_left':rotate('head',(0,0,1),25)
 elif name=='head_right':rotate('head',(0,0,1),-25)
 elif name=='arm_raised':rotate('upperArm.L',(0,1,0),80)
 elif name=='elbow_bent':rotate('forearm.R',(1,0,0),-85)
 elif name=='torso_lean':rotate('spine',(1,0,0),15);rotate('chest',(1,0,0),8)
 elif name=='seated':
  for side in ['L','R']:rotate('thigh.'+side,(1,0,0),-85);rotate('shin.'+side,(1,0,0),90);rotate('foot.'+side,(1,0,0),-5)
  ground_feet()
 elif name=='mouse_reach':
  rotate('upperArm.R',(1,0,0),-18);rotate('forearm.R',(1,0,0),-72)
 elif name=='root_test':root_position(.08,0,0);rotate('root',(0,0,1),8)
 elif name!='neutral':raise ValueError(name)
 update()
