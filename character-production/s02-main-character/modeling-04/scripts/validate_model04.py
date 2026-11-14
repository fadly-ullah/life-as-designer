"""Read-only inspection of Model03/04; only writes Model04 validation JSON."""
import bpy,bmesh,json,hashlib
from pathlib import Path
from mathutils import Vector
R=Path(__file__).resolve().parents[1];P=R.parent

def palette():
 out={}
 for m in bpy.data.materials:
  out[m.name]={'diffuse':list(m.diffuse_color),'nodes':[(n.name,n.bl_idname,[(i.name,list(i.default_value) if hasattr(i.default_value,'__len__') else str(i.default_value)) for i in n.inputs if hasattr(i,'default_value')]) for n in m.node_tree.nodes] if m.use_nodes else [],'links':[(l.from_node.name,l.from_socket.name,l.to_node.name,l.to_socket.name) for l in m.node_tree.links] if m.use_nodes else []}
 return out

def lights():
 s=bpy.context.scene
 return {'objects':{o.name:{'matrix':[list(row) for row in o.matrix_world],'type':o.data.type,'energy':o.data.energy,'color':list(o.data.color),'size':getattr(o.data,'size',None),'size_y':getattr(o.data,'size_y',None)} for o in bpy.data.objects if o.type=='LIGHT'},'world':{'color':list(s.world.color),'nodes':[(n.name,[(i.name,list(i.default_value) if hasattr(i.default_value,'__len__') else str(i.default_value)) for i in n.inputs if hasattr(i,'default_value')]) for n in s.world.node_tree.nodes] if s.world.use_nodes else []},'colorManagement':{'transform':s.view_settings.view_transform,'look':s.view_settings.look,'exposure':s.view_settings.exposure,'gamma':s.view_settings.gamma}}

def bounds(objs):
 pts=[o.matrix_world@v.co for o in objs for v in o.data.vertices]
 return {'min':[min(p[i] for p in pts) for i in range(3)],'max':[max(p[i] for p in pts) for i in range(3)]}
def metrics():
 col=bpy.data.collections['CHARACTER | MODELING REVIEW ONLY'];objs=[o for o in col.objects if o.type=='MESH']
 head=[o for o in objs if o.name.startswith(('Head |','Hair |','Ear.'))];hair=[o for o in objs if o.name.startswith('Hair |')];skin=[o for o in objs if o.name.startswith('Head |')];body=[o for o in objs if o.name.startswith(('Hoodie torso','Sleeve |','Cuff |'))];torso=[o for o in objs if o.name.startswith('Hoodie torso')]
 allb=bounds(objs);hb=bounds(head);sb=bounds(skin);hairb=bounds(hair);bb=bounds(body);tb=bounds(torso)
 return {'height':allb['max'][2]-allb['min'][2],'headHeight':hb['max'][2]-sb['min'][2],'headHeightRatio':(allb['max'][2]-allb['min'][2])/(hb['max'][2]-sb['min'][2]),'hairWidth':hairb['max'][0]-hairb['min'][0],'skullWidth':sb['max'][0]-sb['min'][0],'garmentWidthAcrossSleeves':bb['max'][0]-bb['min'][0],'torsoWidth':tb['max'][0]-tb['min'][0],'ankleToHem':tb['min'][2]-.48,'headToGarmentWidth':(hairb['max'][0]-hairb['min'][0])/(bb['max'][0]-bb['min'][0])}

def features():
 return {o.name:[list(v.co) for v in o.data.vertices] for o in bpy.data.objects if o.type=='MESH' and o.name.startswith(('Eye white.','Pupil.','Eye glint.','Upper eyelid.','Brow.','Blush.','Neutral mouth','Nose |'))}

def centered(vs):
 c=[sum(v[i] for v in vs)/len(vs) for i in range(3)]
 return [[v[i]-c[i] for i in range(3)] for v in vs]
base=P/'modeling-03/source/s02-character-modeling-03.blend';new=R/'source/s02-character-modeling-04.blend'
bpy.ops.wm.open_mainfile(filepath=str(base));pal0=palette();li0=lights();m0=metrics();f0=features();slots0={o.name:[m.name for m in o.data.materials] for o in bpy.data.objects if o.type=='MESH'}
bpy.ops.wm.open_mainfile(filepath=str(new));pal1=palette();li1=lights();m1=metrics();f1=features()
mesh_audit=[]
for o in bpy.data.collections['CHARACTER | MODELING REVIEW ONLY'].objects:
 if o.type!='MESH':continue
 bm=bmesh.new();bm.from_mesh(o.data)
 mesh_audit.append({'object':o.name,'vertices':len(bm.verts),'faces':len(bm.faces),'nonManifoldEdges':sum(not e.is_manifold for e in bm.edges),'degenerateFaces':sum(f.calc_area()<1e-10 for f in bm.faces),'materialSlots':[m.name for m in o.data.materials]});bm.free()
featurecheck={}
for name,vs in f0.items():
 if name not in f1:featurecheck[name]={'shapePreserved':False};continue
 a=centered(vs);b=centered(f1[name]);error=max(abs(x-y) for v,w in zip(a,b) for x,y in zip(v,w)) if len(a)==len(b) else 999
 featurecheck[name]={'shapePreserved':error<1e-6,'maxCenteredVertexError':error,'vertexCountPreserved':len(a)==len(b)}
manifest=json.loads((R/'docs/render-manifest.json').read_text())
matched={}
for view in ['front','side','three-quarter','back']:
 a=next(r for r in manifest['renders'] if r['model']=='model03' and r['view']==view);b=next(r for r in manifest['renders'] if r['model']=='model04' and r['view']==view)
 matched[view]=all(a[k]==b[k] for k in ['location','rotation','orthoScale'])
slots1={o.name:[m.name for m in o.data.materials] for o in bpy.data.objects if o.type=='MESH'}
shoeContact={}
for side in ['L','R']:
 upper=bounds([bpy.data.objects['Shoe upper.'+side]]);sole=bounds([bpy.data.objects['Outsole.'+side]])
 shoeContact[side]={'soleTop':sole['max'][2],'upperBottom':upper['min'][2],'noOpenVerticalGap':upper['min'][2]<=sole['max'][2]}
report={'status':'UNAPPROVED','baseCommit':'50e9b4ad13eb88d729d74732666c72d4a4ba6d88','blender':bpy.app.version_string,'reopenedSuccessfully':True,'materialNodeInputsAndLinksUnchanged':pal0==pal1,'retainedObjectMaterialSlotsUnchanged':all(slots0[n]==slots1[n] for n in slots0.keys()&slots1.keys()),'lightingWorldColorManagementUnchanged':li0==li1,'allFourMatchedCameras':matched,'metrics':{'model03':m0,'model04':m1},'headRangePass':3.5<=m1['headHeightRatio']<=4,'facialFeatures':featurecheck,'allFacialFeatureShapesPreserved':all(v['shapePreserved'] for v in featurecheck.values()),'shoeSoleContact':shoeContact,'armatures':sum(o.type=='ARMATURE' for o in bpy.data.objects),'actions':len(bpy.data.actions),'nonManifoldEdgesTotal':sum(m['nonManifoldEdges'] for m in mesh_audit),'degenerateFacesTotal':sum(m['degenerateFaces'] for m in mesh_audit),'meshAudit':mesh_audit,'meshScope':'Closed individual components only; separate overlapping garment and hair components remain. Not a deformation/rig-ready certification; no inter-object intersection or exhaustive self-intersection certification.','baseBlendSHA256':hashlib.sha256(base.read_bytes()).hexdigest(),'model04BlendSHA256':hashlib.sha256(new.read_bytes()).hexdigest(),'render':manifest['render']}
(R/'docs/technical-validation.json').write_text(json.dumps(report,indent=2))
assert report['materialNodeInputsAndLinksUnchanged'] and report['lightingWorldColorManagementUnchanged'] and report['allFacialFeatureShapesPreserved'] and all(matched.values())
assert report['nonManifoldEdgesTotal']==0 and report['degenerateFacesTotal']==0 and report['armatures']==0 and report['actions']==0
assert all(v['noOpenVerticalGap'] for v in shoeContact.values())
print('VALIDATION_PASS',m1)
