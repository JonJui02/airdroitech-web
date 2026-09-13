/**
 * The four locked brand colours, sampled by pixel count from
 * public/brand/AirdroiTech-Logo-Stack.png and AirdroiTech-Logo-header.png.
 *
 * Contrast ratios are WCAG 2.1 relative luminance against #FFFFFF and the
 * ink token #131A17. "largeOnly" means the pair clears 3:1 — legal at 24px
 * regular / 18.7px bold and for non-text UI, but it FAILS the 4.5:1 body
 * text threshold.
 *
 * Consumed by scripts/brand-check.mjs. Do not edit values without a brand
 * sign-off — see .claude/agents/brand-guardian.md.
 */

export const BRAND = {
  teal: '#2F7F59',
  green: '#4F9934',
  lime: '#A0D233',
  grey: '#8E9093',
} as const;

export const INK = '#131A17';

export const CONTRAST = {
  '#2F7F59': { onWhite: 4.88, whiteOn: 4.88, inkOn: 3.35, bodyText: true },
  '#4F9934': { onWhite: 3.54, whiteOn: 3.54, inkOn: 4.63, bodyText: false },
  '#A0D233': { onWhite: 1.79, whiteOn: 1.79, inkOn: 9.89, bodyText: false },
  '#8E9093': { onWhite: 3.2, whiteOn: 3.2, inkOn: 5.11, bodyText: false },
} as const;

/** Pairings that are forbidden outright, at any size. */
export const FORBIDDEN_PAIRS = [
  { fg: '#FFFFFF', bg: '#A0D233', ratio: 1.79, why: 'white on lime is illegible' },
  { fg: '#A0D233', bg: '#FFFFFF', ratio: 1.79, why: 'lime is never a text colour on white' },
  { fg: '#FFFFFF', bg: '#4F9934', ratio: 3.54, why: 'white on signal green fails AA at body size — use teal-600' },
  { fg: '#8E9093', bg: '#FFFFFF', ratio: 3.2, why: 'brand grey is never body copy — use grey-700 #424547' },
] as const;

/** Sequential scale for charts and zone diagrams. Monotonic in lightness. */
export const SEQUENTIAL = ['#123122', '#2F7F59', '#4F9934', '#A0D233'] as const;

/**
 * Chrome surfaces (header, footer, drawer, homepage console) by theme.
 *
 * These back the --chrome-* CSS variables in globals.css, which tailwind.config.ts
 * exposes as chrome.*. Light values and every ratio below are brand-guardian's
 * ruling of 2026-09-13, recomputed from WCAG 2.1 relative luminance. All light
 * hexes are already in scripts/brand-check.mjs's APPROVED set.
 *
 * `link` carries text, focus rings and hover borders; it must hold 4.5:1.
 * `state` is passive non-text only (dots, ticks, dial arc, progress); it holds
 * 3:1 but NOT 4.5:1 on plate/rail, so it must never carry a character.
 */
export const CHROME_THEME = {
  link: { dark: '#A0D233', light: '#235E42', lightRatio: '6.04–7.22:1' },
  state: { dark: '#A0D233', light: '#5E7C1E', lightRatio: '3.81–4.54:1', textAllowed: false },
  meta: { dark: '#8E9093', light: '#5A5D60', lightRatio: '5.24–6.27:1' },
  grid: { dark: '#1A231F', light: '#74777A', lightRatio: '3.58–4.26:1' },
  // Heading accent word (site --heading-accent, console chrome-accent). Solid only.
  accent: { dark: '#8FC4AC', light: '#235E42', lightRatio: '6.04–7.22:1', darkRatio: '8.18–9.46:1' },
} as const;

/**
 * Box hover (.hover-box in globals.css): cards, tiles, chips and rows fill on
 * hover and every colour inside flips. Same pair in light and dark — teal stays
 * the fill in dark. brand-guardian ruling 2026-09-13; lime is never the fill.
 */
export const HOVER_BOX = {
  fill: '#2F7F59', // teal-600
  onFill: '#FFFFFF', // all text, links, button borders: 4.88:1
  onFillLine: '#D7EBE1', // teal-100 — hairlines and dots: 3.92:1
  // Fill against surrounding surfaces (non-text): worst light tone 3.84:1,
  // dark ground 3.82:1, dark plate 3.48:1.
} as const;
