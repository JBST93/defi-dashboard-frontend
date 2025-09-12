import { fetchProjects } from '@/lib/api';
import { fetchProposals } from '@/lib/snaphotApi';
import { generateMockForumDiscussions } from '@/lib/forumData';
import GovernancePageClient from './GovernancePageClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DeFi Governance Tracker 2025 | Live DAO Proposals & Voting Analytics',
  description:
    'Track live governance proposals across 20+ DeFi protocols including Aave, Uniswap, Lido, Compound. Real-time voting analytics, proposal filtering, and DAO decision tracking. Stay informed on DeFi governance.',
  keywords: [
    'DeFi governance tracker',
    'DAO proposals 2025',
    'DeFi voting analytics',
    'Aave governance proposals',
    'Uniswap governance',
    'Lido DAO voting',
    'Compound governance',
    'DeFi DAO decisions',
    'governance proposals tracker',
    'DeFi protocol governance',
    'cryptocurrency governance',
    'blockchain voting',
    'DeFi community governance',
    'governance analytics',
    'DAO proposal monitoring',
  ],
  openGraph: {
    title:
      'DeFi Governance Tracker 2025 | Live DAO Proposals & Voting Analytics',
    description:
      'Track live governance proposals across 20+ DeFi protocols. Real-time voting analytics, proposal filtering, and DAO decision tracking.',
    url: 'https://www.tokendataview.com/governance',
    type: 'website',
    images: [
      {
        url: 'https://www.tokendataview.com/og-governance-tracker.jpg',
        width: 1200,
        height: 630,
        alt: 'DeFi Governance Tracker Dashboard',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DeFi Governance Tracker | Live DAO Proposals & Voting Analytics',
    description:
      'Track live governance proposals across major DeFi protocols. Stay informed on voting outcomes that effect stablecoin yields and platform development. Real time governance data for informed participation.',
    images: ['https://www.tokendataview.com/og-governance-tracker.jpg'],
  },
  alternates: {
    canonical: 'https://www.tokendataview.com/governance',
  },
};

interface Project {
  project: string;
  snapshot_name?: string;
  governance_type?: 'snapshot' | 'custom' | 'forum_only';
  custom_governance_url?: string;
  forum_url?: string;
}

const GOVERNANCE_CONFIG: { [key: string]: Project } = {
  Aave: {
    project: 'Aave',
    snapshot_name: 'aavedao.eth',
    governance_type: 'snapshot',
    forum_url: 'https://governance.aave.com/latest',
  },
  Uniswap: {
    project: 'Uniswap',
    snapshot_name: 'uniswapgovernance.eth',
    governance_type: 'snapshot',
    forum_url: 'https://gov.uniswap.org/latest',
  },
  Curve: {
    project: 'Curve',
    snapshot_name: 'curve.eth',
    governance_type: 'snapshot',
    forum_url: 'https://gov.curve.fi/latest',
  },
  Maker: {
    project: 'Maker',
    snapshot_name: 'makerdao.eth',
    governance_type: 'snapshot',
    forum_url: 'https://forum.makerdao.com/latest',
  },
  Compound: {
    project: 'Compound',
    snapshot_name: 'compound.eth',
    governance_type: 'snapshot',
    forum_url: 'https://www.comp.xyz/latest',
  },
  '1inch': {
    project: '1inch',
    snapshot_name: '1inch.eth',
    governance_type: 'snapshot',
    forum_url: 'https://gov.1inch.io/latest',
  },
  Sushi: {
    project: 'Sushi',
    snapshot_name: 'sushiswap.eth',
    governance_type: 'snapshot',
    forum_url: 'https://forum.sushi.com/latest',
  },
  OpenSea: {
    project: 'OpenSea',
    snapshot_name: 'opensea.eth',
    governance_type: 'snapshot',
    forum_url: 'https://opensea.io/blog',
  },
  Synthetix: {
    project: 'Synthetix',
    snapshot_name: 'synthetix.eth',
    governance_type: 'snapshot',
    forum_url: 'https://research.synthetix.io/latest',
  },
  TheGraph: {
    project: 'TheGraph',
    snapshot_name: 'thegraph.eth',
    governance_type: 'snapshot',
    forum_url: 'https://forum.thegraph.com/latest',
  },
  Gearbox: {
    project: 'Gearbox',
    snapshot_name: 'gearbox.eth',
    governance_type: 'snapshot',
    forum_url: 'https://gov.gearbox.fi/latest',
  },
  Ethena: {
    project: 'Ethena',
    snapshot_name: 'ethenagovernance.eth', // Correct Ethena Snapshot space
    governance_type: 'snapshot',
    forum_url: 'https://gov.ethenafoundation.com/latest?order=created',
  },
  Morpho: {
    project: 'Morpho',
    snapshot_name: 'morpho.eth',
    governance_type: 'snapshot',
    forum_url: 'https://gov.morpho.xyz/latest',
  },
  Pendle: {
    project: 'Pendle',
    snapshot_name: 'pendle.eth',
    governance_type: 'snapshot',
    forum_url: 'https://gov.pendle.finance/latest',
  },
};

export default async function GovernancePage() {
  try {
    // Try to fetch projects from API first
    let projects: Project[] = [];
    try {
      projects = await fetchProjects();
    } catch (error) {
      console.warn('Failed to fetch projects from API, using fallback:', error);
    }

    // Create projects with governance from API data or fallback to known config
    const projectsWithGovernance: Project[] = [];

    if (projects.length > 0) {
      // Use API data if available, but merge with our governance config
      projects.forEach((project: Project) => {
        const config = GOVERNANCE_CONFIG[project.project];
        if (config) {
          // Merge API data with our governance config
          projectsWithGovernance.push({
            ...config,
            ...project,
          });
        }
      });
    } else {
      // Fallback: use our governance config directly
      Object.values(GOVERNANCE_CONFIG).forEach((config) => {
        projectsWithGovernance.push(config);
      });
    }

    console.log('Projects with governance:', projectsWithGovernance);

    let allProposals: any = [];
    for (const project of projectsWithGovernance) {
      try {
        if (project.governance_type === 'snapshot' && project.snapshot_name) {
          console.log(
            `Fetching Snapshot proposals for ${project.project} (${project.snapshot_name})`
          );
          const proposals = await fetchProposals(project.snapshot_name);
          console.log(
            `Found ${proposals.length} Snapshot proposals for ${project.project}`
          );
          allProposals = [
            ...allProposals,
            ...proposals.map((p) => ({
              ...p,
              projectName: project.project,
              snapshotName: project.snapshot_name,
              governanceType: 'snapshot',
              governanceUrl: `https://snapshot.org/#/${project.snapshot_name}`,
              forumUrl: project.forum_url,
            })),
          ];
        } else if (project.governance_type === 'custom') {
          // For custom governance platforms like AAVE, we'll add a placeholder
          // In the future, we could integrate with their APIs
          console.log(
            `Skipping ${project.project} - custom governance platform (${project.custom_governance_url})`
          );
          // Add a placeholder entry to show the protocol exists
          allProposals.push({
            id: `custom-${project.project.toLowerCase()}`,
            title: `${project.project} Governance Platform`,
            body: `Visit ${project.project}'s custom governance platform to view active proposals.`,
            choices: ['Visit Governance'],
            start: Math.floor(Date.now() / 1000),
            end: Math.floor(Date.now() / 1000) + 86400, // 24 hours from now
            snapshot: '',
            state: 'active',
            scores: [0],
            scores_total: 0,
            projectName: project.project,
            snapshotName: project.snapshot_name || '',
            governanceType: 'custom',
            governanceUrl: project.custom_governance_url,
            forumUrl: project.forum_url,
            isCustomPlatform: true,
          });
        }
      } catch (error) {
        console.error(
          `Error fetching proposals for ${project.project}:`,
          error
        );
      }
    }

    console.log(`Total proposals fetched: ${allProposals.length}`);

    const oneMonthAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
    const recentProposals = allProposals
      .filter((proposal: any) => {
        const endTime = proposal.end * 1000;
        return endTime > oneMonthAgo || proposal.state === 'active';
      })
      .sort((a: any, b: any) => b.end - a.end);

    const projectOptions = projectsWithGovernance.map((project: Project) => ({
      value: project.project,
      label: project.project,
    }));

    // Generate forum discussions
    const forumDiscussions = generateMockForumDiscussions();

    return (
      <GovernancePageClient
        initialProposals={recentProposals}
        projectOptions={projectOptions}
        forumDiscussions={forumDiscussions}
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
