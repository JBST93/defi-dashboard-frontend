import React from 'react';
import Link from 'next/link';

export interface Proposal {
  id: string;
  title: string;
  body: string;
  type: string;
  url: string;
  state: string;
  start: number;
  end: number;
  scores: number[];
  scores_total: number;
  choices: string[];
  protocol: string;
}

interface ProposalListProps {
  proposals: Proposal[];
}

export default function ProposalList({ proposals }: ProposalListProps) {
  return (
    <ul className="space-y-4">
      {proposals.map((proposal) => (
        <li
          key={proposal.id}
          className="bg-white p-4 rounded-lg shadow-md"
        >
          <h3 className="text-lg font-semibold mb-2">{proposal.title}</h3>
          <p className="text-sm text-gray-700 mb-3">{proposal.body}</p>
          <p className="text-sm text-gray-500 mb-2">
            Protocol: {proposal.protocol}
          </p>
          <p className="text-sm text-gray-500 mb-2">Type: {proposal.type}</p>
          <p className="text-sm text-gray-500 mb-2">State: {proposal.state}</p>
          <p className="text-sm text-gray-500 mb-2">
            Start: {new Date(proposal.start * 1000).toLocaleDateString()}
          </p>
          <p className="text-sm text-gray-500 mb-2">
            End: {new Date(proposal.end * 1000).toLocaleDateString()}
          </p>
          <div className="text-sm text-gray-500 mb-2">
            Votes:
            {proposal.choices.map((choice, index) => (
              <span
                key={index}
                className={`ml-2 ${
                  index === 0
                    ? 'text-green-500'
                    : index === 1
                    ? 'text-red-500'
                    : 'text-yellow-500'
                }`}
              >
                {choice}: {proposal.scores[index].toFixed(2)}
              </span>
            ))}
          </div>
          <p className="text-sm text-gray-500 mb-2">
            Total Votes: {proposal.scores_total.toFixed(2)}
          </p>
          <Link
            href={proposal.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline mt-2 inline-block"
          >
            View Proposal
          </Link>
        </li>
      ))}
    </ul>
  );
}
