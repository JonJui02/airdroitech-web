'use client';

import { CAPABILITIES } from '@/lib/site';
import { ABOUT_BODY, ABOUT_EYEBROW, ABOUT_HEADING } from './copy';

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
    <div className="flex h-full flex-col justify-center overflow-y-auto px-[40px] py-[48px]">
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
  );
}
