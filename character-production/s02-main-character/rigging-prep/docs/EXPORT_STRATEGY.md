# Proposed export and Remotion / Three.js strategy — NOT executed

## Observed repository pipeline

Read-only inspection of `life-as-graphic-designer-s02-ep01/package.json`, `src/characters/rig-contract.ts`, `src/compositions/Episode01.tsx` and `scripts/check-assets.mjs` found Remotion **4.0.540**, React Three Fiber **9.8.2**, Three.js **0.187.0** and React 19.2.0. The rig contract declares logical controls and requires actual bone/expression bindings after asset inspection. It does not supply a skeleton. Episode01 deliberately throws `CHARACTER_ASSET_LOCK`; the asset audit is also blocked. Those production files are unchanged.

An approved static character now exists, but a validated rigged GLB/production pack still does not. The new identity-lock record is not a reason to flip an old `approvedCharacter` boolean or remove the episode gate. Bone names below and controls in `animation-controls.json` are recommendations with null implementation bindings.

## Safest asset approach after approvals

- A single character GLB with one FK export skeleton, skin weights for flexible cloth/body regions, one-bone rigid weights for hard pieces, and head-attached feature nodes with morph targets for expressions. GLB is a future delivery format, not generated now.
- Bake Blender-only IK, constraints and drivers to explicit joint/node translation/rotation/scale and morph-weight tracks. Runtime does not implement Blender rig logic. Avoid cloth/hair physics and procedural shape changes in the initial asset.
- Keep 21 original material datablocks/nodes as authoring truth. The current flat-color materials have no mesh UV layers; UV absence is not itself a blocker for untextured glTF PBR. Do not bake a texture atlas or alter brand colors merely to lower draw calls before a parity test.
- Audit modifiers on an export duplicate. Prepare triangulation/bevel/normal output **before** authoring stable morph topology; then preserve identical vertex count/order across morphs. Do not enable a topology-changing export modifier pass after morph creation. Validate original neutral silhouette/normals first.
- Current evaluated mesh cost is 12,684 triangles across 110 components. Primitive/material count can be a larger runtime cost than triangles. Start with fidelity and measure; later merge only compatible same-material rigid subsets on a disposable export copy after identity and face-node tests. Never merge flexible garments blindly into hair/head.
- Export the character skeleton/meshes/required face nodes only. Exclude camera, lights, evaluation floor, `PREP_GROUP_*` containers if redundant, and all `PREP_LANDMARK_*` markers. They are not animation controllers. Keep neutral morph weights zero.

## Units, axes, normals and color

The locked file uses Blender Z-up and metric scale length 1.0; character height is **4.0649999 Blender units**. That is the measured stylized asset size, not an assumed 1.7 m human. Do not rescale mesh data or alter proportions in prep. Declare asset units and agree the scene's desired world height later. If needed, one uniform placement-container scale can fit the environment without changing geometry ratios.

Use the glTF exporter's single Z-up → Y-up conversion and verify facing/handedness in Three.js. Do not apply a second hard-coded 90° rotation. Avoid negative/nonuniform rig scale. Retain flat/weighted normals; inspect hard voxel edges, backface orientation, transparent/depth layers and z-fighting. glTF will triangulate: round-trip checks are required for the 210 raw n-gons and evaluated modifier result.

Use glTF linear/sRGB conventions for PBR base colors and renderer output. Blender AgX and a Three.js tone-mapping setup are not identical; run a controlled neutral-light comparison before adjusting renderer exposure/tone mapping. Do not recolor the approved material palette to compensate for a renderer mismatch. Audit which original Blender shader-node settings map to glTF; unsupported nodes cannot be assumed to export unchanged.

## Deterministic Remotion playback

1. Load once with Three.js `GLTFLoader` and wait for asset readiness through the application's Remotion render gating. Do not reveal a placeholder substitute character while loading.
2. Use an isolated skeleton-safe clone (`SkeletonUtils.clone`) per performer/instance if assets are cached. Do not mutate a shared cached skeleton/material or persist state across frames/compositions.
3. Obtain time from `useCurrentFrame()` / `useVideoConfig().fps`. Evaluate FK transforms, gaze/blink and morph weights from neutral plus explicit controls at that absolute time. Never use wall-clock time, unseeded randomness or accumulated `useFrame(delta)` for offline video.
4. If clips are used, initialize actions and their weights consistently and evaluate an `AnimationMixer` with absolute `setTime(frame / fps)`; reset driven channels to known neutral before layering deterministic overrides. Test seeking/backward/random frame order, not only forward playback.
5. Resolve every binding against inspected exported node/joint/morph names. Record GLB hash, approved source commit, control-contract version and validated bindings. Extend the current logical contract only in a later authorized integration task; do not assume the proposed bone names already exist.
6. Suggested future clips are short reusable neutral/gesture clips, not Episode01 shot animations. No clips have been authored here.

## Export acceptance checklist — deferred

After separate full-rig and GLB-export approvals: verify bind-pose and expression-zero parity, joints/inverse bind matrices, normalized ≤4 weights, correct hard-piece attachments, morph count/order, neutral gaze/blink limits, material/normal parity, bounding/facing/units, and absence of prep/stage nodes. Run glTF validation plus Blender reimport and a Three.js neutral/pose harness. Inspect expressions and cloth contact in representative poses. Verify the same frame renders identically after arbitrary seeking/chunking, and dispose instance resources safely.

No export, loader integration, clip, app-code change, Episode01 scene production or episode render is included in TASK07. Keep the existing episode gate in place.
