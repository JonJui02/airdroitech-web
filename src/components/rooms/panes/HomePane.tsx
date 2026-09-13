'use client';

import { Button } from '@/components/ui/Button';
import { CountUp } from '@/components/ui/CountUp';
import { COMPANY_FACTS } from '@/lib/site';
import { HERO_DECK, HERO_EYEBROW } from './copy';
import { TypeText } from '@/components/ui/TypeText';
import { GiftBox } from '@/components/anniversary/GiftBox';
import { FLAGS } from '@/lib/flags';

interface HomePaneProps {
  onOpenProjects: () => void;
}

export function HomePane({ onOpenProjects }: HomePaneProps) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-1 items-center gap-[40px] px-[40px] py-[44px]">
        <div className="min-w-0 flex-1">
        <p className="font-mono text-[12.5px] uppercase tracking-[0.18em] text-chrome-link">
          {HERO_EYEBROW}
        </p>

        <h1 className="mt-[16px] font-display text-[84px] font-bold leading-[0.88] tracking-[-0.04em] text-chrome-ink">
          {/* Types in on load and every time the Home room reopens. The accent keeps
            the brand sweep gradient, the page's one instance of it. */}
          <TypeText text="Programming Intelligence" accent="Intelligence" tone="chrome" sweep splitAccent replay />
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
          Fifth-year gift box — TEMPORARY, gated on FLAGS.anniversary so it
          disappears with the dialog. Sits beside the headline; flex-none so it
          never squeezes the copy column.
        */}
        {FLAGS.anniversary && (
          <div className="flex flex-none basis-[300px] items-center justify-center">
            <GiftBox size={216} />
          </div>
        )}
      </div>

      {/*
        AirdroiTech at a glance — company facts in place of the old illustrative
        zone strip (user request 2026-09-13). Sources in src/lib/site.ts.
      */}
      <div className="flex-none border-t border-chrome-line bg-chrome-plate">
        <div className="flex items-center gap-3 border-b border-chrome-line px-[22px] py-[14px]">
          <span aria-hidden="true" className="h-[8px] w-[8px] flex-none bg-chrome-state" />
          <h2 className="font-mono text-[11.5px] font-normal uppercase tracking-[0.16em] text-chrome-meta">
            AirdroiTech at a glance
          </h2>
          <span className="ml-auto font-mono text-[11.5px] uppercase tracking-[0.16em] text-chrome-meta">
            R&amp;D arm of the Polyaire Group
          </span>
        </div>

        <dl className="grid grid-cols-4 gap-px bg-chrome-line">
          {COMPANY_FACTS.map((fact) => (
            <div
              key={fact.label}
              className="hover-box flex flex-col-reverse bg-chrome-plate px-[20px] py-[18px]"
            >
              <dt className="mt-[8px] font-mono text-[11px] uppercase tracking-[0.14em] text-chrome-meta">
                {fact.label}
              </dt>
              <dd className="font-display text-[38px] font-bold leading-none tracking-[-0.03em] text-chrome-ink">
                <CountUp value={fact.value} replay />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
