import type { Metadata } from 'next';
import { ProductPage } from '@/components/content/ProductPage';
import { AIRTOUCH } from '../projects-copy';

/**
 * Route: /projects/airtouch/  (URL unchanged from the legacy site)
 * Copy:  ../projects-copy.ts — ported from the legacy page.
 */
export const metadata: Metadata = {
  title: 'AirTouch',
  description:
    'AirTouch — smart home climate control. Integrated AC unit and zone control, per-zone temperature monitoring and adjustment, and app control from anywhere.',
  alternates: { canonical: '/projects/airtouch/' },
};

export default function Page() {
  return (
    <ProductPage
      product={AIRTOUCH}
      siblings={[
        { name: 'AirTouch Beam', href: '/projects/airtouch-beam/' },
        { name: 'PolyPlan', href: '/projects/polyplan/' },
      ]}
    />
  );
}
