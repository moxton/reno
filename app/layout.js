import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  title: {
    default: 'Home Project Cost Guide - Know What It Costs Before You Call',
    template: '%s | Home Project Cost Guide',
  },
  description:
    'Free, research-backed cost guides and calculators for 200+ home improvement projects. Get accurate cost estimates before hiring a contractor.',
  metadataBase: new URL('https://homeprojectcostguide.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Home Project Cost Guide',
    images: [{ url: '/og-image.svg', width: 1200, height: 630, alt: 'Home Project Cost Guide' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-image.svg'],
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-touch-icon.svg',
  },
  manifest: '/manifest.json',
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Home Project Cost Guide',
  url: 'https://homeprojectcostguide.com',
  logo: 'https://homeprojectcostguide.com/favicon.svg',
  description:
    'Free, research-backed cost guides and calculators for 200+ home improvement projects.',
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Home Project Cost Guide',
  url: 'https://homeprojectcostguide.com',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://homeprojectcostguide.com/projects/?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1B2A4A',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="font-body antialiased min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
