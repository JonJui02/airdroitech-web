# DNS cutover runbook

**A human executes every step here.** No agent in this repo changes DNS. Use
`/launch-check` for a read-only readiness report.

---

## Read this first

Company email for `airdroitech.com` is routed through **Proofpoint**. Every form
on the site delivers to `info@airdroitech.com`.

A careless cutover — for example moving the domain's nameservers to Vercel
without recreating every record — will **silently stop all inbound mail**. No
bounce, no error page, just missing mail.

**Therefore: keep DNS hosting exactly where it is and change only the two
records that point at the web server. Do not delegate nameservers to Vercel.**

---

## Current state, measured 11 Sep 2026

| Record | Value | Action |
|---|---|---|
| `A` apex | `110.232.143.13` | **Change** to the A value Vercel shows for the project |
| `A` `www` | `110.232.143.13` | **Change** to a `CNAME` at the Vercel target |
| `NS` | `ns1.syd6.hostingplatform.net.au`, `ns2.syd6.hostingplatform.net.au` | **Leave** |
| `MX` | `10 mxa-009aec01.gslb.pphosted.com`, `10 mxb-009aec01.gslb.pphosted.com` | **Leave — mail depends on it** |
| `TXT` SPF | `v=spf1 include:spf-009aec01.pphosted.com ~all` | **Leave**, extend only if Resend sends from the apex (it should not) |
| `TXT` other | `anthropic-domain-verification-…` | **Leave** |
| DKIM / DMARC | not yet enumerated | **Inventory before cutover** |

Take a **full zone export** from the hosting control panel before any change and
paste it into the cutover ticket. The table above is what public DNS answers; it
is not proof the zone contains nothing else.

---

## Runbook

1. **Export the zone.** Full record dump from the control panel, attached to the
   ticket. This is the rollback artefact.

2. **Add the domain in Vercel** as `airdroitech.com` and `www.airdroitech.com`.
   Note the exact `A` / `CNAME` targets Vercel displays. **Use those values, not
   any value written in a document** — Vercel's published targets change.

3. **Verify on a staging hostname first.** Point something like
   `new.airdroitech.com` at the Vercel project and confirm TLS issues and all
   ten routes resolve, while production is still live.

4. **Drop TTL to 300 seconds** on the apex `A` and the `www` record, at least
   24 hours ahead, so a rollback propagates in minutes.

5. **Cut over in a low-traffic window.** Malaysian night is Australian early
   morning, so pick a time that suits both — early hours MYT. Change the apex
   `A`, replace the `www` `A` with the `CNAME`. **Touch nothing else.**

6. **Confirm the certificate issued** in Vercel, and that both apex and `www`
   serve over HTTPS with the redirect going one consistent direction.

7. **Walk all ten URLs** from `src/app/sitemap.ts` on the live domain, on a phone
   and a laptop, plus `/sitemap.xml` and `/robots.txt`.

8. **Send one real enquiry and one real application** through the live forms and
   confirm both land in `info@airdroitech.com`, with the CV link working. *This
   is the check most likely to fail, because it depends on mail, not on DNS
   pointing at the right web server.*

9. **Verify mail still flows inbound** — send from an external address to
   `info@airdroitech.com`. Confirm MX is unchanged with a direct lookup.

10. **Submit the sitemap** in Search Console and check the coverage report for
    404s daily for a week.

11. **Restore TTLs** after 48 stable hours. Keep the WordPress instance running
    but unlinked for 30 days.

---

## Rollback

Revert the apex `A` and the `www` record to `110.232.143.13`. At a 300-second TTL
the old site is back within minutes, because WordPress was never switched off.

The rollback being this cheap is what makes the cutover safe.

---

## Pre-cutover gate

Do not begin step 5 until all of these are true:

- [ ] Full zone export attached to the ticket
- [ ] DKIM and DMARC enumerated, not assumed absent
- [ ] Staging hostname served all ten routes over valid TLS
- [ ] TTLs at 300 s for at least 24 h
- [ ] Phase 6 sign-off on the Vercel preview URL
- [ ] A named human at the DNS host scheduled for the window
- [ ] Resend verified on `mail.airdroitech.com`, **not** the apex
- [ ] Forms tested end-to-end on the preview deployment, CV link working
