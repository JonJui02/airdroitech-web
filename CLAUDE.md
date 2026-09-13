# AirdroiTech Website — Revamp 2.0

React/Next.js rebuild of `airdroitech.com`, deployed on Vercel, pointed at the
existing domain. Company: **AirdroiTech Sdn Bhd (1411956P)**, Shah Alam,
Selangor — the Malaysian R&D and software arm of **Polyaire** (Australia's
largest air-conditioning wholesale network).

Products the site exists to explain: **AirTouch** (smart home climate control),
**AirTouch Beam** (retrofits any split-system AC into a Matter smart device),
**PolyPlan** (HVAC CAD and quoting tool for Australian trades).

---

## Non-negotiables

These five rules override any other instruction in this repo. If a task
requires breaking one, stop and ask the user.

### 1. The palette is four colours, sampled from the logo

| Hex | Name | Job |
|---|---|---|
| `#2F7F59` | teal-600 | **Primary.** The only brand green legal for white body text (4.88:1). |
| `#4F9934` | green-600 | Brand mid-tone. Large type, icon fills, gradient midpoint, borders. |
| `#A0D233` | lime-500 | **Accent.** Always carries ink text. One instance per screen. |
| `#8E9093` | grey-400 | Wordmark grey. Structural: borders, dividers, disabled, 18px+ captions. |

Hard fails:

- White text on `#A0D233` — 1.79:1.
- `#A0D233` as a text colour on white — 1.79:1, at any size.
- White text on `#4F9934` at body size — 3.54:1. Use `teal-600`.
- `#8E9093` as body copy — 3.20:1. Use `grey-700` (`#424547`).
- A fifth hue. Semantic red/amber (`bad`, `warn`) are state only, never accents.

Tailwind's default palette is **deleted** in `tailwind.config.ts`, so
`bg-blue-500` does not compile. `npm run brand:check` fails the build on any
off-brand hex. Full criteria: `docs/BRAND.md`.

### 2. The logo does not change

`public/brand/` holds the supplied raster marks. An SVG redraw is a phase-5
deliverable, but the mark itself — shape, proportions, colours — is fixed.

### 3. No element's resting state is invisible

The legacy WordPress site parked sections at `opacity: 0` waiting on a scroll
observer that never fired at 375px, so **whole pages rendered blank on phones**.
That is the single defect this revamp exists to fix.

Content renders visible server-side. Reveal animation is opt-in enhancement
applied after hydration via `.reveal`, capped at 200ms, opacity and 8px
translate only, and skipped under `prefers-reduced-motion`. Never author
`opacity-0` as a resting state. No parallax, no scroll-jacking, no carousels
that hide content behind a gesture.

**Approved exception (user decision, 2026-09-13):** `src/components/ui/Carousel3D.tsx`
may auto-loop and respond to drag, because it keeps these safeguards: it
pauses on hover, focus, touch and when off screen; it has a pause button and
previous/next buttons plus arrow keys; under reduced motion it becomes a still
swipeable row; and every image is in the server HTML. Do not remove a
safeguard, and do not use the pattern anywhere else without asking.

### 4. Every URL stays byte-identical

Ten legacy URLs, all with a trailing slash, all preserved — including the
awkward ones (`/what-we-do/` for About, `/get-in-touch/` for Contact). This is
why `trailingSlash: true` is set. **Never rename a route.** No redirects are
needed at cutover, and that is the point.

### 5. Never touch DNS or apex mail records

`airdroitech.com` routes company email through Proofpoint
(`mxa/mxb-009aec01.gslb.pphosted.com`, SPF `include:spf-009aec01.pphosted.com`).
Every form on this site delivers to `info@airdroitech.com`.

- DNS stays hosted at `ns1/ns2.syd6.hostingplatform.net.au`. **Do not delegate
  nameservers to Vercel.**
- Resend sends from a subdomain (`mail.airdroitech.com`), never the apex.
- No agent in this repo edits DNS. `docs/DNS-CUTOVER.md` is a runbook for a
  human to execute.

---

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js App Router, TypeScript strict, `trailingSlash: true` |
| Styling | Tailwind — brand palette only, semantic CSS vars in `src/styles/globals.css` |
| Content | MDX in-repo. Pages `src/content/pages/`, roles `src/content/roles/` |
| Forms | `/api/contact`, `/api/apply` — Zod, Vercel Blob, Resend, honeypot, rate limit |
| Fonts | `next/font` self-hosted: Archivo (display), IBM Plex Sans (body), IBM Plex Mono |
| Images | `next/image`, AVIF + WebP, explicit dimensions always |
| SEO | Metadata API, generated `sitemap.ts` / `robots.ts` (replaces Yoast) |

There is no CMS and no WordPress dependency. Editing content is a commit.

## Layout

```
src/app/                    routes — names match legacy URLs exactly
src/components/{shell,ui,content,forms,media}
src/content/{pages,roles}   MDX
src/lib/                    brand.ts, schemas.ts, roles.ts, rate-limit.ts
src/styles/globals.css      semantic tokens, light + dark, motion policy
docs/                       BRAND, CONTENT-SKELETON, CLAUDE-DESIGN-PROMPT,
                            DNS-CUTOVER, OPEN-DECISIONS
scripts/brand-check.mjs     CI palette guard
.claude/agents/             governance agents — see below
```

## Performance budget — enforced, not aspirational

| Metric | Legacy | Target |
|---|---|---|
| Homepage transfer | 6,098 KB | **≤ 900 KB** |
| Requests, homepage | 37 | ≤ 25 |
| LCP, mobile 4G | — | ≤ 2.0 s |
| CLS | — | ≤ 0.05 |
| INP | — | ≤ 200 ms |
| Lighthouse mobile, all categories | — | ≥ 90 |
| Webfont families | 3 (1 used) | 2 |

The legacy hero video alone was 4,815 KB and was served to phones. In 2.0 an
AVIF poster is the LCP element; the re-encoded video (target < 1.2 MB) attaches
only above 1024px and never under reduced-motion.

Accessibility floor is **WCAG 2.1 AA**: keyboard reachable throughout, visible
focus on every control, one `h1` per page, labelled fields with inline errors,
44px minimum touch targets, axe clean.

## Content rules

- Mobile-first. Design and verify at **375px** before 1440px. The legacy site's
  failure was being designed at desktop and reflowed down.
- **No placeholder content ships.** The legacy site has live placeholders —
  team members named `MothR` / `FathR` / `STL`, a card with a role but no name,
  headcount counters reading `0` and `1`, a job group called `TBA`. Everything
  marked NEW in `docs/CONTENT-SKELETON.md` is blocked until real content
  arrives. Do not invent figures, names, or job descriptions.
- Privacy page text is **legal copy — ports verbatim**, as real headings, never
  as a collapsed-by-default accordion.
- Copy voice: plain, active, specific. Say what a control does. Legacy grammar
  slips ("Our Engineers have contribute greatly") get fixed, brand phrases
  ("Programming Intelligence", "Be an 'Airdroitechie'", "Quality. Integrity.
  Kindness.") are kept.

## Commands

```bash
npm run dev          # localhost:3000
npm run preflight    # typecheck + lint + brand:check + build — run before every PR
npm run brand:check  # palette guard on its own
```

## Governance agents

Delegate to these rather than doing the work inline. Definitions in
`.claude/agents/`.

| Agent | Use it for |
|---|---|
| `brand-guardian` | Any colour, contrast or logo question. Has veto power. |
| `design-to-code` | Converting an approved Claude Design comp into components. |
| `a11y-auditor` | WCAG 2.1 AA review of a component or page. |
| `perf-budget` | Asset weight, image formats, budget regressions. |
| `content-steward` | MDX copy, placeholder detection, voice. |
| `seo-parity` | URL / metadata parity against the legacy site. |
| `form-security` | Validation, upload safety, PDPA handling. |
| `cutover-guard` | Read-only DNS and launch checks. Never mutates. |

## Current state

Scaffold only. All ten routes exist as stubs; components, MDX content and form
wiring are unbuilt. Visual design is pending — see
`docs/CLAUDE-DESIGN-PROMPT.md`. Nine decisions in `docs/OPEN-DECISIONS.md`
block the content phase.
