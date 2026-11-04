# EP05 evaluation preview validation

Status: **ready for user review**. The complete evaluation preview exists and has passed the checks below. The final 1080×1920 export has not been rendered and requires explicit user approval.

Tested implementation commit: `618e7816326e002d4b1bbe1f48c91292540734a9` on `feature/ep05-client-revisions`. Subsequent validation-documentation commits do not change the rendered composition or media. Fixed review artifacts are published separately on `preview/episode05`, under `previews/episode05/`.

## Source and identity

- Original articulated EP01 SVG character, expressions, colors, CSS, animation helpers and local typography were checked by SHA256. No new character model or artwork was introduced.
- All **421 protected previous-episode files** match the captured source baseline. EP01, EP01 V2, EP02, EP03 and EP04 are unchanged.
- The existing EP04 promotional poster is reused. Actual revisions enlarge the discount, strengthen its contrast and group the CTA. Imagined clutter and the brief almost-kick are explicitly labeled and return to reality.
- TypeScript and identity checks passed. The source checkpoint was independently fetched from GitHub and its source/assets compared with the workspace.

## Audio and captions

The uploaded WAV is the sole narration master: **53.090958 seconds**, PCM16 mono at 24kHz, SHA256 `f6303678c27cf098e27147846cb2a2f2c0e28d8ddb7235a625ce8fac7c81ff61`. Its original bytes are preserved at `public/audio/ep05-voiceover.wav`. The requested MP3 path contains a compatibility derivative; the composition plays the original WAV once. No speech trimming, stretching, pitch change or replacement voice was used.

The timeline is `ceil(53.090958 × 30) + 87 = 1680` frames, or **56 seconds**, including the natural EP06 ending. All 28 phrase subtitles use actual local ASR timestamps and measured pauses. Focused retries resolved chunk-boundary omissions. The beginning, middle and ending were checked against the recording. These are phrase-aligned cues and simple speaking-mouth animation, not phoneme-accurate lip-sync.

Decoded output/master audio cross-correlation:

| Output window | Offset | Correlation |
| --- | --- | --- |
| 0.3–7 seconds | 0 ms | 0.99624 |
| 22–29 seconds | 0 ms | 0.99769 |
| 46–52.9 seconds | 0 ms | 0.99688 |

The mix uses original instrumental music and series DSP sound effects with speech ducking and narrative stops. Measured integrated loudness is **−16.0 LUFS**, true peak **−2.3 dBTP**, decoded sample peak **−3.76 dBFS**. No audio clipping was detected.

## Visual and playback checks

Twelve representative PNGs were rendered and inspected, including all six required story moments plus reality restoration, contrast, CTA, approval, relief and the EP06 teaser. The contact sheet includes an EP01 reference. Character geometry, facial design, proportions, colors, typography, poster continuity, safe areas and clipping were checked. The almost-kick keeps the existing leg and shoe attached and stops short of the poster.

The actual encoded MP4 was then inspected at **25 seek points** from 0.6 to 55 seconds. Its full **56-second** playback at normal speed completed in Chromium with **zero dropped frames**, no player errors and a normal ended event. Browser autoplay used muted playback; decoded audio, waveform correlation, loudness and complete speech were checked separately.

Full FFmpeg decoding passed, all **1680 frames** are present, and no black frames were detected. The file uses H.264, yuv420p, **540×960**, 30fps, AAC stereo at 48kHz, with faststart metadata for playback and seeking.

Output: `out/ep05-full-preview.mp4` (**3,832,727 bytes**).

SHA256: `a13314493c1aa3e0d6b17a60b5311ef487f3ffa5234c7f2f3e14ec9976daeb37`.

Reproduction commands from the EP05 directory:

```sh
npm run dev -- --no-open
# Studio: port 3009, composition LifeAsGraphicDesignerEP05
npm run typecheck
npm run check:identity
npm run visual:check
# Inspect images and record review.json using docs/PRODUCTION.md.
npm run render:preview
npm run verify:preview
npm run preview:video
# MP4 player/download: port 3010
```

Render concurrency is capped at 2; set `RENDER_CONCURRENCY=1` if memory pressure requires it. Temporary render files are excluded from the source branch. Only fixed evaluation artifacts are published on the separate preview branch.

No blocking technical issue remains in these checks. Creative evaluation and explicit approval of this complete preview remain with the user. No full-resolution export has been produced.
