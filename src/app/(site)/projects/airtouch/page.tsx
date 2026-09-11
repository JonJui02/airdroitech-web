import type { Metadata } from 'next';

/**
 * Route: /projects/airtouch/  (URL is unchanged from the legacy WordPress site — do not rename)
 * Job:   Explain the flagship product and ADT's engineering contribution to it.
 * Skeleton: docs/CONTENT-SKELETON.md -> "AirTouch"
 *
 * Blocks still to build:
 *   01 Hero (keep, label the CTA)   04 Ecosystem: Alexa, Google Home (keep)
 *   02 What it is (edit)            05 ADT's role per layer (NEW)
 *   03 App control + geofencing (keep) 06 Beam cross-link (keep)
 */

export const metadata: Metadata = {
  title: 'AirTouch',
  alternates: { canonical: '/projects/airtouch/' },
};

export default function Page() {
  return (
    <div className="mx-auto max-w-container px-5 py-12">
      <p className="font-mono text-2xs uppercase tracking-[0.14em] text-[color:var(--muted)]">
        /projects/airtouch/
      </p>
      <h1 className="mt-3 text-3xl">AirTouch</h1>
      <p className="prose-measure mt-4">
        Scaffold. Content blocks are specified in docs/CONTENT-SKELETON.md and
        the visual design is pending Claude Design output — see
        docs/CLAUDE-DESIGN-PROMPT.md.
      </p>
    </div>
  );
}
