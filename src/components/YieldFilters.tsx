import React from 'react';

interface YieldFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedChains: string[];
  setSelectedChains: (chains: string[]) => void;
  availableChains: string[];
  resetFilters: () => void; // Add this line if it's not included
}

export default function YieldFilters({
  searchTerm,
  setSearchTerm,
  selectedChains,
  setSelectedChains,
  availableChains,
}: YieldFiltersProps) {
  const handleChainSelection = (chain: string) => {
    setSelectedChains(
      selectedChains.includes(chain)
        ? selectedChains.filter((c) => c !== chain)
        : [...selectedChains, chain]
    );
  };

  const handleReset = () => {
    setSearchTerm('');
    setSelectedChains([]);
  };

  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-4 mb-4">
        <div className="flex-1 min-w-[200px]">
          <input
            type="text"
            placeholder="Search market"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-yellow-300 text-brown-300 rounded hover:bg-gray-400"
        >
          Reset
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {availableChains.map((chain) => (
          <button
            key={chain}
            onClick={() => handleChainSelection(chain)}
            className={`px-3 py-1 rounded ${
              selectedChains.includes(chain)
                ? 'bg-orange-600 text-white'
                : 'bg-yellow-300 text-brown-700 border-color-yellow-500'
            }`}
          >
            {chain}
          </button>
        ))}
      </div>
    </div>
  );
}
