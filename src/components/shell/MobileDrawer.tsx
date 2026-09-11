'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef } from 'react';
import { BrandLogo } from './BrandLogo';
import { ADDRESS_LINES, EMAIL, PRODUCTS } from '@/lib/site';

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Section 4 — full-height drawer, 375 only.
 *
 * Projects and Career are expanded inline as sections, not nested accordions,
 * so nothing on this panel is hidden behind a second tap. Focus is trapped,
 * Escape closes, background scroll is locked, and focus returns to the trigger
 * on close.
 */
export function MobileDrawer({ open, onClose }: MobileDrawerProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const restoreRef = useRef<HTMLElement | null>(null);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key !== 'Tab' || !panelRef.current) return;

      const nodes = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (n) => n.offsetParent !== null,
      );
      if (nodes.length === 0) return;

      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (!first || !last) return;

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (!open) return;

    restoreRef.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
      restoreRef.current?.focus();
    };
  }, [open, onKeyDown]);

  if (!open) return null;

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      className="fixed inset-0 z-[90] overflow-y-auto bg-chrome-ground lg:hidden"
    >
      {/* Sticky 62px top bar: logo + close cell */}
      <div className="sticky top-0 z-10 flex min-h-[62px] items-stretch border-b border-chrome-line bg-chrome-ground">
        <div className="flex flex-1 items-center gutter-l">
          <BrandLogo height="26px" />
        </div>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close navigation"
          className="flex w-[62px] flex-none items-center justify-center border-l border-chrome-line text-[26px] leading-none text-[#EAEEEB] focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-[3px] focus-visible:outline-lime-500"
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>

      <div className="gutter pb-14">
        <Link
          href="/what-we-do/"
          onClick={onClose}
          className="flex min-h-[60px] items-center border-b border-chrome-line font-display text-[30px] font-bold text-[#EAEEEB]"
        >
          About
        </Link>

        <section className="border-b border-chrome-line py-5">
          <p className="font-mono text-[11.5px] uppercase tracking-[0.14em] text-lime-500">
            Projects
          </p>
          <ul className="mt-2">
            {PRODUCTS.map((p) => (
              <li key={p.href}>
                <Link
                  href={p.href}
                  onClick={onClose}
                  className="flex min-h-[50px] items-center justify-between gap-4 text-[18px] text-[#EAEEEB]"
                >
                  <span>{p.name}</span>
                  <span className="font-mono text-[11.5px] tracking-[0.1em] text-chrome-meta">
                    {p.tag}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="border-b border-chrome-line py-5">
          <p className="font-mono text-[11.5px] uppercase tracking-[0.14em] text-lime-500">
            Career
          </p>
          <ul className="mt-2">
            <li>
              <Link
                href="/careers/"
                onClick={onClose}
                className="flex min-h-[50px] items-center text-[18px] text-[#EAEEEB]"
              >
                Working at AirdroiTech
              </Link>
            </li>
            <li>
              <Link
                href="/careers/open-positions/"
                onClick={onClose}
                className="flex min-h-[50px] items-center text-[18px] text-[#EAEEEB]"
              >
                Open positions
              </Link>
            </li>
          </ul>
        </section>

        <Link
          href="/data-protection-and-privacy-policy/"
          onClick={onClose}
          className="flex min-h-[60px] items-center border-b border-chrome-line font-display text-[30px] font-bold text-[#EAEEEB]"
        >
          Privacy
        </Link>

        <Link
          href="/get-in-touch/"
          onClick={onClose}
          className="mt-7 flex min-h-[56px] w-full items-center justify-center bg-teal-600 text-[17px] font-semibold text-white"
        >
          Contact us
        </Link>

        <address className="mt-7 font-mono text-[12.5px] not-italic leading-[1.8] text-grey-400">
          {ADDRESS_LINES.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
          <a href={`mailto:${EMAIL}`} className="mt-3 block text-lime-500 underline">
            {EMAIL}
          </a>
        </address>
      </div>
    </div>
  );
}
