'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import YieldTable from './YieldTable';
import FAQ from './FAQ';
import SearchAndFilter from './SearchAndFilter';
import { getFAQData } from './api';
import { Suspense } from 'react';

interface YieldItem {
  id: number; // Changed from string to number
  project: string;
  chain: string;
  market: string;
  apy: number;
  yield_rate_base: number;
  tvl: number;
  // Add other properties if needed...
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
  const [selectedChain, setSelectedChain] = useState(
    searchParams.get('chain') || ''
  );
  const [selectedProject, setSelectedProject] = useState(
    searchParams.get('project') || ''
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

    const fetchFAQData = async () => {
      const result = await getFAQData();
      setFaqData(result);
    };

    fetchData();
    fetchFAQData();
  }, []);

  const uniqueProjects = Array.from(
    new Set(yieldData.map((item) => item.project))
  );
  const uniqueChains = Array.from(new Set(yieldData.map((item) => item.chain)));

  const updateURLParams = (search: string, chain: string, project: string) => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (chain) params.set('chain', chain);
    if (project) params.set('project', project);
    router.push(`/yield?${params.toString()}`);
  };

  const setSearchTermAndUpdateURL = (value: string) => {
    setSearchTerm(value);
    updateURLParams(value, selectedChain, selectedProject);
  };

  const setSelectedChainAndUpdateURL = (value: string) => {
    setSelectedChain(value);
    updateURLParams(searchTerm, value, selectedProject);
  };

  const setSelectedProjectAndUpdateURL = (value: string) => {
    setSelectedProject(value);
    updateURLParams(searchTerm, selectedChain, value);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedChain('');
    setSelectedProject('');
    router.push('/yield');
  };

  return (
    <div className="min-h-screen bg-amber-100 text-brown-800 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-center text-brown-900 retro-shadow">
          Yield Farming Opportunities
        </h1>
        <SearchAndFilter
          searchTerm={searchTerm}
          selectedChain={selectedChain}
          selectedProject={selectedProject}
          setSearchTerm={setSearchTermAndUpdateURL}
          setSelectedChain={setSelectedChainAndUpdateURL}
          setSelectedProject={setSelectedProjectAndUpdateURL}
          projects={uniqueProjects}
          chains={uniqueChains}
          resetFilters={resetFilters}
        />
        <YieldTable
          yieldData={yieldData}
          searchTerm={searchTerm}
          selectedChain={selectedChain}
          selectedProject={selectedProject}
          isLoading={isLoading}
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
