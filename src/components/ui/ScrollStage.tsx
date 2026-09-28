'use client';

import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';

interface ScrollStageProps {
  children: ReactNode;
  /**
   * `enter` — pinned. The product image swings up out of 3D and lands flat,
   * then the text steps in. Used on the /projects/ index. (The product pages
   * have their own scene: src/components/content/ProductHero.tsx.)
   */
  mode: 'enter';
  className?: string;
}

/**
 * Apple-style scroll scenes (user decision 2026-09-24).
 *
 * Pinned stages are taller than the screen; their panel is `position: sticky`,
 * so it holds still while the page scrolls past. Scroll position drives every
 * scene through one CSS custom property, --p. Nothing plays on a timer: stop
 * scrolling and the scene stops.
 *
 * Safeguards (CLAUDE.md rule 3 exception):
 * - The whole scene is in the server HTML. The tall stage, the pin and every
 *   transform are scoped to html.tt-ready, which the pre-paint script sets only
 *   without reduced motion, so layout is final before first paint (no CLS) and
 *   reduced motion gets the plain, unpinned page.
 * - Without JavaScript --p keeps its CSS default, which is the scene's visible,
 *   finished state.
 * - Keyboard focus inside the stage forces the visible state, so a focused
 *   link is never faded or off its mark.
 * - Transform and opacity only; the page itself always scrolls normally.
 */
export function ScrollStage({ children, mode, className = '' }: ScrollStageProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)');
    const panel = el.firstElementChild as HTMLElement;
    let frame = 0;

    const measure = () => {
      frame = 0;
      if (calm.matches || !document.documentElement.classList.contains('tt-ready')) {
        el.style.removeProperty('--p');
        return;
      }
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const top = parseFloat(getComputedStyle(panel).top) || 0;
      // Scroll distance the panel stays pinned for.
      const travel = Math.max(1, rect.height - (vh - top));
      // 0 as the pin starts, 1 as it releases; negative while still arriving.
      const p = (top - rect.top) / travel;
      el.style.setProperty('--p', Math.min(2, Math.max(-1, p)).toFixed(4));
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    const resize = schedule;

    measure();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', resize);
    calm.addEventListener('change', schedule);
    // Images and fonts settle after hydration; re-fit once they do.
    const ro = new ResizeObserver(resize);
    ro.observe(panel);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', resize);
      calm.removeEventListener('change', schedule);
      ro.disconnect();
    };
  }, [mode]);

  return (
    <div ref={ref} data-stage={mode} className={`stage ${className}`}>
      <div className="stage-panel">{children}</div>
    </div>
  );
}
