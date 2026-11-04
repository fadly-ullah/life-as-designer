"""Optional archive regeneration from the exact previous renders in provenance.
Normal rendering uses the committed clips and does not need previous out/ files.
Changing clips requires fresh visual review. No network or narration generation.
"""
from pathlib import Path
import hashlib,json,subprocess

root=Path(__file__).resolve().parents[1]
manifest=root/'public/montage/provenance.json'
data=json.loads(manifest.read_text())
for clip in data['clips']:
 source=root.parent/clip['sourceProject']/'out'/clip['sourceRender']
 if not source.is_file():
  raise SystemExit(f'Original preview missing: {source}. Existing bundled clip is retained; no substitute created.')
 if hashlib.sha256(source.read_bytes()).hexdigest()!=clip['sourceRenderSha256']:
  raise SystemExit(f'Source render differs from provenance: {source}')
for clip in data['clips']:
 source=root.parent/clip['sourceProject']/'out'/clip['sourceRender'];output=root/'public'/clip['file'];crop=clip['crop']
 subprocess.run(['ffmpeg','-v','error','-y','-ss',str(clip['sourceStartSeconds']),'-i',str(source),'-t',str(clip['durationSeconds']),'-an','-vf',f"crop={crop['width']}:{crop['height']}:{crop['x']}:{crop['y']},fps=30",'-c:v','libx264','-preset','veryfast','-crf','18','-pix_fmt','yuv420p','-threads','2','-movflags','+faststart',str(output)],check=True)
 clip['sha256']=hashlib.sha256(output.read_bytes()).hexdigest()
manifest.write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n')
print('Regenerated genuine clips. Run visual:check and inspect again before preview rendering.')
