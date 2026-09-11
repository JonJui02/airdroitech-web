interface StatPlateProps {
  figure: string;
  label: string;
  /** Shown under the label when the figure has not been supplied. */
  note?: string;
  /** `real` = a confirmed figure. `blocked` = awaiting data, dashed plate. */
  state: 'real' | 'blocked';
}

/**
 * Section 5.6 — a top-bordered plate. Not a card: one hairline at the top,
 * no fill, no shadow.
 */
export function StatPlate({ figure, label, note, state }: StatPlateProps) {
  const real = state === 'real';

  return (
    <div
      className={
        real
          ? 'border-t-2 border-t-[color:var(--primary)] pt-5'
          : 'border-t-2 border-dashed border-t-[color:var(--line-strong)] pt-5'
      }
    >
      <p
        className={
          'font-display text-[clamp(52px,6vw,92px)] font-bold leading-[0.88] tracking-[-0.035em] ' +
          (real ? 'text-[color:var(--ink)]' : 'text-[color:var(--line-strong)]')
        }
      >
        {figure}
      </p>
      <p className="mt-3 font-mono text-[12px] uppercase tracking-[0.14em] text-[color:var(--muted)]">
        {label}
      </p>
      {note && <p className="mt-1 text-[13.5px] text-[color:var(--muted)]">{note}</p>}
    </div>
  );
}
