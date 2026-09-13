/**
 * Data & Privacy policy — LEGAL TEXT, VERBATIM.
 *
 * Ported word for word from the legacy page at
 * /data-protection-and-privacy-policy/, read through a reader proxy on
 * 2026-09-13 (the domain is unreachable from the office network).
 *
 * CLAUDE.md: "Privacy page text is legal copy — ports verbatim." Unlike every
 * other page, NO editorial or grammar fixes are applied here — including
 * phrasing such as "prevented to do so", "whom may have access" and the
 * spelling "Airdroitech". Changing legal wording is a decision for whoever owns
 * PDPA compliance, not for the website.
 *
 * Structure mirrors the legacy heading levels (###### -> h2, ##### -> h3,
 * "Contact us" -> h2). Rendered as real, always-visible headings — never a
 * collapsed accordion — so the text is findable with Ctrl+F and crawlable.
 *
 * Flagged, not changed: the policy's contact address is support@airdroitech.com,
 * while the rest of the site uses info@airdroitech.com. The policy PDF lives on
 * Google Drive; its file size and last-updated date are not known.
 */

export type Part = string | { label: string; href: string };

export type Block = { type: 'p'; parts: Part[] } | { type: 'ul'; items: string[] };

export interface PolicySection {
  id: string;
  level: 2 | 3;
  heading: string;
  blocks: Block[];
}

const p = (...parts: Part[]): Block => ({ type: 'p', parts });

export const PRIVACY_INTRO = {
  title: 'Data & Privacy',
  tagline: '“Your Privacy, Our concern.”',
  label: 'FAQ',
};

export const PRIVACY_SECTIONS: PolicySection[] = [
  {
    id: 'why-we-collect',
    level: 2,
    heading: 'Why do we collect personal information?',
    blocks: [
      p('We collect personal information to:'),
      {
        type: 'ul',
        items: [
          'provide products and services to our customers',
          'communicate with our customers, suppliers and other business contacts',
          'inform our customers and other business contacts about product and industry developments',
          'manage and account for our products and services',
          'manage credit provided to our customers',
          'promote and market our products and services and send invitations to our events',
          'process payment instructions, direct debit facilities and/or credit facilities requested by the customer',
          'generally carry on our business',
        ],
      },
    ],
  },
  {
    id: 'what-we-collect',
    level: 2,
    heading: 'What personal information do we collect?',
    blocks: [],
  },
  {
    id: 'general',
    level: 3,
    heading: 'General',
    blocks: [
      p(
        'We collect an individual’s name and contact details, and information about the individual’s occupation, employer and relationship with us or our customers and potential customers, and about the individual’s relationship with our other business contacts.',
      ),
    ],
  },
  {
    id: 'location-data',
    level: 3,
    heading: 'Location Data',
    blocks: [
      p(
        'Some of our products require the collection of location data to enable the full suite of features available with those products. This may require you to enable or authorise location services via the permission system used by your mobile operating system. You can check whether your product uses geofencing or other location features by reviewing the terms and conditions for your Airdroitech products.',
      ),
      p(
        'You can disable the use of location data through your devices or you can disable “geofencing” in system settings on your product console. If you do not enable or authorise location services on your devices and the console, you may not be able to access all of your product’s features or certain services provided by these products may not be available or function properly.',
      ),
    ],
  },
  {
    id: 'how-we-collect',
    level: 2,
    heading: 'How we collect personal information',
    blocks: [
      p(
        'We collect personal information directly from an individual when that individual meets with us, communicates with us by letter, telephone, email or fax, gives us a business card, subscribes to our publications, registers for or attends our events or submits information through our websites, blogs or other social media outlets.',
      ),
      p(
        'We also collect personal information from information provided to us when a customer places an order for our products or services, an application is made for us to supply products or services on credit to a customer, or when a personal guarantee is provided in respect of an application for credit with us.',
      ),
      p(
        'We may also collect information about an individual from our customers, potential customers and their business contacts, from the individual’s employer or other business contacts, and from publicly available records or a third party e.g. a provider of an employment or other reference.',
      ),
    ],
  },
  {
    id: 'anonymity',
    level: 3,
    heading: 'Anonymity and pseudonyms',
    blocks: [
      p(
        'Individuals have the right not to identify themselves, or to use a pseudonym when dealing with us. However, if we request personal information and it is not provided, we may not be able to provide products or services to, or otherwise assist, the relevant individual.',
      ),
    ],
  },
  {
    id: 'general-use',
    level: 3,
    heading: 'General use and disclosure of personal information',
    blocks: [
      p(
        'We use and disclose personal information for the primary purpose for which it was collected, related purposes and other purposes authorised by the Personal Data Protection Act. In general, we use and disclose personal information for the purposes set out in this privacy policy.',
      ),
    ],
  },
  {
    id: 'promotion-marketing',
    level: 3,
    heading: 'Use and disclosure of personal information for promotion and marketing',
    blocks: [
      p(
        'We will only use an individual’s personal information to promote or market products and services or to send invitations to events where we give that individual an opportunity to request us not to use the information for such purposes. You can also click the “unsubscribe” link in promotional emails you receive from us to request that we no longer use your personal information for such purposes. We will not use an individual’s personal information for such purposes if the individual requests us not to do so.',
      ),
    ],
  },
  {
    id: 'disclosure',
    level: 2,
    heading: 'To whom may we disclose or allow access to personal information?',
    blocks: [
      p(
        'We may disclose personal information to others, including our customers, suppliers and their contractors and other business contacts, in connection with the provision of our products and services to customers.',
      ),
      p(
        'We may disclose or allow access to personal information that we collect to our suppliers, contractors and other business contacts that help us in our business. For example, contractors may distribute some of our publications and develop and maintain our computer systems, electronic records, websites, blogs and other social media outlets. Our auditors, insurers, lawyers and other professional advisers may also be allowed to access our records to protect our interests and to ensure that we comply with our obligations.',
      ),
      p(
        'We may also disclose personal information about an individual to anyone else with the consent of that individual, or as otherwise required or permitted by law.',
      ),
    ],
  },
  {
    id: 'overseas',
    level: 3,
    heading: 'Disclosure to overseas recipients',
    blocks: [
      p(
        'Where required in order to provide specific products or services to specific customers, we may disclose personal information to overseas recipients (including Google) – however, we only do so to the extent required for such purposes. Such disclosure will be made to our office located in Malaysia, or any other overseas location where we may have an office from time to time.',
      ),
    ],
  },
  {
    id: 'security',
    level: 2,
    heading: 'How do we keep personal information secure?',
    blocks: [
      p(
        'We take reasonable steps to protect the personal information we hold from misuse and loss and from unauthorised access, modification or disclosure. We may store hard copies of this information in access controlled premises, and digital versions on secure servers. We require all persons authorised to access digital information to use logins and passwords to access such information.',
      ),
      p(
        'We require all our contractors and others to whom we disclose personal information or whom may have access to personal information we collect, to keep such personal information private and to protect such personal information from misuse and loss and from unauthorised access, modification or disclosure.',
      ),
      p(
        'Unless we are prevented to do so by the law, we de-identify or destroy securely all personal information we hold when no longer reasonably required by us.',
      ),
    ],
  },
  {
    id: 'security-breaches',
    level: 3,
    heading: 'Security breaches',
    blocks: [
      p(
        'In the event that we become aware of any actual or potential unauthorised access to or disclosure of personal information about an individual, or any loss of such information which may lead to unauthorised access or disclosure, we will promptly investigate and where appropriate, take remedial action and notify the individual affected in accordance with the Personal Data Protection Act.',
      ),
    ],
  },
  {
    id: 'integrity',
    level: 3,
    heading: 'Integrity of personal information',
    blocks: [
      p(
        'We take reasonable steps to ensure that the personal information we collect is accurate, up to date and complete and that the personal information we use or disclose is accurate, up to date, complete and relevant, having regard to the purpose of such use or disclosure.',
      ),
      p('To that end, we encourage you to contact us to update or correct any personal information we hold about you.'),
    ],
  },
  {
    id: 'access',
    level: 3,
    heading: 'Accessing your personal information',
    blocks: [
      p(
        'You may request access to personal information we hold about you. We may require you to verify your identity and to specify what information you require.',
      ),
      p(
        'We deal with all requests for access to personal information as required by the Personal Data Protection Act. We may charge a fee where we provide access and may refuse to provide access if the Personal Data Protection Act allows us to do so.',
      ),
    ],
  },
  {
    id: 'correction',
    level: 3,
    heading: 'Correction of personal information',
    blocks: [
      p(
        'We take reasonable steps to correct all personal information we hold to ensure that, having regard to the purposes for which it is held, the information is accurate, up to date, complete, relevant and not misleading.',
      ),
      p(
        'You may request corrections to personal information we hold about you. We deal with all requests for correction to personal information as required by the Personal Data Protection Act. We may refuse to correct personal information if the Personal Data Protection Act allows us to do so.',
      ),
    ],
  },
  {
    id: 'complaints',
    level: 2,
    heading: 'Complaints',
    blocks: [
      p(
        'If you wish to make a complaint about this Personal Data Protection Policy or our collection, use or disclosure of personal information, please contact us in the first instance. We will investigate your complaint and try to promptly resolve your complaint directly with you.',
      ),
      p(
        'If you are not satisfied with the outcome, then you may make a complaint to the Department of Personal Data Protection. For information about how to make such a complaint, please refer to the PDP website ',
        { label: 'https://www.pdp.gov.my/jpdpv2/', href: 'https://www.pdp.gov.my/jpdpv2/' },
        '.',
      ),
    ],
  },
  {
    id: 'contact-us',
    level: 2,
    heading: 'Contact us',
    blocks: [
      p(
        'To request access to or correction of personal information, to request not to receive marketing material or invitations from us, or to make a privacy complaint to us, please contact us at ',
        { label: 'support@airdroitech.com', href: 'mailto:support@airdroitech.com' },
        '.',
      ),
    ],
  },
  {
    id: 'changes',
    level: 2,
    heading: 'Changes to Privacy Policy',
    blocks: [
      p('We reserve the right to make changes to this Privacy Policy from time to time and without notice by publication on our website.'),
      p(
        'Your continued use of our website, or otherwise placing an order with us, will constitute your automatic acceptance of any amendments made to this Privacy Policy from time to time.',
      ),
      p('We recommend that you regularly review our Privacy Policy to ensure you are aware of any changes.'),
    ],
  },
];

export const PRIVACY_DOCUMENT = {
  heading: 'Documents',
  label: 'AirdroiTech Privacy Policy',
  href: 'https://drive.google.com/file/d/1v81n_fz23sMg2qWHaccLJB0Ej0Wny8Ts/view?usp=sharing',
};
