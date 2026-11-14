import bpy,bmesh,json,hashlib
from pathlib import Path
D=Path(__file__).resolve().parents[1];R=D.parent
def palette():
 return {m.name:{'diffuse':list(m.diffuse_color),'nodes':[(n.name,[(i.name, str(i.default_value[:]) if hasattr(i.default_value,'__len__') else str(i.default_value)) for i in n.inputs if hasattr(i,'default_value')]) for n in m.node_tree.nodes] if m.use_nodes else []} for m in bpy.data.materials}
bpy.ops.wm.open_mainfile(filepath=str(R/'modeling-02/source/s02-character-modeling-02.blend'));p=palette()
bpy.ops.wm.open_mainfile(filepath=str(D/'source/s02-character-modeling-03.blend'));q=palette()
report=json.loads((D/'docs/technical-validation.json').read_text());meshes=[]
for o in bpy.data.collections['CHARACTER | MODELING REVIEW ONLY'].objects:
 if o.type!='MESH':continue
 bm=bmesh.new();bm.from_mesh(o.data)
 meshes.append({'object':o.name,'vertices':len(bm.verts),'faces':len(bm.faces),'nonManifoldEdges':sum(not e.is_manifold for e in bm.edges),'degenerateFaces':sum(f.calc_area()<1e-10 for f in bm.faces),'materialSlots':[m.name for m in o.data.materials]});bm.free()
report.update({'reopenedSuccessfully':True,'materialNodeTreesExactlyUnchanged':p==q,'nonManifoldEdgesTotal':sum(m['nonManifoldEdges'] for m in meshes),'degenerateFacesTotal':sum(m['degenerateFaces'] for m in meshes),'topologyScope':'Per-object closed surfaces only. Separate overlapping garment/hair meshes retained; not a watertight unified deformation mesh.','meshAudit':meshes,'blendSHA256':hashlib.sha256((D/'source/s02-character-modeling-03.blend').read_bytes()).hexdigest()})
(D/'docs/technical-validation.json').write_text(json.dumps(report,indent=2))
print('VALIDATION',p==q,report['nonManifoldEdgesTotal'],report['degenerateFacesTotal'])
