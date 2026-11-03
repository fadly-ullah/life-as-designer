# EP03 production and review

Protected episodes are never edited. `source-lock.json` preserves 219 tracked files across EP01, V2 and EP02. Source branch `feature/ep03-color-story` starts from the working EP02 source, which itself contains recovery commit `3c31073c8a7c83065eaf0bbb794ea3b75d63a95f`.

## Timing authority

The EP03 recording is the only narration. Local Whisper-small ASR establishes phrases; FFmpeg `silencedetect` at −33dB, minimum pause 70ms/200ms, establishes measured speech-region boundaries. Raw ASR and silence evidence are retained in `src/data/`. The initial long-tail ASR repeated a word, so that result was discarded for subtitles and the font, wedding and EP04 lines were retranscribed in shorter recorded regions. ASR spelling mistakes for design terms are corrected against the approved transcript. This is phrase synchronization, not forced word or phoneme alignment.

Cuts use the midpoint of actual pauses between the eight narrative sequences. Subtitles use actual speech starts/ends, vary in length, contain the approved narration, and remain within two lines. Character reactions, poster transformations, SFX and music automation follow those measured phrase cues. Five swatch pop events subdivide a continuous spoken phrase as visual acting; they do not claim word timestamps.

## Scene progression

1. EP02's chosen sketch gains color and becomes a chaotic promo poster.
2. Five favorite swatches look attractive in isolation, then compete inside one poster.
3. Title and offer have low contrast; the feed scrolls past before the message lands.
4. Stable framing returns to the client brief: promotion must be immediately readable.
5. The same poster gains charcoal background, cream text, lime offer and restrained olive.
6. Actual visual contrast is compared without invented scores; excess elements disappear, offer grows and spacing improves progressively.
7. A before/after shows 50% first, readable title and a quiet footer/CTA.
8. An overly decorative script font creates an invitation-like result; EP04 teaser follows without extra dialogue.

## Visual and preview gates

`npm run visual:check` renders seven required representative moments plus isolated swatches, cleanup and the ending under `out/visual-check/`. Inspect the character against original EP01 frames, editorial typography, the professional poster, clipping and subtitle safe areas. Only after inspection write `out/visual-check/review.json` with `status: "passed"`, the current `voiceSourceSha256`, `productionFingerprint` from `out/visual-check/frames.json`, reviewer and notes. The render script rejects stale source fingerprints. This internal visual gate is not user approval for final export.

`npm run render:preview` renders a full MP4 at scale 0.5, concurrency 2. Mastering refuses any input other than 540×960 and normalizes the actual mix to −16 LUFS / −1.5dBTP. `npm run verify:preview` checks 1740 frames / 58 seconds, full decode, black intervals, AAC stereo 48kHz, source VO hash, clipping/loudness, captions and actual audio correlation at beginning/middle/end.

Watch the complete MP4 and assess subtitle timing and pacing; native phrase alignment still benefits from human preference review. Stop for user preview approval. No final 1080×1920 export is authorized yet.

## Git

Commit only source, necessary assets and documentation. Exclude node_modules, venv, out/, temporary renders, caches, credentials and secrets. Verify remote source SHA and file hashes after push. Publish evaluation artifacts separately if sharing a downloadable preview; never force-push recovery or earlier episode branches.
