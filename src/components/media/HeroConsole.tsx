/**
 * The hero visual — a zone-control surface drawn in markup, not photographed.
 *
 * Replaces the hero photograph. Three reasons it is built rather than shot:
 *
 * 1. It weighs nothing. There is no hero image to download, so the LCP element
 *    becomes text the server already sent. The 6,098 KB legacy homepage was
 *    dominated by hero media; this contributes 0 KB of transfer.
 * 2. It is sharp at every size. The supplied hero photo was 740x415 and would
 *    have upscaled roughly 2x on a 1440 display.
 * 3. It says what the company does. AirTouch is per-zone climate control — so
 *    the hero shows zones being controlled, rather than a bench.
 *
 * It is an illustration of the product category, not a screenshot of a running
 * system and not a claim about live data. Marked up as a single labelled image
 * so assistive tech gets one honest description instead of a pile of orphan
 * numbers.
 *
 * Palette is the locked four plus the chrome tokens. No animation: resting
 * state is the final state (CLAUDE.md non-negotiable #3).
 */

import { ZONES, DEFAULT_ZONE } from '@/lib/zones';

const ACTIVE = DEFAULT_ZONE;

/** A day's zone load, normalised 0-1. Shape only — not measured data. */
const CURVE = [
  0.22, 0.3, 0.26, 0.38, 0.52, 0.47, 0.61, 0.78, 0.7, 0.84, 0.93, 0.86, 0.72, 0.63, 0.68, 0.55,
  0.44, 0.5, 0.38, 0.3,
];

const W = 560;
const H = 96;

function curvePath(points: number[], close: boolean) {
  const step = W / (points.length - 1);
  const line = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${(i * step).toFixed(1)} ${((1 - p) * H).toFixed(1)}`)
    .join(' ');
  return close ? `${line} L ${W} ${H} L 0 ${H} Z` : line;
}

export function HeroConsole() {
  // The slot is full-bleed to the right edge, so only the left corners and edge
  // are ever visible — rounding all four clips two of them off-screen.
  return (
    <div
      role="img"
      aria-label="Illustration of a zone climate control interface: four rooms, each with its own set temperature and mode, above a chart of conditioning load across a day."
      className="overflow-hidden rounded-l-[14px] border-y border-l border-chrome-line bg-chrome-plate"
    >
      {/* Title bar */}
      <div className="flex items-center gap-3 border-b border-chrome-line px-[clamp(14px,1.6vw,22px)] py-[clamp(10px,1.1vw,14px)]">
        <span className="h-2 w-2 shrink-0 rounded-full bg-chrome-state" />
        <p className="font-mono text-[clamp(10px,0.8vw,11.5px)] uppercase tracking-[0.16em] text-chrome-meta">
          Zone control
        </p>
        <p className="ml-auto hidden font-mono text-[clamp(10px,0.8vw,11.5px)] uppercase tracking-[0.16em] text-chrome-meta sm:block">
          4 zones · 1 system
        </p>
      </div>

      {/* Zone tiles */}
      <div className="grid grid-cols-2 gap-px bg-chrome-line lg:grid-cols-4">
        {ZONES.map((z) => (
          <div
            key={z.name}
            className={`px-[clamp(14px,1.6vw,22px)] py-[clamp(14px,1.8vw,26px)] ${
              (z.name === ACTIVE) ? 'bg-teal-600' : 'bg-chrome-plate'
            }`}
          >
            <p
              className={`font-mono text-[clamp(10px,0.8vw,11.5px)] uppercase tracking-[0.14em] ${
                (z.name === ACTIVE) ? 'text-white' : 'text-chrome-meta'
              }`}
            >
              {z.name}
            </p>
            <p className="mt-2 font-display text-[clamp(30px,3.6vw,52px)] font-bold leading-none tracking-[-0.03em] text-chrome-ink">
              {z.temp}
              <span className="align-super text-[0.42em]">°</span>
            </p>
            <p
              className={`mt-2 font-mono text-[clamp(10px,0.8vw,11.5px)] uppercase tracking-[0.1em] ${
                (z.name === ACTIVE) ? 'text-white' : 'text-chrome-meta'
              }`}
            >
              {z.state}
            </p>
          </div>
        ))}
      </div>

      {/* Load curve */}
      <div className="border-t border-chrome-line px-[clamp(14px,1.6vw,22px)] pb-[clamp(12px,1.4vw,18px)] pt-[clamp(14px,1.6vw,20px)]">
        <div className="flex items-baseline justify-between">
          <p className="font-mono text-[clamp(10px,0.8vw,11.5px)] uppercase tracking-[0.16em] text-chrome-meta">
            Conditioning load
          </p>
          <p className="font-mono text-[clamp(10px,0.8vw,11.5px)] uppercase tracking-[0.16em] text-chrome-meta">
            24 h
          </p>
        </div>

        <svg
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="none"
          aria-hidden="true"
          focusable="false"
          className="mt-3 block h-[clamp(56px,7vw,96px)] w-full"
        >
          <defs>
            <linearGradient id="hero-load-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4F9934" stopOpacity="0.38" />
              <stop offset="100%" stopColor="#4F9934" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="hero-load-line" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#2F7F59" />
              <stop offset="55%" stopColor="#4F9934" />
              <stop offset="100%" stopColor="#A0D233" />
            </linearGradient>
          </defs>
          <path d={curvePath(CURVE, true)} fill="url(#hero-load-fill)" />
          <path
            d={curvePath(CURVE, false)}
            fill="none"
            stroke="url(#hero-load-line)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
    </div>
  );
}
