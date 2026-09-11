# airdroitech-web

AirdroiTech Sdn Bhd website — **Revamp 2.0**. Next.js on Vercel, replacing the
WordPress + Impreza + WPBakery site at `airdroitech.com`.

## Quick start

```bash
npm install
cp .env.example .env.local
npm run dev
```

`http://localhost:3000`

## Scripts

| | |
|---|---|
| `npm run dev` | Dev server on :3000 |
| `npm run build` | Production build |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint |
| `npm run brand:check` | Palette guard — fails on any off-brand hex |
| `npm run preflight` | typecheck + lint + brand:check + build. **Run before every PR.** |

## Read these before writing code

| | |
|---|---|
| `CLAUDE.md` | The five non-negotiables. Start here. |
| `docs/BRAND.md` | The four-colour palette, contrast table, usage criteria |
| `docs/CONTENT-SKELETON.md` | Block-by-block structure for all ten pages |
| `docs/CLAUDE-DESIGN-PROMPT.md` | Copy-paste brief for the visual design |
| `docs/OPEN-DECISIONS.md` | What is still blocked, and on whom |
| `docs/DNS-CUTOVER.md` | Launch runbook. A human executes it. |

## The five non-negotiables

1. **Four brand colours**, sampled from the logo: `#2F7F59` teal (primary),
   `#4F9934` green (large type / icons), `#A0D233` lime (accent, ink text only),
   `#8E9093` grey (structural). Tailwind's default palette is deleted, so
   `bg-blue-500` does not compile.
2. **The logo does not change.**
3. **No element's resting state is invisible.** The legacy site parks sections at
   `opacity: 0` behind a scroll observer that never fires at 375px, so whole
   pages render blank on phones. That is the defect this rebuild exists to fix.
4. **Every URL stays byte-identical.** Ten legacy URLs, trailing slashes
   included. Never rename a route.
5. **Never touch DNS or apex mail records.** Company mail runs through
   Proofpoint; every form delivers to `info@airdroitech.com`.

## Governance agents

`.claude/agents/` — delegate rather than working inline.

`brand-guardian` · `design-to-code` · `a11y-auditor` · `perf-budget` ·
`content-steward` · `seo-parity` · `form-security` · `cutover-guard`

Commands: `/preflight` · `/design-import` · `/new-role` · `/launch-check`

## Status

Scaffold. All ten routes exist as stubs with their content blocks documented
in-file. Components, MDX content and form wiring are unbuilt. Visual design
pending. Seven decisions in `docs/OPEN-DECISIONS.md` block the content phase.

## Assets still needed

Drop into `public/brand/`:

- `AirdroiTech-Logo-header.png` (714×171) and `AirdroiTech-Logo-Stack.png`
  (800×600), from the current site
- An SVG redraw of the mark — phase 5
- The hand-holding-phone contact illustration
- Re-encoded hero video, target < 1.2 MB (legacy is 4,815 KB)
