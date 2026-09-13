import Link from 'next/link';
import { BrandLogo } from '@/components/shell/BrandLogo';
import { ThemeToggle } from '@/components/shell/ThemeToggle';
import type { Room, RoomKey } from './rooms';

interface RoomHeaderProps {
  rooms: Room[];
  room: RoomKey;
  onRoom: (k: RoomKey) => void;
}

/** Desktop header: logo cell plus one cell per room. */
export function RoomHeader({ rooms, room, onRoom }: RoomHeaderProps) {
  return (
    <header className="flex min-h-[70px] flex-none items-stretch border-b border-chrome-line">
      <div className="flex w-[300px] flex-none items-center border-r border-chrome-line px-[26px]">
        <Link
          href="/"
          aria-label="AirdroiTech home"
          className="flex min-h-tap items-center self-stretch"
        >
          <BrandLogo height="28px" />
        </Link>
      </div>

      <nav aria-label="Rooms" className="flex flex-1 items-stretch">
        {rooms.map((r) => {
          const active = r.key === room;
          return (
            <button
              key={r.key}
              type="button"
              onClick={() => onRoom(r.key)}
              aria-current={active ? 'true' : undefined}
              className={`flex flex-1 flex-col justify-center gap-[7px] border-l border-chrome-line px-[20px] text-left font-mono text-[12.5px] uppercase tracking-[0.12em] transition-colors duration-200 ${
                active ? 'bg-teal-600 text-white' : 'text-chrome-body hover:bg-chrome-hover'
              }`}
            >
              <span className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className={`h-[7px] w-[7px] flex-none ${
                    active ? 'bg-lime-500' : 'bg-chrome-border'
                  }`}
                />
                {r.label}
              </span>
              <span className="text-[10.5px] tracking-[0.14em] opacity-70">{r.sub}</span>
            </button>
          );
        })}
      </nav>

      <div className="flex flex-none items-center justify-center border-l border-chrome-line px-[10px]">
        <ThemeToggle className="text-chrome-body hover:text-lime-500" />
      </div>
    </header>
  );
}
