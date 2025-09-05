import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DeFi Yield Farming - Compare All Yield Opportunities',
  description:
    'Discover the best DeFi yield farming opportunities across all protocols. Compare rates, analyze risks, and maximize your returns.',
  keywords: [
    'DeFi yield farming',
    'yield opportunities',
    'DeFi rates',
    'yield comparison',
    'DeFi protocols',
  ],
  openGraph: {
    title: 'DeFi Yield Farming - Compare All Opportunities',
    description:
      'Find the best yield farming opportunities across DeFi protocols. Compare rates and maximize returns.',
    url: 'https://www.tokendataview.com/yield',
  },
  alternates: {
    canonical: '/yield',
  },
};

export default function YieldLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
