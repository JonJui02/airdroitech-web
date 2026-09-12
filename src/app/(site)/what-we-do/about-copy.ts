/**
 * About page copy.
 *
 * Ported from the legacy WordPress page at /what-we-do/, which is unreachable
 * from the office network — it was read through a public reader proxy and the
 * wording preserved. docs/CONTENT-SKELETON.md marks "Our story" as "ports as
 * written", so it does, with only the fixes CLAUDE.md's voice rule calls for:
 * the brand spelling "AirdroiTech" (the legacy page writes "Airdroitech"),
 * "three decades" for "3 decades", and "Electrical Engineering" for the
 * legacy discipline line's "Electrical Engineer".
 *
 * CLAUDE.md says page content belongs in MDX under src/content/pages/. No MDX
 * page pipeline exists yet — only roles are loaded, via gray-matter — so this
 * is a typed module for now. Moving it is a mechanical change once that
 * pipeline is built.
 *
 * NOT ported, deliberately:
 *
 *   - The four leadership cards. The live page still shows a Founder described
 *     only as "The Mother of ADT", a second as "The Father of ADT", a
 *     "Software Engineering Manager" and an unnamed "Electronics Engineering
 *     Manager" — plus individual members under nicknames (Luffy, JZun). Those
 *     are the placeholders docs/OPEN-DECISIONS.md #1 exists to resolve, and
 *     CLAUDE.md forbids shipping them. The team group list below is real and
 *     ships in their place.
 *   - The headcount counter. The live page renders "34 0" from a broken
 *     counter widget; which number is the headcount is not determinable.
 *     OPEN-DECISIONS #2 covers it.
 *   - The old address. Superseded by the Tower 2A office in src/lib/site.ts.
 */

export const ABOUT_HERO = {
  eyebrow: 'Automation · AI · Data Analytics · Business Solutions · Electrical Engineering',
  title: 'About Us',
  established: 'Established 2021',
};

export const STORY = {
  label: 'Our story',
  body: 'AirdroiTech is the result of Polyaire’s many success stories. Being the market leader for more than three decades, Polyaire now extends its research and development arm into Malaysia. AirdroiTech joins the list of Polyaire’s collaborators.',
};

/**
 * The legacy page carries this as a single sentence holding three ideas.
 * CONTENT-SKELETON asks for it split; the sentence is kept above the split so
 * nothing is lost in the edit.
 */
export const APPROACH = {
  label: 'Our approach',
  heading: 'What do we do?',
  body: 'Working together with a team of exceptional engineers, AirdroiTech aims to play a part in developing talent in this fast-paced industry while continuously achieving and exceeding its goals in delivering exceptional solutions in smart homes and IoT to the world.',
  /*
   * Titles only. These are the three ideas already inside the sentence above,
   * pulled apart so the page is scannable — not new claims. Explanatory copy
   * under each would be invented company voice, which CLAUDE.md rules out, so
   * there is none until AirdroiTech writes it.
   */
  points: ['Developing talent', 'Smart home and IoT solutions', 'Continuous improvement'],
};

/** Real brand phrases from the legacy page. Kept verbatim. */
export const TEAM = {
  label: 'Our team',
  heading: 'We are the AirdroiTechies',
  line: 'We may not be many YET, but we get the work done!',
  groups: [
    'Engineers',
    'Mobile Developers',
    'Product Team',
    'QA & QT',
    'Accounts Team',
    'AirMate Team',
    'Human Resource',
  ],
};

/**
 * The legacy site states these as three words and nothing more. They are given
 * presence by typography rather than by a paragraph each — an invented gloss
 * on a company value is exactly the kind of copy CLAUDE.md says not to write.
 */
export const VALUES = ['Quality', 'Integrity', 'Kindness'];
