'use client';

import { useState, useEffect } from 'react';
import { StablecoinYieldItem } from '@/lib/stablecoinData';
import StablecoinTableSSR from './StablecoinTableSSR';
import YieldFilters from './YieldFilters';

interface StablecoinTableClientProps {
  initialData: StablecoinYieldItem[];
  lastUpdated: string;
  totalPools: number;
  availableChains: string[];
  availableProjects: string[];
  availableStablecoins: string[];
}

export default function StablecoinTableClient({
  initialData,
  lastUpdated: initialLastUpdated,
  totalPools,
  availableChains,
  availableProjects,
  availableStablecoins,
}: StablecoinTableClientProps) {
  const [yields, setYields] = useState<StablecoinYieldItem[]>(initialData);
  const [lastUpdated, setLastUpdated] = useState(initialLastUpdated);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [hasNewData, setHasNewData] = useState(false);

  // Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChains, setSelectedChains] =
    useState<string[]>(availableChains);
  const [selectedProjects, setSelectedProjects] =
    useState<string[]>(availableProjects);
  const [selectedStablecoins, setSelectedStablecoins] =
    useState<string[]>(availableStablecoins);
  const [isSingleAssetOnly, setIsSingleAssetOnly] = useState(false);

  // Sorting state
  const [sortColumn, setSortColumn] = useState<
    'apy' | 'tvl' | 'yield_rate_base' | 'yield_rate_reward' | null
  >('tvl');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Filter the yields based on current filter state
  const filteredYields = yields.filter((item) => {
    const matchesSearch = item.market
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesChain =
      selectedChains.length === 0 || selectedChains.includes(item.chain);
    const matchesProject =
      selectedProjects.length === 0 || selectedProjects.includes(item.project);
    const matchesStablecoin =
      selectedStablecoins.length === 0 ||
      selectedStablecoins.includes(item.market);
    const matchesSingleAsset = !isSingleAssetOnly || !item.market.includes('/');
    return (
      matchesSearch &&
      matchesChain &&
      matchesProject &&
      matchesStablecoin &&
      matchesSingleAsset
    );
  });

  // Sort the filtered yields
  const sortedYields = [...filteredYields].sort((a, b) => {
    if (sortColumn === null) return 0;

    if (sortColumn === 'apy') {
      const aValue =
        (parseFloat(a.yield_rate_base) || 0) +
        (parseFloat(a.yield_rate_reward || '0') || 0);
      const bValue =
        (parseFloat(b.yield_rate_base) || 0) +
        (parseFloat(b.yield_rate_reward || '0') || 0);
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }

    if (sortColumn === 'tvl') {
      const aValue = a.tvl || 0;
      const bValue = b.tvl || 0;
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }

    const aValue = parseFloat(a[sortColumn] as string) || 0;
    const bValue = parseFloat(b[sortColumn] as string) || 0;
    return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
  });

  // Handle sort
  const handleSort = (
    column: 'apy' | 'tvl' | 'yield_rate_base' | 'yield_rate_reward'
  ) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('desc');
    }
  };

  // Reset filters function
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedChains([...availableChains]);
    setSelectedProjects([...availableProjects]);
    setSelectedStablecoins([...availableStablecoins]);
    setIsSingleAssetOnly(false);
  };

  // Fetch fresh data on mount and periodically
  useEffect(() => {
    const fetchFreshData = async () => {
      try {
        setIsRefreshing(true);
        const response = await fetch('/api/stablecoin-yields');

        if (!response.ok) {
          throw new Error('Failed to fetch fresh data');
        }

        const data = await response.json();

        // Check if data has the expected structure
        if (!data || !data.yields || !Array.isArray(data.yields)) {
          console.warn('API response does not have expected structure:', data);
          return;
        }

        // Check if data has changed
        const hasChanges =
          JSON.stringify(data.yields) !== JSON.stringify(yields);

        if (hasChanges) {
          setYields(data.yields);
          setLastUpdated(data.lastUpdated || 'Unknown');
          setHasNewData(true);

          // Clear the "new data" indicator after 3 seconds
          setTimeout(() => setHasNewData(false), 3000);
        }
      } catch (error) {
        console.error('Error fetching fresh stablecoin data:', error);
      } finally {
        setIsRefreshing(false);
      }
    };

    // Fetch immediately on mount
    fetchFreshData();

    // Set up periodic refresh every 2 minutes
    const interval = setInterval(fetchFreshData, 2 * 60 * 1000);

    return () => clearInterval(interval);
  }, [yields]);

  return (
    <div className="relative">
      {/* Refresh indicator */}
      {isRefreshing && (
        <div className="absolute top-4 right-4 z-10">
          <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span>Refreshing...</span>
          </div>
        </div>
      )}

      {/* New data indicator */}
      {hasNewData && !isRefreshing && (
        <div className="absolute top-4 right-4 z-10">
          <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-2 animate-pulse">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Data Updated!</span>
          </div>
        </div>
      )}

      {/* Filters */}
      <YieldFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedChains={selectedChains}
        setSelectedChains={setSelectedChains}
        selectedProjects={selectedProjects}
        setSelectedProjects={setSelectedProjects}
        selectedStablecoins={selectedStablecoins}
        setSelectedStablecoins={setSelectedStablecoins}
        availableChains={availableChains}
        availableProjects={availableProjects}
        availableStablecoins={availableStablecoins}
        resetFilters={resetFilters}
        isSingleAssetOnly={isSingleAssetOnly}
        setIsSingleAssetOnly={setIsSingleAssetOnly}
      />

      <StablecoinTableSSR
        yields={sortedYields}
        lastUpdated={lastUpdated}
        showSkeletons={yields.length < totalPools}
        skeletonCount={Math.min(5, totalPools - yields.length)}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        onSort={handleSort}
      />
    </div>
  );
}
