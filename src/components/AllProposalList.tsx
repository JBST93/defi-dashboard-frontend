import React from 'react';
import Link from 'next/link';

interface Proposal {
  id: string;
  title: string;
  start: Date | string | number;
  protocol: string;
  state: string;
  type: string;
}

const AllProposalsList: React.FC<{ proposals: Proposal[] }> = ({
  proposals,
}) => {
  const formatDate = (date: Date | string | number) => {
    const dateObject = date instanceof Date ? date : new Date(date);
    return dateObject.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <ul className="space-y-4">
      {proposals.map((proposal) => (
        <li
          key={proposal.id}
          className="bg-white p-4 rounded-lg shadow"
        >
          <h3 className="text-lg font-semibold">{proposal.title}</h3>
          <p className="text-sm text-gray-500">
            {proposal.protocol} - {formatDate(proposal.start)}
          </p>
          <p className="text-sm">
            State: {proposal.state} | Type: {proposal.type}
          </p>
        </li>
      ))}
    </ul>
  );
};

export default AllProposalsList;
