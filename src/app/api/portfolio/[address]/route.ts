import { NextResponse } from 'next/server';
import { JsonRpcProvider } from 'ethers';
import { cookies } from 'next/headers';

const INFURA_URL = `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`;
const provider = new JsonRpcProvider(INFURA_URL);

const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

async function getTokenPrices() {
  const res = await fetch(
    'https://defi-dashboard-99d015fc546e.herokuapp.com/api/projects',
    {
      cache: 'no-store',
    }
  );
  if (!res.ok) {
    throw new Error('Failed to fetch price data');
  }
  const projects = await res.json();
  return new Map(projects.map((p: any) => [p.token.toLowerCase(), p.price]));
}

function formatBalance(balance: string, decimals: number): string {
  if (balance === '0') return '0.00';

  if (balance.length <= decimals) {
    balance = balance.padStart(decimals + 1, '0');
  }

  const integerPart = balance.slice(0, -decimals) || '0';
  const fractionalPart = balance.slice(-decimals).replace(/0+$/, '') || '00';

  // Format integer part with commas
  const formattedInteger = Number(integerPart).toLocaleString('en-US');

  return `${formattedInteger}.${fractionalPart.padEnd(2, '0').slice(0, 2)}`;
}

function formatUSD(value: number): string {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

async function getYieldOpportunities() {
  const res = await fetch(
    'https://defi-dashboard-99d015fc546e.herokuapp.com/api/yield_rates',
    { cache: 'no-store' }
  );
  if (!res.ok) {
    throw new Error('Failed to fetch yield data');
  }
  return res.json();
}

function formatAPY(apy: string): string {
  const value = parseFloat(apy);
  return (
    value.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }) + '%'
  );
}

async function getBestYieldsForToken(
  token: string,
  yieldData: any[],
  tokenValue: number
) {
  // Filter yield opportunities for this token and Ethereum chain only
  const tokenYields = yieldData.filter(
    (y: any) =>
      y.market.toLowerCase() === token.toLowerCase() &&
      y.chain.toLowerCase() === 'ethereum'
  );

  // Sort by APY and get top 3
  return tokenYields
    .sort(
      (a: any, b: any) =>
        parseFloat(b.yield_rate_base) - parseFloat(a.yield_rate_base)
    )
    .slice(0, 3)
    .map((y: any) => ({
      project: y.project,
      chain: y.chain,
      yield_rate_base: formatAPY(y.yield_rate_base),
      yield_rate_reward: y.yield_rate_reward
        ? formatAPY(y.yield_rate_reward)
        : null,
      tvl: formatUSD(y.tvl),
      potential_earnings: formatUSD(
        (parseFloat(y.yield_rate_base) / 100) * tokenValue
      ),
      risk_level: getRiskLevel(y.tvl, parseFloat(y.yield_rate_base)),
      protocol_url: getProtocolUrl(y.project),
      last_updated: new Date().toISOString(),
    }));
}

function getRiskLevel(
  tvl: number,
  apy: number
): {
  level: 'Low' | 'Medium' | 'High';
  color: string;
} {
  if (tvl >= 100_000_000 && apy <= 15) {
    return { level: 'Low', color: 'text-green-600' };
  } else if (tvl >= 10_000_000 && apy <= 50) {
    return { level: 'Medium', color: 'text-yellow-600' };
  } else {
    return { level: 'High', color: 'text-red-600' };
  }
}

function getProtocolUrl(project: string): string {
  const protocolUrls: { [key: string]: string } = {
    Aave: 'https://app.aave.com',
    Compound: 'https://app.compound.finance',
    Curve: 'https://curve.fi',
    Lido: 'https://stake.lido.fi',
    Balancer: 'https://app.balancer.fi',
    Uniswap: 'https://app.uniswap.org',
    Convex: 'https://www.convexfinance.com',
    Yearn: 'https://yearn.finance',
    // Add more Ethereum protocols as needed
  };
  return protocolUrls[project] || '#';
}

async function getTokenBalances(address: string) {
  try {
    const [tokenPrices, yieldData] = await Promise.all([
      getTokenPrices(),
      getYieldOpportunities(),
    ]);
    const holdings = [];

    // Get ETH balance and yields
    const ethBalance = await provider.getBalance(address);
    const ethPrice = tokenPrices.get('eth') || 0;
    const ethValue =
      Number(formatBalance(ethBalance.toString(), 18)) * ethPrice;

    if (ethValue > 0) {
      holdings.push({
        token: 'ETH',
        balance: formatBalance(ethBalance.toString(), 18),
        value: formatUSD(ethValue),
        bestYields: await getBestYieldsForToken('ETH', yieldData, ethValue),
      });
    }

    // Get ERC20 token transactions
    const response = await fetch(
      `https://api.etherscan.io/api?module=account&action=tokentx&address=${address}&startblock=0&endblock=999999999&sort=asc&apikey=${process.env.ETHERSCAN_API_KEY}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch from Etherscan');
    }

    const data = await response.json();

    if (data.status === '1' && Array.isArray(data.result)) {
      const tokenBalances = new Map<
        string,
        {
          balance: bigint;
          symbol: string;
          decimals: number;
        }
      >();

      // Calculate final balances from transactions
      data.result.forEach((tx: any) => {
        const tokenAddress = tx.contractAddress.toLowerCase();
        const value = BigInt(tx.value);

        if (!tokenBalances.has(tokenAddress)) {
          tokenBalances.set(tokenAddress, {
            balance: BigInt(0),
            symbol: tx.tokenSymbol,
            decimals: parseInt(tx.tokenDecimal),
          });
        }

        if (tx.to.toLowerCase() === address.toLowerCase()) {
          tokenBalances.get(tokenAddress)!.balance += value;
        }
        if (tx.from.toLowerCase() === address.toLowerCase()) {
          tokenBalances.get(tokenAddress)!.balance -= value;
        }
      });

      // Add non-zero balances to holdings
      for (const [_, tokenInfo] of tokenBalances) {
        if (tokenInfo.balance > BigInt(0)) {
          const balance = formatBalance(
            tokenInfo.balance.toString(),
            tokenInfo.decimals
          );
          const price = tokenPrices.get(tokenInfo.symbol.toLowerCase()) || 0;
          const value = Number(balance.replace(/,/g, '')) * price;

          if (value > 0) {
            // Only add tokens with value > 0
            holdings.push({
              token: tokenInfo.symbol,
              balance: balance,
              value: formatUSD(value),
              bestYields: await getBestYieldsForToken(
                tokenInfo.symbol,
                yieldData,
                value
              ),
            });
          }
        }
      }
    }

    return holdings.sort(
      (a, b) =>
        Number(b.value.replace(/[^0-9.-]+/g, '')) -
        Number(a.value.replace(/[^0-9.-]+/g, ''))
    );
  } catch (error) {
    console.error('Error fetching token balances:', error);
    throw error;
  }
}

export async function GET(
  request: Request,
  { params }: { params: { address: string } }
) {
  try {
    const cookieStore = cookies();
    const shouldRefresh = request.url.includes('refresh=true');
    const cachedData = cookieStore.get(`portfolio_${params.address}`);

    // Check if we have valid cached data and no refresh requested
    if (!shouldRefresh && cachedData) {
      try {
        const parsed = JSON.parse(cachedData.value);
        const cacheAge =
          Date.now() -
          new Date(parsed.yieldRecommendations.lastUpdated).getTime();

        // Return cached data if it's less than 24 hours old
        if (cacheAge < CACHE_DURATION) {
          return NextResponse.json(parsed);
        }
      } catch (e) {
        console.error('Error parsing cached data:', e);
      }
    }

    // Fetch fresh data
    const holdings = await getTokenBalances(params.address);
    const totalValue = holdings.reduce(
      (sum, token) => sum + Number(token.value.replace(/[^0-9.-]+/g, '')),
      0
    );

    const totalPotentialYield = holdings.reduce((sum, token) => {
      const bestYield = token.bestYields[0];
      if (bestYield) {
        const tokenValue = Number(token.value.replace(/[^0-9.-]+/g, ''));
        const yieldRate = parseFloat(bestYield.yield_rate_base) / 100;
        return sum + tokenValue * yieldRate;
      }
      return sum;
    }, 0);

    const response = {
      holdings,
      yieldRecommendations: {
        totalHoldings: holdings.length,
        totalValue: formatUSD(totalValue),
        totalPotentialYield: formatUSD(totalPotentialYield),
        lastUpdated: new Date().toISOString(),
        summary: {
          highestYield: holdings.reduce(
            (max, token) => {
              const bestYield = token.bestYields[0];
              return bestYield &&
                parseFloat(bestYield.yield_rate_base) > max.apy
                ? {
                    token: token.token,
                    apy: parseFloat(bestYield.yield_rate_base),
                  }
                : max;
            },
            { token: '', apy: 0 }
          ),
          safestOpportunities: holdings
            .flatMap((token) =>
              token.bestYields
                .filter(
                  (y) =>
                    getRiskLevel(
                      Number(y.tvl.replace(/[^0-9.-]+/g, '')),
                      parseFloat(y.yield_rate_base)
                    ).level === 'Low'
                )
                .map((y) => ({
                  token: token.token,
                  project: y.project,
                  apy: y.yield_rate_base,
                }))
            )
            .slice(0, 3),
        },
      },
    };

    // Store in cookie
    cookieStore.set(`portfolio_${params.address}`, JSON.stringify(response), {
      maxAge: CACHE_DURATION / 1000, // Convert to seconds
      path: '/',
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch portfolio data' },
      { status: 500 }
    );
  }
}
