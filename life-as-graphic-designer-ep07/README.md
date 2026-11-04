# Life as a Graphic Designer — EP07

**Season 01 Finale: Akhirnya Desain Diterima!** · @fadly_hisbullah

Branch: `feature/ep07-season-finale`, continued from verified EP06 source `4a03a9aecf218be6c1496786dee6266b02bc6884`. This project extends the working series source in its own directory. EP01 is the authoritative character reference. EP01/V2 and EP02–EP06 remain unchanged.

## Codespaces

Choose **Life as a Graphic Designer EP07** (`.devcontainer/ep07/devcontainer.json`). Existing Codespace:

```sh
cd life-as-graphic-designer-ep07
npm ci
python3 -m venv .venv-tools
.venv-tools/bin/pip install -r scripts/requirements-tools.txt
npm run dev -- --no-open
```

Forward **3013** for Remotion Studio and open `LifeAsGraphicDesignerEP07`. All six scenes have separate connected composition registrations. The devcontainer installs Chromium/FFmpeg and Python tools. Rendering requires no Blender, paid assets, API key, new voice generation or online transcription service.

```sh
npm run typecheck
npm run check:identity
npm run visual:check
# Inspect the current PNGs; record review.json per docs/PRODUCTION.md.
npm run render:preview
npm run verify:preview
npm run preview:video
# In another terminal while the MP4 player is running:
npm run verify:player
npm run contact:sheets
```

The regular MP4 player is on **3014**, with byte-range seeking/download. Output: **`out/ep07-full-preview.mp4`**, 540×960, 30fps, H.264 baseline/yuv420p, AAC stereo 48kHz, faststart. Config and preview CLI cap concurrency at **2**. Use `RENDER_CONCURRENCY=1` for resource-related failures; never run render jobs together.

**Full-resolution 1080×1920 export remains blocked until explicit user approval of the complete evaluation preview.**

## Actual uploaded narration

The original attached MP3 is installed byte-for-byte at `public/audio/ep07-voiceover.mp3` and is the sole narration track.

- FFprobe duration: **65.410563 seconds**, mono MP3 at 44.1kHz.
- Decoded analysis duration: **65.410625 seconds** (48kHz sample rounding).
- SHA256: `bf3d0990c7776f9a068c3d1da77eb8b62977f8fd3cfc2f65afdf46b1dadb382c`.
- `ceil(65.410563 × 30) = 1963` narration frames + 77 ending frames = **2040 frames / 68 seconds**.
- The recording is longer than the conceptual 60-second target. Speech is neither cut nor stretched; all dialogue and the Season 02 CTA are retained.
- **38 editable phrase captions** in `src/subtitles/captions.json` follow native multilingual ASR timestamps and measured speech/pause boundaries. Evidence and recognition spelling corrections are retained in `src/data/`.
- `episode07Timings.ts`, `performance.json` and `alignment.json` drive scene cuts, gestures, subtitles and sound events. Main-character speaking uses actual waveform RMS. No phoneme/word alignment accuracy is claimed.

## Genuine flashback assets

All EP01–EP06 sources and actual preview renders were available. The six **animated** excerpts under `public/montage/` come from those real renders. They are not newly invented earlier scenes or static screenshots. `provenance.json` records source project/branch, original render SHA256, source in-point, duration, crop, frame rate and bundled clip SHA256.

Each clip retains native 30fps movement, is cropped to the story area at 540×600 and contains **no audio stream**. The montage frame covers the old outer labels/subtitle margin; only the new narration/subtitles play. Clips are reusable production assets committed with the source, so rendering does not require untracked previous `out/` files or extra sibling dependencies. The surrounding editorial system remains cream/charcoal/lime.

Six flashbacks correspond exactly to the spoken recap: confusing brief, reference overload, color chaos, wedding-like fonts, ambiguous feedback and deadline freeze. Original archival character acting is retained under the off-screen recap; it is not re-lip-synced to the new words.

## Finale and poster continuity

The six scenes are client approval, six-episode flashback, lessons learned, design decisions, Season 01 completion and Season 02 topics. Approval is withheld until its actual VO cue; a short disbelief hold occurs in a recorded pause before the original happy action celebrates. No new character drawing or unsupported wave action is introduced.

The final poster is the exact EP06 `RevisionPoster` with `enlarge={1} contrast={1} cta={1}`. Color/type/layout evolution uses the series' actual `PromoPoster`, `TypographyPoster` and `RevisionPoster` implementations. All three are byte-locked to EP06 in this project. The same title, 50% offer, charcoal background, cream typography, lime emphasis, olive accents and 3:4 poster layout survive the finale.

The reflection returns to the original brief: young audience, discount message, discount-first visual priority. The closing keeps the original brand/username treatment and states **SATU POSTER. BANYAK PELAJARAN. / SEASON 01 COMPLETED**.

The Season 02 teaser shows three neutral audience choices: **HARGA JASA DESAIN**, **BANGUN PORTOFOLIO**, **CARI KLIEN PERTAMA**. No topic is automatically selected. Interaction is the recorded invitation to comment, followed by the recorded Season 02 farewell. No extra narration is inserted.

`check:identity` verifies **649 protected previous-episode files**, original local character/expressions/palette/CSS/helpers/fonts, the reused poster implementations, actual master hash and six archive formats/hashes. Music is original 90 BPM procedural instrumental with suspense, celebration, montage, reflection and closure automation. SFX are original series assets plus original synthesized heartbeat-like and closing cues. See `docs/PRODUCTION.md` and `docs/AUDIO-LICENSES.md`.
