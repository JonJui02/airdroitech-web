import { PRODUCTS } from '@/lib/site';

/**
 * Room copy, lifted verbatim from the previous scrolling homepage so the
 * console says exactly what the signed-off page said. Nothing here is new
 * marketing text.
 */

export const HERO_EYEBROW = 'Smart home · IoT · Automation · Data · AI';

export const HERO_DECK =
  'Software and product development for smart home technologies, business solutions and artificial intelligence.';

export const ABOUT_EYEBROW = 'Challenging the norm';
export const ABOUT_HEADING = 'We help you build your future';
export const ABOUT_BODY =
  'AirdroiTech specialises in business solutions, IoT, automation, data analytics and artificial intelligence. We help companies improve how they do business so they can deliver better services to their customers — from first prototype through to a product shipping in homes.';

export const CAREER_EYEBROW = 'Careers';
export const CAREER_HEADING = 'Be an ‘Airdroitechie’';
export const CAREER_BODY =
  'Are you a tech enthusiast looking for a career journey? The hard work and dedication of our team — the AirdroiTechies — pave the way for everything we ship.';
export const CAREER_ACTION = 'See open positions';

export const CONTACT_EYEBROW = 'Get in touch';
export const CONTACT_HEADING = 'Talk to the team';

export const POLYAIRE_YEARS = '30';
export const POLYAIRE_LABEL = 'Years of market leadership · Polyaire';
export const POLYAIRE_BODY =
  "The largest air-conditioning wholesale network in Australia. AirdroiTech is Polyaire's R&D and software arm.";

export interface ProjectCopy {
  kicker: string;
  name: string;
  copy: string;
  href: string;
  asset: string;
  tag: string;
}

export const PROJECT_COPY: ProjectCopy[] = [
  {
    kicker: 'Smart home climate control',
    name: 'AirTouch',
    copy: 'Unit and zone control, per-zone monitoring and adjustment, and full control from a phone at home or away.',
    href: PRODUCTS[0].href,
    asset: PRODUCTS[0].asset,
    tag: PRODUCTS[0].tag,
  },
  {
    kicker: 'Matter-enabled companion',
    name: 'AirTouch Beam',
    copy: "Your AC's smart companion — turns any split-system air conditioner into a smart, efficient, customisable unit.",
    href: PRODUCTS[1].href,
    asset: PRODUCTS[1].asset,
    tag: PRODUCTS[1].tag,
  },
  {
    kicker: 'Air conditioning CAD software',
    name: 'PolyPlan',
    copy: 'CAD for HVAC professionals — faster designs, automatic zoning and smarter quotes, maintained by our web team.',
    href: PRODUCTS[2].href,
    asset: PRODUCTS[2].asset,
    tag: PRODUCTS[2].tag,
  },
];
