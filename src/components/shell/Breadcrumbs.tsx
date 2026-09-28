import Link from 'next/link';
import { SITE_URL } from '@/lib/site-url';

export interface Crumb {
  label: string;
  href: string;
}

/**
 * One-line location trail for second-level pages (design review, 2026-09-28):
 * the three product pages and Open positions. A visitor who lands there from
 * search sees where they are. It shows location; it is not a second menu.
 *
 * The last crumb is the current page and is not a link. BreadcrumbList
 * structured data mirrors the visible trail.
 */
export function Breadcrumbs({ trail, className = '' }: { trail: Crumb[]; className?: string }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      item: new URL(c.href, SITE_URL).toString(),
    })),
  };

  return (
    <>
      <nav aria-label="Breadcrumb" className={className}>
        <ol className="flex flex-wrap items-center gap-x-2 font-mono text-[11.5px] uppercase tracking-[0.14em] text-[color:var(--muted)]">
          {trail.map((c, i) => {
            const last = i === trail.length - 1;
            return (
              <li key={c.href} className="flex items-center gap-2">
                {i > 0 ? <span aria-hidden="true">/</span> : null}
                {last ? (
                  <span aria-current="page" className="text-[color:var(--ink)]">
                    {c.label}
                  </span>
                ) : (
                  <Link
                    href={c.href}
                    className="inline-flex min-h-tap items-center underline decoration-[color:var(--line-strong)] [text-underline-offset:4px] transition-colors hover:text-[color:var(--link)] hover:decoration-[color:var(--link)]"
                  >
                    {c.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
