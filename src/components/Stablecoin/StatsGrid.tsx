import { formatNumber } from '@/lib/utils';
import RiskBadge, { RiskLevel } from './RiskBadge';

interface StatsGridProps {
  stablecoin: string;
  totalPools: number;
  averageApy: number;
  activeProtocols: string[];
  chainsSupported: string[];
  riskLevel: RiskLevel;
  lastUpdated: string;
  marketCap?: number;
}

export default function StatsGrid({
  stablecoin,
  totalPools,
  averageApy,
  activeProtocols,
  chainsSupported,
  riskLevel,
  lastUpdated,
  marketCap,
}: StatsGridProps) {
  const stats = [
    {
      label: 'Active Pools',
      value: totalPools.toString(),
      description: `${stablecoin} yield opportunities`,
    },
    {
      label: 'Average APY',
      value: `${averageApy.toFixed(2)}%`,
      description: 'Across all protocols',
    },
    {
      label: 'Active Protocols',
      value: activeProtocols.length.toString(),
      description:
        activeProtocols.slice(0, 3).join(', ') +
        (activeProtocols.length > 3 ? '...' : ''),
    },
    {
      label: 'Chains Supported',
      value: chainsSupported.length.toString(),
      description: chainsSupported.join(', '),
    },
    ...(marketCap
      ? [
          {
            label: 'Market Cap',
            value: `$${formatNumber(marketCap)}`,
            description: 'Total market capitalization',
          },
        ]
      : []),
    {
      label: 'Risk Level',
      value: (
        <RiskBadge
          risk={riskLevel}
          showIcon={false}
          tooltip={false}
        />
      ),
      description: 'Overall risk assessment',
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="text-center"
          >
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {typeof stat.value === 'string' ? stat.value : stat.value}
            </div>
            <div className="text-sm font-medium text-gray-600 mb-1">
              {stat.label}
            </div>
            <div className="text-xs text-gray-500">{stat.description}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-center text-sm text-gray-500">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
          Last updated: {lastUpdated}
        </div>
      </div>
    </div>
  );
}
