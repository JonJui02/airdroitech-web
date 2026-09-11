import type { Metadata } from 'next';

/**
 * Route: /what-we-do/  (URL is unchanged from the legacy WordPress site — do not rename)
 * Job:   Establish credibility: ownership, capability, location, team.
 * Skeleton: docs/CONTENT-SKELETON.md -> "About"
 *
 * Blocks still to build:
 *   01 Page hero (keep)        05 Location + lazy map (edit)
 *   02 Our story (keep)        06 Team (NEW - real names or drop the cards)
 *   03 Our approach (edit)     07 Values (keep)
 *   04 Capabilities detail (NEW)
 *   Legacy bug: sections here rendered blank at 375px. Resting state must be visible.
 */

export const metadata: Metadata = {
  title: 'About',
  alternates: { canonical: '/what-we-do/' },
};

export default function Page() {
  return (
    <div className="mx-auto max-w-container px-5 py-12">
      <p className="font-mono text-2xs uppercase tracking-[0.14em] text-[color:var(--muted)]">
        /what-we-do/
      </p>
      <h1 className="mt-3 text-3xl">About</h1>
      <p className="prose-measure mt-4">
        Scaffold. Content blocks are specified in docs/CONTENT-SKELETON.md and
        the visual design is pending Claude Design output — see
        docs/CLAUDE-DESIGN-PROMPT.md.
      </p>
    </div>
  );
}
