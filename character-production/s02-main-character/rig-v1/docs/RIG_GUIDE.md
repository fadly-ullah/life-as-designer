# Rig v1 — functional FK / expression system, under evaluation

Visual identity is locked to polished Model04 at `aff455385918d8cb13d72123af824156bd771e6a`. Built from TASK07 rigging-prep commit `6ebeb1604d8800c22c6bd1833700b17006b1d6e1`. This is a functional test rig, **not production-approved**, and no GLB/export/integration or Episode01 work is included.

## Skeleton and body controls

One armature, `S02_RIG_V1`, with 20 FK bones:

```text
root
└─ pelvis
   ├─ spine → chest → neck → head
   │          ├─ clavicle.L → upperArm.L → forearm.L → hand.L
   │          └─ clavicle.R → upperArm.R → forearm.R → hand.R
   ├─ thigh.L → shin.L → foot.L
   └─ thigh.R → shin.R → foot.R
```

Actual rest positions/matrices/parent names are in `bindings.json`, derived from the real TASK07 landmarks. No generic humanoid mesh or auto-rig was introduced. Mesh origins, proportions and approved rest geometry stay unchanged. Existing static prep containers and hidden landmarks are retained as organization, not active controls.

Select `S02_RIG_V1` in the Outliner and enter Pose Mode. Use bone rotation for head/shoulders/elbows/wrists/hands/hips/knees/feet and root translation/rotation for actor placement. `spine`/`chest` control torso lean. Wrist/hand and foot bones also expose location for small FK offsets. This is **not IK**: large independent foot offsets can separate shoe/trouser contacts; place feet primarily through the leg chain/root. No foot locking or joint-limit constraint is claimed.

The embedded text `S02_RIG_CONTROLS.py` provides reproducible examples. In Blender's Python console:

```python
exec(bpy.data.texts['S02_RIG_CONTROLS.py'].as_string())
reset_rig()
pose('elbow_bent')
expression('senang')
reset_rig()
```

Available static test poses: `neutral`, `head_left`, `head_right`, `arm_raised`, `elbow_bent`, `torso_lean`, `seated`, `mouse_reach`, `root_test`. Labels for head tests correspond to the helper yaw signs (+25/-25 degrees); source L/R labels are retained. No keyframes/clips are created by these helpers. Source file is saved in neutral with all facial controls zero.

## Controlled weights

Every vertex is assigned explicitly by component policy; **no Blender automatic heat weights** or whole-character merge. The weights are deterministic regional rules, not a claim of hand-painted finished weights:

- Head, ears, all hair and face details: one head-bone influence.
- Hands/thumbs/creases: one hand-bone influence; no independent fingers/grasp rig.
- Shoes/soles/tongues/collars: one foot-bone influence.
- Sleeves: upperArm/forearm transition around actual elbow, limited clavicle contribution at shoulder cap.
- Cuffs/ribs: rigid forearm. Shoulder seams follow sleeve rule.
- Torso/hem/pouch: pelvis/spine/chest interpolation by original surface height.
- Hood/collar/cords/lime tips: rigid chest; no cloth simulation.
- Neck: neck/head blend. Trousers: pelvis/thigh/shin transition; hem folds primarily shin.

Linear blend skinning is used; no dual-quaternion-only behavior. Armature modifier precedes existing bevel/weighted normals. Actual weights normalize to 1; maximum observed influences is 2 (allowed maximum 4), no unweighted/invalid vertex. Detail: `skin-weight-validation.json` and per-mesh policy in `bindings.json`.

## Facial controls

In Object Mode select the armature and use its **Custom Properties**. Fourteen implemented scalar controls:

| Control | Range | Actual behavior |
| --- | --- | --- |
| blink, blinkL, blinkR | 0..1 | Global/per-eye closure; higher closure wins. Whites/glints move behind face while pupil flattens into a dark voxel eye line. No zero-scale singularity. |
| eyeDirectionX, eyeDirectionZ | -1..1 | Head-local pupil/glint translation; each direction clamped to 80% of available white margin. Blink suppresses gaze. |
| eyeSquint, eyeWide | 0..1 | Conservative common eye-region morph; suppressed by blink. |
| browRaise | -1..1 | Original brow moves up/down. |
| browTiltL, browTiltR | -1..1 | Original brow tilt, no anatomy changes. |
| mouthSmile, mouthOpenSmall, mouthThought | 0..1 | Existing eight-vertex line morphs to a small trapezoid smile, voxel open-mouth shape, or restrained thought line. Competing weights normalized. |
| mouthOffsetX | -1..1 | Subtle lateral offset, no speech/viseme claim. |

Forty-seven relative morphs driven by standard Blender single-property expressions operate on nine original face meshes. Basis coordinates and original vertex/face counts are exactly unchanged. No teeth, tongue, realistic eyelids or replacement face were added. The existing upper skin eyelid strip remains unchanged; the blink is implemented through whites/pupil/glint morphs.

`expression('neutral'|'senang'|'kaget'|'mikir'|'semangat')` sets the tested endpoints in `rig_controls.py`. These are implemented v1 performance endpoints, not a new approval of their artistic quality. Happy and enthusiastic endpoints are deliberately close; review mobile thumbnails before approving acting use.

## Neutral preservation and export gate

All 110 original raw meshes, matrices, topology, material slots and morph Basis coordinates match approved source exactly; no topology cleanup was needed. Evaluated neutral skin result differs by floating-point LBS precision, maximum world vertex distance ~1.26e-6 units. RGB comparison is **not pixel-identical**: measured differences and an amplified diagnostic are retained. Materials/light/world/color management are unchanged.

Bone TRS and morph weights are suitable concepts for future glTF, but this file is not declared export-ready. Blender drivers must be baked/resolved to channels; bevel/normal/morph topology needs stabilization on an export duplicate, followed by glTF/Three.js tests. No GLB/GLTF has been exported. Do not enable Episode01 or edit its Remotion code on the basis of this rig alone.
