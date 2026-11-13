from pathlib import Path
from PIL import Image
import json,hashlib,subprocess
ROOT=Path(__file__).resolve().parents[1];repo=ROOT.parents[2]
# Preserve all prior images and the prior .blend, not only git-tracked source text.
old=ROOT.parent/'modeling-01';manifest=json.loads((old/'docs/delivery-validation.json').read_text())
for path,record in manifest['artifacts'].items():assert hashlib.sha256((old/path).read_bytes()).hexdigest()==record['sha256'],path
new_records={}
for file in ['front.png','side.png','three-quarter.png','back.png','four-views-native.png','revision-review-sheet.png']:
 p=ROOT/'evaluation'/file
 with Image.open(p) as im:im.verify()
 with Image.open(p) as im:shape=list(im.size)
 if file in ['front.png','side.png','three-quarter.png','back.png']:assert shape==[960,1200]
 new_records['evaluation/'+file]={'dimensions':shape,'sha256':hashlib.sha256(p.read_bytes()).hexdigest()}
p=ROOT/'source/s02-character-modeling-02.blend';assert p.read_bytes()[:7]==b'BLENDER'
new_records['source/'+p.name]={'bytes':p.stat().st_size,'sha256':hashlib.sha256(p.read_bytes()).hexdigest()}
audit=json.loads((ROOT/'docs/mesh-audit.json').read_text());assert not audit['negativeSignedVolumes'] and not audit['nonManifoldBaseMeshes']
ratio=json.loads((ROOT/'docs/proportion-and-palette-validation.json').read_text());assert 3.5<=ratio['measuredHeadCount']<=4;assert ratio['materialColorsAndFinishIdenticalToModel01']
changed=subprocess.check_output(['git','diff','--name-only','844d870eee656f4427c7381df5ee09b2082b01db','--','.'],cwd=repo,text=True).splitlines()
assert all(p.startswith('character-production/s02-main-character/modeling-02/') for p in changed),changed
has_concept=(ROOT/'evaluation/approved-concept-comparison.png').exists()
report={'status':'revised-modeling-review-not-final','approved':False,'originalModelAndRendersUnchanged':True,'earlierTrackedFilesUnchanged':True,'renderEngine':'Cycles CPU','renderSamples':96,'renderConcurrency':1,'renderThreads':2,'fourViewsManuallyInspected':True,'exactApprovedConceptComparisonCreated':has_concept,'comparisonBlocker':None if has_concept else 'Approved reference image is visible in conversation but binary PNG/JPG unavailable in workspace. Exact reference cannot be composited without that file.','alternativeSheet':'Actual Model 01 front vs actual Model 02 front and four revised views with change notes; clearly labeled, not represented as approved-concept comparison.','riggingPerformed':False,'GLBExported':False,'animationPerformed':False,'artifacts':new_records}
(ROOT/'docs/delivery-validation.json').write_text(json.dumps(report,indent=2)+'\n');print(json.dumps(report,indent=2))
