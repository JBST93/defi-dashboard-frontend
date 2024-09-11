import React from 'react';

interface YieldFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedChains: string[];
  setSelectedChains: (chains: string[]) => void;
  availableChains: string[];
}

export default function YieldFilters({
  searchTerm,
  setSearchTerm,
  selectedChains,
  setSelectedChains,
  availableChains,
}: YieldFiltersProps) {
  const handleChainSelection = (chain: string) => {
    setSelectedChains((prev) =>
      prev.includes(chain) ? prev.filter((c) => c !== chain) : [...prev, chain]
    );
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
      </div>
      <div className="flex flex-wrap gap-2">
        {availableChains.map((chain) => (
          <button
            key={chain}
            onClick={() => handleChainSelection(chain)}
            className={`px-3 py-1 rounded ${
              selectedChains.includes(chain)
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            {chain}
          </button>
        ))}
      </div>
    </div>
  );
}
