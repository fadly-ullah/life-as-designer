"""Single neutral character verification render, not animation or Episode01 production."""
import bpy,json
from pathlib import Path
R=Path(__file__).resolve().parents[1];P=R.parent
m=json.loads((P/'modeling-04-final-polish/docs/render-manifest.json').read_text())
v=next(x for x in m['polishedFrames'] if x['view']=='three-quarter')
bpy.ops.wm.open_mainfile(filepath=str(R/'source/s02-character-rigging-prep.blend'))
s=bpy.context.scene;cam=s.camera;cam.location=v['location'];cam.rotation_euler=v['rotation'];cam.data.ortho_scale=v['orthoScale']
s.render.engine='CYCLES';s.cycles.device='CPU';s.cycles.samples=48;s.cycles.use_denoising=False
s.render.threads_mode='FIXED';s.render.threads=2;s.render.resolution_x=640;s.render.resolution_y=800;s.render.resolution_percentage=100
s.render.image_settings.file_format='PNG';s.render.filepath=str(R/'evaluation/neutral-three-quarter.png')
bpy.ops.render.render(write_still=True)
print('NEUTRAL_VERIFICATION_RENDER_DONE')
