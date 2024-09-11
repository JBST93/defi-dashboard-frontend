'use client';

import React, { useState, useMemo } from 'react';
import {
  fetchCurveProposals,
  fetchUniswapProposals,
  fetchBalancerProposals,
  fetchAaveProposals,
  fetchFraxProposals,
} from '@/lib/proposalFetchers';
import AllProposalsList from '@/components/AllProposalList';
import GovernanceFilters from '@/components/GovernanceFilters';

export default function GovernancePage() {
  const [proposals, setProposals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProtocols, setSelectedProtocols] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  React.useEffect(() => {
    async function fetchAllProposals() {
      const curveProposals = await fetchCurveProposals();
      const uniswapProposals = await fetchUniswapProposals();
      const balancerProposals = await fetchBalancerProposals();
      const aaveProposals = await fetchAaveProposals();
      const fraxProposals = await fetchFraxProposals();

      const allProposals = [
        ...curveProposals,
        ...uniswapProposals,
        ...balancerProposals,
        ...aaveProposals,
        ...fraxProposals,
      ].sort((a, b) => {
        const dateA = a.start instanceof Date ? a.start : new Date(a.start);
        const dateB = b.start instanceof Date ? b.start : new Date(b.start);
        return dateB.getTime() - dateA.getTime();
      });

      setProposals(allProposals);
      setIsLoading(false);
    }

    fetchAllProposals();
  }, []);

  const protocols = useMemo(
    () => [...new Set(proposals.map((p) => p.protocol))],
    [proposals]
  );

  const filteredProposals = useMemo(() => {
    return proposals.filter(
      (proposal) =>
        (selectedProtocols.length === 0 ||
          selectedProtocols.includes(proposal.protocol)) &&
        (!selectedType || proposal.type === selectedType) &&
        (!selectedState || proposal.state.toLowerCase() === selectedState) &&
        (!searchTerm ||
          proposal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          proposal.protocol.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [proposals, selectedProtocols, selectedType, selectedState, searchTerm]);

  if (isLoading) {
    return <div className="text-center mt-8">Loading proposals...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 to-orange-200">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center text-brown-900 retro-shadow">
          Governance Proposals
        </h1>

        <GovernanceFilters
          protocols={protocols}
          selectedProtocols={selectedProtocols}
          setSelectedProtocols={setSelectedProtocols}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          selectedState={selectedState}
          setSelectedState={setSelectedState}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <AllProposalsList proposals={filteredProposals} />
      </main>
    </div>
  );
}
