'use client';

import { useEffect, useRef } from 'react';
import type { PointerEvent, ReactNode } from 'react';

interface TiltProps {
  children: ReactNode;
  className?: string;
  /** Maximum tilt in degrees at the image edge. */
  max?: number;
}

/**
 * 3D tilt: the wrapped image leans toward the cursor in perspective and
 * settles flat when the cursor leaves (user decision 2026-09-13).
 *
 * Mouse only — touch and pen get the flat image, since there is no hover to
 * follow. Off entirely under prefers-reduced-motion. The resting state is the
 * untransformed image, so nothing depends on this running.
 */
export function Tilt({ children, className = '', max = 7 }: TiltProps) {
  const ref = useRef<HTMLDivElement>(null);
  const enabled = useRef(false);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)');
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => {
      enabled.current = fine.matches && !calm.matches;
      if (!enabled.current && ref.current) ref.current.style.transform = '';
    };
    update();
    fine.addEventListener('change', update);
    calm.addEventListener('change', update);
    return () => {
      fine.removeEventListener('change', update);
      calm.removeEventListener('change', update);
    };
  }, []);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!enabled.current || e.pointerType !== 'mouse' || !el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transition = 'transform 90ms linear';
    el.style.transform = `perspective(900px) rotateX(${(-y * max * 2).toFixed(2)}deg) rotateY(${(x * max * 2).toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = 'transform 320ms cubic-bezier(0.22, 0.7, 0.2, 1)';
    el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`will-change-transform [transform-style:preserve-3d] ${className}`}
    >
      {children}
    </div>
  );
}
