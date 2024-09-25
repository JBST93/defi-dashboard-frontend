import { fetchProjects } from '@/lib/api';
import { fetchProposals } from '@/lib/snaphotApi';
import GovernancePageClient from './GovernancePageClient';

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

export default async function GovernancePage() {
  try {
    const projects = await fetchProjects();

    const projectsWithGovernance = projects.filter((project) => {
      if (!project.snapshot_name && KNOWN_SNAPSHOT_NAMES[project.project]) {
        project.snapshot_name = KNOWN_SNAPSHOT_NAMES[project.project];
      }
      return (
        project.snapshot_name &&
        project.snapshot_name !== '' &&
        project.snapshot_name.toLowerCase() !== 'none'
      );
    });

    let allProposals = [];
    for (const project of projectsWithGovernance) {
      try {
        const proposals = await fetchProposals(project.snapshot_name);
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

    const oneMonthAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
    const recentProposals = allProposals
      .filter((proposal) => {
        const endTime = proposal.end * 1000;
        return endTime > oneMonthAgo || proposal.state === 'active';
      })
      .sort((a, b) => b.end - a.end);

    const projectOptions = projectsWithGovernance.map((project) => ({
      value: project.project,
      label: project.project,
    }));

    return (
      <GovernancePageClient
        initialProposals={recentProposals}
        projectOptions={projectOptions}
      />
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
