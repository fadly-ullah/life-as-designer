# TASK08 — Season02 controlled rig v1

**Functional test rig. Identity locked; rig production quality NOT approved. No GLB/Three.js/Episode01 integration.**

Base: `feature/s02-character-rigging-prep` at `6ebeb1604d8800c22c6bd1833700b17006b1d6e1`. Locked polished identity: `aff455385918d8cb13d72123af824156bd771e6a`. Working branch: `feature/s02-character-rig-v1`.

## Deliverables

- `source/s02-character-rig-v1.blend`: neutral editable rig, one 20-bone FK skeleton, explicit normalized weights, 14 facial custom properties and 47 driven relative morphs. No new character mesh/topology/materials.
- `docs/RIG_GUIDE.md`: actual control paths, hierarchy, weighting policies and usage. Embedded `S02_RIG_CONTROLS.py` supports reset, expression presets and static test poses.
- `docs/facial-and-body-controls.json`: implemented properties, presets and exact bone/driver paths.
- `docs/bindings.json`: actual bone parents/rest matrices, per-mesh weight policy, shape keys/drivers and scalar controls.
- `docs/skin-weight-validation.json`, `identity-validation.json`, `pose-validation.json`: numeric checks and pose/morph evidence.
- `docs/REMAINING_ISSUES.md`: partial/failed deformation, expression/mobile limitations and deferred export blockers.
- `evaluation/body-pose-sheet.png`, `contact-issues-sheet.png`: required body poses plus exposing side views.
- `evaluation/expression-sheet.png`, `blink-gaze-sheet.png`, `mobile-expression-check.png`: all five expressions, blink open/closed and four gaze limits; thumbnail check is for head-shot framing.
- `evaluation/neutral-identity-comparison.png`, `identity/neutral-difference-x16.png`, `docs/neutral-render-comparison.json`: locked vs rig neutral with quantitative nonzero pixel differences disclosed.
- `evaluation/evaluation-sheets.pdf`: six evaluation sheets.
- Individual actual render PNGs under `evaluation/body/` and `evaluation/expressions/`.
- `docs/source-preservation.json`, `delivery-sha256.json`: prior-source and delivery fingerprints.

## Reproduce

Use Blender 4.3.2 and the preserved repository source hierarchy:

1. `blender -b -t 2 --python .../rig-v1/scripts/build_rig.py`
2. `blender -b -t 2 --python .../rig-v1/scripts/evaluate_render.py`
3. `blender -b -t 2 --python .../rig-v1/scripts/validate_identity.py`
4. `blender -b -t 2 --python .../rig-v1/scripts/extra_contact_views.py`
5. `python .../rig-v1/scripts/make_sheets.py` (Pillow + DejaVu Sans)
6. `python .../rig-v1/scripts/verify_delivery.py`

Renders are sequential Cycles CPU with two threads, denoising off: neutral identity 640×800/48 samples; body/facial tests 480×600/32 samples. Face tests intentionally use a fixed head close-up; hair outer edges can be cropped, while body/identity frames show the entire character. No actual MacBook Air M1 benchmark is claimed.

No bones were created in old prep files, no locked source/Season01/Remotion code changed. No automatic heat weighting, whole-character merge, animation clip, GLB/GLTF export or Episode01 animation. Explicit user approval remains required for export and Three.js integration; remaining cloth issues should be resolved before any production-ready claim.
