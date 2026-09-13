import type { Metadata } from 'next';
import { ProductPage } from '@/components/content/ProductPage';
import { BEAM } from '../projects-copy';

/**
 * Route: /projects/airtouch-beam/  (URL unchanged from the legacy site)
 * Copy:  ../projects-copy.ts — legacy AirdroiTech page plus the official
 *        airtouchhome.com.au Beam page.
 *
 * The legacy page closed with "Order Now", implying a checkout AirdroiTech does
 * not run (docs/OPEN-DECISIONS.md #3). Resolved by the user on 2026-09-13:
 * visitors go to the official AirTouch Home site, which sells and supports
 * Beam. ProductPage renders that as the page's official-site links.
 */
export const metadata: Metadata = {
  title: 'AirTouch Beam',
  description:
    'AirTouch Beam — your AC’s smart companion. Makes any split-system air conditioner smart, with geofencing, scheduling, and Apple Home, Google Home and Alexa voice control.',
  alternates: { canonical: '/projects/airtouch-beam/' },
};

export default function Page() {
  return (
    <ProductPage
      product={BEAM}
      siblings={[
        { name: 'AirTouch', href: '/projects/airtouch/' },
        { name: 'PolyPlan', href: '/projects/polyplan/' },
      ]}
    />
  );
}
