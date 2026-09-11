---
description: Full gate check before a PR — typecheck, lint, brand guard, build, then agent review
---

Run the full pre-PR gate for the AirdroiTech site and report the result.

1. Run `npm run preflight` (typecheck + lint + brand:check + build). If anything
   fails, stop and report the failure — do not continue to the review agents.

2. Report the build's route table and flag any route whose First Load JS grew
   since the last known figure.

3. Launch these reviewers in parallel on the current diff, and relay only what
   matters from each:
   - `brand-guardian` — palette and contrast
   - `a11y-auditor` — WCAG 2.1 AA
   - `perf-budget` — asset weight against the budget
   - `content-steward` — placeholder sweep and copy voice
   - `form-security` — only if anything under `src/app/api/` or
     `src/lib/schemas.ts` changed
   - `seo-parity` — only if a route or any metadata changed

4. Finish with a single verdict: `READY` or `NOT READY`, listing the blocking
   items by file and line. Any `BLOCK` from any agent means `NOT READY`.

Do not fix anything unless asked. This command reports.
