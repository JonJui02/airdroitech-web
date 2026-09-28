'use client';

import { useEffect, useRef, useState } from 'react';
import type { KeyboardEvent, MouseEvent, PointerEvent } from 'react';
import { plainClick } from './RoomNext';
import { at, readout, wrapIndex, type Room } from './rooms';

interface RoomDialProps {
  rooms: Room[];
  index: number;
  onIndex: (i: number) => void;
  /**
   * `full` — the desktop knob, room names printed around its rim.
   * `arc` — the phone's half-dial, docked at the bottom of the screen within
   * thumb reach, names spread across its arc.
   */
  variant: 'full' | 'arc';
  /** Prefix for tab and panel ids, so each dial controls its own panels. */
  idBase: string;
}

/** Springy settle: a slight overshoot, like a knob dropping into a detent. */
const SETTLE = 'transform 460ms cubic-bezier(0.34, 1.56, 0.64, 1)';
/** Grip ridges around the knob rim. */
const RIDGES = 40;
/** The arc variant spreads the rooms across ±72°, so every name is on screen. */
const ARC_SPAN = 144;
/** How far past the end detents the arc knob may be dragged before it stops. */
const ARC_LIMIT = 86;

/** Full dial geometry, in a 380-unit box; everything renders as percentages. */
const F = { box: 380, body: 70, groove: 82, knob: 106, marks: 131, labels: 166 };
/** Arc geometry, in px: knob centre sits just below the dock's bottom edge. */
const A = { h: 132, cy: 140, knob: 62, marks: 84, labels: 104 };

const rad = (deg: number) => (deg * Math.PI) / 180;

/** Pointer angle in degrees: 0 at twelve o'clock, positive clockwise, -180..180. */
function pointerDeg(el: HTMLElement, x: number, y: number) {
  const r = el.getBoundingClientRect();
  return (Math.atan2(x - (r.left + r.width / 2), -(y - (r.top + r.height / 2))) * 180) / Math.PI;
}

/**
 * The homepage's only navigation (design review, 2026-09-28): a physical
 * selector knob whose room names sit around its rim, the way the settings sit
 * around a real rotary switch. The indicator points at the current room.
 *
 * Three ways to use it, all equivalent: click or tap a name, drag the knob
 * (it follows the pointer and drops into the nearest detent with a small
 * overshoot), or focus a name and use the arrow keys.
 *
 * Accessibility: the names are a real tab list (role="tablist", one
 * role="tab" per room, arrow keys move, Home and End jump), so nobody has to
 * operate the knob; the knob itself is hidden from screen readers. Each name
 * is also a real link to the room's own page, so without JavaScript the dial
 * still navigates the site — JavaScript turns a plain click into a room change.
 *
 * The neumorphic shading is the scoped shadow exception in docs/BRAND.md
 * ("Dial shading"); every colour is a --neu-* or chrome token.
 */
export function RoomDial({ rooms, index, onIndex, variant, idBase }: RoomDialProps) {
  const total = rooms.length;
  const full = variant === 'full';
  const step = full ? 360 / total : ARC_SPAN / (total - 1);
  const detent = (i: number) => (full ? i * step : -ARC_SPAN / 2 + i * step);

  const knobRef = useRef<HTMLDivElement>(null);
  const tabs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [angle, setAngle] = useState(() => detent(index));
  const [dragging, setDragging] = useState(false);
  const angleRef = useRef(angle);
  const drag = useRef<{ last: number; moved: number; x: number; y: number } | null>(null);

  const turnTo = (a: number) => {
    angleRef.current = a;
    setAngle(a);
  };

  // Settle on the current room after a drag, or when the room changes by name
  // or key. The full dial turns the short way round.
  useEffect(() => {
    if (dragging) return;
    const target = full ? index * step : -ARC_SPAN / 2 + index * step;
    turnTo(full ? target + 360 * Math.round((angleRef.current - target) / 360) : target);
  }, [index, dragging, full, step]);

  const nearest = (a: number) =>
    full
      ? wrapIndex(Math.round(a / step), total)
      : Math.min(total - 1, Math.max(0, Math.round((a + ARC_SPAN / 2) / step)));

  function onPointerDown(e: PointerEvent<HTMLDivElement>) {
    if ((e.target as HTMLElement).closest('a')) return;
    const el = knobRef.current;
    if (!el) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { last: pointerDeg(el, e.clientX, e.clientY), moved: 0, x: e.clientX, y: e.clientY };
    setDragging(true);
  }

  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    const d = drag.current;
    const el = knobRef.current;
    if (!d || !el) return;
    const p = pointerDeg(el, e.clientX, e.clientY);
    const delta = ((p - d.last + 540) % 360) - 180;
    d.last = p;
    d.moved = Math.max(d.moved, Math.hypot(e.clientX - d.x, e.clientY - d.y));
    if (d.moved < 4) return;
    const raw = angleRef.current + delta;
    const a = full ? raw : Math.min(ARC_LIMIT, Math.max(-ARC_LIMIT, raw));
    turnTo(a);
    const next = nearest(a);
    if (next !== index) {
      onIndex(next);
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) navigator.vibrate(6);
    }
  }

  function endDrag(e: PointerEvent<HTMLDivElement>) {
    const d = drag.current;
    const el = knobRef.current;
    drag.current = null;
    if (d && el && d.moved < 4) {
      // A tap on the knob: jump to the room it points toward.
      const p = pointerDeg(el, e.clientX, e.clientY);
      onIndex(nearest(full ? (p + 360) % 360 : p));
    }
    setDragging(false);
  }

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    // A horizontal tab list: Left/Right, Home/End (WAI-ARIA tabs pattern).
    const keys: Record<string, number> = {
      ArrowRight: wrapIndex(index + 1, total),
      ArrowLeft: wrapIndex(index - 1, total),
      Home: 0,
      End: total - 1,
    };
    const next = e.key === ' ' ? index : keys[e.key];
    if (next === undefined) return;
    e.preventDefault();
    onIndex(next);
    tabs.current[next]?.focus();
  }

  function onTabClick(e: MouseEvent<HTMLAnchorElement>, i: number) {
    if (!plainClick(e)) return;
    e.preventDefault();
    onIndex(i);
  }

  const knobStyle = { transform: `rotate(${angle}deg)`, transition: dragging ? 'none' : SETTLE };
  const handlers = {
    onPointerDown,
    onPointerMove,
    onPointerUp: endDrag,
    onPointerCancel: endDrag,
  };

  const tabList = (
    // A navigation landmark as well as a tab list: it is the homepage's only
    // navigation, so landmark users should find it like the header nav elsewhere.
    <nav aria-label="Main">
      <div role="tablist" aria-label="Rooms" aria-orientation="horizontal" onKeyDown={onKeyDown}>
      {rooms.map((r, i) => {
        const active = i === index;
        const deg = detent(i);
        const pos = full
          ? {
              left: `${50 + ((F.labels / F.box) * 100) * Math.sin(rad(deg))}%`,
              top: `${50 - ((F.labels / F.box) * 100) * Math.cos(rad(deg))}%`,
            }
          : {
              left: `calc(50% + ${(A.labels * Math.sin(rad(deg))).toFixed(1)}px)`,
              top: `${(A.cy - A.labels * Math.cos(rad(deg))).toFixed(1)}px`,
            };
        return (
          <a
            key={r.key}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            href={r.page?.href ?? '/'}
            role="tab"
            id={`${idBase}-tab-${r.key}`}
            aria-selected={active}
            aria-controls={`${idBase}-panel-${r.key}`}
            tabIndex={active ? 0 : -1}
            onClick={(e) => onTabClick(e, i)}
            style={pos}
            className={`absolute z-[2] flex min-h-tap min-w-tap -translate-x-1/2 -translate-y-1/2 items-center justify-center whitespace-nowrap font-mono uppercase transition-colors duration-200 ${
              full
                ? 'gap-[7px] px-2 text-[12px] tracking-[0.14em]'
                : 'flex-col gap-[5px] px-1 text-[10.5px] tracking-[0.1em]'
            } ${active ? 'font-semibold text-chrome-ink' : 'text-chrome-meta hover:text-chrome-ink'}`}
          >
            <span
              aria-hidden="true"
              className={`block h-[6px] w-[6px] flex-none transition-colors duration-200 ${active ? 'bg-chrome-state' : 'bg-chrome-border'}`}
            />
            {r.label}
          </a>
        );
      })}
      </div>
    </nav>
  );

  const ridges = (
    <svg viewBox="0 0 100 100" className="h-full w-full" focusable="false" style={knobStyle}>
      {Array.from({ length: RIDGES }, (_, i) => (
        <line
          key={i}
          x1="50"
          y1="3"
          x2="50"
          y2="9"
          transform={`rotate(${(i * 360) / RIDGES} 50 50)`}
          stroke="var(--neu-ridge)"
          strokeWidth={full ? 1.2 : 1.6}
          strokeLinecap="round"
        />
      ))}
      {full ? null : (
        <line x1="50" y1="50" x2="50" y2="18" className="stroke-chrome-state" strokeWidth={3} strokeLinecap="round" />
      )}
      <circle cx="50" cy={full ? 17 : 12} r={full ? 4.5 : 5} className="fill-chrome-state" />
    </svg>
  );

  if (full) {
    const pct = (n: number) => `${((n / F.box) * 100).toFixed(2)}%`;
    return (
      <div className="relative aspect-square w-[320px] flex-none select-none xl:w-[380px]">
        {/* Raised body: the drag surface. */}
        <div
          aria-hidden="true"
          data-flow-source=""
          {...handlers}
          className={`absolute touch-none rounded-full bg-chrome-ground ${dragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          style={{ inset: pct(F.body), boxShadow: 'var(--neu-raised-lg)' }}
        />
        {/* Inset groove */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute rounded-full bg-chrome-ground"
          style={{ inset: pct(F.groove), boxShadow: 'var(--neu-inset)' }}
        />
        {/* Detent dots just outside the body, one per room */}
        <svg viewBox={`0 0 ${F.box} ${F.box}`} className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true" focusable="false">
          {rooms.map((r, i) => (
            <circle
              key={r.key}
              cx={F.box / 2 + F.marks * Math.sin(rad(detent(i)))}
              cy={F.box / 2 - F.marks * Math.cos(rad(detent(i)))}
              r={3}
              className={i === index ? 'fill-chrome-state' : 'fill-chrome-meta'}
            />
          ))}
        </svg>
        {/* Raised knob: fixed light, rotating ridges and indicator */}
        <div
          ref={knobRef}
          aria-hidden="true"
          className="pointer-events-none absolute overflow-hidden rounded-full bg-chrome-ground"
          style={{ inset: pct(F.knob), boxShadow: 'var(--neu-knob-lg)', backgroundImage: 'var(--neu-knob-face)' }}
        >
          {ridges}
        </div>
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-chrome-meta">{readout(index, total)}</p>
          <p className="mt-[6px] font-display text-[24px] font-bold leading-none tracking-[-0.02em] text-chrome-ink">
            {at(rooms, index).label}
          </p>
        </div>
        {tabList}
      </div>
    );
  }

  return (
    // No overflow clipping here, so a focus ring on an end label is never cut;
    // the knob's lower half runs off the screen edge and the console clips it.
    <div {...handlers} className={`relative h-[132px] w-full touch-none select-none ${dragging ? 'cursor-grabbing' : 'cursor-grab'}`}>
      {/* Track arc. The names carry their own dots, so the arc has no detent
          dots of its own: two markers per room read as clutter at 375px. */}
      <svg
        viewBox={`0 0 375 ${A.h}`}
        className="pointer-events-none absolute top-0 h-[132px] w-[375px]"
        style={{ left: 'calc(50% - 187.5px)' }}
        aria-hidden="true"
        focusable="false"
      >
        <path
          d={`M${187.5 - A.marks * Math.sin(rad(80))} ${A.cy - A.marks * Math.cos(rad(80))} A${A.marks} ${A.marks} 0 0 1 ${187.5 + A.marks * Math.sin(rad(80))} ${A.cy - A.marks * Math.cos(rad(80))}`}
          fill="none"
          stroke="var(--neu-track)"
          strokeWidth={2}
        />
      </svg>
      {/* Half-visible knob: its centre sits just below the dock's bottom edge */}
      <div
        ref={knobRef}
        aria-hidden="true"
        data-flow-source=""
        className="pointer-events-none absolute overflow-hidden rounded-full bg-chrome-ground"
        style={{
          width: A.knob * 2,
          height: A.knob * 2,
          left: `calc(50% - ${A.knob}px)`,
          top: A.cy - A.knob,
          boxShadow: 'var(--neu-knob-sm)',
          backgroundImage: 'var(--neu-knob-face)',
        }}
      >
        {ridges}
      </div>
      {tabList}
    </div>
  );
}
