import type { Metadata } from 'next';
import { Eyebrow } from '@/components/ui/Eyebrow';
import {
  PRIVACY_DOCUMENT,
  PRIVACY_INTRO,
  PRIVACY_SECTIONS,
  type Block,
  type Part,
} from './privacy-copy';

/**
 * Route: /data-protection-and-privacy-policy/  (URL unchanged — do not rename)
 * Job:   PDPA compliance disclosure.
 * Copy:  ./privacy-copy.ts — LEGAL TEXT, VERBATIM. No wording changes here.
 *
 * Every section renders open, as real headings with in-page anchors, so the
 * policy is Ctrl+F findable and crawlable. No accordion, no hidden panels.
 *
 * No heading accent colours on this page, deliberately: an accent word on a
 * legal heading reads as marketing emphasis where none belongs (brand-guardian,
 * 2026-09-13).
 */
export const metadata: Metadata = {
  // The stub carried the literal string "Data &amp; Privacy", which rendered
  // the entity as text in the browser tab. A metadata string is not HTML.
  title: 'Data & Privacy',
  description:
    'How AirdroiTech collects, uses, discloses and protects personal information under Malaysia’s Personal Data Protection Act.',
  alternates: { canonical: '/data-protection-and-privacy-policy/' },
};

function Parts({ parts }: { parts: Part[] }) {
  return (
    <>
      {parts.map((part, i) =>
        typeof part === 'string' ? (
          part
        ) : (
          <a
            key={i}
            href={part.href}
            {...(part.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="break-words text-[color:var(--link)] underline [text-underline-offset:4px] hover:no-underline"
          >
            {part.label}
          </a>
        ),
      )}
    </>
  );
}

function PolicyBlock({ block }: { block: Block }) {
  if (block.type === 'ul') {
    return (
      <ul className="mt-3 list-disc space-y-1.5 pl-5 leading-[1.65] text-[color:var(--body)] marker:text-[color:var(--muted)]">
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }
  return (
    <p className="mt-3 leading-[1.7] text-[color:var(--body)]">
      <Parts parts={block.parts} />
    </p>
  );
}

export default function Page() {
  return (
    <>
      <section className="gutter section-y">
        <h1 className="font-display text-[clamp(44px,7vw,96px)] font-bold leading-[0.92] tracking-[-0.04em] text-[color:var(--ink)]">
          {PRIVACY_INTRO.title}
        </h1>
        <p className="mt-5 font-display text-[clamp(20px,2.4vw,30px)] font-bold tracking-[-0.02em] text-[color:var(--ink)]">
          {PRIVACY_INTRO.tagline}
        </p>
      </section>

      <section className="gutter band-y border-t border-[color:var(--line)]">
        <div className="grid gap-[clamp(20px,3vw,64px)] lg:grid-cols-[240px_1fr]">
          <nav aria-label="Policy contents" className="lg:sticky lg:top-[120px] lg:self-start">
            <Eyebrow className="tracking-[0.16em] text-[color:var(--muted)]">{PRIVACY_INTRO.label}</Eyebrow>
            <ul className="mt-4 space-y-1">
              {PRIVACY_SECTIONS.filter((s) => s.level === 2).map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="inline-flex min-h-tap items-center text-[14px] leading-[1.35] text-[color:var(--link)] underline-offset-4 hover:underline"
                  >
                    {s.heading}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="prose-measure">
            {PRIVACY_SECTIONS.map((s) =>
              s.level === 2 ? (
                <div key={s.id} className="mt-10 first:mt-0">
                  <h2
                    id={s.id}
                    className="scroll-mt-[120px] font-display text-[clamp(22px,2.2vw,30px)] font-bold leading-[1.15] tracking-[-0.02em] text-[color:var(--ink)]"
                  >
                    {s.heading}
                  </h2>
                  {s.blocks.map((b, i) => (
                    <PolicyBlock key={i} block={b} />
                  ))}
                </div>
              ) : (
                <div key={s.id} className="mt-6">
                  <h3
                    id={s.id}
                    className="scroll-mt-[120px] font-display text-[19px] font-bold leading-[1.25] tracking-[-0.01em] text-[color:var(--ink)]"
                  >
                    {s.heading}
                  </h3>
                  {s.blocks.map((b, i) => (
                    <PolicyBlock key={i} block={b} />
                  ))}
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="gutter band-y border-t border-[color:var(--line)] bg-[color:var(--tint)]">
        <h2 className="font-display text-[clamp(22px,2.2vw,30px)] font-bold tracking-[-0.02em] text-[color:var(--ink)]">
          {PRIVACY_DOCUMENT.heading}
        </h2>
        <p className="mt-4">
          <a
            href={PRIVACY_DOCUMENT.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-tap items-center font-semibold text-[color:var(--link)] underline [text-underline-offset:5px] hover:no-underline"
          >
            {PRIVACY_DOCUMENT.label} ↗<span className="sr-only"> (opens Google Drive in a new tab)</span>
          </a>
        </p>
      </section>
    </>
  );
}
