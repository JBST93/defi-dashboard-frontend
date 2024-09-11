'use client';

export async function fetchStablecoinYieldRates() {
  const response = await fetch(
    'https://www.tokendataview.com/api/stablecoin_yield_rates'
  );
  if (!response.ok) {
    throw new Error('Failed to fetch stablecoin yield rates');
  }
  return response.json();
}
