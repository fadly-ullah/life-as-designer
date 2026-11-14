# Rigging plan — identity locked, rig not built

The user approved polished Model04 at `aff455385918d8cb13d72123af824156bd771e6a` in TASK07. This locks visual identity only. Full rigging and GLB export still need explicit approval. No bones, weights, constraints, morph targets, actions or animation have been created in this task.

## Recommended approach

Use one small FK-first skeleton with a hybrid attachment strategy: rigid head/hair/hands/shoes, limited smooth deformation on torso/sleeves/trousers, and separate head-attached facial transform/morph nodes. Preserve the approved arms-down neutral as the bind-pose visual authority; do not remodel into a generic T-pose. Blender authoring IK may be added later if approved, but bake its result into glTF joint TRS tracks; no Blender constraint is assumed to work in Three.js.

Do not merge all voxel components or automatically weight the entire model. The approved head uses overlapping layers deliberately; blending every hair patch across neck weights would change its identity. No topology cleanup was necessary for neutral hierarchy preparation, so none was performed.

## Region plan

| Region | Future binding/deformation | Required check after full-rig approval |
| --- | --- | --- |
| Root/pelvis | Root translation/yaw, pelvis under root. One export skeleton. | Ground/contact anchors and neutral world matrix exact. |
| Torso | Pelvis → spine → chest; modest 2–3-bone weights if needed. | Hem/chest preserve block planes; no ballooning or waist collapse. |
| Neck/head | Chest → neck → head. Skull, ears, all hair and blush rigidly follow head. | Hair/hood separation through head turns; do not flex hair foundation. |
| Arms | Chest → clavicle.L/R → upperArm → forearm → hand; manual sleeve weights. | Shoulder clearance, elbow volume and sleeve seams in raised/bent arms. |
| Hands | Rigid palm/crease to hand; optional separate thumb hinge after grasp scope agreed. | Approved palm/thumb shape retained; current model has no five independent fingers, so detailed finger typing is not available. Do not invent fingers now. |
| Legs | Pelvis → thigh → shin → foot; manual trouser weights. | Knee bend, hip/hem intersection, no cross-leg weighting. |
| Feet | Shoe upper, sole, tongue and collar rigid to foot; optional toe/foot-roll later. | Shoe is not rubber-skinned; heel/toe contact stays stable. |
| Hoodie | Torso to pelvis/spine/chest; sleeves to arm chain; cuffs/ribs primarily forearm/hand vicinity with matching seam weights. | Sleeve/cuff/hand overlap, hem at hips, arm-to-body clipping, no gaps between ribs and cuffs. |
| Hood/collar | Small neck/chest blend only if required; back hood mainly chest. | Keep approved hood shape, avoid dragging hood with head/hair. |
| Pouch/drawstrings/tips | Pouch follows same torso/chest deformation as attachment surface. Cords/tips use rigid or short weighted segments; no cloth sim initially. | No sliding pouch, detached strings or tip gaps during leaning/breathing. |
| Face | Head-attached unskinned feature nodes/morph meshes; original neutral Basis retained. | Blink/gaze/smile endpoints reviewed against approved expression sheet; face-to-skin depth remains visible without z-fighting. |

Suggested core skeleton (proposed names only, not existing bindings): `root`, `pelvis`, `spine`, `chest`, `neck`, `head`; paired `clavicle`, `upperArm`, `forearm`, `hand`, `thigh`, `shin`, `foot` = 20 core nodes. Two thumb bones and two toe nodes are optional, subject to scope. Four normalized influences per vertex maximum; rigid pieces use one. Do not silently add a complex generic human rig.

## What the prep file contains

Twelve `PREP_GROUP_*` empty containers arrange head/face/hair, torso, arms/hands and legs/feet under the retained character root. Containers have identity local transforms and **are not pivots or controls**. Mesh data and world transforms are unchanged. Nineteen hidden `PREP_LANDMARK_*` empties mark measured candidate shoulders/elbows/wrists/hips/knees/ankles/head/chest/feet/toes. They have no children/constraints and drive nothing. Candidate positions are not validated joint axes or an auto-rig result.

`hierarchy-bindings.json` maps every actual mesh name to an organizational region and future policy. `actualBoneBinding` is null everywhere. Do not animate these organizational groups as if they were a finished rig. All approved mesh origins remain at the root; changing origins is unnecessary for skeleton skinning and would require careful inverse-transform handling for future rigid attachments.

## Deformation and topology work deferred

Sleeves have six 12-vertex rings (72 verts each); trousers have 40 verts each. These are candidates for low-cost manual skinning, not proof of bend readiness. Inspect edge orientation and silhouette under trial elbows/knees before adding any loops. Use duplicate technical mesh data and compare the neutral surface after every change; preserve locked file as rollback.

There are 210 raw n-gons across closed component caps, plus bevel/weighted-normal modifiers. Triangulation and normal treatment must be stabilized on a later export duplicate before skinning/morph authoring. Do not apply topology-changing modifiers after creating morph targets. If minimal retopology/extra loops are necessary, retain the same neutral surface, verify renders and document the change. Do not weld intentional hair/cloth overlaps to make a single manifold shell.

## Gates and future acceptance tests — not run now

1. Obtain explicit full-rig approval, including scope for expression target authoring.
2. Confirm candidate axes and bind neutral; build minimal skeleton and limited hand controls.
3. Manual weights, seam continuity and rigid attachment checks; no unweighted verts or unnormalized/excess influences.
4. Trial shoulder lifts, elbow/knee bends, head turns, hip lean, foot contact and small breath. Inspect hood/hair, crotch, armpits, sleeve/cuff and shoe/trouser contacts.
5. Facial targets and gaze/blink tests, neutral reset and frame-independent evaluation.
6. Obtain GLB export approval; export only on a duplicate and validate round trip/Three.js parity.
7. Separate approval for animation/episode production. TASK07 does not authorize Episode01.
