import React from 'react';

const GovernanceInfo: React.FC = () => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg mb-6">
      <h2 className="text-xl font-semibold mb-2">About Governance</h2>
      <p className="mb-2">
        Governance allows token holders to participate in the decision-making
        process of the project. Proposals are discussed in the forum and then
        voted on using Snapshot.
      </p>
      <p className="mb-2">
        <strong>How it works:</strong>
      </p>
      <ol className="list-decimal list-inside mb-2">
        <li>
          Discussion: Proposals are first discussed by the community in the
          forum.
        </li>
        <li>
          Voting: Formal proposals are then posted on Snapshot for voting.
        </li>
        <li>
          Participation: Token holders can vote on proposals during the voting
          period.
        </li>
        <li>Results: If a proposal passes, it’s implemented by the project.</li>
      </ol>
    </div>
  );
};

export default GovernanceInfo;
