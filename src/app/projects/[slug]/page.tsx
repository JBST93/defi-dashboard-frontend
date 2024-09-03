'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

interface YieldData {
  id: string;
  market: string;
  project: string;
  chain: string;
  yield_rate_base: number | string | any;
  tvl: number | string | any;
}

export default function ProjectPage() {
  const params = useParams();
  const [projectData, setProjectData] = useState<YieldData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedChain, setSelectedChain] = useState<string>('All');
  const [selectedAPYRange, setSelectedAPYRange] = useState<string>('All');

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const response = await fetch(
          'https://www.tokendataview.com/api/yield_rates'
        );
        const data: YieldData[] = await response.json();
        const filteredData = data.filter(
          (item) =>
            item.project.toLowerCase().replace(/\s+/g, '-') === params.slug
        );
        setProjectData(filteredData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching project data:', error);
        setError('Failed to fetch project data. Please try again later.');
        setProjectData([]);
        setIsLoading(false);
      }
    };

    fetchProjectData();
  }, [params.slug]);

  if (isLoading) {
    return <div className="text-center text-2xl mt-8">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-2xl mt-8 text-red-600">{error}</div>
    );
  }

  if (projectData.length === 0) {
    return (
      <div className="text-center text-2xl mt-8">
        No data found for this project.
      </div>
    );
  }

  const totalTVL = projectData.reduce((sum, item) => {
    const tvl = typeof item.tvl === 'number' ? item.tvl : parseFloat(item.tvl);
    return sum + (isNaN(tvl) ? 0 : tvl);
  }, 0);
  const projectName = projectData[0].project;
  const uniqueChains = Array.from(
    new Set(projectData.map((item) => item.chain))
  );

  const formatYieldRate = (yield_rate: any): string => {
    if (typeof yield_rate === 'number') {
      return yield_rate.toFixed(2) + '%';
    } else if (typeof yield_rate === 'string') {
      const numericValue = parseFloat(yield_rate);
      return isNaN(numericValue) ? 'N/A' : numericValue.toFixed(2) + '%';
    }
    return 'N/A';
  };

  const formatTVL = (tvl: any): string => {
    if (typeof tvl === 'number') {
      return '$' + tvl.toLocaleString();
    } else if (typeof tvl === 'string') {
      const numericValue = parseFloat(tvl);
      return isNaN(numericValue) ? 'N/A' : '$' + numericValue.toLocaleString();
    }
    return 'N/A';
  };

  // Prepare data for the pie chart
  const marketData = projectData.map((item) => ({
    market: item.market,
    tvl: typeof item.tvl === 'number' ? item.tvl : parseFloat(item.tvl) || 0,
  }));

  marketData.sort((a, b) => b.tvl - a.tvl);

  const topMarkets = marketData.filter((item) => item.tvl / totalTVL >= 0.1);
  const othersTVL = marketData
    .filter((item) => item.tvl / totalTVL < 0.1)
    .reduce((sum, item) => sum + item.tvl, 0);

  const chartData = {
    labels: [...topMarkets.map((item) => item.market), 'Others'],
    datasets: [
      {
        data: [...topMarkets.map((item) => item.tvl), othersTVL],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const value = context.raw;
            const percentage = ((value / totalTVL) * 100).toFixed(2);
            return `${
              context.label
            }: $${value.toLocaleString()} (${percentage}%)`;
          },
        },
      },
      datalabels: {
        color: '#fff',
        font: {
          weight: 'bold',
          size: 12,
        },
        formatter: (value: number, ctx: any) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          const percentage = ((value / totalTVL) * 100).toFixed(1);
          return `${label}\n${percentage}%`;
        },
        textAlign: 'center',
        display: function (context: any) {
          const dataset = context.dataset;
          const value = dataset.data[context.dataIndex];
          return value / totalTVL > 0.05; // Only show label if slice is more than 5% of total
        },
      },
    },
    layout: {
      padding: 20,
    },
  };

  // Prepare data for the TVL per chain pie chart
  const chainData = uniqueChains.map((chain) => ({
    chain,
    tvl: projectData
      .filter((item) => item.chain === chain)
      .reduce(
        (sum, item) =>
          sum +
          (typeof item.tvl === 'number' ? item.tvl : parseFloat(item.tvl) || 0),
        0
      ),
  }));

  chainData.sort((a, b) => b.tvl - a.tvl);

  const topChains = chainData.filter((item) => item.tvl / totalTVL >= 0.05);
  const othersTVLChain = chainData
    .filter((item) => item.tvl / totalTVL < 0.05)
    .reduce((sum, item) => sum + item.tvl, 0);

  const chainChartData = {
    labels: [...topChains.map((item) => item.chain), 'Others'],
    datasets: [
      {
        data: [...topChains.map((item) => item.tvl), othersTVLChain],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
        ],
      },
    ],
  };

  const chainChartOptions = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const value = context.raw;
            const percentage = ((value / totalTVL) * 100).toFixed(2);
            return `${
              context.label
            }: $${value.toLocaleString()} (${percentage}%)`;
          },
        },
      },
      datalabels: {
        color: '#fff',
        font: {
          weight: 'bold',
          size: 12,
        },
        formatter: (value: number, ctx: any) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          const percentage = ((value / totalTVL) * 100).toFixed(1);
          return `${label}\n${percentage}%`;
        },
        textAlign: 'center',
        display: function (context: any) {
          const dataset = context.dataset;
          const value = dataset.data[context.dataIndex];
          return value / totalTVL > 0.05;
        },
      },
    },
    layout: {
      padding: 20,
    },
  };

  const filterData = (data: YieldData[]) => {
    return data.filter((item) => {
      const chainFilter =
        selectedChain === 'All' || item.chain === selectedChain;
      const apyValue = parseFloat(item.yield_rate_base as string);
      let apyFilter = true;
      switch (selectedAPYRange) {
        case '0-5':
          apyFilter = apyValue >= 0 && apyValue < 5;
          break;
        case '5-10':
          apyFilter = apyValue >= 5 && apyValue < 10;
          break;
        case '10+':
          apyFilter = apyValue >= 10;
          break;
      }
      return chainFilter && apyFilter;
    });
  };

  const filteredProjectData = filterData(projectData);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 to-orange-200 text-brown-800 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Link
            href="/yield"
            className="inline-block bg-brown-600 text-black px-6 py-2 rounded-lg hover:bg-brown-700 transition-colors duration-200 ease-in-out"
          >
            ← Back to Yield Page
          </Link>
        </div>
        <h1 className="text-5xl font-bold mb-12 text-center text-brown-900 retro-shadow">
          {projectName}
        </h1>
        <div className="bg-white p-8 rounded-xl shadow-lg mb-12">
          <h2 className="text-3xl font-semibold mb-6 text-brown-800">
            Project Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="bg-amber-50 p-6 rounded-lg shadow-md">
              <p className="text-xl font-bold mb-2 text-brown-700">Total TVL</p>
              <p className="text-3xl text-amber-600">
                ${totalTVL.toLocaleString()}
              </p>
            </div>
            <div className="bg-amber-50 p-6 rounded-lg shadow-md">
              <p className="text-xl font-bold mb-2 text-brown-700">
                Number of Markets
              </p>
              <p className="text-3xl text-amber-600">{projectData.length}</p>
            </div>
            <div className="bg-amber-50 p-6 rounded-lg shadow-md">
              <p className="text-xl font-bold mb-2 text-brown-700">Chains</p>
              <p className="text-lg text-amber-600">
                {uniqueChains.join(', ')}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-brown-800">
                Market Distribution
              </h3>
              <div className="w-full h-[400px]">
                <Pie
                  data={chartData}
                  options={chartOptions}
                />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-brown-800">
                TVL per Chain
              </h3>
              <div className="w-full h-[400px]">
                <Pie
                  data={chainChartData}
                  options={chainChartOptions}
                />
              </div>
            </div>
          </div>
        </div>
        <h2 className="text-3xl font-semibold mb-6 text-brown-800">Markets</h2>
        <div className="mb-4 flex space-x-4">
          <select
            className="p-2 rounded-md border border-amber-300 bg-white"
            value={selectedChain}
            onChange={(e) => setSelectedChain(e.target.value)}
          >
            <option value="All">All Chains</option>
            {uniqueChains.map((chain) => (
              <option
                key={chain}
                value={chain}
              >
                {chain}
              </option>
            ))}
          </select>
          <select
            className="p-2 rounded-md border border-amber-300 bg-white"
            value={selectedAPYRange}
            onChange={(e) => setSelectedAPYRange(e.target.value)}
          >
            <option value="All">All APY</option>
            <option value="0-5">0-5%</option>
            <option value="5-10">5-10%</option>
            <option value="10+">10%+</option>
          </select>
        </div>
        <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
          <table className="w-full border-collapse">
            <thead className="bg-amber-100">
              <tr>
                <th className="p-4 text-left text-brown-800">Market</th>
                <th className="p-4 text-left text-brown-800">Chain</th>
                <th className="p-4 text-left text-brown-800">APY</th>
                <th className="p-4 text-left text-brown-800">TVL</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjectData.map((item, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? 'bg-amber-50' : 'bg-white'}
                >
                  <td className="p-4">{item.market}</td>
                  <td className="p-4">{item.chain}</td>
                  <td className="p-4 text-green-600 font-semibold">
                    {formatYieldRate(item.yield_rate_base)}
                  </td>
                  <td className="p-4">{formatTVL(item.tvl)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
