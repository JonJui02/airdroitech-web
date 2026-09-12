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

        <DeviceGallery product={product} />
      </div>
    </div>
  );
}

/**
 * The product shots, as a left-to-right rail.
 *
 * Deliberately NOT a carousel in the banned sense: every shot is in the DOM,
 * laid out, and reachable — the rail is a scroll container with snap points,
 * the arrows only scroll it, and there is no auto-advance and no slide hidden
 * behind a gesture. CLAUDE.md non-negotiable #3 rules out hiding content
 * behind a gesture, not horizontal movement.
 *
 * The next shot peeks past the right edge (88% per slide), which is what tells
 * a viewer there is more without a caption saying so. A single shot fills the
 * rail and the arrows do not render.
 */
function DeviceGallery({ product }: { product: ProjectCopy }) {
  const railRef = useRef<HTMLDivElement>(null);

  const shots = [
    { src: `/${product.asset}`, alt: `${product.name} — ${product.kicker}` },
    ...product.gallery,
  ];

  function scrollRail(direction: -1 | 1) {
    const rail = railRef.current;
    if (!rail) return;
    rail.scrollBy({ left: direction * rail.clientWidth * 0.88, behavior: 'smooth' });
  }

  return (
    <div className="relative min-h-0 border-l border-chrome-line">
      <div
        ref={railRef}
        className="flex h-full snap-x snap-mandatory overflow-x-auto overflow-y-hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {shots.map((s) => (
          <div
            key={s.src}
            className="flex h-full w-[88%] flex-none snap-center items-center p-[28px]"
          >
            <ImageSlot
              src={s.src}
              ratio="4/3"
              alt={s.alt}
              label={s.src}
              sizes="(min-width: 1024px) 45vw, 90vw"
              fit="contain"
              className="w-full"
            />
          </div>
        ))}
      </div>

      {shots.length > 1 ? (
        <div className="pointer-events-none absolute inset-x-[14px] top-1/2 flex -translate-y-1/2 justify-between">
          <GalleryArrow direction={-1} onClick={() => scrollRail(-1)} />
          <GalleryArrow direction={1} onClick={() => scrollRail(1)} />
        </div>
      ) : null}
    </div>
  );
}

function GalleryArrow({ direction, onClick }: { direction: -1 | 1; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === -1 ? 'Previous image' : 'Next image'}
      className="pointer-events-auto flex min-h-tap min-w-tap items-center justify-center border border-chrome-border bg-chrome-ground/90 font-mono text-[15px] text-lime-500 transition-colors duration-200 hover:border-lime-500"
    >
      <span aria-hidden="true">{direction === -1 ? '◄' : '►'}</span>
    </button>
  );
}
