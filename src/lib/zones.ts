/**
 * The illustrative zone set used by the homepage console.
 *
 * Lifted out of HeroConsole so the console's Home room and HeroConsole share
 * one definition rather than two copies of the same literals.
 *
 * These are an illustration of what per-zone climate control looks like — a
 * generic Australian home, matching AirTouch's market. They are not live data,
 * not a reading from any system, and not a claim about a specific install.
 * Anything rendered from them must be labelled so that stays obvious.
 */

export interface Zone {
  name: string;
  temp: string;
  state: string;
}

export const ZONES: Zone[] = [
  { name: 'Lounge', temp: '22', state: 'Cooling' },
  { name: 'Kitchen', temp: '24', state: 'Auto' },
  { name: 'Master', temp: '23', state: 'Cooling' },
  { name: 'Study', temp: '24', state: 'Idle' },
];

/** The zone the console starts on. */
export const DEFAULT_ZONE = 'Lounge';
