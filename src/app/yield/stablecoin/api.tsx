'use client';

export interface StablecoinYieldRate {
  id: number;
  project: string;
  chain: string;
  market: string;
  apy: number;
  yield_rate_base: number;
  tvl: number;
}

export async function fetchStablecoinYieldRates(): Promise<
  StablecoinYieldRate[]
> {
  const response = await fetch(
    'https://www.tokendataview.com/api/stablecoin_yield_rates'
  );
  if (!response.ok) {
    throw new Error('Failed to fetch stablecoin yield rates');
  }
  return response.json();
}
