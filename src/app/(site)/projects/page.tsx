import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Accent } from '@/components/ui/Accent';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { ImageSlot } from '@/components/ui/ImageSlot';
import { INDEX, PRODUCT_PAGES } from './projects-copy';

/**
 * Route: /projects/  (URL unchanged from the legacy site)
 *
 * The legacy index lists only AirTouch and PolyPlan; AirTouch Beam has its own
 * page but never made it onto this list. It is included here — it is a real
 * product with a real page, and PRODUCTS in src/lib/site.ts has always carried
 * all three.
 */
export const metadata: Metadata = {
  title: 'Projects',
  description:
    'What AirdroiTech builds: AirTouch smart home climate control, AirTouch Beam, and PolyPlan CAD software for HVAC professionals.',
  alternates: { canonical: '/projects/' },
};

export default function Page() {
  return (
    <>
      <section className="gutter section-y">
        <Eyebrow className="tracking-[0.16em] text-[color:var(--muted)]">{INDEX.eyebrow}</Eyebrow>
        <h1 className="mt-4 font-display text-[clamp(48px,8vw,104px)] font-bold leading-[0.9] tracking-[-0.04em] text-[color:var(--ink)]">
          <Accent text={INDEX.title} accent="Projects" />
        </h1>
      </section>

      {PRODUCT_PAGES.map((product, i) => (
        <section
          key={product.slug}
          className="gutter band-y border-t border-[color:var(--line)]"
        >
          <Link
            href={`/projects/${product.slug}/`}
            className="group grid items-center gap-[clamp(24px,3.4vw,72px)] lg:grid-cols-2"
          >
            <div className={i % 2 === 1 ? 'lg:order-last' : ''}>
              <ImageSlot
                src={product.hero.src}
                ratio="16/10"
                alt={product.hero.alt}
                label={product.hero.src}
                sizes="(min-width: 1024px) 50vw, 100vw"
                fit="contain"
              />
            </div>

            <div>
              <Eyebrow className="tracking-[0.14em] text-[color:var(--eyebrow)]">
                {product.kicker}
              </Eyebrow>
              <h2 className="mt-3 font-display text-[clamp(34px,4.6vw,64px)] font-bold leading-[1.02] tracking-[-0.035em] text-[color:var(--ink)]">
                {product.name}
              </h2>
              <p className="mt-4 max-w-[40ch] font-display text-[clamp(18px,1.8vw,24px)] font-bold leading-[1.3] tracking-[-0.015em] text-[color:var(--ink)]">
                {product.summary}
              </p>
              <span className="mt-6 inline-block font-semibold text-[color:var(--link)] underline [text-underline-offset:5px] group-hover:no-underline">
                View project →
              </span>
            </div>
          </Link>
        </section>
      ))}

      <section className="gutter band-y border-t border-[color:var(--line)] bg-[color:var(--tint)]">
        <h2 className="font-display text-[clamp(26px,3.2vw,44px)] font-bold leading-[1.06] tracking-[-0.03em] text-[color:var(--ink)]">
          <Accent text="Be an ‘Airdroitechie’" accent="‘Airdroitechie’" />
        </h2>
        <p className="prose-measure mt-4 text-[color:var(--body)]">
          Are you a tech enthusiast looking for a career journey? The hard work and dedication of
          our team — the AirdroiTechies — pave the way for everything we ship.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Button href="/careers/">See open positions</Button>
          <Button href="/get-in-touch/" variant="secondary">
            Get in touch
          </Button>
        </div>
      </section>
    </>
  );
}
