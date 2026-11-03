# Life as a Graphic Designer — EP02

**Cari Inspirasi, Malah Overthinking!** · @fadly_hisbullah

Source continuation of `recovery/ep01-original-v2-2026-11-03`, commit `3c31073c8a7c83065eaf0bbb794ea3b75d63a95f`. The two EP01 projects are preserved. No paid services, keys, Blender, external fonts or runtime asset downloads are required.

## Run in Codespaces

Choose the repository's **Life as a Graphic Designer EP02** Codespaces configuration (`.devcontainer/ep02/devcontainer.json`) (or install Node 22+, Chromium, FFmpeg and Python 3 in an existing Codespace).

```sh
cd life-as-graphic-designer-ep02
npm ci
python3 -m venv .venv-tools
.venv-tools/bin/pip install -r scripts/requirements-tools.txt
npm run dev -- --no-open
```

Forward port **3003** and open the `LifeAsGraphicDesignerEP02` composition in Remotion Studio. The eight scene compositions use the same components as the full timeline.

```sh
npm run typecheck
npm run check:identity
npm run visual:check
# Inspect out/visual-check/*.png, then record review as documented in docs/PRODUCTION.md.
npm run render:preview
.venv-tools/bin/python scripts/verify-preview.py
```

Preview output: **`out/ep02-full-preview.mp4`**, 540×960, 30fps, H.264 baseline/yuv420p, AAC stereo 48kHz, faststart. All rendering is capped at **2 workers** (`Config.setConcurrency(2)` and `--concurrency=2`). Use `RENDER_CONCURRENCY=1 npm run render:preview` for constrained machines. Final 1080×1920 movie export is deliberately blocked until the user approves the full evaluation preview.

## Source and timing

- Original SVG character rig, expressions, `colors.ts`, CSS, font and animation helpers are byte-identical to EP01. Run `check:identity` for all 133 protected EP01/V2 files.
- Editorial components retain original dimensions, typography and spacing. `episodeColors.ts` applies requested EP02 cream/charcoal/lime graphic tokens; the character keeps its original skin, hair, hoodie and shoe colors.
- The supplied EP02 MP3 is installed unchanged at `public/audio/ep02-voiceover.mp3`: FFprobe **51.487313 seconds**, SHA256 `49c45681d5391565da3061e8a9c42ce6c755510efb40883cd09595243baf0368`.
- `ceil(51.487313 × 30) = 1545` voice frames plus 105 frames of animated EP03 ending = **1650 frames / 55 seconds**. No voice trim, pitch shift, stretching or replacement.
- Editable narration/scene cues: `src/subtitles/captions.json`, `src/data/episode02Timings.ts`, `src/data/performance.json`. Subtitles use 36 phrase cues, maximum two lines. Native Whisper-small phrase timestamps and waveform boundaries were used; spelling checked against the approved script. No forced word alignment or phoneme lip-sync is claimed.
- `Episode02Character.tsx` schedules the original rig's supported actions. Mouth animation uses actual speech RMS cues; geometry is never replaced.
- Eight scenes move between blank canvas, scrolling/saving references, a 30-minute reaction, competing layout/font options, closing the browser, three keywords/sketches, selecting a direction and an intentionally overloaded green/yellow promo poster.

Music and SFX are original procedural audio, reused from the series or synthesized for EP02. Their provenance is in `docs/AUDIO-LICENSES.md`. Music ducks under speech, stops at comic beats and rises gently during the ending. Preview mastering measures and normalizes the actual mix to −16 LUFS / −1.5dBTP.

See `docs/PRODUCTION.md` for validation and approval boundaries. Dependencies, tools venv, caches, temporary renders and credentials are excluded from Git.
