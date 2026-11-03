# Life as a Graphic Designer — source recovery

This branch preserves the successful original EP01 source and the in-progress EP01 V2 source from the Codex workspace. The `main` and `preview/episode01` branches are not modified.

## Projects

- **life-as-graphic-designer-ep01/**: complete original Remotion project, articulated pixel character, original audio, fonts, SFX/music, package lockfile and scripts.
- **life-as-graphic-designer-ep01-v2/**: original-derived V2 with the SAME original character and editorial design, latest VO, updated narration/timing/pose cues, preview scripts and final-export approval guard.
- **life-as-graphic-designer-ep01-v2-three-preflight/**: earlier experimental 3D diagnostic retained for history. It is not the visual basis of V2.
- **.devcontainer/ep01-v2/**: repository-level Codespaces configuration selecting the V2 directory.
- **recovery/checkpoint/v2/**: completed comparison images and analysis reports copied out of ignored runtime output folders.

## Run the original

```bash
cd life-as-graphic-designer-ep01
npm ci
npm run typecheck
npm run dev -- --no-open
```

## Resume V2

```bash
cd life-as-graphic-designer-ep01-v2
npm ci
npm run check:identity
npm run typecheck
npm run dev -- --no-open
```

The new recording is `life-as-graphic-designer-ep01-v2/public/audio/ep01-voiceover.mp3`: **58.04408163265306 seconds**, SHA-256 `953087f1dde04b02af2bc1e3e157d05f6609ac437ecee6f4e721b0718b424518`. It is distinct from the old 64-second recording retained for original recovery.

The V2 composition has 1778 frames at 30 FPS, including ending padding. Three original/V2 comparison pairs were rendered and reviewed; all 16 protected original visual files remain byte-identical. The cloud disconnected during preview rendering, so a completed V2 preview is NOT claimed by this backup. No new rendering was performed for this rescue.

Restore completed checkpoint files if needed, from the repository root:

```bash
mkdir -p life-as-graphic-designer-ep01-v2/out
cp -R recovery/checkpoint/v2/. life-as-graphic-designer-ep01-v2/out/
```

Then inspect existing progress and render **only the 540 × 960 evaluation preview** when resuming. A final 1080 × 1920 render requires explicit approval of the completed preview and remains guarded. Do not treat this recovery commit as approval to export the final video.

## Reproducibility and exclusions

Node 22+ and Chromium/FFmpeg are required; pinned npm lockfiles and devcontainer setup are included. Font licenses are included. Normal rendering needs no API key. Optional ASR model downloads and Python analysis tools are separate from normal rendering; timing/analysis data already produced is preserved here.

`RECOVERY_MANIFEST.json` records SHA-256 and size for every recovered file. Dependency folders, caches, secret/credential files, local compressed duplicate backups and temporary video renders are excluded. Original source remains untouched in the workspace, including the existing recoverable local archive.
