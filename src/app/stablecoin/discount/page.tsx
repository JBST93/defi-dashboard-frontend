'use client';

import { useState, useEffect } from 'react';
import StablecoinDiscountTable from './StablecoinDiscountTable';
import YieldCurve from './YieldCurve';
import ProjectedReturns from './ProjectedReturns';

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

function calculateAPY(ytm: number, daysToMaturity: number): number {
  const yearsToMaturity = daysToMaturity / 365;
  return (Math.pow(1 + ytm / 100, 1 / yearsToMaturity) - 1) * 100;
}

export default function StablecoinDiscountPage() {
  const [discountData, setDiscountData] = useState<DiscountData[]>([]);
  const [filteredData, setFilteredData] = useState<DiscountData[]>([]);
  const [yieldCurveData, setYieldCurveData] = useState<
    { daysToMaturity: number; discount: number }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [tokenFilter, setTokenFilter] = useState('');
  const [maturityFilter, setMaturityFilter] = useState('all');
  const [chainFilter, setChainFilter] = useState('all');

  useEffect(() => {
    fetchDiscountData();
  }, []);

  useEffect(() => {
    filterData();
  }, [discountData, tokenFilter, maturityFilter, chainFilter]);

  const fetchDiscountData = async () => {
    try {
      const [yieldRatesResponse, projectsResponse] = await Promise.all([
        fetch('https://www.tokendataview.com/api/yield_rates'),
        fetch('https://www.tokendataview.com/api/projects'),
      ]);
      const yieldRatesData = await yieldRatesResponse.json();
      const projectsData = await projectsResponse.json();

      const projectPrices = projectsData.reduce((acc: any, project: any) => {
        acc[project.token] = project.price;
        return acc;
      }, {});

      const filteredData = yieldRatesData
        .filter(
          (item: any) =>
            item.project === 'Pendle' &&
            item.type === 'Interest Rate Derivative'
        )
        .map((item: any) => {
          const maturityDateStr =
            item.information_transformed[0].split(': ')[1];
          const maturityDate = new Date(maturityDateStr);
          const today = new Date();
          const daysToMaturity = Math.max(
            0,
            Math.ceil(
              (maturityDate.getTime() - today.getTime()) / (1000 * 3600 * 24)
            )
          );
          const ytm = parseFloat(item.yield_rate_base);

          return {
            id: item.id,
            token: item.market,
            underlying: item.market, // For now, same as token
            chain: item.chain,
            ptPrice: 1 - ytm / 100,
            tokenPrice: projectPrices[item.market] || 0,
            maturity: maturityDateStr,
            daysToMaturity: daysToMaturity,
            liquidity: Math.round(item.tvl),
            ytm: ytm,
            apy: calculateAPY(ytm, daysToMaturity),
          };
        });

      setDiscountData(filteredData);

      const ethereumPendleUSDe = filteredData.filter(
        (item) => item.chain === 'Ethereum' && item.token === 'USDe'
      );

      const yieldCurveData = ethereumPendleUSDe.reduce((acc: any[], item) => {
        const existingItem = acc.find(
          (i) => i.daysToMaturity === item.daysToMaturity
        );
        if (!existingItem || item.liquidity > existingItem.liquidity) {
          if (existingItem) {
            existingItem.discount = item.discount;
            existingItem.liquidity = item.liquidity;
          } else {
            acc.push({
              daysToMaturity: item.daysToMaturity,
              discount: item.discount,
              liquidity: item.liquidity,
            });
          }
        }
        return acc;
      }, []);

      setYieldCurveData(yieldCurveData);

      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching discount data:', error);
      setIsLoading(false);
    }
  };

  const filterData = () => {
    let filtered = discountData;

    if (tokenFilter) {
      filtered = filtered.filter((item) =>
        item.token.toLowerCase().includes(tokenFilter.toLowerCase())
      );
    }

    if (chainFilter !== 'all') {
      filtered = filtered.filter((item) => item.chain === chainFilter);
    }

    switch (maturityFilter) {
      case 'month':
        filtered = filtered.filter((item) => item.daysToMaturity <= 30);
        break;
      case '3months':
        filtered = filtered.filter((item) => item.daysToMaturity <= 90);
        break;
      case '6months':
        filtered = filtered.filter((item) => item.daysToMaturity <= 180);
        break;
      case 'year':
        filtered = filtered.filter((item) => item.daysToMaturity <= 365);
        break;
    }

    setFilteredData(filtered);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        Stablecoin Discount Opportunities
      </h1>

      <p className="mb-4">
        Principal Tokens (PTs) are similar to zero-coupon bonds, offering a
        claim on a specific amount of stablecoins at a future date. Since they
        don&apos;t pay interest or provide any returns until maturity, PTs are
        typically sold at a discount. This discount reflects two key factors:
        the time value of money—where funds today are worth more than the same
        amount in the future—and the market&apos;s perception of risk. As the
        maturity date approaches, the value of PTs rises, converging with their
        full payout value. This makes PTs an attractive option for those looking
        to capture future value in a predictable way.
      </p>

      <ProjectedReturns discountData={filteredData} />

      <div className="mb-4 flex space-x-4">
        <input
          type="text"
          placeholder="Filter by token"
          value={tokenFilter}
          onChange={(e) => setTokenFilter(e.target.value)}
          className="p-2 border rounded"
        />
        <select
          value={maturityFilter}
          onChange={(e) => setMaturityFilter(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="all">All maturities</option>
          <option value="month">Less than a month</option>
          <option value="3months">Less than 3 months</option>
          <option value="6months">Less than 6 months</option>
          <option value="year">Less than 1 year</option>
        </select>
        <select
          value={chainFilter}
          onChange={(e) => setChainFilter(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="all">All chains</option>
          {Array.from(new Set(discountData.map((item) => item.chain))).map(
            (chain) => (
              <option
                key={chain}
                value={chain}
              >
                {chain}
              </option>
            )
          )}
        </select>
      </div>
      <StablecoinDiscountTable
        discountData={filteredData}
        isLoading={isLoading}
      />
    </div>
  );
}
