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
 * Per the user: AirTouch Home (the new look), AirTouch Beam and AirTouch Secure
 * are all engineered by the AirdroiTech team.
 *
 * Brand phrases stay exactly as they are: "Bringing Your Ideas to Life",
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
    /** One word/phrase in `heading` to colour. One or two per page — see docs/BRAND.md. */
    accent?: string;
    body?: string;
    items?: { title: string; body: string }[];
    figure?: { src: string; alt: string };
    /** Small print under the section — used for the official Secure disclaimer. */
    note?: string;
  }[];
  /** Where purchase, access and support actually live. Opened in a new tab. */
  official: { note: string; links: OfficialLink[] };
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
      accent: 'our team',
      // Legacy: "Our team has contributed in making a Smart air conditioning
      // control offering ... adjustments for each zone". Agreement and article
      // fixed. Final sentence is the user's statement of what ADT engineered.
      body: 'Our team contributed to a smart air-conditioning control offering integrated AC unit and zone control, individual temperature monitoring and adjustment for each zone in your home, and smartphone app control of your air conditioner. AirTouch Home, AirTouch Beam and AirTouch Secure are all engineered by the AirdroiTech team.',
      figure: {
        src: '/projects/airtouch.webp',
        alt: 'The AirTouch console beside the AirTouch phone app',
      },
    },
    {
      heading: 'AirTouch Home — the new look',
      // Official: airtouchhome.com.au/pages/airtouch-home and the home page's
      // "Keep AirTouch 5 ... or install the free upgrade to the new AirTouch
      // Home app ... easily toggle between modes" and "Add cameras, sensors,
      // doorbells, garage control and lighting ... all from one app".
      body: 'AirTouch Home brings air conditioning control and smart home management together in one app on AirTouch 5 — no more juggling remotes or switching between apps. It is a free upgrade: keep AirTouch 5 for air conditioning alone, or install AirTouch Home to add cameras, sensors, doorbells, garage control and lighting, and toggle between the two modes at any time.',
    },
    {
      heading: 'AirTouch Secure',
      // Official: airtouchhome.com.au/pages/airtouch-secure-home. Component list
      // is the site's own "Security for AirTouch Home" navigation.
      body: 'AirTouch Secure is a range of smart monitoring devices that add to an AirTouch 5 system and are controlled through the AirTouch Home app. Alerts and full system control from anywhere; sensors, cameras and alarms; and do-it-yourself installation with no professional setup. The range includes an 8-piece indoor wireless Secure Kit, door and window sensors, motion sensors, a key fob, a doorbell, indoor and outdoor cameras, and a solar panel charger.',
      // Verbatim from the official page. Kept because it is a safety statement,
      // not marketing, and omitting it would overstate the product.
      note: 'AirTouch Secure helps you monitor your home and receive alerts. Performance depends on connectivity, environment and setup. AirTouch Secure is not a substitute for professional security monitoring. Requires AirTouch 5 or above with AirTouch Home installed and an active WiFi connection.',
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
  official: {
    note: 'Buy AirTouch and find support on the official AirTouch Home site.',
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
    src: '/projects/at-beam-device.webp',
    alt: 'The AirTouch Beam unit beside its retail box, which shows the Beam app on a phone and a wall-mounted air conditioner',
  },
  sections: [
    {
      heading: 'How the AirTouch Beam was created',
      accent: 'created',
      /*
       * Legacy: "Our Engineers have contribute greatly in the making of the
       * AirTouch Beam" — the grammar slip CLAUDE.md names explicitly. Fixed
       * here and merged with the R&D paragraph from the same page.
       */
      body: 'The AirTouch Beam is created through a meticulous, iterative process involving AirdroiTech’s R&D, hardware and software development, and extensive testing to ensure it meets the highest standards of performance and user experience. Our engineers contributed greatly: firmware engineers, hardware engineers and mobile developers worked together to bring it to life, each contributing their expertise to make managing air conditioning smarter, simpler and more efficient.',
      figure: {
        src: '/projects/at-beam-app.webp',
        alt: 'The AirTouch Beam app on a phone: the Lounge zone set to 23°, with heat, fan speed, swing and auto controls, a timer and programs',
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
        // The five below are from the official airtouchhome.com.au Beam page
        // and its FAQ.
        {
          title: 'No hub required',
          body: 'Beam connects directly to your home Wi-Fi on a 2.4 GHz network.',
        },
        {
          title: 'Plug in and connect',
          body: 'Installation takes around ten minutes — no wiring or tools.',
        },
        {
          title: 'Quick on/off button',
          body: 'The Beam unit has its own quick-action on/off button.',
        },
        {
          // Official FAQ: "One Beam unit controls one air conditioner." Stated
          // so no reader assumes one unit covers a whole home.
          title: 'One Beam per air conditioner',
          body: 'Each Beam controls one AC. Homes with several units use one Beam per unit.',
        },
        {
          title: 'No subscription',
          body: 'The AirTouch app and all of its features are free.',
        },
      ],
    },
    {
      heading: 'Matter-enabled',
      /*
       * Matter: confirmed by the user on 2026-09-13. The legacy AirdroiTech page
       * says Matter; the official site does not mention it but does say "Works
       * with Apple Home, Hey Google and Alexa". Both are stated.
       */
      body: 'Enjoy seamless integration into your Matter-enabled smart home ecosystem with AirTouch Beam — quick setup, flawless interoperability and consistent performance across a wide range of devices. It works with Apple Home, Google Home and Alexa for voice control.',
      figure: {
        src: '/projects/airtouch-beam.webp',
        alt: 'The AirTouch Beam unit beside the AirTouch phone app showing per-room controls',
      },
    },
  ],
  official: {
    note: 'Buy AirTouch Beam and find support on the official AirTouch Home site.',
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
  },
  sections: [
    {
      heading: 'The ultimate HVAC CAD tool for air conditioning installers',
      // Official, verbatim.
      body: 'PolyPlan is a cutting-edge, cloud-based CAD tool specifically crafted for HVAC professionals. This powerful software streamlines the entire design process from start to finish, enabling fast, efficient, and confident installations. Designed to intuitively guide professionals through calculating, designing, and quoting HVAC systems, PolyPlan ensures a precise and efficient workflow for residential installations.',
      // Official: "Open a Trade account today to access PolyPlan".
      note: 'PolyPlan is available to trade customers through a Polyaire Trade account.',
    },
    {
      heading: 'What our team does',
      accent: 'our team',
      // Legacy: "The Airdroitech Software Web team handles PolyPlan by Polyaire.
      // By monitoring its daily support, Maintaining the system and enhancing
      // it by adding new features that transforms how HVAC professionals work".
      // Brand spelling, sentence structure and agreement fixed.
      body: 'The AirdroiTech software web team handles PolyPlan by Polyaire — monitoring its daily support, maintaining the system, and enhancing it with new features that transform how HVAC professionals work: faster designs, smarter quotes and a plan that stands out.',
    },
    {
      heading: 'Rapid calculations and designs',
      items: [
        {
          title: 'Rapid calculations',
          // Official.
          body: 'Complete standard residential HVAC installations in as little as 15 minutes.',
        },
        {
          title: 'Capacity calculator',
          // Legacy AirdroiTech page.
          body: 'Upload house plans and use smart, simple tools to calculate the area and capacity needs of every room or zone.',
        },
        {
          title: 'Auto Zone',
          // Legacy AirdroiTech page.
          body: 'Streamlines planning by automatically generating zones within your plan.',
        },
        {
          title: 'Auto Outlets and Fittings',
          // Official.
          body: 'Automatically calculates and places the right size and quantity of outlets and fittings needed, ensuring accuracy and saving time.',
        },
        {
          title: 'Auto Flex Pen',
          // Official.
          body: 'Just draw where you need ducts; PolyPlan automatically selects the correct size, insulation, and length.',
        },
      ],
      figure: {
        src: '/projects/polyplan-content.webp',
        alt: 'A PolyPlan floor plan with zoned rooms beside a capacity table listing area, volume, air flow and load per zone',
      },
    },
    {
      heading: 'Design from anywhere',
      items: [
        {
          title: 'Cloud-based storage',
          // Official.
          body: 'Unlimited storage and backups ensure you always have access to your job plans along with the latest software updates and feature additions.',
        },
        {
          title: 'Access anywhere',
          // Official.
          body: 'Design and manage your projects from any location, at any time.',
        },
        {
          title: 'Online component ordering',
          // Official.
          body: 'Link your design directly to the Polyaire Online Ordering system for seamless transitions from design to order.',
        },
      ],
    },
    {
      heading: 'Systems it covers',
      // Official: "Whether you are designing ducted systems, evaporative installs,
      // or complex multi-storey setups". Gas heaters is a literal label in the
      // supplied product graphic (assets-src/projects/polyplan-content-2.jpg).
      body: 'Ducted reverse cycle, ducted evaporative, gas heaters and multi-storey designs.',
      figure: {
        src: '/projects/polyplan-content-2.webp',
        alt: 'PolyPlan system types — ducted reverse cycle, ducted evaporative, gas heaters and multi-storey designs — above a duct layout',
      },
    },
  ],
  official: {
    note: 'PolyPlan is accessed through a Polyaire Trade account. Try the demo, or read more on Polyaire’s site.',
    links: [OFFICIAL.polyplanDemo, OFFICIAL.polyplan],
  },
};

export const PRODUCT_PAGES = [AIRTOUCH, BEAM, POLYPLAN];
