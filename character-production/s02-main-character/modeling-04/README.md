# Season 02 / Model 04 — silhouette & identity correction

**UNAPPROVED. Stop at evaluation renders. User review required before any rigging.**

Directly based on saved Model03 source at commit `50e9b4ad13eb88d729d74732666c72d4a4ba6d88`, branch `feature/s02-character-model-revision-03`. Approved PNG remains the first reference. All existing Model01/02/03, Season01 and other source files remain unchanged.

## Delivery

- `source/s02-character-modeling-04.blend`: editable component meshes, original materials, lights and common Model03 camera framing.
- `evaluation/front.png`, `side.png`, `three-quarter.png`, `back.png`: Model04 renders.
- `evaluation/model03-matched/`: four baseline Model03 renders generated read-only from original Model03 under identical cameras/settings; original Model03 render files untouched.
- `evaluation/approved-vs-model04.png`, `model03-vs-model04.png`, `face-hair-comparison.png`: original-image comparison sheets.
- `evaluation/comparisons.pdf`: three sheets in one PDF.
- `docs/technical-validation.json`: palette, lighting, camera, face-feature shape, dimensions and individual-mesh topology audit.
- `docs/changed-geometry.json`: explicit added/removed/modified/unchanged object lists and before/after coordinates, faces, modifiers and material slots for every changed mesh.
- `docs/render-manifest.json`: exact matched camera locations/rotations/scale and render settings.
- `docs/REVIEW.md`: four-view findings, remaining mismatches and new trade-offs.

## Controlled changes

- **Hair:** locally replace two front strips and ten separated temple/side/rear-side locks with two connected angular fringe layers and four irregular stepped side panels. Retain foundation, crown, back layers, sideburns and low/nape pieces. Widen all hair X by 10%, keep height and dark material family. Small one-segment bevels, no subdivision or smoothing into clay.
- **Head:** widen skull X by 12%; lower jaw widens locally by an additional maximum 2.5%, with .005 single-segment bevel. Preserve each eye/brow/blush/mouth/nose mesh shape and dimensions; translate feature centers laterally by 8%, move ears outward with head. No replacement face.
- **Hoodie:** widen torso/hem 13% and depth 4%; sleeves/cuffs X 9%, depth 5%; move hands outward .055 without reshaping them. Widen pouch 10% and move forward .012. Lower side/back collar and retain front folded lips; replace closed front ring with a capped U band open at the front. Reposition upper cords/eyelets down .09, retain lime tips. Hood is widened 10% and vertically compacted 10% around z=2.70. Angular low-segment bevels.
- **Proportions:** shorten only ankle-to-hem span by .09 Blender units; translate upper body rigidly. Widen trousers/hem folds 5%, align shoes outward .0121. No vertical head scaling. Crown/chin range is measured after changes, not used to stretch geometry to a numeric target.
- **Shoes:** lower forefoot upper/toe panel height by up to 12% above .126; reduce outsole thickness 15% around ground plane. Seat the retained upper/ankle/tongue assembly down .014 to keep contact with the thinner sole; retain foot length. Original olive/lime material nodes unchanged.
- **Materials:** none created, removed, recolored or reassigned for retained meshes. New local components reuse the original material datablocks. Exact material/node comparison against Model03 is reported separately from subjective appearance under concept lighting.

## Equivalent rendering

Blender 4.3.2, Cycles CPU, 48 samples, 2 threads, 640×800, denoising disabled (this build lacks OpenImageDenoise). Eight final frames render sequentially. Both models use Model03's original target, orthographic scale and camera angles; all original lights, world and color management are retained. No per-model auto-framing. Identical image windows in the Model03/04 sheet preserve the size change; concept crops use only uniform resizing, without recolor or stretching. Noise remains at this lightweight setting. Not benchmarked on an actual MacBook Air M1.

Build: `blender -b -t 2 --python scripts/refine_model04.py`.
Render: `blender -b -t 2 --python scripts/render_evaluation.py`.
Validate: `blender -b -t 2 --python scripts/validate_model04.py`.
Compose: `python scripts/make_comparisons.py` (Pillow + DejaVu Sans font required).

No rig, facial rig, animation, GLB/GLTF, episode work or merge to main. Separate overlapping components remain; manifold per-object checks do not certify a single watertight/deformation-ready mesh.
