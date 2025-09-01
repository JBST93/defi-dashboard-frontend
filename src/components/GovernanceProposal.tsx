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
        return 'bg-red-50 border-red-200';
      case 'active':
        return 'bg-green-50 border-green-200';
      case 'pending':
        return 'bg-yellow-50 border-yellow-200';
      default:
        return 'bg-white border-gray-200';
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
      className={`border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ${getCardBackgroundColor(
        proposal.state
      )}`}
    >
      {/* New header for time information */}
      <div className="bg-gray-50 p-3 border-b border-gray-200">
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <div>
              <span className="font-semibold text-gray-600">Start:</span>{' '}
              <span className="text-gray-800">
                {formatDate(proposal.start)}
              </span>
            </div>
            <div>
              <span className="font-semibold text-gray-600">End:</span>{' '}
              <span className="text-gray-800">{formatDate(proposal.end)}</span>
            </div>
          </div>
          {proposal.state === 'active' && timeLeft && (
            <div className="text-green-600 font-medium">{timeLeft}</div>
          )}
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold text-gray-800">
            {projectName}
          </span>
          <span
            className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(
              proposal.state
            )}`}
          >
            {proposal.state.charAt(0).toUpperCase() + proposal.state.slice(1)}
          </span>
        </div>

        <a
          href={getProposalUrl()}
          className="text-xl font-bold hover:text-blue-600 transition-colors block mb-3 text-gray-900"
          target="_blank"
          rel="noopener noreferrer"
        >
          {proposal.title}
        </a>
        <p className="text-gray-600 mb-4 leading-relaxed">
          {getShortDescription(proposal.body)}
        </p>
        {proposal.scores && proposal.scores.length > 0 && (
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold mb-3 text-gray-800">
              Voting Results:
            </h4>
            <ul className="space-y-2">
              {proposal.choices.map((choice, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center"
                >
                  <span className="text-gray-700">{choice}:</span>
                  <span className="font-medium text-gray-900">
                    {formatVotes(proposal.scores[index])} (
                    {(
                      (proposal.scores[index] / proposal.scores_total) *
                      100
                    ).toFixed(2)}
                    %)
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default GovernanceProposal;
