import { formatNumber } from '@/lib/utils';
import { StablecoinYieldItem } from '@/lib/stablecoinData';
import RiskBadge, { RiskLevel } from './RiskBadge';
import ProtocolLogoWithFallback from '../ProtocolLogoWithFallback';
import ChainLogo from '../ChainLogo';

interface YieldTableProps {
  yields: StablecoinYieldItem[];
  stablecoin: string;
}

// Risk classification function (same as in data adapter)
function classifyRisk(item: StablecoinYieldItem): RiskLevel {
  const tvl = item.tvl || 0;
  const protocol = item.project.toLowerCase();

  if (
    tvl < 1_000_000 ||
    protocol.includes('experimental') ||
    protocol.includes('test')
  ) {
    return 'high';
  }

  if (
    tvl < 50_000_000 ||
    protocol.includes('v2') ||
    protocol.includes('beta')
  ) {
    return 'medium';
  }

  return 'low';
}

export default function YieldTable({ yields, stablecoin }: YieldTableProps) {
  if (yields.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
        <p className="text-gray-500">
          No {stablecoin} yield opportunities found.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">
          {stablecoin} Yield Opportunities
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          {yields.length} active pools across{' '}
          {new Set(yields.map((y) => y.project)).size} protocols
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <caption className="sr-only">
            {stablecoin} yield farming opportunities with protocol, pool
            strategy, APY rates, TVL, chain, and risk level
          </caption>
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Protocol
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pool/Strategy
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                APY
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                TVL
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Chain
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Risk
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {yields.map((item, index) => {
              const totalApy =
                (parseFloat(item.yield_rate_base) || 0) +
                (parseFloat(item.yield_rate_reward || '0') || 0);
              const baseApy = parseFloat(item.yield_rate_base) || 0;
              const rewardApy = parseFloat(item.yield_rate_reward || '0') || 0;
              const risk = classifyRisk(item);

              return (
                <tr
                  key={item.id || index}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <ProtocolLogoWithFallback
                        protocol={item.project}
                        size={32}
                        className="flex-shrink-0"
                      />
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">
                          {item.project}
                        </div>
                        {item.information && (
                          <div className="text-xs text-gray-500">
                            {item.information}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {stablecoin} Pool
                    </div>
                    <div className="text-xs text-gray-500">
                      {item.chain} Network
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-green-600">
                      {totalApy.toFixed(2)}%
                    </div>
                    <div className="text-xs text-gray-500">
                      Base: {baseApy.toFixed(2)}% | Rewards:{' '}
                      {rewardApy.toFixed(2)}%
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      ${formatNumber(item.tvl)}
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <ChainLogo
                        chain={item.chain}
                        size={20}
                      />
                      <span className="ml-2 text-sm text-gray-900">
                        {item.chain}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <RiskBadge risk={risk} />
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <a
                      href={`/projects/${item.project
                        .toLowerCase()
                        .replace(/\s+/g, '-')}`}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                    >
                      View Details
                    </a>
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
