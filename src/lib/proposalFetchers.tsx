import axios from 'axios';
import { Proposal } from '@/components/ProposalList';

const SNAPSHOT_API_URL = 'https://hub.snapshot.org/graphql';

async function fetchSnapshotProposals(
  space: string,
  protocol: string
): Promise<Proposal[]> {
  const response = await axios.post(SNAPSHOT_API_URL, {
    query: `
      query Proposals($space: String!) {
        proposals(
          first: 20,
          skip: 0,
          where: {
            space_in: [$space],
            state: "all"
          },
          orderBy: "created",
          orderDirection: desc
        ) {
          id
          title
          body
          choices
          start
          end
          snapshot
          state
          author
          space {
            id
            name
          }
          scores
          scores_total
        }
      }
    `,
    variables: {
      space: space,
    },
  });

  return response.data.data.proposals.map((proposal: any) => ({
    id: proposal.id,
    title: proposal.title,
    body: proposal.body,
    type: 'snapshot',
    url: `https://snapshot.org/#/${space}/proposal/${proposal.id}`,
    state: proposal.state,
    start: proposal.start,
    end: proposal.end,
    scores: proposal.scores || [],
    scores_total: proposal.scores_total || 0,
    choices: proposal.choices || [],
    protocol: protocol,
  }));
}

async function fetchForumProposals(
  forumUrl: string,
  protocol: string
): Promise<Proposal[]> {
  // Implement forum scraping or API call here
  // This is a placeholder implementation
  return [];
}

export async function fetchCurveProposals(): Promise<Proposal[]> {
  const snapshotProposals = await fetchSnapshotProposals('curve.eth', 'Curve');
  const forumProposals = await fetchForumProposals(
    'https://gov.curve.fi/',
    'Curve'
  );
  return [...snapshotProposals, ...forumProposals];
}

export async function fetchUniswapProposals(): Promise<Proposal[]> {
  const snapshotProposals = await fetchSnapshotProposals('uniswap', 'Uniswap');
  const forumProposals = await fetchForumProposals(
    'https://gov.uniswap.org/',
    'Uniswap'
  );
  return [...snapshotProposals, ...forumProposals];
}

export async function fetchBalancerProposals(): Promise<Proposal[]> {
  const snapshotProposals = await fetchSnapshotProposals(
    'balancer.eth',
    'Balancer'
  );
  const forumProposals = await fetchForumProposals(
    'https://forum.balancer.fi/',
    'Balancer'
  );
  return [...snapshotProposals, ...forumProposals];
}

export async function fetchAaveProposals(): Promise<Proposal[]> {
  const snapshotProposals = await fetchSnapshotProposals('aave.eth', 'Aave');
  const forumProposals = await fetchForumProposals(
    'https://governance.aave.com/',
    'Aave'
  );
  return [...snapshotProposals, ...forumProposals];
}

export async function fetchFraxProposals(): Promise<Proposal[]> {
  const snapshotProposals = await fetchSnapshotProposals('frax.eth', 'Frax');
  const forumProposals = await fetchForumProposals(
    'https://snapshot.org/#/frax.eth',
    'Frax'
  );
  return [...snapshotProposals, ...forumProposals];
}
