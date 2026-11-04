# Life as a Graphic Designer — EP04

**Gara-gara Font, Desain Jadi Aneh!** · @fadly_hisbullah

Feature branch: `feature/ep04-typography-story`, based on verified EP03 commit `2725e02f9c0a3c2e26bf07713171fd442c767d49`. Original EP01 rig, expressions, proportions, skin/hair/clothing colors, stylesheet, font and animation helpers are preserved byte for byte. No character redesign or 3D humanoid.

## Codespaces

Choose the repository's **Life as a Graphic Designer EP04** configuration (`.devcontainer/ep04/devcontainer.json`). It installs Chromium, FFmpeg, Node dependencies and Python verification tools. Existing Codespace:

```sh
cd life-as-graphic-designer-ep04
npm ci
python3 -m venv .venv-tools
.venv-tools/bin/pip install -r scripts/requirements-tools.txt
npm run dev -- --no-open
```

Forward port **3007** and open `LifeAsGraphicDesignerEP04`. Six connected scene compositions use the same components as the main timeline. No external AI/API key, paid assets, Blender or runtime font download is required.

## Production commands

```sh
npm run typecheck
npm run check:identity
npm run visual:check
# Inspect the PNGs; record a review as described in docs/PRODUCTION.md.
npm run render:preview
npm run verify:preview
npm run preview:video
```

The regular MP4 player uses port **3008**, supporting seek/download and byte-range requests. Preview output: **`out/ep04-full-preview.mp4`**, 540×960, 30fps, H.264 baseline/yuv420p, AAC stereo 48kHz, faststart. `Config.setConcurrency(2)` and the render command's `--concurrency=2` are both configured. Use `RENDER_CONCURRENCY=1` if memory is constrained; never run multiple render jobs together.

**Final 1080×1920 export remains blocked until explicit user approval of the complete evaluation preview.**

## Narration and synchronization

- User-supplied edited nasal VO: `public/audio/ep04-voiceover.mp3`, original bytes. SHA256 `f171a82acf07b780bc2d6b12d245071e5a5d38e8f1bf903513a7214dbacddd13`.
- FFprobe container duration **59.424 seconds**; decoded audio **59.381 seconds**. The small difference is MP3 delay/padding. The recording is not trimmed, stretched, pitch-shifted, regenerated or given another nasal filter.
- `ceil(59.424 × 30) = 1783` source frames plus 47 ending frames = **1830 frames / 61 seconds**, allowing the complete ending rather than cutting speech to hit 60 seconds.
- 30 editable Indonesian phrase captions: `src/subtitles/captions.json`. Timing comes from native Whisper-small ASR matched to measured speech/pause boundaries, not equal scene lengths or storyboard estimates. No word/phoneme lip-sync accuracy is claimed.
- `src/data/episode04Timings.ts`, `performance.json` and `alignment.json` document narrative cuts, acting and recorded speech regions. The original rig runs on one continuous clock for breathing/blinking; selected speaking moments use actual RMS cues.

## Typography and character

The same EP03 promotional poster keeps its charcoal/cream/lime colors, artwork and copy. `TypographyPoster.tsx` changes live text layers rather than replacing the poster image. Bad choices use Great Vibes, Archivo Black and Libre Baskerville; correction progressively unifies Space Grotesk, then improves weight, size, spacing and alignment. Additional fonts are confined to the fictional artwork. Editorial headings, controls and subtitles retain original Space Grotesk.

Mild-cold acting uses tiny whole-character posture changes and a small tissue prop on the original desk. The protected SVG geometry is unchanged. No red face, excessive coughing, extra sniffle or duplicate recorded breath effect is added.

`check:identity` verifies **317 protected files** across EP01/V2/EP02/EP03. Music is a new original 80 BPM lo-fi bed; SFX use original series/procedural audio. Speech ducking and comic pauses keep VO dominant. See `docs/AUDIO-LICENSES.md` and `docs/PRODUCTION.md`.
