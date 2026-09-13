import type { Metadata } from 'next';
import { Button } from '@/components/ui/Button';
import { Accent } from '@/components/ui/Accent';
import { TypeText } from '@/components/ui/TypeText';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { ImageSlot } from '@/components/ui/ImageSlot';
import { getRolesByTeam } from '@/lib/roles';
import { EMAIL } from '@/lib/site';
import {
  ACTIVITIES,
  CAREERS_HERO,
  PERKS,
  PROGRAMMES,
  ROLES_TEASER,
  VALUES,
} from './careers-copy';

/**
 * Route: /careers/  (URL unchanged from the legacy WordPress site — do not rename)
 * Job:   Convince a Klang Valley engineer to apply, then send them to the roles.
 * Copy:  ./careers-copy.ts — ported from the legacy page; what was deliberately
 *        left out (headcount counter, LinkedIn widget roles) is documented there.
 *
 * No application form yet (user decision, 2026-09-13): applications go by
 * email until Resend is configured and docs/OPEN-DECISIONS.md #6 (where CVs may
 * be stored under PDPA) is answered. Nothing on this page collects personal data.
 *
 * The legacy "Our activities" tabs hid three of four panels behind a click;
 * here all four render at once, so nothing depends on a gesture to be seen.
 */
export const metadata: Metadata = {
  title: 'Career',
  description:
    'Work with AirdroiTech in Shah Alam: internship, engineering and shared services programmes, and the values we build on.',
  alternates: { canonical: '/careers/' },
};

const APPLY_MAILTO = `mailto:${EMAIL}?subject=${encodeURIComponent('Job application')}`;

export default function Page() {
  const byTeam = getRolesByTeam();
  const teams = Object.keys(byTeam);

  return (
    <>
      {/* ================= hero ================= */}
      <section className="gutter section-y">
        <div className="grid items-center gap-[clamp(28px,4vw,72px)] lg:grid-cols-2">
          <div>
            <Eyebrow className="tracking-[0.16em] text-[color:var(--muted)]">
              {CAREERS_HERO.eyebrow}
            </Eyebrow>
            <h1 className="mt-4 max-w-[16ch] font-display text-[clamp(48px,8vw,104px)] font-bold leading-[0.9] tracking-[-0.04em] text-[color:var(--ink)]">
              <Accent text={CAREERS_HERO.title} accent="AirdroiTech" />
            </h1>
            <p className="mt-5 font-mono text-[13px] uppercase tracking-[0.16em] text-[color:var(--muted)]">
              {CAREERS_HERO.established}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/careers/open-positions/">See the roles</Button>
              <Button href={APPLY_MAILTO} variant="secondary">
                Email your CV
              </Button>
            </div>
              </div>

          {/*
            Lab photo, 740x415 as supplied. Up to 380px wide on mobile and 560px on
            desktop (centred in the right half), both under the 740px source, and
            served untouched (unoptimized) so it is not recompressed. Rounded 14px
            corners are a deliberate exception to the square-corner rule in
            globals.css (user request 2026-09-13). Sharper on 2x
            desktop screens needs a higher-resolution original.
          */}
          <ImageSlot
            src="/hero/home-hero.jpg"
            ratio="740/415"
            alt="An AirdroiTech engineer in safety glasses soldering a green circuit board at a lab bench"
            label="hero/home-hero.jpg"
            sizes="(min-width: 1024px) 560px, min(380px, 100vw)"
            fit="cover"
            unoptimized
            priority
            className="max-w-[380px] rounded-[14px] border border-[color:var(--line)] lg:max-w-[560px] lg:justify-self-center"
          />
        </div>
      </section>

      {/* ================= perks ================= */}
      <section className="gutter band-y border-t border-[color:var(--line)]">
        <div className="grid gap-[clamp(20px,3vw,64px)] lg:grid-cols-[240px_1fr]">
          <Eyebrow className="tracking-[0.16em] text-[color:var(--eyebrow)]">{PERKS.label}</Eyebrow>
          <ul className="grid gap-px border border-[color:var(--line)] bg-[color:var(--line)] sm:grid-cols-2 lg:grid-cols-3">
            {PERKS.items.map((perk) => (
              <li
                key={perk}
                className="hover-box flex items-center gap-3 bg-[color:var(--ground)] px-5 py-5 text-[color:var(--ink)]"
              >
                <span aria-hidden="true" className="h-[7px] w-[7px] flex-none bg-[color:var(--green)]" />
                {perk}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ================= programmes ================= */}
      <section className="gutter band-y border-t border-[color:var(--line)]">
        <div className="grid gap-[clamp(20px,3vw,64px)] lg:grid-cols-[240px_1fr]">
          <Eyebrow className="tracking-[0.16em] text-[color:var(--eyebrow)]">
            {PROGRAMMES.label}
          </Eyebrow>
          <ul className="grid gap-px border border-[color:var(--line)] bg-[color:var(--line)] lg:grid-cols-3">
            {PROGRAMMES.items.map((p) => (
              <li key={p.title} className="hover-box bg-[color:var(--ground)] px-6 py-7">
                <h2 className="font-display text-[clamp(26px,2.6vw,36px)] font-bold leading-[1.05] tracking-[-0.02em] text-[color:var(--ink)]">
                  {p.title}
                </h2>
                <p className="mt-3 text-[15.5px] leading-[1.6] text-[color:var(--body)]">{p.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ================= values ================= */}
      <section className="gutter band-y border-t border-[color:var(--line)]">
        <div className="grid gap-[clamp(20px,3vw,64px)] lg:grid-cols-[240px_1fr]">
          <Eyebrow className="tracking-[0.16em] text-[color:var(--eyebrow)]">{VALUES.label}</Eyebrow>
          <div>
            <h2 className="flex flex-wrap items-baseline gap-x-[clamp(16px,3vw,48px)] gap-y-3 font-display text-[clamp(34px,5.4vw,72px)] font-bold leading-[1.02] tracking-[-0.035em] text-[color:var(--ink)]">
              {VALUES.words.map((word) => (
                <span key={word}>
                  {word}
                  <span aria-hidden="true" className="text-[color:var(--green)]">
                    .
                  </span>
                </span>
              ))}
            </h2>
            <p className="mt-4 font-mono text-[13px] uppercase tracking-[0.16em] text-[color:var(--eyebrow)]">
              {VALUES.sub}
            </p>
            <p className="prose-measure mt-4 text-[color:var(--body)]">{VALUES.body}</p>
          </div>
        </div>
      </section>

      {/* ================= life at AirdroiTech ================= */}
      <section className="gutter band-y border-t border-[color:var(--line)]">
        <div className="grid gap-[clamp(20px,3vw,64px)] lg:grid-cols-[240px_1fr]">
          <Eyebrow className="tracking-[0.16em] text-[color:var(--eyebrow)]">
            {ACTIVITIES.label}
          </Eyebrow>
          <ul className="grid gap-px border border-[color:var(--line)] bg-[color:var(--line)] sm:grid-cols-2">
            {ACTIVITIES.items.map((a) => (
              <li key={a.tag} className="hover-box bg-[color:var(--ground)] px-6 py-7">
                <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-[color:var(--eyebrow)]">
                  {a.tag}
                </p>
                <h2 className="mt-3 font-display text-[clamp(22px,2.2vw,30px)] font-bold leading-[1.1] tracking-[-0.02em] text-[color:var(--ink)]">
                  {a.title}
                </h2>
                <p className="mt-3 text-[15.5px] leading-[1.6] text-[color:var(--body)]">{a.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ================= roles teaser ================= */}
      <section className="gutter band-y border-t border-[color:var(--line)] bg-[color:var(--tint)]">
        <Eyebrow className="tracking-[0.16em] text-[color:var(--muted)]">{ROLES_TEASER.label}</Eyebrow>
        <h2 className="mt-4 font-display text-[clamp(30px,4vw,56px)] font-bold leading-[1.04] tracking-[-0.03em] text-[color:var(--ink)]">
          <TypeText text="Be an ‘Airdroitechie’" accent="‘Airdroitechie’" />
        </h2>
        <p className="prose-measure mt-4 text-[color:var(--body)]">{ROLES_TEASER.body}</p>
        {/*
          No count and never "open" (user request 2026-09-13): team names come from
          the role files, so this line needs no upkeep as roles change.
        */}
        <p className="mt-4 font-mono text-[13px] uppercase tracking-[0.14em] text-[color:var(--muted)]">
          Roles across {teams.join(' · ')}
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Button href="/careers/open-positions/">See the roles</Button>
          <Button href={APPLY_MAILTO} variant="secondary">
            Email your CV to {EMAIL}
          </Button>
        </div>
      </section>
    </>
  );
}
