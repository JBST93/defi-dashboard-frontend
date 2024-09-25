'use client';

import React, { useState, useEffect } from 'react';

interface ProposalProps {
  proposal: {
    id: string;
    title: string;
    body: string;
    choices: string[];
    start: number;
    end: number;
    state: string;
    scores: number[];
    scores_total: number;
  };
  projectName: string;
  snapshotName: string;
}

const GovernanceProposal: React.FC<ProposalProps> = ({
  proposal,
  projectName,
  snapshotName,
}) => {
  const [timeLeft, setTimeLeft] = useState<string>('');

  useEffect(() => {
    if (proposal.state === 'active') {
      const timer = setInterval(() => {
        const now = new Date().getTime();
        const distance = proposal.end * 1000 - now;

        if (distance < 0) {
          clearInterval(timer);
          setTimeLeft('Ended');
        } else {
          const days = Math.floor(distance / (1000 * 60 * 60 * 24));
          const hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          const minutes = Math.floor(
            (distance % (1000 * 60 * 60)) / (1000 * 60)
          );
          setTimeLeft(`${days}d ${hours}h ${minutes}m`);
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [proposal.end, proposal.state]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'closed':
        return 'bg-red-600 text-white';
      case 'active':
        return 'bg-green-600 text-white';
      case 'pending':
        return 'bg-yellow-500 text-black';
      default:
        return 'bg-gray-600 text-white';
    }
  };

  const getCardBackgroundColor = (status: string) => {
    switch (status) {
      case 'closed':
        return 'bg-red-50';
      case 'active':
        return 'bg-green-50';
      case 'pending':
        return 'bg-yellow-50';
      default:
        return 'bg-white';
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-GB');
  };

  const getShortDescription = (body: string) => {
    const sentences = body.match(/[^\.!\?]+[\.!\?]+/g) || [];
    const shortDescription = sentences.slice(0, 3).join(' ');
    const trimmedDescription = shortDescription
      .split(' ')
      .map((word) => (word.length > 20 ? word.slice(0, 15) + '...' : word))
      .join(' ');
    return trimmedDescription.length > 200
      ? trimmedDescription.slice(0, 200) + '...'
      : trimmedDescription;
  };

  const getProposalUrl = () => {
    return `https://snapshot.org/#/${snapshotName}/proposal/${proposal.id}`;
  };

  const formatVotes = (votes: number) => {
    return votes.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <div
      className={`border rounded-lg p-4 shadow-md ${getCardBackgroundColor(
        proposal.state
      )}`}
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-lg font-semibold text-gray-700">
          {projectName}
        </span>
        <span
          className={`px-2 py-1 text-sm text-white rounded ${getStatusColor(
            proposal.state
          )}`}
        >
          {proposal.state.charAt(0).toUpperCase() + proposal.state.slice(1)}
        </span>
      </div>
      <a
        href={getProposalUrl()}
        className="text-2xl font-bold hover:underline block mb-2"
        target="_blank"
        rel="noopener noreferrer"
      >
        {proposal.title}
      </a>
      <p className="text-gray-600 mb-4">{getShortDescription(proposal.body)}</p>
      <div className="mb-4">
        <p>Start: {formatDate(proposal.start)}</p>
        <p>End: {formatDate(proposal.end)}</p>
      </div>
      <div className="mt-4 flex justify-between items-center">
        {proposal.state === 'active' ? (
          <div className="text-green-600 font-semibold">
            Time Remaining: {timeLeft}
          </div>
        ) : (
          ''
        )}
      </div>
      {proposal.scores && proposal.scores.length > 0 && (
        <div>
          <h4 className="font-semibold mb-2">Voting Results:</h4>
          <ul>
            {proposal.choices.map((choice, index) => (
              <li key={index}>
                {choice}: {formatVotes(proposal.scores[index])} (
                {(
                  (proposal.scores[index] / proposal.scores_total) *
                  100
                ).toFixed(2)}
                %)
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GovernanceProposal;
