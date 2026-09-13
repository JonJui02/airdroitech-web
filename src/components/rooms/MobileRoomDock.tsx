import type { Room, RoomKey } from './rooms';

/** Mobile bottom tab dock. Cells are 68px tall, comfortably over the 44px floor. */
export function MobileRoomDock({
  rooms,
  index,
  onRoom,
}: {
  rooms: Room[];
  index: number;
  onRoom: (k: RoomKey) => void;
}) {
  return (
    <nav
      aria-label="Rooms"
      className="flex min-h-[68px] flex-none items-stretch border-t border-chrome-line bg-chrome-rail"
    >
      {rooms.map((r, i) => {
        const active = i === index;
        return (
          <button
            key={r.key}
            type="button"
            onClick={() => onRoom(r.key)}
            aria-current={active ? 'true' : undefined}
            className={`flex flex-1 flex-col items-center justify-center gap-2 border-t-2 px-[2px] font-mono text-[9.5px] uppercase tracking-[0.08em] transition-colors duration-200 ${
              active
                ? 'border-t-chrome-state text-chrome-link'
                : 'border-t-transparent text-chrome-meta'
            }`}
          >
            <span
              aria-hidden="true"
              className={`h-[16px] w-[16px] border border-current ${
                active ? 'bg-chrome-state' : ''
              }`}
            />
            {r.label}
          </button>
        );
      })}
    </nav>
  );
}
