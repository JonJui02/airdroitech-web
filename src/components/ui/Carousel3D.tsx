'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties, KeyboardEvent, PointerEvent } from 'react';
import { ImageSlot } from '@/components/ui/ImageSlot';

export interface CarouselSlide {
  src: string;
  alt: string;
  caption?: string;
}

interface Carousel3DProps {
  slides: CarouselSlide[];
  /** Accessible name for the carousel region, e.g. "AirTouch Beam images". */
  label: string;
  /** Every slide shares this ratio, so all heights are identical. */
  ratio?: `${number}/${number}`;
  fit?: 'cover' | 'contain';
  sizes?: string;
  /** Pass through to ImageSlot: serve small photos untouched. */
  unoptimized?: boolean;
  /** Site pages use the semantic tokens; the homepage console uses chrome-*. */
  tone?: 'site' | 'chrome';
  /** Width of the front slide as a fraction of the stage. */
  itemWidth?: number;
  /** Auto-loop speed, in slides per second. */
  speed?: number;
  className?: string;
}

/**
 * 3D coverflow carousel: loops on its own, drags and flings freely in either
 * direction (a hard fling spins through several slides and eases out, like a
 * fidget spinner), and side slides fall back, turn and shrink in 3D.
 *
 * EXCEPTION to CLAUDE.md non-negotiable #3, approved by the user 2026-09-13,
 * with these safeguards — do not remove them:
 * - Auto-loop pauses on mouse hover, keyboard focus and touch, and while the
 *   carousel is off screen. A pause button stops it outright (WCAG 2.2.2).
 * - Previous / next buttons and the arrow keys reach every slide.
 * - Under prefers-reduced-motion there is no auto-loop and no 3D: a still,
 *   swipeable row of every image.
 * - Every image is in the server HTML. Up to five slides are visible at once,
 *   so with five or fewer images nothing is hidden at rest.
 *
 * The ring repeats the slides (aria-hidden copies) until it holds at least
 * seven, so the wrap-around jump always happens behind the visible five.
 * Frames are painted straight to style — no React render per frame.
 */
const MIN_RING = 7;
const VISIBLE = 2; // slots either side of the front slide
const SPACING = 0.58; // step between slides, as a fraction of slide width

/** Signed distance from the front, wrapped into [-n/2, n/2). */
function wrap(d: number, n: number) {
  return ((((d + n / 2) % n) + n) % n) - n / 2;
}

function slideStyle(d: number): CSSProperties {
  const a = Math.abs(d);
  const opacity =
    a <= VISIBLE ? 1 - a * 0.16 : Math.max(0, (1 - VISIBLE * 0.16) * (VISIBLE + 1 - a));
  const turn = Math.max(-55, Math.min(55, -d * 32));
  return {
    transform: `translateX(-50%) translateX(${d * SPACING * 100}%) translateZ(${-a * 160}px) rotateY(${turn}deg) scale(${1 - Math.min(a, VISIBLE + 1) * 0.1})`,
    zIndex: 100 - Math.round(a * 10),
    opacity,
  };
}

interface Motion {
  pos: number;
  vel: number;
  target: number | null;
  holdUntil: number;
  hover: boolean;
  focus: boolean;
  inView: boolean;
  paused: boolean;
  drag: { id: number; lastX: number; lastT: number; vel: number } | null;
}

export function Carousel3D({
  slides,
  label,
  ratio = '4/3',
  fit = 'cover',
  sizes = '(min-width: 1024px) 50vw, 90vw',
  unoptimized = false,
  tone = 'site',
  itemWidth = 0.56,
  speed = 0.22,
  className = '',
}: Carousel3DProps) {
  const n = slides.length;
  const ring = useMemo(() => {
    if (n === 0) return [];
    const copies = Math.ceil(MIN_RING / n);
    return Array.from({ length: n * copies }, (_, i) => ({
      slide: slides[i % n] as CarouselSlide,
      original: i < n,
    }));
  }, [slides, n]);
  const N = ring.length;

  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const frontRef = useRef(0);
  const m = useRef<Motion>({
    pos: 0,
    vel: 0,
    target: null,
    holdUntil: 0,
    hover: false,
    focus: false,
    inView: true,
    paused: false,
    drag: null,
  });

  const [front, setFront] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);

  const [rw, rh] = ratio.split('/').map(Number) as [number, number];
  const stageAspect = `${(rw / rh / itemWidth).toFixed(4)}`;

  // Reduced motion: switch to the still row.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  // Stop working while scrolled away or inside a hidden pane.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      m.current.inView = entry?.isIntersecting ?? false;
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // The motion loop.
  useEffect(() => {
    if (reduced || N < 2) return;

    const paint = () => {
      const { pos } = m.current;
      for (let i = 0; i < N; i++) {
        const el = itemRefs.current[i];
        if (!el) continue;
        const s = slideStyle(wrap(i - pos, N));
        el.style.transform = String(s.transform);
        el.style.zIndex = String(s.zIndex);
        el.style.opacity = String(s.opacity);
      }
      const f = ((Math.round(pos) % n) + n) % n;
      if (f !== frontRef.current) {
        frontRef.current = f;
        setFront(f);
      }
    };

    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      // Capped so a long stall (tab switch) cannot jump the ring, but loose
      // enough that a slow device still cruises at the right speed.
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      const s = m.current;

      if (s.inView && !s.drag) {
        const running = !s.paused && !s.hover && !s.focus && now > s.holdUntil;
        if (s.target !== null) {
          s.vel = 0;
          s.pos += (s.target - s.pos) * (1 - Math.exp(-dt * 9));
          if (Math.abs(s.target - s.pos) < 0.001) {
            s.pos = s.target;
            s.target = null;
          }
        } else if (running) {
          // A fling keeps its spin and eases back to the cruising speed.
          s.vel += (speed - s.vel) * (1 - Math.exp(-dt * 1.2));
          s.pos += s.vel * dt;
        } else {
          // Coast out a fling, then settle square on the nearest slide.
          s.vel *= Math.exp(-dt * 2.2);
          s.pos += s.vel * dt;
          if (Math.abs(s.vel) < 0.35) {
            s.pos += (Math.round(s.pos) - s.pos) * (1 - Math.exp(-dt * 8));
            s.vel *= 0.8;
          }
        }
        if (s.target === null) s.pos = ((s.pos % N) + N) % N;
        paint();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced, N, n, speed]);

  const step = (dir: -1 | 1) => {
    if (reduced) {
      const rail = railRef.current;
      rail?.scrollBy({ left: dir * rail.clientWidth * itemWidth, behavior: 'auto' });
      return;
    }
    const s = m.current;
    s.target = Math.round(s.target ?? s.pos) + dir;
    s.holdUntil = performance.now() + 3000;
  };

  const togglePause = () => {
    m.current.paused = !paused;
    setPaused(!paused);
  };

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    const s = m.current;
    s.target = null;
    s.vel = 0;
    s.drag = { id: e.pointerId, lastX: e.clientX, lastT: e.timeStamp, vel: 0 };
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const s = m.current;
    const drag = s.drag;
    const stage = stageRef.current;
    if (!drag || drag.id !== e.pointerId || !stage) return;
    const slidePx = Math.max(1, stage.clientWidth * itemWidth * SPACING);
    const dx = e.clientX - drag.lastX;
    const dt = Math.max(1, e.timeStamp - drag.lastT) / 1000;
    s.pos -= dx / slidePx;
    drag.vel = drag.vel * 0.5 + (-dx / slidePx / dt) * 0.5;
    drag.lastX = e.clientX;
    drag.lastT = e.timeStamp;
  };

  const endDrag = (e: PointerEvent<HTMLDivElement>) => {
    const s = m.current;
    if (!s.drag || s.drag.id !== e.pointerId) return;
    // Ignore a stale velocity if the pointer rested before letting go.
    const fresh = e.timeStamp - s.drag.lastT < 80;
    s.vel = fresh ? Math.max(-14, Math.min(14, s.drag.vel)) : 0;
    s.drag = null;
    if (e.pointerType !== 'mouse') s.holdUntil = performance.now() + 2500;
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      step(-1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      step(1);
    }
  };

  if (n === 0) return null;

  const chrome = tone === 'chrome';
  const btn = chrome
    ? 'border border-chrome-border bg-chrome-ground text-chrome-link hover:border-chrome-link'
    : 'border border-[color:var(--line-strong)] text-[color:var(--link)] hover:border-[color:var(--link)]';
  const meta = chrome ? 'text-chrome-meta' : 'text-[color:var(--muted)]';
  const current = slides[front] ?? slides[0];

  const only = slides[0];
  if (n === 1 && only) {
    return (
      <div className={className}>
        <ImageSlot src={only.src} alt={only.alt} label={only.src} ratio={ratio} fit={fit} sizes={sizes} unoptimized={unoptimized} />
      </div>
    );
  }

  return (
    <div
      ref={rootRef}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      className={className}
      onKeyDown={onKeyDown}
      onFocus={() => {
        m.current.focus = true;
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) m.current.focus = false;
      }}
    >
      {reduced ? (
        <div
          ref={railRef}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2"
        >
          {slides.map((s, i) => (
            <div
              key={s.src}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${n}`}
              className="flex-none snap-center"
              style={{ width: `${itemWidth * 100}%` }}
            >
              <ImageSlot src={s.src} alt={s.alt} label={s.src} ratio={ratio} fit={fit} sizes={sizes} unoptimized={unoptimized} />
            </div>
          ))}
        </div>
      ) : (
        <div
          ref={stageRef}
          className="relative w-full cursor-grab touch-pan-y select-none overflow-hidden active:cursor-grabbing"
          style={{ aspectRatio: stageAspect, perspective: '1400px' }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onPointerEnter={(e) => {
            if (e.pointerType === 'mouse') m.current.hover = true;
          }}
          onPointerLeave={(e) => {
            if (e.pointerType === 'mouse') m.current.hover = false;
          }}
        >
          <div className="absolute inset-0 [transform-style:preserve-3d]">
            {ring.map((r, i) => (
              <div
                key={i}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                {...(r.original
                  ? { role: 'group', 'aria-roledescription': 'slide', 'aria-label': `${i + 1} of ${n}` }
                  : { 'aria-hidden': true })}
                className="absolute left-1/2 top-0 will-change-transform [&_img]:pointer-events-none"
                style={{ width: `${itemWidth * 100}%`, ...slideStyle(wrap(i, N)) }}
              >
                <ImageSlot
                  src={r.slide.src}
                  alt={r.original ? r.slide.alt : ''}
                  label={r.slide.src}
                  ratio={ratio}
                  fit={fit}
                  sizes={sizes}
                  unoptimized={unoptimized}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className={`font-mono text-[12px] uppercase tracking-[0.14em] ${meta}`}>
          {reduced ? `${n} images` : `${front + 1} / ${n}${current?.caption ? ` · ${current.caption}` : ''}`}
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Previous image"
            className={`flex min-h-tap min-w-tap items-center justify-center font-mono text-[15px] transition-colors duration-200 ${btn}`}
          >
            <span aria-hidden="true">◄</span>
          </button>
          {reduced ? null : (
            <button
              type="button"
              onClick={togglePause}
              aria-label={paused ? 'Play carousel' : 'Pause carousel'}
              className={`flex min-h-tap min-w-tap items-center justify-center font-mono text-[13px] transition-colors duration-200 ${btn}`}
            >
              <span aria-hidden="true">{paused ? '►' : '❚❚'}</span>
            </button>
          )}
          <button
            type="button"
            onClick={() => step(1)}
            aria-label="Next image"
            className={`flex min-h-tap min-w-tap items-center justify-center font-mono text-[15px] transition-colors duration-200 ${btn}`}
          >
            <span aria-hidden="true">►</span>
          </button>
        </div>
      </div>
    </div>
  );
}
