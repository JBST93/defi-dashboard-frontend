import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface YieldCurveProps {
  data: {
    daysToMaturity: number;
    discount: number;
  }[];
}

export default function YieldCurve({ data }: YieldCurveProps) {
  const sortedData = data.sort((a, b) => a.daysToMaturity - b.daysToMaturity);

  const chartData = {
    labels: sortedData.map((item) => item.daysToMaturity),
    datasets: [
      {
        label: 'Yield Curve',
        data: sortedData.map((item) => item.discount),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Yield Curve for Ethereum Pendle USDe',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Days to Maturity',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Discount (%)',
        },
      },
    },
  };

  return (
    <Line
      data={chartData}
      options={options}
    />
  );
}
