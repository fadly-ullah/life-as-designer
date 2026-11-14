"""Reuse exact Model04 evaluation cameras and baseline PNGs; render polish sequentially."""
import bpy,json,sys,shutil,hashlib
from pathlib import Path
from mathutils import Vector
R=Path(__file__).resolve().parents[1];B=R.parent/'modeling-04';preview='--preview' in sys.argv
source=json.loads((B/'docs/render-manifest.json').read_text())
views=[r for r in source['renders'] if r['model']=='model04']
manifest={'baseCommit':'8a108a6a75420e11d9f1e603e3295188c7c5d9c5','target':source['fixedTarget'],'baseline':'Exact original Model04 PNGs copied read-only, camera evidence from Model04 render-manifest.json','render':source['render'],'baselineFrames':[],'polishedFrames':[]}
if not preview:
 (R/'evaluation/model04-reference').mkdir(exist_ok=True)
 for view in views:
  p=B/'evaluation'/f"{view['view']}.png";dest=R/'evaluation/model04-reference'/p.name;shutil.copyfile(p,dest)
  manifest['baselineFrames'].append({**view,'path':str(dest.relative_to(R)),'sha256':hashlib.sha256(dest.read_bytes()).hexdigest()})
bpy.ops.wm.open_mainfile(filepath=str(R/'source/s02-character-model04-final-polish.blend'))
s=bpy.context.scene;cam=s.camera
s.render.engine='CYCLES';s.cycles.device='CPU';s.cycles.samples=16 if preview else 48;s.cycles.use_denoising=False
s.render.threads_mode='FIXED';s.render.threads=2;s.render.resolution_x=640;s.render.resolution_y=800;s.render.resolution_percentage=75 if preview else 100
s.render.image_settings.file_format='PNG';s.render.use_file_extension=True
for view in views:
 if preview and view['view']=='side':continue
 cam.location=view['location'];cam.rotation_euler=view['rotation'];cam.data.ortho_scale=view['orthoScale']
 dest=(Path('/workspace/work')/f"polish-preview-{view['view']}.png") if preview else (R/'evaluation'/f"{view['view']}.png")
 s.render.filepath=str(dest);bpy.ops.render.render(write_still=True)
 manifest['polishedFrames'].append({'view':view['view'],'location':list(cam.location),'rotation':list(cam.rotation_euler),'orthoScale':cam.data.ortho_scale,'path':str(dest.relative_to(R)) if not preview else str(dest)})
 if not preview:(R/'docs/render-manifest.json').write_text(json.dumps(manifest,indent=2))
print('POLISH_RENDER_DONE')
