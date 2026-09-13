import type { Metadata } from 'next';
import { Button } from '@/components/ui/Button';
import { Accent } from '@/components/ui/Accent';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { ImageSlot } from '@/components/ui/ImageSlot';
import { ADDRESS_LINES, EMAIL, LINKEDIN } from '@/lib/site';

/**
 * Route: /get-in-touch/  (URL unchanged from the legacy WordPress site — do not rename)
 * Job:   One route to a human, with the office findable.
 *
 * Copy ported from the legacy page (2026-09-13): the "Get in touch with
 * AirdroiTech!" heading, the Inquiries? / Questions? / Ideas? triplet and the
 * "Tell us!" call to action. The legacy address (Tower 9) is superseded by the
 * Tower 2A office in src/lib/site.ts.
 *
 * No enquiry form yet (user decision, 2026-09-13): "Tell us!" opens an email
 * to info@airdroitech.com until Resend is configured. Nothing on this page
 * collects personal data, so there is no PDPA consent to gather.
 *
 * NOT ported: the legacy "Sign up for News" checkbox — the newsletter provider
 * is undecided (docs/OPEN-DECISIONS.md #5), so it would capture nothing.
 *
 * The map is a link, not an embed: an iframe would load Google's payload on
 * every visit and raise docs/OPEN-DECISIONS.md #7 before it is answered.
 */
export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with AirdroiTech: email info@airdroitech.com, or visit the office at UOA Business Park, Shah Alam, Selangor.',
  alternates: { canonical: '/get-in-touch/' },
};

const MAILTO = `mailto:${EMAIL}?subject=${encodeURIComponent('Enquiry')}`;
const MAPS = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  ADDRESS_LINES.join(' '),
)}`;

export default function Page() {
  return (
    <>
      {/* ================= hero ================= */}
      <section className="gutter section-y">
        <div className="grid items-center gap-[clamp(24px,4vw,72px)] lg:grid-cols-[1fr_minmax(0,420px)]">
          <div>
            <Eyebrow className="tracking-[0.16em] text-[color:var(--muted)]">Get in touch</Eyebrow>
            <h1 className="mt-4 max-w-[14ch] font-display text-[clamp(44px,7vw,96px)] font-bold leading-[0.92] tracking-[-0.04em] text-[color:var(--ink)]">
              <Accent text="Get in touch with AirdroiTech!" accent="AirdroiTech" />
            </h1>
            <ul className="mt-7 flex flex-wrap gap-x-[clamp(14px,2.4vw,36px)] gap-y-2 font-display text-[clamp(24px,2.8vw,38px)] font-bold tracking-[-0.02em] text-[color:var(--ink)]">
              <li>Inquiries?</li>
              <li>Questions?</li>
              <li>Ideas?</li>
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={MAILTO}>Tell us!</Button>
              <Button href={LINKEDIN} variant="secondary">
                LinkedIn ↗
              </Button>
            </div>
          </div>

          <ImageSlot
            src="/illustration/adt-get-in-touch-3d.webp"
            ratio="1/1"
            alt="A hand holding a phone showing the AirdroiTech mark"
            label="illustration/adt-get-in-touch-3d.webp"
            sizes="(min-width: 1024px) 420px, 80vw"
            fit="contain"
            priority
          />
        </div>
      </section>

      {/* ================= direct contact ================= */}
      <section className="gutter band-y border-t border-[color:var(--line)]">
        <div className="grid gap-[clamp(20px,3vw,64px)] lg:grid-cols-[240px_1fr]">
          <Eyebrow className="tracking-[0.16em] text-[color:var(--eyebrow)]">Email</Eyebrow>
          <div>
            <a
              href={MAILTO}
              className="inline-flex min-h-tap items-center font-display text-[clamp(26px,3.4vw,46px)] font-bold tracking-[-0.02em] text-[color:var(--link)] underline [text-underline-offset:8px] hover:no-underline"
            >
              {EMAIL}
            </a>
            <p className="prose-measure mt-3 text-[color:var(--body)]">Every enquiry reaches this inbox.</p>
          </div>
        </div>
      </section>

      {/* ================= location ================= */}
      <section className="gutter band-y border-t border-[color:var(--line)]">
        <div className="grid gap-[clamp(20px,3vw,64px)] lg:grid-cols-[240px_1fr]">
          <Eyebrow className="tracking-[0.16em] text-[color:var(--eyebrow)]">Location</Eyebrow>
          <div className="grid items-center gap-[clamp(20px,3vw,56px)] md:grid-cols-[1fr_minmax(0,260px)]">
            <div>
              <address className="font-display text-[clamp(20px,2.2vw,30px)] font-bold not-italic leading-[1.35] tracking-[-0.01em] text-[color:var(--ink)]">
                {ADDRESS_LINES.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
              <p className="mt-6">
                <Button href={MAPS} variant="ghost">
                  Open in Google Maps ↗
                </Button>
              </p>
            </div>
            <ImageSlot
              src="/illustration/adt-located.webp"
              ratio="1/1"
              alt="A map pin carrying the AirdroiTech mark, marking the office location"
              label="illustration/adt-located.webp"
              sizes="260px"
              fit="contain"
            />
          </div>
        </div>
      </section>
    </>
  );
}
