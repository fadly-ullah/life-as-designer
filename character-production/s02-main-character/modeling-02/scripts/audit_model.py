import bpy,bmesh,json
from pathlib import Path
from mathutils import Vector
ROOT=Path(__file__).resolve().parents[1]
col=bpy.data.collections['CHARACTER | MODELING REVIEW ONLY']
meshes=[o for o in col.objects if o.type=='MESH']
points=[o.matrix_world@Vector(corner) for o in meshes for corner in o.bound_box]
size=[round(max(p[i] for p in points)-min(p[i] for p in points),4) for i in range(3)]
volumes=[];topology=[]
for o in meshes:
 bm=bmesh.new();bm.from_mesh(o.data)
 volume=bm.calc_volume(signed=True)
 if volume<0:volumes.append(o.name)
 if any(not e.is_manifold for e in bm.edges):topology.append(o.name)
 bm.free()
report={'meshCount':len(meshes),'dimensionsXYZ':size,'baseMeshVertices':sum(len(o.data.vertices) for o in meshes),'baseMeshFaces':sum(len(o.data.polygons) for o in meshes),'negativeSignedVolumes':volumes,'nonManifoldBaseMeshes':topology,'armatureCount':sum(o.type=='ARMATURE' for o in bpy.data.objects),'animationActionCount':len(bpy.data.actions),'shapeKeys':sum(bool(o.data.shape_keys) for o in meshes),'materials':sorted(set(m.name for o in meshes for m in o.data.materials)),'note':'A closed static mesh is not proof of deformation-ready topology, visual fidelity or rig quality.'}
(ROOT/'docs/mesh-audit.json').write_text(json.dumps(report,indent=2)+'\n');print(json.dumps(report,indent=2))
