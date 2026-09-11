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
export const FLAGS = {
  proofNumbers: process.env.NEXT_PUBLIC_FLAG_PROOF_NUMBERS === '1',
} as const;
