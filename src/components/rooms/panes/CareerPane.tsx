import { InkButton } from '@/components/ui/Button';
import type { Role } from '@/lib/roles';
import { CAREER_ACTION, CAREER_BODY, CAREER_EYEBROW, CAREER_HEADING } from './copy';

/**
 * The Career room.
 *
 * Roles come from src/content/roles/*.mdx via getRoles(). Their `team` values
 * are real — Engineering and Shared Services — not the design's stand-in
 * labels (Mobile, Firmware, QA, Design, Product, CX, Ops, Finance), which do
 * not exist in the front-matter.
 *
 * The count is stated as a count, never as "open": every file is currently
 * `status: needs-confirmation`, and docs/OPEN-DECISIONS.md #4 lists whether
 * these roles are still open as an unresolved question. The link to
 * /careers/open-positions/ is where availability is stated.
 */
export function CareerPane({ roles }: { roles: Role[] }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex-none bg-lime-500 p-[40px]">
        <p className="font-mono text-[12px] uppercase tracking-[0.16em] text-onlime-eyebrow">
          {CAREER_EYEBROW}
        </p>
        <h2 className="mt-[14px] font-display text-[62px] font-bold leading-[0.92] tracking-[-0.035em] text-grey-900">
          {CAREER_HEADING}
        </h2>
        <p className="mt-[18px] max-w-[56ch] text-[17px] leading-[1.62] text-onlime-body">
          {CAREER_BODY}
        </p>
        <div className="mt-[24px]">
          <InkButton href="/careers/open-positions/">{CAREER_ACTION}</InkButton>
        </div>
      </div>

      <ul className="flex flex-1 flex-col gap-px overflow-y-auto border-t border-chrome-line bg-chrome-line">
        {roles.map((role, i) => (
          <li
            key={role.slug}
            className="flex min-h-[62px] flex-1 items-center gap-[18px] bg-chrome-ground px-[24px]"
          >
            <span className="font-mono text-[11.5px] tracking-[0.1em] text-chrome-meta">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="flex-1 text-[16px] text-chrome-ink">{role.title}</span>
            <span className="font-mono text-[11.5px] uppercase tracking-[0.12em] text-chrome-link">
              {role.team}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
