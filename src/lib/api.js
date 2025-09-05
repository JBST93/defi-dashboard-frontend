// lib/api.js

export async function fetchProjects() {
  try {
    const res = await fetch(
      'https://defi-dashboard-99d015fc546e.herokuapp.com/api/projects'
    );
    if (!res.ok) throw new Error('Failed to fetch projects');

    const data = await res.json();
    console.log('Fetched projects:', data); // Add this line
    return data;
  } catch (error) {
    console.error('Error fetching project data:', error);
    throw error;
  }
}

export async function fetchStablecoinProjects() {
  try {
    const res = await fetch(
      'https://defi-dashboard-99d015fc546e.herokuapp.com/api/projects'
    );
    if (!res.ok) throw new Error('Failed to fetch projects');

    const data = await res.json();

    // Filter projects to only include stablecoins
    const stablecoins = data.filter(
      (project) => project.type.toLowerCase() === 'stablecoin'
    );
    console.log('Filtered stablecoins:', stablecoins);

    return stablecoins;
  } catch (error) {
    console.error('Error fetching or processing stablecoin data:', error);
    throw new Error(`Failed to fetch stablecoin data: ${error.message}`);
  }
}

export async function yieldRates() {
  try {
    const res = await fetch(
      'https://defi-dashboard-99d015fc546e.herokuapp.com/api/yield_rates'
    );
    if (!res.ok) throw new Error('Failed to fetch yield rates');
    return await res.json();
  } catch (error) {
    console.error('Error fetching yield rates:', error);
    throw error;
  }
}

export async function yieldRatesStablecoin() {
  try {
    // Use the general yield rates endpoint and filter for stablecoins on frontend
    // This ensures we get ALL stablecoin opportunities, including those missing from the stablecoin-specific endpoint
    const res = await fetch(
      'https://defi-dashboard-99d015fc546e.herokuapp.com/api/yield_rates'
    );
    if (!res.ok) throw new Error('Failed to fetch yield rates');

    const allData = await res.json();

    // Define stablecoin markets to filter for
    const stablecoinMarkets = [
      'USDC',
      'USDT',
      'DAI',
      'BUSD',
      'TUSD',
      'USDP',
      'FRAX',
      'LUSD',
      'sUSD',
      'GUSD',
      'USDD',
      'DUSD',
      'FEI',
      'RAI',
      'MIM',
      'UST',
      'USTC',
      'USN',
      'eUSD',
      'USDe',
      'crvUSD',
      'GHO',
      'FXUSD',
      'sDAI',
      'wUSDM',
      'USR',
      'EURe',
    ];

    // Filter for stablecoin markets only and exclude 0% yield pools
    const stablecoinData = allData.filter(
      (item) =>
        stablecoinMarkets.includes(item.market) &&
        parseFloat(item.yield_rate_base) > 0
    );

    console.log('Filtered stablecoin data:', stablecoinData.length, 'items');
    return stablecoinData;
  } catch (error) {
    console.error('Error fetching stablecoin yield rates:', error);
    throw error;
  }
}
