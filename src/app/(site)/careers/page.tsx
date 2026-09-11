import type { Metadata } from 'next';

/**
 * Route: /careers/  (URL is unchanged from the legacy WordPress site — do not rename)
 * Job:   Convince a Klang Valley engineer to apply, then send them to the roles list.
 * Skeleton: docs/CONTENT-SKELETON.md -> "Career"
 *
 * Blocks still to build:
 *   01 Hero (keep)             04 Values (keep)
 *   02 Perks (edit - icons leak raw labels: cookie/laptop/work/people)
 *   03 Programmes x3 (keep)    05 Life at ADT (edit or cut)
 *   06 Open roles teaser (edit) 07 Headcount counter (NEW - reads 1 today)
 */

export const metadata: Metadata = {
  title: 'Career',
  alternates: { canonical: '/careers/' },
};

export default function Page() {
  return (
    <div className="mx-auto max-w-container px-5 py-12">
      <p className="font-mono text-2xs uppercase tracking-[0.14em] text-[color:var(--muted)]">
        /careers/
      </p>
      <h1 className="mt-3 text-3xl">Career</h1>
      <p className="prose-measure mt-4">
        Scaffold. Content blocks are specified in docs/CONTENT-SKELETON.md and
        the visual design is pending Claude Design output — see
        docs/CLAUDE-DESIGN-PROMPT.md.
      </p>
    </div>
  );
}
