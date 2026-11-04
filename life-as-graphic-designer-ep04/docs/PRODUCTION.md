# EP04 production and review

Source branch `feature/ep04-typography-story` preserves previous episodes. `source-lock.json` records 317 protected EP01/V2/EP02/EP03 files, plus hashes of the original local rig, expressions, palette, CSS, font and animation helpers.

## Recording authority

The supplied recording is the only narration. FFprobe measures 59.424s; decoded PCM is 59.381s, matching the editing reference within MP3 container padding. The master MP3 is never rewritten. No nasal filter, time stretch, pitch effect, speech regeneration, cough or sniffle duplication is applied.

Local Whisper-small native phrases are matched to measured FFmpeg `silencedetect` boundaries at −33dB / 70ms. Raw ASR and pauses are preserved in `src/data/`; spelling errors from nasal speech and design vocabulary are corrected against the approved script (pilek, font, undangan nikahan, ke klien). This is measured phrase synchronization, not uniform estimated durations or phoneme alignment. Human preference review is still appropriate for caption pacing.

## Six connected sequences

1. Original workstation and corrected EP03 poster; subtle fatigue and a small tissue establish the mild cold.
2. Script headline makes the same promotional poster resemble an invitation.
3. Decorative/display/serif choices compete; text selection regions show why the headline and discount fail.
4. Unnecessary font choices close, one family remains; weight, size and spacing improve in separate recorded beats.
5. Before/after shows readable hierarchy, then the designer sends the poster. No client approval is shown.
6. Neutral client feedback says “Bagus sih, tapi kurang nendang.” A brief freeze, confusion and resigned reaction lead to EP05. Humor concerns ambiguous feedback; no abusive client portrayal.

## Visual gate

`npm run visual:check` renders the six required PNG moments and supplementary family/spacing/send/teaser frames under `out/visual-check/`. Inspect character identity against EP01, desk/tissue scale, type family changes, typography hierarchy, safe subtitle placement, clipping and transition states.

Only after inspection create `out/visual-check/review.json` with `status: "passed"`, the current `voiceSourceSha256`, `productionFingerprint` copied from `frames.json`, reviewer and notes. The render script rejects stale source fingerprints. This is an internal quality check, not user approval for final export.

## Full preview

`npm run render:preview` renders only 540×960 at concurrency 2 and masters the actual mix to approximately −16 LUFS / −1.5dBTP. Mastering rejects inputs at final resolution. `npm run verify:preview` checks 1830 frames/61 seconds, complete decode, black intervals, source audio identity, AAC stereo/48kHz, loudness/headroom, caption transcript/order and VO correlation at beginning/middle/end.

Play the complete MP4 and inspect recorded-speech timing, typography progression, sending/reply transition, facial reactions and the EP05 teaser. Keep critical text clear of monitor feet, desk edges and the caption region. Final 1080×1920 output requires explicit user preview approval.

## Git

Source commits include necessary code, fonts, sound assets and recorded narration. Exclude dependencies, venv, caches, secrets and temporary renders. Verify the remote commit and file hashes after push. Evaluation artifacts can be published on a separate preview branch, with source commit and SHA256 manifest. Never overwrite recovery or earlier episode branches.
