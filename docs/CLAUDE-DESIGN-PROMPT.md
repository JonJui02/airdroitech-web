# Claude Design brief — AirdroiTech Revamp 2.0

How to use this file:

1. Paste **Part A** once, at the start of the Claude Design session. It is the
   standing brief and it does not change.
2. Attach the two logo files from `public/brand/`.
3. Paste **one** page block from **Part B**. One page per request — asking for
   all ten at once produces ten variations of the same hero.
4. Review the comp. When you approve it, come back here and run
   `/design-import <page-name> <path-to-comp>` to turn it into code.

Ask for **375px first, then 1440px**, in that order. The legacy site's core
failure is that it was designed at desktop and reflowed downward.

---

## Part A — standing brief (paste once)

> I am redesigning the website for **AirdroiTech Sdn Bhd**, a Malaysian software
> and hardware engineering company in Shah Alam, Selangor. They are the R&D and
> software arm of **Polyaire**, Australia's largest air-conditioning wholesale
> network. They build smart-home climate control products (**AirTouch**,
> **AirTouch Beam**) and a CAD/quoting platform for HVAC trades (**PolyPlan**).
>
> Their tagline is **"Programming Intelligence"**. The audience is two groups at
> once: Australian and Malaysian business partners in the HVAC industry, and
> software and electronics engineers considering a job there.
>
> This is a revamp of an existing WordPress site. The brand identity is fixed.
> I need a new UI/UX, not a new brand.
>
> **The logo does not change.** I am attaching it. Shape, proportions and colours
> are fixed. Design around it.
>
> ### The palette is exactly four colours. All four must be used.
>
> These are sampled by pixel count from the logo artwork. Do not add a fifth
> hue. Tints and shades derived from these four are fine.
>
> | Hex | Name | Its job |
> |---|---|---|
> | `#2F7F59` | Deep Teal | **Primary.** Buttons, links, primary surfaces. The only brand green that carries white text legibly (4.88:1). |
> | `#4F9934` | Signal Green | Brand mid-tone. Large display type, icon fills, gradient midpoint, borders. |
> | `#A0D233` | Lime | **Accent.** The highest-value action, active states, focus rings, highlights. Always carries near-black text. |
> | `#8E9093` | Wordmark Grey | Structural neutral. Borders, dividers, disabled states, captions at 18px+. Derive the whole neutral scale from it so the greys keep its faint cool cast. |
>
> Near-black ink is `#131A17` — a green-tinted black, so it stays in the family.
>
> ### Contrast rules — these are hard failures, not preferences
>
> - **Never white text on `#A0D233`.** 1.79:1. Use `#131A17` on lime, always.
> - **Never `#A0D233` as a text colour on white.** 1.79:1, at any size.
> - **Never white text on `#4F9934` at body size.** 3.54:1 fails WCAG AA. It is
>   legal only at 24px regular / 18.7px bold and above, and for non-text UI like
>   icons and borders. For any normal-size white-on-green, use `#2F7F59`.
> - **Never `#8E9093` as body copy.** 3.20:1. Use `#424547` for running text.
> - Body text must clear 4.5:1. Large text and UI borders must clear 3:1.
>
> ### The brand gradient
>
> The logo's cloud runs teal into green into lime, so this gradient is the mark
> unrolled, not an invention:
> `linear-gradient(100deg, #2F7F59 0%, #4F9934 52%, #A0D233 100%)`.
> Use it **at most once per page**. Ink text only on it, never white. Never
> behind running text.
>
> ### Typography
>
> **Archivo** for display (headings, product names, numerals) and **IBM Plex
> Sans** for body, nav, buttons and form labels. **IBM Plex Mono** for small
> uppercase eyebrows, specifications and data. Scale is a 1.25 ratio; body sits
> at about 15.5px with a 1.62 line-height; running text caps near 68 characters.
>
> ### Two hard constraints
>
> 1. **Mobile-first, designed at 375px.** The current site was designed at
>    desktop and it breaks on phones.
> 2. **No element's resting state may be invisible.** The current site parks
>    sections at `opacity: 0` waiting on a scroll animation that never fires on
>    narrow screens, so whole pages render blank on a phone. Everything meant to
>    be read is visible the moment the page loads. Reveal animation is optional
>    polish on top of a visible state — never the thing that makes content
>    appear. No parallax, no scroll-jacking, no carousels that hide content
>    behind a swipe.
>
> ### Also avoid
>
> - Every block as a rounded card with the same radius and shadow. Spend border,
>   fill and shadow by role; lift the one thing that needs lifting.
> - Big-number stat tiles unless the figures are genuinely the point.
> - Numbered `01 / 02 / 03` markers unless the content really is a sequence.
> - Emoji as section markers. Everything centred.
>
> ### What I want back, per page
>
> - The **375px** layout first, then **1440px**.
> - Light theme and dark theme. In dark, roles rotate rather than invert: deep
>   teal is too dark to carry interactive weight on a dark ground, so lime
>   becomes the link and focus colour, and surfaces go green-tinted dark
>   (`#0E1411` ground, `#161E1A` surface).
> - Real content from the page block I give you. **No lorem ipsum.**
> - Assembled from a consistent component kit across pages — header, footer,
>   hero, feature row, feature grid, project card, accordion, form field, button
>   in four variants (primary teal / accent lime / secondary outline / ghost).
>   Do not invent a new card style per page.

---

## Part B — page blocks (paste one at a time)

Each block below is condensed from `docs/CONTENT-SKELETON.md`. Items marked
**[BLOCKED]** have no real content yet — ask for the layout with a clearly
marked placeholder, and do not invent names, figures or job descriptions.

### B1 — Home

> Design the **homepage**, at 375px then 1440px.
>
> Its job: a first-time visitor understands within one screen that AirdroiTech is
> Polyaire's Malaysian R&D and software arm building smart-home and HVAC
> products, then leaves for Projects or Careers.
>
> Blocks, in order:
> 1. **Hero.** H1 "Programming Intelligence". Sub: "Software and product
>    development for smart home technologies, business solutions and artificial
>    intelligence." Two buttons: "See our projects" (primary) and "Work with us"
>    (secondary). A still image is the hero visual — a video may attach on
>    desktop only, so the design must hold with a static image.
> 2. **Positioning.** "Challenging the norm / We help you build your future",
>    plus about 45 words on business solutions, IoT, automation, data analytics
>    and AI. Links to About.
> 3. **Capability strip.** Six named capabilities in a plain row, not cards:
>    Firmware & Embedded, Mobile Apps (iOS/Android), Cloud & Backend, Web
>    Platforms, Electronics & Hardware, QA & Test.
> 4. **Projects showcase.** Three tiles: AirTouch ("Smart home climate
>    control"), AirTouch Beam ("Your AC's smart companion"), PolyPlan ("CAD
>    software for HVAC professionals"). A responsive grid that becomes a vertical
>    stack — **not** a swipe carousel.
> 5. **Polyaire relationship.** Largest air-conditioning wholesale network in
>    Australia, market leader for over three decades, manufacturer of air
>    filters, insulated flexible ducting, grilles, vents and fittings.
>    AirdroiTech is its R&D arm in Malaysia.
> 6. **Proof numbers.** Founded 2021, plus headcount and products shipped.
>    **[BLOCKED — real figures not supplied. Mark the placeholders clearly.]**
> 7. **Careers CTA.** "Be an 'Airdroitechie'" with one button to Careers.
> 8. **Footer.** Full Shah Alam address, `info@airdroitech.com`, LinkedIn, nav
>    repeat, privacy link, "© AirdroiTech Sdn Bhd (1411956P)".
>
> Also design the **site header and mobile navigation** as part of this page,
> since every other page reuses them: logo left; About / Projects (with a
> dropdown for the three products) / Career / Privacy; Contact as the single
> filled button. On mobile, a full-height drawer with Projects and Career
> expanded inline as sections — not a nested accordion. 44px minimum targets.

### B2 — About

> Design the **About** page (URL stays `/what-we-do/`), at 375px then 1440px.
>
> Its job: establish credibility — who owns AirdroiTech, what it can build, where
> it is, who works there. It is the page both partners and candidates read.
>
> 1. **Hero.** "About Us", with the discipline line: Automation, AI, Data
>    Analytics, Business Solutions, Electrical Engineering. Established 2021.
> 2. **Our story.** Polyaire's three decades of market leadership; its R&D arm
>    extended into Malaysia; AirdroiTech as a Polyaire collaborator.
> 3. **Our approach.** Three ideas, split apart: developing engineering talent,
>    delivering smart home and IoT solutions, continuous improvement.
> 4. **Capabilities detail.** The homepage strip expanded into substance —
>    platforms, stacks, and the hardware/software split.
> 5. **Location.** Shah Alam, Selangor. Full address plus a map that sits behind
>    a static image until clicked, so the map payload never loads unasked.
> 6. **Team.** Four leadership cards, then a list of team groups: Engineers,
>    Mobile Developers, Product, QA & QT, Accounts, AirMate, Human Resource.
>    **[BLOCKED — real names, titles and photos not supplied. Show the card
>    layout with obvious placeholders, and also show the page working with the
>    group list only, in case the individual cards get cut.]**
> 7. **Values.** "Quality. Integrity. Kindness."
> 8. Careers CTA and footer, reusing the components from B1.
>
> Note: this page is one of the worst hit by the invisible-content bug on the
> live site. Every section must read at full opacity on load.

### B3 — Projects index

> Design the **Projects index** at `/projects/`, at 375px then 1440px. The
> lightest page on the site; keep it that way.
>
> 1. **Hero.** "ADT Projects — Bringing Your Ideas to Life".
> 2. **Three project entries**, equal weight, each with product name, one-line
>    descriptor and AirdroiTech's role:
>    - **AirTouch** — "A whole new level of comfort and energy efficiency." The
>      App and Cloud team handles front end, back end, hardware, components and
>      firmware.
>    - **AirTouch Beam** — "Your AC's smart companion." Turns any split-system
>      air conditioner into a Matter smart device.
>    - **PolyPlan** — "CAD software for HVAC professionals." The Software Web
>      team maintains and enhances it for design and quoting.
> 3. Careers CTA and footer.
>
> The three entries need one repeating card treatment that also works on the
> homepage showcase.

### B4 — AirTouch

> Design the **AirTouch** product page at `/projects/airtouch/`, 375px then
> 1440px. Its job: explain the flagship product and make AirdroiTech's
> engineering contribution to it legible.
>
> 1. **Hero.** "AirTouch — Australia's favourite smart home climate control
>    system." Give the CTA a real label, not "click here".
> 2. **What it is.** Integrated AC unit and zone control, per-zone temperature
>    monitoring and adjustment, smartphone control.
> 3. **App control.** iOS and Android. Temperature, zoning and airflow over WiFi
>    at home or over the internet away. Geofencing on AirTouch 5: the air
>    conditioning shuts off when the house empties and restarts as you return.
> 4. **Ecosystem.** Amazon Alexa and Google Home.
> 5. **AirdroiTech's role**, by layer: firmware, hardware, mobile, cloud.
> 6. **Cross-link to AirTouch Beam** as the latest innovation.
> 7. **Sibling project navigation** — previous/next across the three products.
>    Design this once; it repeats on all three product pages.

### B5 — AirTouch Beam

> Design the **AirTouch Beam** page at `/projects/airtouch-beam/`, 375px then
> 1440px. Newest product, strongest engineering story.
>
> 1. **Hero.** "AirTouch Beam — Your AC's Smart Companion."
> 2. **What it is.** Transforms any split-system air conditioner into a smart,
>    efficient, customisable unit.
> 3. **How it was built.** Iterative R&D, hardware and software development,
>    extensive testing — firmware, hardware and mobile engineers working
>    together. This is the page's real substance; give it room.
> 4. **Three features**, one row on desktop, stacked on mobile:
>    - **Smart Companion** — turn the AC on before you are home, or off on the go.
>    - **Geofencing** — comfort as you arrive, off when you leave.
>    - **Program** — the AC follows a preset schedule automatically.
> 5. **Matter and ecosystems.** Matter-enabled; direct connections to Apple Home,
>    Google Home and Alexa. Include the footnote "functionality may vary
>    throughout the different ecosystem" — it is a compatibility disclaimer and
>    must stay visible, not be buried.
> 6. **Closing CTA.** "Turn your AC into a genius." **[BLOCKED — the current
>    "Order Now" button has no destination; AirdroiTech runs no commerce. Design
>    it labelled "Where to buy".]**
> 7. Sibling project navigation.

### B6 — PolyPlan

> Design the **PolyPlan** page at `/projects/polyplan/`, 375px then 1440px. Its
> job: show AirdroiTech owning a production B2B CAD platform used daily by
> Australian HVAC trades. The audience here is technical and commercial, not
> consumer.
>
> 1. **Hero.** "Work faster with PolyPlan's CAD tool for HVAC professionals."
> 2. **AirdroiTech's mandate.** The Software Web team runs daily support,
>    maintenance and feature work on PolyPlan by Polyaire — faster designs,
>    smarter quotes.
> 3. **Four features**, each with its real mechanic:
>    - **Cloud storage** — unlimited storage and backups of job plans.
>    - **Capacity calculator** — upload house plans, calculate area and capacity
>      needs per room and zone.
>    - **Auto Zone** — generates zones within a plan automatically.
>    - **Automated designs** — places the right size and quantity of outlets in
>      each zone, then fittings, units and ducts.
> 4. **Product screenshots.** **[BLOCKED — real CAD UI captures not supplied.
>    Design the frame they will sit in; a wide screenshot must be able to scroll
>    inside its own container rather than forcing the page sideways.]**
> 5. Sibling project navigation.

### B7 — Career

> Design the **Career** page at `/careers/`, 375px then 1440px. Its job: convince
> an engineer in Klang Valley that AirdroiTech is worth leaving their current job
> for, then send them to the roles list.
>
> 1. **Hero.** "Work with AirdroiTech — Developers, IoT, Business Solutions and
>    Engineering." Established 2021.
> 2. **Perks.** Company insurance, free snacks, work computer, remote work, team
>    collaboration — each with one specific line, not a bare label. One
>    consistent line-icon family throughout.
> 3. **Three programmes:**
>    - **Internship** — real project work in a designated role.
>    - **Engineering** — full-stack, mobile and back-end developers alongside
>      electrical engineers for hardware integration.
>    - **Shared Services** — the back office for Polyaire's finance and sales:
>      accounts payable, accounts receivable, inventory, sales support.
> 4. **Values.** "Quality. Integrity. Kindness." Give this real presence — it is
>    the page's emotional centre.
> 5. **Life at AirdroiTech.** Switch Championship, rankings, events, sports —
>    needs a photo and a sentence each to work at all.
> 6. **Open roles teaser.** A live count and a real labelled link.
> 7. **Headcount counter.** Established 2021 is correct. **[BLOCKED — the
>    headcount figure has not been supplied. Show the treatment; also show the
>    page working without the counter, in case it gets cut.]**

### B8 — Open positions

> Design **Open positions** at `/careers/open-positions/`, 375px then 1440px.
> This is the highest-value conversion on the site.
>
> 1. **Hero.** "Be an AirdroiTechie — all you need to know, to be a part of
>    AirdroiTech."
> 2. **Roles list**, in two groups, eight roles. Each row shows title, team,
>    location (Shah Alam, Selangor) and type, and expands to show the full
>    description.
>    - *Engineering:* Senior Software Engineer (Mobile Apps), Senior Firmware
>      Test Engineer, Product Owner, Senior Software Test Engineer, Product
>      Designer.
>    - *Shared Services:* Customer Experience Manager, Inventory Control
>      Specialist, Senior Accountant.
> 3. **Application form.** This is the most important thing on the page and the
>    current one is barely designed. Fields: Name (required), Email (required),
>    Phone (required), Position (required select, pre-filled when arriving from a
>    role row), CV upload (required — accepts .pdf .doc .docx .rtf .txt up to
>    12MB), Message (optional), and a privacy-policy consent checkbox (required).
>    Design **all four states**: empty, filled, per-field error, and success.
>    Errors sit inline under their field and are never signalled by colour alone.
>    The file input states the accepted types and the size limit in text. The
>    consent checkbox is never pre-checked.
> 4. **Speculative applications.** An open invitation for candidates who match no
>    listed role, sitting beside the form.

### B9 — Contact

> Design the **Contact** page (URL stays `/get-in-touch/`), 375px then 1440px.
> Its job: one clear route to a human, with the office findable.
>
> 1. **Hero.** "Get in touch with AirdroiTech!" with the triplet "Inquiries?
>    Questions? Ideas?" There is an existing brand illustration of a hand holding
>    a phone showing the AirdroiTech app — it is the site's one genuinely
>    distinctive asset. Keep it and design around it.
> 2. **Enquiry form.** Name (required), Email (required), Phone (optional),
>    Message (required), privacy consent checkbox (required). Same four states as
>    B8: empty, filled, error, success.
> 3. **Direct contact.** Unit 3A-1, Level 3A, Tower 9, UOA Business Park,
>    Selangor. `info@airdroitech.com`. LinkedIn.
> 4. **Map.** UOA Business Park, behind a static image that swaps to the live map
>    on click.

### B10 — Data & Privacy

> Design the **Data & Privacy** page at `/data-protection-and-privacy-policy/`,
> 375px then 1440px. This is a legal disclosure under Malaysia's Personal Data
> Protection Act. Design for **findability and reading**, not for visual
> interest.
>
> 1. **Hero.** "Data & Privacy — Your Privacy, Our concern."
> 2. **Seven disclosure sections:** why personal information is collected; what
>    is collected (including location data and the geofencing note for AirTouch
>    products); how it is collected; to whom it may be disclosed (including
>    overseas recipients); how it is kept secure; complaints; changes to the
>    policy.
>    These must render as **real visible headings with their text**, not as a
>    collapsed accordion — legal text has to be findable with Ctrl+F and readable
>    by a crawler. If you use an accordion at all, every section is open by
>    default. Long legal prose needs a comfortable measure and clear heading
>    hierarchy; a sidebar or sticky in-page index is welcome at 1440px.
> 3. **Policy PDF** download, with file size and last-updated date beside the
>    link.

---

## After approval

For each approved comp:

```
/design-import <page-name> <path-to-comp>
```

That runs `brand-guardian` over the comp first, then `design-to-code` to build it
from the component kit, then `a11y-auditor` and `perf-budget`, then
`npm run preflight`. A comp that violates the palette or the visible-resting-state
rule is refused rather than built.
