import type { Metadata } from 'next';

/**
 * Route: /projects/  (URL is unchanged from the legacy WordPress site — do not rename)
 * Job:   Two product lines, three entries, clear routes in.
 * Skeleton: docs/CONTENT-SKELETON.md -> "Projects"
 *
 * Blocks still to build:
 *   01 Hero (keep)             03 AirTouch Beam entry (NEW - missing from legacy index)
 *   02 AirTouch entry (keep)   04 PolyPlan entry (keep)
 */

export const metadata: Metadata = {
  title: 'Projects',
  alternates: { canonical: '/projects/' },
};

export default function Page() {
  return (
    <div className="mx-auto max-w-container px-5 py-12">
      <p className="font-mono text-2xs uppercase tracking-[0.14em] text-[color:var(--muted)]">
        /projects/
      </p>
      <h1 className="mt-3 text-3xl">Projects</h1>
      <p className="prose-measure mt-4">
        Scaffold. Content blocks are specified in docs/CONTENT-SKELETON.md and
        the visual design is pending Claude Design output — see
        docs/CLAUDE-DESIGN-PROMPT.md.
      </p>
    </div>
  );
}
