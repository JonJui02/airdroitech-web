import type { Metadata } from 'next';
import { ProductPage } from '@/components/content/ProductPage';
import { POLYPLAN } from '../projects-copy';

/**
 * Route: /projects/polyplan/  (URL unchanged from the legacy site)
 * Copy:  ../projects-copy.ts — ported from the legacy page.
 */
export const metadata: Metadata = {
  title: 'PolyPlan',
  description:
    'PolyPlan — CAD software for HVAC professionals, maintained and enhanced by the AirdroiTech software web team for Polyaire.',
  alternates: { canonical: '/projects/polyplan/' },
};

export default function Page() {
  return (
    <ProductPage
      product={POLYPLAN}
      siblings={[
        { name: 'AirTouch', href: '/projects/airtouch/' },
        { name: 'AirTouch Beam', href: '/projects/airtouch-beam/' },
      ]}
    />
  );
}
