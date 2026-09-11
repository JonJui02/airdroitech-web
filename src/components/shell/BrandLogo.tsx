import { LOGO } from '@/lib/site';

/**
 * The supplied raster logo. The mark does not change — shape, proportions and
 * colours are fixed.
 *
 * Uses a plain <img> rather than next/image deliberately: the asset has not
 * been dropped into /public/brand yet, and a plain img degrades to its alt text
 * instead of a broken optimiser response. Swap to next/image once the file is
 * in place (and add the SVG redraw from phase 5).
 */
export function BrandLogo({ height = 'clamp(24px,1.9vw,30px)' }: { height?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={LOGO.src}
      alt={LOGO.alt}
      width={LOGO.width}
      height={LOGO.height}
      style={{ height, width: 'auto' }}
      className="block max-w-none font-display font-bold text-[color:var(--ink)]"
    />
  );
}
