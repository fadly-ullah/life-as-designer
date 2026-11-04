# Life as a Graphic Designer — EP05

**Revisi Lagi? Serius Nih?!** · @fadly_hisbullah

Feature branch `feature/ep05-client-revisions`, based on working EP04 source commit `6027c8e9a3a3dd0813b081234e57d9fca88eac29`. Original EP01 is the authoritative character reference. All previous episode projects are preserved; this extends the actual EP04 poster, character, typography and editorial system.

## Codespaces

Choose **Life as a Graphic Designer EP05** (`.devcontainer/ep05/devcontainer.json`). Existing Codespace:

```sh
cd life-as-graphic-designer-ep05
npm ci
python3 -m venv .venv-tools
.venv-tools/bin/pip install -r scripts/requirements-tools.txt
npm run dev -- --no-open
```

Forward **3009** for Remotion Studio; open `LifeAsGraphicDesignerEP05`. Six scene compositions use the same components as the main timeline. No Blender, paid assets, new voice generation, API key or external AI service is required for rendering.

```sh
npm run typecheck
npm run check:identity
npm run visual:check
# Inspect PNGs; record a current review as described in docs/PRODUCTION.md.
npm run render:preview
npm run verify:preview
npm run preview:video
```

Regular MP4 player: port **3010**, with byte-range seek/download. Output **`out/ep05-full-preview.mp4`**: 540×960, 30fps, H.264 baseline/yuv420p, AAC stereo 48kHz, faststart. Concurrency is **2** in config and CLI. Use `RENDER_CONCURRENCY=1` if necessary. Do not run multiple render jobs together.

**Final 1080×1920 export is blocked until explicit user approval of the complete evaluation preview.**

## Uploaded narration

The supplied recording is WAV, not MP3. Its original bytes are preserved as `public/audio/ep05-voiceover.wav` and this lossless master is used by the composition and timing analysis. `public/audio/ep05-voiceover.mp3` is a high-quality compatibility derivative for the requested filename; it is not played alongside or instead of the master.

- Actual master duration: **53.090958 seconds**, mono PCM16 at 24kHz.
- WAV SHA256: `f6303678c27cf098e27147846cb2a2f2c0e28d8ddb7235a625ce8fac7c81ff61`.
- `ceil(53.090958 × 30) = 1593` voice frames + 87 ending frames = **1680 frames / 56 seconds**. Narration is neither stretched nor trimmed to force 60 seconds.
- 28 phrase captions in `src/subtitles/captions.json`, using local ASR and measured speech/pause boundaries. Scene cuts and reactions follow `episode05Timings.ts`, `performance.json` and `alignment.json`. No word/phoneme lip-sync accuracy is claimed.
- Source VO, native transcript, pause evidence and focused ASR retries are retained. Spelling for design vocabulary is corrected against the approved narration.

## Identity and story systems

`check:identity` verifies **421 protected previous-episode files**, plus original local character, expressions, palette, CSS, font and animation helpers. The source SVG rig is byte-identical to EP01. Emotional scheduling uses its existing actions, continuous blinking/breathing clock and speech RMS cues.

The almost-kick is a clearly labeled, brief imagination cut. `imagination.css` rotates the rig's existing right-leg/trouser/shoe geometry together around the hip; no path drawing, anatomy, face, clothing or color is replaced. The foot stops short of a poster; no person is targeted and reality immediately returns.

`RevisionPoster.tsx` reuses the EP04 artwork and live SVG text. Imagined clutter stays inside its artwork and is labeled before returning to the untouched real design. Actual revisions enlarge the 50% figure, increase figure/background contrast using the same palette, and move/group the CTA. Temporary information fading prevents elements crossing over each other during repositioning. The before/after keeps the same title, copy and design identity.

Original chat bubbles are reused for feedback, clarification, explanation, approval and deadline. The client is reasonable; the designer clarifies ambiguous feedback and makes a specific improvement. The last message and clock introduce **EP06: DEADLINE TINGGAL 1 JAM!** without a spoken CTA.

Music is original 84 BPM procedural lo-fi with speech ducking and comic stops. SFX are original series DSP assets. See `docs/AUDIO-LICENSES.md` and `docs/PRODUCTION.md`.
