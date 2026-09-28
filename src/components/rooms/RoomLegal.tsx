import Link from 'next/link';
import { COMPANY_LINE } from '@/lib/site';

/**
 * The console's legal line: the company registration and the privacy policy.
 *
 * It used to carry a row of page links as well, as the way off `/` without
 * JavaScript. The dial's room names are now real links to those pages (see
 * RoomDial), so this line keeps only what a footer must: who we are and the
 * privacy policy. One quiet line, not a second menu (design review,
 * 2026-09-28).
 */
export function RoomLegal({ className = '' }: { className?: string }) {
  return (
    <p
      className={`flex flex-wrap items-center gap-x-[18px] gap-y-1 font-mono text-[10.5px] uppercase tracking-[0.12em] text-chrome-meta ${className}`}
    >
      <span>{COMPANY_LINE}</span>
      <Link
        href="/data-protection-and-privacy-policy/"
        className="inline-flex min-h-tap items-center underline decoration-chrome-border [text-underline-offset:4px] transition-colors duration-200 hover:text-chrome-link hover:decoration-chrome-link"
      >
        Data &amp; Privacy Policy
      </Link>
    </p>
  );
}
