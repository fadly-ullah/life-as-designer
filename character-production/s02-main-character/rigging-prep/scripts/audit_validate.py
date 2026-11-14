"""Read-only readiness and identity audit. Never changes/saves a Blender source."""
import bpy,bmesh,json,hashlib,math
from pathlib import Path
from mathutils import Vector,Matrix
from mathutils.bvhtree import BVHTree
R=Path(__file__).resolve().parents[1];P=R.parent
helpers=(P/'modeling-04/scripts/validate_model04.py').read_text();exec(helpers[:helpers.index("base=P/'modeling-03")])
R=Path(__file__).resolve().parents[1];P=R.parent
BASE=P/'modeling-04-final-polish/source/s02-character-model04-final-polish.blend';PREP=R/'source/s02-character-rigging-prep.blend'
def sha(v):return hashlib.sha256(json.dumps(v,sort_keys=True).encode()).hexdigest()
def modifiers(o):
 return [(m.name,m.type,{p.identifier:(list(value) if hasattr(value,'__len__') and not isinstance(value,str) else value) for p in m.bl_rna.properties if p.identifier not in ['rna_type','name'] and p.type in ['BOOLEAN','INT','FLOAT','STRING','ENUM'] for value in [getattr(m,p.identifier)]}) for m in o.modifiers]
def capture():
 dep=bpy.context.evaluated_depsgraph_get();out={}
 for o in bpy.data.objects:
  if o.type!='MESH':continue
  raw={'vertices':[list(v.co) for v in o.data.vertices],'edges':[list(e.vertices) for e in o.data.edges],'polygons':[list(p.vertices) for p in o.data.polygons],'smooth':[p.use_smooth for p in o.data.polygons],'uv':{uv.name:[list(loop.uv) for loop in uv.data] for uv in o.data.uv_layers},'matrix':[list(row) for row in o.matrix_world],'modifiers':modifiers(o),'materials':[m.name for m in o.data.materials],'visibility':[o.hide_render,o.hide_viewport]}
  ev=o.evaluated_get(dep);mesh=ev.to_mesh();mesh.calc_loop_triangles()
  evaluated={'verticesWorld':[list(ev.matrix_world@v.co) for v in mesh.vertices],'triangles':[list(t.vertices) for t in mesh.loop_triangles],'cornerNormals':[list(n.vector) for n in mesh.corner_normals]}
  out[o.name]={'rawSHA256':sha(raw),'evaluatedWorldSHA256':sha(evaluated),'raw':raw};ev.to_mesh_clear()
 return out
bpy.ops.wm.open_mainfile(filepath=str(BASE));base=capture();p0=palette();l0=lights();units0={'system':bpy.context.scene.unit_settings.system,'scaleLength':bpy.context.scene.unit_settings.scale_length}
base_object_count=len(bpy.data.objects)
bpy.ops.wm.open_mainfile(filepath=str(PREP));prepared=capture();p1=palette();l1=lights();units1={'system':bpy.context.scene.unit_settings.system,'scaleLength':bpy.context.scene.unit_settings.scale_length}
identity={'identityApprovalScope':'Visual identity approved by explicit TASK07 user decision; rig/export NOT approved.','sourceCommit':'aff455385918d8cb13d72123af824156bd771e6a','sourceSHA256':hashlib.sha256(BASE.read_bytes()).hexdigest(),'prepSHA256':hashlib.sha256(PREP.read_bytes()).hexdigest(),'meshObjectsAdded':sorted(set(prepared)-set(base)),'meshObjectsRemoved':sorted(set(base)-set(prepared)),'meshChecks':{n:{'rawMeshTransformModifiersUVSlotsAndVisibilityIdentical':base[n]['rawSHA256']==prepared.get(n,{}).get('rawSHA256'),'evaluatedWorldGeometryTrianglesNormalsIdentical':base[n]['evaluatedWorldSHA256']==prepared.get(n,{}).get('evaluatedWorldSHA256'),'sourceRawSHA256':base[n]['rawSHA256'],'prepRawSHA256':prepared.get(n,{}).get('rawSHA256'),'sourceEvaluatedSHA256':base[n]['evaluatedWorldSHA256'],'prepEvaluatedSHA256':prepared.get(n,{}).get('evaluatedWorldSHA256')} for n in base},'allMaterialsNodesLinksIdentical':p0==p1,'lightsWorldColorManagementIdentical':l0==l1,'unitsIdentical':units0==units1,'topologyCleanupPerformed':False,'originOrTransformsApplied':False,'preserved':'All original raw/evaluated meshes, silhouette, proportions, face, hair, garments, materials, visibility, unit scale and lighting. Parent relationships changed through identity-transform static containers only.'}
assert not identity['meshObjectsAdded'] and not identity['meshObjectsRemoved']
assert all(v['rawMeshTransformModifiersUVSlotsAndVisibilityIdentical'] and v['evaluatedWorldGeometryTrianglesNormalsIdentical'] for v in identity['meshChecks'].values())
assert p0==p1 and l0==l1 and units0==units1
mapping=json.loads((R/'docs/hierarchy-bindings.json').read_text());names=[v['object'] for v in mapping['meshes']];policy={v['object']:v['futurePolicy'] for v in mapping['meshes']}
mesh_audit=[];bvh={};aabb={};dep=bpy.context.evaluated_depsgraph_get()
for name in names:
 o=bpy.data.objects[name];m=o.data;bm=bmesh.new();bm.from_mesh(m);bm.verts.ensure_lookup_table()
 seen=set();components=[]
 for v in bm.verts:
  if v.index in seen:continue
  stack=[v];seen.add(v.index);count=0
  while stack:
   x=stack.pop();count+=1
   for edge in x.link_edges:
    y=edge.other_vert(x)
    if y.index not in seen:seen.add(y.index);stack.append(y)
  components.append(count)
 raw_volume=bm.calc_volume(signed=True);m.calc_loop_triangles();world=[o.matrix_world@v.co for v in m.vertices];lo=[min(v[i] for v in world) for i in range(3)];hi=[max(v[i] for v in world) for i in range(3)]
 origin=o.matrix_world.translation;origin_inside=all(lo[i]-1e-6<=origin[i]<=hi[i]+1e-6 for i in range(3))
 ev=o.evaluated_get(dep);em=ev.to_mesh();em.calc_loop_triangles();verts=[ev.matrix_world@v.co for v in em.vertices];tris=[tuple(t.vertices) for t in em.loop_triangles]
 bvh[name]=BVHTree.FromPolygons(verts,tris,all_triangles=True,epsilon=1e-7);aabb[name]=([min(v[i] for v in verts) for i in range(3)],[max(v[i] for v in verts) for i in range(3)])
 mesh_audit.append({'object':name,'policy':policy[name],'vertices':len(m.vertices),'faces':len(m.polygons),'trianglesRaw':len(m.loop_triangles),'trianglesEvaluated':len(tris),'ngons':sum(len(f.vertices)>4 for f in m.polygons),'quads':sum(len(f.vertices)==4 for f in m.polygons),'looseVertices':sum(not v.link_edges for v in bm.verts),'nonManifoldEdges':sum(not e.is_manifold for e in bm.edges),'boundaryEdges':sum(e.is_boundary for e in bm.edges),'degenerateFaces':sum(f.calc_area()<1e-10 for f in bm.faces),'connectedComponents':len(components),'signedVolume':raw_volume,'uvLayers':len(m.uv_layers),'vertexGroups':len(o.vertex_groups),'shapeKeys':len(m.shape_keys.key_blocks) if m.shape_keys else 0,'armatureModifiers':sum(mod.type=='ARMATURE' for mod in o.modifiers),'modifiers':[{'name':mod.name,'type':mod.type} for mod in o.modifiers],'boundsWorld':{'min':lo,'max':hi},'originWorld':list(origin),'originInsideOwnBounds':origin_inside,'scale':list(o.scale),'negativeScaleDeterminant':o.matrix_world.to_3x3().determinant()<0,'materialSlots':[mat.name for mat in m.materials]})
 bm.free();ev.to_mesh_clear()
intersections=[]
for i,name in enumerate(names):
 lo,hi=aabb[name]
 for other in names[i+1:]:
  lo2,hi2=aabb[other]
  if not all(lo[k]<=hi2[k] and lo2[k]<=hi[k] for k in range(3)):continue
  overlaps=bvh[name].overlap(bvh[other])
  if not overlaps:continue
  head_prefix=('Hair |','Head |','Ear.','Ear inner.','Eye ','Pupil.','Upper eyelid.','Brow.','Blush.','Neutral mouth','Nose |')
  category='static_head_layers' if name.startswith(head_prefix) and other.startswith(head_prefix) else 'garment_or_joint_contact_review'
  intersections.append({'a':name,'b':other,'trianglePairCount':len(overlaps),'classification':category,'interpretation':'Evaluated triangle surface overlap, not penetration depth. Overlapping voxel/clothing layers can be intentional; containment-only contacts may be missed.'})
s=bpy.context.scene
height=max(v['boundsWorld']['max'][2] for v in mesh_audit)-min(v['boundsWorld']['min'][2] for v in mesh_audit)
report={'stage':'RIGGING PREPARATION ONLY','identityLocked':True,'fullRiggingApproved':False,'glbExportApproved':False,'blender':bpy.app.version_string,'characterMeshObjects':len(mesh_audit),'rawVertices':sum(v['vertices'] for v in mesh_audit),'rawTriangles':sum(v['trianglesRaw'] for v in mesh_audit),'evaluatedTriangles':sum(v['trianglesEvaluated'] for v in mesh_audit),'ngons':sum(v['ngons'] for v in mesh_audit),'nonManifoldEdgesTotal':sum(v['nonManifoldEdges'] for v in mesh_audit),'degenerateFacesTotal':sum(v['degenerateFaces'] for v in mesh_audit),'looseVerticesTotal':sum(v['looseVertices'] for v in mesh_audit),'multiIslandMeshObjects':sum(v['connectedComponents']>1 for v in mesh_audit),'uvlessObjects':sum(v['uvLayers']==0 for v in mesh_audit),'originOutsideGeometryObjects':sum(not v['originInsideOwnBounds'] for v in mesh_audit),'materialDatablocks':len(bpy.data.materials),'imageDatablocks':len(bpy.data.images),'packedImages':sum(im.packed_file is not None for im in bpy.data.images),'missingExternalImages':[im.name for im in bpy.data.images if im.source=='FILE' and not im.packed_file and not Path(bpy.path.abspath(im.filepath)).exists()],'armatures':sum(o.type=='ARMATURE' for o in bpy.data.objects),'actions':len(bpy.data.actions),'vertexGroupTotal':sum(v['vertexGroups'] for v in mesh_audit),'shapeKeyTotal':sum(v['shapeKeys'] for v in mesh_audit),'constraintCount':sum(len(o.constraints) for o in bpy.data.objects),'staticPrepContainers':len(mapping['groups']),'unboundCandidateLandmarks':len(mapping['landmarks']),'heightBlenderUnits':height,'units':units1,'pipelineInspection':{'remotion':'4.0.540','three':'0.187.0','reactThreeFiber':'9.8.2','existingRigContract':'life-as-graphic-designer-s02-ep01/src/characters/rig-contract.ts','episodeGate':'Episode01 throws CHARACTER_ASSET_LOCK; unchanged. Existing binding contract has no actual bone/expression bindings.'},'readiness':'PARTIAL: identity-preserved neutral structure prepared, NOT skinned/deformation-validated/export-ready','cleanupPerformed':['Static identity-transform grouping by region','Hidden unbound joint candidate landmarks','Scoped identity approval metadata and unbound mesh-to-region manifest'],'cleanupNotPerformed':['No welding/joining/remesh/retopology','No triangulation/modifier application','No origin shift, object scale application, geometry/material edits','No bones, skin weights, constraints, shape keys, actions or GLB export'],'blockers':['No skeleton/bind pose or weights','Joint axes and bending clearance untested','Sleeve/trouser topology and seams require isolated deformation tests','No blink/gaze/mouth/brow performance targets implemented or approved','Multiple intentional overlap surfaces need joint-region collision review','Modifier/normal/triangulation export parity untested','No rigged glTF/Three.js round trip or deterministic pose playback validation','Character rig/export and Episode01 production still require separate authorization'], 'meshAudit':mesh_audit,'surfaceIntersectionPairs':intersections,'intersectionPairCount':len(intersections),'auditLimits':['Closed-per-object checks do not make a single watertight character or certify bend readiness.','BVH surface crossings are a static overlap screen, not exhaustive containment/collision/self-intersection certification.','No deformation pose/animation/export test run because those require full rigging authorization.']}
(R/'docs/identity-preservation.json').write_text(json.dumps(identity,indent=2));(R/'docs/rigging-readiness.json').write_text(json.dumps(report,indent=2))
assert not report['armatures'] and not report['actions'] and not report['vertexGroupTotal'] and not report['shapeKeyTotal'] and not report['constraintCount']
assert report['nonManifoldEdgesTotal']==0 and report['degenerateFacesTotal']==0
print('AUDIT_PASS',len(names),'meshes',report['rawVertices'],'raw verts',report['evaluatedTriangles'],'eval triangles',len(intersections),'surface-crossing pairs')
