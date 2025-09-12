// Server-side data fetching for stablecoin yields
// This file contains functions that can be used in server components

export interface StablecoinYieldItem {
  id: number;
  project: string;
  chain: string;
  market: string;
  apy: number;
  yield_rate_base: string;
  yield_rate_reward?: string;
  tvl: number;
  humanized_timestamp: string;
  information?: string;
  index?: number;
}

export interface StablecoinData {
  yields: StablecoinYieldItem[];
  lastUpdated: string;
  totalPools: number;
}

// Cache configuration
const CACHE_DURATION = 1 * 60 * 1000; // 1 minute in milliseconds
const cache = new Map<string, { data: StablecoinData; timestamp: number }>();

export async function getStablecoinYields(): Promise<StablecoinData> {
  const cacheKey = 'stablecoin-yields';
  const now = Date.now();

  // Check cache first
  const cached = cache.get(cacheKey);
  if (cached && now - cached.timestamp < CACHE_DURATION) {
    console.log('Returning cached stablecoin data');
    return cached.data;
  }

  try {
    console.log('Fetching fresh stablecoin data from API');
    const res = await fetch(
      'https://defi-dashboard-99d015fc546e.herokuapp.com/api/yield_rates',
      {
        next: { revalidate: 300 }, // 5 minutes revalidation
        headers: {
          'User-Agent': 'TokenDataView/1.0',
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch yield rates: ${res.status}`);
    }

    const allData = await res.json();

    // Define stablecoin markets to filter for
    const stablecoinMarkets = [
      'USDC',
      'USDT',
      'DAI',
      'BUSD',
      'TUSD',
      'USDP',
      'FRAX',
      'LUSD',
      'sUSD',
      'GUSD',
      'USDD',
      'DUSD',
      'FEI',
      'RAI',
      'MIM',
      'UST',
      'USTC',
      'USN',
      'eUSD',
      'USDe',
      'crvUSD',
      'GHO',
      'FXUSD',
      'sDAI',
      'wUSDM',
      'USR',
      'EURe',
    ];

    // Filter for stablecoin markets only and exclude 0% yield pools
    const stablecoinData = allData
      .filter(
        (item: any) =>
          stablecoinMarkets.includes(item.market) &&
          parseFloat(item.yield_rate_base) > 0
      )
      .map((item: any, index: number) => ({
        ...item,
        index: index + 1,
      }))
      .sort((a: any, b: any) => (b.tvl || 0) - (a.tvl || 0));

    const result: StablecoinData = {
      yields: stablecoinData,
      lastUpdated:
        stablecoinData.length > 0
          ? stablecoinData[0].humanized_timestamp
          : new Date().toISOString(),
      totalPools: stablecoinData.length,
    };

    // Cache the result
    cache.set(cacheKey, { data: result, timestamp: now });

    return result;
  } catch (error) {
    console.error('Error fetching stablecoin yields:', error);

    // Return fallback data if available in cache
    if (cached) {
      console.log('Returning stale cached data due to error');
      return cached.data;
    }

    // Return empty data as last resort
    return {
      yields: [],
      lastUpdated: new Date().toISOString(),
      totalPools: 0,
    };
  }
}

// Get top N yields for server-side rendering
export async function getTopStablecoinYields(
  limit: number = 10
): Promise<StablecoinYieldItem[]> {
  const data = await getStablecoinYields();
  return data.yields.slice(0, limit);
}

// Cache invalidation function
export function invalidateStablecoinCache() {
  cache.clear();
}

// Get unique values for filters
export async function getStablecoinFilterOptions() {
  // Force cache refresh to ensure we get latest data including Maple
  invalidateStablecoinCache();
  const data = await getStablecoinYields();

  const uniqueChains = Array.from(
    new Set(data.yields.map((item) => item.chain))
  );
  const uniqueProjects = Array.from(
    new Set(data.yields.map((item) => item.project))
  );
  const uniqueStablecoins = Array.from(
    new Set(data.yields.map((item) => item.market))
  );

  return {
    chains: uniqueChains,
    projects: uniqueProjects,
    stablecoins: uniqueStablecoins,
  };
}
