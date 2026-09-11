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
    asset: 'projects/airtouch.jpg',
  },
  {
    name: 'AirTouch Beam',
    href: '/projects/airtouch-beam/',
    descriptor: "Your AC's smart companion",
    tag: 'MATTER',
    asset: 'projects/airtouch-beam.jpg',
  },
  {
    name: 'PolyPlan',
    href: '/projects/polyplan/',
    descriptor: 'CAD software for HVAC professionals',
    tag: 'CAD',
    asset: 'projects/polyplan.jpg',
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
export const ADDRESS_LINES = [
  'Unit 3A-1, Level 3A, Tower 9,',
  'UOA Business Park,',
  'Shah Alam, Selangor,',
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
