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
 * The design specified a four-cell spec grid per device (zones, set point,
 * mode, protocol, pairing, room count and so on). All but a couple of those
 * figures exist nowhere in the repo, and CLAUDE.md forbids inventing them, so
 * the grid is not rendered. When real specifications are supplied, it drops
 * into the gap below the copy.
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

        <div className="border-l border-chrome-line p-[28px]">
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
      </div>
    </div>
  );
}
