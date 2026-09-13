/**
 * The five rooms of the homepage console.
 *
 * Server-safe on purpose — no 'use client'. RoomShell imports it, but so can a
 * server component that needs the labels for metadata or a static list.
 *
 * Note this is deliberately NOT derived from `NAV` in src/lib/site.ts. NAV has
 * four items (About, Projects, Career, Privacy) and drives the site header on
 * every other route; the console has five rooms and includes Home and Contact.
 * Forcing one onto the other would break both.
 */

export type RoomKey = 'HOME' | 'ABOUT' | 'PROJECTS' | 'CAREER' | 'CONTACT';

export interface Room {
  key: RoomKey;
  label: string;
  /** Second line in the header cell. Facts only — see substateFor(). */
  sub: string;
  /**
   * The standalone page this room previews.
   *
   * Rooms are summaries; the pages under (site)/ carry the substance. Without
   * this link the console and the footer both said "About" and meant different
   * things — one swapped a panel in place, the other left for /what-we-do/.
   * "Read more" makes the relationship visible.
   *
   * Set ONLY for pages that are built — never point a room at a scaffold stub.
   */
  page?: { href: string; label: string };
}

/**
 * Builds the room list with counts derived from repo data at render time.
 *
 * Every sub-state is a fact the repo can prove:
 *   Projects -> PRODUCTS.length
 *   Career   -> the number of role files
 *   Contact  -> the city from ADDRESS_LINES
 *
 * The design's "8 open" is deliberately not used: all eight role files are
 * `status: needs-confirmation`, and docs/OPEN-DECISIONS.md #4 lists whether
 * they are still open as unresolved. "8 roles" states the count without
 * asserting availability.
 */
export function buildRooms(counts: { products: number; roles: number }): Room[] {
  return [
    { key: 'HOME', label: 'Home', sub: 'Overview' },
    {
      key: 'ABOUT',
      label: 'About',
      sub: 'Company',
      page: { href: '/what-we-do/', label: 'Read more about us' },
    },
    {
      key: 'PROJECTS',
      label: 'Projects',
      sub: `${counts.products} devices`,
      page: { href: '/projects/', label: 'All projects' },
    },
    {
      key: 'CAREER',
      label: 'Career',
      sub: `${counts.roles} roles`,
      page: { href: '/careers/', label: 'Life at AirdroiTech' },
    },
    {
      key: 'CONTACT',
      label: 'Contact',
      sub: 'Shah Alam',
      page: { href: '/get-in-touch/', label: 'All contact details' },
    },
  ];
}

/** `0{n} / 05` — the readout format used by the dial, dock and mobile header. */
export function readout(index: number, total: number): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(index + 1)} / ${pad(total)}`;
}

export const wrapIndex = (i: number, total: number) => ((i % total) + total) % total;

/**
 * Checked array access.
 *
 * `noUncheckedIndexedAccess` is on, so `rooms[index]` is `Room | undefined`
 * even where the index provably cannot escape the array. This narrows it once,
 * loudly, instead of sprinkling non-null assertions at every call site.
 */
export function at<T>(items: readonly T[], index: number): T {
  const item = items[index];
  if (item === undefined) {
    throw new RangeError(`index ${index} is outside 0..${items.length - 1}`);
  }
  return item;
}
