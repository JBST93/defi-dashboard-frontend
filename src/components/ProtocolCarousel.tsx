'use client';

import React from 'react';
import ProtocolLogoWithFallback from './ProtocolLogoWithFallback';

interface ProtocolCarouselProps {
  className?: string;
}

const protocols = [
  { name: 'AAVE', description: 'Lending Protocol' },
  { name: 'PENDLE', description: 'Yield Trading' },
  { name: 'GEARBOX', description: 'Leveraged DeFi' },
  { name: 'STARGATE', description: 'Cross-Chain Bridge' },
  { name: 'SPARK', description: 'Lending Protocol' },
  { name: 'SILO', description: 'Isolated Lending' },
  { name: 'MAPLE', description: 'Institutional Lending' },
  { name: 'COMPOUND', description: 'Lending Protocol' },
  { name: 'MAKER', description: 'DAO & DAI' },
  { name: 'UNISWAP', description: 'DEX Protocol' },
  { name: 'CURVE', description: 'Stablecoin DEX' },
];

export default function ProtocolCarousel({
  className = '',
}: ProtocolCarouselProps) {
  return (
    <div className={`py-12 ${className}`}>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Supported Protocols
        </h2>
        <p className="text-gray-600">
          We aggregate yield data from the most trusted DeFi protocols
        </p>
      </div>

      <div className="relative overflow-hidden">
        {/* Gradient overlays for smooth fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-blue-50 via-indigo-50 to-purple-50 z-10"></div>

        {/* Carousel container */}
        <div className="flex animate-scroll">
          {/* First set of protocols */}
          <div className="flex space-x-8 shrink-0">
            {protocols.map((protocol, index) => (
              <div
                key={`first-${index}`}
                className="flex flex-col items-center space-y-3 p-4 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 group"
              >
                <ProtocolLogoWithFallback
                  protocol={protocol.name}
                  size={64}
                  className="w-16 h-16 group-hover:scale-110 transition-transform duration-300"
                />
                <div className="text-center">
                  <h3 className="font-semibold text-gray-900 text-sm">
                    {protocol.name}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {protocol.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Duplicate set for seamless loop */}
          <div className="flex space-x-8 shrink-0 ml-8">
            {protocols.map((protocol, index) => (
              <div
                key={`second-${index}`}
                className="flex flex-col items-center space-y-3 p-4 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 group"
              >
                <ProtocolLogoWithFallback
                  protocol={protocol.name}
                  size={64}
                  className="w-16 h-16 group-hover:scale-110 transition-transform duration-300"
                />
                <div className="text-center">
                  <h3 className="font-semibold text-gray-900 text-sm">
                    {protocol.name}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {protocol.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
