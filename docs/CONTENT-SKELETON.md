# Content skeleton — all ten pages

Block-by-block structure for every page. Legend:

- **keep** — existing copy ports as-is
- **edit** — copy exists, needs a rewrite pass
- **NEW** — AirdroiTech has to supply it; listed in `docs/OPEN-DECISIONS.md`

Source: live crawl of `airdroitech.com`, 11 Sep 2026. Every URL below is
unchanged from the legacy WordPress site and must not be renamed.

---

## Home — `/`

Job: a first-time visitor knows within one screen that ADT is Polyaire's
Malaysian R&D and software arm building smart-home and HVAC products, then
leaves for Projects or Careers.

| # | Block | | Notes |
|---|---|---|---|
| 01 | Hero | edit | H1 "Programming Intelligence" holds — distinctive and already ranks. Sub is the existing capability line. Two buttons: "See our projects" (primary), "Work with us" (secondary). Poster image loads first; the 4.8 MB mp4 attaches only above 1024px and never under reduced-motion. |
| 02 | Positioning | edit | "Challenging the norm / We help you build your future" plus the capability sentence. Trim to ~45 words. Links to About. |
| 03 | Capability strip | **NEW** | Six named capabilities as a plain row, not cards: Firmware & Embedded, Mobile Apps, Cloud & Backend, Web Platforms, Electronics & Hardware, QA & Test. |
| 04 | Projects showcase | edit | Three tiles — AirTouch, Beam, PolyPlan. **Kill the "(SWIPE TO VIEW)" carousel**: on desktop it hides content behind a gesture, on mobile it fights page scroll. |
| 05 | Polyaire relationship | edit | Keep the facts: largest AC wholesale network in Australia, 30+ years market leadership, manufacturer of air filters, insulated flexible ducting, grilles, vents, fittings. Keep the Banting address and the polyaire.com.au link. |
| 06 | Proof numbers | **NEW** | Founded 2021; headcount; teams; products; markets. Must not ship until real figures arrive — the current `0` / `1` / `500` counters are worse than none. |
| 07 | Careers CTA | keep | "Be an 'Airdroitechie'", one button to `/careers/`. |
| 08 | Footer | edit | Address, `info@airdroitech.com`, LinkedIn, nav repeat, privacy, "© AirdroiTech Sdn Bhd (1411956P)". **Home and About give different strings for the same address — reconcile to one.** |

---

## About — `/what-we-do/`

Job: establish credibility — ownership, capability, location, team. Read by both
partners and candidates. *One of the pages hit by the blank-section bug.*

| # | Block | | Notes |
|---|---|---|---|
| 01 | Page hero | keep | "About Us" + discipline line. Est. 2021. |
| 02 | Our story | keep | Polyaire's three decades; R&D arm into Malaysia; ADT as collaborator. Ports as written. |
| 03 | Our approach | edit | Currently one long sentence carrying three ideas. Split into talent development, delivery in smart home and IoT, continuous improvement. |
| 04 | Capabilities detail | **NEW** | Platforms, stacks, hardware/software split. What a prospective partner actually reads, and the current page has none of it. |
| 05 | Location | edit | Shah Alam, Selangor; full address; map lazy behind a static image. |
| 06 | Team | **NEW** | Four leadership cards with **real names, titles, photos** — replacing `MothR`, `FathR`, `STL` and the unnamed Electronics Engineering Manager. Then the group list: Engineers, Mobile Developers, Product, QA & QT, Accounts, AirMate, HR. *If real names cannot be published, drop the individual cards and keep only the group list — codenames read as unfinished.* |
| 07 | Values | keep | "Quality. Integrity. Kindness." — currently stranded on Careers; belongs here too. |
| 08 | Careers CTA + footer | keep | Shared components. |

---

## Projects index — `/projects/`

Job: one screen, three product entries, clear routes in. Lightest page on the
site; keep it that way.

| # | Block | | Notes |
|---|---|---|---|
| 01 | Hero | keep | "ADT Projects — Bringing Your Ideas to Life". |
| 02 | AirTouch entry | keep | "A whole new level of comfort and energy efficiency." App and Cloud team owns front end, back end, hardware, components, firmware, R&D. |
| 03 | AirTouch Beam entry | **NEW** | Beam is a shipping product with its own page but is **missing from this index** — reachable only from inside the AirTouch page. Add it as a first-class third entry. |
| 04 | PolyPlan entry | keep | "CAD software for HVAC professionals." Software Web team maintains and enhances it. |
| 05 | Careers CTA + footer | keep | Shared components. |

---

## AirTouch — `/projects/airtouch/`

| # | Block | | Notes |
|---|---|---|---|
| 01 | Hero | keep | "Australia's favourite smart home climate control system." Replace "Click here to learn more" with a real label. |
| 02 | What it is | edit | Integrated unit and zone control, per-zone monitoring and adjustment, smartphone control. Fix "Our team has contributed in making a Smart air conditioning control". |
| 03 | App control | keep | iOS and Android; temperature, zoning, airflow over WiFi at home or internet away; geofencing on AirTouch 5. |
| 04 | Ecosystem | keep | Alexa, Google Home. |
| 05 | ADT's role | **NEW** | Which teams built which layer — firmware, hardware, mobile, cloud. Currently only implied. This is the page's point of difference from Polyaire's own marketing. |
| 06 | Beam cross-link | keep | "Our Latest Innovation" block, grammar fixed. |
| 07 | Sibling project nav | keep | Prev/next across the three products. Already a pattern on all three pages. |

---

## AirTouch Beam — `/projects/airtouch-beam/`

*Newest product, strongest engineering story, worst hit by the blank-section bug.*

| # | Block | | Notes |
|---|---|---|---|
| 01 | Hero | keep | "Your AC's Smart Companion". |
| 02 | What is Beam | keep | Turns any split-system AC into a smart, efficient, customisable unit. |
| 03 | How it was built | edit | Iterative R&D, hardware and software development, extensive testing; firmware, hardware and mobile engineers collaborating. Strong material — fix "Our Engineers have contribute greatly". |
| 04 | Features ×3 | keep | Smart Companion (pre-cool before arrival, off on the move), Geofencing, Program. One row, stacking on mobile. |
| 05 | Matter & ecosystems | keep | Matter-enabled; Apple Home, Google Home, Alexa. **Retain the footnote verbatim** — "functionality may vary throughout the different ecosystem" is a compatibility disclaimer, not filler. |
| 06 | Closing CTA | **NEW** | The current **Order Now** implies commerce ADT does not run. Decide the destination: Polyaire store, distributor locator, or enquiry. Until then label it "Where to buy" pointing at Polyaire. |

---

## PolyPlan — `/projects/polyplan/`

| # | Block | | Notes |
|---|---|---|---|
| 01 | Hero | keep | "Work faster with PolyPlan's CAD Tool for HVAC Professionals." |
| 02 | ADT's mandate | keep | Software Web team runs daily support, maintenance and feature work — faster designs, smarter quotes. |
| 03 | Feature set ×4 | keep | **Cloud storage** (unlimited job plans and backups), **Capacity calculator** (upload house plans, compute area and capacity per room/zone), **Auto Zone** (generates zones automatically), **Automated designs** (right size and quantity of outlets per zone, then fittings, units, ducts). |
| 04 | Screenshots | **NEW** | Real CAD UI captures at 2× density, AVIF. A CAD product page with no product imagery undersells it. Wide screenshots scroll inside their own container. |
| 05 | Sibling project nav | keep | Shared component. |

---

## Career — `/careers/`

| # | Block | | Notes |
|---|---|---|---|
| 01 | Hero | keep | "Work with AirdroiTech — Developers, IOT, Business Solutions, and Engineering." |
| 02 | Perks & benefits | edit | Company insurance, free snacks, work computer, remote work, team collaboration. Rewrite each into one specific line — "remote work" as a bare label tells a candidate nothing. Replace the mixed icon set, which currently leaks raw label text (`cookie`, `laptop`, `work`, `people`), with one line-icon family. |
| 03 | Programmes ×3 | keep | **Internship** (real project work in a designated role), **Engineering** (full-stack, mobile, back-end plus electrical engineers for hardware integration), **Shared Services** (back office for Polyaire finance and sales — AP, AR, inventory, sales support). |
| 04 | Values | keep | "Quality. Integrity. Kindness." |
| 05 | Life at ADT | edit | Currently four bare labels — Switch Championship, Ranking, Events, Sports. Give each a photo and a sentence, or cut the block. A four-word list is not culture proof. |
| 06 | Open roles teaser | edit | Live count from `src/content/roles/`, plus a real link. Today it reads "Click Here to see other open roles" with a stray `info` glyph. |
| 07 | Headcount counter | **NEW** | Est. 2021 is correct; the AirdroiTechies figure animates to `1`. Supply the real number or remove the counter. |

---

## Open positions — `/careers/open-positions/`

Job: list live roles and capture a complete, validated application with a CV.
**The highest-value conversion on the site.**

| # | Block | | Notes |
|---|---|---|---|
| 01 | Hero | keep | "Be an AirdroiTechie — all you need to know, to be a part of AirdroiTech." |
| 02 | Roles list | edit | Eight live roles, two groups. *Engineering:* Senior Software Engineer (Mobile Apps), Senior Firmware Test Engineer, Product Owner, Senior Software Test Engineer, Product Designer. *Shared Services:* Customer Experience Manager, Inventory Control Specialist, Senior Accountant. One MDX file each in `src/content/roles/`, rendered as an expandable row, optionally its own URL. **Delete the third group currently titled "TBA / TBA".** |
| 03 | Application form | **NEW** | Rebuild. Name*, Email*, Phone*, Position* (select, prefilled from a role row), CV upload*, Message, PDPA consent*. Upload accepts `.pdf .doc .docx .rtf .txt` to 12 MB, validated client **and** server. Inline per-field errors, honeypot, rate limit, real success state instead of a page reload. |
| 04 | Speculative applications | keep | Keep the open invitation for candidates matching no listed role — currently on `/careers/`, belongs here beside the form. |
| 05 | Newsletter signup | edit | "Sign up for News" appears as bare text here and on Contact, with the actual capture in a popup plugin. Make it one inline footer component or cut it. **Blocked on provider decision.** |

---

## Contact — `/get-in-touch/`

| # | Block | | Notes |
|---|---|---|---|
| 01 | Hero | keep | "Get in touch with AirdroiTech!" with the Inquiries / Questions / Ideas triplet. Keep the hand-holding-phone illustration — the one genuinely distinctive asset on the site. |
| 02 | Enquiry form | **NEW** | Rebuild. Name*, Email*, Phone, Message*, PDPA consent*. Same validation, honeypot and rate-limit treatment as the application form. |
| 03 | Direct contact | keep | Unit 3A-1, Level 3A, Tower 9, UOA Business Park, Selangor · `info@airdroitech.com` · LinkedIn. Add a phone number if one is publishable. |
| 04 | Map | edit | Existing UOA Business Park embed, lazy — static placeholder that swaps to the live iframe on click, so the Google payload never lands on a phone that did not ask for it. |

---

## Data & Privacy — `/data-protection-and-privacy-policy/`

Job: PDPA compliance disclosure. **Legal text — ports verbatim, no editorial
rewrite.**

| # | Block | | Notes |
|---|---|---|---|
| 01 | Hero | keep | "Data & Privacy — Your Privacy, Our concern." |
| 02 | Seven-topic disclosure | keep | Why we collect; what we collect (general and location data, including the geofencing note for AirTouch products); how we collect; anonymity and pseudonyms; use and disclosure including promotion, marketing and unsubscribe; overseas recipients including Google and the Malaysian office; security, breach notification, integrity and access; complaints; changes. **Ships as real HTML headings, not a collapsed accordion** — legal text must be Ctrl+F findable and crawlable. Accordion is progressive enhancement only, open by default on mobile. |
| 03 | Policy PDF | keep | Downloadable AirdroiTech Privacy Policy, with file size and last-updated date beside the link. |
| 04 | Cookie / consent posture | **NEW** | The site loads Google Fonts and a Google Maps embed. Confirm with whoever owns PDPA compliance whether a banner is required and whether analytics will be added. *Self-hosting fonts and deferring the map mostly removes the question.* |

---

## Shared components across pages

- **Site header** — logo left; About / Projects (dropdown: AirTouch, Beam,
  PolyPlan) / Career / Privacy; Contact as the one filled button. LinkedIn and
  email icons move from the black utility strip (which costs 32px of every
  viewport for two icons) into the footer.
- **Mobile drawer** — full-height, Projects and Career expanded inline as
  sections, not nested accordions. 44px targets, focus trap, Escape to close,
  background scroll locked.
- **Careers CTA** — "Be an 'Airdroitechie'" block, on Home, About, Projects.
- **Footer** — address, email, LinkedIn, nav, privacy, company registration.
- **Sibling project nav** — prev/next across the three product pages.
