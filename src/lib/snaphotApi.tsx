import axios from 'axios';

interface Proposal {
  id: string;
  title: string;
  body: string;
  choices: string[];
  start: number;
  end: number;
  snapshot: string;
  state: string;
  scores: number[];
  scores_total: number;
}

export async function fetchProposals(
  snapshotName: string
): Promise<Proposal[]> {
  if (
    !snapshotName ||
    snapshotName === '' ||
    snapshotName.toLowerCase() === 'none'
  ) {
    console.error('Invalid snapshot name:', snapshotName);
    return []; // Return an empty array instead of throwing an error
  }

  try {
    console.log(`Fetching proposals for snapshot: ${snapshotName}`);
    const query = `
      query Proposals($space: String!) {
        proposals(
          first: 20,
          skip: 0,
          where: { space: $space },
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
          scores
          scores_total
        }
      }
    `;
    const variables = JSON.stringify({ space: snapshotName });

    console.log('Full API request:', {
      url: 'https://hub.snapshot.org/graphql',
      query,
      variables,
    });

    const response = await axios.get(`https://hub.snapshot.org/graphql`, {
      params: {
        query,
        variables,
      },
    });

    if (!response.data.data || !response.data.data.proposals) {
      console.error('Unexpected response structure:', response.data);
      throw new Error('Unexpected response structure from Snapshot API');
    }

    return response.data.data.proposals;
  } catch (error) {
    console.error(`Error fetching proposals for ${snapshotName}:`, error);
    return []; // Return an empty array on error
  }
}
