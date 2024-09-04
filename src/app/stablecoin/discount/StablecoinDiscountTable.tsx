import React, { useState } from 'react';

interface DiscountData {
  id: number;
  token: string;
  underlying: string;
  chain: string;
  ptPrice: number;
  tokenPrice: number;
  maturity: string;
  daysToMaturity: number;
  liquidity: number;
  ytm: number;
  apy: number;
}

interface Props {
  discountData: DiscountData[];
  isLoading: boolean;
}

type SortKey = 'discount' | 'daysToMaturity' | 'liquidity' | 'apy' | 'ytm';

export default function StablecoinDiscountTable({
  discountData,
  isLoading,
}: Props) {
  const [sortKey, setSortKey] = useState<SortKey>('discount');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const sortedData = [...discountData].sort((a, b) => {
    if (a[sortKey] < b[sortKey]) return sortOrder === 'asc' ? -1 : 1;
    if (a[sortKey] > b[sortKey]) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('desc');
    }
  };

  const SortableHeader = ({
    label,
    sortKey: key,
  }: {
    label: string;
    sortKey: SortKey;
  }) => (
    <th
      className="py-3 px-6 text-left cursor-pointer hover:bg-gray-300"
      onClick={() => handleSort(key)}
    >
      {label}
      {sortKey === key && (sortOrder === 'asc' ? ' ▲' : ' ▼')}
    </th>
  );

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Token</th>
            <th className="py-3 px-6 text-left">Underlying</th>
            <th className="py-3 px-6 text-left">Chain</th>
            <th className="py-3 px-6 text-left">PT Price</th>
            <th className="py-3 px-6 text-left">Token Price</th>
            <th className="py-3 px-6 text-left">Maturity</th>
            <SortableHeader
              label="Days to Maturity"
              sortKey="daysToMaturity"
            />
            <SortableHeader
              label="Liquidity"
              sortKey="liquidity"
            />
            <SortableHeader
              label="YTM"
              sortKey="ytm"
            />
            <SortableHeader
              label="APY"
              sortKey="apy"
            />
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {sortedData.map((item) => (
            <tr
              key={item.id}
              className="border-b border-gray-200 hover:bg-gray-100"
            >
              <td className="py-3 px-6 text-left whitespace-nowrap">
                {item.token}
              </td>
              <td className="py-3 px-6 text-left">{item.underlying}</td>
              <td className="py-3 px-6 text-left">{item.chain}</td>
              <td className="py-3 px-6 text-left">
                ${item.ptPrice.toFixed(4)}
              </td>
              <td className="py-3 px-6 text-left">
                ${item.tokenPrice.toFixed(4)}
              </td>
              <td className="py-3 px-6 text-left">{item.maturity}</td>
              <td className="py-3 px-6 text-left">{item.daysToMaturity}</td>
              <td className="py-3 px-6 text-left">
                ${item.liquidity.toLocaleString()}
              </td>
              <td className="py-3 px-6 text-left">{item.ytm.toFixed(2)}%</td>
              <td className="py-3 px-6 text-left">{item.apy.toFixed(2)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
