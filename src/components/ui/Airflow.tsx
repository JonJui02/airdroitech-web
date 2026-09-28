'use client';

import { useEffect, useRef, useState } from 'react';

type Variant = 'desk' | 'phone';

interface AirflowProps {
  /** `desk`: the flow leaves the dial sideways. `phone`: it rises from the docked half-dial. */
  variant: Variant;
  /** Changes whenever the target may have moved (the room index). */
  watch: unknown;
}

interface Line {
  /** Position across the fan, -1..1. */
  u: number;
  phase: number;
  alpha: number;
  amp: number;
}

interface Pulse {
  line: Line;
  born: number;
  hit: boolean;
}

/** Pulse speed, as a fraction of the flow's length per second. */
const SPEED = 0.3;
/** Seconds between pulses. */
const SPAWN = 1.15;
/** Frame cap: 30 fps is plenty for slow air and halves the work. */
const FRAME_MS = 33;

/**
 * Airflow — the homepage background (design review, 2026-09-28; approved
 * exception to CLAUDE.md rule 3, recorded there).
 *
 * AirdroiTech is the R&D arm of an air-conditioning group, so the lines are
 * air: thin streamlines leave the dial the way air leaves a vent and fan out
 * across the room. Every second or so a pulse of light runs along the central
 * streamlines and arrives at the room's next step ([data-flow-target]), which
 * answers with a faint ring. Turn the dial and the flow turns with it. The
 * movement is the direction cue.
 *
 * Safeguards — do not remove them:
 * - Decorative only: aria-hidden, pointer-events none, nothing depends on it.
 * - Without JavaScript a static SVG of the same streamlines is in the server
 *   HTML. Under reduced motion the canvas draws one still frame, aimed at the
 *   current step, and never animates (the glow drift is scoped to tt-ready).
 * - Capped at 30 fps and 2x pixel density; paused when the tab is hidden or
 *   the canvas is off screen (the other layout's copy has no size and never
 *   runs); drops to a still frame if drawing runs slow.
 * - Colour: teal and green tokens only (--flow-*), never lime.
 */
export function Airflow({ variant, watch }: AirflowProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const aimRef = useRef<() => void>(() => {});
  const [live, setLive] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = canvas?.parentElement;
    const scope = wrap?.parentElement;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !wrap || !scope || !ctx) return;

    const phone = variant === 'phone';
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)');
    const n = phone ? 16 : 22;
    const lines: Line[] = Array.from({ length: n }, (_, i) => ({
      u: -1 + (2 * i) / (n - 1),
      phase: Math.random() * Math.PI * 2,
      alpha: 0.5 + Math.random() * 0.5,
      amp: 9 + Math.random() * 11,
    }));

    let W = 0;
    let H = 0;
    let L = 1;
    let spread = 1;
    let dir: number | null = null;
    let goal = 0;
    let sT = 0.6;
    let pulses: Pulse[] = [];
    let lastSpawn = 0;
    let raf = 0;
    let lastFrame = 0;
    let running = false;
    let visible = true;
    let still = calm.matches;
    let slowFrames = 0;
    let frames = 0;
    let col = { line: '47, 127, 89', a: 0.16, pulse: '47, 127, 89' };

    const readColours = () => {
      const cs = getComputedStyle(wrap);
      col = {
        line: cs.getPropertyValue('--flow-rgb').trim() || col.line,
        a: parseFloat(cs.getPropertyValue('--flow-a')) || col.a,
        pulse: cs.getPropertyValue('--pulse-rgb').trim() || col.pulse,
      };
    };

    const centre = (el: Element) => {
      const r = el.getBoundingClientRect();
      if (!r.width) return null;
      const b = wrap.getBoundingClientRect();
      return { x: r.left - b.left + r.width / 2, y: r.top - b.top + r.height / 2 };
    };
    // The first element of its kind with a size: hidden rooms are display:none.
    const find = (sel: string) =>
      Array.from(scope.querySelectorAll(sel)).find((el) => el.getBoundingClientRect().width > 0);

    const source = () => {
      const el = find('[data-flow-source]');
      return el ? centre(el) : null;
    };
    const target = () => {
      const el = find('[data-flow-target]');
      const p = el ? centre(el) : null;
      if (!p) return phone ? { x: W / 2, y: H * 0.35 } : null;
      // On phones the step may be scrolled out of view; aim at the nearest edge.
      return phone ? { x: p.x, y: Math.min(H * 0.8, Math.max(90, p.y)) } : p;
    };

    const size = () => {
      W = wrap.clientWidth;
      H = wrap.clientHeight;
      if (!W || !H) return false;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      L = Math.hypot(W, H) * (phone ? 1 : 1.05);
      spread = phone ? W * 0.9 : W * 0.42;
      return true;
    };

    const at = (ln: Line, s: number, t: number, S: { x: number; y: number }, d: number[], nrm: number[]) => {
      const x = s * L;
      const y =
        ln.u * spread * (0.05 + Math.pow(s, 0.85)) +
        ln.amp * Math.sin(s * 7.5 - t * 0.9 + ln.phase) * Math.min(1, s * 3);
      return [S.x + (d[0] ?? 0) * x + (nrm[0] ?? 0) * y, S.y + (d[1] ?? 0) * x + (nrm[1] ?? 0) * y] as const;
    };

    const ping = () => {
      const el = find('[data-flow-target]');
      if (!el) return;
      el.classList.remove('flow-ping');
      void (el as HTMLElement).offsetWidth;
      el.classList.add('flow-ping');
    };

    const draw = (t: number) => {
      const S = source();
      if (!S || dir === null) return;
      dir += Math.atan2(Math.sin(goal - dir), Math.cos(goal - dir)) * (still ? 1 : 0.07);
      const d = [Math.cos(dir), Math.sin(dir)];
      const nrm = [-(d[1] ?? 0), d[0] ?? 0];
      ctx.clearRect(0, 0, W, H);

      const ex = S.x + (d[0] ?? 0) * L;
      const ey = S.y + (d[1] ?? 0) * L;
      const g = ctx.createLinearGradient(S.x, S.y, ex, ey);
      g.addColorStop(0, `rgba(${col.line}, 0)`);
      g.addColorStop(0.07, `rgba(${col.line}, ${col.a})`);
      g.addColorStop(0.6, `rgba(${col.line}, ${col.a * 0.7})`);
      g.addColorStop(1, `rgba(${col.line}, 0)`);
      ctx.strokeStyle = g;
      ctx.lineWidth = 1;
      ctx.lineCap = 'round';
      for (const ln of lines) {
        ctx.globalAlpha = ln.alpha;
        ctx.beginPath();
        for (let k = 0; k <= 40; k++) {
          const [x, y] = at(ln, k / 40, t, S, d, nrm);
          if (k) ctx.lineTo(x, y);
          else ctx.moveTo(x, y);
        }
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      if (still) return;

      if (t - lastSpawn > SPAWN) {
        lastSpawn = t;
        const pool = lines.filter((l) => Math.abs(l.u) < 0.35);
        const line = pool[Math.floor(Math.random() * pool.length)];
        if (line) pulses.push({ line, born: t, hit: false });
      }
      pulses = pulses.filter((p) => t >= p.born && (t - p.born) * SPEED < 1.12);
      for (const p of pulses) {
        const head = (t - p.born) * SPEED;
        const tail = head - 0.075;
        ctx.beginPath();
        let first = true;
        for (let k = 0; k <= 12; k++) {
          const s = tail + ((head - tail) * k) / 12;
          if (s < 0) continue;
          const [x, y] = at(p.line, s, t, S, d, nrm);
          if (first) {
            ctx.moveTo(x, y);
            first = false;
          } else ctx.lineTo(x, y);
        }
        const fade = head > sT ? Math.max(0, 1 - (head - sT) / 0.18) : 1;
        ctx.strokeStyle = `rgba(${col.pulse}, ${0.9 * fade})`;
        ctx.lineWidth = 2.2;
        ctx.shadowColor = `rgba(${col.pulse}, 0.55)`;
        ctx.shadowBlur = 9;
        ctx.stroke();
        ctx.shadowBlur = 0;
        if (!p.hit && head >= sT && Math.abs(p.line.u) < 0.16) {
          p.hit = true;
          ping();
        }
      }
    };

    const aim = () => {
      const S = source();
      const T = target();
      if (!S || !T) return;
      goal = Math.atan2(T.y - S.y, T.x - S.x);
      sT = Math.hypot(T.x - S.x, T.y - S.y) / L;
      if (dir === null || still) dir = goal;
      if (still || !running) draw(4);
    };
    aimRef.current = aim;

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (now - lastFrame < FRAME_MS) return;
      lastFrame = now;
      const t0 = performance.now();
      if (++frames % 45 === 0) readColours();
      draw(now / 1000);
      // A device that cannot keep up gets the still frame instead.
      if (performance.now() - t0 > 14) slowFrames++;
      if (frames === 90 && slowFrames > 30) {
        still = true;
        stop();
        draw(4);
      }
    };

    function start() {
      if (running || still || !visible || document.hidden) return;
      running = true;
      pulses = [];
      lastSpawn = 0;
      raf = requestAnimationFrame(loop);
    }
    function stop() {
      running = false;
      cancelAnimationFrame(raf);
    }

    const refresh = () => {
      if (!size()) return;
      readColours();
      aim();
      draw(4);
      setLive(true);
      start();
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = !!entry?.isIntersecting;
      if (visible) refresh();
      else stop();
    });
    io.observe(wrap);
    const ro = new ResizeObserver(() => {
      if (size()) {
        aim();
        draw(4);
      }
    });
    ro.observe(wrap);
    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener('visibilitychange', onVisibility);
    const onCalm = () => {
      still = calm.matches;
      if (still) stop();
      refresh();
    };
    calm.addEventListener('change', onCalm);
    const onTheme = () => {
      readColours();
      if (!running) draw(4);
    };
    const dark = window.matchMedia('(prefers-color-scheme: dark)');
    dark.addEventListener('change', onTheme);
    const mo = new MutationObserver(onTheme);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      mo.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      calm.removeEventListener('change', onCalm);
      dark.removeEventListener('change', onTheme);
    };
  }, [variant]);

  // Re-aim when the room changes, and again once the new room has settled in.
  useEffect(() => {
    aimRef.current();
    const t = window.setTimeout(() => aimRef.current(), 360);
    return () => window.clearTimeout(t);
  }, [watch]);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div className="flow-glow absolute inset-[-12%]" data-variant={variant} />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      {live ? null : <StaticFlow variant={variant} />}
    </div>
  );
}

/** The same streamlines, drawn once, for visitors without JavaScript. */
function StaticFlow({ variant }: { variant: Variant }) {
  const us = [-1, -0.75, -0.5, -0.3, -0.12, 0, 0.12, 0.3, 0.5, 0.75, 1];
  const style = { stroke: 'rgb(var(--flow-rgb))', strokeOpacity: 'var(--flow-a)' };
  if (variant === 'phone') {
    return (
      <svg viewBox="0 0 375 700" preserveAspectRatio="xMidYMax slice" className="absolute inset-0 h-full w-full" focusable="false">
        {us.map((u) => (
          <path
            key={u}
            d={`M187.5 720 C${187.5 + u * 24} 520 ${187.5 + u * 130} 300 ${187.5 + u * 280} 0`}
            fill="none"
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
            style={style}
          />
        ))}
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 1440 800" preserveAspectRatio="xMinYMid slice" className="absolute inset-0 h-full w-full" focusable="false">
      {us.map((u) => (
        <path
          key={u}
          d={`M200 400 C600 ${400 + u * 50} 900 ${400 + u * 260} 1440 ${400 + u * 430}`}
          fill="none"
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
          style={style}
        />
      ))}
    </svg>
  );
}
