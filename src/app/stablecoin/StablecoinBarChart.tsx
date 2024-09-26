'use client';

import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { ChartOptions } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Project {
  token: string;
  marketCap: number;
  type: string;
}

interface StablecoinBarChartProps {
  projects: Project[];
}

const StablecoinBarChart: React.FC<StablecoinBarChartProps> = ({
  projects,
}) => {
  const [chartData, setChartData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleTokens, setVisibleTokens] = useState<Set<string>>(new Set());
  const [originalData, setOriginalData] = useState<any>(null);
  const [totalMarketCap, setTotalMarketCap] = useState<number>(0);

  useEffect(() => {
    console.log('Raw projects data:', projects);
    if (!projects || projects.length === 0) {
      console.error('No projects data available');
      setIsLoading(false);
      return;
    }

    try {
      const stablecoins = projects.filter(
        (project) => project.type.toLowerCase() === 'stablecoin'
      );
      console.log('Filtered stablecoins:', stablecoins);

      if (stablecoins.length === 0) {
        console.error('No stablecoins found in the projects data');
        setIsLoading(false);
        return;
      }

      const totalMarketCap = stablecoins.reduce(
        (sum, project) => sum + project.marketCap,
        0
      );
      setTotalMarketCap(totalMarketCap);
      console.log('Total market cap:', totalMarketCap);

      if (totalMarketCap === 0) {
        console.error('Total market cap is zero');
        setIsLoading(false);
        return;
      }

      let otherPercentage = 0;
      const data = stablecoins
        .map((project) => ({
          token: project.token,
          percentage: (project.marketCap / totalMarketCap) * 100,
        }))
        .sort((a, b) => b.percentage - a.percentage)
        .reduce((acc, item) => {
          if (item.percentage < 0.2) {
            otherPercentage += item.percentage;
          } else {
            acc.push(item);
          }
          return acc;
        }, [] as { token: string; percentage: number }[]);

      if (otherPercentage > 0) {
        data.push({ token: 'Other', percentage: otherPercentage });
      }

      console.log('Processed chart data:', data);

      const tokens = data.map((item) => item.token);
      setVisibleTokens(new Set(tokens));

      const newChartData = {
        labels: data.map((item) => item.token),
        datasets: [
          {
            label: 'Market Share (%)',
            data: data.map((item) => item.percentage),
            backgroundColor: 'rgba(53, 162, 235, 0.8)',
            borderColor: 'rgba(53, 162, 235, 1)',
            borderWidth: 1,
          },
        ],
      };

      setChartData(newChartData);
      setOriginalData(newChartData); // Store the original data
      setIsLoading(false);
    } catch (error) {
      console.error('Error processing chart data:', error);
      setIsLoading(false);
    }
  }, [projects]);

  useEffect(() => {
    if (originalData) {
      const updatedChartData = {
        ...originalData,
        datasets: originalData.datasets.map((dataset: any) => ({
          ...dataset,
          data: originalData.labels.map((label: string) =>
            visibleTokens.has(label)
              ? dataset.data[originalData.labels.indexOf(label)]
              : 0
          ),
        })),
      };
      setChartData(updatedChartData);
    }
  }, [visibleTokens, originalData]);

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const options: ChartOptions<'bar'> = {
    indexAxis: 'x' as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
    scales: {
      x: {
        ticks: {
          color: '#333',
          font: { size: 10 },
          autoSkip: false,
          maxRotation: 90,
          minRotation: 90,
        },
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: '#333',
          font: { size: 10 },
          callback: function (value) {
            return value + '%';
          },
        },
        grid: {
          display: false,
        },
      },
    },
  };

  if (isLoading) return <div>Loading...</div>;
  if (!chartData) return <div>No data available</div>;

  return (
    <div
      style={{
        backgroundColor: 'white',
        padding: '1rem',
        borderRadius: '0.5rem',
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      }}
    >
      <h2
        style={{
          fontSize: '1.25rem',
          fontWeight: 'bold',
          marginBottom: '1rem',
        }}
      >
        Stablecoin Market Share
      </h2>
      <div
        style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}
      >
        <span style={{ fontSize: '0.875rem', marginRight: '0.5rem' }}>
          Total Market Cap:
        </span>
        <span style={{ fontSize: '1.125rem', fontWeight: '600' }}>
          {formatCurrency(totalMarketCap)}
        </span>
      </div>
      <div style={{ height: '300px', backgroundColor: 'white' }}>
        <Bar
          data={chartData}
          options={options}
          plugins={[
            {
              id: 'percentagePlugin',
              afterDraw: (chart: any) => {
                const ctx = chart.ctx;
                chart.data.datasets.forEach((dataset: any, i: number) => {
                  const meta = chart.getDatasetMeta(i);
                  if (!meta.hidden) {
                    meta.data.forEach((bar: any, index: number) => {
                      const data = dataset.data[index].toFixed(1) + '%';
                      ctx.fillStyle = '#333';
                      ctx.textAlign = 'center';
                      ctx.textBaseline = 'bottom';
                      ctx.font = '10px Arial';
                      ctx.fillText(data, bar.x, bar.y - 5);
                    });
                  }
                });
              },
            },
          ]}
        />
      </div>
    </div>
  );
};

export default StablecoinBarChart;
