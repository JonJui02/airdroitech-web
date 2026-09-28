'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Accent } from '@/components/ui/Accent';
import { TypeText } from '@/components/ui/TypeText';
import { Carousel3D } from '@/components/ui/Carousel3D';
import { CountUp } from '@/components/ui/CountUp';
import { Airflow } from '@/components/ui/Airflow';
import { ImageSlot } from '@/components/ui/ImageSlot';
import type { Role } from '@/lib/roles';
import { CAPABILITIES, EMAIL, COMPANY_FACTS } from '@/lib/site';
import { RoomLegal } from './RoomLegal';
import { RoomLink, RoomNext } from './RoomNext';
import Link from 'next/link';
import { RoomReadMore } from './RoomReadMore';
import { RoomDial } from './RoomDial';
import { RoomHeader } from './RoomHeader';
import { AboutPane } from './panes/AboutPane';
import { CareerPane } from './panes/CareerPane';
import { ContactPane } from './panes/ContactPane';
import { DeviceDetail } from './panes/DeviceDetail';
import { HomePane } from './panes/HomePane';
import { GiftBox } from '@/components/anniversary/GiftBox';
import { FLAGS } from '@/lib/flags';
import { ProjectsPane } from './panes/ProjectsPane';
import {
  ABOUT_BODY,
  ABOUT_HEADING,
  CAREER_BODY,
  CAREER_HEADING,
  CONTACT_HEADING,
  HERO_DECK,
  HOME_DOORS,
  PROJECT_COPY,
  ROOM_NEXT,
} from './panes/copy';
import { at, buildRooms, type Room, type RoomKey } from './rooms';

/** A room's named next step, if it has one. */
interface NextStep {
  label: string;
  href: string;
  onGo?: () => void;
}

export interface RoomShellProps {
  roles: Role[];
}

/**
 * Single-screen room navigation for `/`.
 *
 * One navigation (design review, 2026-09-28): the dial. On desktop it has its
 * own column beside the room; on phones it is a half-dial docked at the
 * bottom, within thumb reach. The top bar carries only the logo and the theme
 * switch, and the foot only the legal line. The old room tabs, rail list,
 * Prev/Next buttons, status dock and phone tab bar are gone.
 *
 * One index drives everything. Each layout has its own dial (a tab list) and
 * its own set of panels, linked by id, so both are valid tab widgets; the
 * other layout is display:none at any width, so only one is ever exposed.
 *
 * All five rooms are mounted at all times and the inactive ones are hidden with
 * the `hidden` attribute. That keeps the whole homepage's copy in the served
 * HTML, so nothing is lost to crawlers, and no element depends on client state
 * to become visible (CLAUDE.md non-negotiable #3).
 */
export function RoomShell({ roles }: RoomShellProps) {
  const rooms = useMemo(
    () => buildRooms({ products: PROJECT_COPY.length }),
    [],
  );

  const [index, setIndex] = useState(0);
  const [caps, setCaps] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(CAPABILITIES.map((c) => [c, true])),
  );
  const [device, setDevice] = useState<number | null>(null);

  /** The card that opened the device detail, so focus can go back to it. */
  const opener = useRef<HTMLButtonElement | null>(null);
  /** The phone layout scrolls as one column; a new room starts at its top. */
  const mobileScroll = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    mobileScroll.current?.scrollTo({ top: 0 });
  }, [index]);

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

  const nextOf = (key: RoomKey): NextStep | undefined => {
    if (!(key in ROOM_NEXT)) return undefined;
    const n = ROOM_NEXT[key as keyof typeof ROOM_NEXT];
    return {
      label: n.label,
      href: n.href,
      onGo: 'room' in n ? () => goRoom(n.room) : undefined,
    };
  };

  /** Panel attributes for one layout's tab list: `d` desktop, `m` phone. */
  const panel = (base: 'd' | 'm', key: RoomKey) => ({
    role: 'tabpanel' as const,
    id: `${base}-panel-${key}`,
    'aria-labelledby': `${base}-tab-${key}`,
    hidden: room !== key,
  });

  return (
    <main
      id="main"
      data-tone="home"
      className="flex h-[100dvh] flex-col overflow-hidden bg-chrome-ground"
    >
      {/* ---------------- desktop ---------------- */}
      <div className="relative hidden min-h-0 flex-1 flex-col lg:flex">
        <Airflow variant="desk" watch={index} />
        <RoomHeader />

        <div className="grid min-h-0 flex-1 grid-cols-[360px_1fr] overflow-hidden xl:grid-cols-[440px_1fr]">
          <div className="relative z-[2] flex items-center justify-center">
            <RoomDial rooms={rooms} index={index} onIndex={goIndex} variant="full" idBase="d" />
          </div>

          <div className="relative z-[2] min-h-0 overflow-hidden">
            <div {...panel('d', 'HOME')} className="h-full animate-pane-in overflow-y-auto">
              <HomePane onRoom={goRoom} />
            </div>

            <div {...panel('d', 'ABOUT')} className="h-full animate-pane-in overflow-y-auto">
              <AboutPane
                caps={caps}
                onToggle={(n) => setCaps((c) => ({ ...c, [n]: !c[n] }))}
                page={pageOf('ABOUT')}
                next={nextOf('ABOUT')}
              />
            </div>

            <div {...panel('d', 'PROJECTS')} className="h-full animate-pane-in">
              {device === null ? (
                <ProjectsPane onOpen={openDevice} page={pageOf('PROJECTS')} next={nextOf('PROJECTS')} />
              ) : (
                <DeviceDetail product={at(PROJECT_COPY, device)} onBack={closeDevice} />
              )}
            </div>

            <div {...panel('d', 'CAREER')} className="h-full animate-pane-in overflow-y-auto">
              <CareerPane roles={roles} />
            </div>

            <div {...panel('d', 'CONTACT')} className="h-full animate-pane-in overflow-y-auto">
              <ContactPane />
            </div>
          </div>
        </div>

        <RoomLegal className="relative z-[2] flex-none justify-end px-[32px]" />
      </div>

      {/* ---------------- mobile ---------------- */}
      <div className="relative flex min-h-0 flex-1 flex-col lg:hidden">
        <Airflow variant="phone" watch={index} />
        <RoomHeader compact />

        <div ref={mobileScroll} className="relative z-[2] min-h-0 flex-1 overflow-y-auto overscroll-contain">
          {rooms.map((r) => (
            <div key={r.key} {...panel('m', r.key)}>
              <MobilePane
                room={r.key}
                page={r.page}
                device={device}
                onOpenDevice={openDevice}
                onCloseDevice={closeDevice}
                onRoom={goRoom}
                next={nextOf(r.key)}
                roles={roles}
              />
            </div>
          ))}
        </div>

        <div className="relative z-[3] flex-none border-t border-chrome-line bg-chrome-ground pb-[env(safe-area-inset-bottom,0px)]">
          <RoomDial rooms={rooms} index={index} onIndex={goIndex} variant="arc" idBase="m" />
        </div>
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
  device,
  onOpenDevice,
  onCloseDevice,
  onRoom,
  next,
  roles,
}: {
  room: RoomKey;
  page: Room['page'];
  device: number | null;
  onOpenDevice: (i: number, el: HTMLButtonElement) => void;
  onCloseDevice: () => void;
  onRoom: (key: RoomKey) => void;
  next?: NextStep;
  roles: Role[];
}) {

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
      copy: 'Three Polyaire Group products.',
      stats: [],
    },
    CAREER: {
      kicker: 'Careers',
      title: CAREER_HEADING,
      accent: '‘Airdroitechie’',
      copy: CAREER_BODY,
      stats: [
        // Deliberately vague (user request 2026-09-13): no numbers to keep in sync.
        { label: 'Roles', value: 'Various' },
        { label: 'Teams', value: 'Multiple' },
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
        {/* Same swipeable 3D gallery as the desktop device view, sized for a phone. */}
        <Carousel3D
          slides={[{ src: `/${p.asset}`, alt: `${p.name} — ${p.kicker}` }, ...p.gallery]}
          label={`${p.name} images`}
          ratio="4/3"
          fit="contain"
          tone="chrome"
          itemWidth={0.72}
          sizes="72vw"
          className="mt-[16px]"
        />
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

  // The phone layout's Home title is the page's h1 at phone widths; the desktop
  // h1 (HomePane) is display:none there, so only one is ever exposed.
  const Heading = room === 'HOME' ? 'h1' : 'h2';

  return (
    <div className="animate-pane-in-sm px-[20px] py-[22px]">
      <p className={`font-mono text-[11px] uppercase tracking-[0.16em] ${room === 'HOME' ? 'text-chrome-link' : 'text-chrome-meta'}`}>{c.kicker}</p>
      <Heading className="mt-[12px] font-display text-[36px] font-bold leading-[0.96] tracking-[-0.03em] text-chrome-ink">
        {room === 'PROJECTS' ? (
            <Accent text={c.title} accent={c.accent} tone="chrome" />
          ) : (
            // Replays each time the room opens again.
            <TypeText text={c.title} accent={c.accent} tone="chrome" sweep={room === 'HOME'} replay />
          )}
      </Heading>
      <p className="mt-[14px] text-[15.5px] leading-[1.62] text-chrome-body">{c.copy}</p>

      {room === 'HOME' ? (
        // Two doors that name the visitor's intent, job seekers first.
        <div className="mt-[18px] flex flex-col gap-[10px]">
          <RoomLink
            href={HOME_DOORS.role.href}
            onGo={() => onRoom('CAREER')}
            target
            className="flex min-h-[52px] items-center justify-center bg-teal-600 text-[16px] font-semibold text-white"
          >
            {HOME_DOORS.role.label} <span aria-hidden="true" className="ml-2">→</span>
          </RoomLink>
          <RoomLink
            href={HOME_DOORS.build.href}
            onGo={() => onRoom('PROJECTS')}
            className="flex min-h-[52px] items-center justify-center border-[1.5px] border-[color:var(--btn2-border)] text-[16px] font-semibold text-chrome-link"
          >
            {HOME_DOORS.build.label}
          </RoomLink>
        </div>
      ) : null}

      <RoomReadMore page={page} className="mt-[14px] text-[15.5px]" />

      {/*
        Fifth-year gift box on the Home room only — TEMPORARY, gated on
        FLAGS.anniversary. Smaller than the desktop one and centred, so it reads
        as an invitation rather than competing with the headline at 375px.
      */}
      {room === 'HOME' && FLAGS.anniversary ? (
        <div className="mt-[22px] flex justify-center border border-chrome-line bg-chrome-plate py-[20px]">
          <GiftBox size={112} />
        </div>
      ) : null}

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
                {/* Every room's stats animate: numbers count up, words decode. */}
                <CountUp key={`${room}-${s.label}`} value={s.value} replay />
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
              className="hover-box flex min-h-tap items-center gap-[14px] bg-chrome-plate px-[14px] py-[14px] text-left"
            >
              {/* Product thumbnail. alt="" because the product name follows in the same button. */}
              <span className="block w-[92px] flex-none">
                <ImageSlot src={`/${p.asset}`} ratio="4/3" alt="" label={p.asset} sizes="92px" fit="contain" />
              </span>
              <span className="min-w-0 flex-1">
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
              </span>
            </button>
          ))}
        </div>
      ) : null}

      {room === 'CAREER' ? (
        // Every role opens its own description on the roles page.
        <ul className="mt-[22px] flex flex-col gap-px border border-chrome-line bg-chrome-line">
          {roles.map((role) => (
            <li key={role.slug}>
              <Link
                href={`/careers/open-positions/#${role.slug}`}
                className="flex min-h-[52px] items-center gap-[12px] bg-chrome-plate px-[14px] py-[10px]"
              >
                <span className="min-w-0 flex-1">
                  <span className="block text-[15px] leading-[1.35] text-chrome-ink">{role.title}</span>
                  <span className="mt-[3px] block font-mono text-[10.5px] uppercase tracking-[0.12em] text-chrome-meta">
                    {role.team}
                  </span>
                </span>
                <span aria-hidden="true" className="text-chrome-link">→</span>
              </Link>
            </li>
          ))}
        </ul>
      ) : null}

      {next ? <RoomNext {...next} className="mt-[26px] text-[18px]" /> : null}

      <RoomLegal className="mt-[26px] border-t border-chrome-line pt-[12px]" />
    </div>
  );
}
