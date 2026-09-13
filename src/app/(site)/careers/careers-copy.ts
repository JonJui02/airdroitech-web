/**
 * Careers page copy.
 *
 * Ported from the legacy WordPress page at /careers/ (read through a reader
 * proxy on 2026-09-13 — the domain is unreachable from the office network).
 * Wording is preserved except for the fixes CLAUDE.md's voice rule allows,
 * noted where they apply. Brand phrase kept exactly: "Be an 'Airdroitechie'".
 *
 * NOT ported, deliberately:
 *   - The "34 AirdroiTechies" headcount counter. docs/OPEN-DECISIONS.md #2
 *     (actual headcount) is unresolved; a legacy counter value is not a
 *     confirmed figure.
 *   - The embedded LinkedIn jobs widget, which lists roles (e.g. Full Stack
 *     Engineer, Customer Engagement Executive) that are not among the eight
 *     role files. Roles come only from src/content/roles/.
 *   - The perks icons, which on the legacy site leak their raw icon names
 *     ("cookie", "laptop", "work", "people") as visible text.
 */

export const CAREERS_HERO = {
  // Legacy: "Developers, IOT, Business Solutions, and Engineering".
  eyebrow: 'Developers · IoT · Business Solutions · Engineering',
  title: 'Work with AirdroiTech',
  established: 'Established 2021',
};

/** Legacy "Perks & Benefits". "Company’s Insurance" is fixed to "Company insurance". */
export const PERKS = {
  label: 'Perks & benefits',
  items: ['Company insurance', 'Free snacks', 'Work computer', 'Remote work', 'Team collaboration'],
};

export const PROGRAMMES = {
  label: 'Our programmes',
  items: [
    {
      title: 'Internship',
      // Legacy: "Airdroitech intern programme’s goal is to cultivate the
      // innovative ideas of talents by giving them real-life work experience to
      // enhance their growth in designated roles."
      body: 'The AirdroiTech internship programme aims to cultivate the innovative ideas of new talent by giving them real-life work experience that helps them grow in their designated roles.',
    },
    {
      title: 'Engineering',
      // Legacy: "... Electrical Engineers for comprehensive project integration of hardwares."
      body: 'The AirdroiTech engineering team combines software and electronics engineers: full-stack, mobile and back-end developers alongside skilled electrical engineers for comprehensive hardware integration across projects.',
    },
    {
      title: 'Shared Services',
      // Legacy: "... works as the back-end of Polyaire’s finance and sales
      // department. which functions as accounts payable, accounts receivable,
      // inventory as well as sales support."
      body: 'The AirdroiTech shared services team works as the back office of Polyaire’s finance and sales departments, covering accounts payable, accounts receivable, inventory and sales support.',
    },
  ],
};

export const VALUES = {
  label: 'Our values',
  words: ['Quality', 'Integrity', 'Kindness'],
  // Legacy: "Are our core values" (read as a continuation of the heading).
  sub: 'Our core values',
  body: 'We march into the future with quality, integrity and kindness, and they will remain at the core of AirdroiTech. These values are the foundation of our success.',
};

/** Legacy "Our activities" — four tabs, shown here all at once (no hidden tabs). */
export const ACTIVITIES = {
  label: 'Life at AirdroiTech',
  items: [
    {
      tag: 'Switch Championship',
      title: 'Work smart, play hard.',
      body: 'Gear up for the ultimate showdown! Join the Switch Championship, hosted by AirdroiTech, and let your talent shine on the grand stage of innovation.',
    },
    {
      tag: 'Ranking',
      title: 'Ranking system',
      // Legacy: "avatar pseudonames".
      body: 'Dominate the Switch Championship with AirdroiTech! We rank our employees by their avatar pseudonyms. Play for fun… or competitively!',
    },
    {
      tag: 'Events',
      title: 'We’re Malaysians…',
      // Legacy: "On special occassion and holiday season, we gather up and share
      // the joy and fun off work to strengthen the bond of our fellow AirdroiTechies!"
      body: 'Of course we have lots of public holidays! On special occasions and in the holiday season, we gather to share the joy and fun away from work and strengthen the bond between fellow AirdroiTechies.',
    },
    {
      tag: 'Sports',
      title: 'Healthy life, healthy mind.',
      // Legacy: "... all while keeping our minds as sharp for programming debugging."
      body: 'We sometimes get away from work to break a sweat. Join us as we ditch the office for some fitness fun, sweating away stress and calories while keeping our minds sharp for debugging.',
    },
  ],
};

export const ROLES_TEASER = {
  label: 'Open positions',
  // Legacy, verbatim.
  body: 'Consider this open slot your VIP invitation to join our future ADT adventures! Send us your resume and let’s kickstart something amazing together. Who knows what exciting opportunities await? Get ready to make some magic happen!',
};
