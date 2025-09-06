import { NextResponse } from 'next/server';
import { getStablecoinYields } from '@/lib/stablecoinData';

export async function GET() {
  try {
    const data = await getStablecoinYields();

    return NextResponse.json({
      yields: data,
      lastUpdated: data.length > 0 ? data[0].humanized_timestamp : 'Unknown',
      totalPools: data.length,
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error in stablecoin-yields API route:', error);

    return NextResponse.json(
      { error: 'Failed to fetch stablecoin yields' },
      { status: 500 }
    );
  }
}
