'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { COMPANY_FACTS } from '@/lib/site';
import { ANNIVERSARY_OPEN_EVENT } from './anniversary-bus';

/**
 * Fifth-year welcome dialog — homepage only, once per visitor.
 *
 * TEMPORARY. Two off switches live in src/lib/flags.ts:
 * NEXT_PUBLIC_FLAG_ANNIVERSARY=0 kills it, and NEXT_PUBLIC_ANNIVERSARY_UNTIL
 * expires it on a date. Deleting this component and its mount in
 * src/app/page.tsx removes it entirely with no other cleanup.
 *
 * Why it does not violate the "no invisible resting state" rule in CLAUDE.md:
 * that rule protects *page content*, which must be readable server-side. This
 * renders nothing during SSR and nothing until after hydration, so the console
 * behind it is complete in the HTML, crawlers never see the dialog, and a
 * visitor with JavaScript disabled gets the site with no dialog at all. No
 * information lives only inside it — every fact it shows is also on the page.
 *
 * Every figure comes from COMPANY_FACTS in src/lib/site.ts, the same source the
 * console uses, so the two can never disagree.
 */

/** Bump the version to show the dialog again to people who already dismissed it. */
const STORAGE_KEY = 'adt.anniversary.v1';
const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

/** Lets the page paint before the dialog arrives, so it reads as deliberate. */
const OPEN_DELAY_MS = 700;

function alreadyHandled(): boolean {
  try {
    if (window.localStorage.getItem(STORAGE_KEY) === 'never') return true;
    return window.sessionStorage.getItem(STORAGE_KEY) === 'seen';
  } catch {
    // Private mode or blocked storage: show it, but never crash the homepage.
    return false;
  }
}

function remember(permanent: boolean) {
  try {
    if (permanent) window.localStorage.setItem(STORAGE_KEY, 'never');
    else window.sessionStorage.setItem(STORAGE_KEY, 'seen');
  } catch {
    /* storage unavailable — dismissal simply does not persist */
  }
}

export function AnniversaryDialog() {
  const [open, setOpen] = useState(false);
  const [dontShow, setDontShow] = useState(false);

  const panelRef = useRef<HTMLDivElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const restoreRef = useRef<HTMLElement | null>(null);
  // Read in the unmount cleanup, which must not close over a stale value.
  const dontShowRef = useRef(false);

  useEffect(() => {
    dontShowRef.current = dontShow;
  }, [dontShow]);

  // Automatic appearance — suppressed once the visitor has seen or dismissed it.
  useEffect(() => {
    if (alreadyHandled()) return;
    const t = window.setTimeout(() => setOpen(true), OPEN_DELAY_MS);
    return () => window.clearTimeout(t);
  }, []);

  // On-demand open from the gift box. Deliberately ignores the storage above:
  // someone clicking the gift is asking for the dialog, so it must always come,
  // including after "Don't show this again".
  useEffect(() => {
    const onRequest = () => {
      setDontShow(false);
      setOpen(true);
    };
    window.addEventListener(ANNIVERSARY_OPEN_EVENT, onRequest);
    return () => window.removeEventListener(ANNIVERSARY_OPEN_EVENT, onRequest);
  }, []);

  const close = useCallback(() => {
    remember(dontShowRef.current);
    setOpen(false);
  }, []);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        close();
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
    [close],
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
      className="anniv-scrim fixed inset-0 z-[120] flex items-end justify-center overflow-y-auto overscroll-contain p-0 sm:items-center sm:p-6"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="anniv-title"
        aria-describedby="anniv-body"
        className="anniv-panel relative my-auto w-full max-w-[560px] border border-[color:var(--chrome-line)] bg-[color:var(--chrome-ground)] shadow-2xl"
      >
        {/* The page's single instance of the brand sweep: teal to green to lime,
            the logo's own gradient. Decorative, so it is hidden from the a11y tree. */}
        <div aria-hidden="true" className="h-[6px] w-full bg-brand-sweep" />

        <button
          ref={closeRef}
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute right-0 top-[6px] flex h-[52px] w-[52px] items-center justify-center text-[22px] leading-none text-[color:var(--chrome-meta)] transition-colors hover:text-[color:var(--chrome-ink)] focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-[3px] focus-visible:outline-[color:var(--focus)]"
        >
          <span aria-hidden="true">×</span>
        </button>

        <div className="px-6 pb-6 pt-8 sm:px-10 sm:pb-9 sm:pt-11">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--chrome-state)]">
            AirdroiTech &nbsp;·&nbsp; 2021 &ndash; 2026
          </p>

          <h2
            id="anniv-title"
            className="mt-4 font-display text-[clamp(34px,9vw,56px)] font-bold leading-[0.95] tracking-[-0.035em] text-[color:var(--chrome-ink)]"
          >
            Five years of
            <span className="block text-[color:var(--chrome-accent)]">AirdroiTech</span>
          </h2>

          {/* Year rule: 2021 -- 2026, with the far end marked. */}
          <div
            aria-hidden="true"
            className="mt-6 flex items-center gap-3 font-mono text-[11.5px] tracking-[0.14em] text-[color:var(--chrome-meta)]"
          >
            <span>2021</span>
            <span className="h-px flex-1 bg-[color:var(--chrome-line)]" />
            <span className="h-[7px] w-[7px] flex-none bg-[color:var(--chrome-state)]" />
            <span className="text-[color:var(--chrome-ink)]">2026</span>
          </div>

          <div id="anniv-body" className="mt-6 space-y-4 text-[15px] leading-[1.68] text-[color:var(--chrome-body)]">
            <p>
              AirdroiTech opened in Shah Alam in 2021, as the Polyaire Group&rsquo;s research
              and software arm in Malaysia.
            </p>
            <p>
              Five years on, <strong className="font-semibold text-[color:var(--chrome-ink)]">AirTouch</strong>,{' '}
              <strong className="font-semibold text-[color:var(--chrome-ink)]">AirTouch Beam</strong> and{' '}
              <strong className="font-semibold text-[color:var(--chrome-ink)]">PolyPlan</strong> are
              designed, built and tested here — and they run in homes and on job sites across
              Australia and Malaysia.
            </p>
            <p className="text-[color:var(--chrome-ink)]">
              Thank you to every AirdroiTechie who got us here.
            </p>
          </div>

          {/* Facts come from COMPANY_FACTS, the same source as the console. */}
          <dl className="mt-7 grid grid-cols-2 gap-px border border-[color:var(--chrome-line)] bg-[color:var(--chrome-line)] sm:grid-cols-4">
            {COMPANY_FACTS.map((f) => (
              <div key={f.label} className="bg-[color:var(--chrome-ground)] px-3 py-3 text-center">
                <dt className="font-mono text-[9.5px] uppercase tracking-[0.12em] text-[color:var(--chrome-meta)]">
                  {f.label}
                </dt>
                <dd className="mt-1 font-display text-[19px] font-bold tracking-[-0.02em] text-[color:var(--chrome-ink)]">
                  {f.value}
                </dd>
              </div>
            ))}
          </dl>

          <p className="mt-6 font-mono text-[11.5px] uppercase tracking-[0.14em] text-[color:var(--chrome-meta)]">
            Quality. &nbsp;Integrity. &nbsp;Kindness.
          </p>

          <div className="mt-7 flex flex-col gap-4 border-t border-[color:var(--chrome-line)] pt-6 sm:flex-row-reverse sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={close}
              className="inline-flex min-h-[52px] w-full items-center justify-center whitespace-nowrap bg-teal-600 px-7 text-[16px] font-semibold text-white transition-colors hover:bg-[color:var(--chrome-primary-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--focus)] sm:w-auto"
            >
              Here&rsquo;s to the next five
            </button>

            <label className="flex min-h-tap cursor-pointer select-none items-center gap-2.5 text-[14px] text-[color:var(--chrome-body)]">
              <input
                type="checkbox"
                checked={dontShow}
                onChange={(e) => setDontShow(e.target.checked)}
                className="h-[18px] w-[18px] flex-none accent-teal-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--focus)]"
              />
              Don&rsquo;t show this again
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
