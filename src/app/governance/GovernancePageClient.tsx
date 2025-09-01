'use client';

import React, { useState, useEffect } from 'react';
import GovernanceProposal from '@/components/GovernanceProposal';
import GovernanceInfo from '@/components/GovernanceInfo';
import Select from 'react-select';

interface Proposal {
  id: string;
  projectName: string;
  snapshotName: string;
  title: string;
  body: string;
  choices: string[];
  start: number;
  end: number;
  state: string;
  scores: number[];
  scores_total: number;
  // Add other properties as needed
}

interface ProjectOption {
  value: string;
  label: string;
}

interface GovernancePageClientProps {
  initialProposals: Proposal[];
  projectOptions: { value: string; label: string }[];
}

export default function GovernancePageClient({
  initialProposals,
  projectOptions,
}: GovernancePageClientProps) {
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [filteredProposals, setFilteredProposals] = useState(initialProposals);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const quickFilterProjects = (projectName: string) => {
    const project = projectOptions.find(
      (option) => option.value === projectName
    );
    if (project) {
      if (activeFilter === projectName) {
        // If the same filter is clicked again, clear the filter
        setSelectedProjects([]);
        setActiveFilter(null);
      } else {
        setSelectedProjects([project.value]);
        setActiveFilter(projectName);
      }
    }
  };

  useEffect(() => {
    if (selectedProjects.length > 0) {
      setFilteredProposals(
        initialProposals.filter((proposal) =>
          selectedProjects.includes(proposal.projectName)
        )
      );
    } else {
      setFilteredProposals(initialProposals);
    }
  }, [selectedProjects, initialProposals]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4 text-gray-900">
            DeFi Governance
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Track and participate in governance proposals across major DeFi
            protocols. Stay informed about the latest decisions shaping the DeFi
            ecosystem.
          </p>
        </div>

        <GovernanceInfo />

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <label
            htmlFor="project-select"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Filter by Project:
          </label>
          <Select
            id="project-select"
            isMulti
            options={projectOptions}
            onChange={(selected) =>
              setSelectedProjects(selected.map((option) => option.value))
            }
            className="basic-multi-select"
            classNamePrefix="select"
          />
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {['Aave', 'Uniswap', 'Lido'].map((project) => (
            <button
              key={project}
              onClick={() => quickFilterProjects(project)}
              className={`px-4 py-2 rounded-md transition-colors font-medium ${
                activeFilter === project
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-blue-600 hover:bg-blue-50 border border-blue-200'
              }`}
            >
              {project}
            </button>
          ))}
        </div>

        {filteredProposals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProposals.map((proposal) => (
              <GovernanceProposal
                key={`${proposal.projectName}-${proposal.id}`}
                proposal={proposal}
                projectName={proposal.projectName}
                snapshotName={proposal.snapshotName}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-lg">
            <p className="text-gray-600">
              No recent governance proposals available for the selected
              projects.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
