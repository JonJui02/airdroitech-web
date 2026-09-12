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
  /**
   * How the image fills the slot.
   *
   * `cover` (default) crops to fill — right for photography, where the frame is
   * a composition and trimming its edges is harmless.
   *
   * `contain` fits the whole image in and pads the remainder. Use it for
   * product shots isolated on a white ground: they are not compositions, and
   * cropping one cuts the product or its wordmark off. Pair with `padded`.
   */
  fit?: 'cover' | 'contain';
  /**
   * Historically padded a `contain` image onto a white plate, because the
   * supplied product shots were JPEGs matted on white and the matte would not
   * blend with a themed ground.
   *
   * The mattes have since been cut (scripts/matte-cut.mjs) and the product
   * imagery is transparent WebP, so images sit directly on the page ground and
   * nothing needs a plate. Kept only so a future non-transparent asset has an
   * escape hatch — do not reach for it otherwise.
   */
  padded?: boolean;
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
  fit = 'cover',
  padded = false,
}: ImageSlotProps) {
  const style = { aspectRatio: ratio, ...(minHeight ? { minHeight } : {}) };

  if (src) {
    return (
      <div
        className={
          `relative w-full overflow-hidden ${padded ? 'bg-white' : ''} ${className}`
        }
        style={style}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={fit === 'contain' ? 'object-contain' : 'object-cover'}
        />
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
