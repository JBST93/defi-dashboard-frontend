'use client';

import { useState, useEffect } from 'react';
import { isAddress } from 'ethers';
import UnitPriceCell from '@/components/UnitPriceCell';
import WalletYieldOpportunities from '@/components/WalletYieldOpportunities';

interface Asset {
  token: string;
  balance: string;
  value: string;
  bestYields?: {
    project: string;
    chain: string;
    yield_rate_base: string;
    yield_rate_reward?: string;
    tvl: number;
  }[];
}

// Add new interface for lending positions
interface LendingPosition {
  protocol: string;
  chain: string;
  token: string;
  balance: string;
  value: string;
  apy: string;
}

// Update the interface to match the actual API response
interface LendingApiResponse {
  data: {
    address: string;
    positions: {
      balance: number;
      chain: string;
      contract: string;
      instance: string;
      token: string;
      version: string;
    }[];
  };
  status: string;
}

const fetchWithRetry = async (url: string, retries = 3, delay = 1000) => {
  for (let i = 0; i < retries; i++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log(`Attempt ${i + 1} timed out. Retrying...`);
      } else {
        console.log(`Attempt ${i + 1} failed. Retrying...`);
      }
      if (i === retries - 1) throw error;
      await new Promise((resolve) => setTimeout(resolve, delay * (i + 1))); // Exponential backoff
    }
  }
};

export default function PortfolioPage() {
  const [address, setAddress] = useState('');
  const [assets, setAssets] = useState<Asset[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [lendingPositions, setLendingPositions] = useState<LendingPosition[]>(
    []
  );
  const [isLendingLoading, setIsLendingLoading] = useState(false);

  // Load cached data on initial render
  useEffect(() => {
    const cachedAddress = localStorage.getItem('portfolio_address');
    const cachedData = localStorage.getItem('portfolio_data');
    const cachedTimestamp = localStorage.getItem('portfolio_timestamp');

    if (cachedAddress && cachedData && cachedTimestamp) {
      const cacheAge = Date.now() - parseInt(cachedTimestamp);
      if (cacheAge < 24 * 60 * 60 * 1000) {
        // 24 hours
        setAddress(cachedAddress);
        setAssets(JSON.parse(cachedData));
      }
    }
  }, []);

  const fetchPortfolio = async (address: string) => {
    try {
      console.log('Starting fetch for address:', address);

      const portfolioUrl = `https://defi-dashboard-99d015fc546e.herokuapp.com/api/portfolio/${address}`;
      const lendingUrl = `https://defi-dashboard-99d015fc546e.herokuapp.com/api/position/${address}`;

      const [portfolioData, lendingData] = await Promise.all([
        fetch(portfolioUrl).then((res) => res.json()),
        fetch(lendingUrl).then((res) => res.json()),
      ]);

      return { portfolioData, lendingData };
    } catch (error) {
      console.error('Error in fetchPortfolio:', error);
      throw error;
    }
  };

  const handleAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted with address:', address); // Debug log

    if (!isAddress(address)) {
      setError('Invalid ETH address');
      return;
    }

    setIsLoading(true);
    setIsLendingLoading(true);
    setError('');

    try {
      const data = await fetchPortfolio(address);
      console.log('Portfolio data received:', data); // Debug log
      setAssets(data.portfolioData.holdings);

      // Cache the data
      localStorage.setItem('portfolio_address', address);
      localStorage.setItem(
        'portfolio_data',
        JSON.stringify(data.portfolioData.holdings)
      );
      localStorage.setItem('portfolio_timestamp', Date.now().toString());
    } catch (err) {
      console.error('Error in handleAddressSubmit:', err);
      setError('Failed to fetch portfolio data');
    } finally {
      setIsLoading(false);
      setIsLendingLoading(false);
    }
  };

  const handleRefresh = async () => {
    setIsLoading(true);
    setError('');
    try {
      const data = await fetchPortfolio(address);
      setAssets(data.portfolioData.holdings);
    } catch (err) {
      console.error('Error in handleRefresh:', err);
      setError('Failed to fetch portfolio data');
    } finally {
      setIsLoading(false);
    }
  };

  const totalPortfolioValue = assets.reduce(
    (sum, asset) => sum + parseFloat(asset.value.replace(/[^0-9.-]+/g, '')),
    0
  );

  // Add an effect to monitor state changes
  useEffect(() => {
    console.log('Lending positions state updated:', lendingPositions);
  }, [lendingPositions]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">ETH Portfolio Tracker</h1>

      <form
        onSubmit={handleAddressSubmit}
        className="mb-8"
      >
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter ETH address"
          className="w-full p-2 border rounded"
        />
        <div className="flex gap-2 mt-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'View Portfolio'}
          </button>
          <button
            type="button"
            onClick={handleRefresh}
            className="px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600 transition-colors flex items-center gap-1"
            disabled={isLoading || !assets.length}
          >
            <span className={isLoading ? 'animate-spin' : ''}>⟳</span>
            Refresh
          </button>
        </div>
      </form>

      {error && (
        <div className="text-red-500 mb-4 p-4 bg-red-50 rounded-lg border border-red-200">
          {error}
        </div>
      )}

      {assets.length > 0 && (
        <div className="flex gap-8">
          {/* Left Column - Portfolio Summary */}
          <div className="w-1/3">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4">Portfolio Summary</h2>
              <div className="text-2xl font-semibold text-gray-800 mb-4">
                Total Value:{' '}
                <span className="text-green-600">
                  $
                  {totalPortfolioValue.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
              {/* You can add more summary stats here */}
            </div>
          </div>

          {/* Right Column - Assets Table */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                      Token
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">
                      Balance
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">
                      Unit Price
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">
                      Value (USD)
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">
                      % of Portfolio
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {assets.map((asset, index) => {
                    const assetValue = parseFloat(
                      asset.value.replace(/[^0-9.-]+/g, '')
                    );
                    const balance = parseFloat(
                      asset.balance.replace(/[^0-9.-]+/g, '')
                    );
                    const unitPrice = assetValue / balance;
                    const percentage = (assetValue / totalPortfolioValue) * 100;

                    return (
                      <tr
                        key={index}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900">
                            {asset.token}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right font-mono text-gray-900">
                          {asset.balance}
                        </td>
                        <td className="px-6 py-4 text-right font-mono">
                          <UnitPriceCell
                            initialPrice={unitPrice}
                            token={asset.token}
                            balance={balance}
                          />
                        </td>
                        <td className="px-6 py-4 text-right font-mono">
                          <UnitPriceCell
                            initialPrice={unitPrice}
                            token={asset.token}
                            balance={balance}
                            showValue={true}
                          />
                        </td>
                        <td className="px-6 py-4 text-right font-mono text-gray-900">
                          {percentage.toFixed(2)}%
                        </td>
                      </tr>
                    );
                  })}
                  <tr className="bg-gray-50 font-semibold">
                    <td className="px-6 py-4">Total</td>
                    <td className="px-6 py-4"></td>
                    <td className="px-6 py-4"></td>
                    <td className="px-6 py-4 text-right font-mono text-gray-900">
                      $
                      {totalPortfolioValue.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td className="px-6 py-4 text-right font-mono text-gray-900">
                      100%
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">
          Lending Positions{' '}
          {isLendingLoading && (
            <span className="text-sm text-gray-500">(Loading...)</span>
          )}
        </h2>
        {isLendingLoading ? (
          <div className="animate-pulse bg-gray-100 rounded-lg p-4">
            Loading lending positions...
          </div>
        ) : lendingPositions.length > 0 ? (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Protocol
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Chain
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                    Token
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">
                    Balance
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {lendingPositions.map((position, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {position.protocol}
                    </td>
                    <td className="px-6 py-4">{position.chain}</td>
                    <td className="px-6 py-4">{position.token}</td>
                    <td className="px-6 py-4 text-right font-mono">
                      {position.balance}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-gray-500">No lending positions found</div>
        )}
      </div>
    </div>
  );
}
