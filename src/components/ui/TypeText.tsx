'use client';

import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';

interface TypeTextProps {
  /** The full heading text. */
  text: string;
  /** Word or phrase inside `text` to colour, as <Accent> does. */
  accent?: string;
  /** Site pages use --heading-accent; the homepage console uses chrome-accent. */
  tone?: 'site' | 'chrome';
  /** Give the accent the brand sweep gradient (the homepage hero only). */
  sweep?: boolean;
  /** Put the text before the accent and the accent on separate lines. */
  splitAccent?: boolean;
  /** Retype each time the heading comes back into view (console rooms). */
  replay?: boolean;
  /** Caret colour. Defaults to the accent colour of `tone`. */
  caret?: string;
}

/** The whole heading types in about a second, whatever its length. */
const TOTAL_MS = 1100;
const MAX_STEP_MS = 55;

/**
 * Typing headline — letters appear left to right behind a moving caret, which
 * blinks a few times at the end and disappears (user request 2026-09-13).
 *
 * APPROVED EXCEPTION to CLAUDE.md non-negotiable #3, with these safeguards —
 * do not remove them:
 * - The full heading is always in the server HTML (a visually hidden copy), so
 *   search engines and screen readers get the whole text; only an aria-hidden
 *   visual copy animates. Every letter keeps its space, so nothing shifts.
 * - The typing is CSS (globals.css, "Typing headlines"). It only runs when the
 *   pre-paint script has put `tt-ready` on <html>, which it skips under
 *   prefers-reduced-motion — those visitors get plain static text.
 * - If the page's JavaScript never runs, a CSS failsafe shows every letter
 *   after 2.5 seconds.
 *
 * This component only decides WHEN to type: when the heading scrolls into
 * view, or — with `replay` — every time a console room is opened again.
 */
export function TypeText({
  text,
  accent,
  tone = 'site',
  sweep = false,
  splitAccent = false,
  replay = false,
  caret,
}: TypeTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [state, setState] = useState<'armed' | 'play' | undefined>(undefined);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    setState('armed');
    let shown = false;
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting && !shown) {
          shown = true;
          setState('armed');
          // Two frames: let the reset paint, so the animation restarts cleanly.
          raf = requestAnimationFrame(() => {
            raf = requestAnimationFrame(() => setState('play'));
          });
          if (!replay) io.disconnect();
        } else if (!entry.isIntersecting && shown && replay) {
          shown = false;
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [replay]);

  // Split into plain and accent segments.
  const at = accent ? text.indexOf(accent) : -1;
  const segments =
    at < 0 || !accent
      ? [{ text, accent: false }]
      : [
          { text: text.slice(0, at), accent: false },
          { text: accent, accent: true },
          { text: text.slice(at + accent.length), accent: false },
        ].filter((s) => s.text.length > 0);

  const total = segments.reduce((n, s) => n + (splitAccent ? s.text.trim() : s.text).length, 0);
  const step = Math.max(18, Math.min(MAX_STEP_MS, Math.round(TOTAL_MS / Math.max(1, total))));

  const accentClass = sweep
    ? 'brand-sweep-text'
    : tone === 'chrome'
      ? 'text-chrome-accent'
      : 'text-[color:var(--heading-accent)]';

  let index = 0;
  const chars = (str: string): ReactNode[] =>
    str
      .split(/(\s+)/)
      .filter(Boolean)
      .map((word) => {
        if (/^\s+$/.test(word)) {
          index += word.length;
          return word;
        }
        const start = index;
        return (
          <span key={`w${start}`} className="whitespace-nowrap">
            {Array.from(word).map((ch) => {
              const i = index++;
              return (
                <span
                  key={i}
                  className={i === total - 1 ? 'tt-char tt-last' : 'tt-char'}
                  style={{ '--i': i } as CSSProperties}
                >
                  {ch}
                </span>
              );
            })}
          </span>
        );
      });

  const visual = segments.map((s, n) => {
    const body = chars(splitAccent ? s.text.trim() : s.text);
    const cls = [splitAccent ? 'block' : '', s.accent ? accentClass : ''].filter(Boolean).join(' ');
    return cls ? (
      <span key={n} className={cls}>
        {body}
      </span>
    ) : (
      <span key={n}>{body}</span>
    );
  });

  return (
    <span
      ref={ref}
      className="tt"
      data-tt={state}
      style={
        {
          '--step': `${step}ms`,
          '--tt-caret': caret ?? (tone === 'chrome' ? 'var(--chrome-accent)' : 'var(--heading-accent)'),
        } as CSSProperties
      }
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{visual}</span>
    </span>
  );
}
