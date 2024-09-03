'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import YieldTable from '../YieldTable';
import FAQ from '../FAQ';
import SearchAndFilter from '../SearchAndFilter';
import { getFAQData } from '../api';

interface YieldData {
  id: number;
  index: number;
  market: string;
  project: string;
  yield_rate_base: number;
  tvl: number;
  chain: string;
}

interface ProjectData {
  project: string;
  type: string;
}

export default function StablecoinYieldPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [yieldData, setYieldData] = useState<YieldData[]>([]);
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get('search') || ''
  );
  const [selectedChain, setSelectedChain] = useState(
    searchParams.get('chain') || ''
  );
  const [selectedProject, setSelectedProject] = useState(
    searchParams.get('project') || ''
  );
  const [faqData, setFaqData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [yieldResponse, projectResponse] = await Promise.all([
          fetch('https://www.tokendataview.com/api/yield_rates'),
          fetch('https://www.tokendataview.com/api/projects'),
        ]);

        const yieldData: YieldData[] = await yieldResponse.json();
        const projectData: ProjectData[] = await projectResponse.json();

        // Filter for stablecoin projects
        const stablecoinProjects = projectData
          .filter((project) => project.type === 'Stablecoin')
          .map((project) => project.project);

        // Filter yield data for stablecoin projects
        const stablecoinYieldData = yieldData.filter((item) =>
          stablecoinProjects.includes(item.project)
        );

        const indexedData = stablecoinYieldData.map((item, index) => ({
          ...item,
          index: index + 1,
        }));

        setYieldData(indexedData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
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

  const uniqueProjects = [...new Set(yieldData.map((item) => item.project))];
  const uniqueChains = [...new Set(yieldData.map((item) => item.chain))];

  const updateURLParams = (search: string, chain: string, project: string) => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (chain) params.set('chain', chain);
    if (project) params.set('project', project);
    router.push(`/yield/stablecoin?${params.toString()}`);
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
    router.push('/yield/stablecoin');
  };

  return (
    <div className="min-h-screen bg-amber-100 text-brown-800 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-brown-900 retro-shadow">
          Stablecoin Yield Opportunities
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
