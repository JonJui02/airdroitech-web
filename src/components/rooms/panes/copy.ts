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
  /** Extra product shots shown in the device detail, after the card image. */
  gallery: { src: string; alt: string }[];
  /**
   * What the product does.
   *
   * Every line is read off the supplied product imagery — no capability is
   * inferred, extrapolated or invented. The `from` field names the image each
   * claim comes from so it can be checked against the source.
   */
  features: { label: string; from: string }[];
}

export const PROJECT_COPY: ProjectCopy[] = [
  {
    kicker: 'Smart home climate control',
    name: 'AirTouch',
    copy: 'Unit and zone control, per-zone monitoring and adjustment, and full control from a phone at home or away.',
    href: PRODUCTS[0].href,
    asset: PRODUCTS[0].asset,
    tag: PRODUCTS[0].tag,
    gallery: [
      {
        src: '/projects/ATH-device.webp',
        alt: 'The AirTouch wall console showing zone tiles, a light dimmer, door and motion status, a camera view and local weather',
      },
    ],
    // All five read directly off the console screenshot in ATH-device.webp.
    features: [
      { label: 'Per-zone temperature, mode and fan', from: 'ATH-device.webp' },
      { label: 'Lighting and dimming', from: 'ATH-device.webp' },
      { label: 'Door, garage and motion status', from: 'ATH-device.webp' },
      { label: 'Camera view', from: 'ATH-device.webp' },
      { label: 'Local weather and air quality', from: 'ATH-device.webp' },
    ],
  },
  {
    kicker: 'Matter-enabled companion',
    name: 'AirTouch Beam',
    copy: "Your AC's smart companion — turns any split-system air conditioner into a smart, efficient, customisable unit.",
    href: PRODUCTS[1].href,
    asset: PRODUCTS[1].asset,
    tag: PRODUCTS[1].tag,
    gallery: [
      {
        src: '/projects/at-beam-device.webp',
        alt: 'The AirTouch Beam unit, a small white square with an illuminated indicator',
      },
      {
        src: '/projects/at-beam-content.webp',
        alt: 'A Beam unit signalling to three different wall-mounted split-system air conditioners',
      },
    ],
    /*
     * at-beam-content.webp shows one Beam and three DIFFERENT split systems.
     * That is a statement about compatibility across makes, which matches the
     * repo's own "any split-system air conditioner" — NOT a claim that one
     * Beam drives three units at once. Do not upgrade this line to imply
     * multi-unit control without confirmation.
     */
    features: [
      { label: 'Works with any split system', from: 'at-beam-content.webp' },
      { label: 'Wireless — no rewiring', from: 'at-beam-content.webp' },
      { label: 'Matter-enabled', from: 'PRODUCTS[1].tag' },
    ],
  },
  {
    kicker: 'Air conditioning CAD software',
    name: 'PolyPlan',
    copy: 'CAD for HVAC professionals — faster designs, automatic zoning and smarter quotes, maintained by our web team.',
    href: PRODUCTS[2].href,
    asset: PRODUCTS[2].asset,
    tag: PRODUCTS[2].tag,
    gallery: [
      {
        src: '/projects/polyplan-content.webp',
        alt: 'A PolyPlan floor plan with zoned rooms beside a capacity table listing area, volume, air flow and load per zone',
      },
      {
        src: '/projects/polyplan-content-2.webp',
        alt: 'PolyPlan system types — ducted reverse cycle, ducted evaporative, gas heaters and multi-storey designs — above a duct layout',
      },
    ],
    // System types are the literal labels in polyplan-content-2.webp; the
    // calculated columns are the literal table headers in polyplan-content.webp.
    features: [
      { label: 'Ducted reverse cycle', from: 'polyplan-content-2.webp' },
      { label: 'Ducted evaporative', from: 'polyplan-content-2.webp' },
      { label: 'Gas heaters', from: 'polyplan-content-2.webp' },
      { label: 'Multi-storey designs', from: 'polyplan-content-2.webp' },
      { label: 'Area, volume, air flow and load per zone', from: 'polyplan-content.webp' },
      { label: 'Layout, capacity, components and pricing', from: 'polyplan-content.webp' },
    ],
  },
];

/**
 * Team photography for the About room.
 *
 * Real, candid photographs of the company supplied by AirdroiTech. They show
 * the team collectively and name no one, so they do not resolve
 * docs/OPEN-DECISIONS.md #1 (real names and titles for the leadership cards) —
 * they give About honest imagery while that question stays open.
 */
export const TEAM_PHOTOS = [
  {
    src: '/team/adt-team-3.jpg',
    alt: 'The AirdroiTech team gathered in the office lounge for a group photo',
    caption: 'The team, Shah Alam',
  },
  {
    src: '/team/adt-team-1.jpg',
    alt: 'AirdroiTech staff around a long table sharing a meal',
    caption: 'Team lunch',
  },
  {
    src: '/team/adt-team-2.jpg',
    alt: 'AirdroiTech engineers working on laptops during a training session',
    caption: 'Training session',
  },
  {
    src: '/team/adt-team.jpg',
    alt: 'Five AirdroiTech staff in pirate costume at the annual dinner, in front of a Pirate’s Paradise banner',
    caption: 'Annual dinner',
  },
];
