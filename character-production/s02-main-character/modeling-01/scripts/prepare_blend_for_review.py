"""Set the saved viewport for review; does not change model, materials, lights or camera."""
import bpy
for screen in bpy.data.screens:
 for area in screen.areas:
  if area.type=='VIEW_3D':
   area.spaces.active.region_3d.view_perspective='CAMERA'
   area.spaces.active.shading.type='MATERIAL'
   area.spaces.active.overlay.show_overlays=False
for o in bpy.context.selected_objects:o.select_set(False)
root=bpy.data.objects.get('S02_MainCharacter_UNAPPROVED_UNRIGGED')
root['approved']=False;root['rigged']=False
bpy.context.view_layer.objects.active=root
bpy.ops.wm.save_as_mainfile(filepath=bpy.data.filepath)
