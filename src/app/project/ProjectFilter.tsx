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
    {
      label: 'All',
      value: null,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-1"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      label: 'Blockchains',
      value: 'blockchain',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-1"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
        </svg>
      ),
    },
    {
      label: 'Lending Markets',
      value: 'lending market',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-1"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
          <path
            fillRule="evenodd"
            d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      label: 'Stablecoins',
      value: 'stablecoin',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-1"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ];

  const handleReset = () => {
    setActiveFilter(null);
    setSearchTerm('');
    resetTable();
  };

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex gap-4 pb-4">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search Projects"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto scrollbar-hide gap-2 self-stretch h-full" // Set height on the container
          >
            {filterButtons.map((button) => {
              const isAll = button.value === null;
              const isSelected = isAll
                ? activeFilter === null
                : activeFilter === button.value;

              return (
                <button
                  key={button.label}
                  type="button"
                  onClick={() => setActiveFilter(button.value)}
                  className={`flex items-center h-full px-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                    isSelected
                      ? 'bg-amber-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  {button.icon}
                  {button.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Reset Button */}
      <button
        type="button"
        onClick={handleReset}
        className="ml-auto px-4 py-2 text-sm font-medium transition-colors bg-amber-500 hover:bg-amber-600 text-gray-700 border whitespace-nowrap"
      >
        Reset
      </button>
    </div>
  );
}
