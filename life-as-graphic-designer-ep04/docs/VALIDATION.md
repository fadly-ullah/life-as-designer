# EP04 evaluation preview — validation

The actual complete evaluation preview has been rendered and tested. Final 1080×1920 export has not been rendered; explicit user preview approval remains pending.

- **540×960, 30fps, 1830 frames / 61.000 seconds**, H.264 baseline/yuv420p, AAC stereo 48kHz, faststart.
- Supplied edited nasal VO: **59.424s FFprobe / 59.381s decoded PCM**. Original MP3 bytes preserved. All speech remains intact; no pitch/time processing, extra nasal filter, generated dialogue, or duplicate cough/sniffle/breath effects.
- 30 Indonesian phrase subtitles, maximum two lines, aligned from native Whisper-small phrases and measured speech/pause boundaries. First/middle/final cues inspected. No phoneme or forced word alignment is claimed; user pacing preference review is still appropriate.
- Twelve PNG moments inspected, including all six required scenes and six additional timing/repair/send/teaser checks. Original EP01 reference compared alongside EP04. Character geometry, facial features, colors, proportions, original CSS/font/helpers remain unchanged. All **317 protected EP01/V2/EP02/EP03 source files** retain their hashes.
- Workstation tissue and subtle posture establish the mild cold. The same poster retains its artwork, colors and copy while fonts, weights, sizes and spacing transform progressively. One-family result is clearly distinct from the decorative/display/serif failure. Editorial text remains original Space Grotesk.
- Poster aspect ratio and inspector spacing were corrected during QC. The final encoded samples show clear character/card spacing, legible before/after, a delivery-only send state, neutral client feedback and the EP05 cliffhanger.
- Full decode passed; **no black intervals or missing encoded frames**.
- Actual VO correlation at 1–7s / 30–37s / 52–59.1s: **0ms offset** in each; coefficients **0.99904 / 0.99907 / 0.99946**.
- Measured loudness **-16.0 LUFS**, true peak **-1.6dBTP**, sample peak **-1.65dBFS**. No clipping detected.
- Chromium loaded the MP4, sought to 24 points, then played the complete 61 seconds at normal speed without player errors. Its display counter reported **1 presentation drop** during this combined seek/play test; this is separate from the encoded file, whose complete 1830-frame stream passed decode. Encoded samples were visually inspected after rendering.
- One Remotion render job at a time; concurrency **2**. No final-resolution EP04 movie was created.

Tested composition source commit: `8dc124a5b5a7ed5e3176a65ba8f4cc5cd5a067d6`. Subsequent documentation does not change scene/audio assets. Detailed measurements, frame hashes and browser evidence are in `preview-validation.json`.

Preview SHA256: `d4cc244ebe08cc978d9dd29dea15b222f29b803046075b8f4ca2dcacf10544b1`.

Output: `out/ep04-full-preview.mp4`. Studio: port 3007. Regular video player: port 3008. Reproduce with `npm run render:preview` and `npm run verify:preview`. Evaluation artifacts are published separately from the source branch.
