"""Side views expose elbow/seat issues. Static character tests only."""
import bpy,json
from pathlib import Path
R=Path(__file__).resolve().parents[1];exec((R/'scripts/rig_controls.py').read_text())
bpy.ops.wm.open_mainfile(filepath=str(R/'source/s02-character-rig-v1.blend'))
v=next(v for v in json.loads((R.parent/'modeling-04-final-polish/docs/render-manifest.json').read_text())['polishedFrames'] if v['view']=='side')
s=bpy.context.scene;cam=s.camera;cam.location=v['location'];cam.rotation_euler=v['rotation'];cam.data.ortho_scale=v['orthoScale']
s.render.engine='CYCLES';s.cycles.device='CPU';s.cycles.samples=32;s.cycles.use_denoising=False;s.render.threads_mode='FIXED';s.render.threads=2;s.render.resolution_x=640;s.render.resolution_y=800;s.render.resolution_percentage=75
for name in ['seated','elbow_bent']:
 pose(name);s.render.filepath=str(R/f'evaluation/body/{name}_side.png');bpy.ops.render.render(write_still=True)
reset_rig();print('CONTACT_VIEWS_DONE')
