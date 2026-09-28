import type { Metadata } from 'next';
import { ProductPage } from '@/components/content/ProductPage';
import { POLYPLAN } from '../projects-copy';

/**
 * Route: /projects/polyplan/  (URL unchanged from the legacy site)
 * Copy:  ../projects-copy.ts — six points cut from the legacy page and the
 *        official site; the page ends at the official-site links.
 */
export const metadata: Metadata = {
  title: 'PolyPlan',
  description:
    'PolyPlan by Polyaire — cloud-based CAD software for HVAC professionals: calculate, design and quote air-conditioning installations.',
  alternates: { canonical: '/projects/polyplan/' },
};

export default function Page() {
  return (
    <ProductPage product={POLYPLAN} />
  );
}
