'use client';

import Link from 'next/link';
import { useState } from 'react';
import { BrandLogo } from './BrandLogo';
import { MobileDrawer } from './MobileDrawer';
import { ScrollProgress } from './ScrollProgress';
import { ThemeToggle } from './ThemeToggle';
import { ImageSlot } from '@/components/ui/ImageSlot';
import { EMAIL, LINKEDIN, NAV, PRODUCTS } from '@/lib/site';

const CELL =
  'flex items-center border-l border-chrome-line px-[clamp(18px,1.8vw,28px)] ' +
  'font-mono text-[12.5px] uppercase tracking-[0.12em] text-[color:#C3CBC6] ' +
  'transition-colors hover:bg-lime-500 hover:text-grey-900 ' +
  'focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-[3px] ' +
  'focus-visible:outline-lime-500';

/**
 * Section 3 — sticky site header, shared by every page.
 *
 * Three stacked parts: the utility rail (1440 only), the nav bar of
 * full-height hairline-separated cells, and the 2px scroll-progress track.
 * The Projects mega panel is supplementary: everything in it is also reachable
 * from /projects/ and from the mobile drawer, so no content depends on a hover.
 */
export function SiteHeader() {
  const [panelOpen, setPanelOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <header
        className="sticky top-0 z-[70]"
        onMouseLeave={() => setPanelOpen(false)}
      >
        {/* 3a — utility rail, 1440 only */}
        <div className="hidden h-[34px] items-center justify-between gap-6 border-b border-chrome-hover bg-chrome-rail gutter font-mono text-[11.5px] uppercase tracking-[0.14em] text-chrome-meta lg:flex">
          <span>Shah Alam · Selangor · Malaysia</span>
          <span className="flex items-center gap-2">
            <span aria-hidden="true" className="block h-[7px] w-[7px] bg-lime-500" />
            R&amp;D and software arm of the Polyaire Group
          </span>
          <span className="flex items-center gap-6">
            <a href={`mailto:${EMAIL}`} className="transition-colors hover:text-lime-500">
              {EMAIL}
            </a>
            <a
              href={LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-lime-500"
            >
              LinkedIn
            </a>
          </span>
        </div>

        {/* 3b — nav bar */}
        <div className="flex min-h-[clamp(62px,5.2vw,78px)] items-stretch border-b border-chrome-line bg-chrome-ground">
          <div className="flex flex-1 items-center border-r border-chrome-line gutter-l pr-[clamp(18px,1.8vw,28px)]">
            {/* Full-height so the tap target is the whole logo cell, not just
                the bounding box of the mark. */}
            <Link
              href="/"
              aria-label="AirdroiTech home"
              className="flex min-h-tap flex-1 items-center self-stretch focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-[3px] focus-visible:outline-lime-500"
            >
              <BrandLogo />
            </Link>
          </div>

          {/* 1440 nav */}
          <nav aria-label="Main" className="hidden items-stretch lg:flex">
            {NAV.map((item) =>
              item.hasPanel ? (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${CELL} gap-[10px]`}
                  aria-expanded={panelOpen}
                  onMouseEnter={() => setPanelOpen(true)}
                  onFocus={() => setPanelOpen(true)}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className="block h-[6px] w-[6px] rotate-45 border-b border-r border-current"
                  />
                </Link>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={CELL}
                  onMouseEnter={() => setPanelOpen(false)}
                  onFocus={() => setPanelOpen(false)}
                >
                  {item.label}
                </Link>
              ),
            )}
            <Link
              href="/get-in-touch/"
              className="flex items-center border-l border-chrome-line bg-teal-600 px-[clamp(22px,2.4vw,38px)] text-[15px] font-semibold text-white transition-colors hover:bg-chrome-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-[3px] focus-visible:outline-lime-500"
              onMouseEnter={() => setPanelOpen(false)}
              onFocus={() => setPanelOpen(false)}
            >
              Contact
            </Link>
          </nav>

          {/* Theme switch, every width. Outside <nav>: it changes appearance, it does not navigate. */}
          <div className="flex flex-none items-center justify-center border-l border-chrome-line px-[6px]">
            <ThemeToggle className="text-chrome-body hover:text-lime-500 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-[3px] focus-visible:outline-lime-500" />
          </div>

          {/* 375 hamburger */}
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open navigation"
            aria-expanded={drawerOpen}
            className="flex w-[62px] flex-none flex-col items-center justify-center gap-[5px] border-l border-chrome-line focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-[3px] focus-visible:outline-lime-500 lg:hidden"
          >
            <span aria-hidden="true" className="block h-[1.5px] w-[22px] bg-[#EAEEEB]" />
            <span aria-hidden="true" className="block h-[1.5px] w-[22px] bg-[#EAEEEB]" />
            <span aria-hidden="true" className="block h-[1.5px] w-[22px] bg-lime-500" />
          </button>
        </div>

        {/* 3c — scroll progress */}
        <ScrollProgress />

        {/* 3d — Projects mega panel, 1440 */}
        {panelOpen && (
          <div className="absolute left-0 top-full hidden w-full border-b border-chrome-line bg-grey-900 lg:grid lg:grid-cols-3">
            {PRODUCTS.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                className="border-l border-chrome-line px-7 pb-[30px] pt-[26px] transition-colors hover:bg-chrome-hover focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-[3px] focus-visible:outline-lime-500"
                onClick={() => setPanelOpen(false)}
              >
                <ImageSlot
                  src={`/${p.asset}`}
                  ratio="16/9"
                  alt={`${p.name} — ${p.descriptor}`}
                  label={p.asset}
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  fit="contain"
                />
                <p className="mt-4 font-display text-[22px] font-bold text-[#EAEEEB]">{p.name}</p>
                <p className="mt-1 font-mono text-[12px] uppercase tracking-[0.08em] text-grey-400">
                  {p.descriptor}
                </p>
              </Link>
            ))}
          </div>
        )}
      </header>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
