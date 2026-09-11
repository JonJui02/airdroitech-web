# Open decisions

Three are settled. The rest block the content phase — worth answering before the
build starts rather than during it. No agent in this repo may invent an answer to
anything marked **NEEDED**.

## Settled

| Question | Decision |
|---|---|
| Content model | MDX in-repo. `src/content/pages/`, `src/content/roles/`. Edit, commit, Vercel deploys. No CMS. |
| Form handling | Vercel serverless functions + Resend (email) + Vercel Blob (CV storage). |
| Brand palette | The four logo colours. See `docs/BRAND.md`. |

## Needed — blocks the content phase

| # | Question | Blocks |
|---|---|---|
| 1 | **Real team names, titles and photos** for the four leadership cards — or a decision to drop the individual cards and keep only the group list. Live site currently shows `MothR`, `FathR`, `STL`, and one card with a role and bio but no name. | About |
| 2 | **Actual headcount**, and whether the counters stay at all. Live counters read `0` on About and `1` on Careers, with a stray `500` beside one. | Home, About, Careers |
| 3 | **Where "Order Now" on AirTouch Beam should go** — Polyaire store, distributor locator, or an enquiry form. ADT runs no commerce. | Beam page |
| 4 | **Are all eight listed roles still open**, and is there a job description per role to publish? All eight MDX files are `status: needs-confirmation` with `TODO` bodies. | Careers, Open positions |
| 5 | **Newsletter list** — keep it, and if so which provider replaces the popup plugin? "Sign up for News" currently appears as bare text on two pages. | Forms |
| 6 | **Where CV files may legally be stored, and for how long**, under Malaysia's PDPA. Vercel Blob's region matters. No real applicant data should land in Blob before this is answered. | Forms |
| 7 | **Analytics and consent** — cookieless Vercel Analytics only, or something that needs a banner? | Foundation |

## Confirm

| # | Question | Blocks |
|---|---|---|
| 8 | Who administers DNS at the Australian host (`ns1/ns2.syd6.hostingplatform.net.au`), and can they be scheduled for the cutover window? | Cutover |
| 9 | Is a phone number publishable on Contact? | Contact |
| 10 | Does a brand guideline exist that specifies a typeface, overriding the Archivo / IBM Plex pairing? | Foundation |
| 11 | Vector logo — can design supply an SVG, or should 2.0 redraw the raster? Both supplied files are PNG, and the header version is scaled to 300×72 in the browser. | Assets |
| 12 | Are DKIM and DMARC records present on the domain? Not yet enumerated; needed before the cutover ticket is complete. | Cutover |

## Also worth resolving

- The homepage and About give slightly different strings for the same office
  address. Pick one and use it everywhere.
- The nav says "About" but the URL is `/what-we-do/`; the nav says "Career"
  (singular) but the URL is `/careers/`. URLs stay — this is only a labelling
  consistency question.
