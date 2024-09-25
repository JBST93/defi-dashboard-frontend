import React from 'react';
import { fetchProjects } from '@/lib/api';
import { fetchProposals } from '@/lib/snaphotApi';
import GovernanceProposal from '@/components/GovernanceProposal';
import GovernanceInfo from '@/components/GovernanceInfo';
import { Suspense } from 'react';

const KNOWN_SNAPSHOT_NAMES: { [key: string]: string } = {
  Aave: 'aave.eth',
  Uniswap: 'uniswapgovernance.eth',
  Arbitrum: 'arbitrumfoundation.eth',
  Curve: 'curve.eth',
  Maker: 'makerdao.eth',
  Compound: 'compound.eth',
  '1inch': '1inch.eth',
  Balancer: 'balancer.eth',
  Sushi: 'sushiswap.eth',
  OpenSea: 'opensea.eth',
  Synthetix: 'synthetix.eth',
  TheGraph: 'thegraph.eth',
  // Add other known projects here
};

async function GovernancePage() {
  try {
    let projects;
    try {
      projects = await fetchProjects();
      console.log(
        'All projects:',
        projects.map((p: any) => ({
          name: p.project,
          snapshot_name: p.snapshot_name,
        }))
      );
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw new Error('Failed to fetch projects');
    }

    const KNOWN_SNAPSHOT_NAMES: { [key: string]: string } = {
      Aave: 'aave.eth',
      Uniswap: 'uniswapgovernance.eth',
      Arbitrum: 'arbitrumfoundation.eth',
      Curve: 'curvefi.eth',
      // Add other known projects here
    };

    const projectsWithGovernance = projects.filter(
      (project: { snapshot_name: string; project: string }) => {
        if (!project.snapshot_name && KNOWN_SNAPSHOT_NAMES[project.project]) {
          project.snapshot_name = KNOWN_SNAPSHOT_NAMES[project.project];
        }
        const isValid =
          project.snapshot_name &&
          project.snapshot_name !== '' &&
          project.snapshot_name.toLowerCase() !== 'none';
        console.log(
          `Project ${project.project}: snapshot_name = ${project.snapshot_name}, isValid = ${isValid}`
        );
        return isValid;
      }
    );

    console.log('Projects with governance:', projectsWithGovernance);

    if (projectsWithGovernance.length === 0) {
      console.log('No projects with valid governance found');
      return (
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Governance</h1>
          <GovernanceInfo />
          <div className="text-center py-8">
            <p>
              No governance information is currently available for any projects.
            </p>
          </div>
        </div>
      );
    }

    let allProposals: any[] = [];
    for (const project of projectsWithGovernance) {
      try {
        console.log(
          `Fetching proposals for ${project.project} with snapshot_name: ${project.snapshot_name}`
        );
        const proposals = await fetchProposals(project.snapshot_name);
        console.log(
          `Fetched ${proposals.length} proposals for ${project.project}`
        );
        allProposals = [
          ...allProposals,
          ...proposals.map((p) => ({
            ...p,
            projectName: project.project,
            snapshotName: project.snapshot_name,
          })),
        ];
      } catch (error) {
        console.error(
          `Error fetching proposals for ${project.project}:`,
          error
        );
      }
    }

    // Filter out proposals that closed more than a month ago
    const oneMonthAgo = Date.now() - 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds
    const recentProposals = allProposals.filter((proposal) => {
      const endTime = proposal.end * 1000; // Convert to milliseconds
      return endTime > oneMonthAgo || proposal.state === 'active';
    });

    console.log(`Total recent proposals: ${recentProposals.length}`);

    // Sort proposals by end date, closest first
    recentProposals.sort((a, b) => b.end - a.end);

    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Governance</h1>
        <GovernanceInfo />
        {recentProposals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentProposals.map((proposal) => (
              <GovernanceProposal
                key={`${proposal.projectName}-${proposal.id}`}
                proposal={proposal}
                projectName={proposal.projectName}
                snapshotName={proposal.snapshotName} // Ensure this is correctly passed
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p>No recent governance proposals available.</p>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('Error in GovernancePage:', error);
    return (
      <div className="text-center py-8">
        <h2 className="text-xl font-bold mb-4">
          Error loading governance data
        </h2>
        <p className="mb-4">
          An unexpected error occurred. Please try again later.
        </p>
        <p className="text-sm text-gray-600">
          Error details:{' '}
          {error instanceof Error ? error.message : String(error)}
        </p>
      </div>
    );
  }
}

export default function GovernancePageWrapper() {
  return (
    <Suspense
      fallback={
        <div className="text-center py-8">Loading governance data...</div>
      }
    >
      <GovernancePage />
    </Suspense>
  );
}
