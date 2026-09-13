import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site-url';

const SITE = SITE_URL;

/**
 * Replaces Yoast. Every path here matches a live legacy URL byte-for-byte, so
 * the cutover introduces no new or changed URLs. Verify parity against
 * https://airdroitech.com/page-sitemap.xml before shipping phase 6.
 */
const PATHS = [
  '/',
  '/what-we-do/',
  '/projects/',
  '/projects/airtouch/',
  '/projects/airtouch-beam/',
  '/projects/polyplan/',
  '/careers/',
  '/careers/open-positions/',
  '/get-in-touch/',
  '/data-protection-and-privacy-policy/',
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.map((p) => ({
    url: `${SITE}${p}`,
    lastModified: new Date(),
    changeFrequency: p === '/careers/open-positions/' ? ('weekly' as const) : ('monthly' as const),
    priority: p === '/' ? 1 : 0.7,
  }));
}
