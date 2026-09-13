import type { Metadata } from 'next';
import type { ComponentPropsWithoutRef } from 'react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Accent } from '@/components/ui/Accent';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { getRolesByTeam } from '@/lib/roles';
import { EMAIL } from '@/lib/site';
import { ROLES_TEASER } from '../careers-copy';

/**
 * Route: /careers/open-positions/  (URL unchanged from the legacy site — do not rename)
 * Job:   List the roles and route applications.
 *
 * Roles and descriptions come from src/content/roles/*.mdx (ported from the
 * legacy page). Every role renders expanded — no collapsed rows — so no
 * description sits behind a click.
 *
 * No application form yet (user decision, 2026-09-13): each role applies by
 * email until Resend is configured and docs/OPEN-DECISIONS.md #6 (CV storage
 * under PDPA) is answered. Nothing here collects personal data.
 *
 * Every role file is `status: needs-confirmation` (OPEN-DECISIONS #4), so the
 * page never says a role is currently open and asks applicants to confirm
 * availability by email.
 */
export const metadata: Metadata = {
  title: 'Open positions',
  description:
    'Roles at AirdroiTech in Shah Alam across Engineering and Shared Services, with how to apply.',
  alternates: { canonical: '/careers/open-positions/' },
};

/**
 * Markdown bodies render under the role's h3, so body headings step down to h4.
 * Plain markdown ("md"), not MDX: job descriptions are copy, not components, and
 * md format cannot be broken by a stray `{` or `<` in the text.
 */
const mdComponents = {
  h1: (p: ComponentPropsWithoutRef<'h4'>) => <h4 className="mt-7 font-display text-[18px] font-bold tracking-[-0.01em] text-[color:var(--ink)]" {...p} />,
  h2: (p: ComponentPropsWithoutRef<'h4'>) => <h4 className="mt-7 font-display text-[18px] font-bold tracking-[-0.01em] text-[color:var(--ink)]" {...p} />,
  h3: (p: ComponentPropsWithoutRef<'h5'>) => <h5 className="mt-5 font-display text-[16px] font-bold text-[color:var(--ink)]" {...p} />,
  p: (p: ComponentPropsWithoutRef<'p'>) => <p className="mt-3 text-[15.5px] leading-[1.65] text-[color:var(--body)]" {...p} />,
  ul: (p: ComponentPropsWithoutRef<'ul'>) => <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[15.5px] leading-[1.6] text-[color:var(--body)] marker:text-[color:var(--muted)]" {...p} />,
  ol: (p: ComponentPropsWithoutRef<'ol'>) => <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-[15.5px] leading-[1.6] text-[color:var(--body)]" {...p} />,
  strong: (p: ComponentPropsWithoutRef<'strong'>) => <strong className="font-semibold text-[color:var(--ink)]" {...p} />,
  a: (p: ComponentPropsWithoutRef<'a'>) => <a className="text-[color:var(--link)] underline [text-underline-offset:4px]" {...p} />,
};

const applyHref = (title: string) =>
  `mailto:${EMAIL}?subject=${encodeURIComponent(`Application: ${title}`)}`;

export default function Page() {
  const byTeam = getRolesByTeam();
  const teams = Object.entries(byTeam);

  return (
    <>
      {/* ================= hero ================= */}
      <section className="gutter section-y">
        <Eyebrow className="tracking-[0.16em] text-[color:var(--muted)]">Careers</Eyebrow>
        <h1 className="mt-4 max-w-[16ch] font-display text-[clamp(44px,7vw,96px)] font-bold leading-[0.92] tracking-[-0.04em] text-[color:var(--ink)]">
          <Accent text="Be an AirdroiTechie" accent="AirdroiTechie" />
        </h1>
        {/* Legacy subline, verbatim. */}
        <p className="mt-5 max-w-[46ch] font-display text-[clamp(20px,2.4vw,30px)] font-bold leading-[1.25] tracking-[-0.02em] text-[color:var(--ink)]">
          All you need to know, to be a part of AirdroiTech!
        </p>
        <p className="prose-measure mt-5 text-[color:var(--body)]">
          Roles are listed as they appear on our careers page. To apply, or to check a role is still
          available, email your CV to {EMAIL} with the role in the subject line.
        </p>

        {/* Jump list: every role is on this page; this only shortens the scroll. */}
        <nav aria-label="Roles" className="mt-8 grid gap-6 sm:grid-cols-2">
          {teams.map(([team, roles]) => (
            <div key={team}>
              <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-[color:var(--eyebrow)]">
                {team}
              </p>
              <ul className="mt-2">
                {roles.map((role) => (
                  <li key={role.slug}>
                    <a
                      href={`#${role.slug}`}
                      className="inline-flex min-h-tap items-center text-[color:var(--link)] underline-offset-4 hover:underline"
                    >
                      {role.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </section>

      {/* ================= roles, by team ================= */}
      {teams.map(([team, roles]) => (
        <section key={team} className="gutter band-y border-t border-[color:var(--line)]">
          <h2 className="font-display text-[clamp(30px,4vw,56px)] font-bold leading-[1.04] tracking-[-0.03em] text-[color:var(--ink)]">
            {team}
          </h2>

          <div className="mt-8 grid gap-px border border-[color:var(--line)] bg-[color:var(--line)]">
            {roles.map((role) => (
              <article
                key={role.slug}
                id={role.slug}
                className="scroll-mt-[120px] bg-[color:var(--ground)] px-[clamp(20px,3vw,40px)] py-[clamp(24px,3vw,40px)]"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-[clamp(22px,2.4vw,32px)] font-bold leading-[1.1] tracking-[-0.02em] text-[color:var(--ink)]">
                      {role.title}
                    </h3>
                    <p className="mt-2 font-mono text-[12px] uppercase tracking-[0.12em] text-[color:var(--muted)]">
                      {[role.team, role.location, role.type].filter(Boolean).join(' · ')}
                    </p>
                  </div>
                  <Button href={applyHref(role.title)} variant="secondary">
                    Email your CV
                  </Button>
                </div>

                <div className="prose-measure mt-2">
                  <MDXRemote
                    source={role.body.replace(/<!--[\s\S]*?-->/g, '')}
                    components={mdComponents}
                    options={{ mdxOptions: { format: 'md' } }}
                  />
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}

      {/* ================= speculative applications ================= */}
      <section className="gutter band-y border-t border-[color:var(--line)] bg-[color:var(--tint)]">
        <h2 className="font-display text-[clamp(26px,3.2vw,44px)] font-bold leading-[1.06] tracking-[-0.03em] text-[color:var(--ink)]">
          <Accent text="Don’t see your role?" accent="your role" />
        </h2>
        {/* Legacy "Open Positions" invitation, verbatim. */}
        <p className="prose-measure mt-4 text-[color:var(--body)]">{ROLES_TEASER.body}</p>
        <div className="mt-7">
          <Button href={`mailto:${EMAIL}?subject=${encodeURIComponent('Speculative application')}`}>
            Email your CV to {EMAIL}
          </Button>
        </div>
      </section>
    </>
  );
}
