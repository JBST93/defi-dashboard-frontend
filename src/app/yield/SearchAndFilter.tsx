'use client';

import React from 'react';

interface SearchAndFilterProps {
  searchTerm: string;
  selectedChain: string;
  selectedProject: string;
  setSearchTerm: (search: string) => void;
  setSelectedChain: (chain: string) => void;
  setSelectedProject: (project: string) => void;
  projects: string[];
  chains: string[];
  resetFilters: () => void;
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  searchTerm,
  selectedChain,
  selectedProject,
  setSearchTerm,
  setSelectedChain,
  setSelectedProject,
  projects = [],
  chains = [],
  resetFilters,
}) => {
  return (
    <div className="mb-6 space-y-4">
      <input
        type="text"
        placeholder="Search markets..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 border border-amber-300 rounded-md"
      />
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
        <select
          value={selectedChain}
          onChange={(e) => setSelectedChain(e.target.value)}
          className="w-full sm:w-1/3 p-2 border border-amber-300 rounded-md"
        >
          <option value="">All Chains</option>
          {chains.map((chain) => (
            <option
              key={chain}
              value={chain}
            >
              {chain}
            </option>
          ))}
        </select>
        <select
          value={selectedProject}
          onChange={(e) => setSelectedProject(e.target.value)}
          className="w-full sm:w-1/3 p-2 border border-amber-300 rounded-md"
        >
          <option value="">All Projects</option>
          {projects.map((project) => (
            <option
              key={project}
              value={project}
            >
              {project}
            </option>
          ))}
        </select>
        <button
          onClick={resetFilters}
          className="w-full sm:w-1/3 p-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors duration-200"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default SearchAndFilter;
