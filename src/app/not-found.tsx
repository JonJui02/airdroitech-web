import Link from 'next/link';
import { SiteHeader } from '@/components/shell/SiteHeader';
import { Footer } from '@/components/shell/Footer';
import { ToneFrame } from '@/components/shell/ToneFrame';

/**
 * The root 404 renders the site shell itself.
 *
 * It cannot live inside the (site) route group — Next resolves the root
 * not-found for any unmatched path — and the root layout no longer carries the
 * header and footer, so without this a mistyped URL would land on a page with
 * no navigation at all.
 */
export default function NotFound() {
  return (
    <ToneFrame>
      <SiteHeader />
      <main id="main" className="mx-auto max-w-container px-5 py-20">
      <p className="font-mono text-2xs uppercase tracking-[0.14em] text-[color:var(--muted)]">
        404
      </p>
      <h1 className="mt-3 text-3xl">That page is not here</h1>
      <p className="prose-measure mt-4">
        The link may be old or mistyped. Try our projects or our open roles.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/projects/"
          className="inline-flex min-h-tap items-center rounded bg-teal-600 px-5 font-medium text-white hover:bg-teal-700"
        >
          See our projects
        </Link>
        <Link
          href="/careers/"
          className="inline-flex min-h-tap items-center rounded border border-teal-600 px-5 font-medium text-teal-700 hover:bg-teal-50"
        >
          Work with us
        </Link>
        </div>
      </main>
      <Footer />
    </ToneFrame>
  );
}
