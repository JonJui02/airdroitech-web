/**
 * Lets anything on the page open the fifth-year dialog without the two
 * components needing to share state through RoomShell, which sits between them
 * and has nothing to do with the anniversary.
 *
 * TEMPORARY, like the rest of src/components/anniversary — see src/lib/flags.ts.
 */

export const ANNIVERSARY_OPEN_EVENT = 'adt:anniversary:open';

/**
 * Opens the dialog on demand.
 *
 * Deliberately ignores the "already seen" and "don't show again" storage: those
 * suppress the *automatic* appearance. Someone clicking the gift box is asking
 * for it, and must always get it.
 */
export function openAnniversary(): void {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(ANNIVERSARY_OPEN_EVENT));
}
