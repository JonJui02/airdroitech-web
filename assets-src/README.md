# assets-src

Original supplied artwork. **Not served** — nothing here is deployed.

The product and illustration files were matted on white. On 2026-09-13 the
user asked for the original backgrounds back, so `public/` now holds these
originals re-encoded to WebP at the same paths, backgrounds untouched.
`scripts/matte-cut.mjs` is kept in case transparent cut-outs are wanted again. These originals stay so the cut can be re-run with a
different tolerance, or redone if a better source arrives.

```bash
node scripts/matte-cut.mjs assets-src/projects/airtouch.jpg
```

The script writes its output next to the input, so copy a file into `public/`
first, or move the result there afterwards.

`illustration/adt-smarhome-logo-3d.jpg` is here and unused: its house icon and
chip are blue and the node caps lavender, which is a fifth and sixth hue in
what reads as brand artwork — against non-negotiable #1 in CLAUDE.md. It needs
a ruling before it can ship.
