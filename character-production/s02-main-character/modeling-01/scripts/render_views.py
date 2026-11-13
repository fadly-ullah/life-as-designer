"""Render only the static modeling study. Run from the saved .blend file."""
import bpy,sys
from pathlib import Path
from mathutils import Vector
ROOT=Path(__file__).resolve().parents[1]
s=bpy.context.scene;c=s.camera
views={'front':(0,-8,2.6),'side':(8,0,2.6),'three-quarter':(5.7,-8,3.7),'back':(0,8,2.6)}
args=sys.argv[sys.argv.index('--')+1:] if '--' in sys.argv else ['front','side','three-quarter']
for name in args:
 c.location=views[name];c.rotation_euler=(Vector((0,0,1.98))-c.location).to_track_quat('-Z','Y').to_euler()
 s.render.filepath=str(ROOT/f'evaluation/{name}.png');bpy.ops.render.render(write_still=True)
