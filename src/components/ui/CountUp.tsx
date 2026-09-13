'use client';

import { useEffect, useRef, useState } from 'react';

interface CountUpProps {
  /** The final value, exactly as it should read: "2021", "30+", "AU · MY". */
  value: string;
  /** Replay every time the value comes back into view (console rooms). */
  replay?: boolean;
  /** Animation length in ms. */
  duration?: number;
}

const SCRAMBLE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
/** How often scrambled letters change, so the effect reads as decoding, not flicker. */
const SCRAMBLE_MS = 55;
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Animated fact value (user request 2026-09-13).
 *
 * Numbers ("2021", "30+", "3") count up from 0 with an ease-out, and any suffix
 * (the "+") lands with the final number. Text ("AU · MY") starts as blurred,
 * scrambled letters that settle into the real ones left to right.
 *
 * Same safeguards as TypeText (CLAUDE.md, approved exception to #3):
 * - The real value is in the server HTML, and screen readers read it from a
 *   visually hidden copy; the moving digits are aria-hidden.
 * - An invisible copy of the final value sets the size, so counting or
 *   scrambling never shifts the layout.
 * - It only animates under html.tt-ready (not set for reduced motion); the CSS
 *   failsafe shows the final value after 2.5s if JavaScript never runs.
 */
export function CountUp({ value, replay = false, duration = 1300 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(value);
  const [state, setState] = useState<'armed' | 'play' | undefined>(undefined);
  const numeric = /^(\d+)(.*)$/.exec(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const animate =
      document.documentElement.classList.contains('tt-ready') &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!animate) {
      setShown(value);
      setState('play');
      return;
    }

    const match = /^(\d+)(.*)$/.exec(value);
    const target = match ? Number(match[1]) : 0;
    const scrambled = () =>
      Array.from(value)
        .map((ch) => (/[\s·.,:+-]/.test(ch) ? ch : SCRAMBLE[Math.floor(Math.random() * SCRAMBLE.length)]))
        .join('');
    const startValue = () => (match ? '0' : scrambled());

    let raf = 0;
    let shownNow = false;

    const run = () => {
      cancelAnimationFrame(raf);
      // Start from the first frame's own timestamp: a rAF timestamp can be earlier
      // than performance.now() read here, which made progress negative ("-5").
      let start = -1;
      let lastSwap = 0;
      let current = startValue();
      const tick = (now: number) => {
        if (start < 0) start = now;
        const t = Math.min(1, Math.max(0, (now - start) / duration));
        if (t >= 1) {
          setShown(value);
          return;
        }
        if (match) {
          setShown(String(Math.round(target * easeOut(t))));
        } else if (now - lastSwap >= SCRAMBLE_MS) {
          lastSwap = now;
          const settled = Math.floor(easeOut(t) * value.length);
          current = Array.from(value)
            .map((ch, i) =>
              i < settled || /[\s·.,:+-]/.test(ch)
                ? ch
                : (SCRAMBLE[Math.floor(Math.random() * SCRAMBLE.length)] ?? ch),
            )
            .join('');
          setShown(current);
        }
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    setShown(startValue());
    setState('armed');

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting && !shownNow) {
          shownNow = true;
          setState('play');
          run();
          if (!replay) io.disconnect();
        } else if (!entry.isIntersecting && shownNow && replay) {
          shownNow = false;
          cancelAnimationFrame(raf);
          setShown(startValue());
          setState('armed');
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, replay, duration]);

  return (
    <span
      ref={ref}
      className={`count relative inline-block whitespace-nowrap ${numeric ? '' : 'count-text'}`}
      data-count={state}
    >
      <span className="sr-only">{value}</span>
      {/* Invisible final value: reserves the exact size so nothing shifts. */}
      <span aria-hidden="true" className="invisible">
        {value}
      </span>
      <span aria-hidden="true" className="count-live absolute left-0 top-0 tabular-nums">
        {shown}
      </span>
    </span>
  );
}
