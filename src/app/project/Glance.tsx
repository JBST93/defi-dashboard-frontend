import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

interface GlanceProps {
  topGainersLosers: {
    gainers: CryptoData[];
    losers: CryptoData[];
  };
}

interface CryptoData {
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  logo?: string;
}

const formatPercentage = (value: number) => `${value.toFixed(2)}%`;

const CryptoInfoRow = ({ data }: { data: CryptoData }) => (
  <div className="flex items-center justify-between mb-2">
    <div className="flex items-center">
      {data.logo ? (
        <Image
          src={data.logo}
          alt={`${data.symbol} logo`}
          width={20}
          height={20}
          className="rounded-full mr-1"
        />
      ) : (
        <div className="w-5 h-5 bg-gray-200 rounded-full mr-1"></div>
      )}
      <span className="text-sm">{data.symbol}</span>
    </div>
    <div className="flex items-center">
      <span
        className={`mr-1 text-sm ${
          data.change24h >= 0 ? 'text-green-500' : 'text-red-500'
        }`}
      >
        {formatPercentage(data.change24h)}
      </span>
      {data.change24h >= 0 ? (
        <ArrowUpIcon className="w-3 h-3 text-green-500" />
      ) : (
        <ArrowDownIcon className="w-3 h-3 text-red-500" />
      )}
    </div>
  </div>
);

export default function Glance({ topGainersLosers }: GlanceProps) {
  return (
    <Card className="bg-white border-brown-300 shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-brown-800">
          Market Movers
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <h3 className="text-base font-semibold text-brown-700 mb-2">
              Top Gainers
            </h3>
            {topGainersLosers?.gainers?.slice(0, 3).map((gainer, index) => (
              <CryptoInfoRow
                key={index}
                data={gainer}
              />
            ))}
          </div>
          <div>
            <h3 className="text-base font-semibold text-brown-700 mb-2">
              Top Losers
            </h3>
            {topGainersLosers?.losers?.slice(0, 3).map((loser, index) => (
              <CryptoInfoRow
                key={index}
                data={loser}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
