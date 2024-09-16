// src/app/project/ProjectFilter.tsx
import { useRef } from 'react';
import { ProjectData } from './ProjectTable';

interface ProjectFilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  activeFilter: string | null;
  setActiveFilter: (filter: string | null) => void;
  resetTable: () => void;
}

export default function ProjectFilter({
  searchTerm,
  setSearchTerm,
  activeFilter,
  setActiveFilter,
  resetTable,
}: ProjectFilterProps) {
  const filterButtons = [
    { label: 'All', value: null },
    { label: 'Blockchains', value: 'blockchain' },
    { label: 'Lending Markets', value: 'lending market' },
    { label: 'Stablecoins', value: 'stablecoin' },
  ];

  const handleReset = () => {
    setActiveFilter(null);
    setSearchTerm('');
    resetTable();
  };

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-col gap-4 pb-4">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search project, token, or type"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          type="button"
          onClick={handleReset}
          className="px-4 py-2 text-sm font-medium rounded-md transition-colors bg-gray-100 hover:bg-gray-200 text-gray-700 border-solid border-amber-600 whitespace-nowrap"
        >
          Reset
        </button>
      </div>
      <div className="relative">
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto scrollbar-hide gap-2 pb-2"
        >
          {filterButtons.map((button) => (
            <button
              key={button.label}
              type="button"
              onClick={() => setActiveFilter(button.value)}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                activeFilter === button.value
                  ? 'bg-amber-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              {button.label}
            </button>
          ))}
        </div>
        {/* Remove the left and right scroll buttons */}
      </div>
    </div>
  );
}
