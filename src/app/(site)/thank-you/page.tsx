import type { Metadata } from 'next';

/**
 * Route: /thank-you/  (URL is unchanged from the legacy WordPress site — do not rename)
 * Job:   Post-submit confirmation so a submission has a shareable success URL.
 * Skeleton: docs/CONTENT-SKELETON.md -> "Thank you"
 *
 * Blocks still to build:
 *   01 Confirmation + what happens next
 *   02 Routes back into Projects and Careers
 */

export const metadata: Metadata = {
  title: 'Thank you',
  alternates: { canonical: '/thank-you/' },
};

export default function Page() {
  return (
    <div className="mx-auto max-w-container px-5 py-12">
      <p className="font-mono text-2xs uppercase tracking-[0.14em] text-[color:var(--muted)]">
        /thank-you/
      </p>
      <h1 className="mt-3 text-3xl">Thank you</h1>
      <p className="prose-measure mt-4">
        Scaffold. Content blocks are specified in docs/CONTENT-SKELETON.md and
        the visual design is pending Claude Design output — see
        docs/CLAUDE-DESIGN-PROMPT.md.
      </p>
    </div>
  );
}
