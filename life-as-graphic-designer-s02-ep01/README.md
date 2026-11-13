# S02 EP01 — Jangan Salahin Algoritma Dulu!

Status: **preparation only / character asset gate blocked**.

The approved image in the user message is the visual authority, not a rigged 3D model. No approved model or Character Production Pack was found in any of the 18 named remote branches inspected. Existing Season 02 prototype is an SVG performer; it is not accepted as the new 3D character. No character substitute was created.

## Run

```sh
npm ci
npm run typecheck
npm run check:assets # expected exit 2 until actual approved assets arrive
npm run dev
npm run visual:environment
```

Studio: http://localhost:3016/WorkspaceEnvironmentCheck . This is a 3D environment scaffold, not an episode preview. `LifeAsDesignerS02EP01` deliberately throws an asset-lock error. Unlock only after inspecting and validating the supplied approved model; changing a boolean alone is not an approval workflow.

## Available work

- True 3D desk, chair, monitor, keyboard, mouse, phone, lamp, room, shadows, perspective camera and frame-based dolly.
- Fictional monitor texture with compressed 01/05/10/15-second playback concept and diagnostic timeline; no proprietary UI copied.
- Six provisional story cues and rig-control binding contract; no assumed bone names.
- Exact user WAV preserved: 45.170958 seconds, mono PCM 24kHz. No speech speed change. WAV is used directly to avoid needless transcoding. Narration has not yet been transcribed/aligned or mixed.

## Missing input for production

Supply the approved Season 02 GLB/GLTF plus external textures if needed, the Character Production Pack, and its approval/provenance. Model should have connected limbs, animation hierarchy, recognizable face/hair/cream hoodie/charcoal trousers/olive shoes, and working face controls (bones or morph targets). A still design sheet alone does not provide these. No Blender workflow has been started.

After receipt: inspect mesh/hierarchy/materials and expressions, bind controls, validate identity against original source and concept, align actual recorded speech, implement performance and interactions, inspect six representative scene frames, then render one 540×960 H.264/AAC evaluation preview with concurrency <=2. Final 1080 export stays blocked pending review.
