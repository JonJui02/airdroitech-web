'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { OutboundLink } from '@/components/ui/OutboundLink';
import type { ProductPageCopy } from '@/app/(site)/projects/projects-copy';

/** The points play in once the scroll passes this share of the pinned travel… */
const SHOW_AT = 0.45;
/** …and fold away below this one; the gap stops them flickering at the edge. */
const HIDE_AT = 0.4;
/** The product starts at this scale and grows to full size. */
const REST_SCALE = 0.8;

const PRIMARY =
  'inline-flex min-h-[48px] items-center px-6 text-[15.5px] font-semibold bg-teal-600 text-white hover:bg-[color:var(--primary-hover)]';

function offsetWithin(node: HTMLElement, ancestor: HTMLElement) {
  let x = 0;
  let y = 0;
  for (let n: HTMLElement | null = node; n && n !== ancestor; n = n.offsetParent as HTMLElement | null) {
    x += n.offsetLeft;
    y += n.offsetTop;
  }
  return { x, y };
}

/**
 * The product page hero (design review, 2026-09-28): the product stands up
 * and enlarges, then six numbered points arrive around it with one button to
 * the official site — the whole page at a glance, with no further scrolling.
 *
 * Scene, driven by scroll progress p through the pinned stage:
 *   p 0 → 0.45  the title shrinks into the corner and the lede fades; the
 *               product stands up from a 22° tilt and grows from 80% to full
 *               size, into the space between the point columns.
 *   p ≥ 0.45    the points play in on their own, 80 ms apart (dot, leader
 *               line, label), then the button: about 0.8 s, no more scroll.
 *   p < 0.40    they fold away again.
 *
 * On wide screens (container 1100px+) the points sit three a side with
 * leader lines to their dots; narrower, they are a numbered list under the
 * product, keyed to numbered dots on it.
 *
 * APPROVED EXCEPTION to CLAUDE.md rule 3 (extends the 2026-09-24 ScrollStage
 * exception, user decision 2026-09-28). Safeguards — do not remove them:
 * - Everything is in the server HTML: title, image, every point and the link.
 * - The pin, the transforms and the hidden starting state are CSS scoped to
 *   html.tt-ready, prefers-reduced-motion: no-preference and min-height 560px,
 *   AND to [data-armed], which only this effect sets. No JavaScript, reduced
 *   motion or a short screen means the plain page with every point visible.
 * - Each tween is 200 ms or less; transform and opacity only.
 * - Keyboard focus inside the scene forces its finished state.
 */
export function ProductHero({ product }: { product: ProductPageCopy }) {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const q = <T extends Element>(sel: string) => stage.querySelector<T>(sel);
    const panel = q<HTMLElement>('.ps-panel');
    const title = q<HTMLElement>('.ps-title');
    const head = q<HTMLElement>('.ps-head');
    const board = q<HTMLElement>('.ps-board');
    const fig = q<HTMLElement>('.ps-fig');
    const svg = q<SVGSVGElement>('.ps-leaders');
    if (!panel || !title || !head || !board || !fig || !svg) return;

    const calm = window.matchMedia('(prefers-reduced-motion: reduce)');
    const tall = window.matchMedia('(min-height: 560px)');
    const animated = () =>
      document.documentElement.classList.contains('tt-ready') && !calm.matches && tall.matches;

    let frame = 0;
    let on = false;

    // JavaScript is alive: the CSS may now start the points hidden.
    stage.setAttribute('data-armed', '');

    const leaders = () => {
      if (getComputedStyle(svg).display === 'none' || !fig.offsetWidth) {
        svg.replaceChildren();
        return;
      }
      const f = offsetWithin(fig, board);
      svg.setAttribute('viewBox', `0 0 ${board.offsetWidth} ${board.offsetHeight}`);
      const ns = 'http://www.w3.org/2000/svg';
      const paths = Array.from(board.querySelectorAll<HTMLElement>('.ps-point')).map((li) => {
        const x = Number(li.dataset.x);
        const y = Number(li.dataset.y);
        const hx = f.x + (fig.offsetWidth * x) / 100;
        const hy = f.y + (fig.offsetHeight * y) / 100;
        const left = li.dataset.side === 'l';
        const lx = left ? li.offsetLeft + li.offsetWidth + 12 : li.offsetLeft - 12;
        const ly = li.offsetTop + 12;
        const kx = left ? lx + 28 : lx - 28;
        // Stop at the dot's edge so the line never crosses its numeral.
        const len = Math.hypot(hx - kx, hy - ly) || 1;
        const ex = hx - ((hx - kx) / len) * 13;
        const ey = hy - ((hy - ly) / len) * 13;
        const path = document.createElementNS(ns, 'path');
        path.setAttribute('d', `M${lx.toFixed(1)} ${ly.toFixed(1)} H${kx.toFixed(1)} L${ex.toFixed(1)} ${ey.toFixed(1)}`);
        path.setAttribute('style', `--i:${li.style.getPropertyValue('--i')}`);
        return path;
      });
      svg.replaceChildren(...paths);
      paths.forEach((p) => p.style.setProperty('--len', String(Math.ceil(p.getTotalLength()) + 2)));
    };

    // Where the resting product sits (just under the full-size title), and how
    // far the title shrinks to clear the board. Layout offsets ignore
    // transforms, so these read the same whatever the scroll position.
    const fit = () => {
      if (!animated()) {
        stage.style.removeProperty('--ty');
        stage.style.removeProperty('--dock-s');
        return;
      }
      const titleBottom = title.offsetTop + title.offsetHeight;
      const f = offsetWithin(fig, panel);
      const ty = Math.max(0, titleBottom + 20 - (f.y + ((1 - REST_SCALE) * fig.offsetHeight) / 2));
      stage.style.setProperty('--ty', `${ty.toFixed(1)}px`);
      const dock = (board.offsetTop - title.offsetTop - 10) / Math.max(1, head.offsetHeight);
      stage.style.setProperty('--dock-s', Math.min(0.6, Math.max(0.28, dock)).toFixed(3));
    };

    const measure = () => {
      frame = 0;
      if (!animated()) {
        stage.style.removeProperty('--t');
        return;
      }
      const rect = stage.getBoundingClientRect();
      const top = parseFloat(getComputedStyle(panel).top) || 0;
      const travel = Math.max(1, rect.height - (window.innerHeight - top));
      const p = (top - rect.top) / travel;
      stage.style.setProperty('--t', Math.min(1, Math.max(0, p / SHOW_AT)).toFixed(4));
      if (!on && p >= SHOW_AT) {
        on = true;
        stage.setAttribute('data-on', '');
      } else if (on && p < HIDE_AT) {
        on = false;
        stage.removeAttribute('data-on');
      }
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    const relayout = () => {
      fit();
      leaders();
      schedule();
    };

    relayout();
    // The leader lines need the image's real size; don't rely on the observer
    // alone to report it.
    const img = fig.querySelector('img');
    if (img && !img.complete) img.addEventListener('load', relayout, { once: true });
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', relayout);
    calm.addEventListener('change', relayout);
    tall.addEventListener('change', relayout);
    // Fonts and the hero image settle after hydration; re-fit once they do.
    const ro = new ResizeObserver(relayout);
    ro.observe(panel);
    ro.observe(fig);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      img?.removeEventListener('load', relayout);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', relayout);
      calm.removeEventListener('change', relayout);
      tall.removeEventListener('change', relayout);
      ro.disconnect();
    };
  }, []);

  const { name, kicker, lede, hero, points, official } = product;
  const rowOf = (j: number) => (points.slice(0, j).filter((p) => p.side === points[j]?.side).length % 3) + 1;

  return (
    <div ref={stageRef} className="ps-stage">
      <div className="ps-panel">
        <div className="ps-title">
          <div className="ps-head">
            <Eyebrow className="tracking-[0.16em] text-[color:var(--eyebrow)]">{kicker}</Eyebrow>
            <h1 className="mt-3 font-display text-[clamp(44px,7vw,96px)] font-bold leading-[0.92] tracking-[-0.04em] text-[color:var(--ink)]">
              <span className="hover-sweep">{name}</span>
            </h1>
          </div>
          <p className="ps-lede mt-4 max-w-[34ch] font-display text-[clamp(19px,2.2vw,30px)] font-bold leading-[1.24] tracking-[-0.02em] text-[color:var(--ink)]">
            {lede}
          </p>
        </div>

        <div className="ps-board">
          <div className="ps-figwrap">
            <div className="ps-fig">
              <Image
                src={hero.src}
                alt={hero.alt}
                width={hero.width}
                height={hero.height}
                sizes="(min-width: 1100px) 720px, 92vw"
                priority
                className="ps-img"
              />
              {points.map((p, j) => (
                <span
                  key={p.title}
                  aria-hidden="true"
                  className="ps-dot"
                  style={{ left: `${p.x}%`, top: `${p.y}%`, '--i': j } as CSSProperties}
                >
                  {j + 1}
                </span>
              ))}
            </div>
          </div>

          {/* role="list": list-style none drops list semantics in Safari. */}
          <ol role="list" aria-label={`${name} at a glance`} className="ps-points">
            {points.map((p, j) => (
              <li
                key={p.title}
                className="ps-point"
                data-side={p.side}
                data-row={rowOf(j)}
                data-x={p.x}
                data-y={p.y}
                style={{ '--i': j } as CSSProperties}
              >
                <span aria-hidden="true" className="ps-n">
                  {j + 1}
                </span>
                <span className="min-w-0">
                  <strong className="ps-pt-title">{p.title}</strong>
                  <span className="ps-pt-detail">{p.detail}</span>
                </span>
              </li>
            ))}
          </ol>

          <div className="ps-cta" style={{ '--i': points.length } as CSSProperties}>
            <OutboundLink href={official.main.href} site={official.main.site} className={PRIMARY}>
              Go to the official site
            </OutboundLink>
            <span className="ps-site font-mono text-[11px] uppercase tracking-[0.12em] text-[color:var(--muted)]">
              {official.main.site}
            </span>
          </div>

          <svg className="ps-leaders" aria-hidden="true" focusable="false" />
        </div>
      </div>
    </div>
  );
}
