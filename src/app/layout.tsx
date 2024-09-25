import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import GoogleAnalytics from '@/components/GoogleAnalytics';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TokenDataView',
  description: 'Your one-stop shop for token data and yield farming insights',
  viewport: 'width=device-width, initial-scale=1', // Include viewport meta tag here
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>
        <GoogleAnalytics gaId="G-017T9RC5Z4" />
      </body>
    </html>
  );
}
