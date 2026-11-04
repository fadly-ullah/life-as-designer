# EP07 production and reproduction

## Source and identity safety

The project continues verified EP06 source in a separate directory and feature branch. `source-lock.json` protects **649 prior project files**, plus unchanged local EP01 rig, expressions, palette, CSS, animation helpers and fonts. The three poster generations are also locked byte-for-byte to EP06. All character improvements use existing actions and the original articulated SVG geometry.

## Real narration timing

The original MP3 is **65.410563 seconds** by FFprobe. Decoded analysis at 48kHz is **65.410625 seconds**, a negligible rounding difference. The timeline is **1963 + 77 = 2040 frames / 68 seconds**. No dialogue is trimmed, sped up, pitch shifted or replaced to force 60 seconds.

`src/data/` retains native local multilingual Whisper phrase results, focused retries, FFmpeg silence measurements (-34dB/min70ms), waveform RMS, source hash, cue map and action schedule. Caption JSON uses the Remotion Caption shape with null word timestamps/confidence rather than invented precision. Recognition spelling for Pinterest/font and several colloquial words is corrected against the supplied script; corrections are documented in `alignment.json`.

Actual scene starts are 0, 12.92, 28.62, 41.60, 49.58 and 57.08 seconds, following the recording. Main performance uses a continuous frame clock, actual voiced RMS and original rig actions. The brief disbelief hold at 9.97–10.22 seconds falls in the recorded pause before celebration. No phoneme-accurate lip-sync is claimed.

Optional offline transcription, if a local compatible multilingual model is installed:

```sh
/path/to/asr-venv/bin/python scripts/transcribe-voice.py \
  --audio public/audio/ep07-voiceover.mp3 \
  --model-dir /path/to/sherpa-onnx-whisper-small
```

Normal rendering needs no ASR model or external API because all timing data is committed. New VO requires new alignment and review.

## Six scenes and archive system

Each scene has an authored Sequence node and its own connected composition registration. The archive uses six individual authored Video/Sequence nodes, native 30fps, with original footage/audio removed from the mix. Every bundled archive MP4 has no audio stream. `public/montage/provenance.json` records its exact source render and clip hashes, source in-point, duration and crop. Prior `out/` folders were used only to prepare these committed production assets, not as runtime dependencies.

The archive frame contains the genuine original character and old story actions, while the new narration recaps them off-screen. Those original mouth performances are not phoneme-matched to the recap. At no point is a new character model introduced.

Reflection slows the editing and revisits the brief. Color/font/layout each receive a readable third of their measured continuous phrase; the short font crossfade avoids prolonged overprinted text. The design-evolution scene reuses live SVG layers from the actual color/type/revision poster history, then resolves to the exact EP06 final state. The Season 01 completion stays within the original editorial brand. Season 02 topic cards enter at their spoken cues and remain neutral; none is automatically chosen.

## Visual review gate

```sh
npm run typecheck
npm run visual:check
```

Nineteen checkpoint PNGs include all seven required story moments, every prior episode in the montage, approval/disbelief, the brief, client-feedback lesson and the final hold. Compare the current set with original EP01. Check character face/proportions/clothing, poster continuity, montage cropping, layout, typography, subtitles and safe areas.

Record the actual inspection in `out/visual-check/review.json`:

```json
{
  "status": "passed",
  "productionFingerprint": "copy from the inspected frames.json",
  "voiceSourceSha256": "bf3d0990c7776f9a068c3d1da77eb8b62977f8fd3cfc2f65afdf46b1dadb382c",
  "reviewer": "reviewer name",
  "notes": ["Observed checks and any corrections."]
}
```

The preview script rejects missing/stale review or changed narration. Changes to src/public require fresh PNG review. Documentation changes do not change the production fingerprint.

## Render and verify

```sh
npm run render:preview
npm run verify:preview
npm run preview:video
# In another terminal while the player is running on port 3014:
npm run verify:player
npm run contact:sheets
```

Use one render process at a time, concurrency 2 or `RENDER_CONCURRENCY=1` if needed. The mastering script accepts only 540×960, targets −16 LUFS / −2 dBTP and outputs H.264 baseline, yuv420p, AAC stereo 48kHz with faststart. It does not retime narration.

Verification checks full video decode/frame count, black intervals, master hash, caption bounds/transcript, loudness/clipping and beginning/middle/end audio correlation. The browser check seeks to 38 points, captures actual encoded frames, then plays all 68 seconds at normal speed. Browser autoplay uses mute; audio is verified separately by decoding, correlation and loudness analysis.

Commit source, narration, archive assets/provenance, generated original music/SFX, fonts/licenses and timing data. Exclude node_modules, venv, secrets, caches and out/. Fixed review artifacts can be shared on a separate preview branch. Verify remote commits and file hashes after pushing.

**Stop after the complete evaluation preview. Full-resolution export requires explicit approval.**
