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
  '#A0D233': { onWhite: 1.79, whiteOn: 1.79, inkOn: 9.17, bodyText: false },
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
