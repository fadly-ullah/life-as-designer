# EP06 evaluation preview validation

Status: **ready for user review**. The complete preview has been created and tested. The final 1080×1920 export has not been rendered and remains blocked until explicit user approval.

Tested implementation commit: `c94fe61d52dbb6a063f60ae073a59bc166536eab` on `feature/ep06-deadline-crisis`. Later validation-documentation commits do not change rendered source or media. Fixed review artifacts are published separately on `preview/episode06`, under `previews/episode06/`.

## Identity and source preservation

The original EP01 articulated SVG rig, expressions, colors, CSS, animation helpers and fonts pass SHA256 checks. All **531 protected previous-episode files** remain unchanged. EP01/V2 and EP02–EP05 projects are preserved. The final EP05 poster and its 3:4 aspect remain consistent through freeze, recovery, final checks, export and upload.

TypeScript and identity checks passed. Thirteen current PNG checkpoints were inspected against original EP01. Two initial layout issues were corrected: the unsaved-change headline wrapped into the monitor, and repeated-click text entered the monitor gutter. Both were re-rendered and inspected after correction.

## Narration and captions

The sole master is the uploaded **56.610958-second** PCM16 mono 24kHz WAV, byte-identical at `public/audio/ep06-voiceover.wav`. Its SHA256 is `9851ec7d6e87a5520b6c86676b88f5250c619176e7d1d303ce52dcc2d332b05b`. The expected MP3 path contains a compatibility derivative; the composition plays the original WAV once. No speech is substituted, trimmed, stretched or pitch shifted.

Timeline: `ceil(56.610958 × 30) + 71 = 1770` frames, or **59 seconds**. The complete ending is retained with natural teaser padding.

There are **33 phrase subtitle cues**, using multilingual local ASR phrase timestamps, focused retries and measured pauses. Recognition spelling errors are documented in `src/data/alignment.json`. Subtitles and speaking-mouth behavior do not claim phoneme/word precision. Beginning, middle and final phrases were checked in source timing data and actual encoded samples.

Decoded output/master correlation:

| Window | Offset | Correlation |
| --- | --- | --- |
| 0.3–7s | 0.0ms | 0.96544 |
| 23–30s | 0.0ms | 0.98796 |
| 49–56.4s | 0.0ms | 0.98348 |

The measured mix is **-16.1 LUFS**, **-1.0 dBTP** true peak, **-1.56 dBFS** decoded sample peak. No clipping was detected. The original procedural instrumental and DSP SFX are automated beneath the narration; recorded breaths are not duplicated.

## Story and visual checks

The frozen application is a deterministic fictional interface: cursor and loading indicator stop while character acting and clock progression continue. No real runtime error, deadlock or browser freeze is introduced. Auto Recovery opens the same poster; it is a fictional story event rather than a general data-recovery guarantee.

The opening clock reads **22:00**, the deadline reads **23:00**, delivery reads **< 23:00**, and the morning reads **ESOK PAGI**. Qualitative progress indicates urgency; no exact delivery minute, unstated numeric countdown or morning hour is invented. Morning lighting changes stay local to the desk/monitor accents; the cream editorial background remains.

Finalization checks information, 50% discount, spacing, 1080×1440 poster dimensions and PNG export. Upload reaches 100% at the recorded “TERKIRIM”. The next-morning client message is unopened. The EP07 teaser asks whether the design is accepted, without revealing a decision or adding speech.

The actual encoded MP4 was inspected at **33 seek points** across the entire timeline. A full **59-second** normal-speed Chromium playback ended normally, with **0 dropped frames** and no player errors. Browser autoplay used mute; audio was checked separately through full decode, correlation and loudness analysis.

Full FFmpeg decode passed. All **1770 frames** are present, with no black intervals detected. Format: **540×960**, **30fps**, H.264/yuv420p, AAC stereo 48kHz, faststart.

Output: `out/ep06-full-preview.mp4` (3,313,326 bytes).

SHA256: `3a0bdc8b0e77b031b4543c891b8dfbf70ee2f03bbb56112bc1366f14a0cb7caf`.

## Reproduction

From the EP06 project:

```sh
npm run dev -- --no-open
# Studio: port 3011, LifeAsGraphicDesignerEP06
npm run typecheck
npm run check:identity
npm run visual:check
# Inspect current PNGs and record review.json per docs/PRODUCTION.md.
npm run render:preview
npm run verify:preview
npm run preview:video
# In another terminal while the MP4 player runs on port 3012:
npm run verify:player
npm run contact:sheets
```

Concurrency is capped at 2, with environment fallback 1 if needed. Dependencies, cache, secrets and temporary renders are excluded from the source branch. Only fixed evaluation artifacts are published on the separate preview branch.

No blocking technical issue remains in these checks. Creative evaluation and explicit approval of the full preview remain with the user. **No full-resolution movie has been produced.**
