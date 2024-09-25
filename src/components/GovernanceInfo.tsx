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
        <li>Proposals are created and discussed in the forum</li>
        <li>Formal proposals are submitted to Snapshot for voting</li>
        <li>Token holders cast their votes during the voting period</li>
        <li>Results are tallied and implemented if passed</li>
      </ol>
      <p className="text-blue-600 font-semibold">
        Contribute to the discussion and have your say in governance!
      </p>
    </div>
  );
};

export default GovernanceInfo;
