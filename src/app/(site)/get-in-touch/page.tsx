import type { Metadata } from 'next';

/**
 * Route: /get-in-touch/  (URL is unchanged from the legacy WordPress site — do not rename)
 * Job:   One route to a human, with the office findable.
 * Skeleton: docs/CONTENT-SKELETON.md -> "Contact"
 *
 * Blocks still to build:
 *   01 Hero (keep the hand-holding-phone illustration)
 *   02 Enquiry form (NEW - rebuild)
 *   03 Direct contact (keep)   04 Lazy map (edit)
 */

export const metadata: Metadata = {
  title: 'Contact',
  alternates: { canonical: '/get-in-touch/' },
};

export default function Page() {
  return (
    <div className="mx-auto max-w-container px-5 py-12">
      <p className="font-mono text-2xs uppercase tracking-[0.14em] text-[color:var(--muted)]">
        /get-in-touch/
      </p>
      <h1 className="mt-3 text-3xl">Contact</h1>
      <p className="prose-measure mt-4">
        Scaffold. Content blocks are specified in docs/CONTENT-SKELETON.md and
        the visual design is pending Claude Design output — see
        docs/CLAUDE-DESIGN-PROMPT.md.
      </p>
    </div>
  );
}
