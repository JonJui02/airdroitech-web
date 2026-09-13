'use client';

import { useEffect, useState } from 'react';

/**
 * One-shot confetti burst. TEMPORARY, with the rest of src/components/anniversary.
 *
 * Purely decorative: aria-hidden, pointer-events none, and it unmounts itself
 * when the animation finishes so nothing lingers in the DOM or keeps a
 * compositor layer alive.
 *
 * Renders nothing at all under prefers-reduced-motion — confetti is exactly the
 * kind of ambient movement that setting exists to stop.
 *
 * Colours are the four brand values plus two approved derived shades, so the
 * burst cannot introduce a fifth hue.
 */

const COLORS = ['#A0D233', '#4F9934', '#2F7F59', '#8FBE2B', '#235E42', '#8E9093'] as const;

interface ConfettiProps {
  /** Number of pieces. Keep modest — each one is an animated element. */
  count?: number;
  /** Milliseconds before the component removes itself. */
  duration?: number;
  /** 'screen' covers the viewport; 'local' fills the nearest positioned parent. */
  scope?: 'screen' | 'local';
  /** Where the burst originates, as a percentage of the box. */
  originX?: number;
  originY?: number;
  className?: string;
}

interface Piece {
  x: number;
  y: number;
  rotate: number;
  delay: number;
  scale: number;
  color: string;
  round: boolean;
}

function makePieces(count: number): Piece[] {
  const pieces: Piece[] = [];

  for (let i = 0; i < count; i += 1) {
    // Spread the launch angles evenly, then jitter, so the burst reads as a
    // burst rather than a ring or a clump.
    const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.6;
    const distance = 90 + Math.random() * 190;

    pieces.push({
      x: Math.cos(angle) * distance,
      // Biased downward: the pieces fly out, then gravity wins.
      y: Math.sin(angle) * distance * 0.75 + 120 + Math.random() * 160,
      rotate: (Math.random() - 0.5) * 900,
      delay: Math.random() * 260,
      scale: 0.7 + Math.random() * 0.7,
      color: COLORS[i % COLORS.length] as string,
      round: i % 4 === 0,
    });
  }

  return pieces;
}

export function Confetti({
  count = 26,
  duration = 2200,
  scope = 'screen',
  originX = 50,
  originY = 42,
  className = '',
}: ConfettiProps) {
  const [pieces, setPieces] = useState<Piece[] | null>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    setPieces(makePieces(count));
    const t = window.setTimeout(() => setPieces(null), duration);
    return () => window.clearTimeout(t);
  }, [count, duration]);

  if (!pieces) return null;

  return (
    <div
      aria-hidden="true"
      className={`confetti pointer-events-none ${scope === 'screen' ? 'fixed inset-0 z-[130]' : 'absolute inset-0'} ${className}`}
    >
      {pieces.map((p, i) => (
        <span
          key={i}
          className={`confetti-piece${p.round ? ' is-round' : ''}`}
          style={
            {
              left: `${originX}%`,
              top: `${originY}%`,
              background: p.color,
              animationDelay: `${p.delay}ms`,
              '--cx': `${p.x}px`,
              '--cy': `${p.y}px`,
              '--cr': `${p.rotate}deg`,
              '--cs': p.scale,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
