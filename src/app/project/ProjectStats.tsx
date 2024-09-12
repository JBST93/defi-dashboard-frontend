import React from 'react';
import {
  FaDollarSign,
  FaChartLine,
  FaLock,
  FaProjectDiagram,
} from 'react-icons/fa';

interface Project {
  marketCap: number;
  dailyChange: number;
  tvl: number;
}

interface ProjectStatsProps {
  projects: Project[];
}

const ProjectStats: React.FC<ProjectStatsProps> = ({ projects }) => {
  const totalMarketCap = projects.reduce(
    (sum, project) =>
      sum + (typeof project.marketCap === 'number' ? project.marketCap : 0),
    0
  );
  const avgDailyChange =
    projects.reduce((sum, project) => sum + project.dailyChange, 0) /
    projects.length;
  const totalTVL = projects.reduce((sum, project) => sum + project.tvl, 0);
  const numberOfProjects = projects.length;

  const stats = [
    {
      title: 'Total Market Cap',
      value: `$${totalMarketCap.toLocaleString()}`,
      icon: FaDollarSign,
    },
    {
      title: 'Avg Daily Change',
      value: `${avgDailyChange.toFixed(2)}%`,
      icon: FaChartLine,
    },
    {
      title: 'Total TVL',
      value: `$${totalTVL.toLocaleString()}`,
      icon: FaLock,
    },
    {
      title: 'Number of Projects',
      value: numberOfProjects.toString(),
      icon: FaProjectDiagram,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center justify-center transition-all hover:shadow-lg"
        >
          <stat.icon className="text-2xl mb-2 text-blue-500" />
          <h2 className="text-sm sm:text-base font-semibold text-gray-700 mb-1 text-center">
            {stat.title}
          </h2>
          <p
            className={`text-lg sm:text-xl font-bold ${
              stat.title === 'Avg Daily Change'
                ? avgDailyChange >= 0
                  ? 'text-green-500'
                  : 'text-red-500'
                : 'text-gray-900'
            }`}
          >
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ProjectStats;
