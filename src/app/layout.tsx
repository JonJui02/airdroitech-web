import type { Metadata, Viewport } from 'next';
import { Archivo, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google';
import { themeInitScript } from '@/lib/theme';
import '@/styles/globals.css';
import { SITE_URL } from '@/lib/site-url';

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

const SITE = SITE_URL;

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
    { media: '(prefers-color-scheme: light)', color: '#F7F9F8' },
    { media: '(prefers-color-scheme: dark)', color: '#0E1411' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-MY" suppressHydrationWarning className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <head>
        {/*
          Restores a stored light/dark choice before first paint, so there is no
          flash of the wrong theme. suppressHydrationWarning on <html> is for
          exactly this: the attribute can differ from the server render.
        */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-teal-600 focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        {/*
          No header/footer here. The site shell lives in (site)/layout.tsx so
          that `/` can render the console without a duplicate nav; every other
          route is inside that group and is unaffected.
        */}
        {children}
      </body>
    </html>
  );
}
