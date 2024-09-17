import React from 'react';
import { FaDollarSign, FaBitcoin, FaEthereum, FaCoins } from 'react-icons/fa';

interface ProjectOverviewProps {
  totalMarketCap: number;
  btcDominance: number;
  ethDominance: number;
  stablecoinDominance: number;
}

const ProjectOverview: React.FC<ProjectOverviewProps> = ({
  totalMarketCap,
  btcDominance,
  ethDominance,
  stablecoinDominance,
}) => {
  const formatPercentage = (value: number) => `${(value * 100).toFixed(2)}%`;
  const formatMarketCap = (value: number) => `$${(value / 1e9).toFixed(2)}B`;

  const stats = [
    {
      title: 'Total Market Cap',
      value: formatMarketCap(totalMarketCap),
      icon: FaDollarSign,
    },
    {
      title: 'BTC Dominance',
      value: formatPercentage(btcDominance),
      icon: FaBitcoin,
    },
    {
      title: 'ETH Dominance',
      value: formatPercentage(ethDominance),
      icon: FaEthereum,
    },
    {
      title: 'Stablecoin Dominance',
      value: formatPercentage(stablecoinDominance),
      icon: FaCoins,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white retro-box shadow-md p-4 flex flex-col items-center justify-center transition-all hover:shadow-lg"
        >
          <stat.icon className="text-2xl mb-2 text-amber-500" />
          <h2 className="text-sm font-semibold text-gray-700 mb-1 text-center">
            {stat.title}
          </h2>
          <p className="text-lg font-bold text-gray-900">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default ProjectOverview;
