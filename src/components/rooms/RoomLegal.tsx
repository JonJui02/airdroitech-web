import Link from 'next/link';
import { COMPANY_LINE } from '@/lib/site';

/**
 * The legal row — what the old site footer carried and the console dropped.
 *
 * The 2a design has no footer: the dock replaces it. But the dock only reports
 * which room you are in, so the registration line and the privacy policy link
 * disappeared from the homepage entirely, and the Data & Privacy route became
 * unreachable from `/`.
 *
 * These are real anchors to the legacy routes, not room buttons. That has a
 * second benefit: they work with JavaScript disabled, so a visitor without JS
 * can still reach the privacy policy and the rest of the site from the
 * homepage.
 */
export const LEGAL_LINKS = [
  { label: 'About', href: '/what-we-do/' },
  { label: 'Projects', href: '/projects/' },
  { label: 'Career', href: '/careers/' },
  { label: 'Contact', href: '/get-in-touch/' },
  { label: 'Data & Privacy Policy', href: '/data-protection-and-privacy-policy/' },
] as const;

export function RoomLegal({ className = '' }: { className?: string }) {
  return (
    <div
      className={`flex flex-wrap items-center gap-x-[18px] gap-y-1 font-mono text-[10.5px] uppercase tracking-[0.12em] text-chrome-meta ${className}`}
    >
      <span>{COMPANY_LINE}</span>
      <nav aria-label="Legal and site links" className="flex flex-wrap items-center gap-x-[18px]">
        {LEGAL_LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="inline-flex items-center py-1 underline decoration-chrome-border [text-underline-offset:4px] transition-colors duration-200 hover:text-lime-500 hover:decoration-lime-500"
          >
            {l.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
