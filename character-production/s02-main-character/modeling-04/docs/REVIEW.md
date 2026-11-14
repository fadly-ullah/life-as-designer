# TASK 05 / Model 04 visual review

**UNAPPROVED — user review required. No rigging, animation or export authorization is implied.**

Reference priority: original approved PNG, editable Model03, then Model03 evaluation images. Source Model03 commit is `50e9b4ad13eb88d729d74732666c72d4a4ba6d88`. Matched Model03 baseline renders are generated inside Model04 only. Images of the approved turnaround are preserved as original crops, uniformly enlarged without recoloring or stretching.

Status definitions: MATCH = defining feature agrees; PARTIAL = identity retained with visible differences; MISMATCH = local shape departs substantially; UNVERIFIED = evidence insufficient. These labels are evaluation findings, not approval.

| Aspect | Status | Finding |
| --- | --- | --- |
| Core identity/outfit | MATCH | Same dark layered voxel hair, cream hoodie, charcoal trousers and olive/lime shoes. Original face components retained. |
| Front silhouette | PARTIAL | Wider skull/hair and hoodie, shorter legs reduce slim/tall impression. Stepped front fringe has a stronger angular outline and no longer reads as thin separated strips. Head/outfit widths and leg length still differ from small approved turnaround. |
| Side silhouette | PARTIAL | Fewer separated locks; broad irregular side steps connect front/temple/rear. Compact hoodie and thinner shoe stack improve profile. Side hair now has flatter broad planes and partly obscures the ear; this is a new trade-off, not full matching. Knee contour still bends more than approved side view. |
| Three-quarter silhouette | PARTIAL | Hair front joins side more strongly; wider torso/head improves identity mass. Jaw is more square. Eyes retain exact original sizes, so now read smaller relative to skull. Side panel-to-crown rhythm remains different from concept. |
| Back silhouette | PARTIAL | Original Model03 broad rear layers retained and widened; cuff/torso gain volume; hood remains compact. Wider new side panels change outer contour and their junction with back is still more slab-like than concept. |
| Facial identity | MATCH for component retention; PARTIAL for visual likeness | Eyes, brows, pupils, glints, blush, minimal mouth and nose preserve centered vertex geometry; only lateral position/upper-body translation changes. Jaw corners are sharper and lower jaw broader. This does not establish exact face/concept equivalence. |
| Hoodie | PARTIAL | More compact oversized mass, lower collar and open front U rim, retained folded lips/strings/accents. Collar fold profile remains less like approved shallow V; cuffs/sleeve transitions and pouch detail are still simplified. |
| Proportions | PARTIAL | Approximately 3.52 crown-to-chin head heights. Width changes make silhouette less slim. Concept illustrations are not mutually exact orthographic measurements; no exact pixel-proportion match claimed. |
| Shoes | PARTIAL | Toe box and outsole thinner; existing length/ankle/tongue preserved. Upper assembly seated down .014 to prevent new sole gap. Original toes remain boxy and outline differs from concept detail tile. |
| Palette vs Model03 | MATCH (technical) | Material datablocks, node inputs/links and retained mesh material slots are checked unchanged. Lighting, world and color management identical. |
| Exact concept-render color appearance | UNVERIFIED | Concept has warm cinematic rim light and different exposure/background. No palette change justified; no color edits made. |

## New mismatches / trade-offs disclosed

1. Joining side locks gives larger, flatter stepped side planes. This improves cohesion but can look too slab-like, especially in side/back views. Do not treat reduced block separation as exact concept matching.
2. Wider square skull changes apparent face proportions. Original eyes remain the same size by design and can look too small relative to the new width. User review must choose whether head width or feature placement needs a smaller correction next; no replacement face has been introduced.
3. The open U rim eliminates the old full front ring, but the remaining two lips do not reproduce the concept collar fold perfectly. Front neckline is still an interpretation.
4. Mild knee bend and a relatively tall leg impression remain. They are visible in the matched sheets; no per-model re-framing hides them.

## Minimal next decisions, after review only

1. Confirm head/hair width and square jaw across front and three-quarter before adjusting any face feature.
2. If side planes are too broad, offset or subdivide only a small portion of the new side step into unequal tiers, preserving current connected silhouette and existing hair mass.
3. Tune collar lip angles/neck clearance and sleeve step widths after primary silhouette decision.
4. Consider a small residual knee/leg correction only after body width and head scale are accepted. Do not chase head-height numbers by stretching geometry.

## Technical limits

Individual closed components are retained; material equality and camera equivalence do not certify a deformation-ready mesh. Non-manifold/degenerate-face checks are per object, not a complete inter-object collision or self-intersection certificate. Low sample renders retain noise. Concept close-ups are enlarged from low-resolution source regions; enlargement does not create details. No actual MacBook Air M1 benchmark was run.

Stop here: Model04 source, evaluation renders and comparisons only. No approval claim, rig, facial rig, animation, GLB/GLTF, episode production or merge to main.
