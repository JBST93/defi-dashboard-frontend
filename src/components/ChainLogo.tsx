import React from 'react';
import Image from 'next/image';

interface ChainLogoProps {
  chain: string;
  size?: number;
  className?: string;
}

const getChainLogo = (chain: string): string => {
  const chainLogos: { [key: string]: string } = {
    Ethereum:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Ethereum_logo_2014.svg/1257px-Ethereum_logo_2014.svg.png',
    Polygon: 'https://cryptologos.cc/logos/polygon-matic-logo.svg',
    Arbitrum: 'https://cryptologos.cc/logos/arbitrum-arb-logo.svg',
    Optimism: 'https://cryptologos.cc/logos/optimism-op-logo.svg',
    Base: 'https://avatars.githubusercontent.com/u/108554348?s=280&v=4',
    Avalanche: 'https://cryptologos.cc/logos/avalanche-avax-logo.svg',
    BSC: 'https://cryptologos.cc/logos/bnb-bnb-logo.svg',
    Fantom: 'https://cryptologos.cc/logos/fantom-ftm-logo.svg',
    Solana: 'https://cryptologos.cc/logos/solana-sol-logo.svg',
    Aptos: 'https://cryptologos.cc/logos/aptos-apt-logo.svg',
    Sui: 'https://cryptologos.cc/logos/sui-sui-logo.svg',
  };

  return chainLogos[chain] || '';
};

const getChainGradient = (chain: string): string => {
  const gradients: { [key: string]: string } = {
    Ethereum: 'from-blue-400 to-purple-500',
    Polygon: 'from-purple-400 to-pink-500',
    Arbitrum: 'from-blue-500 to-cyan-400',
    Optimism: 'from-red-400 to-orange-500',
    Base: 'from-blue-400 to-indigo-500',
    Avalanche: 'from-red-500 to-orange-400',
    BSC: 'from-yellow-400 to-orange-500',
    Fantom: 'from-purple-500 to-blue-400',
    Solana: 'from-purple-500 to-pink-400',
    Aptos: 'from-blue-500 to-purple-400',
    Sui: 'from-blue-400 to-cyan-500',
  };

  return gradients[chain] || 'from-gray-400 to-gray-500';
};

export default function ChainLogo({
  chain,
  size = 20,
  className = '',
}: ChainLogoProps) {
  const logoUrl = getChainLogo(chain);
  const gradient = getChainGradient(chain);

  if (!logoUrl) {
    return (
      <div
        className={`inline-flex items-center justify-center rounded-full bg-gradient-to-r ${gradient} text-white font-bold text-xs ${className}`}
        style={{ width: size, height: size }}
      >
        {chain.charAt(0).toUpperCase()}
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <div
        className="flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        <Image
          src={logoUrl}
          alt={`${chain} logo`}
          width={size}
          height={size}
          className="max-w-full max-h-full object-contain"
          style={{
            width: 'auto',
            height: 'auto',
            maxWidth: size,
            maxHeight: size,
          }}
          unoptimized
        />
      </div>
    </div>
  );
}
