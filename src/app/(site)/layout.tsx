import { SiteHeader } from '@/components/shell/SiteHeader';
import { Footer } from '@/components/shell/Footer';
import { ToneFrame } from '@/components/shell/ToneFrame';

/**
 * The shared site shell: header, main landmark, footer.
 *
 * Lives in a route group rather than the root layout because `/` is the
 * "rooms on a dial" console, which carries its own header and dock and must
 * not render a second nav or a second set of landmarks. A route group has no
 * URL segment, so every route under it keeps its exact legacy path and
 * trailing slash (CLAUDE.md non-negotiable #4).
 *
 * `/` supplies its own <main id="main"> so the skip link in the root layout
 * still lands somewhere on every route.
 *
 * ToneFrame gives each route its own light-mode shade (src/lib/tones.ts).
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <ToneFrame>
      <SiteHeader />
      <main id="main">{children}</main>
      <Footer />
    </ToneFrame>
  );
}
