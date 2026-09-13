import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Accent } from '@/components/ui/Accent';
import { TypeText } from '@/components/ui/TypeText';
import { Carousel3D } from '@/components/ui/Carousel3D';
import { TEAM_PHOTOS } from '@/components/rooms/panes/copy';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { ADDRESS_LINES, CAPABILITIES, POLYAIRE } from '@/lib/site';
import { ABOUT_HERO, APPROACH, STORY, TEAM, VALUES } from './about-copy';

/**
 * Route: /what-we-do/  (URL unchanged from the legacy WordPress site)
 * Job:   Establish credibility: ownership, capability, location, team.
 * Copy:  ./about-copy.ts — ported from the legacy page, with what it could not
 *        honestly port documented there.
 *
 * The legacy version of this page was one of the worst hit by the blank-section
 * bug: sections sat at opacity 0 waiting on an observer that never fired at
 * 375px. Nothing here has a hidden resting state, there is no observer, and no
 * section depends on JavaScript to become visible.
 */
export const metadata: Metadata = {
  title: 'About',
  description:
    'AirdroiTech is Polyaire’s research and development arm in Malaysia, working from Shah Alam, Selangor on smart home, IoT and HVAC software since 2021.',
  alternates: { canonical: '/what-we-do/' },
};

const MAPS = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  ADDRESS_LINES.join(' '),
)}`;

export default function Page() {
  return (
    <>
      {/* ================= hero ================= */}
      <section className="gutter section-y">
        <Eyebrow className="tracking-[0.16em] text-[color:var(--eyebrow)]">
          {ABOUT_HERO.eyebrow}
        </Eyebrow>
        <h1 className="mt-4 max-w-[14ch] font-display text-[clamp(48px,8vw,104px)] font-bold leading-[0.9] tracking-[-0.04em] text-[color:var(--ink)]">
          <span className="hover-sweep">{ABOUT_HERO.title}</span>
        </h1>
        <p className="mt-5 font-mono text-[13px] uppercase tracking-[0.16em] text-[color:var(--eyebrow)]">
          {ABOUT_HERO.established}
        </p>
      </section>

      {/* ================= our story ================= */}
      <section className="gutter band-y border-t border-[color:var(--line)]">
        <div className="grid gap-[clamp(20px,3vw,64px)] lg:grid-cols-[240px_1fr]">
          <Eyebrow className="tracking-[0.16em] text-[color:var(--eyebrow)]">{STORY.label}</Eyebrow>
          <div>
            <p className="max-w-[46ch] font-display text-[clamp(24px,2.8vw,38px)] font-bold leading-[1.22] tracking-[-0.02em] text-[color:var(--ink)]">
              {STORY.body}
            </p>
            <p className="mt-6">
              <Button href={POLYAIRE} variant="ghost">
                polyaire.com.au ↗
              </Button>
            </p>
          </div>
        </div>
      </section>

      {/* ================= our approach ================= */}
      <section className="gutter band-y border-t border-[color:var(--line)]">
        <div className="grid gap-[clamp(20px,3vw,64px)] lg:grid-cols-[240px_1fr]">
          <Eyebrow className="tracking-[0.16em] text-[color:var(--eyebrow)]">
            {APPROACH.label}
          </Eyebrow>
          <div>
            <h2 className="font-display text-[clamp(30px,4vw,56px)] font-bold leading-[1.04] tracking-[-0.03em] text-[color:var(--ink)]">
              {APPROACH.heading}
            </h2>
            <p className="prose-measure mt-5 text-[color:var(--body)]">{APPROACH.body}</p>

            <ul className="mt-8 grid gap-px border border-[color:var(--line)] bg-[color:var(--line)] sm:grid-cols-3">
              {APPROACH.points.map((point) => (
                <li
                  key={point}
                  className="hover-box bg-[color:var(--ground)] px-5 py-6 font-display text-[19px] font-bold leading-[1.25] tracking-[-0.01em] text-[color:var(--ink)]"
                >
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ================= capabilities ================= */}
      <section className="gutter band-y border-t border-[color:var(--line)]">
        <div className="grid gap-[clamp(20px,3vw,64px)] lg:grid-cols-[240px_1fr]">
          <Eyebrow className="tracking-[0.16em] text-[color:var(--eyebrow)]">Capabilities</Eyebrow>
          <ul className="grid gap-px border border-[color:var(--line)] bg-[color:var(--line)] sm:grid-cols-2 lg:grid-cols-3">
            {CAPABILITIES.map((capability) => (
              <li
                key={capability}
                className="hover-box flex items-center gap-3 bg-[color:var(--ground)] px-5 py-5 text-[color:var(--ink)]"
              >
                <span aria-hidden="true" className="h-[7px] w-[7px] flex-none bg-[color:var(--green)]" />
                {capability}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ================= team ================= */}
      <section className="gutter band-y border-t border-[color:var(--line)]">
        <div className="grid gap-[clamp(20px,3vw,64px)] lg:grid-cols-[240px_1fr]">
          <Eyebrow className="tracking-[0.16em] text-[color:var(--muted)]">{TEAM.label}</Eyebrow>
          <div>
            <h2 className="font-display text-[clamp(30px,4vw,56px)] font-bold leading-[1.04] tracking-[-0.03em] text-[color:var(--ink)]">
              <Accent text={TEAM.heading} accent="AirdroiTechies" />
            </h2>
            <p className="prose-measure mt-5 text-[color:var(--body)]">{TEAM.line}</p>

            <ul className="mt-8 flex flex-wrap gap-2">
              {TEAM.groups.map((group) => (
                <li
                  key={group}
                  className="hover-box border border-[color:var(--line-strong)] px-4 py-2 font-mono text-[12.5px] uppercase tracking-[0.1em] text-[color:var(--body)]"
                >
                  {group}
                </li>
              ))}
            </ul>

            {/*
              Every supplied team photo, same 4:3 frame so the heights match.
              Capped at 600px on mobile and tablet and 900px on desktop (front slide about 540px). The older photos are 627–800px wide, so the mobile cap is 600px
              (front slide about 360px): a 2x screen shows each one at about its
              native resolution, and unoptimized serves the files untouched
              instead of recompressing them.
            */}
            <Carousel3D
              slides={TEAM_PHOTOS}
              label="AirdroiTech team photos"
              ratio="4/3"
              fit="cover"
              itemWidth={0.6}
              sizes="(min-width: 1024px) 540px, (min-width: 640px) 360px, 60vw"
              unoptimized
              className="mt-10 max-w-[600px] lg:max-w-[900px]"
            />
          </div>
        </div>
      </section>

      {/* ================= values ================= */}
      <section className="gutter band-y border-t border-[color:var(--line)]">
        <div className="grid gap-[clamp(20px,3vw,64px)] lg:grid-cols-[240px_1fr]">
          <Eyebrow className="tracking-[0.16em] text-[color:var(--eyebrow)]">Our values</Eyebrow>
          <ul className="flex flex-wrap items-baseline gap-x-[clamp(16px,3vw,48px)] gap-y-3">
            {VALUES.map((value) => (
              <li
                key={value}
                className="font-display text-[clamp(34px,5.4vw,72px)] font-bold leading-[1.02] tracking-[-0.035em] text-[color:var(--ink)]"
              >
                {value}
                <span aria-hidden="true" className="text-[color:var(--green)]">
                  .
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ================= location ================= */}
      <section className="gutter band-y border-t border-[color:var(--line)]">
        <div className="grid gap-[clamp(20px,3vw,64px)] lg:grid-cols-[240px_1fr]">
          <Eyebrow className="tracking-[0.16em] text-[color:var(--eyebrow)]">Our location</Eyebrow>
          <div>
            <address className="font-display text-[clamp(20px,2.2vw,30px)] font-bold not-italic leading-[1.35] tracking-[-0.01em] text-[color:var(--ink)]">
              {ADDRESS_LINES.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
            {/*
              A link, not an embedded map. An iframe would load Google's
              payload on every visit and raise the analytics-and-consent
              question in docs/OPEN-DECISIONS.md #7 before it has been answered.
            */}
            <p className="mt-6">
              <Button href={MAPS} variant="ghost">
                Open in Google Maps ↗
              </Button>
            </p>
          </div>
        </div>
      </section>

      {/* ================= careers CTA ================= */}
      <section className="gutter band-y border-t border-[color:var(--line)] bg-[color:var(--tint)]">
        <h2 className="font-display text-[clamp(26px,3.2vw,44px)] font-bold leading-[1.06] tracking-[-0.03em] text-[color:var(--ink)]">
          <TypeText text="Be an ‘Airdroitechie’" accent="‘Airdroitechie’" />
        </h2>
        <div className="mt-7 flex flex-wrap gap-3">
          <Button href="/careers/">See open positions</Button>
          <Button href="/get-in-touch/" variant="secondary">
            Get in touch
          </Button>
        </div>
        <p className="mt-6 text-[color:var(--body)]">
          Or read what we build on the{' '}
          <Link href="/projects/" className="text-[color:var(--link)] underline [text-underline-offset:4px]">
            projects page
          </Link>
          .
        </p>
      </section>
    </>
  );
}
