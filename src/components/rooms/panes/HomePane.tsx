'use client';

import { Button } from '@/components/ui/Button';
import { ZONES } from '@/lib/zones';
import { HERO_DECK, HERO_EYEBROW } from './copy';

interface HomePaneProps {
  zone: string;
  onZone: (z: string) => void;
  onOpenProjects: () => void;
}

export function HomePane({ zone, onZone, onOpenProjects }: HomePaneProps) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-1 flex-col justify-center px-[40px] py-[44px]">
        <p className="font-mono text-[12.5px] uppercase tracking-[0.18em] text-chrome-link">
          {HERO_EYEBROW}
        </p>

        <h1 className="mt-[16px] font-display text-[84px] font-bold leading-[0.88] tracking-[-0.04em] text-chrome-ink">
          <span className="block">Programming</span>
          {/*
            The page's single instance of the brand sweep — the logo's own
            teal→green→lime gradient, used here and nowhere else.
            In light theme it renders as solid ink — lime clipped to glyphs is 1.79:1 on white. See .brand-sweep-text in globals.css.
          */}
          <span
            className="block brand-sweep-text"
          >
            Intelligence
          </span>
        </h1>

        <p className="mt-[24px] max-w-[50ch] text-[18px] leading-[1.55] text-chrome-body">
          {HERO_DECK}
        </p>

        <div className="mt-[28px] flex gap-3">
          <button
            type="button"
            onClick={onOpenProjects}
            className="inline-flex min-h-[54px] items-center bg-teal-600 px-7 text-[16px] font-semibold text-white transition-colors duration-200 hover:bg-chrome-primary-hover"
          >
            Open projects <span aria-hidden="true" className="ml-2">→</span>
          </button>
          <Button href="/careers/" variant="secondary">
            Work with us
          </Button>
        </div>
      </div>

      {/*
        Zone strip. Illustrative, not live — see src/lib/zones.ts. The design's
        "live" wording and pulsing indicator are deliberately not used: there is
        no data source behind them and they would read as a status claim.
      */}
      <div
        role="group"
        aria-label="Illustration of per-zone climate control"
        className="flex-none border-t border-chrome-line bg-chrome-plate"
      >
        <div className="flex items-center gap-3 border-b border-chrome-line px-[22px] py-[14px]">
          <span aria-hidden="true" className="h-[8px] w-[8px] flex-none bg-chrome-state" />
          <span className="font-mono text-[11.5px] uppercase tracking-[0.16em] text-chrome-meta">
            Zone control
          </span>
          <span className="ml-auto font-mono text-[11.5px] uppercase tracking-[0.16em] text-chrome-meta">
            {zone} selected · {ZONES.length} zones
          </span>
        </div>

        <div className="grid grid-cols-4 gap-px bg-chrome-line">
          {ZONES.map((z) => {
            const active = z.name === zone;
            return (
              <button
                key={z.name}
                type="button"
                onClick={() => onZone(z.name)}
                aria-pressed={active}
                className={`px-[20px] py-[18px] text-left transition-colors duration-200 ${
                  active ? 'bg-teal-600' : 'bg-chrome-plate hover:bg-chrome-hover'
                }`}
              >
                <span
                  className={`block font-mono text-[11px] uppercase tracking-[0.14em] ${
                    active ? 'text-white' : 'text-chrome-meta'
                  }`}
                >
                  {z.name}
                </span>
                <span className="mt-2 block font-display text-[38px] font-bold leading-none tracking-[-0.03em] text-chrome-ink">
                  {z.temp}
                  <span className="align-super text-[0.42em]">°</span>
                </span>
                <span
                  className={`mt-[6px] block font-mono text-[11px] uppercase tracking-[0.1em] ${
                    active ? 'text-white' : 'text-chrome-meta'
                  }`}
                >
                  {active ? 'Cooling' : z.state}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
