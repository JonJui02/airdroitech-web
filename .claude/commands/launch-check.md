---
description: Read-only cutover readiness report — DNS state, route parity, mail risk
---

Produce a cutover readiness report for airdroitech.com.

Run `cutover-guard` and `seo-parity` and relay their verdicts.

Cover:

1. **Current DNS state** — apex A, `www`, NS, MX, SPF and any other TXT, plus
   DKIM and DMARC. Report `UNKNOWN` for anything not actually looked up; do not
   assume a record is absent because a lookup returned nothing.

2. **Route parity** — all ten legacy URLs resolve on the preview deployment,
   with titles, descriptions and canonicals.

3. **Mail risk** — restate that DNS stays at
   `ns1/ns2.syd6.hostingplatform.net.au`, that only the apex A and `www` change,
   and that MX/SPF/DKIM/DMARC are untouched. Company mail runs through Proofpoint
   and every form on the site delivers to `info@airdroitech.com`.

4. **Blocking items** — the zone export, phase 6 sign-off, the staging-hostname
   test, TTL reduction, and a named human at the DNS host scheduled for the
   window.

Finish with `GO` or `NO-GO`. Never `GO` while the zone export or the live form
deliverability test is missing.

**This command changes nothing.** It runs lookups and reads pages. A human
executes every step of `docs/DNS-CUTOVER.md`.
