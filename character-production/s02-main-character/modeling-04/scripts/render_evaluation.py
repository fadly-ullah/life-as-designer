"""Sequential matched camera/light evaluation. Never saves or changes Model03 source."""
import bpy,json,sys
from pathlib import Path
from mathutils import Vector
R=Path(__file__).resolve().parents[1];BASE=R.parent/'modeling-03/source/s02-character-modeling-03.blend'
preview='--preview' in sys.argv
bpy.ops.wm.open_mainfile(filepath=str(BASE))
s=bpy.context.scene;col=bpy.data.collections['CHARACTER | MODELING REVIEW ONLY']
pts=[o.matrix_world@v.co for o in col.objects if o.type=='MESH' for v in o.data.vertices]
center=(min(p.z for p in pts)+max(p.z for p in pts))/2
scale=s.camera.data.ortho_scale
views={'front':(0,-10,center+.72),'side':(10,0,center+.72),'three-quarter':(-6.5,-9,center+1.30),'back':(0,10,center+.72)}
manifest={'fixedTarget':[0,0,center],'orthoScale':scale,'source':'Model03 bounds and original Model03 cameras, used identically for both models','render':{'resolution':[640,800],'samples':48,'denoise':False,'threads':2,'engine':'Cycles CPU'},'renders':[]}
if '--model04-only' in sys.argv:
 old=json.loads((R/'docs/render-manifest.json').read_text());manifest['renders']=[r for r in old['renders'] if r['model']=='model03']
models=[('model04',R/'source/s02-character-modeling-04.blend')] if preview or '--model04-only' in sys.argv else [('model03',BASE),('model04',R/'source/s02-character-modeling-04.blend')]
for name,path in models:
 bpy.ops.wm.open_mainfile(filepath=str(path));s=bpy.context.scene;cam=s.camera
 s.render.engine='CYCLES';s.cycles.device='CPU';s.cycles.samples=16 if preview else 48;s.cycles.use_denoising=False
 s.render.threads_mode='FIXED';s.render.threads=2;s.render.resolution_x=640;s.render.resolution_y=800;s.render.resolution_percentage=75 if preview else 100
 s.render.image_settings.file_format='PNG';s.render.use_file_extension=True
 names=['front','three-quarter'] if preview else views
 for view in names:
  cam.data.ortho_scale=scale;cam.location=views[view];cam.rotation_euler=(Vector((0,0,center))-cam.location).to_track_quat('-Z','Y').to_euler()
  if preview:dest=Path('/workspace/work')/f'model04-preview-{view}.png'
  elif name=='model03':dest=R/'evaluation/model03-matched'/f'{view}.png'
  else:dest=R/'evaluation'/f'{view}.png'
  dest.parent.mkdir(parents=True,exist_ok=True);s.render.filepath=str(dest)
  bpy.ops.render.render(write_still=True)
  manifest['renders'].append({'model':name,'view':view,'path':str(dest.relative_to(R)) if not preview else str(dest),'location':list(cam.location),'rotation':list(cam.rotation_euler),'orthoScale':scale})
  if not preview:(R/'docs/render-manifest.json').write_text(json.dumps(manifest,indent=2))
print('RENDER_DONE')
