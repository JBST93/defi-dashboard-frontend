import React, { useState, useMemo } from 'react';
import { DiscountData } from './types'; // Assuming you have a types file

interface ProjectedReturnsProps {
  discountData: DiscountData[];
}

const ProjectedReturns: React.FC<ProjectedReturnsProps> = ({
  discountData,
}) => {
  const [investment, setInvestment] = useState(1000);
  const [selectedCoin, setSelectedCoin] = useState('');

  const uniqueCoins = useMemo(() => {
    return Array.from(new Set(discountData.map((item) => item.token)));
  }, [discountData]);

  const selectedCoinData = useMemo(() => {
    return discountData.filter((item) => item.token === selectedCoin);
  }, [discountData, selectedCoin]);

  const calculateProjectedReturn = (ptPrice: number) => {
    const ptsBought = investment / ptPrice;
    const returnAtMaturity = ptsBought;
    const percentageIncrease =
      ((returnAtMaturity - investment) / investment) * 100;
    return {
      returnAtMaturity: returnAtMaturity.toFixed(2),
      percentageIncrease: percentageIncrease.toFixed(2),
    };
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg mb-6">
      <h2 className="text-xl font-bold mb-4">Projected Returns</h2>
      <div className="flex flex-wrap gap-4 mb-4">
        <input
          type="number"
          value={investment}
          onChange={(e) => setInvestment(Number(e.target.value))}
          className="p-2 border rounded"
          placeholder="Investment amount"
        />
        <select
          value={selectedCoin}
          onChange={(e) => setSelectedCoin(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Select a coin</option>
          {uniqueCoins.map((coin) => (
            <option
              key={coin}
              value={coin}
            >
              {coin}
            </option>
          ))}
        </select>
      </div>
      {selectedCoinData.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {selectedCoinData.map((item) => (
            <div
              key={`${item.token}-${item.chain}-${item.maturity}`}
              className="bg-white p-4 rounded shadow"
            >
              <h3 className="font-semibold">
                {item.token} - {item.chain}
              </h3>
              <p>Maturity: {item.maturity}</p>
              <p>PT Price: ${item.ptPrice.toFixed(4)}</p>
              {(() => {
                const { returnAtMaturity, percentageIncrease } =
                  calculateProjectedReturn(item.ptPrice);
                return (
                  <>
                    <p className="text-blue-600">
                      Percentage Increase: {percentageIncrease}%
                    </p>
                    <p className="text-green-600 font-bold">
                      Projected Value at Maturity: ${returnAtMaturity}
                    </p>
                  </>
                );
              })()}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectedReturns;
