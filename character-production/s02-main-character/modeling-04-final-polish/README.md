# TASK 06 — Model04 final identity polish

**UNAPPROVED. Identity is NOT locked. User approval is required before identity lock or any rigging.**

Directly loads existing Model04 editable source at commit `8a108a6a75420e11d9f1e603e3295188c7c5d9c5`. New branch: `feature/s02-character-model04-final-polish`. All output is isolated here; Model01/02/03/04 remain untouched rollback references.

## Deliverables

- `source/s02-character-model04-final-polish.blend`: editable polish, original component hierarchy/materials, no rig/animation.
- `evaluation/front.png`, `side.png`, `three-quarter.png`, `back.png`: four sequential Blender renders.
- `evaluation/model04-reference/`: byte-identical copies of original Model04 evaluation PNGs, read-only baseline.
- `evaluation/approved-vs-polished-model04.png`, `model04-vs-polished-model04.png`: four-view original-image comparisons.
- `evaluation/hair-eyes-hoodie-closeups.png`: concept/Model04/polish detail rows for side/back hair, eyes and hoodie.
- `evaluation/comparisons.pdf`: all three sheets.
- `docs/technical-validation.json`: exact locked-mesh, material/light/camera and dimensions checks, topology audit.
- `docs/locked-objects.json`: SHA256 fingerprints and equality for each original mesh outside authorized edits.
- `docs/changed-geometry.json`: explicit 14 added relief objects, 33 modified mesh objects, unchanged list, before/after geometry/modifiers/material slots.
- `docs/render-manifest.json`: fixed Model04 camera evidence and baseline-image hashes.
- `docs/preservation-check.json`: original Blender/PNG source hashes and unchanged tracked-file verification.
- `docs/REVIEW.md`: likeness findings and new/remaining visual mismatches.

## Minimal corrections only

1. **Hair side/back relief:** inset outward planes of four existing side panels and three rear panels by .018 Blender units. Add shallow angular overlays with varied widths/heights/depths (eight side, six rear), intersecting the retained base panels to maintain continuity. All additions stay within the original outer hair bounding envelope. Front fringe, upper front layer, foundation, crown and all non-authorized hair objects are unchanged. No rounded/subdivided geometry. Original hair materials reused without changes. This is local surface layering, not a replacement hairstyle or new cap.
2. **Eyes:** widen whites/pupils/glints/upper lids by 22% and heighten 15% around each original white center. Keep centers and spacing unchanged. Reference front shows relatively wider eyes; increasing width reduces the oversized apparent inner gap without moving the eyes. Original brow, jaw, mouth, nose, ears and blush are unchanged.
3. **Sleeves/cuffs:** expand existing 12-vertex ring cross-sections by 4–9% in X and 5–9% in Y, with greater gain toward shoulder. Ring centers and all sleeve Z positions stay fixed. Cuffs expand 6% in width and 7% in depth with height/center unchanged; ribs follow the same mapping. Shoulder seam moves forward .008 to follow expanded fabric. Bevels remain one-segment and small. No hand or torso repositioning.

**Locked:** character height, head height/width, torso geometry, ankle-to-hem length, trousers, shoes, hands, front hair, original brow/jaw/mouth/blush/nose, hood/collar, pouch, strings/eyelets, lime tips, all materials, lighting and evaluation camera. Local sleeve/cuff cross-section width is the sole authorized garment envelope change; no global body scaling, new limb length, new body spacing or new proportions.

## Rendering and comparisons

Cycles CPU, 48 samples, 2 threads, 640×800, no denoising. Four final polish views render sequentially. Exact camera transforms and ortho scale are read from Model04's render manifest. Baseline frames are copied byte-for-byte instead of needlessly rerendering unchanged Model04. Color management, world and lighting equality are validated. Same pixel crops for baseline/polish preserve relative geometry changes. Concept images are cropped/uniformly resized only, without recoloring or stretching. Concept lighting differs; no color edits are justified from that alone. Low-sample noise remains.

Scripts: `polish_model04.py` (build only), `render_evaluation.py` (four frames), `validate_polish.py` (reopen/audit), `make_comparisons.py` (Pillow composition). Run Blender scripts with `blender -b -t 2 --python ...`. Pillow and DejaVu Sans are required for sheet layout. Not benchmarked on actual MacBook Air M1.

Stop at evaluation. No rig, facial rig, animation, GLB/GLTF, episode rendering, merge to main, approval claim or identity lock.
