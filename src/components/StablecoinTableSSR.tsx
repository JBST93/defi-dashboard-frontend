import { StablecoinYieldItem } from '@/lib/stablecoinData';
import { formatNumber } from '@/lib/utils';
import ChainLogo from './ChainLogo';
import ProtocolLogoWithFallback from './ProtocolLogoWithFallback';

interface StablecoinTableSSRProps {
  yields: StablecoinYieldItem[];
  lastUpdated: string;
  showSkeletons?: boolean;
  skeletonCount?: number;
  sortColumn?: 'apy' | 'tvl' | 'yield_rate_base' | 'yield_rate_reward' | null;
  sortDirection?: 'asc' | 'desc';
  onSort?: (
    column: 'apy' | 'tvl' | 'yield_rate_base' | 'yield_rate_reward'
  ) => void;
}

export default function StablecoinTableSSR({
  yields,
  lastUpdated,
  showSkeletons = false,
  skeletonCount = 5,
  sortColumn = null,
  sortDirection = 'desc',
  onSort,
}: StablecoinTableSSRProps) {
  // Helper function to render sortable header
  const renderSortableHeader = (
    column: 'apy' | 'tvl' | 'yield_rate_base' | 'yield_rate_reward',
    label: string,
    widthClass: string = ''
  ) => {
    const isActive = sortColumn === column;
    const isAsc = sortDirection === 'asc';

    return (
      <th
        className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 select-none ${widthClass}`}
        onClick={() => onSort?.(column)}
      >
        <div className="flex items-center space-x-1">
          <span>{label}</span>
          {isActive && (
            <span className="text-gray-400">{isAsc ? '↑' : '↓'}</span>
          )}
        </div>
      </th>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
      {/* Header */}
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            Stablecoin Yield Farming Opportunities
          </h2>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Last updated: {lastUpdated}</span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full table-fixed">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
                #
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                Project
              </th>
              {renderSortableHeader('apy', 'APY', 'w-20')}
              {renderSortableHeader('tvl', 'TVL', 'w-24')}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
                Chain
              </th>
              {renderSortableHeader('yield_rate_base', 'Base APY', 'w-20')}
              {renderSortableHeader('yield_rate_reward', 'Reward APY', 'w-20')}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {yields.map((yieldItem, index) => (
              <tr
                key={yieldItem.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {index + 1}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-semibold text-blue-600">
                        {yieldItem.market.charAt(0)}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {yieldItem.market}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="max-w-32">
                    <div
                      className="text-sm font-medium text-gray-900 truncate"
                      title={yieldItem.project}
                    >
                      {yieldItem.project}
                    </div>
                    {yieldItem.information && (
                      <div
                        className="text-xs text-gray-500 mt-1 truncate"
                        title={yieldItem.information}
                      >
                        {yieldItem.information}
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-bold text-green-600">
                    {parseFloat(yieldItem.yield_rate_base).toFixed(2)}%
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    ${formatNumber(yieldItem.tvl)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <ChainLogo
                      chain={yieldItem.chain}
                      size={20}
                    />
                    <span className="text-sm text-gray-900">
                      {yieldItem.chain}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {parseFloat(yieldItem.yield_rate_base).toFixed(2)}%
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {yieldItem.yield_rate_reward &&
                    parseFloat(yieldItem.yield_rate_reward.toString()) > 0
                      ? `${parseFloat(
                          yieldItem.yield_rate_reward.toString()
                        ).toFixed(2)}%`
                      : '0.00%'}
                  </div>
                </td>
              </tr>
            ))}

            {/* Loading skeletons for additional rows */}
            {showSkeletons &&
              Array.from({ length: skeletonCount }).map((_, index) => (
                <tr
                  key={`skeleton-${index}`}
                  className="animate-pulse"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-4 bg-gray-200 rounded w-4"></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                      <div className="h-4 bg-gray-200 rounded w-12"></div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="h-4 bg-gray-200 rounded w-20 mb-1"></div>
                      <div className="h-3 bg-gray-200 rounded w-16"></div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-4 bg-gray-200 rounded w-16"></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded w-16"></div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-4 bg-gray-200 rounded w-16"></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-4 bg-gray-200 rounded w-16"></div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
