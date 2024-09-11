'use client';

import React, { useState, useEffect } from 'react';
import { fetchStablecoinYieldRates } from './api';
import YieldTable from '@/components/YieldTable';
import YieldFilters from '@/components/YieldFilters';

function StablecoinYield() {
  const [yieldRates, setYieldRates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChains, setSelectedChains] = useState<string[]>([]);
  const [availableChains, setAvailableChains] = useState<string[]>([]);

  useEffect(() => {
    async function loadYieldRates() {
      try {
        const rates = await fetchStablecoinYieldRates();
        const indexedRates = rates.map((rate, index) => ({
          ...rate,
          index: index + 1,
        }));
        setYieldRates(indexedRates);

        const chains = [...new Set(indexedRates.map((rate) => rate.chain))];
        setAvailableChains(chains);

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching stablecoin yield rates:', error);
        setIsLoading(false);
      }
    }
    loadYieldRates();
  }, []);

  // Implement the resetFilters function
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedChains([]);
  };

  return (
    <div className="min-h-screen bg-amber-100 text-brown-800 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-left text-brown-900">
          Stablecoin Yield Rates
        </h1>

        <YieldTable
          yieldData={yieldRates}
          searchTerm={searchTerm}
          selectedChains={selectedChains}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}

export default StablecoinYield;
