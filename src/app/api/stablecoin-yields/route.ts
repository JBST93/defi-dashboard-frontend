import { NextResponse } from 'next/server';
import { getStablecoinYields } from '@/lib/stablecoinData';

export async function GET() {
  try {
    const data = await getStablecoinYields();

    return NextResponse.json(
      {
        yields: data.yields,
        lastUpdated: data.lastUpdated,
        totalPools: data.totalPools,
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error in stablecoin-yields API route:', error);

    return NextResponse.json(
      { error: 'Failed to fetch stablecoin yields' },
      { status: 500 }
    );
  }
}
