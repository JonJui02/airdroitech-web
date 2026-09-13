'use client';

import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/Button';
import { Carousel3D } from '@/components/ui/Carousel3D';
import { OutboundLink } from '@/components/ui/OutboundLink';
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
          className="min-h-tap border border-chrome-border px-[14px] py-[9px] font-mono text-[11.5px] uppercase tracking-[0.14em] text-chrome-link transition-colors duration-200 hover:border-chrome-link"
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
            <span className="hover-sweep hover-sweep-chrome">{product.name}</span>
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
                  className="mt-[5px] h-[6px] w-[6px] flex-none bg-chrome-state"
                />
                {f.label}
              </li>
            ))}
          </ul>

          <div className="mt-[26px] flex flex-wrap gap-3">
            <Button href={product.href}>Full project page</Button>
            <OutboundLink
              href={product.official.href}
              site={product.official.site}
              className="inline-flex min-h-tap items-center border border-chrome-border px-5 font-semibold text-chrome-link transition-colors duration-200 hover:border-chrome-link"
            >
              Official site
            </OutboundLink>
            <button
              type="button"
              onClick={onBack}
              className="inline-flex min-h-tap items-center border border-chrome-border px-5 font-semibold text-chrome-link transition-colors duration-200 hover:border-chrome-link"
            >
              Back to devices
            </button>
          </div>
        </div>

        <DeviceGallery product={product} />
      </div>
    </div>
  );
}

/**
 * The product shots as a 3D coverflow carousel (src/components/ui/Carousel3D).
 * Auto-loops, drags and flings; pauses on hover, focus and touch, has a pause
 * button, and turns into a still row under reduced motion.
 */
function DeviceGallery({ product }: { product: ProjectCopy }) {
  const shots = [
    { src: `/${product.asset}`, alt: `${product.name} — ${product.kicker}` },
    ...product.gallery,
  ];

  return (
    <div className="flex min-h-0 items-center overflow-y-auto border-l border-chrome-line px-[28px] py-[24px]">
      <Carousel3D
        slides={shots}
        label={`${product.name} images`}
        ratio="4/3"
        fit="contain"
        tone="chrome"
        itemWidth={0.7}
        sizes="(min-width: 1024px) 34vw, 80vw"
        className="w-full"
      />
    </div>
  );
}
