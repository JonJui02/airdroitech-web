'use client';

import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/Button';
import { ImageSlot } from '@/components/ui/ImageSlot';
import type { ProjectCopy } from './copy';

interface DeviceDetailProps {
  product: ProjectCopy;
  onBack: () => void;
}

/**
 * Device detail, shown in place of the project board inside the Projects room.
 *
 * The design specified a four-cell spec grid of numbers (set point, mode,
 * pairing, room count). Those figures exist nowhere in the repo, so instead
 * this lists what each product demonstrably does — every line read off the
 * supplied product imagery, with the source image recorded in copy.ts.
 *
 * Focus: the back button takes focus on open, Escape closes, and RoomShell
 * restores focus to the card that opened this.
 */
export function DeviceDetail({ product, onBack }: DeviceDetailProps) {
  const backRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    backRef.current?.focus();
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onBack();
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onBack]);

  return (
    <div className="flex h-full animate-pane-in-fast flex-col">
      <div className="flex flex-none items-center gap-[18px] border-b border-chrome-line bg-chrome-plate px-[40px] py-[14px]">
        <button
          ref={backRef}
          type="button"
          onClick={onBack}
          className="min-h-tap border border-chrome-border px-[14px] py-[9px] font-mono text-[11.5px] uppercase tracking-[0.14em] text-lime-500 transition-colors duration-200 hover:border-lime-500"
        >
          <span aria-hidden="true">← </span>All devices
        </button>
        <span className="font-mono text-[11.5px] uppercase tracking-[0.14em] text-chrome-meta">
          {product.tag}
        </span>
      </div>

      <div className="grid flex-1 grid-cols-2 overflow-hidden">
        <div className="flex flex-col justify-center overflow-y-auto px-[40px] py-[36px]">
          <h3 className="font-display text-[56px] font-bold leading-none tracking-[-0.03em] text-chrome-ink">
            {product.name}
          </h3>
          <p className="mt-[18px] max-w-[46ch] text-[16.5px] leading-[1.65] text-chrome-body">
            {product.copy}
          </p>

          <ul className="mt-[24px] grid max-w-[46ch] grid-cols-2 gap-x-5 gap-y-[10px]">
            {product.features.map((f) => (
              <li
                key={f.label}
                className="flex items-start gap-[10px] font-mono text-[11.5px] uppercase leading-[1.5] tracking-[0.08em] text-chrome-body"
              >
                <span
                  aria-hidden="true"
                  className="mt-[5px] h-[6px] w-[6px] flex-none bg-lime-500"
                />
                {f.label}
              </li>
            ))}
          </ul>

          <div className="mt-[26px] flex flex-wrap gap-3">
            <Button href={product.href}>Full project page</Button>
            <button
              type="button"
              onClick={onBack}
              className="inline-flex min-h-tap items-center border border-chrome-border px-5 font-semibold text-lime-500 transition-colors duration-200 hover:border-lime-500"
            >
              Back to devices
            </button>
          </div>
        </div>

        {/*
          Product shots, largest first. All are matted on white, so each sits
          on its own white plate rather than on the chrome ground — see
          ImageSlot's `padded`.
        */}
        <div className="flex flex-col gap-px overflow-y-auto border-l border-chrome-line bg-chrome-line">
          <div className="flex-1 bg-chrome-plate p-[24px]">
            <ImageSlot
              src={`/${product.asset}`}
              ratio="4/3"
              alt={`${product.name} — ${product.kicker}`}
              label={product.asset}
              sizes="(min-width: 1024px) 50vw, 100vw"
              fit="contain"
              padded
              className="h-full"
            />
          </div>

          {product.gallery.map((g) => (
            <div key={g.src} className="flex-1 bg-chrome-plate p-[24px]">
              <ImageSlot
                src={g.src}
                ratio="4/3"
                alt={g.alt}
                label={g.src}
                sizes="(min-width: 1024px) 50vw, 100vw"
                fit="contain"
                padded
                className="h-full"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
