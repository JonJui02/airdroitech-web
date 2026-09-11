import Image from 'next/image';

interface ImageSlotProps {
  /** Path under /public. When the asset does not exist yet, pass nothing. */
  src?: string;
  alt: string;
  /** CSS aspect-ratio value, e.g. "2.4/1", "16/10", "16/9". */
  ratio: string;
  /** Asset name shown on the placeholder so it is obvious what is missing. */
  label: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  minHeight?: string;
}

/**
 * A drop-in image slot.
 *
 * The signed-off design file uses image slots throughout; real photography for
 * the hero, the three project rows and the three mega-panel cells has not been
 * supplied (docs/OPEN-DECISIONS.md). Rather than ship stock or invented imagery,
 * an unfilled slot renders a clearly-marked placeholder at the correct aspect
 * ratio, so the layout is reviewable at the real proportions and nothing is
 * passed off as final.
 *
 * Drop the file into /public and pass `src` — nothing else changes.
 */
export function ImageSlot({
  src,
  alt,
  ratio,
  label,
  sizes,
  priority = false,
  className = '',
  minHeight,
}: ImageSlotProps) {
  const style = { aspectRatio: ratio, ...(minHeight ? { minHeight } : {}) };

  if (src) {
    return (
      <div className={`relative w-full overflow-hidden ${className}`} style={style}>
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
    );
  }

  return (
    <div
      className={
        'flex w-full items-end border border-dashed border-[color:var(--line-strong)] ' +
        `bg-[color:var(--tint)] p-3 ${className}`
      }
      style={style}
      role="img"
      aria-label={`Image placeholder: ${alt}`}
    >
      <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-[color:var(--muted)]">
        Asset needed · {label}
      </span>
    </div>
  );
}
