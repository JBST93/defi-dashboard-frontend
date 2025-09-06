// Server-side data adapter for individual stablecoin yields
// Reuses the existing stablecoin API with filtering

import { getStablecoinYields } from '@/lib/stablecoinData';
import { StablecoinYieldItem } from '@/lib/stablecoinData';

export interface StablecoinPageData {
  stablecoin: string;
  yields: StablecoinYieldItem[];
  lastUpdated: string;
  totalPools: number;
  averageApy: number;
  activeProtocols: string[];
  chainsSupported: string[];
  riskLevel: 'low' | 'medium' | 'high';
  marketCap?: number;
}

// Canonical mapping from URL slugs to API filter values
export const STABLECOIN_SLUG_MAP: Record<string, string> = {
  usdc: 'USDC',
  usdt: 'USDT',
  dai: 'DAI',
  frax: 'FRAX',
  gho: 'GHO',
  lusd: 'LUSD',
  eusd: 'eUSD',
  usde: 'USDe',
  crvusd: 'crvUSD',
  fxusd: 'FXUSD',
  sda: 'sDAI',
  wsteth: 'wstETH',
  weth: 'WETH',
  wbtc: 'WBTC',
  eth: 'ETH',
  btc: 'BTC',
};

// Risk classification based on protocol and TVL
function classifyRisk(item: StablecoinYieldItem): 'low' | 'medium' | 'high' {
  const tvl = item.tvl || 0;
  const protocol = item.project.toLowerCase();

  // High risk: Low TVL or experimental protocols
  if (
    tvl < 1_000_000 ||
    protocol.includes('experimental') ||
    protocol.includes('test')
  ) {
    return 'high';
  }

  // Medium risk: Medium TVL or newer protocols
  if (
    tvl < 50_000_000 ||
    protocol.includes('v2') ||
    protocol.includes('beta')
  ) {
    return 'medium';
  }

  // Low risk: High TVL and established protocols
  return 'low';
}

// Calculate average APY for a stablecoin
function calculateAverageApy(yields: StablecoinYieldItem[]): number {
  if (yields.length === 0) return 0;

  const totalApy = yields.reduce((sum, item) => {
    const baseApy = parseFloat(item.yield_rate_base) || 0;
    const rewardApy = parseFloat(item.yield_rate_reward || '0') || 0;
    return sum + baseApy + rewardApy;
  }, 0);

  return totalApy / yields.length;
}

// Get unique protocols from yields
function getActiveProtocols(yields: StablecoinYieldItem[]): string[] {
  const protocols = new Set(yields.map((item) => item.project));
  return Array.from(protocols).sort();
}

// Get unique chains from yields
function getChainsSupported(yields: StablecoinYieldItem[]): string[] {
  const chains = new Set(yields.map((item) => item.chain));
  return Array.from(chains).sort();
}

// Determine overall risk level for the stablecoin
function determineOverallRisk(
  yields: StablecoinYieldItem[]
): 'low' | 'medium' | 'high' {
  if (yields.length === 0) return 'high';

  const riskCounts = yields.reduce(
    (counts, item) => {
      const risk = classifyRisk(item);
      counts[risk]++;
      return counts;
    },
    { low: 0, medium: 0, high: 0 }
  );

  // If majority are low risk, overall is low
  if (riskCounts.low > riskCounts.medium && riskCounts.low > riskCounts.high) {
    return 'low';
  }

  // If majority are high risk, overall is high
  if (riskCounts.high > riskCounts.medium && riskCounts.high > riskCounts.low) {
    return 'high';
  }

  // Otherwise medium
  return 'medium';
}

export async function getStablecoinPageData(
  slug: string
): Promise<StablecoinPageData | null> {
  try {
    // Get the stablecoin name from slug
    const stablecoin = STABLECOIN_SLUG_MAP[slug.toLowerCase()];
    if (!stablecoin) {
      return null;
    }

    // Fetch all stablecoin data
    const allData = await getStablecoinYields();

    // Filter for the specific stablecoin
    const filteredYields = allData.yields.filter(
      (item) => item.market === stablecoin
    );

    if (filteredYields.length === 0) {
      return null;
    }

    // Calculate derived data
    const averageApy = calculateAverageApy(filteredYields);
    const activeProtocols = getActiveProtocols(filteredYields);
    const chainsSupported = getChainsSupported(filteredYields);
    const riskLevel = determineOverallRisk(filteredYields);

    return {
      stablecoin,
      yields: filteredYields,
      lastUpdated: allData.lastUpdated,
      totalPools: filteredYields.length,
      averageApy,
      activeProtocols,
      chainsSupported,
      riskLevel,
      // Market cap would come from a separate API if available
      marketCap: undefined,
    };
  } catch (error) {
    console.error('Error fetching stablecoin page data:', error);
    return null;
  }
}

// Get all available stablecoin slugs for sitemap generation
export function getAllStablecoinSlugs(): string[] {
  return Object.keys(STABLECOIN_SLUG_MAP);
}
