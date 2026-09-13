import { Accent } from '@/components/ui/Accent';
import { ADDRESS_LINES, EMAIL, LINKEDIN, POLYAIRE } from '@/lib/site';
import {
  CONTACT_EYEBROW,
  CONTACT_HEADING,
  POLYAIRE_BODY,
  POLYAIRE_LABEL,
  POLYAIRE_YEARS,
} from './copy';

/**
 * The Contact room.
 *
 * The design's "we answer within a working day" is not rendered: no response
 * time has been confirmed, and it would be a service commitment on the
 * company's behalf.
 */
export function ContactPane() {
  return (
    <div className="grid h-full grid-rows-[1fr_auto]">
      <div className="grid min-h-0 grid-cols-1">
        <div className="flex flex-col justify-center overflow-y-auto px-[40px] py-[44px]">
        <p className="font-mono text-[12px] uppercase tracking-[0.16em] text-chrome-meta">
          {CONTACT_EYEBROW}
        </p>
        <h2 className="mt-[14px] font-display text-[60px] font-bold leading-none tracking-[-0.03em] text-chrome-ink">
          <Accent text={CONTACT_HEADING} accent="the team" tone="chrome" />
        </h2>

        <address className="mt-[22px] max-w-[56ch] text-[17px] not-italic leading-[1.7] text-chrome-body">
          {ADDRESS_LINES.join(' ')}
          <span className="mt-2 block">Every enquiry reaches {EMAIL}.</span>
        </address>

        <div className="mt-[26px] flex flex-wrap gap-[26px]">
          <a
            href={`mailto:${EMAIL}`}
            className="inline-flex min-h-tap items-center text-[17px] text-chrome-link underline [text-underline-offset:5px]"
          >
            {EMAIL}
          </a>
          <a
            href={LINKEDIN}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-tap items-center text-[17px] text-chrome-link underline [text-underline-offset:5px]"
          >
            LinkedIn <span aria-hidden="true" className="ml-1">↗</span>
          </a>
          </div>
        </div>

      </div>

      <div className="flex flex-none flex-wrap items-center gap-[36px] border-t border-chrome-line bg-chrome-plate px-[40px] py-[28px]">
        <p className="font-display text-[72px] font-bold leading-[0.82] tracking-[-0.04em] text-chrome-ink">
          {POLYAIRE_YEARS}
          <span className="text-chrome-link">+</span>
        </p>
        <div>
          <p className="font-mono text-[11.5px] uppercase tracking-[0.14em] text-chrome-meta">
            {POLYAIRE_LABEL}
          </p>
          <p className="mt-[10px] max-w-[52ch] leading-[1.7] text-chrome-body">{POLYAIRE_BODY}</p>
        </div>
        <a
          href={POLYAIRE}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto inline-flex min-h-tap items-center font-semibold text-chrome-link underline [text-underline-offset:5px]"
        >
          polyaire.com.au <span aria-hidden="true" className="ml-1">↗</span>
        </a>
      </div>
    </div>
  );
}
