import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GoogleAnalytics from '@/components/GoogleAnalytics';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'DeFi Lending Dashboard - Best Stablecoin Yields & APY Rates',
    template: '%s | DeFi Lending Dashboard',
  },
  description:
    'Discover the best DeFi lending opportunities with up to 15% APY on stablecoins. Compare USDC, USDT yields across Aave, Compound, and other protocols. Real-time data and comprehensive yield farming insights.',
  keywords: [
    'DeFi lending',
    'stablecoin yields',
    'USDC APY',
    'USDT APY',
    'yield farming',
    'DeFi protocols',
    'Aave',
    'Compound',
    'lending rates',
    'crypto yields',
    'stablecoin lending',
    'DeFi dashboard',
  ],
  authors: [{ name: 'DeFi Lending Dashboard' }],
  creator: 'DeFi Lending Dashboard',
  publisher: 'DeFi Lending Dashboard',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.tokendataview.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.tokendataview.com',
    title: 'DeFi Lending Dashboard - Best Stablecoin Yields & APY Rates',
    description:
      'Discover the best DeFi lending opportunities with up to 15% APY on stablecoins. Compare USDC, USDT yields across Aave, Compound, and other protocols.',
    siteName: 'DeFi Lending Dashboard',
    images: [
      {
        url: '/og-image.jpg', // You'll need to create this
        width: 1200,
        height: 630,
        alt: 'DeFi Lending Dashboard - Compare Stablecoin Yields',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DeFi Lending Dashboard - Best Stablecoin Yields & APY Rates',
    description:
      'Discover the best DeFi lending opportunities with up to 15% APY on stablecoins.',
    images: ['/og-image.jpg'], // Same as OpenGraph
    creator: '@defilending', // Update with your Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // Add your Google Search Console verification
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#3B82F6' },
    ],
  },
  manifest: '/site.webmanifest',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to external domains for performance */}
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://defi-dashboard-99d015fc546e.herokuapp.com"
        />

        {/* DNS prefetch for performance */}
        <link
          rel="dns-prefetch"
          href="//www.google-analytics.com"
        />

        {/* Structured Data for Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'DeFi Lending Dashboard',
              url: 'https://www.tokendataview.com',
              logo: 'https://www.tokendataview.com/logo.png',
              description:
                'Comprehensive DeFi lending platform for comparing stablecoin yields and APY rates',
              sameAs: [
                'https://twitter.com/defilending',
                'https://github.com/defilending',
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'customer service',
                email: 'support@tokendataview.com',
              },
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
        <GoogleAnalytics gaId="G-017T9RC5Z4" />
      </body>
    </html>
  );
}
