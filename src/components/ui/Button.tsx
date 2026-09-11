import Link from 'next/link';
import type { ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'accent' | 'secondary' | 'ghost';

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  external?: boolean;
  className?: string;
  /** Fills the available width — used by the mobile drawer's Contact action. */
  block?: boolean;
}

/**
 * Homepage design v3, section 6.
 *
 * All four variants: square corners, no wrapping, min-height >= 44px (54-56px
 * for page-level actions), and an explicit focus ring. Hover colours that differ
 * between light and dark come from CSS custom properties rather than a `dark:`
 * variant, because the site has three theme states — an un-stamped "system"
 * root included — and `dark:` only covers the stamped one.
 */
const BASE =
  'inline-flex flex-[0_0_auto] items-center justify-center whitespace-nowrap ' +
  'font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2';

const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    'min-h-[54px] px-7 text-[16px] bg-teal-600 text-white ' +
    'hover:bg-[color:var(--primary-hover)] ' +
    'focus-visible:outline focus-visible:outline-[color:var(--accent)]',

  // One per page. Unused on the homepage — the lime is spent on the careers
  // field instead, and the brand rule is one lime action per screen.
  accent:
    'min-h-[54px] px-7 text-[16px] bg-lime-500 text-grey-900 hover:bg-[#8FBE2B] ' +
    'focus-visible:outline focus-visible:outline-grey-900',

  secondary:
    'min-h-[54px] px-7 text-[16px] border-[1.5px] bg-transparent ' +
    'border-[color:var(--btn2-border)] text-[color:var(--link)] ' +
    'hover:border-[color:var(--btn2-border-hover)] ' +
    'focus-visible:outline focus-visible:outline-[color:var(--accent)]',

  ghost:
    'min-h-tap px-0 text-[16px] underline [text-underline-offset:5px] ' +
    'text-[color:var(--link)] hover:no-underline ' +
    'focus-visible:outline focus-visible:outline-[color:var(--accent)]',
};

export function Button({
  href,
  children,
  variant = 'primary',
  external = false,
  className = '',
  block = false,
}: ButtonProps) {
  const classes = `${BASE} ${VARIANTS[variant]} ${block ? 'w-full' : ''} ${className}`.trim();

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}

/**
 * The careers-field action. Solid ink on the lime ground, per section 5.7 —
 * the only place on the page where a button sits on lime, so it does not reuse
 * the themed variants above.
 */
export function InkButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className={
        'inline-flex flex-[0_0_auto] items-center justify-center whitespace-nowrap ' +
        'min-h-[56px] px-8 text-[17px] font-semibold bg-grey-900 text-white ' +
        'transition-colors hover:bg-chrome-ink-hover ' +
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] ' +
        'focus-visible:outline-grey-900'
      }
    >
      {children}
    </Link>
  );
}
