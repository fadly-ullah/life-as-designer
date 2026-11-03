# Evaluation preview validation — 2026-11-03

The actual full preview was rendered and tested. This is an evaluation deliverable; final 1080×1920 export has not been rendered and is awaiting user approval.

- 540×960, H.264 baseline/yuv420p, 30fps, **1650 frames / 55.000 seconds**.
- Supplied EP02 VO: **51.487313 seconds**, unchanged source bytes and natural speed/pitch.
- 36 Indonesian phrase captions, maximum two lines. Native ASR phrase timestamps, corrected against the approved narration and checked against waveform. Human timing preference review remains appropriate; no phoneme or forced word alignment is claimed.
- Nine representative PNG moments inspected, including the six requested scenes. Original EP01 frame compared side by side. The selected sketch transition was cleaned up after inspection. All 133 protected EP01/V2 source files remain unchanged; original rig, expressions, font, CSS and palette file are byte-identical.
- Full FFmpeg decode passed; no black intervals or missing encoded frames. AAC stereo, 48kHz.
- VO correlation windows 0.5–7s, 24–31s and 44–51s: **0ms offset** in each; coefficients 0.99681 / 0.99648 / 0.99227.
- Master loudness **−16.0 LUFS**; true peak **−1.3dBTP**; no clipping detected.
- Chromium loaded the MP4, successfully sought to 18 points, then played the complete 55-second preview at normal speed. No player errors or dropped frames during the test. Encoded frame samples inspected for subtitle placement, expressions, changing browser content, sketch selection and ending teaser.
- Rendering used concurrency **2**. No final-resolution movie was created.

Machine-readable measurements and hashes: `preview-validation.json`. The composition source was tested at checkpoint `5dc93fafc1bd38bb35efffa698c3520d74c80e68`; subsequent changes add the regular video player, Codespaces port forwarding and this validation record without changing composition/scene assets.

Evaluation MP4 SHA256: `f716e3cd2a065e51cb36ed9b4dc988149608bb0df3c63a74883ec4d42b0a240e`.
