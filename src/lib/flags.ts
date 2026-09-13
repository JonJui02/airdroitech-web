/**
 * Build-time feature flags.
 *
 * PROOF_NUMBERS is OFF by default and must stay off until AirdroiTech supplies
 * a real headcount and products-shipped count. The legacy site ships animated
 * counters that land on 0 and 1 — shipping a placeholder figure is worse than
 * shipping no figure. See docs/OPEN-DECISIONS.md items 2 and 4.
 *
 * Turn it on only with real data: NEXT_PUBLIC_FLAG_PROOF_NUMBERS=1
 */

/**
 * ANNIVERSARY is the fifth-year welcome dialog on the homepage. It is
 * DELIBERATELY TEMPORARY and has two independent off switches, so it cannot be
 * forgotten and left running:
 *
 *   1. Kill switch  — set NEXT_PUBLIC_FLAG_ANNIVERSARY=0 in Vercel and redeploy.
 *      No code change, no PR. This is the one to use.
 *
 *   2. Auto-expiry  — set NEXT_PUBLIC_ANNIVERSARY_UNTIL to an ISO date
 *      (e.g. 2026-12-31). After that date the dialog stops rendering on its own.
 *      Unset by default: no end date has been chosen, and inventing one would
 *      be worse than leaving it manual.
 *
 * Both are evaluated at build time, so flipping either needs a redeploy —
 * which Vercel does automatically on any push.
 */
function anniversaryEnabled(): boolean {
  if (process.env.NEXT_PUBLIC_FLAG_ANNIVERSARY === '0') return false;

  const until = process.env.NEXT_PUBLIC_ANNIVERSARY_UNTIL?.trim();
  if (until) {
    const end = new Date(until);
    // An unparseable date must not silently disable the dialog.
    if (!Number.isNaN(end.getTime()) && Date.now() > end.getTime()) return false;
  }

  return true;
}

export const FLAGS = {
  proofNumbers: process.env.NEXT_PUBLIC_FLAG_PROOF_NUMBERS === '1',
  anniversary: anniversaryEnabled(),
} as const;
