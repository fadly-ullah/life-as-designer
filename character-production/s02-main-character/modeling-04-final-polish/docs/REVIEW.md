# TASK 06 / Model04 final identity polish review

**UNAPPROVED / IDENTITY NOT LOCKED.** “Final polish” names this task/directory; it does not mean approved for identity lock, rigging, export or episode production.

Read and used: original approved PNG, saved Model04 Blender source, Model04 README, build/technical/visual reports and four original evaluation renders. Base commit: `8a108a6a75420e11d9f1e603e3295188c7c5d9c5`. Model04 is retained untouched as rollback reference.

## Eye comparison and conservative correction

The approved neutral front has visibly wider eye whites and stronger eye-to-face presence than Model04. Model04's inner white-to-white gap looks exaggerated because the whites are small; the center spacing itself is recognizable. Width and height are not inferred from the expressive hero pose.

Polish therefore scales the existing whites/pupils/glints/upper lids as one assembly about each original white center: X ×1.22, Z ×1.15, Y unchanged. No center/spacing shift. Width gains reduce apparent gap relative to each eye; the smaller height gain avoids returning to the vertically elongated expression of older iterations. Brows, blush, jaw, nose and mouth remain exactly unchanged. No new eye shape or expression rig is introduced. The result is closer in visual presence but not an exact traced match to the low-resolution approved eye art.

## Four-view identity check

| View | Status | Finding |
| --- | --- | --- |
| Front | PARTIAL | Original fringe/head/jaw/outfit proportions retained. Larger eyes restore stronger neutral expression; sleeve/cuff volume grows locally. Concept eyes remain somewhat larger/broader in relation to face, and its sleeve stepping remains more pronounced. |
| Side | PARTIAL | Shallow staggered side relief breaks broad flat panels without changing overall hair envelope. Outline stays locked to Model04; original wide base panel/ear coverage and knee contour are still visible. |
| Three-quarter | PARTIAL | Existing front-to-side hair identity remains, side relief and larger eyes are easier to read. Shoulder sleeve cross-section is slightly fuller, with no arm centerline or length changes. Not an exact concept layer rhythm. |
| Back | PARTIAL | Rear cap has varied stepped relief rather than one uninterrupted flat plane. Foundation and original perimeter remain, so broad planes persist between shallow layers. No identical grid of repeated blocks introduced. |

## Feature retention

| Aspect | Status | Evidence |
| --- | --- | --- |
| Same character/outfit | MATCH for retained identity | Original editable Model04 directly modified; no new character, new skull, replacement body or hair foundation. |
| Front hair, crown and jaw identity | MATCH to Model04 | Locked original geometry/modifier fingerprints match exactly. Added side/back detail remains within old bounding envelope. |
| Hair to concept | PARTIAL | Layered black voxel identity retained; back/side surface rhythm improved, still differs from concept silhouettes/details. |
| Eyes to concept | PARTIAL | Greater apparent size, unchanged spacing; conservative local scaling rather than replacement face. |
| Brows/mouth/blush/nose/ears | MATCH to Model04 | Exact mesh/modifier equality. |
| Hoodie volume | PARTIAL to concept | Shoulder/sleeve cross-section and cuff width/depth increase locally. Torso, hood/collar, cords, pouch and lime accents are unchanged. |
| Locked proportions/trousers/shoes | MATCH to Model04 | Height 4.0649999, head height 1.1545000, approximately 3.521 heads; torso/skull widths and ankle-to-hem length unchanged. Exact original lower-body meshes match. |
| Material palette | MATCH to Model04 | All node inputs/links and retained object material slots checked equal. No new or recolored material. |
| Exact concept pixel color appearance | UNVERIFIED | Concept has different cinematic lighting. Matching evaluation lights establish no material drift between Model04 and polish, not exact appearance under concept lighting. |

## New/remaining visual mismatches disclosed

1. Shallow hair layers can read as thin plates laid over a broad base, especially on the back. The flatter foundation is deliberately retained to keep mass and silhouette; this is a controlled relief improvement, not complete removal of all flat planes.
2. Enlarged whites/glints may make the neutral face read slightly more youthful/open than Model04. Shape language and center spacing are retained; user review must determine whether that expression is acceptable.
3. Fuller cuffs make the hands appear relatively smaller even though the hands are unchanged. Cross-section width/depth is the authorized volume change; cuff height, centers and hand positions remain fixed.
4. Collar fold, trouser knee bend and overall leg impression remain exactly as Model04. They were intentionally not corrected because they are outside this task's edit scope.
5. Low-sample render noise and differences between concept camera/lighting and orthographic evaluation limit exact silhouette/color judgments. No retouching hides these differences.

## Technical result

- 14 new shallow relief meshes; 33 existing meshes modified; no original mesh removed.
- 64 original mesh objects outside authorized edit groups are exactly unchanged, including modifiers/transforms/material slots.
- Hair bounding envelope identical; summed closed-component volume increases ~1.04%. This sum includes overlaps, not exact Boolean-union hair volume.
- Sleeve ring centers/Z positions and cuff height/center retained. Garment width across cuffs increases from ~1.73964 to ~1.76325 (about 1.36%) through authorized local cuff volume; torso and skeletal/body spacing unchanged.
- Material, world/light/color-management and camera checks pass. Baseline PNGs are byte-identical copies of Model04, with matching fixed camera transforms for the four polish views.
- No non-manifold edges or degenerate faces per object; no armatures/actions. These checks do not certify a unified watertight deformation mesh or exhaustive collision/self-intersection freedom.

Stop after these comparisons/validation. No identity lock, approval claim, rigging, animation, GLB/GLTF, Episode01 render or merge to main. The next production gate requires explicit user approval.
