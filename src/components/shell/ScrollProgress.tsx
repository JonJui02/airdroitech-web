'use client';

import { useEffect, useState } from 'react';

/**
 * Section 3c — a 2px track under the nav bar, filled to the page's scroll
 * percentage.
 *
 * Chrome only: no content depends on it, it is aria-hidden, and with JavaScript
 * disabled it simply renders as an empty track.
 */
export function ScrollProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setPct(scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div className="h-[2px] w-full bg-chrome-hover" aria-hidden="true">
      <div className="h-full bg-lime-500" style={{ width: `${pct}%` }} />
    </div>
  );
}
