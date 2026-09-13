'use client';

import { useState, type ReactNode } from 'react';

interface OutboundLinkProps {
  href: string;
  children: ReactNode;
  /** Destination as a person would say it, for the screen-reader hint. */
  site: string;
  className?: string;
}

/**
 * A link to a product's official site.
 *
 * Opens in a new tab so the visitor keeps AirdroiTech open behind it. On click
 * the link fades briefly — 200ms, the motion policy's cap — so leaving reads as
 * deliberate rather than a page that jumped. The global prefers-reduced-motion
 * rule clamps the fade to nothing.
 *
 * The click is never delayed or prevented: holding the navigation for an
 * animation would trip popup blockers, and the fade is feedback, not a gate.
 * The resting state is fully opaque, so nothing depends on JavaScript to be
 * visible, and without JavaScript it is an ordinary link.
 */
export function OutboundLink({ href, children, site, className = '' }: OutboundLinkProps) {
  const [leaving, setLeaving] = useState(false);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => {
        setLeaving(true);
        window.setTimeout(() => setLeaving(false), 700);
      }}
      className={`transition-opacity duration-200 ease-out ${
        leaving ? 'opacity-60' : 'opacity-100'
      } ${className}`}
    >
      {children}
      <span aria-hidden="true" className="ml-1">
        ↗
      </span>
      <span className="sr-only"> (opens {site} in a new tab)</span>
    </a>
  );
}
