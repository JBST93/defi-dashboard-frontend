'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import YieldTable from '../YieldTable';
import YieldFilters from '@/components/YieldFilters';
import { Suspense } from 'react';

interface YieldItem {
  id: number; // Changed from string to number
  project: string;
  chain: string;
  market: string;
  apy: number;
  yield_rate_base: number;
  tvl: number;
  humanized_timestamp: string; // Add this line
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
  const [isLoading, setIsLoading] = useState(true);

  // Define uniqueChains and uniqueProjects
  const uniqueChains = Array.from(new Set(yieldData.map((item) => item.chain)));
  const uniqueProjects = Array.from(
    new Set(yieldData.map((item) => item.project))
  );

  // Initialize selectedChains and selectedProjects with all options
  const [selectedChains, setSelectedChains] = useState<string[]>(uniqueChains);
  const [selectedProjects, setSelectedProjects] =
    useState<string[]>(uniqueProjects);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://defi-dashboard-99d015fc546e.herokuapp.com/api/eth_yields'
        );
        const data: YieldItem[] = await response.json();
        const indexedData = data.map((item, index) => ({
          ...item,
          index: index + 1,
        }));
        setYieldData(indexedData);
        setIsLoading(false);

        // Update uniqueChains and uniqueProjects after data is fetched
        const chains = Array.from(
          new Set(indexedData.map((item) => item.chain))
        );
        const projects = Array.from(
          new Set(indexedData.map((item) => item.project))
        );
        setSelectedChains(chains);
        setSelectedProjects(projects);
      } catch (error) {
        console.error('Error fetching yield data:', error);
        setYieldData([]);
        setIsLoading(false);
      }
    };

    fetchData(); // Add this line to call the fetchData function
  }, []); // Add an empty dependency array

  const updateURLParams = (search: string, chain: string) => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (chain) params.set('chain', chain);
    router.push(`/yield?${params.toString()}`);
  };

  const setSearchTermAndUpdateURL = (value: string) => {
    setSearchTerm(value);
    updateURLParams(value, selectedChains[0] || ''); // Remove the third argument
  };

  const setSelectedChainAndUpdateURL = (value: string) => {
    setSelectedChains([value]);
    updateURLParams(searchTerm, value); // Remove the third argument
  };

  const setSelectedChainsAndUpdateURL = (chains: string[]) => {
    setSelectedChains(chains);
    updateURLParams(searchTerm, chains[0] || '');
  };

  const setSelectedProjectsAndUpdateURL = (projects: string[]) => {
    setSelectedProjects(projects);
    updateURLParams(searchTerm, selectedChains[0] || '', projects[0] || '');
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedChains([]);
    setSelectedProjects([]);
    router.push('/yield/ethereum');
  };

  return (
    <div className="min-h-screen bg-amber-100 text-brown-800 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-left text-brown-900 ">
          ETH Yield Farming Opportunities
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
