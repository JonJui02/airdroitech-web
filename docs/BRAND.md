# Brand — AirdroiTech Revamp 2.0

The palette is **four colours**, sampled by pixel count from the logo artwork
(`public/brand/AirdroiTech-Logo-Stack.png` 800×600 and
`AirdroiTech-Logo-header.png` 714×171). Nothing is added and nothing is
substituted. Every tint, shade and neutral in the system derives from these four.

## The four

| Hex | Token | Logo element | Role |
|---|---|---|---|
| `#2F7F59` | `teal-600` | cloud, teal band | **Primary** — buttons, links, primary surfaces |
| `#4F9934` | `green-600` | cloud, mid green | Brand mid-tone — large type, icons, gradient midpoint, borders |
| `#A0D233` | `lime-500` | cloud, lime | **Accent** — the one highest-value action, active and focus states |
| `#8E9093` | `grey-400` | "AirdroiTech" wordmark | Structural neutral — borders, dividers, disabled, 18px+ captions |

Ink is `#131A17`, a green-tinted near-black, so headings stay in the family.

### On the five codes originally supplied

The brief listed five values, but only two were distinct and one was malformed:
`#8e9093` is valid, `#a0d233c` has seven hex digits and cannot resolve, and items
3, 4 and 5 repeated `#a0d233`. Sampling the logo settles it — the mark contains
exactly four colours, and `#a0d233c` was a typo of the lime. The two greens the
brief omitted, `#2F7F59` and `#4F9934`, are both in the logo and together account
for more of it than the lime does.

## Contrast

WCAG 2.1 relative luminance, against `#FFFFFF` and ink `#131A17`.

| | white text on it | as text on white | ink text on it |
|---|---|---|---|
| `#2F7F59` | **4.88:1** PASS AA | **4.88:1** PASS AA | 3.35:1 FAIL |
| `#4F9934` | 3.54:1 large only | 3.54:1 large only | 4.63:1 PASS AA |
| `#A0D233` | **1.79:1 NEVER** | **1.79:1 NEVER** | **9.17:1** PASS AAA |
| `#8E9093` | 3.20:1 large only | 3.20:1 large only | 5.11:1 PASS AA |

"large only" means the pair clears 3:1 — legal at 24px regular / 18.7px bold and
for non-text UI (icons, borders, focus rings) — but it fails the 4.5:1
body-text threshold.

`#2F7F59` is the only brand green that carries white text at body size. That is
why it is the primary and not `#4F9934`, which is the colour the legacy site
leans on hardest and whose white-on-green buttons already fail AA.

### Contrast, dark ground

Applies to any surface that is dark by design regardless of theme —
`chrome.ground #0E1411`, `chrome.rail #0A0F0D`, `chrome.plate #161E1A` —
measured by WCAG 2.1 relative luminance:

| Grey | vs `#0E1411` | Legal as text on dark? |
|---|---|---|
| `#8E9093` grey-400 | **5.82:1** | **Yes, any size.** Floor for text on dark chrome. |
| `#74777A` grey-500 | 4.14:1 | No. Structural / non-text only (borders, ≥3:1 UI). |
| `#5A5D60` grey-600 and darker | <3:1 | No, at all, for anything, on dark. |

**Testable rule:** on a dark ground, `grey-400` (`#8E9093`) is the darkest grey
permitted to carry text, at any size. `grey-500` and darker are structural-only
there.

This is independent of the light-ground "large only" exemption for `#8E9093`
above — that exemption exists because `#8E9093` clears just 3:1 on white, and it
is a light-ground fact that does not transfer. The luminance direction reverses
on dark, so a grey's rating on white says nothing about its rating on
`#0E1411`.

Separately: mono micro-labels below 18.7px bold / 24px regular — eyebrows,
column labels, legal rows, everything in this repo runs 11.5–12.5px — never
qualify for the large-text 3:1 allowance on *either* ground. They always need
4.5:1.

Any new literal dark surface added to the `chrome` palette must have every grey
re-measured against it before shipping. This rule exists because
`chrome.meta` shipped as `#74777A` and measured 4.13:1 on `#0E1411` — it was
assumed legal by analogy to its light-ground rating, and axe caught it on every
route.

## Usage criteria

| Surface or element | Colour | Rule |
|---|---|---|
| Primary button, filled | `#2F7F59` bg / white text | The only compliant filled-green button. Hover `#235E42`, active `#1A452F`. |
| Accent / conversion button | `#A0D233` bg / `#131A17` text | The single highest-value action per page. Never two on one screen. |
| Secondary button | `#2F7F59` 1.5px border / `#235E42` text | Transparent fill. Hover fills `#EEF7F2`. |
| Body copy | `#424547` on white | 9.6:1. Brand grey is never body text. |
| Headings | `#131A17` | 16.4:1. |
| Inline links | `#235E42`, underlined | 7.1:1. Plain `#2F7F59` is legal but thin at 15px. |
| Active nav, focus ring, progress | `#A0D233` | Lime is the state colour. |
| Eyebrows, meta, captions | `#5A5D60` | Derived from brand grey, clears 4.5:1. |
| Borders, dividers, inputs | `#D6D9DB` / `#8E9093` | Light rule for structure; brand grey where a border must assert itself. |
| Disabled controls | `#8E9093` on `#E9EBEC` | Brand grey's natural home. |
| Icons, line art | `#2F7F59` or `#4F9934` | Legal — non-text UI at 3:1. |
| Gradients | teal → green → lime | See below. |
| Charts, zone diagrams | the three greens, dark to light | `#123122 → #2F7F59 → #4F9934 → #A0D233`. Monotonic in lightness, survives greyscale. |
| Success / warning / error | `#235E42` / `#8A6212` / `#A33B2E` | **Semantic only.** Never an accent. The red is deliberately desaturated so it never competes with lime. |

## The brand gradient

```css
linear-gradient(100deg, #2F7F59 0%, #4F9934 52%, #A0D233 100%)
```

Available as `bg-brand-sweep`. The logo's cloud runs teal into green into lime,
so this is the mark unrolled, not an invention.

- Ink text only. Never white — the lime end kills white contrast.
- At most **one instance per page**: a hero wash, a section edge, or a 4px top
  rule on one card.
- Never behind running text.

## Derived ramps

**Teal** (primary) — `#123122` `#1A452F` `#235E42` `#2F7F59` `#8FC4AC` `#D7EBE1` `#EEF7F2`

**Green** — `#2C5A1D` `#3C7628` `#4F9934` `#9CCB87` `#DDEDD3` `#F0F7EB`

**Lime** (accent) — `#5E7C1E` `#A0D233` `#DDEFAF` `#F4FAE4`

**Neutrals**, pulled off `#8E9093` rather than a generic grey so the whole scale
keeps the wordmark's faint cool cast — `#F5F6F7` `#E9EBEC` `#D6D9DB` `#B9BDC0`
`#8E9093` `#74777A` `#5A5D60` `#424547` `#2B2E30` `#131A17`

## Do / do not

**Do**

- Let deep teal carry the interface. It is the workhorse and the only brand green
  that is text-legal.
- Spend lime once per screen, on the action you most want clicked.
- Put ink, never white, on lime.
- Use brand grey structurally — rules, borders, disabled, 18px+ captions.
- Order the three greens dark-to-light whenever they appear together, mirroring
  the logo.

**Do not**

- White text on `#4F9934` at body size (3.54:1). The legacy site's buttons
  already fail this.
- Lime as a text colour on white, at any size.
- Brand grey as body copy — use `#424547`.
- Introduce a fifth hue. Semantic red and amber are the only non-brand colours
  and they are state, not accent.
- Stack all three greens inside one card. They read as a gradient fault, not a
  hierarchy.

## Dark theme

Roles rotate; values are not inverted.

| | Light | Dark |
|---|---|---|
| ground | `#F5F6F7` | `#0E1411` |
| surface | `#FFFFFF` | `#161E1A` |
| ink | `#131A17` | `#EAEEEB` |
| body | `#424547` | `#C3CBC6` |
| link / focus | `#235E42` | **`#A0D233`** |
| primary fill | `#2F7F59` | `#2F7F59` |

Deep teal is too dark to carry interactive weight on a dark ground, so **lime
takes over as the link and focus colour**. Dark surfaces are green-tinted so the
dark mode stays in the family rather than reading as a generic dark theme.

Every colour is declared in the bare `:root` block in
`src/styles/globals.css` before any media query or `[data-theme]` block
redefines it. A colour whose only definition sits inside one of those blocks
never applies in the un-stamped "system" state — that is the classic unreadable
page bug.

## Typography

| Role | Face | Weights | Used for |
|---|---|---|---|
| Display | Archivo | 600, 700 | H1–H3, product names, counter numerals |
| Body | IBM Plex Sans | 400, 500, 600 | Running text, nav, buttons, form labels |
| Mono | IBM Plex Mono | 400, 500 | Eyebrows, specifications, hex values, table keys |

Self-hosted via `next/font` — no runtime Google Fonts request. Two families, not
the legacy site's three (Inter, Lato and Open Sans loaded; only Inter applied).

Scale, 1.25 ratio, fluid via `clamp()`: 12 / 13.5 / 15.5 / 17.5 / 21 / 26 / 33 /
41 / 52. Body 15.5px at 1.62 line-height, measure capped near 68ch. Headings get
`text-wrap: balance`; uppercase mono eyebrows get `0.12em` tracking.

*If a formal brand guideline exists that specifies a typeface, it overrides this
table — see `docs/OPEN-DECISIONS.md`.*

## Enforcement

- `tailwind.config.ts` **replaces** Tailwind's colour palette rather than
  extending it, so `bg-blue-500` does not compile.
- `npm run brand:check` fails on any off-brand hex or any class from a deleted
  palette.
- `src/lib/brand.ts` holds the values and ratios in code.
- `.claude/agents/brand-guardian.md` has veto power on palette questions.

A genuinely new token must be added to **four places at once**:
`tailwind.config.ts`, `src/styles/globals.css`, `src/lib/brand.ts`, and the
approved set in `scripts/brand-check.mjs`.
