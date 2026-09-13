'use client';

import { RoomDial } from './RoomDial';
import { wrapIndex, type Room, type RoomKey } from './rooms';

interface RoomRailProps {
  rooms: Room[];
  index: number;
  onIndex: (i: number) => void;
  onRoom: (k: RoomKey) => void;
  dragging: boolean;
  onDragging: (d: boolean) => void;
}

export function RoomRail({ rooms, index, onIndex, onRoom, dragging, onDragging }: RoomRailProps) {
  const total = rooms.length;

  return (
    <div className="flex flex-col border-r border-chrome-line bg-chrome-ground">
      <div className="flex flex-none flex-col items-center border-b border-chrome-line px-[24px] pb-[24px] pt-[26px]">
        <RoomDial
          rooms={rooms}
          index={index}
          onIndex={onIndex}
          size="lg"
          dragging={dragging}
          onDragging={onDragging}
        />

        <div className="mt-[20px] flex w-full gap-px border border-chrome-line bg-chrome-line">
          <button
            type="button"
            onClick={() => onIndex(wrapIndex(index - 1, total))}
            className="min-h-[46px] flex-1 bg-chrome-plate font-mono text-[12.5px] tracking-[0.14em] text-chrome-ink transition-colors duration-200 hover:bg-chrome-hover"
          >
            <span aria-hidden="true">◄ </span>PREV
          </button>
          <button
            type="button"
            onClick={() => onIndex(wrapIndex(index + 1, total))}
            className="min-h-[46px] flex-1 bg-chrome-plate font-mono text-[12.5px] tracking-[0.14em] text-chrome-ink transition-colors duration-200 hover:bg-chrome-hover"
          >
            NEXT<span aria-hidden="true"> ►</span>
          </button>
        </div>
      </div>

      <nav aria-label="Rooms, list" className="flex flex-1 flex-col">
        {rooms.map((r, i) => {
          const active = i === index;
          return (
            <button
              key={r.key}
              type="button"
              onClick={() => onRoom(r.key)}
              aria-current={active ? 'true' : undefined}
              className={`flex flex-1 items-center gap-[14px] border-b border-chrome-line px-[24px] text-left font-mono text-[12px] uppercase tracking-[0.12em] transition-colors duration-200 ${
                active
                  ? 'bg-chrome-plate text-chrome-link'
                  : 'text-chrome-body hover:bg-chrome-hover'
              }`}
            >
              <span
                aria-hidden="true"
                className={`h-[2px] w-[18px] flex-none ${
                  active ? 'bg-chrome-state' : 'bg-chrome-border'
                }`}
              />
              {r.label}
              <span className="ml-auto text-[10.5px] text-chrome-meta">
                {String(i + 1).padStart(2, '0')}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
