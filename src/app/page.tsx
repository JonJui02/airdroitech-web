import type { Metadata } from 'next';

/**
 * Route: /  (URL is unchanged from the legacy WordPress site — do not rename)
 * Job:   Say what ADT is in one screen, then route to Projects or Careers.
 * Skeleton: docs/CONTENT-SKELETON.md -> "Home"
 *
 * Blocks still to build:
 *   01 Hero (edit)            05 Polyaire relationship (edit)
 *   02 Positioning (edit)      06 Proof numbers (NEW - blocked)
 *   03 Capability strip (NEW)  07 Careers CTA (keep)
 *   04 Projects showcase (edit, kill the swipe carousel)
 *   08 Footer (edit - reconcile the two address strings)
 */

export const metadata: Metadata = {
  title: 'Home',
  alternates: { canonical: '/' },
};

export default function Page() {
  return (
    <div className="mx-auto max-w-container px-5 py-12">
      <p className="font-mono text-2xs uppercase tracking-[0.14em] text-[color:var(--muted)]">
        /
      </p>
      <h1 className="mt-3 text-3xl">Home</h1>
      <p className="prose-measure mt-4">
        Scaffold. Content blocks are specified in docs/CONTENT-SKELETON.md and
        the visual design is pending Claude Design output — see
        docs/CLAUDE-DESIGN-PROMPT.md.
      </p>
    </div>
  );
}
