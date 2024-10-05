import React from 'react';
import { FaDollarSign, FaBitcoin, FaEthereum, FaCoins } from 'react-icons/fa';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
    <Card className="bg-white border-brown-300 shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-brown-800">
          Market Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex items-center space-x-3"
            >
              <div className="bg-amber-100 rounded-full p-2 flex-shrink-0">
                <stat.icon className="text-xl text-amber-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">
                  {stat.title}
                </p>
                <p className="text-lg font-semibold text-gray-900">
                  {stat.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectOverview;
