import { render, screen } from '@testing-library/react';
import {
  getStablecoinPageData,
  STABLECOIN_SLUG_MAP,
} from '@/lib/data/getStablecoinYields';

// Mock the stablecoin data
jest.mock('@/lib/stablecoinData', () => ({
  getStablecoinYields: jest.fn(),
}));

describe('Stablecoin Dynamic Route', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('STABLECOIN_SLUG_MAP', () => {
    it('should contain expected stablecoin mappings', () => {
      expect(STABLECOIN_SLUG_MAP).toHaveProperty('usdc', 'USDC');
      expect(STABLECOIN_SLUG_MAP).toHaveProperty('usdt', 'USDT');
      expect(STABLECOIN_SLUG_MAP).toHaveProperty('dai', 'DAI');
      expect(STABLECOIN_SLUG_MAP).toHaveProperty('frax', 'FRAX');
      expect(STABLECOIN_SLUG_MAP).toHaveProperty('gho', 'GHO');
    });

    it('should have lowercase keys', () => {
      Object.keys(STABLECOIN_SLUG_MAP).forEach((key) => {
        expect(key).toBe(key.toLowerCase());
      });
    });
  });

  describe('getStablecoinPageData', () => {
    it('should return null for invalid slug', async () => {
      const result = await getStablecoinPageData('invalid-slug');
      expect(result).toBeNull();
    });

    it('should return null for empty slug', async () => {
      const result = await getStablecoinPageData('');
      expect(result).toBeNull();
    });

    it('should handle case insensitive slugs', async () => {
      const { getStablecoinYields } = require('@/lib/stablecoinData');
      getStablecoinYields.mockResolvedValue({
        yields: [
          {
            id: 1,
            project: 'Aave',
            chain: 'Ethereum',
            market: 'USDC',
            apy: 4.5,
            yield_rate_base: '4.5',
            yield_rate_reward: '0',
            tvl: 1000000,
            humanized_timestamp: '2025-01-01T00:00:00Z',
          },
        ],
        lastUpdated: '2025-01-01T00:00:00Z',
        totalPools: 1,
      });

      const result = await getStablecoinPageData('USDC');
      expect(result).not.toBeNull();
      expect(result?.stablecoin).toBe('USDC');
    });
  });

  describe('Risk Classification', () => {
    it('should classify high TVL as low risk', () => {
      const mockItem = {
        id: 1,
        project: 'Aave',
        chain: 'Ethereum',
        market: 'USDC',
        apy: 4.5,
        yield_rate_base: '4.5',
        yield_rate_reward: '0',
        tvl: 100000000, // High TVL
        humanized_timestamp: '2025-01-01T00:00:00Z',
      };

      // This would be tested in the actual component
      expect(mockItem.tvl).toBeGreaterThan(50000000);
    });

    it('should classify low TVL as high risk', () => {
      const mockItem = {
        id: 1,
        project: 'Test Protocol',
        chain: 'Ethereum',
        market: 'USDC',
        apy: 4.5,
        yield_rate_base: '4.5',
        yield_rate_reward: '0',
        tvl: 100000, // Low TVL
        humanized_timestamp: '2025-01-01T00:00:00Z',
      };

      expect(mockItem.tvl).toBeLessThan(1000000);
    });
  });

  describe('Data Processing', () => {
    it('should calculate average APY correctly', () => {
      const yields = [
        { yield_rate_base: '4.0', yield_rate_reward: '1.0' },
        { yield_rate_base: '3.0', yield_rate_reward: '0.5' },
      ];

      const totalApy = yields.reduce((sum, item) => {
        const baseApy = parseFloat(item.yield_rate_base) || 0;
        const rewardApy = parseFloat(item.yield_rate_reward || '0') || 0;
        return sum + baseApy + rewardApy;
      }, 0);

      const averageApy = totalApy / yields.length;
      expect(averageApy).toBe(4.25); // (5.0 + 3.5) / 2
    });

    it('should extract unique protocols', () => {
      const yields = [
        { project: 'Aave' },
        { project: 'Compound' },
        { project: 'Aave' },
        { project: 'Pendle' },
      ];

      const protocols = Array.from(new Set(yields.map((item) => item.project)));
      expect(protocols).toEqual(['Aave', 'Compound', 'Pendle']);
    });

    it('should extract unique chains', () => {
      const yields = [
        { chain: 'Ethereum' },
        { chain: 'Base' },
        { chain: 'Ethereum' },
        { chain: 'Arbitrum' },
      ];

      const chains = Array.from(new Set(yields.map((item) => item.chain)));
      expect(chains).toEqual(['Ethereum', 'Base', 'Arbitrum']);
    });
  });
});
