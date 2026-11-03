# Life as a Graphic Designer — EP03

**Warna Bagus, Desain Berantakan!** · @fadly_hisbullah

Production branch: `feature/ep03-color-story`, based on verified EP02 commit `b19236ec8ea1410621d38c8afbd4a6a9569df83a`. Original EP01 and V2 recovery branch is preserved. The original articulated SVG character is reused byte for byte; no new character or 3D model.

## Codespaces

Select the repository's **Life as a Graphic Designer EP03** configuration (`.devcontainer/ep03/devcontainer.json`). It installs Chromium, FFmpeg, Node dependencies and Python verification tools.

For an existing Codespace:

```sh
cd life-as-graphic-designer-ep03
npm ci
python3 -m venv .venv-tools
.venv-tools/bin/pip install -r scripts/requirements-tools.txt
npm run dev -- --no-open
```

Forward port **3005**, open `LifeAsGraphicDesignerEP03` in Remotion Studio. Eight connected scene compositions expose the same scene components used by the main timeline. No API key, paid service, Blender or runtime asset download is required.

## Production commands

```sh
npm run typecheck
npm run check:identity
npm run visual:check
# Inspect PNGs and record the visual review as described in docs/PRODUCTION.md.
npm run render:preview
npm run verify:preview
npm run preview:video
```

The regular MP4 player is on port **3006**, supporting seek/range requests and download. Preview output is `out/ep03-full-preview.mp4`: **540×960, 30fps, H.264 baseline/yuv420p, AAC stereo 48kHz, faststart**. All preview rendering uses `--concurrency=2`; config also sets concurrency 2. Set `RENDER_CONCURRENCY=1` if memory is constrained. Do not run multiple render jobs together.

Final 1080×1920 movie export is blocked pending explicit approval of the full evaluation preview.

## Narration and identity

- Supplied EP03 VO installed unchanged at `public/audio/ep03-voiceover.mp3`, FFprobe **54.282438 seconds**. SHA256 `c3be1d84fdfa95b6cb18c21c8432eede9db83a321e42fb0467c236c94d878d82`.
- `ceil(54.282438 × 30) = 1629` audio frames, plus 111 frames of natural visual ending = **1740 frames / 58 seconds**. The complete audio is played at speed 1 with original pitch.
- `scripts/inspect-voice.py` derives metadata and speech RMS from the actual asset. New VO requires fresh transcription/cue review, not automatic reuse of old timings.
- 26 phrase subtitles in `src/subtitles/captions.json`; `src/data/alignment.json` documents native Whisper-small phrase timing and measured silence boundaries. Storyboard estimates are not used as final timings. No word or phoneme lip-sync accuracy is claimed.
- `src/data/episode03Timings.ts` controls scene cuts and story events. `src/data/performance.json` schedules the unchanged original rig; measured speech RMS gates its speaking animation.
- `check:identity` verifies 219 protected EP01/V2/EP02 files plus the original local character, expressions, colors, stylesheet, font and animation helpers. EP02 continuity informs the chosen sketch and poster workspace.
- Graphic tokens remain cream `#F7F5EC`, charcoal `#0B0C0A`, lime `#B4CE43`, with original olive. `colors.ts` is unchanged so character colors remain identical. The five conflicting example colors are clipped inside the fictional poster artwork.
- The original Space Grotesk configuration remains intact. Great Vibes (SIL OFL, bundled) is used exclusively for the deliberately wrong font selection inside the fictional design tool/poster.

Music is an original offline 82 BPM lo-fi composition. SFX use procedural synthesis and original series audio. Mixing follows story beats and ducks under narration. See `docs/AUDIO-LICENSES.md` and `docs/PRODUCTION.md`.
