import React, { useMemo } from 'react';
import { ProjectData } from './ProjectTable';
import Image from 'next/image';

interface TopMoversProps {
  projects: ProjectData[];
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
      <div className="flex items-center space-x-2 mb-2">
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
      <p className={`text-lg font-bold ${colorClass}`}>
        {isPositive ? '+' : ''}
        {change.toFixed(2)}%
      </p>
    </div>
  );
};

const TopMovers: React.FC<TopMoversProps> = ({ projects }) => {
  const topMovers = useMemo(() => {
    const sortedProjects = [...projects].sort(
      (a, b) =>
        Math.abs(parseFloat(b.price_day_delta)) -
        Math.abs(parseFloat(a.price_day_delta))
    );

    const topGainer =
      sortedProjects.find((p) => parseFloat(p.price_day_delta) > 0) ||
      sortedProjects[0];
    const topLoser =
      sortedProjects.find((p) => parseFloat(p.price_day_delta) < 0) ||
      sortedProjects[1];

    const blockchains = sortedProjects.filter(
      (p) => p.category === 'Blockchain'
    );
    const topBlockchainGainer =
      blockchains.find((p) => parseFloat(p.price_day_delta) > 0) ||
      blockchains[0];
    const topBlockchainLoser =
      blockchains.find((p) => parseFloat(p.price_day_delta) < 0) ||
      blockchains[1];

    return { topGainer, topLoser, topBlockchainGainer, topBlockchainLoser };
  }, [projects]);

  return (
    <div className="bg-gradient-to-r from-amber-100 to-orange-200 rounded-xl shadow-lg overflow-hidden border-2 border-amber-300 p-4 sm:p-6">
      <h2 className="text-2xl font-bold mb-4 text-brown-800">
        Top Movers (24h)
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ProjectCard
          project={topMovers.topGainer}
          label="Top Gainer"
        />
        <ProjectCard
          project={topMovers.topLoser}
          label="Top Loser"
        />
        <ProjectCard
          project={topMovers.topBlockchainGainer}
          label="Top Blockchain Gainer"
        />
        <ProjectCard
          project={topMovers.topBlockchainLoser}
          label="Top Blockchain Loser"
        />
      </div>
    </div>
  );
};

export default TopMovers;
