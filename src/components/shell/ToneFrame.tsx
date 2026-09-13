'use client';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import { toneFor } from '@/lib/tones';

/**
 * Wraps a page shell in its light-mode tone (see src/lib/tones.ts).
 *
 * Client component only for usePathname — which also runs during the static
 * prerender, so the correct `data-tone` is in the HTML and there is no flash
 * of the wrong shade. Everything inside stays server-rendered children.
 */
export function ToneFrame({ children }: { children: ReactNode }) {
  const tone = toneFor(usePathname());
  return (
    <div data-tone={tone} className="tone-frame">
      {children}
    </div>
  );
}
