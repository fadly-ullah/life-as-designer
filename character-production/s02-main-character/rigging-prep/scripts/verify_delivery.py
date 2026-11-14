"""Verify approved/prior file bytes, unbound plans and neutral RGB parity; write reports only."""
from pathlib import Path
from PIL import Image,ImageChops,ImageDraw,ImageFont
import json,hashlib,subprocess
R=Path(__file__).resolve().parents[1];repo=R.parents[2];base='aff455385918d8cb13d72123af824156bd771e6a'
paths=['character-production/s02-main-character/Season02_Approved_Character_Concept.png']+[f'character-production/s02-main-character/modeling-0{i}/source/s02-character-modeling-0{i}.blend' for i in [1,2,3,4]]+['character-production/s02-main-character/modeling-04-final-polish/source/s02-character-model04-final-polish.blend']
checks={}
for p in paths:
 original=subprocess.check_output(['git','-C',str(repo),'show',f'{base}:{p}']);current=(repo/p).read_bytes();assert original==current,p
 checks[p]={'unchanged':True,'sha256':hashlib.sha256(current).hexdigest()}
diff=subprocess.check_output(['git','-C',str(repo),'diff',base,'--name-only','--','.',':(exclude)character-production/s02-main-character/rigging-prep/**'],text=True)
assert not diff.strip(),diff
(R/'docs/source-preservation.json').write_text(json.dumps({'baseCommit':base,'priorSourceChecks':checks,'existingTrackedPathsChangedOutsideRiggingPrep':[],'stage':'Only new rigging-prep directory may differ from approved commit; no changes to Season01 or Episode01 code.'},indent=2))
a=Image.open(R.parent/'modeling-04-final-polish/evaluation/three-quarter.png').convert('RGB');b=Image.open(R/'evaluation/neutral-three-quarter.png').convert('RGB');assert a.size==b.size
delta=ImageChops.difference(a,b);pixels=list(delta.get_flattened_data());hi=max(v[1] for v in delta.getextrema());count=sum(p!=(0,0,0) for p in pixels);mae=sum(sum(p) for p in pixels)/(a.width*a.height*3)
render={'view':'three-quarter','resolution':list(a.size),'reference':'modeling-04-final-polish/evaluation/three-quarter.png','prepRender':'evaluation/neutral-three-quarter.png','maxRGBChannelDifference':hi,'changedPixels':count,'meanAbsoluteRGBDifference':mae,'pixelIdentical':hi==0,'scope':'One static neutral character view, not deformation/animation/Episode01. Exact all-mesh world/evaluated geometry and normals checked separately.'}
(R/'docs/neutral-render-verification.json').write_text(json.dumps(render,indent=2));assert hi==0
im=Image.new('RGB',(1340,950),'#14191d');draw=ImageDraw.Draw(im);font='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
draw.text((25,15),'TASK07 | IDENTITY LOCKED - STATIC RIGGING PREP',font=ImageFont.truetype(font,30),fill='#f1f3e9')
draw.text((25,65),'APPROVED POLISHED MODEL04',font=ImageFont.truetype(font,23),fill='#b4ce43');draw.text((695,65),'RIGGING PREP / NO RIG',font=ImageFont.truetype(font,23),fill='#b4ce43')
im.paste(a,(15,108));im.paste(b,(685,108));draw.text((25,918),f'Neutral RGB pixel comparison: max difference {hi}/255 | no geometry/material changes | rig/export not approved',font=ImageFont.truetype(font,19),fill='#d1d8e2');im.save(R/'evaluation/identity-preservation-comparison.png')
controls=json.loads((R/'docs/animation-controls.json').read_text());byname={v['name']:v for v in controls['controls']}
assert len(byname)==len(controls['controls']) and not controls['actualBoneBindings'] and not controls['actualMorphBindings']
assert all(v['binding'] is None and v['range'][0]<=v['neutralDefault']<=v['range'][1] for v in byname.values())
for preset in controls['expressionPresets'].values():
 for name,value in preset['weights'].items():assert name in byname and byname[name]['range'][0]<=value<=byname[name]['range'][1]
identity=json.loads((R/'docs/identity-preservation.json').read_text());audit=json.loads((R/'docs/rigging-readiness.json').read_text());hierarchy=json.loads((R/'docs/hierarchy-bindings.json').read_text())
assert audit['characterMeshObjects']==len(hierarchy['meshes'])==len(set(v['object'] for v in hierarchy['meshes']))==110
assert not any(audit[k] for k in ['armatures','actions','vertexGroupTotal','shapeKeyTotal','constraintCount'])
assert all(v['rawMeshTransformModifiersUVSlotsAndVisibilityIdentical'] and v['evaluatedWorldGeometryTrianglesNormalsIdentical'] for v in identity['meshChecks'].values())
print('DELIVERY_PASS: original source bytes intact, neutral RGB identical, 110 meshes preserved, no rig/weights/actions/export')
