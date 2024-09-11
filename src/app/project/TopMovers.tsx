import React from 'react';
import { ProjectData } from './ProjectTable';
import Image from 'next/image';

interface TopMoversProps {
  topGainers: ProjectData[];
  topLosers: ProjectData[];
  topBlockchainWinner: ProjectData;
  topBlockchainLoser: ProjectData;
}

const ProjectCard = ({
  project,
  label,
}: {
  project: ProjectData;
  label: string;
}) => {
  const change = parseFloat(project.price_day_delta);
  const isPositive = change >= 0;
  const colorClass = isPositive ? 'text-green-600' : 'text-red-600';

  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between h-full">
      <h4 className="font-semibold text-sm mb-2">{label}</h4>
      <div className="flex items-center space-x-2">
        {project.logo && (
          <Image
            src={project.logo}
            alt={`${project.project} logo`}
            width={24}
            height={24}
            className="rounded-full"
          />
        )}
        <p className="text-lg font-bold">{project.project}</p>
      </div>
      <p className={`text-lg font-bold ${colorClass} mt-2`}>
        {isPositive ? '+' : ''}
        {change.toFixed(2)}%
      </p>
    </div>
  );
};

const TopMovers: React.FC<TopMoversProps> = ({
  topGainers,
  topLosers,
  topBlockchainWinner,
  topBlockchainLoser,
}) => {
  return (
    <div className="bg-gradient-to-r from-amber-100 to-orange-200 rounded-xl shadow-lg overflow-hidden border-2 border-amber-300 p-6">
      <h2 className="text-2xl font-bold mb-4 text-brown-800">
        Top Movers (24h)
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ProjectCard
          project={topGainers[0]}
          label="Top Gainer"
        />
        <ProjectCard
          project={topLosers[0]}
          label="Top Loser"
        />
        <ProjectCard
          project={topBlockchainWinner}
          label="Top Blockchain Gainer"
        />
        <ProjectCard
          project={topBlockchainLoser}
          label="Top Blockchain Loser"
        />
      </div>
    </div>
  );
};

export default TopMovers;
