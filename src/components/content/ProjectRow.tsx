import Link from 'next/link';
import { ImageSlot } from '@/components/ui/ImageSlot';

export interface ProjectRowProps {
  kicker: string;
  name: string;
  copy: string;
  href: string;
  asset: string;
  /** Which side the image sits on at 1440. Rows alternate down the page. */
  media: 'left' | 'right';
  /** The first row takes the stronger top hairline. */
  firstRow?: boolean;
  lastRow?: boolean;
}

/**
 * Section 5.4 — a full-bleed row, the whole thing one link.
 *
 * Two columns via `auto-fit minmax(300px,1fr)`, so at 375 it collapses to a
 * single stacked column with no media query and no carousel. When the media
 * sits left at 1440, the text still comes first in the DOM and the image is
 * reordered visually only — reading order stays kicker, name, copy, action.
 */
export function ProjectRow({
  kicker,
  name,
  copy,
  href,
  asset,
  media,
  firstRow = false,
  lastRow = false,
}: ProjectRowProps) {
  const topBorder = firstRow ? 'border-t-[color:var(--line-strong)]' : 'border-t-[color:var(--line)]';

  return (
    <Link
      href={href}
      className={
        'grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-center ' +
        'gap-[clamp(20px,2.4vw,48px)] border-t gutter ' +
        'py-[clamp(24px,2.4vw,40px)] transition-colors hover:bg-[color:var(--tint)] ' +
        'focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 ' +
        `focus-visible:outline-[color:var(--accent)] ${topBorder} ` +
        (lastRow ? 'border-b border-b-[color:var(--line)]' : '')
      }
    >
      <div>
        <p className="font-mono text-[12px] uppercase tracking-[0.16em] text-[color:var(--muted)]">
          {kicker}
        </p>
        <h3 className="mt-3 text-balance font-display text-[clamp(32px,4.4vw,64px)] font-bold leading-[0.98] tracking-[-0.03em] text-[color:var(--ink)]">
          {name}
        </h3>
        <p className="mt-4 max-w-[44ch] text-[color:var(--body)]">{copy}</p>
        <span className="mt-5 inline-block font-semibold text-[color:var(--link)]">
          View project →
        </span>
      </div>

      <ImageSlot
        src={`/${asset}`}
        ratio="16/10"
        alt={`${name} — ${kicker}`}
        label={asset}
        sizes="(min-width: 1024px) 50vw, 100vw"
        fit="contain"
        padded
        className={media === 'left' ? 'lg:order-first' : ''}
      />
    </Link>
  );
}
