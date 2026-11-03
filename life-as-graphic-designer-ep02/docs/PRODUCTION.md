# EP02 production notes

The working branch is `episode02/inspiration-overthinking`, based on the EP01 recovery commit. EP01 and EP01 V2 must remain unchanged. `source-lock.json` records the original hashes, also checked before rendering.

## Visual review

`npm run visual:check` creates 9 PNGs under `out/visual-check/`, including the six requested moments plus reset, selection and teaser checks. Compare with the original EP01 frames and inspect head/body proportion, facial geometry, font, colors, safe areas, subtitle wrapping and readable poster choices.

Only after inspecting the current frames, write `out/visual-check/review.json` with:

```json
{"status":"passed","voiceSourceSha256":"49c45681d5391565da3061e8a9c42ce6c755510efb40883cd09595243baf0368","reviewer":"visual review","notes":[]}
```

This is an internal quality gate, not user approval of a final export. Review again after changing scene layouts or timing. The preview script rejects missing/failed review and any worker count above 2.

## Timing and audio

All scene timecodes follow the actual EP02 recording. ASR used official Whisper-small int8 via local Sherpa-ONNX CPU; `scripts/transcribe-voice.py` is an optional audit aid, not required to render. Its model must be installed separately only if retranscribing. Phrase timestamps are editable and require human assessment during preview review. The approved transcript is `src/data/script.ts`; ASR corrections and source SHA are in `src/data/alignment.json`.

SFX events and narration ducking are in `src/audio/AudioTimeline.tsx`. Only source VO has speech; other audio contains no generated dialogue. The failed design uses stronger yellow/green intentionally inside its poster, with editorial surroundings retaining series colors.

`npm run render:preview` renders only at scale 0.5 and masters only if input dimensions are exactly 540×960. `scripts/verify-preview.py` checks 1650 frames/55 seconds, H264, AAC stereo/48kHz, full decode, no black frames, actual VO correlation at beginning/middle/end, sample/true peaks, loudness and subtitle transcript/order. Results and SRT are in `out/`.

For visual motion review, watch all of the final MP4 and check opening, scene boundaries, the clock reaction, keyword order, sketches, color-disaster reveal, subtitle timing at beginning/middle/end and the final EP03 teaser. User preview approval is required before final 1080×1920 output. No automatic acceptance or approval file is created.

## Publication

Source commits contain assets and reproducible project code, not node_modules, temporary MP4/PNG files, caches, environment files or credentials. Evaluation artifacts can be published separately for review, with a manifest of source commit and SHA256. Verify both source and artifact remote commits before reporting their URLs.
