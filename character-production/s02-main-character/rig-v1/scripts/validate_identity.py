"""Validate rig neutral against locked source, original topology/materials and control functionality."""
import bpy,json,hashlib,math
from pathlib import Path
from mathutils import Vector
R=Path(__file__).resolve().parents[1];P=R.parent
helpers=(P/'modeling-04/scripts/validate_model04.py').read_text();exec(helpers[:helpers.index("base=P/'modeling-03")])
R=Path(__file__).resolve().parents[1];P=R.parent
exec((R/'scripts/rig_controls.py').read_text())
BASE=P/'modeling-04-final-polish/source/s02-character-model04-final-polish.blend';NEW=R/'source/s02-character-rig-v1.blend'
names=[v['object'] for v in json.loads((P/'rigging-prep/docs/hierarchy-bindings.json').read_text())['meshes']]
def capture():
 out={}
 for n in names:
  o=bpy.data.objects[n];out[n]={'verts':[list(v.co) for v in o.data.vertices],'faces':[list(p.vertices) for p in o.data.polygons],'materials':[m.name for m in o.data.materials],'smoothing':[p.use_smooth for p in o.data.polygons],'UV':{uv.name:[list(q.uv) for q in uv.data] for uv in o.data.uv_layers},'nonRigModifiers':[(m.name,m.type,getattr(m,'width',None),getattr(m,'segments',None),getattr(m,'limit_method',None),getattr(m,'keep_sharp',None),m.show_viewport,m.show_render) for m in o.modifiers if m.type!='ARMATURE'],'matrix':[list(row) for row in o.matrix_world]}
 return out
bpy.ops.wm.open_mainfile(filepath=str(BASE));base=capture();pal0=palette();li0=lights()
bpy.ops.wm.open_mainfile(filepath=str(NEW));reset_rig();new=capture();pal1=palette();li1=lights();rig=bpy.data.objects[RIG_NAME]
raw={n:base[n]==new[n] for n in names};basis={n:([list(p.co) for p in bpy.data.objects[n].data.shape_keys.key_blocks['Basis'].data]==base[n]['verts']) for n in names if bpy.data.objects[n].data.shape_keys}
assert all(raw.values()) and all(basis.values()) and pal0==pal1 and li0==li1
controltests={}
for prop in FACE:
 for value in ([1.0,-1.0] if prop in ['eyeDirectionX','eyeDirectionZ','browRaise','browTiltL','browTiltR','mouthOffsetX'] else [1.0]):
  reset_rig();rig[prop]=value;update();values=[(o.name,k.name,k.value) for o in [bpy.data.objects[n] for n in names] if o.data.shape_keys for k in o.data.shape_keys.key_blocks if k.name!='Basis' and k.value>.001]
  controltests[prop+':'+str(value)]={'activeMorphCount':len(values),'activeMorphs':values}
  assert values,prop
# Gaze uses 80% of measured asymmetric neutral margins; verify deformed raw pupil/glint stays in white.
gazetests={}
for prop in ['eyeDirectionX','eyeDirectionZ']:
 for sign in [-1.0,1.0]:
  reset_rig();rig[prop]=sign;update();dep=bpy.context.evaluated_depsgraph_get();checks={}
  for side in ['L','R']:
   arrays={}
   # Evaluate shape keys before bevel/armature to compare head-local feature planes.
   for prefix in ['Eye white.','Pupil.','Eye glint.']:
    o=bpy.data.objects[prefix+side];disabled=[m for m in o.modifiers if m.show_viewport]
    for m in disabled:m.show_viewport=False
    update();ev=o.evaluated_get(bpy.context.evaluated_depsgraph_get());mesh=ev.to_mesh();arrays[prefix]=[v.co.copy() for v in mesh.vertices];ev.to_mesh_clear()
    for m in disabled:m.show_viewport=True
   w=arrays['Eye white.'];p=arrays['Pupil.']+arrays['Eye glint.']
   checks[side]=all(min(v[k] for v in p)>=min(v[k] for v in w)-1e-6 and max(v[k] for v in p)<=max(v[k] for v in w)+1e-6 for k in [0,2])
  gazetests[prop+':'+str(sign)]=checks;assert all(checks.values())
# Positional FK offsets are exposed through bone location; test feet/hands and root.
positiontests={}
for name in ['root','foot.L','foot.R','hand.L','hand.R']:
 reset_rig();bone=rig.pose.bones[name];bone.location=bone.bone.matrix_local.to_3x3().inverted()@Vector((.015,-.012,.006));update()
 positiontests[name]={'boneLocationNonzero':bone.location.length>.001,'poseHeadDisplacement':(bone.head-bone.bone.head_local).length}
 assert positiontests[name]['poseHeadDisplacement']>.001
reset_rig();pose=bpy.data.objects[RIG_NAME].pose
report={'identityLocked':True,'rigProductionApproved':False,'sourceCommit':'aff455385918d8cb13d72123af824156bd771e6a','prepCommit':'6ebeb1604d8800c22c6bd1833700b17006b1d6e1','allOriginalRawMeshTopologyMaterialsMatricesUnchanged':all(raw.values()),'perMeshRawUnchanged':raw,'allMorphBasisExactlyLockedNeutral':all(basis.values()),'morphBasisChecks':basis,'materialNodesLinksUnchanged':pal0==pal1,'lightingWorldColorManagementUnchanged':li0==li1,'faceControlTests':controltests,'gazeBoundsTests':gazetests,'positionalControlTests':positiontests,'boneCount':len(rig.data.bones),'armatures':sum(o.type=='ARMATURE' for o in bpy.data.objects),'animationActions':len(bpy.data.actions),'constraintCount':sum(len(b.constraints) for b in rig.pose.bones),'driverCount':sum(len(sk.animation_data.drivers) for sk in bpy.data.shape_keys if sk.animation_data),'allDriversValid':all(fc.driver.is_valid for sk in bpy.data.shape_keys if sk.animation_data for fc in sk.animation_data.drivers),'sourceSHA256':hashlib.sha256(BASE.read_bytes()).hexdigest(),'rigSHA256':hashlib.sha256(NEW.read_bytes()).hexdigest(),'topologyChanges':[],'technicalDeviations':['Armature modifiers and explicitly assigned vertex groups added in isolated copy.','Existing face meshes gain Basis and relative expression keys; no vertex/face change.','Neutral evaluated differences up to numerical LBS precision; RGB evidence reported separately.'],'exported':False}
(R/'docs/identity-validation.json').write_text(json.dumps(report,indent=2));print('IDENTITY_CONTROL_VALIDATION_PASS',report['driverCount'])
