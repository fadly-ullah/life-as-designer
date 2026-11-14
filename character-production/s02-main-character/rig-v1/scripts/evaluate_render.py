"""Static rig tests, neutral comparison and lightweight sequential renders. No clips/export."""
import bpy,json,math,hashlib,sys
from pathlib import Path
from mathutils import Vector
from mathutils.bvhtree import BVHTree
R=Path(__file__).resolve().parents[1];P=R.parent
controls=(R/'scripts/rig_controls.py').read_text();exec(controls)
manifest=json.loads((P/'modeling-04-final-polish/docs/render-manifest.json').read_text());cams={v['view']:v for v in manifest['polishedFrames']}
mapping=json.loads((P/'rigging-prep/docs/hierarchy-bindings.json').read_text());names=[v['object'] for v in mapping['meshes']]
def capture():
 dep=bpy.context.evaluated_depsgraph_get();out={}
 for name in names:
  o=bpy.data.objects[name];ev=o.evaluated_get(dep);m=ev.to_mesh();out[name]=[list(ev.matrix_world@v.co) for v in m.vertices];ev.to_mesh_clear()
 return out
def rawdeformed():
 disabled=[]
 for name in names:
  for mod in bpy.data.objects[name].modifiers:
   if mod.type!='ARMATURE' and mod.show_viewport:disabled.append(mod);mod.show_viewport=False
 bpy.context.view_layer.update();out=capture()
 for mod in disabled:mod.show_viewport=True
 bpy.context.view_layer.update();return out
bpy.ops.wm.open_mainfile(filepath=str(P/'rigging-prep/source/s02-character-rigging-prep.blend'));ref=capture()
bpy.ops.wm.open_mainfile(filepath=str(R/'source/s02-character-rig-v1.blend'));rig=bpy.data.objects[RIG_NAME];reset_rig();neutral=capture()
errors={n:max((Vector(a)-Vector(b)).length for a,b in zip(ref[n],neutral[n])) if len(ref[n])==len(neutral[n]) else 999 for n in names}
weights=[]
for n in names:
 o=bpy.data.objects[n];bad=[];influences=[]
 for v in o.data.vertices:
  ws=[g.weight for g in v.groups if o.vertex_groups[g.group].name in rig.data.bones and g.weight>1e-8];influences.append(len(ws))
  if not ws or abs(sum(ws)-1)>1e-6 or len(ws)>4:bad.append(v.index)
 weights.append({'mesh':n,'vertices':len(o.data.vertices),'maxInfluences':max(influences),'invalidVertices':bad})
(R/'docs/skin-weight-validation.json').write_text(json.dumps({'manualWeightsOnly':True,'armature':'S02_RIG_V1','objects':weights,'invalidVertexCount':sum(len(v['invalidVertices']) for v in weights),'limit':4,'deform':'Linear blend skinning, no dual-quaternion-only dependence'},indent=2))
assert max(errors.values())<1e-5, max(errors.items(),key=lambda v:v[1]);assert all(not v['invalidVertices'] for v in weights)
rest=rawdeformed()
pairs=[('Sleeve | continuous shaped elbow.'+s,'Hoodie torso | shoulder-chest-waist contour') for s in ['L','R']]+[('Head | refined cheek-jaw planes','Hood | draped back shell')]+[('Cuff | shaped rib knit.'+s,'Palm.'+s) for s in ['L','R']]+[('Trousers.'+s,'Shoe upper.'+s) for s in ['L','R']]
def intersections():
 dep=bpy.context.evaluated_depsgraph_get();trees={}
 for name in set(v for pair in pairs for v in pair):
  o=bpy.data.objects[name];ev=o.evaluated_get(dep);m=ev.to_mesh();m.calc_loop_triangles();trees[name]=BVHTree.FromPolygons([ev.matrix_world@v.co for v in m.vertices],[tuple(t.vertices) for t in m.loop_triangles],all_triangles=True);ev.to_mesh_clear()
 return [{'a':a,'b':b,'surfaceTrianglePairs':len(trees[a].overlap(trees[b]))} for a,b in pairs]
basepairs=intersections();report={'neutralMaxWorldVertexError':max(errors.values()),'neutralPerMeshWorldVertexError':errors,'topologyChanged':False,'skeletonBoneCount':len(rig.data.bones),'shapeKeyDriversValid':all(fc.driver.is_valid for sk in bpy.data.shape_keys for fc in (sk.animation_data.drivers if sk.animation_data else [])),'tests':[],'baselineContactPairs':basepairs,'scope':'Static poses only; no animation clip, scene production, GLB or integration.'}
render='--no-render' not in sys.argv
only_preview='--preview' in sys.argv
s=bpy.context.scene;cam=s.camera
def camera(view):
 v=cams[view];cam.location=v['location'];cam.rotation_euler=v['rotation'];cam.data.ortho_scale=v['orthoScale']
def write(name,category,view,identity=False):
 camera(view)
 if category=='expressions':
  oldtarget=Vector(manifest['target']);target=Vector((0,0,3.43));cam.location+=target-oldtarget;cam.data.ortho_scale=1.68
 s.render.engine='CYCLES';s.cycles.device='CPU';s.cycles.samples=48 if identity else (12 if only_preview else 32);s.cycles.use_denoising=False
 s.render.threads_mode='FIXED';s.render.threads=2;s.render.resolution_x=640;s.render.resolution_y=800;s.render.resolution_percentage=100 if identity else (50 if only_preview else 75)
 s.render.image_settings.file_format='PNG';dest=(Path('/workspace/work')/f'rig-preview-{name}.png') if only_preview else R/'evaluation'/category/f'{name}.png';dest.parent.mkdir(exist_ok=True,parents=True)
 s.render.filepath=str(dest)
 if render:bpy.ops.render.render(write_still=True)
 return str(dest)
def test(name,category,view='three-quarter',fn=None):
 reset_rig()
 if fn:fn()
 else:pose(name)
 update();pts=rawdeformed();edges=[]
 for n in names:
  o=bpy.data.objects[n]
  for e in o.data.edges:
   i,j=e.vertices;before=(Vector(rest[n][i])-Vector(rest[n][j])).length;after=(Vector(pts[n][i])-Vector(pts[n][j])).length
   if before>1e-6:edges.append((after/before,n))
 vals=[v for p in pts.values() for v in p]
 entry={'name':name,'category':category,'view':view,'bounds':{'min':[min(v[k] for v in vals) for k in range(3)],'max':[max(v[k] for v in vals) for k in range(3)]},'maximumBodyRawEdgeStretch':max((v for v,n in edges if not n.startswith(('Eye ','Pupil.','Brow.','Upper eyelid.','Neutral mouth','Blush.','Nose |','Hair |','Head |'))),default=1),'maximumRawEdgeStretch':max(edges)[0],'minimumRawEdgeStretch':min(edges)[0],'extremeStretchMeshes':sorted(edges,reverse=True)[:5],'contacts':intersections(),'poseMatrices':{b.name:[list(row) for row in b.matrix] for b in rig.pose.bones},'faceControlValues':{p:rig[p] for p in FACE},'activeMorphs':{o.name:{k.name:k.value for k in o.data.shape_keys.key_blocks if k.name!='Basis' and k.value>.001} for o in [bpy.data.objects[n] for n in names] if o.data.shape_keys},'render':write(name,category,view)}
 report['tests'].append(entry);(R/'docs/pose-validation.json').write_text(json.dumps(report,indent=2))
 if not only_preview:
  back=R/'evaluation'/category/f'{name}.png'
 print('TEST_FINISHED',name,entry['maximumRawEdgeStretch'])
if not only_preview:
 reset_rig();write('locked-neutral-identity','identity','three-quarter',True)
body=['neutral','head_left','head_right','arm_raised','elbow_bent','torso_lean','seated','mouse_reach']
if only_preview:body=['arm_raised','seated','mouse_reach']
for name in body:test(name,'body')
for name in (['senang','kaget'] if only_preview else list(PRESETS)):
 test(name,'expressions','front',lambda name=name:expression(name))
if not only_preview:
 test('blink_closed','expressions','front',lambda:rig.__setitem__('blink',1.0))
 for prop,short in [('eyeDirectionX','gaze_x'),('eyeDirectionZ','gaze_z')]:
  for sign,label in [(-1,'neg'),(1,'pos')]:test(short+'_'+label,'expressions','front',lambda prop=prop,sign=sign:rig.__setitem__(prop,float(sign)))
 pose('root_test');root_moved=capture();reset_rig();restored=capture();report['rootMovementVerified']=max((Vector(a)-Vector(b)).length for n in names for a,b in zip(root_moved[n],neutral[n]))>.01
 report['neutralRestoreMaxWorldError']=max((Vector(a)-Vector(b)).length for n in names for a,b in zip(restored[n],neutral[n]));report['allFaceControlsRestored']=all(rig[p]==0 for p in FACE)
 (R/'docs/pose-validation.json').write_text(json.dumps(report,indent=2));assert report['neutralRestoreMaxWorldError']<1e-5
if not only_preview:
 report['boneControlTests']={}
 for name in list(rig.pose.bones.keys()):
  reset_rig();rotate(name,(1,0,0),8);update();moved=capture()
  report['boneControlTests'][name]=max((Vector(a)-Vector(b)).length for n in names for a,b in zip(moved[n],neutral[n]))
 assert all(v>.001 for v in report['boneControlTests'].values())
 (R/'docs/pose-validation.json').write_text(json.dumps(report,indent=2))
reset_rig();print('EVALUATION_DONE')
