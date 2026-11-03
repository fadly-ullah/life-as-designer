# Life as Graphic Designer — S01 / EP01

**“Simple Aja, Tapi Harus WOW!”** · @fadly_hisbullah · Indonesian

An implemented Remotion short with eight animated sequences, an articulated pixel character, cream/lime editorial graphics, captions, original SFX and a quiet original lo-fi bed. No Blender, stock footage or external API keys.

## Preview and render

Tested with Node 24.19.0, npm 11.9.0, Chromium, Remotion **4.0.540**, React **19.2.0**, TypeScript **5.9.3**. All Remotion packages share one exact version; `package-lock.json` is included.

```bash
cd /workspace/life-as-designer/life-as-graphic-designer-ep01
npm ci
npm run typecheck
npm run dev -- --no-open
```

Select **LifeAsGraphicDesignerEP01** in Studio (port 3001). The Scenes folder contains standalone scene compositions. Forward port 3001 in Codespaces. Use the existing isolated checkout; no worktree is needed.

### Open the rendered video

Workspace file paths in a chat are not public video URLs. To play the existing render without Studio, run `npm run preview:video`, then in GitHub Codespaces use **Ports → 3002 → Open in Browser**. The dedicated HTML5 player supports play, seeking and downloads for both the 540 × 960 preview and 1080 × 1920 master. Do not open a cloud executor's localhost address on your own computer without port forwarding.

The lightweight preview is `out/LifeAsGraphicDesigner_EP01_preview.mp4` (H.264 Constrained Baseline level 3.1, AAC, faststart). Regenerate it after a new final render with:

```bash
ffmpeg -y -i out/LifeAsGraphicDesigner_EP01.mp4 -vf scale=540:960 -c:v libx264 -profile:v baseline -level:v 3.1 -pix_fmt yuv420p -preset fast -crf 23 -c:a aac -b:a 128k -movflags +faststart out/LifeAsGraphicDesigner_EP01_preview.mp4
```

```bash
npm run render
# Two explicit stages, equivalent to npm run render:
npx remotion render src/index.ts LifeAsGraphicDesignerEP01 out/.render-mix.mp4 --codec=h264 --concurrency=3
node scripts/master-output.mjs
```

The config selects `/usr/bin/chromium` if present. Override with `REMOTION_BROWSER_EXECUTABLE` for another Chrome/Chromium path. Otherwise Remotion can manage its browser download. All fonts, VO, music and SFX are local, so normal rendering needs no network after installation.

## Duration and original voice

- **1080 × 1920, 30 FPS, H.264, yuv420p, AAC**.
- MP3 duration: **64.20897959183674 s**, decoded to **2,831,616 mono samples at 44,100 Hz**.
- Voice frames: `Math.ceil(audioDurationSeconds * 30)` = **1927**.
- Ending padding: **36 frames** (1.2 s).
- Total: **1963 frames**, **65.433333 s** on the video timeline. Container duration may differ by an AAC packet fraction.
- `public/audio/episode01-vo.mp3` is a byte-for-byte copy of the uploaded recording. It starts at frame zero: no trimming, regenerated speech, speed change or pitch change. A uniform 0.79 gain reserves mix headroom.
- The source SHA-256, measured sample count and duration are in `src/data/audioMetadata.json`.
- The final FFmpeg mastering pass measures the mix, applies two-pass loudness normalization targeting **−16 LUFS / −1.5 dBTP**, and converts full-range render pixels mathematically to limited-range BT.709 yuv420p. It does not trim or retime the recording. `out/mastering.json` records both passes. This final mastering gain/limiting is additional to the uniform VO mix gain above.

## Caption and scene timing — review status

**Caption phrase timings are approximate and need human review.** The environment denied downloading a local ASR model. No word-level forced alignment was performed or claimed.

The complete supplied transcript is preserved in `src/data/script.ts`. All **36 editable cues are in `src/data/subtitles.ts`** using the Remotion `Caption` shape. `src/data/captions.json` retains the initial JSON cue record. Phrases follow the recording's waveform/silence boundaries rather than equal-length scenes. Review **53.23–58.77 s** especially: the teaser sentence boundary is inferred within continuous speech. Subtitles have at most two lines in a 900 px area, at least 325 px above the bottom. Keyword emphasis is phrase-based, not simulated word alignment.

Scene starts: **0 / 8.85 / 19.42 / 27.34 / 34.96 / 43.73 / 46.28 / 51.95 s**, rounded to 30 FPS. Edit `src/data/sceneTimings.ts`; narration-specific actions use `localBeat` to convert from master time. The final hold follows the complete VO.

## Animation and art direction

`PixelCharacter` is a procedural 2 px-grid SVG rig with independent head, eyelids, brows, mouth, sleeves, forearms, hands, knees and shoes. It supports idle, breathing, blinking, talking, reading, typing, thinking, confused, surprised, pointing, frustrated, happy, and seated poses. The cream hoodie, charcoal trousers, olive shoes, brown skin and short black hair remain consistent.

All motion uses frame-derived math, interpolation, springs and easing. No CSS animation clocks, timers, per-frame randomness or external scene images. Cards assemble, words converge, the clock advances, the design cursor moves, facial expressions change and reference cards accumulate. Transitions sweep over existing content without blank interstitial frames.

The uploaded image informed the charcoal/lime/olive treatment. **No motion reference video was supplied in the attachments or starter ZIP**; the motion follows the written storyboard. Reference-video matching is not claimed.

## Sound design and licenses

- Nine actual original synthesized WAVs in `public/audio/sfx/`: notification, typing, message pop, UI click, whoosh, confused reaction, clock tick, success and comedic impact.
- `public/audio/music-original.wav`: original deterministic 78 BPM electric-piano-style lo-fi bed with sparse soft percussion.
- `AudioTimeline` ducks music using smoothed VO RMS, raises it slightly in pauses and fades the ending. Set composition prop `music` to `false` to disable it.
- These procedural sounds contain no third-party recordings or commercial music. The generated sound assets are offered under CC0.
- Bundled Space Grotesk uses SIL OFL 1.1; full license: `public/fonts/OFL-SpaceGrotesk.txt`.
- The voice recording remains the user's supplied asset.

## Checks and maintenance

```bash
npm run typecheck
npm run compositions
npm run stills
npm run verify
```

`stills` renders 16 full-resolution PNGs. Use `FRAMES=0,126,655,1000,1185,1660,1962 npm run stills` to choose frames.

`verify` checks the actual MP4's codecs, exact frame count, full decode, black-frame intervals, audio peaks, original VO hash, caption completeness and audio correlation at the beginning/middle/end. It writes `out/verification.json` and the SRT export. These checks verify VO placement and absence of drift; **they do not certify approximate subtitles as word-aligned**.

All assets are included. Optional asset regeneration and verification utilities use Python 3, FFmpeg, NumPy, SciPy and Pillow:

```bash
python3 -m pip install -r scripts/requirements-tools.txt
npm run prepare:assets
```

If you replace the VO, recheck all cue and scene timings. Asset preparation never rewrites the original MP3 or subtitle edits. Do not reuse the starter's old fixed 60-second timeline.

## Deliverables

- `out/LifeAsGraphicDesigner_EP01.mp4` — rendered video.
- `out/verification.json` — measurements from the actual final file.
- `out/episode01-subtitles.srt` — exported captions with approximate timings.
- `out/stills/` and `out/contact-sheet.png` — visual review images.
- `out/life-as-graphic-designer-ep01-source.zip` — source, lockfile and all local assets, excluding node_modules and generated renders.

Studio processes do not survive a filesystem snapshot: restart Studio using the preview command in a new task. This project is separate from Content-Craft; its application files are unchanged.
