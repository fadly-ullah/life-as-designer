# Season 02 / Model 03 — identity refinement

Awaiting user visual review. NOT approved for rigging or production.

Based on branch `feature/s02-character-model-revision-02`, commit `2f6a28a0ae70eda0901646bbcf6ba1e450f15d26`, directly opening its saved Model 02 Blender source. No Model 01/02 or Season 01 files modified.

## Deliverables

- `source/s02-character-modeling-03.blend`: editable meshes, original materials and lighting; saved with three-quarter camera.
- `evaluation/front.png`, `side.png`, `three-quarter.png`, `back.png`: sequential Blender Cycles CPU renders.
- `evaluation/approved-vs-model03.png`: approved original PNG turnaround crops vs Model 03.
- `evaluation/model02-vs-model03.png`: Model 02 vs Model 03.
- `evaluation/comparisons.pdf`: both sheets.
- `docs/technical-validation.json`: reopen, material-node equivalence, topology and dimensions audit.
- `docs/geometry-material-changes.json`: every added, removed, modified and unchanged mesh object.
- `docs/REVIEW.md`: identity evaluation, remaining mismatches and limits.
- `scripts/refine_model03.py`: deterministic direct Model 02 refinement; builds and renders Model 03 only.
- `scripts/make_comparisons.py`: original image crop composition using Pillow.
- `scripts/validate_model03.py`: read-only Blender inspection, writes validation report only.

## Controlled geometry changes

1. Replace four swept fringe/crown strips with three angular stepped strips; replace twelve repeated rear tiles with three broad stepped layers. Retain hair foundation, sideburns, temple and remaining crown pieces. Hair stays in the existing dark material family. Raise fringe lower boundary after front-view inspection to keep thick eyebrows visible.
2. Scale eyes/pupils/glints/upper lids vertically to 83% around existing eye line, without changing width. Widen lower jaw planes locally up to 4.5%; reduce jaw bevel to one segment.
3. Lower front rim/lips into shallow V. Compress rear hood projection to 77% about y=.16 and height to 85% about top. Replace trapezoid pouch and its seams with near-rectangular pouch and short opening stitches. Retain original cords, lime tips and cuffs.
4. Shorten leg region by .10 Blender units using a continuous vertical mapping from ankle to hem; translate torso/head intact. Widen trouser legs 4% about each centerline, and reduce depth at knee by up to 12%. No head rescaling.
5. Lower front shoe upper/toe panel by up to 15% above z=.126. Remove two decorative toe stitches; increase existing outsole thickness 10% to narrow the upper/sole gap. Retain original upper, outsole, tongue and collar objects and materials.

All body meshes participating in the vertical mapping are explicitly listed as modified in the JSON report, including translated cuffs/cords. Mesh additions are local component replacements, not a new character construction. Materials: **zero created, removed, recolored or reassigned**.

## Lightweight rendering

Blender 4.3.2; Cycles CPU, 48 samples, two threads, 640×800, one view at a time. Denoising is disabled because this Blender build lacks OpenImageDenoise support. Some noise remains. These settings are deliberately small; runtime/memory on an actual MacBook Air M1 has not been measured. Camera angles follow Model 02 and frame the revised full height. No new lights or grading.

No armature, facial rig, animation, GLB/GLTF export or episode production. User approval is required before any rigging. No merge to main.
