import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import matter from 'gray-matter';

/**
 * Reads src/content/roles/*.mdx at build time. One file per open role.
 *
 * This is the single source of truth for: the roles list on
 * /careers/open-positions/, the "open roles" count on /careers/, the
 * application form's position select, and the JobPosting structured data.
 * Adding a role is one new MDX file plus its slug in ROLE_SLUGS.
 */

const DIR = join(process.cwd(), 'src/content/roles');

export type RoleStatus = 'open' | 'needs-confirmation' | 'closed';

export interface Role {
  slug: string;
  title: string;
  team: string;
  location: string;
  type: string;
  seniority: string;
  posted: string;
  status: RoleStatus;
  body: string;
}

export function getRoles(): Role[] {
  return readdirSync(DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => {
      const parsed = matter(readFileSync(join(DIR, f), 'utf8'));
      const data = parsed.data as Omit<Role, 'slug' | 'body'>;
      return { ...data, slug: f.replace(/\.mdx$/, ''), body: parsed.content };
    })
    .filter((r) => r.status !== 'closed')
    .sort((a, b) => a.team.localeCompare(b.team) || a.title.localeCompare(b.title));
}

export function getRole(slug: string): Role | undefined {
  return getRoles().find((r) => r.slug === slug);
}

/** Grouped for the two-column list the skeleton specifies. */
export function getRolesByTeam(): Record<string, Role[]> {
  return getRoles().reduce<Record<string, Role[]>>((acc, role) => {
    (acc[role.team] ??= []).push(role);
    return acc;
  }, {});
}
