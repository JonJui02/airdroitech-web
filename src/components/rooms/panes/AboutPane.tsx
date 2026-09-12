'use client';

import Image from 'next/image';
import { CAPABILITIES } from '@/lib/site';
import { ABOUT_BODY, ABOUT_EYEBROW, ABOUT_HEADING, TEAM_PHOTOS } from './copy';

interface AboutPaneProps {
  caps: Record<string, boolean>;
  onToggle: (name: string) => void;
}

/**
 * Capability toggles.
 *
 * The design started four of six switched on. That would read as a statement
 * about which disciplines the company actually has, and the repo makes no such
 * distinction — CAPABILITIES lists all six equally. So every switch starts on,
 * and the control is what it looks like: a demonstration of the interface,
 * asserting nothing.
 */
export function AboutPane({ caps, onToggle }: AboutPaneProps) {
  return (
    <div className="grid h-full grid-cols-1 lg:grid-cols-[1fr_minmax(0,460px)]">
      <div className="flex flex-col justify-center overflow-y-auto px-[40px] py-[40px]">
        <p className="font-mono text-[12px] uppercase tracking-[0.16em] text-lime-500">
          {ABOUT_EYEBROW}
        </p>

        <h2 className="mt-[14px] max-w-[20ch] font-display text-[clamp(38px,4.2vw,60px)] font-bold leading-[0.98] tracking-[-0.032em] text-chrome-ink">
          {ABOUT_HEADING}
        </h2>

        <p className="mt-[20px] max-w-[60ch] text-[17px] leading-[1.62] text-chrome-body">
          {ABOUT_BODY}
        </p>

        <p className="mt-[30px] font-mono text-[11.5px] uppercase tracking-[0.16em] text-lime-500">
          Capabilities
        </p>

        <div className="mt-[14px] grid grid-cols-2 gap-px border border-chrome-line bg-chrome-line">
          {CAPABILITIES.map((name) => {
            const on = caps[name];
            return (
              <button
                key={name}
                type="button"
                role="switch"
                aria-checked={on}
                onClick={() => onToggle(name)}
                className={`flex min-h-tap items-center justify-between gap-3 px-[18px] py-[15px] text-left font-mono text-[12px] uppercase tracking-[0.1em] transition-colors duration-200 ${
                  on ? 'bg-chrome-plate text-chrome-ink' : 'bg-chrome-ground text-chrome-meta'
                }`}
              >
                {name}
                <span
                  aria-hidden="true"
                  className={`flex h-[12px] w-[26px] flex-none items-center p-[2px] ${
                    on ? 'bg-green-600' : 'bg-chrome-line'
                  }`}
                >
                  <span
                    className="h-[8px] w-[8px] bg-chrome-ink"
                    style={{
                      transform: on ? 'translateX(14px)' : 'translateX(0)',
                      transition: 'transform 200ms ease',
                    }}
                  />
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <TeamWall />
    </div>
  );
}

/**
 * The team, shown as a wall of feeds.
 *
 * NOT a carousel. CLAUDE.md non-negotiable #3 rules out "carousels that hide
 * content behind a gesture" — that is the legacy failure this rebuild exists to
 * undo, and it would put three of four photographs one swipe away from being
 * seen at all. A wall shows every photograph at once, needs no gesture, and
 * reads as the console's own monitor grid, which is closer to the smart-home
 * idea than a slideshow is.
 *
 * Each tile is labelled, so the photographs are captioned rather than
 * decorative.
 */
function TeamWall() {
  return (
    <section
      aria-label="The AirdroiTech team"
      className="grid grid-cols-2 gap-px border-l border-chrome-line bg-chrome-line max-lg:border-l-0 max-lg:border-t"
    >
      {TEAM_PHOTOS.map((photo) => (
        <figure key={photo.src} className="relative min-h-[150px] overflow-hidden bg-chrome-plate">
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(min-width: 1024px) 230px, 50vw"
            className="object-cover"
          />
          {/*
            The caption sits on a solid plate rather than over the photograph:
            text on an arbitrary image cannot be contrast-checked, and these
            photographs are bright.
          */}
          <figcaption className="absolute inset-x-0 bottom-0 bg-chrome-ground/95 px-[12px] py-[7px] font-mono text-[10px] uppercase tracking-[0.14em] text-chrome-body">
            {photo.caption}
          </figcaption>
        </figure>
      ))}
    </section>
  );
}
