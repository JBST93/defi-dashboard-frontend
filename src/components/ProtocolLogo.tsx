import Image from 'next/image';
import { useState } from 'react';

interface ProtocolLogoProps {
  protocol: string;
  size?: number;
  className?: string;
}

export default function ProtocolLogo({
  protocol,
  size = 48,
  className = 'w-12 h-12',
}: ProtocolLogoProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Protocol-specific gradient colors
  const getProtocolGradient = (protocol: string) => {
    const gradients: { [key: string]: string } = {
      aave: 'from-purple-500 to-pink-500',
      pendle: 'from-blue-500 to-cyan-500',
      gearbox: 'from-orange-500 to-red-500',
      stargate: 'from-indigo-500 to-purple-500',
      spark: 'from-green-500 to-emerald-500',
      compound: 'from-blue-600 to-indigo-600',
      maker: 'from-yellow-500 to-orange-500',
      uniswap: 'from-pink-500 to-purple-500',
      curve: 'from-blue-500 to-blue-600',
      balancer: 'from-gray-500 to-gray-600',
    };

    return gradients[protocol.toLowerCase()] || 'from-blue-500 to-purple-600';
  };

  if (imageError || !imageLoaded) {
    return (
      <div
        className={`${className} bg-gradient-to-br ${getProtocolGradient(
          protocol
        )} rounded-xl flex items-center justify-center`}
      >
        <span className="text-white font-bold text-lg">
          {protocol.charAt(0).toUpperCase()}
        </span>
      </div>
    );
  }

  return (
    <div
      className={`${className} rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center`}
    >
      <Image
        src={`/logos/${protocol.toLowerCase()}-logo.svg`}
        alt={`${protocol} logo`}
        width={size}
        height={size}
        className="w-full h-full object-contain"
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageError(true)}
      />
    </div>
  );
}
