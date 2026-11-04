# Life as a Graphic Designer — EP06

**Deadline Tinggal 1 Jam!** · @fadly_hisbullah

Development branch: `feature/ep06-deadline-crisis`, continued from verified EP05 commit `c1752ca6d1f1bf6d766f036464e4e7d9fac5a530`. This standalone production directory extends the real EP05 project. The original EP01 SVG rig, colors, fonts, editorial components and animation utilities remain the identity reference. Previous projects are not modified.

## Codespaces

Choose **Life as a Graphic Designer EP06** (`.devcontainer/ep06/devcontainer.json`). From an existing Codespace:

```sh
cd life-as-graphic-designer-ep06
npm ci
python3 -m venv .venv-tools
.venv-tools/bin/pip install -r scripts/requirements-tools.txt
npm run dev -- --no-open
```

Forward **3011** for Remotion Studio and select `LifeAsGraphicDesignerEP06`. The six scenes also have individual connected composition registrations. Chromium, FFmpeg and Python are installed by the devcontainer setup. Rendering needs no Blender, paid assets, API key, voice generation or online transcription service.

```sh
npm run typecheck
npm run check:identity
npm run visual:check
# Inspect the current PNGs and record review.json; see docs/PRODUCTION.md.
npm run render:preview
npm run verify:preview
npm run preview:video
# In a second terminal while the MP4 player is running:
npm run verify:player
npm run contact:sheets
```

The regular MP4 player uses port **3012**, supports byte-range seeking and downloads. Evaluation output: **`out/ep06-full-preview.mp4`**, 540×960, 30fps, H.264 baseline/yuv420p, AAC stereo 48kHz, faststart. Both configuration and CLI cap render concurrency at **2**. If resources require it, use `RENDER_CONCURRENCY=1`; do not run render jobs together.

**Do not render a 1080×1920 movie until the user explicitly approves the complete evaluation preview.** The final-render script deliberately blocks that export.

## Actual uploaded voice

The attachment is WAV. Original bytes are retained at `public/audio/ep06-voiceover.wav`, which is the sole narration played by the composition. `public/audio/ep06-voiceover.mp3` is a compatibility derivative for the requested asset path, without speech time/pitch changes. It does not play alongside the master.

- FFprobe duration: **56.610958 seconds**, PCM16 mono, 24kHz.
- Master SHA256: `9851ec7d6e87a5520b6c86676b88f5250c619176e7d1d303ce52dcc2d332b05b`.
- `ceil(56.610958 × 30) = 1699` voice frames + 71 ending frames = **1770 frames / 59 seconds**. No dialogue is trimmed or stretched to force 60 seconds.
- **33 phrase captions** are editable in `src/subtitles/captions.json`. Local multilingual Whisper native phrase timestamps, focused retries and measured speech/pause boundaries supply the timing. Recognition spelling errors are corrected against the approved script; evidence is retained in `src/data/`.
- Major story cuts and performance cues live in `episode06Timings.ts`, `performance.json` and `alignment.json`. Simple speaking-mouth behavior uses the real waveform. No phoneme-accurate lip-sync or word timing is claimed.

## Story and continuity

The existing EP05 final poster is reused byte-for-byte through `RevisionPoster.tsx` with its completed size, contrast and CTA parameters. It remains the same 3:4 promotional artwork throughout the freeze, recovery, checks and upload. The fictional poster's export dimensions are **1080×1440**; the episode video is 9:16. The finalization sequence changes selection, spacing-check overlays and export status, without redesigning the approved poster.

The six scenes are: frozen application, unsaved changes, Auto Recovery, final sprint, file sent, and next morning. `DesignApplication.tsx` simulates all states with deterministic frame-driven rendering. It does not hang the browser, throw a deliberate error or display a real system dialog. The recovery is one fictional incident, not a promise about real applications.

Nighttime uses a desk-lamp accent, restrained monitor illumination and the story clock while keeping the cream editorial background. The clock starts at **22:00**, then emphasizes the **23:00** deadline with a qualitative progress bar. Successful delivery reads **< 23:00**, and the next scene reads **ESOK PAGI**. No exact delivery minute, unstated numeric countdown or morning hour is invented; no system wall clock is used.

The morning notification remains unopened and the client decision is never shown. The story ends with **EP07: AKHIRNYA DESAIN DITERIMA?**, without an extra spoken CTA.

`check:identity` protects **531 previous-episode files**, plus the original local character, expressions, palette, CSS, helpers and font assets. The emotional scheduler changes actions of the existing articulated SVG, without altering facial geometry, hair, clothing, proportions or colors.

Music is an original 96 BPM code-generated instrumental, with narration ducking and panic/recovery/sprint/morning dynamics. Error/startup/loading/recovery cues are original DSP; other SFX reuse the original series assets. Recorded breaths are not duplicated. See `docs/AUDIO-LICENSES.md` and `docs/PRODUCTION.md`.
