# EP01 V2 — preserve the original

This project is a verified copy of the successful EP01 source. It was not scaffolded from scratch. The earlier ThreeCanvas preflight was retained separately as `../life-as-graphic-designer-ep01-v2-three-preflight` and is not the visual basis of this version.

## Original and recoverable backup

Original project: `/workspace/life-as-designer/life-as-graphic-designer-ep01`.

The exact archive path and per-file SHA-256 hashes are in `preservation-baseline.json`. A verified tar.gz archive contains every original source/config/asset file plus the successful MP4 and verification report. The original directory remains untouched.

## Reused components and protected visual identity

- `src/characters/PixelCharacter.tsx` and `CharacterExpressions.ts`: original articulated SVG rig, exact geometry, proportions, face, hair, clothes and colors.
- `src/components/`: original editorial typography, cards, chat, desk, computer, moodboard, subtitle styling, camera and transitions.
- `src/data/colors.ts`, `src/style.css`, `public/fonts/`: original cream/charcoal/lime palette and Space Grotesk.
- `src/compositions/Episode01.tsx`: original scene composition and fixed editorial frame.

`npm run check:identity` asserts these visual files are byte-identical to the baseline and that all 57 original files remain unchanged. `CharacterPerformance.tsx` adds only a parameter-driven pose/speech controller around the original rig; it introduces no new character artwork and is not yet wired to unprovided VO timings.

## Latest VO is required

The user identified **`public/audio/ep01-voiceover.mp3`** as the latest recording. That file is not currently present in the available checkout or remote `main`. The copied `public/audio/episode01-vo.mp3` is the OLD 64.20898-second source and is retained for reference only.

The prior approximate captions and timing remain visible for baseline comparison. They have NOT been relabeled as synchronized to the new recording. `npm run render` is guarded and will refuse final V2 rendering until the latest audio exists, its metadata and hash match, its scene/subtitle alignment is reviewed, and the visual identity check passes.

Once the actual new file is provided, measure it without trimming or changing its pitch/speed, transcribe locally, review the script against the recording, update scene/subtitle/pose/SFX cues, and then render the V2. All work should preserve the original layout and use the original rig's existing expressions and articulated poses.

## Current status

Backup and original-derived copy are complete. Studio opens the original composition from this copy. The new VO, final timing, pacing, expression cue integration, audio mix and final V2 MP4 remain pending the actual audio file. No completed V2 video is claimed.
