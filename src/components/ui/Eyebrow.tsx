import type { ReactNode } from 'react';

interface EyebrowProps {
  children: ReactNode;
  /** Tailwind tracking + colour classes, which vary per block in the design. */
  className?: string;
  size?: string;
}

/**
 * Mono, uppercase, letter-spaced label. Tracking and colour are set per block
 * by the caller because the design varies both (.1em to .18em).
 */
export function Eyebrow({ children, className = '', size = 'text-[12px]' }: EyebrowProps) {
  return (
    <p className={`font-mono ${size} uppercase ${className}`}>{children}</p>
  );
}

/** Column label used in the footer and mobile drawer sections. */
export function ColumnLabel({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono text-[11.5px] uppercase tracking-[0.16em] text-chrome-meta">
      {children}
    </p>
  );
}
