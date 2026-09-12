import type { Metadata } from 'next';
import { ProductPage } from '@/components/content/ProductPage';
import { POLYAIRE } from '@/lib/site';
import { BEAM } from '../projects-copy';

/**
 * Route: /projects/airtouch-beam/  (URL unchanged from the legacy site)
 * Copy:  ../projects-copy.ts — ported from the legacy page.
 *
 * The legacy page closes with "Order Now". AirdroiTech runs no commerce, so
 * that button implies a checkout that does not exist. docs/OPEN-DECISIONS.md #3
 * is the open question — Polyaire store, distributor locator, or an enquiry
 * form. Until it is answered, CONTENT-SKELETON's stated interim applies: label
 * it "Where to buy" and point at Polyaire, which is true today.
 */
export const metadata: Metadata = {
  title: 'AirTouch Beam',
  description:
    'AirTouch Beam — your AC’s smart companion. Turns any split-system air conditioner into a smart, Matter-enabled unit with geofencing and scheduling.',
  alternates: { canonical: '/projects/airtouch-beam/' },
};

export default function Page() {
  return (
    <ProductPage
      product={BEAM}
      action={{
        label: 'Where to buy ↗',
        href: POLYAIRE,
        note: 'AirTouch Beam is sold through Polyaire, Australia’s largest air-conditioning wholesale network. AirdroiTech builds the product and does not sell it directly.',
      }}
      siblings={[
        { name: 'AirTouch', href: '/projects/airtouch/' },
        { name: 'PolyPlan', href: '/projects/polyplan/' },
      ]}
    />
  );
}
