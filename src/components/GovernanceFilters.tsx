import React from 'react';

interface GovernanceFiltersProps {
  protocols: string[];
  selectedProtocols: string[];
  setSelectedProtocols: (protocols: string[]) => void;
  selectedType: string;
  setSelectedType: (type: string) => void;
  selectedState: string;
  setSelectedState: (state: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export default function GovernanceFilters({
  protocols,
  selectedProtocols,
  setSelectedProtocols,
  selectedType,
  setSelectedType,
  selectedState,
  setSelectedState,
  searchTerm,
  setSearchTerm,
}: GovernanceFiltersProps) {
  const handleProtocolChange = (protocol: string) => {
    if (selectedProtocols.includes(protocol)) {
      setSelectedProtocols(selectedProtocols.filter((p) => p !== protocol));
    } else {
      setSelectedProtocols([...selectedProtocols, protocol]);
    }
  };

  return (
    <div className="mb-8 space-y-4">
      <div className="flex flex-wrap gap-4">
        <div className="p-2 rounded-md border border-amber-300 bg-white text-brown-800">
          <label className="font-bold mb-2 block">Select Protocols:</label>
          {protocols.map((protocol) => (
            <div
              key={protocol}
              className="flex items-center mb-2"
            >
              <input
                type="checkbox"
                id={protocol}
                value={protocol}
                checked={selectedProtocols.includes(protocol)}
                onChange={() => handleProtocolChange(protocol)}
                className="mr-2"
              />
              <label htmlFor={protocol}>{protocol}</label>
            </div>
          ))}
        </div>
        <select
          className="p-2 rounded-md border border-amber-300 bg-white text-brown-800"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="">All Types</option>
          <option value="snapshot">Snapshot</option>
          <option value="forum">Forum</option>
        </select>
        <select
          className="p-2 rounded-md border border-amber-300 bg-white text-brown-800"
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
        >
          <option value="">All States</option>
          <option value="active">Active</option>
          <option value="closed">Closed</option>
          <option value="pending">Pending</option>
        </select>
      </div>
      <input
        type="text"
        placeholder="Search proposals..."
        className="w-full p-2 rounded-md border border-amber-300 bg-white text-brown-800"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}
