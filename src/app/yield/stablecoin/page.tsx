'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import YieldTable from '@/components/YieldTable';
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
  humanized_timestamp: string;
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
  const [selectedChains, setSelectedChains] = useState<string[]>(
    searchParams.get('chain') ? [searchParams.get('chain')!] : []
  );
  const [faqData, setFaqData] = useState<FAQItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://www.tokendataview.com/api/yield_rates'
        );
        const data: YieldItem[] = await response.json();
        const indexedData = data.map((item, index) => ({
          ...item,
          index: index + 1,
        }));
        setYieldData(indexedData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching yield data:', error);
        setYieldData([]);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); // Add dependencies if needed

  const uniqueProjects = Array.from(
    new Set(yieldData.map((item) => item.project))
  );
  const uniqueChains = Array.from(new Set(yieldData.map((item) => item.chain)));

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

  const setSelectedChainsAndUpdateURL = (chains: string[]) => {
    setSelectedChains(chains);
    updateURLParams(searchTerm, chains[0] || '');
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedChains([]);
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
          availableChains={uniqueChains}
          resetFilters={resetFilters}
        />
        <YieldTable
          yieldData={yieldData}
          searchTerm={searchTerm}
          selectedChain={selectedChains[0] || ''}
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
