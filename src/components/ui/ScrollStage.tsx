'use client';

import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';

interface ScrollStageProps {
  children: ReactNode;
  /**
   * `enter` — pinned. The product image swings up out of 3D and lands flat,
   * then the text steps in. Used on the /projects/ index.
   * `exit` — pinned. The page opens on the hero with the product tilted back
   * like a screen being opened; scrolling stands it up, lifts the title away
   * and zooms the product to fill the screen. Used on product pages.
   * `view` — not pinned. A figure straightens out of 3D as it scrolls to the
   * middle of the screen. Used on product-page figures.
   */
  mode: 'enter' | 'exit' | 'view';
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
 * - Without JavaScript --p keeps its CSS default, which is the scene's visible
 *   state (`enter` and `view` finished, `exit` not yet begun).
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

    // `exit`: how far the product must travel, and how much it may grow, to
    // end centred and filling the visible panel. Layout offsets ignore
    // transforms, so this reads the resting position whatever --p is.
    const fit = () => {
      if (mode !== 'exit') return;
      const img = el.querySelector<HTMLElement>('.st-out-img');
      if (!img) return;
      let y = 0;
      for (let n: HTMLElement | null = img; n && n !== panel; n = n.offsetParent as HTMLElement | null) {
        y += n.offsetTop;
      }
      const top = parseFloat(getComputedStyle(panel).top) || 0;
      const room = window.innerHeight - top;
      const lift = room / 2 - (y + img.offsetHeight / 2);
      const zoom = Math.max(1, Math.min(
        (panel.clientWidth * 1.06) / img.offsetWidth,
        (room * 0.86) / img.offsetHeight,
        1.7,
      ));
      el.style.setProperty('--lift', `${lift.toFixed(1)}px`);
      el.style.setProperty('--zoom', zoom.toFixed(3));
    };

    const measure = () => {
      frame = 0;
      if (calm.matches || !document.documentElement.classList.contains('tt-ready')) {
        el.style.removeProperty('--p');
        return;
      }
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      let p: number;
      if (mode === 'view') {
        // 0 as the figure's top enters, 1 as its centre reaches 55% of the screen.
        p = (vh - rect.top) / (vh * 0.45 + rect.height / 2);
      } else {
        const top = parseFloat(getComputedStyle(panel).top) || 0;
        // Scroll distance the panel stays pinned for.
        const travel = Math.max(1, rect.height - (vh - top));
        // 0 as the pin starts, 1 as it releases; negative while still arriving.
        p = (top - rect.top) / travel;
      }
      el.style.setProperty('--p', Math.min(2, Math.max(-1, p)).toFixed(4));
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    const resize = () => {
      fit();
      schedule();
    };

    fit();
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
