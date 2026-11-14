# Identity lock and preservation — TASK07

## Approval scope

The user explicitly approved and locked polished Model04 from branch `feature/s02-character-model04-final-polish`, commit `aff455385918d8cb13d72123af824156bd771e6a` for Season02 production identity. This is now the rigging-prep source of truth alongside the original approved concept PNG.

Historical source files/reports retain their old UNAPPROVED labels untouched as part of rollback preservation. New `identity-lock.json` and scoped prep-file properties record the TASK07 decision: **identity approved/locked; full rigging and export not yet approved**. No rig quality or final animation approval is inferred.

## Exact neutral preservation

- All **110 character meshes**, plus the existing stage floor, keep identical raw coordinates, edges, polygon indices, smoothing flags, UV data, material slots, modifier properties, world transforms and render visibility.
- All evaluated world-space vertex coordinates, triangle indices and corner normals also match exactly after reopening the saved prep file.
- All 21 material datablocks' node inputs/links, stage light/world/color management and unit scale are unchanged.
- There are no new/removed mesh objects, no vertex welding, new topology, silhouette change, proportions change, facial/hair/clothing changes or brand recoloring.
- Parent relationships change only through twelve identity-transform static regional containers under the original character root. Nineteen hidden empty landmarks are unbound and do not affect rendering.
- A single neutral three-quarter render at the same 640×800, 48-sample Cycles CPU settings is **RGB pixel-identical** to the approved polished render: 0 changed pixels, maximum channel difference 0/255. This is not an animation or Episode01 render, and is not evidence of pose/deformation readiness.

Machine details: `identity-preservation.json`, `neutral-render-verification.json`, `hierarchy-bindings.json` and `source-preservation.json`. Comparison image: `../evaluation/identity-preservation-comparison.png`.

## Source hashes

Locked approved Blender SHA256:
`207c65282e563de9bb5d13cd1d92b6d603f5664e52b6d6726a274010c31c26ef`

`source-preservation.json` checks original Model01/02/03/04/polished Blender sources and approved PNG byte-for-byte against the approved Git commit. Repository scope verification excludes only the new `rigging-prep/` directory; no other tracked source, Season01 asset or Episode01 code change is allowed.

The prep .blend file hash differs because it contains new static hierarchy and scoped metadata; identity is proven by raw/evaluated mesh/material checks, not by claiming the two entire .blend binaries are identical.
