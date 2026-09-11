import type { Metadata } from 'next';

/**
 * Route: /careers/open-positions/  (URL is unchanged from the legacy WordPress site — do not rename)
 * Job:   List live roles and capture a complete, validated application with a CV.
 * Skeleton: docs/CONTENT-SKELETON.md -> "Open positions"
 *
 * Blocks still to build:
 *   01 Hero (keep)
 *   02 Roles list (edit - 8 roles from src/content/roles/, delete the TBA group)
 *   03 Application form (NEW - rebuild, every field required)
 *   04 Speculative applications (keep, move here from /careers/)
 *   05 Newsletter signup (edit - blocked on provider decision)
 */

export const metadata: Metadata = {
  title: 'Open positions',
  alternates: { canonical: '/careers/open-positions/' },
};

export default function Page() {
  return (
    <div className="mx-auto max-w-container px-5 py-12">
      <p className="font-mono text-2xs uppercase tracking-[0.14em] text-[color:var(--muted)]">
        /careers/open-positions/
      </p>
      <h1 className="mt-3 text-3xl">Open positions</h1>
      <p className="prose-measure mt-4">
        Scaffold. Content blocks are specified in docs/CONTENT-SKELETON.md and
        the visual design is pending Claude Design output — see
        docs/CLAUDE-DESIGN-PROMPT.md.
      </p>
    </div>
  );
}
