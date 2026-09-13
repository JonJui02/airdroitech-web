'use client';

import { openAnniversary } from './anniversary-bus';

/**
 * The fifth-year gift box — the invitation to open the anniversary dialog.
 *
 * TEMPORARY, and gated on FLAGS.anniversary by its callers. Drawn as inline
 * isometric SVG rather than a bitmap: it stays crisp at any size, costs no
 * extra request, and is built only from approved brand hexes.
 *
 * On the ribbon colour: the reference image used a gold ribbon. Gold is a fifth
 * hue and scripts/brand-check.mjs fails the build on it, so the ribbon is lime
 * (#A0D233) — the brand's accent, and a stronger separation against the greens
 * than gold would give (about 3:1 against the lid).
 *
 * It is a real <button> with a real accessible name, so it is reachable and
 * operable from the keyboard like any other control.
 */

interface GiftBoxProps {
  /** Rendered size in px. The SVG scales; the caption tracks it. */
  size?: number;
  /** Caption under the box. Pass null for the box alone. */
  caption?: string | null;
  className?: string;
}

export function GiftBox({
  size = 132,
  caption = 'A gift for AirdroiTechies',
  className = '',
}: GiftBoxProps) {
  return (
    <button
      type="button"
      onClick={openAnniversary}
      aria-label="Open the fifth-year surprise"
      className={`gift group flex flex-col items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--focus)] ${className}`}
    >
      <span className="gift-stage relative block" style={{ width: size, height: size }}>
        {/* Soft lime halo, purely decorative. */}
        <span aria-hidden="true" className="gift-glow absolute inset-0 block" />

        <svg
          viewBox="0 0 140 140"
          width={size}
          height={size}
          className="gift-svg relative block"
          aria-hidden="true"
          focusable="false"
        >
          {/* ---------- box body ---------- */}
          <polygon points="24,74 70,98 70,130 24,106" fill="#2F7F59" />
          <polygon points="70,98 116,74 116,106 70,130" fill="#235E42" />

          {/* ribbon down each body face */}
          <polygon points="42.6,83.7 51.4,88.3 51.4,120.3 42.6,115.7" fill="#A0D233" />
          <polygon points="88.6,88.3 97.4,83.7 97.4,115.7 88.6,120.3" fill="#8FBE2B" />

          {/* ---------- lid (lifts on hover / focus) ---------- */}
          <g className="gift-lid">
            <polygon points="70,40 122,68 70,96 18,68" fill="#3C7628" />
            <polygon points="18,68 70,96 70,110 18,82" fill="#2C5A1D" />
            <polygon points="70,96 122,68 122,82 70,110" fill="#235E42" />

            {/* ribbon cross on the lid */}
            <polygon points="39.6,56.4 91.6,84.4 100.4,79.6 48.4,51.6" fill="#A0D233" />
            <polygon points="100.4,56.4 48.4,84.4 39.6,79.6 91.6,51.6" fill="#A0D233" />

            {/* ribbon down the lid rims */}
            <polygon points="39.6,77.9 48.4,82.3 48.4,96.3 39.6,91.9" fill="#8FBE2B" />
            <polygon points="91.6,82.3 100.4,77.9 100.4,91.9 91.6,96.3" fill="#8FBE2B" />

            {/* ---------- bow ---------- */}
            <g className="gift-bow">
              <ellipse cx="55" cy="47" rx="15" ry="9" transform="rotate(-24 55 47)" fill="#A0D233" />
              <ellipse cx="85" cy="47" rx="15" ry="9" transform="rotate(24 85 47)" fill="#A0D233" />
              <ellipse cx="55" cy="47" rx="7" ry="4" transform="rotate(-24 55 47)" fill="#8FBE2B" />
              <ellipse cx="85" cy="47" rx="7" ry="4" transform="rotate(24 85 47)" fill="#8FBE2B" />
              {/* tails */}
              <polygon points="66,54 72,57 64,70 59,65" fill="#8FBE2B" />
              <polygon points="74,54 68,57 76,70 81,65" fill="#8FBE2B" />
              {/* knot */}
              <ellipse cx="70" cy="52" rx="8" ry="6" fill="#A0D233" />
            </g>
          </g>
        </svg>
      </span>

      {caption !== null && (
        <span className="flex flex-col items-center gap-1">
          <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-chrome-meta">
            {caption}
          </span>
          <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-chrome-link underline decoration-from-font underline-offset-4">
            Open it
          </span>
        </span>
      )}
    </button>
  );
}
