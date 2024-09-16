'use client';

import { useState, useEffect, SetStateAction } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import YieldTable from '@/components/YieldTable';
import YieldFilters from '@/components/YieldFilters';
import { Suspense } from 'react';
import { yieldRatesStablecoin } from '@/lib/api';

interface YieldItem {
  id: number;
  project: string;
  chain: string;
  market: string;
  apy: number;
  yield_rate_base: number;
  tvl: number;
  humanized_timestamp: string;
}

function YieldPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [yieldData, setYieldData] = useState<(YieldItem & { index: number })[]>(
    []
  );
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get('search') || ''
  );
  const [selectedChains, setSelectedChains] = useState<string[]>(
    searchParams.get('chain') ? [searchParams.get('chain')!] : []
  );
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await yieldRatesStablecoin();
        const indexedData = data.map((item: YieldItem, index: number) => ({
          ...item,
          index: index + 1,
        }));
        setYieldData(indexedData);
        setIsLoading(false);

        // Set initial selections for chains and projects
        const uniqueChains = Array.from(
          new Set(indexedData.map((item: YieldItem) => item.chain))
        ) as string[];
        const uniqueProjects = Array.from(
          new Set(indexedData.map((item: YieldItem) => item.project))
        ) as string[];
        setSelectedChains(uniqueChains);
        setSelectedProjects(uniqueProjects);
      } catch (error) {
        console.error('Error fetching yield data:', error);
        setYieldData([]);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const uniqueChains = Array.from(new Set(yieldData.map((item) => item.chain)));
  const uniqueProjects = Array.from(
    new Set(yieldData.map((item) => item.project))
  );

  const updateURLParams = (search: string, chain: string) => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (chain) params.set('chain', chain);
    router.push(`/yield/stablecoin?${params.toString()}`);
  };

  const setSearchTermAndUpdateURL = (value: string) => {
    setSearchTerm(value);
    updateURLParams(value, selectedChains[0] || '');
  };

  const setSelectedChainsAndUpdateURL = (
    chainsOrUpdater: SetStateAction<string[]>
  ) => {
    setSelectedChains(chainsOrUpdater);
    const newChains =
      typeof chainsOrUpdater === 'function'
        ? chainsOrUpdater(selectedChains)
        : chainsOrUpdater;
    updateURLParams(searchTerm, newChains[0] || '');
  };

  const setSelectedProjectsAndUpdateURL = (
    projectsOrUpdater: SetStateAction<string[]>
  ) => {
    setSelectedProjects(projectsOrUpdater);
    // No need to update URL params for projects, as it's not included in the URL
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedChains(uniqueChains);
    setSelectedProjects(uniqueProjects);
    router.push('/yield/stablecoin');
  };

  return (
    <div className="min-h-screen bg-amber-100 text-brown-800 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-left text-brown-900">
          Yield Farming Opportunities
        </h1>
        <YieldFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTermAndUpdateURL}
          selectedChains={selectedChains}
          setSelectedChains={setSelectedChainsAndUpdateURL}
          selectedProjects={selectedProjects}
          setSelectedProjects={setSelectedProjectsAndUpdateURL}
          availableChains={uniqueChains}
          availableProjects={uniqueProjects}
          resetFilters={resetFilters}
        />
        <YieldTable
          yieldData={yieldData}
          searchTerm={searchTerm}
          selectedChains={selectedChains}
          selectedProjects={selectedProjects}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}

export default function YieldPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <YieldPageContent />
    </Suspense>
  );
}
