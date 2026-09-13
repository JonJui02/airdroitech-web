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
| `#A0D233` | **1.79:1 NEVER** | **1.79:1 NEVER** | **9.89:1** PASS AAA |
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

### Chrome, light theme

Brand-guardian ruling, 2026-09-13. The header, footer, drawer and homepage
console used to be dark in both themes; they now follow the theme through
`--chrome-*` variables. Ratios are recomputed, against the ground each colour
actually sits on (`#F7F9F8` ground, `#EDF2F0` plate, `#DFE7E4` rail). Grounds re-tinted toward the greens on 2026-09-13 — pure white read as too stark.

| Role | Dark | Light | Light ratio |
|---|---|---|---|
| Ground | `#0E1411` | `#F7F9F8` | — |
| Plate | `#161E1A` | `#EDF2F0` | surface only |
| Rail | `#0A0F0D` | `#DFE7E4` | surface only |
| Line | `#232D28` | `#D6D9DB` | decorative divider |
| Hover fill | `#1C2621` | `#E6F0EB` | ink on it 15.18:1 |
| Grid / dial groove | `#1A231F` | `#74777A` | 3.58–4.26:1 |
| Meta labels | `#8E9093` | `#5A5D60` | 5.24–6.27:1 |
| Ink | `#EAEEEB` | `#131A17` | 13.98–16.72:1 |
| Body | `#C3CBC6` | `#424547` | 7.64–9.14:1 |
| Border | `#45564C` | `#2F7F59` | 4.62:1 on ground |
| **Link** (text, focus, hover border) | `#A0D233` | `#235E42` | 6.04–7.22:1 |
| **State** (dots, ticks, dial, progress — never text) | `#A0D233` | `#5E7C1E` | 3.81–4.54:1 |

**Testable rules:**

- Lime (`#A0D233`) never sits on a light chrome ground as text, border or
  focus ring — 1.79:1. Use `chrome-link`. The lime *field* (lime fill with ink
  text, 9.89:1) is unchanged in both themes.
- `chrome-state` clears 3:1 but not 4.5:1 on plate and rail. It is never a
  text colour.
- `grey-400` is not the light dial groove: 2.96:1 on the plate. Use `grey-500`.
- The homepage h1 gradient is dark-theme only. Clipped to glyphs, its lime end
  is 1.79:1 on white, below even the 3:1 large-text floor; light renders ink.
- Theme branching goes through the CSS-variable cascade, never Tailwind
  `dark:` — `darkMode` is keyed to `[data-theme]`, so `dark:` never fires for
  a visitor on OS-dark who has not used the toggle.

- Section eyebrows use `--eyebrow`: teal-700 `#235E42` in light (6.04:1 worst,
  on the tint band), today's grey `#8E9093` in dark. Headings, feature titles
  and body copy stay ink/grey — green text signals labels and links only.
- Light "Intelligence" is a two-stop teal→green sweep (`#2F7F59`→`#4F9934`).
  Worst stop is 3.35:1 on the ground — legal only as large display text. It
  is not the three-stop brand gradient and does not spend that budget.
- `--line-strong` `#8E9093` clears the new ground at only 3.03:1 and FAILS on
  plate, tint and hover fills. Never pair it with those; use `--muted`.

Known pre-existing issue, not introduced here: in dark, `chrome.border`
`#45564C` on `#0E1411` is 2.39:1, below the 3:1 non-text floor.

### Heading accent words

Brand-guardian ruling, 2026-09-13. The "Programming **Intelligence**" idea —
ink word plus green word — carried to other headings.

| Token | Light | Dark | Worst ratio |
|---|---|---|---|
| `--heading-accent` (site pages) | `#235E42` teal-700 | `#8FC4AC` teal-300 | 6.04:1 light (tint band), 8.18:1 dark |
| `chrome-accent` (console) | `#235E42` | `#8FC4AC` | 6.07:1 light (rail), 8.63:1 dark |

No minimum size: both clear 4.5:1 on every ground a heading sits on.

**Rules:**

- Solid colour only. The gradient (`.brand-sweep-text`) stays the page's one
  hero moment.
- One accent word or short phrase per heading, h1 and h2 only — never h3,
  card or feature titles.
- One or two accented headings per page, on the headings that carry the argument.
- A green eyebrow and a green heading word in the same block cancel each other
  out. Where a heading takes an accent, that block's eyebrow goes back to grey.
- Dark accents are NOT lime: lime is the link and focus colour, so a lime heading
  word reads as clickable.
- Never `--green` `#4F9934` for accent words: 2.80:1 on the light tint band.

**No-accent zones:** the Career room heading on the lime field (no value passes
there — teal-700 is 4.27:1, teal-300 1.10:1); legal and privacy headings; any
heading that carries a status.

Also from this ruling: the dark primary hover `#3C9B6D` was never an approved
hex; it is now `#48A87A` (teal-400).
