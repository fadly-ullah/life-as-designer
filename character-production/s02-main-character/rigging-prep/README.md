# TASK07 — Season02 identity lock & rigging preparation

**Visual identity LOCKED by user. Rigging/export NOT approved; no rig built.**

Approved base: `feature/s02-character-model04-final-polish` at `aff455385918d8cb13d72123af824156bd771e6a`. New working branch: `feature/s02-character-rigging-prep`.

## Deliverables

- `source/s02-character-rigging-prep.blend` — editable, non-destructive static prep copy; 110 original character meshes preserved, 12 regional identity-transform containers, 19 hidden unbound joint candidate landmarks. No bones/weights/constraints/shape keys/actions.
- `docs/RIGGING_READINESS.md` and `rigging-readiness.json` — technical audit, necessary organization, actual blockers and limits.
- `docs/IDENTITY_PRESERVATION.md`, `identity-preservation.json`, `identity-lock.json`, `source-preservation.json` — scoped user approval and exact raw/evaluated/source-file proof.
- `docs/RIGGING_PLAN.md`, `hierarchy-bindings.json` — region-by-region skeleton/garment/attachment plan and actual mesh names; all future bone bindings null.
- `docs/ANIMATION_CONTROLS.md`, `animation-controls.json` — neutral, senang, kaget, mikir, semangat, blink, gaze, subtle mouth and supporting body controls. Recommendations only, not implemented performance endpoints.
- `docs/EXPORT_STRATEGY.md` — hybrid FK/rigid/skin/morph approach, deterministic Remotion/Three.js evaluation and later glTF parity gates.
- `evaluation/neutral-three-quarter.png`, `identity-preservation-comparison.png`, `docs/neutral-render-verification.json` — one static character verification render, RGB pixel-identical to approved source.

## Use and limits

The prep file is **not a working rig**. `PREP_GROUP_*` empties are not pivots/controls; `PREP_LANDMARK_*` empties are hidden, measured candidates and move nothing. Keep the existing approved neutral. Do not auto-weight all hair/face/clothing or use global object origins as joint pivots. No welding or topology changes were needed for this organizational step.

The neutral audit passes, but no skeleton/bind matrices, weights, expression targets, deformation poses or export round trip exist yet. Full rigging and GLB export require explicit user approval. Episode01 stays blocked and untouched. No animation production or merge to main.

## Reproduce verification

Run from the repository with Blender 4.3.2 available:

1. `blender -b -t 2 --python character-production/s02-main-character/rigging-prep/scripts/prepare_character.py`
2. `blender -b -t 2 --python character-production/s02-main-character/rigging-prep/scripts/audit_validate.py`
3. `blender -b -t 2 --python character-production/s02-main-character/rigging-prep/scripts/verify_neutral_render.py`
4. `python character-production/s02-main-character/rigging-prep/scripts/write_control_plan.py`
5. `python character-production/s02-main-character/rigging-prep/scripts/verify_delivery.py`

Python verification/layout requires Pillow and DejaVu Sans. Audit helpers are read from the preserved Model04 script; the approved base and earlier source directories must remain available. Render is one lightweight neutral frame (Cycles CPU, 2 threads, 48 samples, no denoising), not an episode or animated pose test. No actual MacBook Air M1 benchmark is claimed.
