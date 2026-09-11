import type { Metadata } from 'next';

/**
 * Route: /projects/airtouch-beam/  (URL is unchanged from the legacy WordPress site — do not rename)
 * Job:   Newest product, strongest engineering story.
 * Skeleton: docs/CONTENT-SKELETON.md -> "AirTouch Beam"
 *
 * Blocks still to build:
 *   01 Hero (keep)             04 Features x3 (keep)
 *   02 What is Beam (keep)     05 Matter + ecosystems (keep the disclaimer verbatim)
 *   03 How it was built (edit) 06 Closing CTA (NEW - 'Order Now' has no destination)
 */

export const metadata: Metadata = {
  title: 'AirTouch Beam',
  alternates: { canonical: '/projects/airtouch-beam/' },
};

export default function Page() {
  return (
    <div className="mx-auto max-w-container px-5 py-12">
      <p className="font-mono text-2xs uppercase tracking-[0.14em] text-[color:var(--muted)]">
        /projects/airtouch-beam/
      </p>
      <h1 className="mt-3 text-3xl">AirTouch Beam</h1>
      <p className="prose-measure mt-4">
        Scaffold. Content blocks are specified in docs/CONTENT-SKELETON.md and
        the visual design is pending Claude Design output — see
        docs/CLAUDE-DESIGN-PROMPT.md.
      </p>
    </div>
  );
}
