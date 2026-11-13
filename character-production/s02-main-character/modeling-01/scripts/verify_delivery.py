"""Verify artifacts and preservation. Does not judge character design quality."""
from pathlib import Path
import hashlib,json,subprocess
from PIL import Image
ROOT=Path(__file__).resolve().parents[1]
repo=ROOT.parents[2]
records={}
for name in ['front','side','three-quarter','character-review-board']:
 p=ROOT/f'evaluation/{name}.png'
 with Image.open(p) as im:
  im.verify()
 with Image.open(p) as im:
  size=list(im.size)
 records[str(p.relative_to(ROOT))]={'size':size,'sha256':hashlib.sha256(p.read_bytes()).hexdigest()}
source=ROOT/'source/s02-character-modeling-01.blend'
assert source.read_bytes()[:7]==b'BLENDER'
records[str(source.relative_to(ROOT))]={'bytes':source.stat().st_size,'sha256':hashlib.sha256(source.read_bytes()).hexdigest()}
audit=json.loads((ROOT/'docs/mesh-audit.json').read_text())
assert not audit['negativeSignedVolumes']
assert not audit['nonManifoldBaseMeshes']
assert audit['armatureCount']==0 and audit['animationActionCount']==0
preservation=subprocess.check_output(['git','diff','--name-only','origin/feature/s02-ep01-algorithm','--','.'],cwd=repo,text=True).strip()
unexpected=[path for path in preservation.splitlines() if not path.startswith('character-production/s02-main-character/modeling-01/')]
assert not unexpected,unexpected
result={'status':'static-modeling-evaluation-delivered-not-approved','blender':'4.3.2','engine':'Cycles CPU','samples':96,'denoising':False,'renderConcurrency':1,'renderThreads':2,'viewsManuallyInspected':True,'conceptComparison':'manual visual review against approved image in chat; no pixel registration','previousTrackedFilesUnchanged':True,'riggingPerformed':False,'productionGLBExported':False,'threeJsRigTestPerformed':False,'episodeAnimationPerformed':False,'artifacts':records}
(ROOT/'docs/delivery-validation.json').write_text(json.dumps(result,indent=2)+'\n')
print(json.dumps(result,indent=2))
