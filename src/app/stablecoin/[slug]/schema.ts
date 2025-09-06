// JSON-LD schema builders for stablecoin pages

import { StablecoinPageData } from '@/lib/data/getStablecoinYields';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

// Build breadcrumb schema
export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      ...(item.href && { item: `https://www.tokendataview.com${item.href}` }),
    })),
  };
}

// Build dataset schema for the yield table
export function buildDatasetSchema(data: StablecoinPageData, slug: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: `${data.stablecoin} Yield Farming Data`,
    description: `Real-time ${data.stablecoin} yield farming opportunities across DeFi protocols with APY rates, TVL, and risk assessments`,
    url: `https://www.tokendataview.com/stablecoin/${slug}`,
    keywords: [
      data.stablecoin.toLowerCase(),
      'yield farming',
      'DeFi',
      'APY',
      'lending',
      'stablecoin',
      'cryptocurrency',
    ],
    temporalCoverage: data.lastUpdated,
    distribution: {
      '@type': 'DataDownload',
      encodingFormat: 'application/json',
      contentUrl: `https://www.tokendataview.com/api/stablecoin-yields?filter=${data.stablecoin}`,
    },
    variableMeasured: [
      {
        '@type': 'PropertyValue',
        name: 'Protocol',
        description: 'DeFi protocol name',
      },
      {
        '@type': 'PropertyValue',
        name: 'Pool Strategy',
        description: 'Yield farming strategy or pool type',
      },
      {
        '@type': 'PropertyValue',
        name: 'APY Base',
        description: 'Base annual percentage yield',
        unitCode: 'P1',
      },
      {
        '@type': 'PropertyValue',
        name: 'APY Reward',
        description: 'Additional reward APY',
        unitCode: 'P1',
      },
      {
        '@type': 'PropertyValue',
        name: 'TVL USD',
        description: 'Total value locked in USD',
        unitCode: 'USD',
      },
      {
        '@type': 'PropertyValue',
        name: 'Chain',
        description: 'Blockchain network',
      },
      {
        '@type': 'PropertyValue',
        name: 'Risk Level',
        description: 'Risk assessment (low/medium/high)',
      },
    ],
    numberOfItems: data.totalPools,
  };
}

// Build item list schema for top pools
export function buildItemListSchema(data: StablecoinPageData, slug: string) {
  const topPools = data.yields
    .sort((a, b) => (b.tvl || 0) - (a.tvl || 0))
    .slice(0, 10);

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Top 10 ${data.stablecoin} Yield Pools by TVL`,
    description: `Highest TVL ${data.stablecoin} yield farming opportunities`,
    url: `https://www.tokendataview.com/stablecoin/${slug}`,
    numberOfItems: topPools.length,
    itemListElement: topPools.map((pool, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: `${pool.project} ${data.stablecoin} Pool`,
      description: `${data.stablecoin} yield farming on ${pool.project} - ${(
        (parseFloat(pool.yield_rate_base) || 0) +
        (parseFloat(pool.yield_rate_reward || '0') || 0)
      ).toFixed(2)}% APY`,
      url: `https://www.tokendataview.com/projects/${pool.project
        .toLowerCase()
        .replace(/\s+/g, '-')}`,
      additionalProperty: [
        {
          '@type': 'PropertyValue',
          name: 'APY',
          value: `${(
            (parseFloat(pool.yield_rate_base) || 0) +
            (parseFloat(pool.yield_rate_reward || '0') || 0)
          ).toFixed(2)}%`,
        },
        {
          '@type': 'PropertyValue',
          name: 'TVL',
          value: `$${(pool.tvl || 0).toLocaleString()}`,
        },
        {
          '@type': 'PropertyValue',
          name: 'Chain',
          value: pool.chain,
        },
      ],
    })),
  };
}

// Build FAQ page schema
export function buildFAQSchema(
  faqs: Array<{ question: string; answer: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

// Build web page schema
export function buildWebPageSchema(data: StablecoinPageData, slug: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${data.stablecoin} Yield Comparison | Best ${data.stablecoin} APY 2025 (DeFi)`,
    description: `Live ${data.stablecoin} yields across Aave, Compound, Pendle, Maker and more — base vs reward APY, TVL, chains, risk. Updated frequently.`,
    url: `https://www.tokendataview.com/stablecoin/${slug}`,
    mainEntity: {
      '@type': 'Dataset',
      name: `${data.stablecoin} Yield Farming Data`,
      description: `Real-time ${data.stablecoin} yield farming opportunities`,
    },
    dateModified: data.lastUpdated,
    isPartOf: {
      '@type': 'WebSite',
      name: 'TokenDataView',
      url: 'https://www.tokendataview.com',
    },
  };
}
