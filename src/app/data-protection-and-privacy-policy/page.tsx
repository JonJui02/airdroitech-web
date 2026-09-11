import type { Metadata } from 'next';

/**
 * Route: /data-protection-and-privacy-policy/  (URL is unchanged from the legacy WordPress site — do not rename)
 * Job:   PDPA compliance disclosure. Legal text: ports verbatim, no editorial rewrite.
 * Skeleton: docs/CONTENT-SKELETON.md -> "Data &amp; Privacy"
 *
 * Blocks still to build:
 *   01 Hero (keep)
 *   02 Seven-topic disclosure (keep VERBATIM, as real headings not a collapsed
 *      accordion - legal text must be Ctrl+F findable and crawlable)
 *   03 Policy PDF (keep, show size + last-updated)
 *   04 Cookie / consent posture (NEW - blocked)
 */

export const metadata: Metadata = {
  title: 'Data &amp; Privacy',
  alternates: { canonical: '/data-protection-and-privacy-policy/' },
};

export default function Page() {
  return (
    <div className="mx-auto max-w-container px-5 py-12">
      <p className="font-mono text-2xs uppercase tracking-[0.14em] text-[color:var(--muted)]">
        /data-protection-and-privacy-policy/
      </p>
      <h1 className="mt-3 text-3xl">Data &amp; Privacy</h1>
      <p className="prose-measure mt-4">
        Scaffold. Content blocks are specified in docs/CONTENT-SKELETON.md and
        the visual design is pending Claude Design output — see
        docs/CLAUDE-DESIGN-PROMPT.md.
      </p>
    </div>
  );
}
