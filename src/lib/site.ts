/**
 * Shared site data — nav, products, address. Used by the header, mobile drawer,
 * footer, mega panel and the homepage projects section, so the same strings
 * cannot drift between them.
 */

export interface NavItem {
  label: string;
  href: string;
  /** True for the item that opens the mega panel at 1440. */
  hasPanel?: boolean;
}

export const NAV: readonly NavItem[] = [
  { label: 'About', href: '/what-we-do/' },
  { label: 'Projects', href: '/projects/', hasPanel: true },
  { label: 'Career', href: '/careers/' },
  { label: 'Privacy', href: '/data-protection-and-privacy-policy/' },
];

export const PRODUCTS = [
  {
    name: 'AirTouch',
    href: '/projects/airtouch/',
    descriptor: 'Smart home climate control',
    tag: 'CLIMATE',
    asset: 'projects/airtouch.webp',
  },
  {
    name: 'AirTouch Beam',
    href: '/projects/airtouch-beam/',
    descriptor: "Your AC's smart companion",
    tag: 'MATTER',
    asset: 'projects/airtouch-beam.webp',
  },
  {
    name: 'PolyPlan',
    href: '/projects/polyplan/',
    descriptor: 'CAD software for HVAC professionals',
    tag: 'CAD',
    // The laptop shot is the one Polyaire's own PolyPlan page uses, and it ships
    // with real transparency — no matte cut needed.
    asset: 'projects/laptop-polyplan.webp',
  },
] as const;

export const CAPABILITIES = [
  'Firmware & Embedded',
  'Mobile Apps (iOS/Android)',
  'Cloud & Backend',
  'Web Platforms',
  'Electronics & Hardware',
  'QA & Test',
] as const;

/**
 * The reconciled office address. The legacy site gives two different strings
 * for the same office (homepage and About differ) — this is the reconciled one
 * and it is pending confirmation before launch. See docs/OPEN-DECISIONS.md.
 */
/**
 * The registered office. Updated to the new premises — the company moved from
 * Unit 3A-1, Level 3A, Tower 9 to Tower 2A in the same business park.
 *
 * RoomDock derives its location readout from the last two lines, so the city,
 * state and country must stay in that order.
 */
export const ADDRESS_LINES = [
  'Unit 6-1, Level 6, Tower 2A,',
  'UOA Business Park,',
  'Jalan Pengaturcara U1/51, Seksyen U1,',
  '40150 Shah Alam, Selangor,',
  'Malaysia',
] as const;

export const EMAIL = 'info@airdroitech.com';
export const LINKEDIN = 'https://www.linkedin.com/company/airdroitech/';
export const POLYAIRE = 'https://www.polyaire.com.au';
export const COMPANY_LINE = '© AirdroiTech Sdn Bhd (1411956P)';

export const LOGO = {
  src: '/brand/airdroitech-logo-header.png',
  width: 300,
  height: 72,
  alt: 'AirdroiTech',
} as const;
