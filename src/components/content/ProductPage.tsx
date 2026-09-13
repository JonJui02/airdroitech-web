import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { ImageSlot } from '@/components/ui/ImageSlot';
import { OutboundLink } from '@/components/ui/OutboundLink';
import type { ProductPageCopy } from '@/app/(site)/projects/projects-copy';

const PRIMARY =
  'inline-flex min-h-[54px] items-center px-7 text-[16px] font-semibold bg-teal-600 text-white hover:bg-[color:var(--primary-hover)]';
const SECONDARY =
  'inline-flex min-h-[54px] items-center px-7 text-[16px] font-semibold border-[1.5px] border-[color:var(--btn2-border)] text-[color:var(--link)] hover:border-[color:var(--btn2-border-hover)]';

/**
 * The shared layout for the three product pages.
 *
 * One component rather than three near-identical pages: the three differ only
 * in copy and imagery, and a shared shell keeps the heading order, landmark
 * structure and CTA identical across them.
 *
 * Each page ends by sending the visitor to the product's official site, where
 * purchase, access and support actually live. Those links open in a new tab
 * with a short fade (OutboundLink), so the visitor keeps this site behind.
 *
 * Nothing here has a hidden resting state. The legacy product pages were part
 * of the same blank-section failure as About.
 */
export function ProductPage({
  product,
  action,
  siblings,
}: {
  product: ProductPageCopy;
  /** Optional page-specific internal action, rendered before the official links. */
  action?: { label: string; href: string; note?: string };
  siblings: { name: string; href: string }[];
}) {
  return (
    <>
      <section className="gutter section-y">
        <Eyebrow className="tracking-[0.16em] text-[color:var(--muted)]">{product.kicker}</Eyebrow>
        <h1 className="mt-4 font-display text-[clamp(44px,7vw,96px)] font-bold leading-[0.92] tracking-[-0.04em] text-[color:var(--ink)]">
          {product.name}
        </h1>
        <p className="mt-6 max-w-[40ch] font-display text-[clamp(20px,2.4vw,32px)] font-bold leading-[1.24] tracking-[-0.02em] text-[color:var(--ink)]">
          {product.lede}
        </p>

        <div className="mt-[clamp(28px,3.4vw,56px)]">
          <ImageSlot
            src={product.hero.src}
            ratio="16/9"
            alt={product.hero.alt}
            label={product.hero.src}
            sizes="100vw"
            fit="contain"
            priority
          />
        </div>
      </section>

      {product.sections.map((section) => (
        <section
          key={section.heading}
          className="gutter band-y border-t border-[color:var(--line)]"
        >
          <div className="grid gap-[clamp(20px,3vw,64px)] lg:grid-cols-[240px_1fr]">
            <h2 className="font-display text-[clamp(20px,2vw,26px)] font-bold leading-[1.2] tracking-[-0.02em] text-[color:var(--ink)]">
              {section.heading}
            </h2>

            <div>
              {section.body ? (
                <p className="prose-measure text-[clamp(17px,1.3vw,20px)] leading-[1.6] text-[color:var(--body)]">
                  {section.body}
                </p>
              ) : null}

              {section.items ? (
                <ul
                  className={`grid gap-px border border-[color:var(--line)] bg-[color:var(--line)] sm:grid-cols-2 ${
                    section.body ? 'mt-8' : ''
                  }`}
                >
                  {section.items.map((item, i, all) => (
                    <li
                      key={item.title}
                      className={`bg-[color:var(--ground)] px-6 py-6 ${
                        // An odd count in a two-column grid leaves the last row
                        // half empty, and the 1px grid gap shows through as a
                        // solid grey block. The last item spans both columns.
                        all.length % 2 === 1 && i === all.length - 1 ? 'sm:col-span-2' : ''
                      }`}
                    >
                      <p className="font-display text-[19px] font-bold tracking-[-0.01em] text-[color:var(--ink)]">
                        {item.title}
                      </p>
                      <p className="mt-2 text-[15.5px] leading-[1.6] text-[color:var(--body)]">
                        {item.body}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : null}

              {section.note ? (
                <p className="prose-measure mt-5 border-l-2 border-[color:var(--line-strong)] pl-4 text-[14px] leading-[1.6] text-[color:var(--muted)]">
                  {section.note}
                </p>
              ) : null}

              {section.figure ? (
                <div className="mt-8">
                  <ImageSlot
                    src={section.figure.src}
                    ratio="16/9"
                    alt={section.figure.alt}
                    label={section.figure.src}
                    sizes="(min-width: 1024px) 66vw, 100vw"
                    fit="contain"
                  />
                </div>
              ) : null}
            </div>
          </div>
        </section>
      ))}

      <section className="gutter band-y border-t border-[color:var(--line)] bg-[color:var(--tint)]">
        {action ? (
          <div className="mb-8">
            <Button href={action.href}>{action.label}</Button>
            {action.note ? (
              <p className="mt-4 max-w-[52ch] text-[15px] leading-[1.6] text-[color:var(--body)]">
                {action.note}
              </p>
            ) : null}
          </div>
        ) : null}

        <Eyebrow className="tracking-[0.16em] text-[color:var(--muted)]">On the official site</Eyebrow>
        <p className="mt-3 max-w-[52ch] text-[17px] leading-[1.6] text-[color:var(--body)]">
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
      </section>

      <section className="gutter band-y border-t border-[color:var(--line)]">
        <Eyebrow className="tracking-[0.16em] text-[color:var(--muted)]">Other projects</Eyebrow>
        <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
          {siblings.map((s) => (
            <li key={s.href}>
              <Link
                href={s.href}
                className="inline-flex min-h-tap items-center font-display text-[clamp(22px,2.4vw,32px)] font-bold tracking-[-0.02em] text-[color:var(--link)] underline [text-underline-offset:6px] hover:no-underline"
              >
                {s.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
