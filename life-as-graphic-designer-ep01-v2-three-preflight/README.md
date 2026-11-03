# Life as a Graphic Designer — Episode 01 V2

**Status: development environment prepared; V2 narrative implementation is blocked by missing `docs/`.**

The requested storyboard, expression, camera, SFX and subtitle documents are absent from the available workspace and both remote branches of `fadly-ullah/life-as-designer`. The remote `main` contains only README; `preview/episode01` contains the earlier MP4 preview and README. No V2 story or timing has been inferred or claimed to match unseen documents.

The independent prerequisites are implemented here: exact compatible Remotion/Three.js dependencies, a runnable `ThreeCanvas` preflight composition, an unchanged copy of the available `public/audio/` assets, measured voice metadata, software WebGL rendering configuration and Codespaces setup.

## Run locally / in the prepared cloud workspace

```bash
npm ci
npm run check:environment
npm run audio:inspect
npm run typecheck
npm run dev -- --no-open
```

Studio uses port 3001 and composition **EnginePreflight3D**. This is a real 3D engine diagnostic, **not the requested completed episode**. No final Episode 01 V2 composition is registered while the production documents are missing.

## Codespaces

Open this project directory using its `.devcontainer/devcontainer.json`. The devcontainer uses Microsoft's Node 22 Bookworm image, installs Chromium/FFmpeg if absent, performs a frozen npm install, measures the audio and checks TypeScript. After setup, run `npm run dev -- --no-open`, then **Ports → 3001 → Open in Browser**. A localhost URL from the cloud executor cannot be opened directly on another device without forwarding.

When this project is nested in the current repository, the repository-level selector `.devcontainer/ep01-v2/devcontainer.json` sets the workspace folder to this project. Choose **Life as a Graphic Designer EP01 V2** when creating/rebuilding its Codespace. If the V2 project is used as the repository root, its own `.devcontainer` is discovered directly. This V2 directory has not been pushed to GitHub; the prior upload permission covered the V1 MP4 preview.

## Useful validation

```bash
npm run smoke:3d
```

This renders three different frames at 1080 × 1920 and a 30-frame H.264 engine diagnostic using ThreeCanvas and software ANGLE/SwiftShader (`swangle`). It can fail for WebGL initialization, scene compilation, missing assets or rendering failures. Results are saved under `out/`. This is distinct from a final episode render or an actual live GitHub Codespace test.

Completed checks in the managed cloud environment: frozen setup script, TypeScript, original audio measurement, Studio loading, three WebGL stills and 30-frame H.264 diagnostic all passed. The rendering check passed under both **Node 24.19.0** and the Codespaces-targeted **Node 22.23.4**. The pinned devcontainer image's OCI index was confirmed in Microsoft's registry. A live Codespace or container build was not started, and this does not validate the absent V2 storyboard.

All Three.js motion is driven by `useCurrentFrame()`; `useFrame()` and wall-clock animation loops are not used. The current 3D test does not represent a final art-direction decision.

## Original voice and remaining work

`public/audio/episode01-vo.mp3` is byte-identical to the available original recording. `npm run audio:inspect` decodes the complete MP3 and stores exact sample count, duration and SHA-256 in `src/data/audioMetadata.json`. Duration: **64.20897959183674 seconds**, 2,831,616 samples at 44,100 Hz; `Math.ceil(duration * 30)` gives **1927 voice frames**. `VoiceMaster` preserves speed/pitch and applies no trim.

The available original procedural SFX/music and font assets are retained for later selection. Read all user-specified production documents before selecting V2 scene boundaries, camera moves, poses, sound cues, subtitles and ending padding. No final V2 MP4 or subtitle synchronization is claimed yet.
