import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get('address');

  if (!address) {
    return NextResponse.json({ error: 'Address is required' }, { status: 400 });
  }

  // TODO: Implement the actual API call to AAVE V3 to fetch positions
  // This is a mock response for demonstration purposes
  const mockPositions = [
    { asset: 'ETH', balance: 1.5, borrowRate: 0.02, supplyRate: 0.01 },
    { asset: 'USDC', balance: 1000, borrowRate: 0.03, supplyRate: 0.015 },
    { asset: 'DAI', balance: 500, borrowRate: 0.025, supplyRate: 0.012 },
  ];

  return NextResponse.json(mockPositions);
}
