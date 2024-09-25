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
    scores: number[] | null;
    scores_total: number;
  };
  projectName: string; //
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
        return 'bg-red-500';
      case 'active':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString();
  };

  const getShortDescription = (body: string) => {
    // Split the body into sentences
    const sentences = body.match(/[^\.!\?]+[\.!\?]+/g) || [];

    // Take the first 3 sentences or fewer if there aren't 3
    const shortDescription = sentences.slice(0, 3).join(' ');

    // Truncate to roughly 200 characters if it's longer
    return shortDescription.length > 200
      ? shortDescription.slice(0, 200) + '...'
      : shortDescription;
  };

  const getProposalUrl = () => {
    if (!snapshotName) {
      console.error(`Missing snapshot name for proposal: ${proposal.id}`);
      return `https://snapshot.org/#/proposal/${proposal.id}`;
    }
    return `https://snapshot.org/#/${snapshotName}/proposal/${proposal.id}`;
  };

  const renderVotingResults = () => {
    if (!proposal.scores || proposal.scores.length === 0) return null;

    const total = proposal.scores.reduce((sum, score) => sum + score, 0);
    let startAngle = 0;

    return (
      <svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
      >
        {proposal.scores.map((score, index) => {
          const percentage = score / total;
          const endAngle = startAngle + percentage * 360;
          const largeArcFlag = percentage > 0.5 ? 1 : 0;
          const x1 = 50 + 50 * Math.cos((startAngle * Math.PI) / 180);
          const y1 = 50 + 50 * Math.sin((startAngle * Math.PI) / 180);
          const x2 = 50 + 50 * Math.cos((endAngle * Math.PI) / 180);
          const y2 = 50 + 50 * Math.sin((endAngle * Math.PI) / 180);

          const pathData = `M 50 50 L ${x1} ${y1} A 50 50 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;

          startAngle = endAngle;

          return (
            <path
              key={index}
              d={pathData}
              fill={`hsl(${index * 137.5}, 50%, 60%)`}
            />
          );
        })}
      </svg>
    );
  };

  return (
    <div className="border rounded-lg p-4 shadow-md bg-white">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-semibold text-gray-600">
          {projectName}
        </span>{' '}
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
        className="text-xl font-bold hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {proposal.title}
      </a>
      <p className="text-gray-600 mt-2">{getShortDescription(proposal.body)}</p>
      <div className="mt-4">
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
        <div className="mt-4">
          <h4 className="font-semibold">Voting Results:</h4>
          <ul>
            {proposal.choices.map((choice, index) => (
              <li key={index}>
                {choice}:{' '}
                {proposal.scores && proposal.scores[index] !== undefined
                  ? `${proposal.scores[index].toFixed(2)} (${(
                      (proposal.scores[index] / proposal.scores_total) *
                      100
                    ).toFixed(2)}%)`
                  : 'No votes'}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GovernanceProposal;
