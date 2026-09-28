'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

/**
 * Long pages that get the flow line. Product pages are one scene and a link
 * now, and the privacy page stays the calmest page on the site, so neither is
 * listed.
 */
const FLOW_ROUTES = new Set(['/what-we-do/', '/projects/', '/careers/', '/careers/open-positions/']);

export function hasFlowLine(pathname: string | null): boolean {
  if (!pathname) return false;
  return FLOW_ROUTES.has(pathname.endsWith('/') ? pathname : `${pathname}/`);
}

/**
 * The quiet form of the Airflow cue on long pages (design review,
 * 2026-09-28): one line in the left gutter at 1024px and up, with a node for
 * each section of the page. The line fills as the page scrolls and each node
 * lights as its section arrives, so a reader can see how far they are and
 * how much is left. It replaces the 2px progress bar there (ScrollProgress
 * hides itself at that width on these routes); phones keep the bar.
 *
 * Scroll position drives it directly; nothing animates on a timer. Node
 * positions are measured only on layout changes; scrolling writes the fill
 * and the lit nodes straight to the DOM, with no React render per frame.
 * Decorative and aria-hidden: the page's headings carry the structure.
 */
export function FlowLine() {
  const on = hasFlowLine(usePathname());
  const [stops, setStops] = useState<number[]>([]);
  const fillRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<HTMLDivElement>(null);
  const stopsRef = useRef<number[]>([]);
  const repaint = useRef<() => void>(() => {});

  useEffect(() => {
    if (!on) return;
    let raf = 0;
    let max = 1;

    const paint = () => {
      raf = 0;
      const f = Math.min(1, Math.max(0, window.scrollY / max));
      if (fillRef.current) fillRef.current.style.height = `${f * 100}%`;
      const nodes = nodesRef.current?.children;
      if (!nodes) return;
      stopsRef.current.forEach((at, i) => {
        nodes[i]?.setAttribute('data-lit', String(f >= at - 0.001));
      });
    };
    const layout = () => {
      max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const next = Array.from(document.querySelectorAll<HTMLElement>('main > section')).map((s) => {
        const top = s.getBoundingClientRect().top + window.scrollY;
        return Math.min(1, Math.max(0, (top - window.innerHeight * 0.4) / max));
      });
      stopsRef.current = next;
      setStops(next);
      schedule();
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(paint);
    };
    repaint.current = schedule;

    layout();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', layout);
    const ro = new ResizeObserver(layout);
    ro.observe(document.body);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', layout);
      ro.disconnect();
    };
  }, [on]);

  // A fresh node list paints its lit state straight after layout.
  useEffect(() => {
    if (on) repaint.current();
  }, [on, stops]);

  if (!on) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed bottom-[40px] left-[calc(var(--gutter)/2_-_1px)] top-[132px] z-[60] hidden w-[2px] bg-chrome-hover lg:block"
    >
      <div ref={fillRef} className="absolute left-0 top-0 h-0 w-full bg-chrome-state" />
      <div ref={nodesRef}>
        {stops.map((at, i) => (
          <span
            key={i}
            data-lit="false"
            className="absolute left-1/2 block h-[9px] w-[9px] -translate-x-1/2 -translate-y-1/2 rotate-45 border-[1.5px] border-chrome-line-dark bg-[color:var(--page)] transition-colors duration-200 data-[lit=true]:border-chrome-state data-[lit=true]:bg-chrome-state"
            style={{ top: `${at * 100}%` }}
          />
        ))}
      </div>
    </div>
  );
}
