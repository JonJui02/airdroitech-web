/**
 * Official product sites. AirdroiTech engineers these products but does not
 * sell or support them — purchase, pricing and support live with the product
 * owners, so the site sends visitors there rather than restating details that
 * change (prices, bundles, stock).
 *
 * Every URL was read from the live official sites on 2026-09-13:
 *   - airtouchhome.com.au navigation and "Discover our range"
 *   - polyaire.com.au/polyplan-hvac-cad-software
 *
 * `site` is the destination as a person would say it; OutboundLink uses it in
 * the screen-reader "opens … in a new tab" hint.
 */
export const OFFICIAL = {
  airtouch5: {
    label: 'AirTouch 5',
    href: 'https://airtouchhome.com.au/pages/airtouch-5',
    site: 'airtouchhome.com.au',
  },
  airtouchHome: {
    label: 'AirTouch Home',
    href: 'https://airtouchhome.com.au/pages/airtouch-home',
    site: 'airtouchhome.com.au',
  },
  airtouchBeam: {
    label: 'AirTouch Beam',
    href: 'https://airtouchhome.com.au/pages/airtouch-beam-home',
    site: 'airtouchhome.com.au',
  },
  airtouchSecure: {
    label: 'AirTouch Secure',
    href: 'https://airtouchhome.com.au/pages/airtouch-secure-home',
    site: 'airtouchhome.com.au',
  },
  polyplan: {
    label: 'PolyPlan on Polyaire',
    href: 'https://www.polyaire.com.au/polyplan-hvac-cad-software',
    site: 'polyaire.com.au',
  },
  polyplanDemo: {
    label: 'Try the PolyPlan demo',
    href: 'https://polyplan.polyaire.com.au/demo/',
    site: 'the PolyPlan demo',
  },
} as const;

export type OfficialLink = (typeof OFFICIAL)[keyof typeof OFFICIAL];
