'use client';

import React, { useState, useEffect } from 'react';
import GovernanceProposal from '@/components/GovernanceProposal';
import GovernanceInfo from '@/components/GovernanceInfo';
import ForumDiscussions from '@/components/ForumDiscussions';
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

interface ForumDiscussion {
  id: string;
  title: string;
  url: string;
  protocol: string;
  replies: number;
  views: number;
  lastActivity: string;
  category: string;
  author: string;
  isHot: boolean;
}

interface GovernancePageClientProps {
  initialProposals: Proposal[];
  projectOptions: { value: string; label: string }[];
  forumDiscussions: ForumDiscussion[];
}

export default function GovernancePageClient({
  initialProposals,
  projectOptions,
  forumDiscussions,
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
    let filtered = initialProposals;

    // Filter by selected projects
    if (selectedProjects.length > 0) {
      filtered = filtered.filter((proposal) =>
        selectedProjects.includes(proposal.projectName)
      );
    }

    // Filter by status
    if (activeFilter === 'active') {
      filtered = filtered.filter((proposal) => proposal.state === 'active');
    } else if (activeFilter === 'closed') {
      filtered = filtered.filter((proposal) => proposal.state === 'closed');
    }

    setFilteredProposals(filtered);
  }, [selectedProjects, initialProposals, activeFilter]);

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'DeFi Governance Tracker 2025',
            description:
              'Track live governance proposals across 20+ DeFi protocols with real-time voting analytics',
            url: 'https://www.tokendataview.com/governance',
            mainEntity: {
              '@type': 'ItemList',
              name: 'DeFi Governance Proposals',
              description:
                'Live governance proposals from major DeFi protocols',
              numberOfItems: filteredProposals.length,
              itemListElement: filteredProposals
                .slice(0, 10)
                .map((proposal, index) => ({
                  '@type': 'ListItem',
                  position: index + 1,
                  item: {
                    '@type': 'Article',
                    headline: proposal.title,
                    description: proposal.body?.substring(0, 200) + '...',
                    datePublished: new Date(
                      proposal.start * 1000
                    ).toISOString(),
                    dateModified: new Date(proposal.end * 1000).toISOString(),
                    author: {
                      '@type': 'Organization',
                      name: proposal.projectName,
                    },
                    url: `https://snapshot.org/#/${proposal.snapshotName}/proposal/${proposal.id}`,
                  },
                })),
            },
          }),
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-6 text-gray-900">
              DeFi Governance Tracker 2025
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
              Track live governance proposals across 20+ DeFi protocols
              including Aave, Uniswap, Lido, and Compound. Get real-time voting
              analytics, proposal filtering, and comprehensive DAO decision
              tracking.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-8">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {filteredProposals.length}
                </div>
                <div className="text-gray-600">Active Proposals</div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {projectOptions.length}
                </div>
                <div className="text-gray-600">Supported Protocols</div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {filteredProposals.filter((p) => p.state === 'active').length}
                </div>
                <div className="text-gray-600">Live Voting</div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="text-3xl font-bold text-orange-600 mb-2">
                  {filteredProposals.filter((p) => p.state === 'closed').length}
                </div>
                <div className="text-gray-600">Recently Closed</div>
              </div>
            </div>
          </div>

          {/* What is DeFi Governance Section */}
          <section className="mb-12">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                What is DeFi Governance?
              </h2>
              <div className="prose max-w-none">
                <p className="text-lg text-gray-600 mb-6">
                  DeFi governance is the decentralized decision-making process
                  that allows token holders to vote on protocol changes,
                  parameter updates, and strategic directions. Unlike
                  traditional corporate governance, DeFi governance is
                  transparent, permissionless, and community-driven.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      How DeFi Governance Works
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-3 mt-1">✓</span>
                        <span className="text-gray-600">
                          <strong>Proposal Creation:</strong> Community members
                          create governance proposals
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-3 mt-1">✓</span>
                        <span className="text-gray-600">
                          <strong>Discussion Phase:</strong> Community debates
                          and refines proposals
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-3 mt-1">✓</span>
                        <span className="text-gray-600">
                          <strong>Voting Period:</strong> Token holders vote on
                          proposals
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-3 mt-1">✓</span>
                        <span className="text-gray-600">
                          <strong>Implementation:</strong> Approved proposals
                          are executed by developers
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Why Track Governance Proposals?
                    </h3>
                    <div className="space-y-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-blue-900 mb-2">
                          Stay Informed
                        </h4>
                        <p className="text-blue-800 text-sm">
                          Track important protocol changes that could affect
                          your investments
                        </p>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-green-900 mb-2">
                          Participate Actively
                        </h4>
                        <p className="text-green-800 text-sm">
                          Vote on proposals to shape the future of DeFi
                          protocols
                        </p>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-purple-900 mb-2">
                          Risk Management
                        </h4>
                        <p className="text-purple-800 text-sm">
                          Monitor governance decisions that could impact
                          protocol security
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="mb-12">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                Why Use Our Governance Tracker Instead of Snapshot?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🔍</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Aggregated View
                  </h3>
                  <p className="text-gray-600">
                    Track proposals from 20+ protocols in one place instead of
                    visiting individual Snapshot pages
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📊</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Advanced Analytics
                  </h3>
                  <p className="text-gray-600">
                    Get voting analytics, participation rates, and proposal
                    success metrics across all protocols
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Smart Filtering
                  </h3>
                  <p className="text-gray-600">
                    Filter by protocol, status, category, and voting power
                    requirements to find relevant proposals
                  </p>
                </div>
              </div>
            </div>
          </section>

          <GovernanceInfo />

          {/* Enhanced Filtering Section */}
          <section className="mb-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Live Governance Feed
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div>
                  <label
                    htmlFor="project-select"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Filter by Protocol:
                  </label>
                  <Select
                    id="project-select"
                    isMulti
                    options={projectOptions}
                    onChange={(selected) =>
                      setSelectedProjects(
                        selected.map((option) => option.value)
                      )
                    }
                    className="basic-multi-select"
                    classNamePrefix="select"
                    placeholder="Select protocols..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quick Filter by Status:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() =>
                        setActiveFilter(
                          activeFilter === 'active' ? null : 'active'
                        )
                      }
                      className={`px-4 py-2 rounded-md transition-colors font-medium ${
                        activeFilter === 'active'
                          ? 'bg-green-600 text-white'
                          : 'bg-white text-green-600 hover:bg-green-50 border border-green-200'
                      }`}
                    >
                      Active (
                      {
                        filteredProposals.filter((p) => p.state === 'active')
                          .length
                      }
                      )
                    </button>
                    <button
                      onClick={() =>
                        setActiveFilter(
                          activeFilter === 'closed' ? null : 'closed'
                        )
                      }
                      className={`px-4 py-2 rounded-md transition-colors font-medium ${
                        activeFilter === 'closed'
                          ? 'bg-gray-600 text-white'
                          : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                      }`}
                    >
                      Closed (
                      {
                        filteredProposals.filter((p) => p.state === 'closed')
                          .length
                      }
                      )
                    </button>
                    <button
                      onClick={() => setActiveFilter(null)}
                      className={`px-4 py-2 rounded-md transition-colors font-medium ${
                        activeFilter === null
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-blue-600 hover:bg-blue-50 border border-blue-200'
                      }`}
                    >
                      All ({filteredProposals.length})
                    </button>
                  </div>
                </div>
              </div>

              {/* Popular Protocol Quick Filters */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Popular Protocols:
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Aave',
                    'Uniswap',
                    'Ethena',
                    'Gearbox',
                    'Morpho',
                    'Pendle',
                  ].map((project) => (
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
              </div>
            </div>
          </section>

          {/* Proposals Display */}
          <section className="mb-12">
            {filteredProposals.length > 0 ? (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Governance Proposals ({filteredProposals.length})
                  </h2>
                  <div className="text-sm text-gray-600">
                    Last updated: {new Date().toLocaleString()}
                  </div>
                </div>

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
              </>
            ) : (
              <div className="text-center py-12 bg-white rounded-xl shadow-lg">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📋</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No Proposals Found
                </h3>
                <p className="text-gray-600 mb-4">
                  No governance proposals match your current filters. Try
                  adjusting your search criteria.
                </p>
                <button
                  onClick={() => {
                    setSelectedProjects([]);
                    setActiveFilter(null);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Frequently Asked Questions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    How often is the governance data updated?
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Our governance tracker updates in real-time, pulling the
                    latest proposals from Snapshot APIs every 15 minutes to
                    ensure you have the most current information.
                  </p>

                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Can I vote on proposals directly from this page?
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Yes! Each proposal card includes a direct link to the
                    Snapshot voting page where you can participate in governance
                    using your wallet.
                  </p>

                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    What protocols are supported?
                  </h3>
                  <p className="text-gray-600">
                    We track governance for 20+ major DeFi protocols including
                    Aave, Uniswap, Ethena, Gearbox, Morpho, Pendle, Curve, and
                    many more. Most protocols use Snapshot for governance
                    voting.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    How do I know if a proposal is important?
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Look for proposals with high voting participation,
                    significant TVL impact, or those affecting core protocol
                    parameters. Our analytics help identify trending proposals.
                  </p>

                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    What&apos;s the difference between active and closed
                    proposals?
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Active proposals are currently open for voting, while closed
                    proposals have finished their voting period. You can only
                    vote on active proposals.
                  </p>

                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Do I need tokens to participate in governance?
                  </h3>
                  <p className="text-gray-600">
                    Yes, you need the protocol&apos;s governance tokens to vote.
                    The required amount varies by protocol, but most allow
                    delegation of voting power.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Forum Discussions Section */}
          <section className="mb-12">
            <ForumDiscussions discussions={forumDiscussions} />
          </section>
        </div>
      </div>
    </>
  );
}
