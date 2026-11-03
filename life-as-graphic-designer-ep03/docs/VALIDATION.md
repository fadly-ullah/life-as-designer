# EP03 evaluation preview — validation

The complete corrected evaluation preview has been rendered and tested. Final 1080×1920 export has not been rendered and awaits explicit user approval.

- 540×960, H.264 baseline/yuv420p, 30fps, **1740 frames / 58.000 seconds**. AAC stereo, 48kHz, faststart.
- User-supplied EP03 narration: **54.282438 seconds**, source bytes unchanged, no trimming, time stretching, pitch changes or added dialogue.
- 26 Indonesian phrase subtitles, maximum two lines; actual Whisper phrase segments and measured FFmpeg speech/pause regions. First/middle/final captions and recorded voice timeline checked. No word or phoneme lip-sync accuracy is claimed; user pacing/timing preference review remains appropriate.
- Seven requested representative storyboard moments plus three supplementary PNGs inspected. Original EP01 frame compared alongside EP03; original rig geometry, expressions, proportions, hair, hoodie, colors, CSS and font are preserved. All 219 protected EP01/V2/EP02 source files remain unchanged.
- The five-color failure, low-contrast title/offer, functional color roles, cleanup, before/after and script-font mistake are visible in the encoded preview. Conflicting colors stay within fictional artwork. No accessibility score has been invented.
- Transition note waits for the browser to close, and the EP04 continuation label is clearly below the monitor stand. Important text and subtitles fit the editorial/Reels safe area.
- Full FFmpeg decode passed; **no black intervals or missing encoded frames**.
- Recorded VO correlation at 0.5–7s / 25–32s / 47–53.9s: **0ms offset** in each; coefficients 0.99481 / 0.99589 / 0.99135.
- Measured loudness **-16.1 LUFS**, true peak **-1.3dBTP**, sample peak **-1.41dBFS**. No clipping detected.
- Chromium sought successfully to 20 points, then played the complete 58-second MP4 at normal speed. No player errors or dropped frames. Encoded samples inspected, including the corrected transition and ending layout.
- Only one Remotion render job ran at a time, with concurrency **2**. No final-resolution EP03 movie was rendered.

Tested composition source commit: `5851c8dbf1a2906770bb9e9cc3e9b8dd469801b8`. Subsequent source documentation commits do not change the tested scene/audio assets. Machine-readable evidence is in `preview-validation.json`.

Preview SHA256: `946d9a1460faa0ed15f2d6e036aa1ab492a0ce9a47118d9ec9a2bbeab6671e25`.

Preview output: `out/ep03-full-preview.mp4`. Reproduce with `npm run render:preview`, then `npm run verify:preview`. Studio uses port 3005; regular MP4 player uses port 3006. MP4/PNG evaluation artifacts are published separately from the development source branch.
