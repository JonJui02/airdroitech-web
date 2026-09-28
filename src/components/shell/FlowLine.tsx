'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

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

interface Node {
  at: number;
  lit: boolean;
}

/**
 * The quiet form of the Airflow cue on long pages (design review,
 * 2026-09-28): one line in the left gutter at 1024px and up, with a node for
 * each section of the page. The line fills as the page scrolls and each node
 * lights as its section arrives, so a reader can see how far they are and
 * how much is left. It replaces the 2px progress bar there (ScrollProgress
 * hides itself at that width on these routes); phones keep the bar.
 *
 * Scroll position drives it directly; nothing animates on a timer. Decorative
 * and aria-hidden: the page's headings carry the structure.
 */
export function FlowLine() {
  const on = hasFlowLine(usePathname());
  const [fill, setFill] = useState(0);
  const [nodes, setNodes] = useState<Node[]>([]);

  useEffect(() => {
    if (!on) return;
    let raf = 0;
    const measure = () => {
      raf = 0;
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const f = Math.min(1, Math.max(0, window.scrollY / max));
      setFill(f);
      setNodes(
        Array.from(document.querySelectorAll<HTMLElement>('main > section')).map((s) => {
          const top = s.getBoundingClientRect().top + window.scrollY;
          const at = Math.min(1, Math.max(0, (top - window.innerHeight * 0.4) / max));
          return { at, lit: f >= at - 0.001 };
        }),
      );
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    const ro = new ResizeObserver(schedule);
    ro.observe(document.body);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      ro.disconnect();
    };
  }, [on]);

  if (!on) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed bottom-[40px] left-[calc(var(--gutter)/2_-_1px)] top-[132px] z-[60] hidden w-[2px] bg-chrome-hover lg:block"
    >
      <div className="absolute left-0 top-0 w-full bg-chrome-state" style={{ height: `${fill * 100}%` }} />
      {nodes.map((n, i) => (
        <span
          key={i}
          className={`absolute left-1/2 block h-[9px] w-[9px] -translate-x-1/2 -translate-y-1/2 rotate-45 border-[1.5px] transition-colors duration-200 ${
            n.lit ? 'border-chrome-state bg-chrome-state' : 'border-chrome-line-dark bg-[color:var(--page)]'
          }`}
          style={{ top: `${n.at * 100}%` }}
        />
      ))}
    </div>
  );
}
