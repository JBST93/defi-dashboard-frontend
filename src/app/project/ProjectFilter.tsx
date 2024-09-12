// src/app/project/ProjectFilter.tsx
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

  return (
    <div className="flex flex-col gap-4 pb-4">
      <input
        type="text"
        placeholder="Search project, token, or type"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-2 text-sm border-2 border-gray-400 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
      />
      <div className="flex flex-wrap gap-2 items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {filterButtons.map((button) => (
            <button
              key={button.label}
              type="button"
              onClick={() => setActiveFilter(button.value)}
              className={`px-3 py-1 text-sm font-medium transition-colors border-2 border-gray-400 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
                activeFilter === button.value
                  ? 'bg-gray-200 border-gray-600'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {button.label}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={handleReset}
          className="px-3 py-1 text-sm font-medium transition-colors border-2 border-gray-400 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] bg-gray-100 hover:bg-gray-200"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
