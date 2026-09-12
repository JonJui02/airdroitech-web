import { ImageSlot } from '@/components/ui/ImageSlot';
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
      <div className="grid min-h-0 grid-cols-1 lg:grid-cols-[1fr_minmax(0,320px)]">
        <div className="flex flex-col justify-center overflow-y-auto px-[40px] py-[44px]">
        <p className="font-mono text-[12px] uppercase tracking-[0.16em] text-lime-500">
          {CONTACT_EYEBROW}
        </p>
        <h2 className="mt-[14px] font-display text-[60px] font-bold leading-none tracking-[-0.03em] text-chrome-ink">
          {CONTACT_HEADING}
        </h2>

        <address className="mt-[22px] max-w-[56ch] text-[17px] not-italic leading-[1.7] text-chrome-body">
          {ADDRESS_LINES.join(' ')}
          <span className="mt-2 block">Every enquiry reaches {EMAIL}.</span>
        </address>

        <div className="mt-[26px] flex flex-wrap gap-[26px]">
          <a
            href={`mailto:${EMAIL}`}
            className="inline-flex min-h-tap items-center text-[17px] text-lime-500 underline [text-underline-offset:5px]"
          >
            {EMAIL}
          </a>
          <a
            href={LINKEDIN}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-tap items-center text-[17px] text-lime-500 underline [text-underline-offset:5px]"
          >
            LinkedIn <span aria-hidden="true" className="ml-1">↗</span>
          </a>
          </div>
        </div>

        {/*
          The two supplied brand illustrations. Both are matted on white, so
          each sits on its own white plate — the same treatment the product
          shots get.
        */}
        <div className="grid grid-rows-2 gap-px border-chrome-line bg-chrome-line max-lg:hidden lg:border-l">
          <div className="bg-chrome-plate p-[22px]">
            <ImageSlot
              src="/illustration/adt-get-in-touch-3d.jpg"
              ratio="1/1"
              alt="A hand holding a phone showing the AirdroiTech mark"
              label="illustration/adt-get-in-touch-3d.jpg"
              sizes="320px"
              fit="contain"
              padded
              className="h-full"
            />
          </div>
          <div className="bg-chrome-plate p-[22px]">
            <ImageSlot
              src="/illustration/adt-located.jpg"
              ratio="1/1"
              alt="A map pin carrying the AirdroiTech mark, marking the office location"
              label="illustration/adt-located.jpg"
              sizes="320px"
              fit="contain"
              padded
              className="h-full"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-none flex-wrap items-center gap-[36px] border-t border-chrome-line bg-grey-900 px-[40px] py-[28px]">
        <p className="font-display text-[72px] font-bold leading-[0.82] tracking-[-0.04em] text-white">
          {POLYAIRE_YEARS}
          <span className="text-lime-500">+</span>
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
          className="ml-auto inline-flex min-h-tap items-center font-semibold text-lime-500 underline [text-underline-offset:5px]"
        >
          polyaire.com.au <span aria-hidden="true" className="ml-1">↗</span>
        </a>
      </div>
    </div>
  );
}
