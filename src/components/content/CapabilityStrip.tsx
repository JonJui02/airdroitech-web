import { CAPABILITIES } from '@/lib/site';

/**
 * Section 5.2 — a single flex-wrap list on the hero's dark ground, joined by
 * lime `+` separators. Not cards.
 */
export function CapabilityStrip() {
  return (
    <div className="border-t border-chrome-line bg-chrome-ground gutter py-[clamp(18px,1.6vw,26px)]">
      <ul className="flex flex-wrap items-center gap-[clamp(12px,1.4vw,26px)] font-mono text-[clamp(12px,0.95vw,14px)] uppercase tracking-[0.1em] text-chrome-body">
        {CAPABILITIES.map((c, i) => (
          <li key={c} className="flex items-center gap-[clamp(12px,1.4vw,26px)]">
            {i > 0 && (
              <span aria-hidden="true" className="text-lime-500">
                +
              </span>
            )}
            {c}
          </li>
        ))}
      </ul>
    </div>
  );
}
