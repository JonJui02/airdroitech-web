import type { Metadata } from 'next';

/**
 * Route: /projects/polyplan/  (URL is unchanged from the legacy WordPress site — do not rename)
 * Job:   Show ADT owning a production B2B CAD platform used by Australian HVAC trades.
 * Skeleton: docs/CONTENT-SKELETON.md -> "PolyPlan"
 *
 * Blocks still to build:
 *   01 Hero (keep)             03 Feature set x4 (keep)
 *   02 ADT's mandate (keep)    04 Product screenshots (NEW)
 */

export const metadata: Metadata = {
  title: 'PolyPlan',
  alternates: { canonical: '/projects/polyplan/' },
};

export default function Page() {
  return (
    <div className="mx-auto max-w-container px-5 py-12">
      <p className="font-mono text-2xs uppercase tracking-[0.14em] text-[color:var(--muted)]">
        /projects/polyplan/
      </p>
      <h1 className="mt-3 text-3xl">PolyPlan</h1>
      <p className="prose-measure mt-4">
        Scaffold. Content blocks are specified in docs/CONTENT-SKELETON.md and
        the visual design is pending Claude Design output — see
        docs/CLAUDE-DESIGN-PROMPT.md.
      </p>
    </div>
  );
}
