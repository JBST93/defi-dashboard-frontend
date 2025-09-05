import React, { useState, useRef, useEffect } from 'react';
import ChainLogo from './ChainLogo';

interface YieldFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedChains: string[];
  setSelectedChains: React.Dispatch<React.SetStateAction<string[]>>;
  selectedProjects: string[];
  setSelectedProjects: React.Dispatch<React.SetStateAction<string[]>>;
  selectedStablecoins: string[];
  setSelectedStablecoins: React.Dispatch<React.SetStateAction<string[]>>;
  availableChains: string[];
  availableProjects: string[];
  availableStablecoins: string[];
  resetFilters: () => void;
  isSingleAssetOnly: boolean;
  setIsSingleAssetOnly: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function YieldFilters({
  searchTerm,
  setSearchTerm,
  selectedChains,
  setSelectedChains,
  selectedProjects,
  setSelectedProjects,
  selectedStablecoins,
  setSelectedStablecoins,
  availableChains,
  availableProjects,
  availableStablecoins,
  resetFilters,
  isSingleAssetOnly,
  setIsSingleAssetOnly,
}: YieldFiltersProps) {
  const [isChainOpen, setIsChainOpen] = useState(false);
  const [isProjectOpen, setIsProjectOpen] = useState(false);
  const [isStablecoinOpen, setIsStablecoinOpen] = useState(false);
  const chainDropdownRef = useRef<HTMLDivElement>(null);
  const projectDropdownRef = useRef<HTMLDivElement>(null);
  const stablecoinDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        chainDropdownRef.current &&
        !chainDropdownRef.current.contains(event.target as Node)
      ) {
        setIsChainOpen(false);
      }
      if (
        projectDropdownRef.current &&
        !projectDropdownRef.current.contains(event.target as Node)
      ) {
        setIsProjectOpen(false);
      }
      if (
        stablecoinDropdownRef.current &&
        !stablecoinDropdownRef.current.contains(event.target as Node)
      ) {
        setIsStablecoinOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChainSelection = (chain: string) => {
    setSelectedChains((prev: string[]) =>
      prev.includes(chain) ? prev.filter((c) => c !== chain) : [...prev, chain]
    );
  };

  const handleProjectSelection = (project: string) => {
    setSelectedProjects((prev) =>
      prev.includes(project)
        ? prev.filter((p) => p !== project)
        : [...prev, project]
    );
  };

  const handleStablecoinSelection = (stablecoin: string) => {
    setSelectedStablecoins((prev) =>
      prev.includes(stablecoin)
        ? prev.filter((s) => s !== stablecoin)
        : [...prev, stablecoin]
    );
  };

  const handleChainSelectAll = () => {
    setSelectedChains([...availableChains]);
  };

  const handleChainUnselectAll = () => {
    setSelectedChains([]);
  };

  const handleProjectSelectAll = () => {
    setSelectedProjects([...availableProjects]);
  };

  const handleProjectUnselectAll = () => {
    setSelectedProjects([]);
  };

  const handleStablecoinSelectAll = () => {
    setSelectedStablecoins([...availableStablecoins]);
  };

  const handleStablecoinUnselectAll = () => {
    setSelectedStablecoins([]);
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
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>
        <button
          onClick={resetFilters}
          className="inline-flex items-center px-6 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
        >
          Reset
        </button>
      </div>
      <div className="flex flex-wrap gap-4 mb-4">
        <div className="relative">
          <button
            onClick={() => setIsChainOpen(!isChainOpen)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            <div className="flex items-center space-x-2">
              <span>Select Chain ({selectedChains.length})</span>
            </div>
          </button>
          {isChainOpen && (
            <div
              ref={chainDropdownRef}
              className="absolute z-10 mt-2 w-56 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5"
            >
              <div className="py-1">
                <div className="flex justify-between px-4 py-2 border-b border-gray-200">
                  <button
                    onClick={handleChainSelectAll}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Select All
                  </button>
                  <button
                    onClick={handleChainUnselectAll}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Unselect All
                  </button>
                </div>
                {availableChains.map((chain) => (
                  <label
                    key={chain}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <input
                      type="checkbox"
                      checked={selectedChains.includes(chain)}
                      onChange={() => handleChainSelection(chain)}
                      className="mr-2"
                    />
                    <div className="flex items-center space-x-2">
                      <ChainLogo
                        chain={chain}
                        size={16}
                      />
                      <span>{chain}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="relative">
          <button
            onClick={() => setIsProjectOpen(!isProjectOpen)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            Select Project ({selectedProjects.length})
          </button>
          {isProjectOpen && (
            <div
              ref={projectDropdownRef}
              className="absolute z-10 mt-2 w-56 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5"
            >
              <div className="py-1">
                <div className="flex justify-between px-4 py-2 border-b border-gray-200">
                  <button
                    onClick={handleProjectSelectAll}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Select All
                  </button>
                  <button
                    onClick={handleProjectUnselectAll}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Unselect All
                  </button>
                </div>
                {availableProjects.map((project) => (
                  <label
                    key={project}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <input
                      type="checkbox"
                      checked={selectedProjects.includes(project)}
                      onChange={() => handleProjectSelection(project)}
                      className="mr-2"
                    />
                    {project}
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="relative">
          <button
            onClick={() => setIsStablecoinOpen(!isStablecoinOpen)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            Select Stablecoin ({selectedStablecoins.length})
          </button>
          {isStablecoinOpen && (
            <div
              ref={stablecoinDropdownRef}
              className="absolute z-10 mt-2 w-56 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5"
            >
              <div className="py-1">
                <div className="flex justify-between px-4 py-2 border-b border-gray-200">
                  <button
                    onClick={handleStablecoinSelectAll}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Select All
                  </button>
                  <button
                    onClick={handleStablecoinUnselectAll}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Unselect All
                  </button>
                </div>
                {availableStablecoins.map((stablecoin) => (
                  <label
                    key={stablecoin}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <input
                      type="checkbox"
                      checked={selectedStablecoins.includes(stablecoin)}
                      onChange={() => handleStablecoinSelection(stablecoin)}
                      className="mr-2"
                    />
                    {stablecoin}
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
        <div>
          <button
            onClick={() => setIsSingleAssetOnly(!isSingleAssetOnly)}
            className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md transition-colors ${
              isSingleAssetOnly
                ? 'text-white bg-blue-600 hover:bg-blue-700'
                : 'text-blue-600 bg-white hover:bg-gray-100 border-blue-600'
            }`}
          >
            Single Exposure
          </button>
        </div>
      </div>
    </div>
  );
}
