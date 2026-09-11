import Link from 'next/link';
import { BrandLogo } from './BrandLogo';
import { ColumnLabel } from '@/components/ui/Eyebrow';
import { ADDRESS_LINES, COMPANY_LINE, EMAIL, LINKEDIN, POLYAIRE, PRODUCTS } from '@/lib/site';

const ROW =
  'flex min-h-[40px] items-center text-[#C3CBC6] transition-colors hover:text-white ' +
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ' +
  'focus-visible:outline-lime-500';

const COMPANY_LINKS = [
  { label: 'About', href: '/what-we-do/' },
  { label: 'Career', href: '/careers/' },
  { label: 'Contact', href: '/get-in-touch/' },
  { label: 'Data & Privacy', href: '/data-protection-and-privacy-policy/' },
];

/** Section 5.8 — shared footer, reused unchanged by every page. */
export function Footer() {
  return (
    <footer id="contact" className="bg-chrome-ground gutter band-y">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(210px,1fr))] gap-[clamp(28px,3vw,56px)]">
        <div>
          <BrandLogo height="30px" />
          <address className="mt-5 text-[15px] not-italic leading-[1.75] text-[#C3CBC6]">
            {ADDRESS_LINES.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
          <a
            href={`mailto:${EMAIL}`}
            className="mt-4 inline-flex min-h-tap items-center text-lime-500 underline [text-underline-offset:4px]"
          >
            {EMAIL}
          </a>
          <br />
          <a
            href={LINKEDIN}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-tap items-center text-lime-500 underline [text-underline-offset:4px]"
          >
            LinkedIn
          </a>
        </div>

        <nav aria-label="Company">
          <ColumnLabel>Company</ColumnLabel>
          <ul className="mt-2">
            {COMPANY_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={ROW}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Projects">
          <ColumnLabel>Projects</ColumnLabel>
          <ul className="mt-2">
            {PRODUCTS.map((p) => (
              <li key={p.href}>
                <Link href={p.href} className={ROW}>
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <ColumnLabel>Part of</ColumnLabel>
          <p className="mt-2 max-w-[32ch] text-[15px] leading-[1.75] text-[#C3CBC6]">
            Polyaire — Australia&rsquo;s largest air-conditioning wholesale network.
          </p>
          <a
            href={POLYAIRE}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex min-h-tap items-center text-lime-500 underline [text-underline-offset:4px]"
          >
            polyaire.com.au ↗
          </a>
        </div>
      </div>

      {/*
        Ghosted statement line. Near-invisible against the ground by design: it is
        decoration, carries no information, and every fact near it is stated in
        real contrast above. aria-hidden so it is not announced either.
      */}
      <p
        aria-hidden="true"
        className="mt-[clamp(40px,4.4vw,80px)] font-display text-[clamp(30px,5.6vw,84px)] font-bold leading-[0.95] tracking-[-0.035em] text-chrome-hover"
      >
        Programming Intelligence
      </p>

      <div className="mt-[clamp(24px,2.6vw,40px)] flex flex-wrap items-center justify-between gap-4 border-t border-chrome-line pt-5 font-mono text-[12px] text-chrome-meta">
        <span>{COMPANY_LINE}</span>
        <Link
          href="/data-protection-and-privacy-policy/"
          className="min-h-tap inline-flex items-center transition-colors hover:text-lime-500"
        >
          Data &amp; Privacy Policy
        </Link>
      </div>
    </footer>
  );
}
