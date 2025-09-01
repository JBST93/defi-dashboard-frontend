import React from 'react';

const GovernanceInfo: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-8 border border-gray-100">
      <h2 className="text-xl font-semibold mb-4 text-gray-900">
        About DeFi Governance
      </h2>
      <p className="mb-4 text-gray-600 leading-relaxed">
        Governance allows token holders to participate in the decision-making
        process of DeFi protocols. Proposals are discussed in the forum and then
        voted on using Snapshot.
      </p>
      <p className="mb-3 text-gray-800 font-medium">How it works:</p>
      <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-600">
        <li>
          <strong>Discussion:</strong> Proposals are first discussed by the
          community in the forum.
        </li>
        <li>
          <strong>Voting:</strong> Formal proposals are then posted on Snapshot
          for voting.
        </li>
        <li>
          <strong>Participation:</strong> Token holders can vote on proposals
          during the voting period.
        </li>
        <li>
          <strong>Results:</strong> If a proposal passes, it&apos;s implemented
          by the project.
        </li>
      </ol>
      <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
        <p className="text-blue-800 text-sm">
          💡 <strong>Tip:</strong> Click on any proposal title to view the full
          details and participate in voting on Snapshot.
        </p>
      </div>
    </div>
  );
};

export default GovernanceInfo;
