import type { Metadata } from 'next';
import { ProductPage } from '@/components/content/ProductPage';
import { AIRTOUCH } from '../projects-copy';

/**
 * Route: /projects/airtouch/  (URL unchanged from the legacy site)
 * Copy:  ../projects-copy.ts — six points cut from the legacy page and the
 *        official site; the page ends at the official-site links.
 */
export const metadata: Metadata = {
  title: 'AirTouch',
  description:
    'AirTouch — smart home climate control. Integrated AC unit and zone control, per-zone temperature monitoring and adjustment, and app control from anywhere.',
  alternates: { canonical: '/projects/airtouch/' },
};

export default function Page() {
  return (
    <ProductPage product={AIRTOUCH} />
  );
}
