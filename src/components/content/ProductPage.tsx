import { Eyebrow } from '@/components/ui/Eyebrow';
import { OutboundLink } from '@/components/ui/OutboundLink';
import { Breadcrumbs } from '@/components/shell/Breadcrumbs';
import { ProductHero } from './ProductHero';
import type { ProductPageCopy } from '@/app/(site)/projects/projects-copy';

const PRIMARY =
  'inline-flex min-h-[54px] items-center px-7 text-[16px] font-semibold bg-teal-600 text-white hover:bg-[color:var(--primary-hover)]';
const SECONDARY =
  'inline-flex min-h-[54px] items-center px-7 text-[16px] font-semibold border-[1.5px] border-[color:var(--btn2-border)] text-[color:var(--link)] hover:border-[color:var(--btn2-border-hover)]';

/**
 * The shared layout for the three product pages.
 *
 * Design review, 2026-09-28: the long sections that ran edge to edge are gone.
 * A page is now the hero scene — the product with six numbered points around
 * it and one button to the official site (ProductHero) — and a closing band
 * with the official-site links, where purchase, support and full detail live.
 * Those links open in a new tab with a short fade (OutboundLink), so the
 * visitor keeps this site behind.
 *
 * The closing band carries the "[Product] is a Polyaire Group product." line:
 * the CEO's attribution rule (2026-09-24), not page content.
 */
export function ProductPage({ product }: { product: ProductPageCopy }) {
  return (
    <>
      <section className="gutter section-y">
        <Breadcrumbs
          className="-mt-3 mb-6"
          trail={[
            { label: 'Home', href: '/' },
            { label: 'Projects', href: '/projects/' },
            { label: product.name, href: `/projects/${product.slug}/` },
          ]}
        />
        <ProductHero product={product} />
      </section>

      <section className="gutter band-y border-t border-[color:var(--line)] bg-[color:var(--tint)]">
        <Eyebrow className="tracking-[0.16em] text-[color:var(--eyebrow)]">On the official site</Eyebrow>
        <p className="mt-3 max-w-[52ch] font-display text-[clamp(20px,2vw,26px)] font-bold leading-[1.3] tracking-[-0.015em] text-[color:var(--ink)]">
          {product.official.note}
        </p>
        <ul className="mt-6 flex flex-wrap gap-3">
          {product.official.links.map((link, i) => (
            <li key={link.href}>
              <OutboundLink href={link.href} site={link.site} className={i === 0 ? PRIMARY : SECONDARY}>
                {link.label}
              </OutboundLink>
            </li>
          ))}
        </ul>
        <p className="mt-8 font-mono text-[12px] uppercase tracking-[0.14em] text-[color:var(--muted)]">
          {product.name} is a Polyaire Group product.
        </p>
      </section>
    </>
  );
}
