import { ADDRESS_LINES } from '@/lib/site';
import { RoomLegal } from './RoomLegal';
import { at, readout, type Room } from './rooms';

/**
 * Desktop status dock.
 *
 * The design's right-hand readout was "Shah Alam 30° · System online · 4 zones".
 * There is no weather source and no system to be online, so that is replaced
 * with the location string the site header already uses. Nothing here is
 * presented as live.
 */
export function RoomDock({ rooms, index }: { rooms: Room[]; index: number }) {
  const total = rooms.length;
  // "Shah Alam, Selangor," -> "Shah Alam · Selangor · Malaysia"
  const place = ADDRESS_LINES.slice(2)
    .join(' ')
    .replace(/,\s*$/, '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .join(' · ');

  return (
    <div className="flex-none border-t border-chrome-line bg-chrome-rail">
      <div className="flex min-h-[52px] items-center gap-[22px] px-[26px]">
      <span className="font-mono text-[11.5px] uppercase tracking-[0.14em] text-chrome-meta">
        You are in
      </span>

      <span
        aria-live="polite"
        className="font-mono text-[12.5px] uppercase tracking-[0.14em] text-lime-500"
      >
        {at(rooms, index).label} · {readout(index, total)}
      </span>

      <span aria-hidden="true" className="ml-2 flex gap-1">
        {rooms.map((r, i) => (
          <span
            key={r.key}
            className={`h-[3px] w-[34px] transition-colors duration-200 ${
              i === index ? 'bg-lime-500' : 'bg-chrome-line'
            }`}
          />
        ))}
      </span>

        <span className="ml-auto font-mono text-[11.5px] uppercase tracking-[0.14em] text-chrome-meta">
          {place}
        </span>
      </div>

      <RoomLegal className="border-t border-chrome-line px-[26px] py-[9px]" />
    </div>
  );
}
