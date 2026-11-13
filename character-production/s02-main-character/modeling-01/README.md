# Season 02 — character modeling evaluation 01

**Unapproved shape study. Unrigged. Do not use for Episode 01 production.**

Created in Blender 4.3.2 from the approved design sheet in the conversation, with original Season 01 identity source inspected read-only. See `docs/REFERENCE-AND-SCOPE.md` for the reference observations and approval boundary.

- Editable scene: `source/s02-character-modeling-01.blend`
- Reproducible modeling/material/light source: `scripts/build_character.py`
- Evaluation images: `evaluation/`
- Review notes and measurements: `docs/`

Open the `.blend` to inspect real mesh geometry and materials. Character and studio are separate collections. Parent object explicitly records the unapproved/unrigged status. Materials use the supplied palette, translated from sRGB to Blender linear color.

Rebuild only this isolated scene:

```sh
blender -b -t 2 --python scripts/build_character.py -- front side three-quarter
```

Re-render saved geometry without rebuilding:

```sh
blender -b source/s02-character-modeling-01.blend -t 2 --python scripts/render_views.py -- front side three-quarter
```

Render processes run sequentially with two CPU threads. The installed Blender build has no OpenImageDenoise, so Cycles renders are rendered without denoising. No paid APIs are used. The evaluation PNGs are permanent review deliverables; transient logs, caches, `.blend1` backups and early renders are excluded from Git.

The cloth micro-bump is procedural Blender shading. After shape approval, its export treatment must be baked or intentionally simplified for glTF/Three.js; no claim of current glTF material parity is made.

**Next gate:** user reviews front, side and three-quarter shape and gives corrections or approval. Only after shape approval: refine deformation topology, build head/limb/face rig, export GLB/GLTF and validate it in Three.js. No claim is made that the current static model is ready for animation.
