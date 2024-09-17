'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import YieldTable from './YieldTable';
import YieldFilters from '@/components/YieldFilters';
import FAQ from './FAQ';
import { getFAQData } from './api';
import { Suspense } from 'react';

interface YieldItem {
  id: number; // Changed from string to number
  project: string;
  chain: string;
  market: string;
  apy: number;
  yield_rate_base: string; // Change this from number to string
  tvl: number;
  humanized_timestamp: string; // Add this line
}

interface FAQItem {
  question: string;
  answer: string;
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
  const [faqData, setFaqData] = useState<FAQItem[]>([]);

  // Define uniqueChains and uniqueProjects
  const uniqueChains = Array.from(new Set(yieldData.map((item) => item.chain)));
  const uniqueProjects = Array.from(
    new Set(yieldData.map((item) => item.project))
  );

  // Initialize selectedChains and selectedProjects with all options
  const [selectedChains, setSelectedChains] = useState<string[]>(uniqueChains);
  const [selectedProjects, setSelectedProjects] =
    useState<string[]>(uniqueProjects);

  const [isSingleAssetOnly, setIsSingleAssetOnly] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://defi-dashboard-99d015fc546e.herokuapp.com/api/yield_rates'
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

    const fetchFAQData = async () => {
      const result = await getFAQData();
      setFaqData(result);
    };

    fetchData();
    fetchFAQData();
  }, []);

  const updateURLParams = (search: string, chain: string) => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (chain) params.set('chain', chain);
    router.push(`/yield?${params.toString()}`);
  };

  const setSearchTermAndUpdateURL = (value: string) => {
    setSearchTerm(value);
    updateURLParams(value, selectedChains[0] || '');
  };

  const setSelectedChainAndUpdateURL = (value: string) => {
    setSelectedChains([value]);
    updateURLParams(searchTerm, value);
  };

  const setSelectedChainsAndUpdateURL = (
    chainsOrUpdater: string[] | ((prev: string[]) => string[])
  ) => {
    const newChains =
      typeof chainsOrUpdater === 'function'
        ? chainsOrUpdater(selectedChains)
        : chainsOrUpdater;
    setSelectedChains(newChains);
    updateURLParams(searchTerm, newChains[0] || '');
  };

  const setSelectedProjectsAndUpdateURL = (
    projectsOrUpdater: string[] | ((prev: string[]) => string[])
  ) => {
    const newProjects =
      typeof projectsOrUpdater === 'function'
        ? projectsOrUpdater(selectedProjects)
        : projectsOrUpdater;
    setSelectedProjects(newProjects);
    updateURLParams(searchTerm, selectedChains[0] || '');
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedChains([]);
    setSelectedProjects([]);
    setIsSingleAssetOnly(false);
    router.push('/yield');
  };

  return (
    <div className="min-h-screen bg-amber-100 text-brown-800 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-left text-brown-900 ">
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
          isSingleAssetOnly={isSingleAssetOnly}
          setIsSingleAssetOnly={setIsSingleAssetOnly}
        />
        <YieldTable
          yieldData={yieldData}
          searchTerm={searchTerm}
          selectedChains={selectedChains}
          selectedProjects={selectedProjects}
          isLoading={isLoading}
          isSingleAssetOnly={isSingleAssetOnly} // Add this line
        />
        <FAQ faqData={faqData} />
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
