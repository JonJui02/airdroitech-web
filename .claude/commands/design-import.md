---
description: Convert an approved Claude Design comp into components for one page
argument-hint: <page-name> [path-or-url-to-comp]
---

Convert an approved design comp into code for: **$ARGUMENTS**

Before starting, confirm the user has **approved** this comp. If they have not
said so, ask — this command is for sign-off output, not exploration.

Steps:

1. Read `docs/CONTENT-SKELETON.md` for the named page and list the blocks the
   comp must cover. Report any block in the skeleton that the comp does not
   address, and any element in the comp that the skeleton does not call for.

2. Hand the comp to `brand-guardian` for a palette and contrast pass **before**
   any code is written. If it returns a `BLOCK`, stop and report — an off-brief
   comp must not become code.

3. Hand it to `design-to-code` to build from the fixed component kit. Reuse
   before creating; extend a component with a prop before adding a file.

4. Review the result with `a11y-auditor` and `perf-budget`.

5. Run `npm run preflight`.

6. Report: files changed, kit components reused, anything you could not build
   faithfully and why, and the agents' findings.

Hard stops — report and do not proceed:
- a colour outside the four-colour palette
- white text on `#A0D233`, or on `#4F9934` below 24px regular / 18.7px bold
- any element whose resting state is invisible
- a route rename
- placeholder names, invented headcounts or invented job descriptions
