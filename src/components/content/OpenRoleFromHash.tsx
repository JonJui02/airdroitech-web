'use client';

import { useEffect } from 'react';

/**
 * Opens the role named in the URL hash.
 *
 * The homepage Career room links each role to /careers/open-positions/#slug.
 * Each role there is a closed <details> (the page scans as a list of titles),
 * so landing on the anchor alone would show only the title. This opens that
 * role's description, and its team list if it was collapsed, then scrolls it
 * into view. Without JavaScript the anchor still lands on the role's title.
 */
export function OpenRoleFromHash() {
  useEffect(() => {
    const open = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!id) return;
      const el = document.getElementById(id);
      if (!(el instanceof HTMLDetailsElement)) return;
      for (let n: HTMLElement | null = el; n; n = n.parentElement) {
        if (n instanceof HTMLDetailsElement) n.open = true;
      }
      el.scrollIntoView({ block: 'start' });
    };
    open();
    window.addEventListener('hashchange', open);
    return () => window.removeEventListener('hashchange', open);
  }, []);

  return null;
}
