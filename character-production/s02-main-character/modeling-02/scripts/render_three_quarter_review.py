"""Camera-only review render. Does not edit any character mesh or material."""
import bpy,json
from pathlib import Path
from mathutils import Vector
ROOT=Path(__file__).resolve().parents[1]
meta=json.loads((ROOT/'docs/revision-metadata.json').read_text())
s=bpy.context.scene;center=.035+meta['height']/2
# Front-left view complements the right profile and follows the reference's facing direction.
s.camera.location=(-6.5,-9,center+1.30)
s.camera.rotation_euler=(Vector((0,0,center))-s.camera.location).to_track_quat('-Z','Y').to_euler()
s.render.filepath=str(ROOT/'evaluation/three-quarter.png')
bpy.ops.wm.save_as_mainfile(filepath=str(ROOT/'source/s02-character-modeling-02.blend'))
bpy.ops.render.render(write_still=True)
