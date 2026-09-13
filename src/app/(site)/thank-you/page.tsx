import type { Metadata } from 'next';
import { Button } from '@/components/ui/Button';
import { Accent } from '@/components/ui/Accent';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { EMAIL } from '@/lib/site';

/**
 * Route: /thank-you/  (URL kept from the legacy site's route list — do not rename)
 * Job:   Post-submit confirmation, so a submission has a shareable success URL.
 *
 * The legacy URL returns 404 today, so there is no copy to port and no ranking
 * to lose. There are no forms on the site yet (user decision, 2026-09-13), so
 * this page is reachable only directly — the copy therefore does not claim that
 * a message was received, which would be false for anyone who lands here.
 *
 * noindex: a confirmation page has no search value and should not surface in
 * results out of context.
 */
export const metadata: Metadata = {
  title: 'Thank you',
  alternates: { canonical: '/thank-you/' },
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <section className="gutter section-y">
      <Eyebrow className="tracking-[0.16em] text-[color:var(--muted)]">AirdroiTech</Eyebrow>
      <h1 className="mt-4 font-display text-[clamp(48px,8vw,104px)] font-bold leading-[0.9] tracking-[-0.04em] text-[color:var(--ink)]">
        <Accent text="Thank you" accent="you" />
      </h1>
      <p className="prose-measure mt-6 text-[clamp(17px,1.3vw,20px)] leading-[1.6] text-[color:var(--body)]">
        Thanks for getting in touch with AirdroiTech. Every enquiry reaches {EMAIL}.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button href="/projects/">See our projects</Button>
        <Button href="/careers/" variant="secondary">
          Work with us
        </Button>
      </div>
    </section>
  );
}
