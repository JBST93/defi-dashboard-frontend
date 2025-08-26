'use client';

import { useState, useEffect } from 'react';

interface YieldOpportunity {
  project: string;
  chain: string;
  market: string;
  yield_rate_base: string;
  yield_rate_reward?: string;
  tvl: number;
}

interface WalletYieldOpportunitiesProps {
  assets: {
    token: string;
    balance: string;
    value: string;
    bestYields?: {
      project: string;
      chain: string;
      yield_rate_base: string;
      yield_rate_reward?: string;
      tvl: number;
    }[];
  }[];
}

export default function WalletYieldOpportunities({
  assets,
}: WalletYieldOpportunitiesProps) {
  const [yieldOpportunities, setYieldOpportunities] = useState<
    Record<string, YieldOpportunity[]>
  >({});
  const [userReserves, setUserReserves] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch yield opportunities
        const yieldResponse = await fetch(
          'https://defi-dashboard-99d015fc546e.herokuapp.com/api/yield_rates'
        );
        if (!yieldResponse.ok) throw new Error('Failed to fetch yield data');
        const yieldData = await yieldResponse.json();

        // Fetch AAVE lending positions using UiPoolDataProvider
        const aaveResponse = await fetch(
          'https://defi-dashboard-99d015fc546e.herokuapp.com/api/aave/user_reserves'
        );
        if (!aaveResponse.ok) throw new Error('Failed to fetch AAVE data');
        const aaveData = await aaveResponse.json();

        // Process yield opportunities
        const opportunities: Record<string, YieldOpportunity[]> = {};
        yieldData.forEach((item: YieldOpportunity) => {
          const token = item.market
            .split('-')[0]
            .replace(/^a/i, '')
            .toUpperCase();
          if (!opportunities[token]) {
            opportunities[token] = [];
          }
          opportunities[token].push(item);
        });

        // Sort by total yield rate
        Object.keys(opportunities).forEach((token) => {
          opportunities[token].sort((a, b) => {
            const aYield =
              parseFloat(a.yield_rate_base) +
              (parseFloat(a.yield_rate_reward || '0') || 0);
            const bYield =
              parseFloat(b.yield_rate_base) +
              (parseFloat(b.yield_rate_reward || '0') || 0);
            return bYield - aYield;
          });
        });

        setYieldOpportunities(opportunities);
        setUserReserves(aaveData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">
        Current Positions & Opportunities
      </h2>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                Token
              </th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">
                Balance
              </th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">
                Current APY
              </th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">
                Best Available APY
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                Best Project
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                Chain
              </th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">
                TVL
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {assets.map((asset, index) => {
              const bestYield =
                asset.bestYields?.[0] || yieldOpportunities[asset.token]?.[0];
              const userReserve = userReserves.find(
                (r) => r.underlyingAsset === asset.token
              );
              const currentYield = userReserve?.liquidityRate
                ? (parseFloat(userReserve.liquidityRate) / 1e27).toFixed(2) +
                  '%'
                : '-';

              return (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">
                      {asset.token}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right font-mono text-gray-900">
                    {asset.balance}
                  </td>
                  <td className="px-6 py-4 text-right font-mono text-blue-600">
                    {currentYield}
                  </td>
                  <td className="px-6 py-4 text-right font-mono text-green-600">
                    {bestYield
                      ? (
                          parseFloat(bestYield.yield_rate_base) +
                          (bestYield.yield_rate_reward
                            ? parseFloat(bestYield.yield_rate_reward)
                            : 0)
                        ).toFixed(2) + '%'
                      : 'N/A'}
                  </td>
                  <td className="px-6 py-4 text-gray-900">
                    {bestYield ? bestYield.project : 'N/A'}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-amber-100 rounded-full text-xs text-amber-800">
                      {bestYield ? bestYield.chain : 'N/A'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-mono text-gray-900">
                    {bestYield
                      ? `$${Math.round(bestYield.tvl).toLocaleString()}`
                      : 'N/A'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
