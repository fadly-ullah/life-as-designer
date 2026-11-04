# EP07 evaluation preview validation

Status: **ready for user review**. The complete 68-second Season 01 Finale preview has been created and tested. No 1080×1920 final movie has been rendered; that export requires explicit user approval.

Tested implementation: `e580a1839471d112a8b6a527016fedcff7fad213` on `feature/ep07-season-finale`. Subsequent validation-documentation commits do not change the rendered source/media. Fixed evaluation artifacts are published separately on `preview/episode07`, under `previews/episode07/`.

## Source identity and continuity

Original EP01 articulated SVG geometry, expressions, colors, typography, CSS and animation helpers pass SHA256 verification. The three reused poster implementations are byte-locked to EP06. All **649 protected previous-episode project files** remain unchanged. TypeScript and identity checks passed.

All six previous projects and real preview renders were available. The montage uses **six genuine animated excerpts**, cropped at native 30fps, without audio streams. `public/montage/provenance.json` records source project/branch, original render SHA256, in-point, duration, crop and bundled clip SHA256. No earlier episode footage or character was invented. The clips are committed production assets, so runtime does not depend on ignored sibling out/ files.

The exact final EP06 poster is reused with `enlarge=1`, `contrast=1`, `cta=1`. The same 50% offer, title, cream/charcoal/lime/olive design, CTA and 3:4 proportions remain throughout. The design-evolution sequence calls the existing color/type/revision components, rather than replacing the artwork with a new poster.

## Actual audio and captions

The supplied MP3 is **65.410563 seconds**, mono at 44.1kHz, preserved byte-identical at `public/audio/ep07-voiceover.mp3`. SHA256: `bf3d0990c7776f9a068c3d1da77eb8b62977f8fd3cfc2f65afdf46b1dadb382c`. It is the sole narration. No sentence is trimmed, voice replaced, pitch altered or tempo increased to force 60 seconds.

`ceil(65.410563 × 30) + 77 = 2040` frames: **68 seconds** with natural closing padding. The conceptual one-minute target is exceeded to retain intelligibility and the entire finale/Season 02 CTA.

**38 phrase captions** use local multilingual ASR native phrase timestamps, focused retries and measured pauses. Recognition corrections are documented in `alignment.json`. Main-character speaking-mouth motion follows actual RMS intervals. No word/phoneme precision is claimed; archive mouth movements remain their original performances under off-screen recap narration.

Decoded master/output audio correlation:

| Window | Offset | Correlation |
| --- | --- | --- |
| 0.3–8s | 0.0ms | 0.96597 |
| 29–40s | 0.0ms | 0.99874 |
| 57.3–65.1s | 0.0ms | 0.9976 |

Actual loudness: **-16.1 LUFS**, true peak **-1.8 dBTP**, decoded sample peak **-1.87 dBFS**. No clipping was detected. Original procedural finale music and SFX use narration ducking, silence at the approval reaction, a rhythmic montage, quiet reflection and restrained closing lift.

## Visual and story validation

Nineteen checkpoint PNGs were inspected against original EP01. They include all seven requested story moments, each of the six flashbacks, the approval message/disbelief, original brief, targeted-feedback lesson and final hold. The EP01 archive in-point was corrected to **3.55 seconds** so the actual HARUS WOW moment and original surprised character are clear; the current set was re-rendered and the correction inspected. The encoded preview then exposed overly compressed color/font beats; equal phrase thirds and a shorter font crossfade corrected their readability, with two extra intermediate checkpoints.

Approval content appears only at its actual spoken cue. Nervous reading, disbelief, joy, reflection and completion use supported original rig actions. No confetti overload, replacement avatar, new face geometry or unsupported wave was added. Reflection cards are readable and the final poster remains unobscured during its hero reveal.

The Season 01 completion uses the original editorial brand. All three Season 02 options stay neutral; none is automatically selected. The invitation to comment and Season 02 farewell are exactly the recorded lines, without an additional CTA.

The actual encoded video was sampled at **38 seek points** across beginning, middle, archive cuts and ending. Chromium then played the full **68 seconds at normal speed**, ended normally with **0 dropped frames** and no player errors. Browser autoplay uses mute; decoded audio, correlation and loudness were checked separately.

Full FFmpeg decode passed. All **2040 frames** are present, no black intervals were detected, and all assets load. Format: **540×960**, 30fps, H.264/yuv420p, AAC stereo 48kHz, faststart.

Output: `out/ep07-full-preview.mp4` (4,894,598 bytes).

SHA256: `3c895c65db001088566684a59df17df27ce5a2c9e27282e7298e3419bf1098dc`.

## Reproduction

From the EP07 directory:

```sh
npm run dev -- --no-open
# Studio: port 3013 / LifeAsGraphicDesignerEP07
npm run typecheck
npm run check:identity
npm run visual:check
# Inspect PNGs and record current review.json per docs/PRODUCTION.md.
npm run render:preview
npm run verify:preview
npm run preview:video
# Another terminal while the player runs on port 3014:
npm run verify:player
npm run contact:sheets
```

Render concurrency is capped at 2, with fallback 1 if resources require it. Source excludes dependencies, caches, secrets and temporary renders; fixed review artifacts are published separately. The actual remote source/preview commits and hashes are independently checked after upload.

No blocking technical issue remains in these checks. Creative evaluation and explicit approval of the complete preview remain with the user. **No full-resolution export has been produced.**
