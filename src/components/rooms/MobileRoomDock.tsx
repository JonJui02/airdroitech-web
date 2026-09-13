import type { ReactNode } from 'react';
import type { Room, RoomKey } from './rooms';

/**
 * Outline icons for the mobile room dock (user request 2026-09-13). 24-unit
 * grid, 1.6 stroke in currentColor, so each icon takes the tab's text colour
 * and follows light, dark and the active state with no extra rules. About uses
 * a cloud, echoing the cloud in the AirdroiTech mark.
 */
const ICONS: Record<RoomKey, ReactNode> = {
  HOME: (
    <>
      <path d="M3.5 10.5 12 3.5l8.5 7" />
      <path d="M5.5 9v11.5h13V9" />
      <path d="M10 20.5v-6h4v6" />
    </>
  ),
  ABOUT: <path d="M7 18.5h10.2a3.8 3.8 0 0 0 .6-7.55 6 6 0 0 0-11.4-1.6A4.6 4.6 0 0 0 7 18.5Z" />,
  PROJECTS: (
    <>
      <rect x="3" y="4" width="18" height="12.5" rx="1.5" />
      <path d="M8.5 20.5h7M12 16.5v4" />
    </>
  ),
  CAREER: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="1.5" />
      <path d="M9 7V5.2A1.2 1.2 0 0 1 10.2 4h3.6A1.2 1.2 0 0 1 15 5.2V7" />
      <path d="M3 12.5h18" />
    </>
  ),
  CONTACT: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="1.5" />
      <path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
    </>
  ),
};

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
            className={`flex flex-1 flex-col items-center justify-center gap-[6px] border-t-2 px-[2px] font-mono text-[9.5px] uppercase tracking-[0.08em] transition-colors duration-200 ${
              active
                ? 'border-t-chrome-state text-chrome-link'
                : 'border-t-transparent text-chrome-meta'
            }`}
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              focusable="false"
              fill="none"
              stroke="currentColor"
              strokeWidth={active ? 1.9 : 1.6}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-[22px] w-[22px] transition-[stroke-width] duration-200"
            >
              {ICONS[r.key]}
            </svg>
            {r.label}
          </button>
        );
      })}
    </nav>
  );
}
