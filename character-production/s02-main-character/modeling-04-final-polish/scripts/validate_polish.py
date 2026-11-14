"""Reopen both sources, enforce locked meshes/materials/proportions, inspect final delivery."""
import bpy,bmesh,json,hashlib,subprocess
from pathlib import Path
from mathutils import Vector
R=Path(__file__).resolve().parents[1];P=R.parent
# Use existing read-only palette/light/dimension inspection helper definitions.
helpers=(P/'modeling-04/scripts/validate_model04.py').read_text();exec(helpers[:helpers.index("base=P/'modeling-03")])
R=Path(__file__).resolve().parents[1];P=R.parent
BASE=P/'modeling-04/source/s02-character-modeling-04.blend';NEW=R/'source/s02-character-model04-final-polish.blend'
def digest(value):return hashlib.sha256(json.dumps(value,sort_keys=True).encode()).hexdigest()
def objs():
 return {o.name:{'vertices':[list(v.co) for v in o.data.vertices],'faces':[list(p.vertices) for p in o.data.polygons],'matrix':[list(row) for row in o.matrix_world],'materialSlots':[m.name for m in o.data.materials],'modifiers':[(m.name,m.type,getattr(m,'width',None),getattr(m,'segments',None)) for m in o.modifiers]} for o in bpy.data.objects if o.type=='MESH'}
def hair_info():
 os=[o for o in bpy.data.collections['CHARACTER | MODELING REVIEW ONLY'].objects if o.type=='MESH' and o.name.startswith('Hair |')];vol=0
 for o in os:
  bm=bmesh.new();bm.from_mesh(o.data);vol+=abs(bm.calc_volume(signed=True));bm.free()
 return {'bounds':bounds(os),'sumComponentVolumes':vol,'volumeLimit':'Sum includes overlapping closed components; not a Boolean union volume.'}
def camdata():
 c=bpy.context.scene.camera
 return {'type':c.data.type,'orthoScale':c.data.ortho_scale,'clipStart':c.data.clip_start,'clipEnd':c.data.clip_end,'dof':c.data.dof.use_dof,'lens':c.data.lens}
bpy.ops.wm.open_mainfile(filepath=str(BASE));a=objs();pal0=palette();li0=lights();m0=metrics();h0=hair_info();c0=camdata()
bpy.ops.wm.open_mainfile(filepath=str(NEW));b=objs();pal1=palette();li1=lights();m1=metrics();h1=hair_info();c1=camdata()
changes=json.loads((R/'docs/changed-geometry.json').read_text())
changed=sorted(n for n in a if a[n]!=b.get(n));added=sorted(set(b)-set(a))
assert changed==changes['modified'] and added==changes['added']
allowed=('Hair | M04 L upper side step','Hair | M04 L lower side step','Hair | M04 R upper side step','Hair | M04 R lower side step','Hair | M03 rear ','Eye white.','Pupil.','Eye glint.','Upper eyelid.','Sleeve |','Cuff |','Cuff rib.','Shoulder seam.')
lock_names=sorted(n for n in a if not n.startswith(allowed))
locks={n:{'unchanged':a[n]==b.get(n),'beforeSHA256':digest(a[n]),'afterSHA256':digest(b[n]) if n in b else None} for n in lock_names}
# This checks trousers, shoes, torso, jaw/brows/blush/mouth, front/crown hair, cords/pouch,
# hood/collar, hands, floor and all other non-authorized original mesh components.
assert all(v['unchanged'] for v in locks.values())
assert all(n.startswith(allowed) for n in changed) and not (set(a)-set(b))
assert all(n.startswith('Hair | Polish ') for n in added)
mesh_audit=[]
for o in bpy.data.collections['CHARACTER | MODELING REVIEW ONLY'].objects:
 if o.type!='MESH':continue
 bm=bmesh.new();bm.from_mesh(o.data)
 mesh_audit.append({'object':o.name,'vertices':len(bm.verts),'faces':len(bm.faces),'nonManifoldEdges':sum(not e.is_manifold for e in bm.edges),'degenerateFaces':sum(f.calc_area()<1e-10 for f in bm.faces)});bm.free()
spacing={}
for side in ['L','R']:
 name='Eye white.'+side
 def eye(data):
  vs=data[name]['vertices'];lo=[min(v[i] for v in vs) for i in range(3)];hi=[max(v[i] for v in vs) for i in range(3)]
  return {'center':[(x+y)/2 for x,y in zip(lo,hi)],'width':hi[0]-lo[0],'height':hi[2]-lo[2]}
 spacing[side]={'before':eye(a),'after':eye(b)}
eyecenterpass=all(max(abs(x-y) for x,y in zip(v['before']['center'],v['after']['center']))<1e-6 for v in spacing.values())
manifest=json.loads((R/'docs/render-manifest.json').read_text());matched={};baseline_same={}
for view in ['front','side','three-quarter','back']:
 x=next(v for v in manifest['baselineFrames'] if v['view']==view);y=next(v for v in manifest['polishedFrames'] if v['view']==view)
 matched[view]=all(x[k]==y[k] for k in ['location','rotation','orthoScale'])
 baseline_same[view]=(R/x['path']).read_bytes()==(P/'modeling-04/evaluation'/f'{view}.png').read_bytes()
relativevolume=h1['sumComponentVolumes']/h0['sumComponentVolumes']-1
boundsunchanged=all(abs(x-y)<1e-6 for k in ['min','max'] for x,y in zip(h0['bounds'][k],h1['bounds'][k]))
lockedproportions=all(abs(m0[k]-m1[k])<1e-6 for k in ['height','headHeight','headHeightRatio','skullWidth','torsoWidth','ankleToHem'])
report={'status':'UNAPPROVED / IDENTITY NOT LOCKED','baseCommit':'8a108a6a75420e11d9f1e603e3295188c7c5d9c5','blender':bpy.app.version_string,'reopenedSuccessfully':True,'allLockedObjectGeometryAndModifiersUnchanged':all(v['unchanged'] for v in locks.values()),'lockedObjectCount':len(locks),'noOriginalMeshRemoved':not(set(a)-set(b)),'changedObjects':changed,'addedReliefObjects':added,'materialsExactlyUnchanged':pal0==pal1,'retainedMaterialSlotsExactlyUnchanged':all(a[n]['materialSlots']==b[n]['materialSlots'] for n in a),'lightingWorldColorManagementUnchanged':li0==li1,'cameraDataUnchanged':c0==c1,'matchedViewCameras':matched,'baselinePNGBytesUnchanged':baseline_same,'lockedHeightAndBodyProportionsUnchanged':lockedproportions,'metrics':{'model04':m0,'polished':m1},'hair':{'before':h0,'after':h1,'outerEnvelopeUnchanged':boundsunchanged,'componentVolumeChangePercent':relativevolume*100},'eyes':spacing,'eyeCentersAndSpacingUnchanged':eyecenterpass,'armatures':sum(o.type=='ARMATURE' for o in bpy.data.objects),'actions':len(bpy.data.actions),'nonManifoldEdgesTotal':sum(v['nonManifoldEdges'] for v in mesh_audit),'degenerateFacesTotal':sum(v['degenerateFaces'] for v in mesh_audit),'meshAudit':mesh_audit,'sourceSHA256':{'base':hashlib.sha256(BASE.read_bytes()).hexdigest(),'polished':hashlib.sha256(NEW.read_bytes()).hexdigest()},'limits':['Per-object manifold checks do not certify deformation-ready unified topology or exhaustive self/inter-object collision freedom.','Hair envelope equality is a bounding check; overlapping component volume sum is only an approximation of hair mass.','Garment width may change only at authorized sleeve/cuff cross-sections; torso and sleeve centerlines/length are fixed.'],'render':manifest['render']}
(R/'docs/locked-objects.json').write_text(json.dumps(locks,indent=2));(R/'docs/technical-validation.json').write_text(json.dumps(report,indent=2))
assert pal0==pal1 and li0==li1 and c0==c1 and lockedproportions and boundsunchanged and eyecenterpass
assert all(matched.values()) and all(baseline_same.values())
assert report['nonManifoldEdgesTotal']==0 and report['degenerateFacesTotal']==0 and report['armatures']==0 and report['actions']==0
assert abs(relativevolume)<.05
print('POLISH_VALIDATION_PASS',m1['headHeightRatio'],'hair component volume change %',relativevolume*100)
