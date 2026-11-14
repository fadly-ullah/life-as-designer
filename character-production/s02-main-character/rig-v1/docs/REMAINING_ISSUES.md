# Rig v1 validation and remaining deformation issues

**Overall: FUNCTIONAL V1 / PARTIAL DEFORMATION QUALITY / NOT PRODUCTION-READY.** No failed/partial pose has been removed, repainted or replaced. All actual Blender frames are retained, with side views exposing elbow and seated issues.

## Tested body poses

| Test | Result | Evidence / limit |
| --- | --- | --- |
| Neutral standing | PASS within documented numeric tolerance | Raw locked geometry/Basis unchanged. Render RGB not identical; metrics below. |
| Head yaw +25 / -25 | PASS tested range | Head/hair/details remain rigid; no visible new hair/hood penetration in tested views. Not certification at all angles. |
| Arm raised 80 degrees | PARTIAL | Shoulder/sleeve follow correctly; cap fold/flattening remains. Maximum body edge stretch ~1.145×. |
| Elbow bent 85 degrees | PARTIAL / refinement blocker | Inner elbow pinches and sleeve/torso overlap increases. Maximum body raw-edge stretch ~1.819×. Side view retained. |
| Torso forward lean 15+8 degrees | PARTIAL | Torso/pouch/cords follow, upper-body contacts change; arms may crowd hips. Max body stretch ~1.188×. |
| Seated thighs -85, knees +90, feet -5 degrees | PARTIAL / refinement blocker | Hip/knee volume pinches with sparse trouser rings; seated contour is too compressed. Shoes grounded by root correction; no chair or episode set constructed. Max body stretch ~1.683×. |
| Mouse reach, upper arm -18 / elbow -72 degrees | PARTIAL | FK puts hand forward at working height. Elbow sleeve stretches (~1.750×); rigid hand has no articulated fingers or actual mouse grasp/prop constraint. No mouse/desk scene fabricated. |
| Root, all bones and foot/hand offsets | Functional numerical checks | All 20 bones move bound geometry; root move/rotation verified. Small positional offsets tested; no IK/foot-lock claim. |
| Neutral restoration | PASS | After tests, reset exactly recovers rigged-neutral evaluated vertices, maximum error 0.0. All facial properties reset to 0. |

Triangle surface-contact screens are included for sleeve/torso, head-shell/hood, cuff/palm and trouser/shoe pairs. Rest overlap is intentional in many voxel parts; changed triangle counts are **not penetration depth**. Elbow sleeve/torso screen increases on R from 69 to 86 triangle pairs; mouse reach to 83. Head-shell/hood stays 0 at tested yaw/lean. Hair/hood was also inspected visually; this screen is not an exhaustive all-hair collision certificate. Trouser/shoe contacts remain during seated test (29 → 26 surface pairs), but no conclusion of stable animated foot contact is made.

## Facial tests

All five expression endpoints, global blink open/closed, horizontal and vertical gaze limits are rendered. Independent blink, signed brow/mouth/gaze controls also pass driver activation tests. All 47 drivers evaluate successfully; all eye-direction extremes keep pupil/glint inside neutral white bounds numerically.

- Blink fully closes to a dark voxel line; no white/highlight leak observed in the tested closed render. The open frame is an exact copy of facial neutral, clearly labeled. The original static skin eyelid strip remains above the closed line and can read as an extra crease in close-up; it is not a white/glint target leak.
- Horizontal gaze is readable. Vertical gaze is intentionally narrow because the locked pupil nearly fills the white height; it may be difficult to see at small mobile size.
- Senang and semangat are distinguishable by mouth size/brow level in close-up, but remain visually close. The 180×225 head-shot thumbnail sheet is included. **Full-body Reels readability and acting performance are not approved/certified.**
- Existing minimal eight-vertex mouth produces an angular/trapezoid smile and blocky open shape. It is functional and stylistically voxel, but not a curved smile or speech rig. Do not silently redesign the neutral mouth to improve it.
- Combined extreme expression/gaze/head poses, asymmetric wink with large head angles and temporal blink curves are not exhaustively stress-tested. No finished acting animation is claimed.

## Neutral identity evidence

- All original raw vertices/faces/matrices/material assignments unchanged; every facial Basis is the exact locked neutral.
- Maximum evaluated world-space vertex error against approved neutral: ~0.00000126036 units, attributable to numerical skin evaluation; no intended silhouette change.
- Same camera/light/color management, 640×800 at 48 samples: **527/512,000 changed RGB pixels**, maximum channel difference **14/255**, mean absolute channel difference **0.00076888/255**. Not pixel-identical. Tiny floating-point edge changes and sampling can affect boundary pixels; diagnostic ×16 difference image is supplied, not concealed.
- Neutral design is retained within these technical limits; this report does not issue new production rig approval.

## Required next work before a production rig/export claim

1. Improve elbow and seated hip/knee weighting/support while retaining the locked neutral; any extra technical loops must remain isolated and be documented with neutral parity.
2. Refine shoulder fold and test hood/hair, cuff/hand and shoe/trouser contacts through wider ranges and combined poses. No collision correction/IK foot planting exists yet.
3. Review facial endpoints and mobile legibility with the user; adjust performance targets only, preserving approved neutral.
4. Add/verify practical joint limits or animator guidance. Current FK transforms are free; poses beyond tested ranges can fail.
5. After explicit GLB approval, stabilize modifier/normal/morph vertex order on an export duplicate, bake Blender-only control drivers, validate skin/morph channels and run glTF/Three.js parity/seek tests.

No export, integration, Episode01 code changes, episode animation, merge to main or production-ready claim is included. Stop after this functional rig evaluation.
