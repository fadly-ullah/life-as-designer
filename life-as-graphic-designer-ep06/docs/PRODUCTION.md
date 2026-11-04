# EP06 production and reproduction

## Source safety

EP06 extends the actual EP05 project in a new directory and branch, without editing prior episodes. `source-lock.json` records original local character/design hashes and **531 protected files** in EP01, EP01 V2 and EP02–EP05. Run `npm run check:identity` before rendering. The master recording is the uploaded WAV; the MP3 is a compatibility derivative only.

## Timing evidence

The composition has **1770 frames at 30fps / 59 seconds**. The WAV is **56.610958 seconds**. FFprobe metadata and 30fps RMS waveform are saved under `src/data/`. Full multilingual Whisper phrase results, focused retries and FFmpeg -34dB/min70ms pause measurements are retained there. Captions use the Remotion Caption JSON shape, maximum two lines, with null confidence/word timestamps rather than fabricated precision.

Scene starts follow the actual recording and the pauses around 6.65, 21.09, 31.37, 40.64 and 48.45 seconds. Within continuous narration, phrase cues and visual substeps remain editable. `alignment.json` documents ASR spelling corrections and the absence of phoneme/word alignment. The script in `script.ts` is the approved colloquial narration, with punctuation. Never regenerate or substitute speech when editing.

Optional offline transcription, if a compatible local multilingual model is installed:

```sh
/path/to/asr-venv/bin/python scripts/transcribe-voice.py \
  --audio public/audio/ep06-voiceover.wav \
  --model-dir /path/to/sherpa-onnx-whisper-small
```

This optional tool is not required for normal rendering: the reviewed transcript, cue data, assets and waveform are committed. New audio requires fresh timing, visual review and preview approval.

## Scene and performance system

Six scene components are registered individually in `Root.tsx` and authored as separate Sequence nodes in the episode timeline. The unchanged original PixelCharacter uses a continuous global frame clock, measured speaking RMS and `performance.json`. A brief visual reaction hold occurs in a recorded opening pause. It does not stop rendering. No CSS timer, random wall-clock behavior or replacement character artwork is used.

The fictional design interface is contained in the original PixelComputer. Frozen cursor/spinner, unsaved indication, restart, recovery, file opened, finalization, export and file-ready states are deterministic. Recovery reopens the same EP05 final poster. The upload is a fictional story action; no client is contacted by this project. No client verdict is exposed in the next-morning notification.

The poster is 3:4 / 1080×1440 in the fictional export. The video composition remains 1080×1920, and its evaluation movie is 540×960. The original poster title, discount, colors and CTA survive every scene.

## Visual review gate

```sh
npm run typecheck
npm run visual:check
```

The renderer first verifies identity, then produces 13 checkpoints under `out/visual-check/`, including all seven requested story moments and six intermediate continuity checks. Compare them against an original EP01 frame. Check face/proportions, clipping, text readability, poster aspect, clock logic, subtitles, recovery and upload states.

After inspecting the PNGs, write `out/visual-check/review.json` with:

```json
{
  "status": "passed",
  "productionFingerprint": "copy from frames.json after inspecting that exact set",
  "voiceSourceSha256": "9851ec7d6e87a5520b6c86676b88f5250c619176e7d1d303ce52dcc2d332b05b",
  "reviewer": "name of reviewer",
  "notes": ["Record observed checks and any corrections."]
}
```

The preview script refuses stale or missing approval of the current PNG/source fingerprint. Re-review if any source or public asset changes. Documentation changes do not change the video fingerprint.

## Evaluation render and verification

```sh
npm run render:preview
npm run verify:preview
npm run preview:video
# In a second terminal while the MP4 player is running:
npm run verify:player
npm run contact:sheets
```

Rendering uses `--scale=0.5 --concurrency=2`. Use `RENDER_CONCURRENCY=1` for resource failures; never use 3. Run one render job at a time. The mastering stage accepts only 540×960 input and produces baseline H.264, yuv420p, AAC stereo 48kHz and faststart. Two-pass loudness mastering aims for −16 LUFS and at least 1dB true-peak headroom; it does not retime narration.

Verification checks all frames and full decode, black intervals, caption consistency and bounds, unmodified master hash, audio headroom/loudness and measured VO correlation at the beginning, middle and ending. Inspect encoded samples and exercise a browser player through full playback, not only stills.

Keep source/dependencies separate: commit source, lockfiles, fonts/licenses, original DSP assets, narration and timing data; ignore node_modules, venv, caches and out/. Publish only fixed evaluation deliverables on a separate preview branch if sharing via GitHub. Verify remote commits and file hashes after upload.

**Stop after the full evaluation preview. Full-resolution export remains blocked until explicit user approval.**
