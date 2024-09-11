import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

type CryptoData = {
  name: string;
  marketCap: number;
  change24h: number;
};

const formatMarketCap = (value: number) => {
  if (value >= 1e12) {
    return `$${(value / 1e12).toFixed(2)}T`;
  } else if (value >= 1e9) {
    return `$${(value / 1e9).toFixed(2)}B`;
  } else {
    return `$${value.toLocaleString()}`;
  }
};

const formatChange = (value: number) => {
  return value > 0 ? `+${value.toFixed(2)}%` : `${value.toFixed(2)}%`;
};

const CryptoInfoRow = ({ data }: { data: CryptoData }) => (
  <div className="flex justify-between items-center py-2">
    <div>
      <p className="text-sm font-medium text-brown-800">{data.name}</p>
      <p className="text-xs text-brown-600">Market Cap</p>
    </div>
    <div className="text-right">
      <p className="text-sm font-bold text-brown-800">
        {formatMarketCap(data.marketCap)}
      </p>
      <p
        className={`text-xs flex items-center justify-end ${
          data.change24h > 0 ? 'text-green-600' : 'text-red-600'
        }`}
      >
        {data.change24h > 0 ? (
          <ArrowUpIcon className="h-3 w-3 mr-1" />
        ) : (
          <ArrowDownIcon className="h-3 w-3 mr-1" />
        )}
        {formatChange(data.change24h)}
      </p>
    </div>
  </div>
);

// Remove the Button import

// Add a new type for governance proposals
type GovernanceProposal = {
  id: string;
  title: string;
  status: 'Active' | 'Passed' | 'Failed';
};

export default function Glance(data: any) {
  const totalMarketCapChange = -3.43;
  const totalMarketCapChangeValue = -57995652602.93;

  // Add a new type for governance proposals
  type GovernanceProposal = {
    id: string;
    title: string;
    status: 'Active' | 'Passed' | 'Failed';
  };

  // Mock data for governance proposals
  const governanceProposals: GovernanceProposal[] = [
    { id: 'PROP-1', title: 'Increase staking rewards', status: 'Active' },
    { id: 'PROP-2', title: 'Reduce transaction fees', status: 'Passed' },
    { id: 'PROP-3', title: 'Add new token pair', status: 'Failed' },
  ];

  return (
    <div className="max-w-4xl p-4]">
      <Card className="w-full mt-4 bg-white border-brown-300 shadow-lg">
        <CardContent className="py-4">
          <h2 className="text-lg font-semibold text-brown-800 mb-2">
            Total Market Cap Change (24h)
          </h2>
          <div className="flex justify-between items-center">
            <p
              className={`text-2xl font-bold ${
                totalMarketCapChange > 0 ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {formatChange(totalMarketCapChange)}
            </p>
            <p
              className={`text-lg ${
                totalMarketCapChange > 0 ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {formatMarketCap(Math.abs(totalMarketCapChangeValue))}
            </p>
          </div>
          <div className="mt-2 text-sm text-brown-600">
            <span className="mr-4">24h Change</span>
            <span className="mr-2">BTC: {formatChange(-3.73)}</span>
            <span>ETH: {formatChange(-4.26)}</span>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full mt-4 bg-white border-brown-300 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-brown-800">
            Governance Proposals
          </CardTitle>
        </CardHeader>
        <CardContent>
          {governanceProposals.map((proposal) => (
            <div
              key={proposal.id}
              className="mb-2 flex justify-between items-center"
            >
              <div>
                <p className="text-sm font-medium text-brown-800">
                  {proposal.title}
                </p>
                <p className="text-xs text-brown-600">{proposal.id}</p>
              </div>
              <div
                className={`px-2 py-1 text-xs font-semibold rounded ${
                  proposal.status === 'Active'
                    ? 'bg-blue-100 text-blue-700'
                    : proposal.status === 'Passed'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {proposal.status}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
