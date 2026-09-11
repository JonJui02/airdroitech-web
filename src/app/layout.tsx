import type { Metadata, Viewport } from 'next';
import { Archivo, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google';
import { SiteHeader } from '@/components/shell/SiteHeader';
import { Footer } from '@/components/shell/Footer';
import '@/styles/globals.css';

// Self-hosted at build time by next/font: no runtime Google Fonts request, so
// the fonts add no third-party dependency and no PDPA consent question.
// Two families, not the legacy site's three (Inter + Lato + Open Sans, of which
// only Inter was actually applied).
const display = Archivo({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const body = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
});

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://airdroitech.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: 'AirdroiTech Sdn Bhd',
    template: '%s | AirdroiTech',
  },
  description:
    'Software and product development for smart home technologies, business solutions and artificial intelligence. AirdroiTech is Polyaire’s research and development arm in Malaysia.',
  openGraph: {
    type: 'website',
    siteName: 'AirdroiTech Sdn Bhd',
    locale: 'en_MY',
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F5F6F7' },
    { media: '(prefers-color-scheme: dark)', color: '#0E1411' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-MY" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-teal-600 focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
