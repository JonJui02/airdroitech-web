import { OFFICIAL, type OfficialLink } from '@/lib/official';

/**
 * Projects copy.
 *
 * Two sources, both read directly and not paraphrased beyond the fixes noted:
 *
 * 1. The legacy AirdroiTech WordPress pages (via a reader proxy — the domain is
 *    unreachable from the office network). These describe AirdroiTech's own
 *    role, which the official sites do not.
 * 2. The official product sites, read on 2026-09-13: airtouchhome.com.au and
 *    polyaire.com.au/polyplan-hvac-cad-software. These are current product
 *    facts. Prices, bundles and stock are deliberately NOT copied — they change,
 *    and AirdroiTech does not sell; visitors are sent to the official site.
 *
 * Attribution (CEO direction, 2026-09-24): AirdroiTech keeps a low profile as
 * the Polyaire Group's R&D and software arm. The pages never say AirdroiTech or
 * "our team" built, engineered or maintains a product. Each page carries one
 * neutral line, "[Product] is a Polyaire Group product.", and sends visitors to
 * the official site.
 *
 * Product pages in points (design review, 2026-09-28): the long sections that
 * ran edge to edge are gone. Each page is one hero scene — the product with six
 * numbered points around it — and a link to the official site, where purchase,
 * support and full detail live. Every point is cut from copy the page already
 * carried (the retired sections, quoted in each `from`); none is new.
 *
 * Brand phrases stay exactly as they are: "Bringing Your Ideas to Life",
 * "Your AC's Smart Companion", "Be an 'Airdroitechie'".
 */

export const INDEX = {
  eyebrow: 'Bringing Your Ideas to Life',
  title: 'ADT Projects',
};

export interface ProductPoint {
  title: string;
  /** One line at 375px: keep it to about 44 characters. */
  detail: string;
  /** The hotspot on the hero image, as a percentage of its width and height. */
  x: number;
  y: number;
  /** Which column the point sits in beside the image on wide screens. */
  side: 'l' | 'r';
  /** Where the words come from — the retired section or official page. */
  from: string;
}

export interface ProductPageCopy {
  /** Matches the slug under /projects/. */
  slug: string;
  name: string;
  kicker: string;
  lede: string;
  /** Shown on the index card. */
  summary: string;
  /** Intrinsic size, so the hotspots sit on the image at any size. */
  hero: { src: string; alt: string; width: number; height: number };
  /** Six, three per side: left column top to bottom, then right. */
  points: ProductPoint[];
  /** Where purchase, access and support actually live. Opened in a new tab. */
  official: {
    note: string;
    /** The one button in the hero scene. */
    main: OfficialLink;
    links: OfficialLink[];
  };
}

export const AIRTOUCH: ProductPageCopy = {
  slug: 'airtouch',
  name: 'AirTouch',
  kicker: 'Smart home climate control',
  lede: 'Taking air conditioning to a whole new level of comfort and energy efficiency.',
  summary: 'A whole new level of comfort and energy efficiency.',
  hero: {
    src: '/projects/ATH-device.webp',
    alt: 'The AirTouch Home wall console showing climate zones, lighting with a dimmer, garage door and motion status, a music player and a driveway camera',
    width: 1061,
    height: 747,
  },
  points: [
    {
      title: 'Zone by zone',
      detail: 'Temperature, mode and fan per zone.',
      x: 25.5,
      y: 35,
      side: 'l',
      from: '“A Polyaire product”: individual temperature monitoring and adjustment for each zone; mode and fan per zone read off ATH-device.webp',
    },
    {
      title: 'One app for the home',
      detail: 'Cameras, doorbells, garage and lights too.',
      x: 31,
      y: 57,
      side: 'l',
      from: '“AirTouch Home — the new look”',
    },
    {
      title: 'Voice assistants',
      detail: 'Works with Amazon Alexa and Google Home.',
      x: 22,
      y: 80,
      side: 'l',
      from: '“Integrates how you want”',
    },
    {
      title: 'Geofencing',
      detail: 'Off as you leave, on as you return.',
      x: 68.6,
      y: 19.3,
      side: 'r',
      from: '“Geofencing”',
    },
    {
      title: 'From anywhere',
      detail: 'iOS and Android app, at home or away.',
      x: 87.8,
      y: 19.5,
      side: 'r',
      from: '“You’re in Control”',
    },
    {
      title: 'AirTouch Secure',
      detail: 'Sensors, cameras and alarms, self-installed.',
      x: 78,
      y: 75,
      side: 'r',
      from: '“AirTouch Secure”, airtouchhome.com.au/pages/airtouch-secure-home',
    },
  ],
  official: {
    note: 'Buy AirTouch and find support on the official AirTouch Home site.',
    main: OFFICIAL.airtouch5,
    links: [OFFICIAL.airtouch5, OFFICIAL.airtouchHome, OFFICIAL.airtouchSecure],
  },
};

export const BEAM: ProductPageCopy = {
  slug: 'airtouch-beam',
  name: 'AirTouch Beam',
  kicker: 'Your AC’s Smart Companion',
  lede: 'Make any split-system air conditioner smart.',
  summary: 'Turns any split-system air conditioner into a smart, efficient, customisable unit.',
  hero: {
    src: '/projects/airtouch-beam.webp',
    alt: 'The AirTouch Beam unit beside the Beam app on a phone showing per-room controls',
    width: 1000,
    height: 1000,
  },
  points: [
    {
      title: 'Geofencing',
      detail: 'Comfort as you arrive, off as you leave.',
      x: 34.8,
      y: 21.2,
      side: 'l',
      from: 'Features: “Geofencing”',
    },
    {
      title: 'Smart Companion',
      detail: 'Turn the AC on before you get home.',
      x: 27,
      y: 33,
      side: 'l',
      from: 'Features: “Smart Companion”',
    },
    {
      title: 'Programs',
      detail: 'Set it once. The AC follows your program.',
      x: 45.5,
      y: 68,
      side: 'l',
      from: 'Features: “Program”',
    },
    {
      /*
       * Matter: confirmed by the user on 2026-09-13. The legacy AirdroiTech page
       * says Matter; the official site says "Works with Apple Home, Hey Google
       * and Alexa". Both are stated.
       */
      title: 'Matter-enabled',
      detail: 'Apple Home, Google Home and Alexa.',
      x: 77.5,
      y: 60.5,
      side: 'r',
      from: '“Matter-enabled”',
    },
    {
      title: 'Plug in and connect',
      detail: 'About ten minutes. No wiring, no hub.',
      x: 86,
      y: 74,
      side: 'r',
      from: 'Features: “Plug in and connect”, “No hub required” (official Beam page)',
    },
    {
      // Official FAQ: "One Beam unit controls one air conditioner." Stated so no
      // reader assumes one unit covers a whole home.
      title: 'One Beam per AC',
      detail: 'Each Beam runs one AC. No subscription.',
      x: 67,
      y: 86,
      side: 'r',
      from: 'Features: “One Beam per air conditioner”, “No subscription” (official FAQ)',
    },
  ],
  official: {
    note: 'Buy AirTouch Beam and find support on the official AirTouch Home site.',
    main: OFFICIAL.airtouchBeam,
    links: [OFFICIAL.airtouchBeam],
  },
};

export const POLYPLAN: ProductPageCopy = {
  slug: 'polyplan',
  name: 'PolyPlan',
  kicker: 'Air conditioning CAD software',
  // Official H1 on polyaire.com.au.
  lede: 'Quote faster, quote smarter.',
  summary: 'CAD software for HVAC professionals.',
  hero: {
    src: '/projects/laptop-polyplan.webp',
    alt: 'PolyPlan open on a laptop: a floor plan with ducts and outlets sized room by room, beside the component library',
    width: 984,
    height: 694,
  },
  points: [
    {
      title: 'Rapid calculations',
      detail: 'Standard jobs in as little as 15 minutes.',
      x: 17,
      y: 10,
      side: 'l',
      from: '“Rapid calculations” (official): complete standard residential HVAC installations in as little as 15 minutes',
    },
    {
      title: 'Online ordering',
      detail: 'Designs link to Polyaire online ordering.',
      x: 21,
      y: 46,
      side: 'l',
      from: '“Online component ordering” (official)',
    },
    {
      title: 'Capacity calculator',
      detail: 'Area and load for every room or zone.',
      x: 37,
      y: 57,
      side: 'l',
      from: '“Capacity calculator” (legacy AirdroiTech page)',
    },
    {
      title: 'Auto Outlets and Fittings',
      detail: 'Right size and count, placed for you.',
      x: 64.3,
      y: 16.6,
      side: 'r',
      from: '“Auto Outlets and Fittings” (official)',
    },
    {
      title: 'Auto Zone',
      detail: 'Zones generated across your plan.',
      x: 78,
      y: 34,
      side: 'r',
      from: '“Auto Zone” (legacy AirdroiTech page)',
    },
    {
      title: 'Auto Flex Pen',
      detail: 'Draw ducts; size, insulation, length set.',
      x: 62,
      y: 49,
      side: 'r',
      from: '“Auto Flex Pen” (official)',
    },
  ],
  official: {
    note: 'PolyPlan is accessed through a Polyaire Trade account. Try the demo, or read more on Polyaire’s site.',
    main: OFFICIAL.polyplan,
    links: [OFFICIAL.polyplanDemo, OFFICIAL.polyplan],
  },
};

export const PRODUCT_PAGES = [AIRTOUCH, BEAM, POLYPLAN];
