'use client';

import { ImageSlot } from '@/components/ui/ImageSlot';
import { PROJECT_COPY } from './copy';

interface ProjectsPaneProps {
  onOpen: (index: number, el: HTMLButtonElement) => void;
}

/**
 * The device board.
 *
 * The design's per-card status pills ("Shipping", "Maintained") and the
 * header's "all online" are removed: there is no release-status source in the
 * repo and no system reporting online, so both would be invented facts.
 */
export function ProjectsPane({ onOpen }: ProjectsPaneProps) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-none items-end justify-between px-[40px] pb-[20px] pt-[30px]">
        <h2 className="font-display text-[44px] font-bold leading-none tracking-[-0.03em] text-chrome-ink">
          ADT Projects
        </h2>
        <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-chrome-meta">
          {PROJECT_COPY.length} devices
        </p>
      </div>

      <div className="grid flex-1 grid-cols-3 gap-px overflow-y-auto border-t border-chrome-line bg-chrome-line">
        {PROJECT_COPY.map((p, i) => (
          <button
            key={p.name}
            type="button"
            onClick={(e) => onOpen(i, e.currentTarget)}
            className="flex flex-col items-stretch bg-chrome-plate p-[22px] text-left transition-colors duration-200 hover:bg-chrome-hover"
          >
            <span className="flex items-center gap-[10px]">
              <span aria-hidden="true" className="h-[7px] w-[7px] flex-none bg-lime-500" />
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-chrome-meta">
                {p.tag}
              </span>
            </span>

            <span className="mt-[18px] block">
              <ImageSlot
                src={`/${p.asset}`}
                ratio="16/10"
                alt={`${p.name} — ${p.kicker}`}
                label={p.asset}
                sizes="(min-width: 1024px) 33vw, 100vw"
                fit="contain"
              />
            </span>

            <span className="mt-[18px] block font-display text-[26px] font-bold tracking-[-0.02em] text-chrome-ink">
              {p.name}
            </span>
            <span className="mt-[10px] block text-[14.5px] leading-[1.6] text-chrome-body">
              {p.copy}
            </span>
            <span className="mt-auto block pt-[18px] text-[16px] font-semibold text-lime-500">
              Open device <span aria-hidden="true">→</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
