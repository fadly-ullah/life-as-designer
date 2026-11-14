"""Check immutable sources, functional tests and delivered frames. No Blender/source mutation."""
from pathlib import Path
from PIL import Image
import json,hashlib,subprocess
R=Path(__file__).resolve().parents[1];repo=R.parents[2];base='6ebeb1604d8800c22c6bd1833700b17006b1d6e1'
refs=['character-production/s02-main-character/Season02_Approved_Character_Concept.png']+[f'character-production/s02-main-character/modeling-0{i}/source/s02-character-modeling-0{i}.blend' for i in [1,2,3,4]]+['character-production/s02-main-character/modeling-04-final-polish/source/s02-character-model04-final-polish.blend','character-production/s02-main-character/rigging-prep/source/s02-character-rigging-prep.blend']
checks={}
for p in refs:
 old=subprocess.check_output(['git','-C',str(repo),'show',f'{base}:{p}']);now=(repo/p).read_bytes();assert old==now,p
 checks[p]={'unchanged':True,'SHA256':hashlib.sha256(now).hexdigest()}
outside=subprocess.check_output(['git','-C',str(repo),'diff',base,'--name-only','--','.',':(exclude)character-production/s02-main-character/rig-v1/**'],text=True);assert not outside.strip(),outside
(R/'docs/source-preservation.json').write_text(json.dumps({'basePrepCommit':base,'lockedIdentityCommit':'aff455385918d8cb13d72123af824156bd771e6a','sources':checks,'existingPathsModifiedOutsideRigV1':[],'Season01AndEpisode01CodeUnchanged':True},indent=2))
idn=json.loads((R/'docs/identity-validation.json').read_text());p=json.loads((R/'docs/pose-validation.json').read_text());w=json.loads((R/'docs/skin-weight-validation.json').read_text())
assert idn['allOriginalRawMeshTopologyMaterialsMatricesUnchanged'] and idn['allMorphBasisExactlyLockedNeutral'] and idn['materialNodesLinksUnchanged'] and idn['lightingWorldColorManagementUnchanged']
assert idn['allDriversValid'] and idn['boneCount']==20 and not idn['animationActions'] and not idn['constraintCount']
assert p['neutralMaxWorldVertexError']<1e-5 and p['neutralRestoreMaxWorldError']<1e-5 and p['allFaceControlsRestored'] and p['rootMovementVerified'] and all(v>.001 for v in p['boneControlTests'].values())
assert w['invalidVertexCount']==0 and sum(v['vertices'] for v in w['objects'])==2444 and max(v['maxInfluences'] for v in w['objects'])<=4
requiredBody=['neutral','head_left','head_right','arm_raised','elbow_bent','torso_lean','seated','mouse_reach','elbow_bent_side','seated_side']
requiredFace=['neutral','senang','kaget','mikir','semangat','blink_closed','blink_open','gaze_x_neg','gaze_x_pos','gaze_z_neg','gaze_z_pos']
for folder,names in [('body',requiredBody),('expressions',requiredFace)]:
 for name in names:
  path=R/'evaluation'/folder/f'{name}.png'
  with Image.open(path) as im:assert im.size==(480,600);im.verify()
with Image.open(R/'evaluation/identity/locked-neutral-identity.png') as im:assert im.size==(640,800);im.verify()
assert not [f for f in R.rglob('*') if f.suffix.lower() in ['.glb','.gltf','.fbx','.mp4']]
for name in ['body-pose-sheet.png','contact-issues-sheet.png','expression-sheet.png','blink-gaze-sheet.png','mobile-expression-check.png','neutral-identity-comparison.png']:
 with Image.open(R/'evaluation'/name) as im:im.verify()
files={str(f.relative_to(R)):hashlib.sha256(f.read_bytes()).hexdigest() for f in R.rglob('*') if f.is_file() and f.suffix!='.blend1' and '__pycache__' not in f.parts and f.name!='delivery-sha256.json'}
(R/'docs/delivery-sha256.json').write_text(json.dumps(files,indent=2))
print('DELIVERY_PASS',len(files)+1,'files; functional controls checked, locked source/Season01/Episode01 untouched; no export')
