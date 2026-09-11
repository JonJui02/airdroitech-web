---
description: Add a job role to the careers page
argument-hint: "<Role title>" <Engineering|Shared Services>
---

Add a new open role: **$ARGUMENTS**

1. Create `src/content/roles/<slug>.mdx`. The slug is the title lowercased,
   non-alphanumerics collapsed to hyphens. Frontmatter, matching the existing
   files exactly:

   ```yaml
   title:
   slug:
   team:          # Engineering | Shared Services
   location: Shah Alam, Selangor, Malaysia
   type:          # Full-time | Contract | Internship
   seniority:
   posted:        # today, ISO date
   status:        # open | needs-confirmation
   ```

2. Add the slug to `ROLE_SLUGS` in `src/lib/schemas.ts`. The application form's
   `position` field is a `z.enum` over that array — a role missing from it cannot
   be applied for, and the form will reject the submission.

3. If the user supplied a job description, write it into the body under the
   existing headings and set `status: open`. If they did not, leave the `TODO`
   body and set `status: needs-confirmation` — **do not invent
   responsibilities or requirements.**

4. Confirm the roles list, the `/careers/` open-roles count and the form's select
   all pick it up. Run `npm run typecheck`.

To close a role, set `status: closed` rather than deleting the file — its slug
stays valid for anyone holding a link, and `getRoles()` filters it out.
