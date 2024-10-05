'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import YieldTable from '../YieldTable';
import YieldFilters from '@/components/YieldFilters';
import { Suspense } from 'react';
import Head from 'next/head';

interface YieldItem {
  id: number;
  project: string;
  chain: string;
  market: string;
  apy: number;
  yield_rate_base: string;
  tvl: number;
  humanized_timestamp: string;
}

function YieldPageContent({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [yieldData, setYieldData] = useState<(YieldItem & { index: number })[]>(
    []
  );
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get('search') || ''
  );
  const [selectedChains, setSelectedChains] = useState<string[]>([]);
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSingleAssetOnly, setIsSingleAssetOnly] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://defi-dashboard-99d015fc546e.herokuapp.com/api/yield_rates'
        );
        const data: YieldItem[] = await response.json();
        const filteredData = data.filter((item) =>
          item.market.toLowerCase().includes(params.slug.toLowerCase())
        );
        const indexedData = filteredData.map((item, index) => ({
          ...item,
          index: index + 1,
        }));
        setYieldData(indexedData);
        setIsLoading(false);

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

    fetchData();
  }, [params.slug]);

  const uniqueChains = Array.from(new Set(yieldData.map((item) => item.chain)));
  const uniqueProjects = Array.from(
    new Set(yieldData.map((item) => item.project))
  );

  const updateURLParams = (search: string, chain: string) => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (chain) params.set('chain', chain);
    router.push(`/yield/${params.slug}?${params.toString()}`);
  };

  const setSearchTermAndUpdateURL = (value: string) => {
    setSearchTerm(value);
    updateURLParams(value, selectedChains[0] || '');
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
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedChains(uniqueChains);
    setSelectedProjects(uniqueProjects);
    setIsSingleAssetOnly(false);
    router.push(`/yield/${params.slug}`);
  };

  return (
    <>
      <div className="min-h-screen bg-amber-100 text-brown-800 p-4 sm:p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2 sm:mb-3 text-left text-brown-900">
            {params.slug.toUpperCase()} Yield Farming Opportunities
          </h1>
          <p className="text-lg mb-6 sm:mb-8 text-brown-700">
            Explore the best {params.slug.toUpperCase()} yield farming
            opportunities across various DeFi protocols. Compare APYs, TVL, and
            more to optimize your crypto investments.
          </p>
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
            isSingleAssetOnly={isSingleAssetOnly}
          />
        </div>
      </div>
    </>
  );
}

export default function YieldPage({ params }: { params: { slug: string } }) {
  return (
    <>
      <Head>
        <title>{`${params.slug.toUpperCase()} Yield Farming Opportunities | TokenDataView.com`}</title>
        <meta
          name="description"
          content={`Explore the best yield farming opportunities for ${params.slug.toUpperCase()}. Find high APY and project information on TokenDataView.com.`}
        />
      </Head>

      <Suspense fallback={<div>Loading...</div>}>
        <YieldPageContent params={params} />
      </Suspense>
    </>
  );
}
