import Link from 'next/link';
import type { Room } from './rooms';

/**
 * The link from a room to the standalone page it previews.
 *
 * A real anchor, not a room button — it leaves `/` for the page. That also means
 * it works without JavaScript, like the footer links.
 *
 * Renders nothing when the room has no built page, so a room is never pointed at
 * a scaffold stub.
 */
export function RoomReadMore({
  page,
  className = '',
}: {
  page: Room['page'];
  className?: string;
}) {
  if (!page) return null;
  return (
    <Link
      href={page.href}
      className={`inline-flex min-h-tap items-center gap-2 font-semibold text-chrome-link underline decoration-chrome-border [text-underline-offset:5px] transition-colors duration-200 hover:decoration-chrome-link ${className}`}
    >
      {page.label}
      <span aria-hidden="true">→</span>
    </Link>
  );
}
