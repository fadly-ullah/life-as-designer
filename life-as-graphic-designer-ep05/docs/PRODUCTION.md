# EP05 production and review

Source branch `feature/ep05-client-revisions` preserves all previous projects. `source-lock.json` records 421 protected EP01/V2/EP02/EP03/EP04 source files. The local original rig, expressions, colors, stylesheet, font and animation helpers must remain byte-identical.

## Audio authority

Master: `public/audio/ep05-voiceover.wav`, the original uploaded 24kHz PCM WAV. Duration is 53.090958s. An optional MP3 compatibility derivative is also installed at the requested path; the renderer uses only the WAV master. No narration is regenerated, substituted, pitch-shifted or stretched. Rendered AAC is standard output encoding; the original source is never rewritten.

Native local Whisper-small phrases are matched to measured FFmpeg `silencedetect` at −34dB / 70ms. Actual pause midpoints define six cuts. Raw ASR and pause evidence are in `src/data/`; focused retries verify the chunk-boundary “macem-macem” and final deadline phrases. This is real phrase alignment, not uniform or storyboard-estimated timing. No phoneme timing is available.

## Six connected sequences

1. Same completed EP04 poster is sent and receives the confusing message. A labeled imagination cut uses the original SVG leg geometry for an almost-kick, then returns to reality. No new character art, detached limbs or real violence.
2. Potential clutter is clearly labeled **IMAJINASI / BELUM DITERAPKAN**. It fades away before clarification; the actual poster remains unchanged.
3. One concise clarification question gets a reasonable answer about the discount. Only two chat cards are visible; character remains clear of them.
4. Enlarge 50%, switch to a stronger cream/charcoal contrast pair while retaining lime, then group the CTA closer to the offer. Secondary text moves below it without crossing visible labels. Before/after demonstrates the targeted change.
5. Revised poster is sent, client says “Nah, ini maksud saya!”, and the designer briefly celebrates.
6. Another message asks for tonight's final. A short frozen reaction, original surprised pose, clock and one-hour timer build the EP06 cliffhanger. The timer represents remaining duration, not an invented actual current time.

## QC gate

`npm run visual:check` renders six required PNGs plus reality, contrast, CTA, approval, relief and teaser checks. Inspect original EP01 identity, articulated leg attachment, imagination labels, poster continuity, bigger 50%, safe margins, chat/card spacing, readability and subtitle placement.

Only after inspection create `out/visual-check/review.json` with `status: "passed"`, current `voiceSourceSha256`, `productionFingerprint` from `frames.json`, reviewer and notes. Source changes invalidate the review. This is internal QC, not user final-export approval.

## Full evaluation

`npm run render:preview` renders only scale 0.5, concurrency 2. Mastering rejects any input except 540×960 and normalizes the actual mix to approximately −16 LUFS / −1.5dBTP. `npm run verify:preview` checks 1680 frames / 56 seconds, codecs, AAC stereo/48kHz, full decode, black intervals, source WAV identity, headroom/loudness, caption transcript/order and original-voice correlation at beginning/middle/end.

Play the entire actual MP4 and inspect scene transitions, imagined-versus-real state, revision meaning, subtitle timing and deadline reaction. User timing/pacing preference review remains appropriate. Stop for explicit preview approval before creating a final 1080×1920 movie.

## Git

Commit source and necessary assets only. Exclude node_modules, venv, caches, temporary renders, credentials and keys. Verify remote commits and bytes after pushing. Publish review MP4/PNG files separately from the feature source branch; never force-push protected or previous-episode branches.
