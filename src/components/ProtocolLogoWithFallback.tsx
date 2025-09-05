'use client';

import Image from 'next/image';
import React, { useState } from 'react';

interface ProtocolLogoProps {
  protocol: string;
  size?: number;
  className?: string;
}

export default function ProtocolLogoWithFallback({
  protocol,
  size = 48,
  className = 'w-12 h-12',
}: ProtocolLogoProps) {
  const [imageError, setImageError] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  // Get image sources for each protocol
  const getImageSources = (protocol: string) => {
    const protocolLower = protocol.toLowerCase();

    // Protocol-specific image sources
    const protocolImages: { [key: string]: string[] } = {
      aave: [
        'https://cryptologos.cc/logos/aave-aave-logo.svg',
        'https://assets.coingecko.com/coins/images/12645/large/AAVE.png',
        '/logos/aave-logo.svg',
      ],
      pendle: [
        'https://www.pendle.finance/images/logos/blue-light.png',
        'https://assets.coingecko.com/coins/images/21460/large/pendle_logo.png',
        '/logos/pendle-logo.svg',
      ],
      gearbox: [
        'https://images.crunchbase.com/image/upload/c_pad,f_auto,q_auto:eco,dpr_1/yaq41lyk1zexmjd3vgug',
        'https://raw.githubusercontent.com/gearbox-protocol/brand-kit/main/logo/gearbox-logo.svg',
        'https://assets.coingecko.com/coins/images/20163/large/gearbox.png',
        'https://raw.githubusercontent.com/gearbox-protocol/brand-kit/main/logo/gearbox-logo.svg',
        '/logos/gearbox-logo.svg',
      ],
      stargate: [
        'https://cryptologos.cc/logos/stargate-finance-stg-logo.svg',
        'https://assets.coingecko.com/coins/images/24413/large/STG_LOGO.png',
        '/logos/stargate-logo.svg',
      ],
      spark: [
        'https://asset-metadata-service-production.s3.amazonaws.com/asset_icons/eec087023aa976ee9fe4aa05b54d35d918c9a45c7770000f5745ea6ce14adaf1.png',
        'https://assets.coingecko.com/coins/images/25160/large/spark.png',
        '/logos/spark-logo.svg',
      ],
      compound: [
        'https://cryptologos.cc/logos/compound-comp-logo.svg',
        'https://assets.coingecko.com/coins/images/10775/large/COMP.png',
        '/logos/compound-logo.svg',
      ],
      maker: [
        'https://cryptologos.cc/logos/maker-mkr-logo.svg',
        'https://assets.coingecko.com/coins/images/1364/large/Mark_Maker.png',
        '/logos/maker-logo.svg',
      ],
      uniswap: [
        'https://cryptologos.cc/logos/uniswap-uni-logo.svg',
        'https://assets.coingecko.com/coins/images/12504/large/uniswap-uni.png',
        '/logos/uniswap-logo.svg',
      ],
      curve: [
        'https://cryptologos.cc/logos/curve-dao-token-crv-logo.svg',
        'https://assets.coingecko.com/coins/images/12124/large/Curve.png',
        '/logos/curve-logo.svg',
      ],
      balancer: [
        'https://cryptologos.cc/logos/balancer-bal-logo.svg',
        'https://assets.coingecko.com/coins/images/11683/large/Balancer.png',
        '/logos/balancer-logo.svg',
      ],
      morpho: [
        'https://brand.morpho.org/_next/static/media/Morpho-logo-symbol-lightmode.043f1c2e.svg',
      ],
    };

    return (
      protocolImages[protocolLower] || [`/logos/${protocolLower}-logo.svg`]
    );
  };

  const imageSources = getImageSources(protocol);
  const currentImageSrc = imageSources[currentImageIndex];

  const handleImageError = () => {
    if (currentImageIndex < imageSources.length - 1) {
      // Try next image source
      setCurrentImageIndex(currentImageIndex + 1);
    } else {
      // All images failed, show fallback
      setImageError(true);
    }
  };

  const handleImageLoad = () => {
    setImageError(false);
  };

  if (imageError) {
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
        src={currentImageSrc}
        alt={`${protocol} logo`}
        width={size}
        height={size}
        className="w-full h-full object-contain"
        onError={handleImageError}
        onLoad={handleImageLoad}
        unoptimized={currentImageSrc.startsWith('http')} // Disable optimization for external images
      />
    </div>
  );
}
