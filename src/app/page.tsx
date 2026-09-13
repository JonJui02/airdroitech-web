import type { Metadata } from 'next';
import { RoomShell } from '@/components/rooms/RoomShell';
import { AnniversaryDialog } from '@/components/anniversary/AnniversaryDialog';
import { FLAGS } from '@/lib/flags';
import { getRoles } from '@/lib/roles';

/**
 * Route: /  — the "rooms on a dial" console.
 *
 * A thin server component: it reads the roles at build time and hands them to
 * the client shell. Metadata and canonical are unchanged from the previous
 * homepage.
 *
 * The site header and footer are NOT rendered here. They live in
 * src/app/(site)/layout.tsx, which wraps every other route; the console
 * supplies its own header, dock and <main id="main"> landmark.
 *
 * AnniversaryDialog is TEMPORARY — homepage only, once per visitor, and gated
 * on FLAGS.anniversary so it can be switched off from Vercel without a code
 * change. See src/lib/flags.ts. When it is retired, delete these two lines and
 * the component directory; nothing else references it.
 */
export const metadata: Metadata = {
  title: 'AirdroiTech Sdn Bhd',
  description:
    'Software and product development for smart home technologies, business solutions and artificial intelligence. AirdroiTech is the R&D and software arm of the Polyaire Group, working from Shah Alam, Selangor.',
  alternates: { canonical: '/' },
};

export default function Page() {
  return (
    <>
      <RoomShell roles={getRoles()} />
      {FLAGS.anniversary && <AnniversaryDialog />}
    </>
  );
}
