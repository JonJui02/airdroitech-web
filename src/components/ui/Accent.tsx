import type { ReactNode } from 'react';

interface AccentProps {
  /** The full heading text. */
  text: string;
  /** The word or short phrase inside `text` to colour. Omit for plain text. */
  accent?: string;
  /** Site pages use --heading-accent; the homepage console uses chrome-accent. */
  tone?: 'site' | 'chrome';
  /**
   * Use the brand sweep instead of a solid colour. Only for the one hero
   * heading per page — every other accent is solid (brand-guardian 2026-09-13).
   */
  sweep?: boolean;
}

/**
 * One accent word in a heading: "Programming **Intelligence**", carried to the
 * rest of the site.
 *
 * Rules live in docs/BRAND.md → "Heading accent words": h1 and h2 only, one
 * accent per heading, one or two accented headings per page, and never on the
 * Career room's lime field or on legal headings.
 *
 * No 'use client' — this has no state, so server and client components can
 * both use it. If `accent` is not found in `text`, the heading renders plain
 * rather than guessing, so a copy edit can never colour the wrong word.
 */
export function Accent({ text, accent, tone = 'site', sweep = false }: AccentProps): ReactNode {
  if (!accent) return text;
  const at = text.indexOf(accent);
  if (at === -1) return text;

  const className = sweep
    ? 'brand-sweep-text'
    : tone === 'chrome'
      ? 'text-chrome-accent'
      : 'text-[color:var(--heading-accent)]';

  return (
    <>
      {text.slice(0, at)}
      <span className={className}>{accent}</span>
      {text.slice(at + accent.length)}
    </>
  );
}
