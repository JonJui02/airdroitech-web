/**
 * Projects copy, ported from the legacy WordPress pages.
 *
 * Source pages were read through a public reader proxy — airdroitech.com is
 * unreachable from the office network. Wording is preserved except for the
 * fixes CLAUDE.md's voice rule asks for, each noted at the line it applies to.
 *
 * The brand phrases stay exactly as they are: "Bringing Your Ideas to Life",
 * "Your AC's Smart Companion", "Be an 'Airdroitechie'".
 */

export const INDEX = {
  eyebrow: 'Bringing Your Ideas to Life',
  title: 'ADT Projects',
};

export interface ProductPageCopy {
  /** Matches the slug under /projects/. */
  slug: string;
  name: string;
  kicker: string;
  lede: string;
  /** Shown on the index card. */
  summary: string;
  hero: { src: string; alt: string };
  sections: {
    heading: string;
    body?: string;
    items?: { title: string; body: string }[];
    figure?: { src: string; alt: string };
  }[];
}

export const AIRTOUCH: ProductPageCopy = {
  slug: 'airtouch',
  name: 'AirTouch',
  kicker: 'Smart home climate control',
  lede: 'Taking air conditioning to a whole new level of comfort and energy efficiency.',
  summary: 'A whole new level of comfort and energy efficiency.',
  hero: {
    src: '/projects/ATH-device.webp',
    alt: 'The AirTouch wall console showing zone tiles, a light dimmer, door and motion status, a camera view and local weather',
  },
  sections: [
    {
      heading: 'What our team built',
      // Legacy: "Our team has contributed in making a Smart air conditioning
      // control offering ... adjustments for each zone". Agreement and article
      // fixed; nothing added.
      body: 'Our team contributed to a smart air-conditioning control offering integrated AC unit and zone control, individual temperature monitoring and adjustment for each zone in your home, and smartphone app control of your air conditioner.',
      figure: {
        src: '/projects/airtouch.webp',
        alt: 'The AirTouch console beside the AirTouch phone app',
      },
    },
    {
      heading: 'You’re in Control',
      body: 'Air conditioning app for iOS and Android. Make home comfortable from anywhere with the AirTouch App. Control temperature, zoning and airflow via Wi-Fi when you are at home, or over the internet when you are away.',
    },
    {
      heading: 'Geofencing',
      body: 'Give your home’s air conditioner geofencing control with AirTouch 5. There is no need to worry about forgetting to turn off the air conditioning and wasting energy when you leave the house, and you have the added luxury of it turning back on again for you automatically as you return.',
    },
    {
      heading: 'Integrates how you want',
      body: 'Unlock more potential for your home air conditioning with AirTouch and popular, open smart assistants like Amazon Alexa or Google Home. With whoever you choose to control your air conditioning, AirTouch will respond.',
    },
  ],
};

export const BEAM: ProductPageCopy = {
  slug: 'airtouch-beam',
  name: 'AirTouch Beam',
  kicker: 'Your AC’s Smart Companion',
  lede: 'Make any split-system air conditioner smart.',
  summary: 'Turns any split-system air conditioner into a smart, efficient, customisable unit.',
  hero: {
    src: '/projects/at-beam-device.webp',
    alt: 'The AirTouch Beam unit, a small white square with an illuminated indicator',
  },
  sections: [
    {
      heading: 'How the AirTouch Beam was created',
      /*
       * Legacy: "Our Engineers have contribute greatly in the making of the
       * AirTouch Beam" — the grammar slip CLAUDE.md names explicitly. Fixed
       * here and merged with the R&D paragraph from the same page.
       */
      body: 'The AirTouch Beam is created through a meticulous, iterative process involving AirdroiTech’s R&D, hardware and software development, and extensive testing to ensure it meets the highest standards of performance and user experience. Our engineers contributed greatly: firmware engineers, hardware engineers and mobile developers worked together to bring it to life, each contributing their expertise to make managing air conditioning smarter, simpler and more efficient.',
      figure: {
        src: '/projects/at-beam-content.webp',
        alt: 'A Beam unit signalling to three different wall-mounted split-system air conditioners',
      },
    },
    {
      heading: 'Features',
      items: [
        {
          title: 'Smart Companion',
          body: 'Turn your AC on before you’re home for instant cool, or switch it off on the go.',
        },
        {
          title: 'Geofencing',
          body: 'Automatic comfort as you come home, and it won’t forget to turn off when you leave.',
        },
        {
          title: 'Program',
          body: 'Set it and forget it. Your AC adjusts automatically to your preset program, so comfort is there when you need it.',
        },
      ],
    },
    {
      heading: 'Matter-enabled',
      // Legacy writes "Air Touch Beam" here; normalised to the product's own
      // spelling, which the same page uses everywhere else.
      body: 'Enjoy seamless integration into your Matter-enabled smart home ecosystem with AirTouch Beam. Quick setup, flawless interoperability and consistent performance across a wide range of devices. The AirTouch Beam establishes direct connections with Apple Home, Google Home and Alexa, which are also Matter-compatible.',
      figure: {
        src: '/projects/airtouch-beam.webp',
        alt: 'The AirTouch Beam unit beside the AirTouch phone app showing per-room controls',
      },
    },
  ],
};

export const POLYPLAN: ProductPageCopy = {
  slug: 'polyplan',
  name: 'PolyPlan',
  kicker: 'Air conditioning CAD software',
  lede: 'Work faster with PolyPlan’s CAD tool for HVAC professionals.',
  summary: 'CAD software for HVAC professionals.',
  hero: {
    src: '/projects/polyplan-content.webp',
    alt: 'A PolyPlan floor plan with zoned rooms beside a capacity table listing area, volume, air flow and load per zone',
  },
  sections: [
    {
      heading: 'We maintain and enhance the CAD tool for air-conditioning professionals in Australia',
      // Legacy: "The Airdroitech Software Web team handles PolyPlan by Polyaire.
      // By monitoring its daily support, Maintaining the system and enhancing
      // it by adding new features that transforms how HVAC professionals work".
      // Brand spelling, sentence structure and agreement fixed.
      body: 'The AirdroiTech software web team handles PolyPlan by Polyaire — monitoring its daily support, maintaining the system, and enhancing it with new features that transform how HVAC professionals work: faster designs, smarter quotes and a plan that stands out.',
    },
    {
      heading: 'What it does',
      items: [
        {
          title: 'Cloud-based storage',
          body: 'Unlimited storage and backups of your job plans, with access to all the latest updates and feature additions the moment they are available.',
        },
        {
          title: 'Capacity calculator',
          body: 'Upload house plans and use smart, simple tools to calculate the area and capacity needs of every room or zone.',
        },
        {
          title: 'Auto Zone',
          body: 'A tool that streamlines planning by automatically generating zones within your plan.',
        },
        {
          title: 'Automated designs',
          body: 'PolyPlan places the right size and quantity of outlets needed in each zone. Select the style of outlet you want and it is done — and the same automated process covers fittings, units and ducts.',
        },
      ],
    },
    {
      heading: 'Systems it covers',
      // The four labels are read off the supplied product graphic
      // (assets-src/projects/polyplan-content-2.jpg), not invented.
      body: 'Ducted reverse cycle, ducted evaporative, gas heaters and multi-storey designs.',
      figure: {
        src: '/projects/polyplan-content-2.webp',
        alt: 'PolyPlan system types — ducted reverse cycle, ducted evaporative, gas heaters and multi-storey designs — above a duct layout',
      },
    },
  ],
};

export const PRODUCT_PAGES = [AIRTOUCH, BEAM, POLYPLAN];
