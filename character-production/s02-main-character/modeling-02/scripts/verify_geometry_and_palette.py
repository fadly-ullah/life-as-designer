import bpy,json
from pathlib import Path
from mathutils import Vector
ROOT=Path(__file__).resolve().parents[1]
col=bpy.data.collections['CHARACTER | MODELING REVIEW ONLY'];objects=[o for o in col.objects if o.type=='MESH']
points=[o.matrix_world@Vector(v) for o in objects for v in o.bound_box]
head_bottom=min((o.matrix_world@Vector(v)).z for o in objects if o.name.startswith('Head |') for v in o.bound_box)
top=max(p.z for p in points);bottom=min(p.z for p in points)
ratio=(top-bottom)/(top-head_bottom)
assert abs(ratio-3.65)<.00001,(ratio,head_bottom,top)
assert not [o for o in bpy.data.objects if o.type=='ARMATURE']
assert len(bpy.data.actions)==0
used=set(m.name for o in objects for m in o.data.materials)
def palette():
 result={}
 for name in used:
  m=bpy.data.materials[name];bs=m.node_tree.nodes.get('Principled BSDF')
  result[name]={'diffuse':list(m.diffuse_color),'baseColor':list(bs.inputs['Base Color'].default_value),'roughness':bs.inputs['Roughness'].default_value,'specular':bs.inputs['Specular IOR Level'].default_value}
 return result
current=palette()
bpy.ops.wm.open_mainfile(filepath=str(ROOT.parent/'modeling-01/source/s02-character-modeling-01.blend'))
base=palette();assert current==base,'Main material palette or finish changed.'
report={'measuredHeadCount':ratio,'measurementDefinition':'mesh floor-to-crown bounding height / crown-to-lowest-jaw bounding height','height':top-bottom,'headHeight':top-head_bottom,'materialColorsAndFinishIdenticalToModel01':True,'comparedMaterialCount':len(used),'armatureCount':0,'actions':0,'visualFidelityApproved':False,'productionReadinessApproved':False}
(ROOT/'docs/proportion-and-palette-validation.json').write_text(json.dumps(report,indent=2)+'\n');print(json.dumps(report,indent=2))
