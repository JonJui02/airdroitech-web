/**
 * Page tones — each route gets its own light-mode shade instead of one flat
 * near-white. The colours live in src/styles/globals.css under
 * `[data-tone='…']`; this file only decides which route wears which tone.
 *
 * Dark mode ignores tones: the dark tiers reset every tone token to inherit.
 */
export type Tone =
  | 'home'
  | 'about'
  | 'projects'
  | 'airtouch'
  | 'beam'
  | 'polyplan'
  | 'careers'
  | 'roles'
  | 'contact'
  | 'thanks'
  | 'privacy'
  | 'missing';

const TONES: Record<string, Tone> = {
  '/': 'home',
  '/what-we-do/': 'about',
  '/projects/': 'projects',
  '/projects/airtouch/': 'airtouch',
  '/projects/airtouch-beam/': 'beam',
  '/projects/polyplan/': 'polyplan',
  '/careers/': 'careers',
  '/careers/open-positions/': 'roles',
  '/get-in-touch/': 'contact',
  '/thank-you/': 'thanks',
  '/data-protection-and-privacy-policy/': 'privacy',
};

/** Unknown paths (the 404 page) get the calm 'missing' tone. */
export function toneFor(pathname: string | null): Tone {
  if (!pathname) return 'missing';
  const withSlash = pathname.endsWith('/') ? pathname : `${pathname}/`;
  return TONES[withSlash] ?? 'missing';
}
