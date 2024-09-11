'use client';

import React, { useState, useMemo, useEffect } from 'react';
import {
  fetchCurveProposals,
  fetchUniswapProposals,
  fetchBalancerProposals,
  fetchAaveProposals,
  fetchFraxProposals,
} from '@/lib/proposalFetchers';
import AllProposalsList from '@/components/AllProposalList';
import GovernanceFilters from '@/components/GovernanceFilters';

// Define the Proposal interface
interface Proposal {
  id: string;
  title: string;
  body: string;
  type: 'snapshot' | 'forum';
  url: string;
  state: string;
  start: number;
  end: number;
  scores: number[];
  scores_total: number;
  choices: string[];
  protocol: string;
}

export default function GovernancePage() {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProtocols, setSelectedProtocols] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedState, setSelectedState] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    async function fetchAllProposals() {
      const allProposals = await Promise.all([
        fetchCurveProposals(),
        fetchUniswapProposals(),
        fetchBalancerProposals(),
        fetchAaveProposals(),
        fetchFraxProposals(),
      ]);

      setProposals(allProposals.flat());
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
