import Link from 'next/link';
import { BrandLogo } from '@/components/shell/BrandLogo';
import { ThemeToggle } from '@/components/shell/ThemeToggle';

/**
 * The console's top bar: the logo and the theme switch, nothing else.
 *
 * Room navigation lives on the dial alone (design review, 2026-09-28: one
 * navigation on the homepage, not three), so this bar carries no room cells.
 */
export function RoomHeader({ compact = false }: { compact?: boolean }) {
  return (
    <header
      className={`relative z-[3] flex flex-none items-center justify-between border-b border-chrome-line ${
        compact ? 'min-h-[56px] px-[20px]' : 'min-h-[64px] px-[32px]'
      }`}
    >
      <Link href="/" aria-label="AirdroiTech home" className="flex min-h-tap items-center">
        <BrandLogo height={compact ? '22px' : '26px'} />
      </Link>
      <ThemeToggle className="-mr-2 text-chrome-body hover:text-chrome-link" />
    </header>
  );
}
