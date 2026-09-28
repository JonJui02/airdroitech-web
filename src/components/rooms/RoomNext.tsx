import Link from 'next/link';
import type { MouseEvent, ReactNode } from 'react';

/** A plain left click. Anything else (new tab, new window) is left to the browser. */
export const plainClick = (e: MouseEvent) =>
  e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey;

/**
 * A link that changes room in place.
 *
 * It is a real link to the room's own page, so it works without JavaScript
 * and opens in a new tab on a modified click; a plain click calls `onGo`
 * instead and the console switches room.
 */
export function RoomLink({
  href,
  onGo,
  className = '',
  children,
  target = false,
}: {
  href: string;
  onGo?: () => void;
  className?: string;
  children: ReactNode;
  /** Mark as the room's next step: the Airflow background aims at it. */
  target?: boolean;
}) {
  return (
    <Link
      href={href}
      data-flow-target={target ? '' : undefined}
      onClick={(e) => {
        if (!onGo || !plainClick(e)) return;
        e.preventDefault();
        onGo();
      }}
      className={className}
    >
      {children}
    </Link>
  );
}

/**
 * The one named next step at the end of a room (design review, 2026-09-28).
 *
 * The rooms follow a job seeker's questions in dial order — who are you, what
 * would I work on, what is it like, which roles are there — and each ends by
 * saying where the next answer is, instead of a generic "Next room".
 */
export function RoomNext({
  label,
  href,
  onGo,
  className = '',
}: {
  label: string;
  href: string;
  onGo?: () => void;
  className?: string;
}) {
  return (
    <RoomLink
      href={href}
      onGo={onGo}
      target
      className={`group inline-flex min-h-[48px] items-center gap-3 border-b-2 border-chrome-state pr-1 font-display text-[19px] font-bold tracking-[-0.01em] text-chrome-ink transition-colors duration-200 hover:text-chrome-link ${className}`}
    >
      <span className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-chrome-link">Next</span>
      {label}
      <span
        aria-hidden="true"
        className="text-chrome-link transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none"
      >
        →
      </span>
    </RoomLink>
  );
}
