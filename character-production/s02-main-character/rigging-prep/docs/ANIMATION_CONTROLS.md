# Recommended performance controls — planned, not implemented

Visual identity is approved and locked. Expression target authoring, full rigging and export have **not** been authorized or implemented by TASK07. `animation-controls.json` is an unbound recommendation contract; all implementation bindings are null/empty. It is not a working controller or animation clip.

## Required facial performances

| Performance | Suggested controls | Neutral-preservation rule |
| --- | --- | --- |
| neutral | All face weights 0; gaze 0; original transforms restored. | Exact approved eye/brow/mouth/skin Basis, not a newly sculpted neutral. |
| senang | Smile ~.40, eye squint ~.12, brow raise ~.08. | Restrained smile and lid change; no new cheek/jaw shape. |
| kaget | Brow raise ~.55, eye-wide ~.20, small mouth-open ~.50. | Preserve original eye spacing and face proportions. |
| mikir | Left/right brow tilt ~.20/-.10, thoughtful mouth ~.25. | Subtle asymmetry; gaze/head/hand support remains separate future posing. |
| semangat | Smile ~.65, mouth-open ~.15, squint ~.12, brow raise ~.15. | Controlled combined weights; not a new energetic character design. |
| blink | Global blink 0..1; optional left/right blink. | Close lid/white/pupil/glint together. No eye-white or highlight leaks at full closure. |
| eye direction | Head-local horizontal/vertical gaze -1..1. | Pupils/glints move together, remain inside measured white bounds; no eye spacing change. |
| subtle mouth | Smile/open/thought targets 0..1 and restrained lateral offset. | Original minimal line at zero; no lip-sync/viseme system assumed. |

These numeric weights are proposed starting values, not rendered/approved endpoints. The original approved concept's expression strip is the authority for target review. A preset must not silently add gaze, recoloring or facial proportions.

## Implementation recommendation after rig approval

Use independent head-attached feature transform nodes for gaze and small brow motion. Use fixed-topology lid/mouth morphs with original neutral Basis and stable glTF vertex order. Current mouth is an 8-vertex thin line mesh: it does not already provide smile/open topology. Author minimally necessary compatible morph topology on a later technical duplicate and prove the Basis neutral surface unchanged. Do not claim arbitrary expression targets work simply because the neutral mesh is closed.

Blink should close the eye region predictably, suppressing pupil/glint leaks and overriding eye-wide. Prefer a lid/white morph solution over exact zero-scale hacks or Blender-only shader drivers. If a tiny-scale node fallback is proposed, clamp away from singular scale and test export; it is not implemented here.

Compute directional gaze limits from actual head-local pupil/glint vs white bounds, independently in each direction. Use roughly 80% of available margins as the initial clamp; the approved pupil is not perfectly centered inside its white, so one symmetric travel number is unsafe. Maintain feature-plane depth offsets to avoid z-fighting.

## Body support controls

Planned controls include head pitch/yaw/roll, chest/torso lean, subtle deterministic breath, bilateral shoulder/elbow/wrist FK, hip/knee/foot FK and a coarse hand-grip/optional thumb motion. Actual angular limits are **unset** until joint placement/clearance tests. The current palm has no independent fingers; do not imply individual finger typing is available.

Every frame must start from a known neutral/reset state and evaluate at absolute Remotion frame time. Clamp weights, normalize competing mouth morphs, and combine per-side blink with the global blink. No wall-clock time, cumulative delta, random blink schedule without an explicit seed, or unbaked Blender drivers.

Required later review: all five expression endpoints, blink open/closed transitions, gaze limits, small-mouth changes, zero-state recovery, head/hood clearance, and deterministic replay under arbitrary frame order. No expression or acting animation is produced in TASK07.
