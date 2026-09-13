'use client';

import { useEffect, useRef, useState } from 'react';
import type { KeyboardEvent, PointerEvent } from 'react';
import { at, readout, wrapIndex, type Room } from './rooms';

interface RoomDialProps {
  rooms: Room[];
  index: number;
  onIndex: (i: number) => void;
  /** Desktop dial is 204px; the mobile dial is 104px. */
  size: 'lg' | 'sm';
  dragging: boolean;
  onDragging: (d: boolean) => void;
}

/** Progress arc radius, in the 204-unit viewBox: the middle of the groove. */
const R_ARC = 80;
const C = 2 * Math.PI * R_ARC;
/** Grip ridges around the knob rim. */
const RIDGES = 40;
/** Springy settle: a slight overshoot, like a knob dropping into a detent. */
const SETTLE = 'transform 460ms cubic-bezier(0.34, 1.56, 0.64, 1)';

/** Pointer angle in degrees: 0 at twelve o'clock, increasing clockwise. */
function pointerDeg(el: HTMLElement, x: number, y: number) {
  const r = el.getBoundingClientRect();
  const deg = (Math.atan2(x - (r.left + r.width / 2), -(y - (r.top + r.height / 2))) * 180) / Math.PI;
  return deg < 0 ? deg + 360 : deg;
}

/**
 * The rotary room selector, drawn as a physical neumorphic knob (user request
 * 2026-09-13): a raised body, an inset groove carrying the progress arc, detent
 * dots, and a raised knob with grip ridges and an indicator.
 *
 * Feel: dragging turns the knob continuously with the pointer (relative, so the
 * knob never jumps under your finger) and changes room as it passes each
 * detent; releasing springs it onto the nearest detent with a small overshoot.
 * A tap without dragging still jumps straight to the room under the pointer.
 * On phones that support it, each detent gives a tiny vibration.
 *
 * The shadows are a scoped exception to "hairline borders, not shadows" — see
 * docs/BRAND.md. Shadow colours are tokens (--neu-*) in globals.css.
 *
 * It is a slider, not a set of buttons: one value out of five. So it carries
 * role="slider" and the arrow/Home/End keys, and the rail and header still give
 * discrete buttons for the same state — no one has to operate the dial.
 */
export function RoomDial({ rooms, index, onIndex, size, dragging, onDragging }: RoomDialProps) {
  const ref = useRef<HTMLDivElement>(null);
  const total = rooms.length;
  const step = 360 / total;
  const lg = size === 'lg';

  // Unwrapped knob rotation in degrees. Kept in a ref too, for pointer maths.
  const [angle, setAngle] = useState(index * step);
  const angleRef = useRef(angle);
  const drag = useRef<{ last: number; moved: number; x: number; y: number } | null>(null);

  const turnTo = (a: number) => {
    angleRef.current = a;
    setAngle(a);
  };

  // Settle on the current room: after a drag, or when the room changes from the
  // rail, header or keys. Turns the short way round to the nearest detent.
  useEffect(() => {
    if (dragging) return;
    const target = index * step;
    turnTo(target + 360 * Math.round((angleRef.current - target) / 360));
  }, [index, dragging, step]);

  function onPointerDown(e: PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { last: pointerDeg(el, e.clientX, e.clientY), moved: 0, x: e.clientX, y: e.clientY };
    onDragging(true);
  }

  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    const d = drag.current;
    const el = ref.current;
    if (!d || !el) return;
    const p = pointerDeg(el, e.clientX, e.clientY);
    const delta = ((p - d.last + 540) % 360) - 180;
    d.last = p;
    d.moved = Math.max(d.moved, Math.hypot(e.clientX - d.x, e.clientY - d.y));
    const a = angleRef.current + delta;
    turnTo(a);
    const next = wrapIndex(Math.round(a / step), total);
    if (next !== index) {
      onIndex(next);
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) navigator.vibrate(6);
    }
  }

  function endDrag(e: PointerEvent<HTMLDivElement>) {
    const d = drag.current;
    const el = ref.current;
    drag.current = null;
    if (d && el && d.moved < 4) {
      // A tap: jump to the room under the pointer.
      const p = pointerDeg(el, e.clientX, e.clientY);
      onIndex(Math.round((p / 360) * total) % total);
    }
    onDragging(false);
  }

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const keys: Record<string, number> = {
      ArrowLeft: wrapIndex(index - 1, total),
      ArrowDown: wrapIndex(index - 1, total),
      ArrowRight: wrapIndex(index + 1, total),
      ArrowUp: wrapIndex(index + 1, total),
      Home: 0,
      End: total - 1,
    };
    const next = keys[e.key];
    if (next === undefined) return;
    e.preventDefault();
    onIndex(next);
  }

  // The dial sits on the rail (desktop) or the header plate (mobile); its body
  // must be the same colour as that surface for the neumorphic effect.
  const surface = lg ? 'bg-chrome-ground' : 'bg-chrome-plate';
  const grooveInset = lg ? 10 : 5;
  const knobInset = lg ? 34 : 17;

  return (
    <div
      ref={ref}
      role="slider"
      tabIndex={0}
      aria-valuemin={1}
      aria-valuemax={total}
      aria-valuenow={index + 1}
      aria-valuetext={at(rooms, index).label}
      aria-label="Room selector"
      onKeyDown={onKeyDown}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      className={`relative flex-none touch-none select-none rounded-full ${
        dragging ? 'cursor-grabbing' : 'cursor-grab'
      } ${lg ? 'h-[204px] w-[204px]' : 'h-[104px] w-[104px]'}`}
    >
      {/* Raised body */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 rounded-full ${surface}`}
        style={{ boxShadow: lg ? 'var(--neu-raised-lg)' : 'var(--neu-raised-sm)' }}
      />

      {/* Inset groove */}
      <div
        aria-hidden="true"
        className={`absolute rounded-full ${surface}`}
        style={{ inset: grooveInset, boxShadow: 'var(--neu-inset)' }}
      />

      {/* Progress arc in the groove, and a detent dot for each room */}
      <svg viewBox="0 0 204 204" className="absolute inset-0 h-full w-full" aria-hidden="true" focusable="false">
        {rooms.map((r, i) => {
          const rad = ((i * step - 90) * Math.PI) / 180;
          return (
            <circle
              key={r.key}
              cx={102 + 97 * Math.cos(rad)}
              cy={102 + 97 * Math.sin(rad)}
              r={lg ? 2 : 3.2}
              className={i === index ? 'fill-chrome-state' : 'fill-chrome-meta'}
            />
          );
        })}
        {/* Full track under the arc: chrome-line in light, chrome-grid in dark (--neu-track). */}
        <circle
          cx="102"
          cy="102"
          r={R_ARC}
          fill="none"
          stroke="var(--neu-track)"
          strokeWidth={lg ? 9 : 12}
        />
        <circle
          cx="102"
          cy="102"
          r={R_ARC}
          fill="none"
          className="stroke-chrome-state"
          strokeWidth={lg ? 9 : 12}
          strokeLinecap="round"
          strokeDasharray={`${(C * (index + 1)) / total} ${C}`}
          transform="rotate(-90 102 102)"
          style={{ transition: 'stroke-dasharray 260ms ease' }}
        />
      </svg>

      {/* Raised knob: fixed light and shadow, rotating ridges and indicator */}
      <div
        aria-hidden="true"
        className={`absolute overflow-hidden rounded-full ${surface}`}
        style={{
          inset: knobInset,
          boxShadow: lg ? 'var(--neu-knob-lg)' : 'var(--neu-knob-sm)',
          backgroundImage: 'var(--neu-knob-face)',
        }}
      >
        <svg
          viewBox="0 0 100 100"
          className="h-full w-full"
          focusable="false"
          style={{ transform: `rotate(${angle}deg)`, transition: dragging ? 'none' : SETTLE }}
        >
          {Array.from({ length: RIDGES }, (_, i) => (
            <line
              key={i}
              x1="50"
              y1="3"
              x2="50"
              y2="9"
              transform={`rotate(${(i * 360) / RIDGES} 50 50)`}
              stroke="var(--neu-ridge)"
              strokeWidth={lg ? 1.2 : 1.8}
              strokeLinecap="round"
            />
          ))}
          <circle cx="50" cy="19" r={lg ? 4.5 : 7} className="fill-chrome-state" />
        </svg>
      </div>

      {lg ? (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-chrome-meta">
            {readout(index, total)}
          </p>
          <p className="mt-[6px] font-display text-[25px] font-bold leading-none tracking-[-0.02em] text-chrome-ink">
            {at(rooms, index).label}
          </p>
        </div>
      ) : null}
    </div>
  );
}
