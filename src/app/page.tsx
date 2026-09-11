import Link from 'next/link';
import type { Metadata } from 'next';
import { Button, InkButton } from '@/components/ui/Button';
import { ImageSlot } from '@/components/ui/ImageSlot';
import { CapabilityStrip } from '@/components/content/CapabilityStrip';
import { ProjectRow } from '@/components/content/ProjectRow';
import { StatPlate } from '@/components/content/StatPlate';
import { FLAGS } from '@/lib/flags';
import { POLYAIRE, PRODUCTS } from '@/lib/site';

/**
 * Route: /  (URL unchanged from the legacy WordPress site)
 * Design: AirdroiTech Homepage v3, implemented to spec.
 *
 * Structural signature: no centred max-width container. Sections run full-bleed
 * and are padded by the single `--gutter`, so every hairline runs the full page
 * width. Square corners throughout, hairline borders rather than shadows.
 *
 * Every `clamp()` below carries the design file's min and max verbatim; the
 * container-query `cqw` middle terms are translated to `vw`, since the preview
 * frame width and the viewport width are the same thing once shipped.
 */

export const metadata: Metadata = {
  title: 'AirdroiTech Sdn Bhd',
  description:
    'Software and product development for smart home technologies, business solutions and artificial intelligence. AirdroiTech is the R&D and software arm of the Polyaire Group, working from Shah Alam, Selangor.',
  alternates: { canonical: '/' },
};

const PROJECT_ROWS = [
  {
    kicker: 'Smart home climate control',
    name: 'AirTouch',
    copy: 'Unit and zone control, per-zone monitoring and adjustment, and full control from a phone at home or away.',
    href: '/projects/airtouch/',
    asset: PRODUCTS[0].asset,
    media: 'right' as const,
  },
  {
    kicker: 'Matter-enabled companion',
    name: 'AirTouch Beam',
    copy: "Your AC's smart companion — turns any split-system air conditioner into a smart, efficient, customisable unit.",
    href: '/projects/airtouch-beam/',
    asset: PRODUCTS[1].asset,
    media: 'left' as const,
  },
  {
    kicker: 'Air conditioning CAD software',
    name: 'PolyPlan',
    copy: 'CAD for HVAC professionals — faster designs, automatic zoning and smarter quotes, maintained by our web team.',
    href: '/projects/polyplan/',
    asset: PRODUCTS[2].asset,
    media: 'right' as const,
  },
];

export default function HomePage() {
  return (
    <>
      {/* ================= 5.1 Hero ================= */}
      <section className="on-dark relative bg-chrome-ground pb-[clamp(32px,3.4vw,64px)] pt-[clamp(40px,4.4vw,88px)]">
        {/* Decorative six-column overlay, 1440 only. Carries no information. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden grid-cols-6 lg:grid"
        >
          <span className="border-r border-chrome-grid" />
          <span className="border-r border-chrome-grid" />
          <span className="border-r border-chrome-grid" />
          <span className="border-r border-chrome-grid" />
          <span className="border-r border-chrome-grid" />
          <span />
        </div>

        <div className="relative gutter">
          <p className="font-mono text-[clamp(11.5px,0.85vw,13px)] uppercase tracking-[0.18em] text-lime-500">
            Smart home · IoT · Automation · Data · AI
          </p>

          <h1 className="mt-[clamp(14px,1.4vw,24px)] font-display text-[clamp(46px,12.4vw,184px)] font-bold leading-[0.88] tracking-[-0.04em] text-[#EAEEEB]">
            <span className="block">Programming</span>
            {/*
              The page's single instance of the brand gradient — the logo's own
              teal-green-lime sweep, used here as the text fill and nowhere else.
              `color` is the fallback for anything that cannot clip to text.
            */}
            <span
              className="block bg-brand-sweep bg-clip-text text-transparent"
              style={{ color: '#A0D233' }}
            >
              Intelligence
            </span>
          </h1>

          <div className="mt-[clamp(28px,3vw,60px)] grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-end gap-[clamp(24px,2.6vw,52px)]">
            <div className="max-w-[46ch]">
              <p className="text-[clamp(17.5px,1.4vw,21px)] leading-[1.5] text-[#EAEEEB]">
                Software and product development for smart home technologies, business solutions
                and artificial intelligence.
              </p>
              <div className="mt-[clamp(22px,2.2vw,36px)] flex flex-wrap gap-3">
                <Button href="/projects/">See our projects</Button>
                <Button href="/careers/" variant="secondary">
                  Work with us
                </Button>
              </div>
            </div>

            <p className="font-mono text-[12.5px] uppercase leading-[1.9] tracking-[0.06em] text-chrome-meta">
              <span className="block">Est. 2021 · Shah Alam MY</span>
              <span className="block">Firmware · Mobile · Cloud · Hardware</span>
              <span className="block">Markets: Australia · Malaysia</span>
            </p>
          </div>
        </div>

        {/*
          Full-bleed to the right edge: left gutter only, no right padding.
          A still image is the hero and the LCP element. A video may attach
          above 1024px and never under prefers-reduced-motion — the layout is
          reviewed with the static image alone.
        */}
        <div className="relative mt-[clamp(32px,3.4vw,64px)] gutter-l">
          <ImageSlot
            ratio="2.4/1"
            minHeight="200px"
            alt="AirdroiTech engineering"
            label="hero/home-hero.jpg"
            sizes="100vw"
            priority
          />
        </div>
      </section>

      {/* ================= 5.2 Capability strip ================= */}
      <div className="on-dark">
        <CapabilityStrip />
      </div>

      {/* ================= 5.3 Positioning ================= */}
      <section id="about" className="bg-[color:var(--ground)] gutter section-y">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] items-start gap-[clamp(28px,3vw,64px)]">
          <div>
            <p className="font-mono text-[12px] uppercase tracking-[0.16em] text-[color:var(--muted)]">
              Challenging the norm
            </p>
            <h2 className="mt-4 text-balance font-display text-[clamp(36px,5.2vw,76px)] font-bold leading-[0.98] tracking-[-0.032em] text-[color:var(--ink)]">
              We help you build your future
            </h2>
          </div>

          <div>
            <p className="max-w-[58ch] text-[clamp(16px,1.15vw,18px)] leading-[1.66] text-[color:var(--body)]">
              AirdroiTech specialises in business solutions, IoT, automation, data analytics and
              artificial intelligence. We help companies improve how they do business so they can
              deliver better services to their customers — from first prototype through to a
              product shipping in homes.
            </p>
            <Button href="/what-we-do/" variant="ghost" className="mt-6">
              About us →
            </Button>
          </div>
        </div>
      </section>

      {/* ================= 5.4 Projects ================= */}
      <section id="projects" className="border-t border-[color:var(--line)] bg-[color:var(--surface)] pb-0 pt-[clamp(64px,6.6vw,128px)]">
        <div className="flex flex-wrap items-end justify-between gap-6 gutter pb-[clamp(28px,3vw,56px)]">
          <h2 className="font-display text-[clamp(34px,4.4vw,64px)] font-bold leading-[1] tracking-[-0.03em] text-[color:var(--ink)]">
            ADT Projects
          </h2>
          <Link
            href="/projects/"
            className="min-h-tap inline-flex items-center font-mono text-[12.5px] uppercase tracking-[0.12em] text-[color:var(--link)] underline [text-underline-offset:5px] hover:no-underline"
          >
            All projects →
          </Link>
        </div>

        <div>
          {PROJECT_ROWS.map((row, i) => (
            <ProjectRow
              key={row.href}
              {...row}
              firstRow={i === 0}
              lastRow={i === PROJECT_ROWS.length - 1}
            />
          ))}
        </div>
      </section>

      {/* ================= 5.5 Polyaire ================= */}
      <section className="on-dark bg-[color:var(--plate)] gutter section-y">
        <p className="font-mono text-[12px] uppercase tracking-[0.16em] text-lime-500">
          In collaboration with Polyaire
        </p>

        <div className="mt-[clamp(24px,2.6vw,48px)] grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-start gap-[clamp(28px,3vw,72px)]">
          <div>
            <p className="font-display text-[clamp(64px,9vw,140px)] font-bold leading-[0.82] tracking-[-0.04em] text-white">
              30<span className="text-lime-500">+</span>
            </p>
            <p className="mt-4 font-mono text-[12.5px] uppercase tracking-[0.14em] text-grey-400">
              Years of market leadership
            </p>
          </div>

          <div>
            <h2 className="text-balance font-display text-[clamp(28px,3.2vw,44px)] font-bold leading-[1.08] text-white">
              The largest air-conditioning wholesale network in Australia
            </h2>
            <p className="mt-5 max-w-[54ch] leading-[1.7] text-[#C3CBC6]">
              An international manufacturer of HVAC equipment — air filters, insulated flexible
              ducting, air grilles and vents, and fittings. AirdroiTech is Polyaire&rsquo;s R&amp;D
              and software arm, working from Shah Alam, Selangor.
            </p>
            <a
              href={POLYAIRE}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-tap mt-6 inline-flex items-center font-semibold text-lime-500 underline [text-underline-offset:5px] hover:no-underline"
            >
              polyaire.com.au ↗
            </a>
          </div>
        </div>
      </section>

      {/* ================= 5.6 Proof numbers — BLOCKED, flag off by default ==== */}
      {FLAGS.proofNumbers && (
        <section className="bg-[color:var(--ground)] gutter band-y">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(210px,1fr))] gap-[clamp(20px,2.4vw,44px)]">
            <StatPlate state="real" figure="2021" label="Founded in Shah Alam" />
            <StatPlate
              state="blocked"
              figure="——"
              label="AirdroiTechies"
              note="Figure not supplied"
            />
            <StatPlate
              state="blocked"
              figure="——"
              label="Products shipped"
              note="Figure not supplied"
            />
          </div>

          <p className="mt-[clamp(24px,2.6vw,44px)] border border-dashed border-[color:var(--line-strong)] bg-[color:var(--tint)] p-4 font-mono text-[12px] uppercase tracking-[0.1em] text-[color:var(--muted)]">
            Blocked — ships only when real headcount and product counts arrive. Otherwise delete
            the block.
          </p>
        </section>
      )}

      {/* ================= 5.7 Careers CTA ================= */}
      <section id="careers" className="bg-lime-500 gutter band-y">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-end gap-[clamp(28px,3vw,64px)]">
          <div>
            <p className="font-mono text-[12px] uppercase tracking-[0.16em] text-onlime-eyebrow">
              Careers
            </p>
            <h2 className="mt-4 font-display text-[clamp(40px,6.4vw,104px)] font-bold leading-[0.92] tracking-[-0.035em] text-grey-900">
              <span className="block">Be an</span>
              <span className="block">&lsquo;Airdroitechie&rsquo;</span>
            </h2>
          </div>

          <div>
            <p className="max-w-[48ch] text-[17px] leading-[1.62] text-onlime-body">
              Are you a tech enthusiast looking for a career journey? The hard work and dedication
              of our team — the AirdroiTechies — pave the way for everything we ship.
            </p>
            <div className="mt-7">
              <InkButton href="/careers/">See open positions</InkButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
