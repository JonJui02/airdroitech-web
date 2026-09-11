'use client';

import { useRef } from 'react';
import { at, readout, wrapIndex, type Room } from './rooms';

interface RoomDialProps {
  rooms: Room[];
  index: number;
  onIndex: (i: number) => void;
  /** Desktop dial is 204px; the mobile ring is 104px with thinner strokes. */
  size: 'lg' | 'sm';
  dragging: boolean;
  onDragging: (d: boolean) => void;
}

const R_TRACK = 95;
const R_GROOVE = 84;
const C = 2 * Math.PI * R_GROOVE;

/**
 * The rotary room selector.
 *
 * Pointer maths: atan2(dx, -dy) puts 0° at twelve o'clock and increases
 * clockwise, which matches how the needle is drawn. The result is quantised to
 * the nearest of five positions.
 *
 * It is a slider, not a set of buttons: one value out of five, changed
 * continuously. So it carries role="slider" and the arrow/Home/End keys, and
 * the rail and header still provide discrete buttons for the same state — a
 * keyboard user never has to operate the dial to reach a room.
 */
export function RoomDial({ rooms, index, onIndex, size, dragging, onDragging }: RoomDialProps) {
  const ref = useRef<HTMLDivElement>(null);
  const total = rooms.length;
  const lg = size === 'lg';

  function apply(clientX: number, clientY: number) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = clientX - (r.left + r.width / 2);
    const dy = clientY - (r.top + r.height / 2);
    let deg = (Math.atan2(dx, -dy) * 180) / Math.PI;
    if (deg < 0) deg += 360;
    onIndex(Math.min(total - 1, Math.round((deg / 360) * total) % total));
  }

  function onKeyDown(e: React.KeyboardEvent) {
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
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture(e.pointerId);
        onDragging(true);
        apply(e.clientX, e.clientY);
      }}
      onPointerMove={(e) => dragging && apply(e.clientX, e.clientY)}
      onPointerUp={() => onDragging(false)}
      onPointerCancel={() => onDragging(false)}
      className={`relative touch-none select-none ${
        dragging ? 'cursor-grabbing' : 'cursor-grab'
      } ${lg ? 'h-[204px] w-[204px]' : 'h-[104px] w-[104px] flex-none'}`}
    >
      <svg viewBox="0 0 204 204" className="h-full w-full" aria-hidden="true" focusable="false">
        <circle
          cx="102"
          cy="102"
          r={R_TRACK}
          fill="none"
          className="stroke-chrome-line"
          strokeWidth={lg ? 1 : 2}
        />
        <circle
          cx="102"
          cy="102"
          r={R_GROOVE}
          fill="none"
          className="stroke-chrome-grid"
          strokeWidth="14"
        />
        <circle
          cx="102"
          cy="102"
          r={R_GROOVE}
          fill="none"
          className="stroke-lime-500"
          strokeWidth="14"
          strokeDasharray={`${(C * (index + 1)) / total} ${C}`}
          transform="rotate(-90 102 102)"
          style={{ transition: 'stroke-dasharray 260ms ease' }}
        />
        <g
          style={{
            transform: `rotate(${(index / total) * 360}deg)`,
            transformOrigin: '102px 102px',
            transition: 'transform 280ms ease',
          }}
        >
          <line
            x1="102"
            y1="102"
            x2="102"
            y2="30"
            className="stroke-teal-600"
            strokeWidth={lg ? 2 : 3}
            strokeLinecap="round"
          />
          <circle cx="102" cy="30" r={lg ? 6.5 : 9} className="fill-lime-500" />
        </g>
      </svg>

      {lg ? (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-chrome-meta">
            {readout(index, total)}
          </p>
          <p className="mt-[6px] font-display text-[27px] font-bold leading-none tracking-[-0.02em] text-chrome-ink">
            {at(rooms, index).label}
          </p>
        </div>
      ) : null}
    </div>
  );
}
