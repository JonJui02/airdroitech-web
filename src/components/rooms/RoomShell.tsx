'use client';

import { useCallback, useMemo, useRef, useState } from 'react';
import { Accent } from '@/components/ui/Accent';
import { TypeText } from '@/components/ui/TypeText';
import { BrandLogo } from '@/components/shell/BrandLogo';
import { ThemeToggle } from '@/components/shell/ThemeToggle';
import type { Role } from '@/lib/roles';
import { CAPABILITIES, EMAIL, COMPANY_FACTS } from '@/lib/site';
import { MobileRoomDock } from './MobileRoomDock';
import { RoomLegal } from './RoomLegal';
import { RoomReadMore } from './RoomReadMore';
import { RoomDial } from './RoomDial';
import { RoomDock } from './RoomDock';
import { RoomHeader } from './RoomHeader';
import { RoomRail } from './RoomRail';
import { AboutPane } from './panes/AboutPane';
import { CareerPane } from './panes/CareerPane';
import { ContactPane } from './panes/ContactPane';
import { DeviceDetail } from './panes/DeviceDetail';
import { HomePane } from './panes/HomePane';
import { ProjectsPane } from './panes/ProjectsPane';
import {
  ABOUT_BODY,
  ABOUT_HEADING,
  CAREER_BODY,
  CAREER_HEADING,
  CONTACT_HEADING,
  HERO_DECK,
  PROJECT_COPY,
} from './panes/copy';
import { at, buildRooms, readout, wrapIndex, type Room, type RoomKey } from './rooms';

export interface RoomShellProps {
  roles: Role[];
}

/**
 * Single-screen room navigation for `/`.
 *
 * One index drives everything: header cells, rail list, dial angle and arc,
 * dock readout and segments, and the mobile dock. Every control calls the same
 * setter, so they cannot disagree.
 *
 * All five rooms are mounted at all times and the inactive ones are hidden with
 * the `hidden` attribute. That keeps the whole homepage's copy in the served
 * HTML — the same content the previous scrolling page shipped — so nothing is
 * lost to crawlers, and no element depends on client state to become visible
 * (CLAUDE.md non-negotiable #3).
 */
export function RoomShell({ roles }: RoomShellProps) {
  const rooms = useMemo(
    () => buildRooms({ products: PROJECT_COPY.length, roles: roles.length }),
    [roles.length],
  );
  const total = rooms.length;

  const [index, setIndex] = useState(0);
  const [caps, setCaps] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(CAPABILITIES.map((c) => [c, true])),
  );
  const [device, setDevice] = useState<number | null>(null);
  const [dragging, setDragging] = useState(false);

  /** The card that opened the device detail, so focus can go back to it. */
  const opener = useRef<HTMLButtonElement | null>(null);

  const room = at(rooms, index).key;

  // Leaving Projects must not leave a device open behind it.
  const goIndex = useCallback((i: number) => {
    setIndex(i);
    setDevice(null);
  }, []);

  const goRoom = useCallback(
    (k: RoomKey) => goIndex(rooms.findIndex((r) => r.key === k)),
    [goIndex, rooms],
  );

  const closeDevice = useCallback(() => {
    setDevice(null);
    opener.current?.focus();
    opener.current = null;
  }, []);

  const openDevice = useCallback((i: number, el: HTMLButtonElement) => {
    opener.current = el;
    setDevice(i);
  }, []);

  const pageOf = (key: RoomKey) => rooms.find((r) => r.key === key)?.page;

  const paneProps = (key: RoomKey) => ({
    role: 'region' as const,
    'aria-label': rooms.find((r) => r.key === key)?.label ?? key,
    hidden: room !== key,
  });

  return (
    <main
      id="main"
      data-tone="home"
      className="flex h-[100dvh] flex-col overflow-hidden border border-chrome-line bg-chrome-ground"
    >
      {/* ---------------- desktop ---------------- */}
      <div className="hidden min-h-0 flex-1 flex-col lg:flex">
        <RoomHeader rooms={rooms} room={room} onRoom={goRoom} />

        <div className="grid min-h-0 flex-1 grid-cols-[300px_1fr] overflow-hidden">
          <RoomRail
            rooms={rooms}
            index={index}
            onIndex={goIndex}
            onRoom={goRoom}
            dragging={dragging}
            onDragging={setDragging}
          />

          <div className="relative min-h-0 overflow-hidden">
            <div {...paneProps('HOME')} className="h-full animate-pane-in overflow-y-auto">
              <HomePane
                onOpenProjects={() => goRoom('PROJECTS')}
              />
            </div>

            <div {...paneProps('ABOUT')} className="h-full animate-pane-in overflow-y-auto">
              <AboutPane
                caps={caps}
                onToggle={(n) => setCaps((c) => ({ ...c, [n]: !c[n] }))}
                page={pageOf('ABOUT')}
              />
            </div>

            <div {...paneProps('PROJECTS')} className="h-full animate-pane-in">
              {device === null ? (
                <ProjectsPane onOpen={openDevice} page={pageOf('PROJECTS')} />
              ) : (
                <DeviceDetail product={at(PROJECT_COPY, device)} onBack={closeDevice} />
              )}
            </div>

            <div {...paneProps('CAREER')} className="h-full animate-pane-in overflow-y-auto">
              <CareerPane roles={roles} />
            </div>

            <div {...paneProps('CONTACT')} className="h-full animate-pane-in overflow-y-auto">
              <ContactPane />
            </div>
          </div>
        </div>

        <RoomDock rooms={rooms} index={index} />
      </div>

      {/* ---------------- mobile ---------------- */}
      <div className="flex min-h-0 flex-1 flex-col lg:hidden">
        <header className="flex min-h-[62px] flex-none items-center gap-3 border-b border-chrome-line px-[20px]">
          <BrandLogo height="24px" />
          <span className="ml-auto font-mono text-[10.5px] uppercase tracking-[0.14em] text-chrome-link">
            {readout(index, total)}
          </span>
          <ThemeToggle className="-mr-2 text-chrome-body hover:text-chrome-link" />
        </header>

        <div className="flex flex-none items-center gap-[18px] border-b border-chrome-line bg-chrome-plate px-[20px] py-[18px]">
          <RoomDial
            rooms={rooms}
            index={index}
            onIndex={goIndex}
            size="sm"
            dragging={dragging}
            onDragging={setDragging}
          />
          <div>
            <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-chrome-meta">
              Room
            </p>
            <p className="mt-[6px] font-display text-[32px] font-bold leading-none text-chrome-ink">
              {at(rooms, index).label}
            </p>
            <p className="mt-2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-chrome-link">
              Turn the ring to move
            </p>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto">
          <MobilePane
            room={room}
            page={at(rooms, index).page}
            roles={roles}
            device={device}
            onOpenDevice={openDevice}
            onCloseDevice={closeDevice}
            onNext={() => goIndex(wrapIndex(index + 1, total))}
          />
        </div>

        <MobileRoomDock rooms={rooms} index={index} onRoom={goRoom} />
      </div>
    </main>
  );
}

/* ------------------------------------------------------------------ */

interface Stat {
  label: string;
  value: string;
}

/**
 * Mobile room summaries.
 *
 * Every stat is derived from repo data. The design's Disciplines 4, Teams 7,
 * Mode Hybrid, Reply 1 day and the three "Live" device statuses are not here —
 * none of them has a source, and Teams is actually 2, not 7.
 */
function MobilePane({
  room,
  page,
  roles,
  device,
  onOpenDevice,
  onCloseDevice,
  onNext,
}: {
  room: RoomKey;
  page: Room['page'];
  roles: Role[];
  device: number | null;
  onOpenDevice: (i: number, el: HTMLButtonElement) => void;
  onCloseDevice: () => void;
  onNext: () => void;
}) {
  const teams = new Set(roles.map((r) => r.team)).size;

  const content: Record<RoomKey, { kicker: string; title: string; accent?: string; copy: string; stats: Stat[] }> = {
    HOME: {
      kicker: 'Smart home · IoT · AI',
      title: 'Programming Intelligence',
      accent: 'Intelligence',
      copy: HERO_DECK,
      // Same facts as the desktop strip; sources in src/lib/site.ts.
      stats: COMPANY_FACTS.map((f) => ({ label: f.label, value: f.value })),
    },
    ABOUT: {
      kicker: 'Challenging the norm',
      title: ABOUT_HEADING,
      accent: 'your future',
      copy: ABOUT_BODY,
      stats: [
        { label: 'Capabilities', value: String(CAPABILITIES.length) },
        { label: 'Office', value: 'Shah Alam' },
      ],
    },
    PROJECTS: {
      kicker: 'Projects',
      title: 'ADT Projects',
      accent: 'Projects',
      copy: 'Three products, built and maintained in Shah Alam.',
      stats: [],
    },
    CAREER: {
      kicker: 'Careers',
      title: CAREER_HEADING,
      accent: '‘Airdroitechie’',
      copy: CAREER_BODY,
      stats: [
        { label: 'Roles', value: String(roles.length) },
        { label: 'Teams', value: String(teams) },
      ],
    },
    CONTACT: {
      kicker: 'Get in touch',
      title: CONTACT_HEADING,
      accent: 'the team',
      copy: `Every enquiry reaches ${EMAIL}.`,
      stats: [
        { label: 'Office', value: 'Shah Alam' },
        { label: 'Polyaire', value: '30+' },
      ],
    },
  };

  const c = content[room];

  if (room === 'PROJECTS' && device !== null) {
    const p = at(PROJECT_COPY, device);
    return (
      <div className="animate-sheet-in border-t border-chrome-state bg-chrome-plate px-[20px] pb-[26px] pt-[22px]">
        <div className="flex items-start">
          <h2 className="font-display text-[34px] font-bold leading-none tracking-[-0.03em] text-chrome-ink">
            {p.name}
          </h2>
          <button
            type="button"
            onClick={onCloseDevice}
            aria-label="Close device detail"
            className="ml-auto min-h-tap min-w-tap text-[22px] text-chrome-link"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <p className="mt-[14px] text-[15px] leading-[1.62] text-chrome-body">{p.copy}</p>
        <a
          href={p.href}
          className="mt-[22px] flex min-h-[54px] w-full items-center justify-center bg-teal-600 text-[16px] font-semibold text-white"
        >
          Full project page
        </a>
      </div>
    );
  }

  return (
    <div className="animate-pane-in-sm px-[20px] py-[22px]">
      <p className={`font-mono text-[11px] uppercase tracking-[0.16em] ${room === 'HOME' ? 'text-chrome-link' : 'text-chrome-meta'}`}>{c.kicker}</p>
      <h2 className="mt-[12px] font-display text-[36px] font-bold leading-[0.96] tracking-[-0.03em] text-chrome-ink">
        {room === 'PROJECTS' ? (
            <Accent text={c.title} accent={c.accent} tone="chrome" />
          ) : (
            // key={room} remounts per room, so each room title types in again.
            <TypeText key={room} text={c.title} accent={c.accent} tone="chrome" sweep={room === 'HOME'} replay />
          )}
      </h2>
      <p className="mt-[14px] text-[15.5px] leading-[1.62] text-chrome-body">{c.copy}</p>

      <RoomReadMore page={page} className="mt-[14px] text-[15.5px]" />

      {c.stats.length > 0 ? (
        <div
          className="mt-[22px] grid gap-px border border-chrome-line bg-chrome-line"
          // Four facts wrap to two rows so labels never crush at 375px.
          style={{ gridTemplateColumns: `repeat(${c.stats.length > 3 ? 2 : c.stats.length}, minmax(0, 1fr))` }}
        >
          {c.stats.map((s) => (
            <div key={s.label} className="hover-box bg-chrome-plate p-[14px]">
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-chrome-meta">
                {s.label}
              </p>
              <p className="mt-2 font-display text-[22px] font-bold leading-none text-chrome-ink">
                {s.value}
              </p>
            </div>
          ))}
        </div>
      ) : null}

      {room === 'PROJECTS' ? (
        <div className="mt-[22px] flex flex-col gap-px border border-chrome-line bg-chrome-line">
          {PROJECT_COPY.map((p, i) => (
            <button
              key={p.name}
              type="button"
              onClick={(e) => onOpenDevice(i, e.currentTarget)}
              className="hover-box min-h-tap bg-chrome-plate px-[16px] py-[16px] text-left"
            >
              <span className="block font-mono text-[10.5px] uppercase tracking-[0.14em] text-chrome-meta">
                {p.tag}
              </span>
              <span className="mt-2 block font-display text-[22px] font-bold text-chrome-ink">
                {p.name}
              </span>
              <span className="mt-2 block text-[14.5px] leading-[1.55] text-chrome-body">
                {p.copy}
              </span>
              <span className="mt-3 block text-[15px] font-semibold text-chrome-link">
                Open device <span aria-hidden="true">→</span>
              </span>
            </button>
          ))}
        </div>
      ) : null}

      <RoomLegal className="mt-[26px] border-t border-chrome-line pt-[18px]" />

      <button
        type="button"
        onClick={onNext}
        className="mt-[24px] flex min-h-[54px] w-full items-center justify-center bg-teal-600 text-[16px] font-semibold text-white transition-colors duration-200 hover:bg-chrome-primary-hover"
      >
        Next room <span aria-hidden="true" className="ml-2">→</span>
      </button>
    </div>
  );
}
