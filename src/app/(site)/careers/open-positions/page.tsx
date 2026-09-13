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
 * Job:   Let a visitor scan the roles and read only the ones that interest them.
 *
 * Layout (user request 2026-09-13 — the fully expanded page read as a wall of
 * text): each team is a collapsible list, open by default so every role title
 * is visible at once; each role is a dropdown whose job description and apply
 * button open on click.
 *
 * Native <details>/<summary>: every description is in the server HTML, so it
 * stays crawlable and Ctrl+F finds (and in Chromium browsers opens) it. This is
 * a disclosure, not a carousel — CLAUDE.md #3's resting-state rule holds: role
 * titles are always visible, and nothing is parked at opacity 0.
 *
 * Roles come from src/content/roles/*.mdx. No application form yet (user
 * decision 2026-09-13): each role applies by email. Every role file is
 * `status: needs-confirmation` (OPEN-DECISIONS #4), so the page never says a
 * role is currently open.
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

/** Down chevron; rotates to point up while its dropdown is open. */
function Chevron({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export default function Page() {
  const teams = Object.entries(getRolesByTeam());

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
          Open any role to read its job description. To apply, or to check a role is still
          available, email your CV to {EMAIL} with the role in the subject line.
        </p>
      </section>

      {/* ================= roles, by team ================= */}
      {teams.map(([team, roles]) => (
        <section key={team} className="gutter band-y border-t border-[color:var(--line)]">
          <details open className="group/team">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 [&::-webkit-details-marker]:hidden">
              <h2 className="font-display text-[clamp(30px,4vw,56px)] font-bold leading-[1.04] tracking-[-0.03em] text-[color:var(--ink)]">
                {team}
              </h2>
              <span className="flex flex-none items-center gap-3 font-mono text-[12px] uppercase tracking-[0.14em] text-[color:var(--muted)]">
                {/* No count (user request 2026-09-13): nothing to update as roles change. */}
                <span className="group-open/team:hidden">Show roles</span>
                <span className="hidden group-open/team:inline">Hide roles</span>
                <span className="flex h-[44px] w-[44px] items-center justify-center border border-[color:var(--line-strong)] text-[color:var(--link)]">
                  <Chevron className="h-5 w-5 transition-transform duration-200 group-open/team:rotate-180" />
                </span>
              </span>
            </summary>

            <div className="mt-8 grid animate-pane-in-fast gap-px border border-[color:var(--line)] bg-[color:var(--line)]">
              {roles.map((role) => (
                <details key={role.slug} id={role.slug} className="group/role scroll-mt-[120px] bg-[color:var(--ground)]">
                  <summary className="hover-box flex cursor-pointer list-none items-center justify-between gap-4 bg-[color:var(--ground)] px-[clamp(20px,3vw,40px)] py-[clamp(18px,2vw,26px)] [&::-webkit-details-marker]:hidden">
                    <span className="min-w-0">
                      <h3 className="font-display text-[clamp(20px,2.2vw,28px)] font-bold leading-[1.15] tracking-[-0.02em] text-[color:var(--ink)]">
                        {role.title}
                      </h3>
                      <span className="mt-2 block font-mono text-[12px] uppercase tracking-[0.12em] text-[color:var(--muted)]">
                        {[role.location, role.type].filter(Boolean).join(' · ')}
                      </span>
                    </span>
                    <span className="flex flex-none items-center gap-3 font-mono text-[12px] uppercase tracking-[0.14em] text-[color:var(--link)]">
                      <span className="hidden sm:inline">
                        <span className="group-open/role:hidden">Read job description</span>
                        <span className="hidden group-open/role:inline">Hide</span>
                      </span>
                      <Chevron className="h-5 w-5 transition-transform duration-200 group-open/role:rotate-180" />
                    </span>
                  </summary>

                  <div className="animate-pane-in-fast border-t border-[color:var(--line)] px-[clamp(20px,3vw,40px)] pb-[clamp(24px,3vw,40px)] pt-[clamp(18px,2vw,26px)]">
                    <Button href={applyHref(role.title)} variant="secondary">
                      Email your CV
                    </Button>
                    <div className="prose-measure mt-2">
                      <MDXRemote
                        source={role.body.replace(/<!--[\s\S]*?-->/g, '')}
                        components={mdComponents}
                        options={{ mdxOptions: { format: 'md' } }}
                      />
                    </div>
                  </div>
                </details>
              ))}
            </div>
          </details>
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
