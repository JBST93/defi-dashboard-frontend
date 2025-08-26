'use client';

import { useState, useEffect } from 'react';

interface UnitPriceCellProps {
  initialPrice: number;
  token: string;
  balance: number;
  showValue?: boolean;
}

export default function UnitPriceCell({
  initialPrice,
  token,
  balance,
  showValue = false,
}: UnitPriceCellProps) {
  const [price, setPrice] = useState(initialPrice);
  const [previousPrice, setPreviousPrice] = useState(initialPrice);
  const [isUpdating, setIsUpdating] = useState(false);

  const value = price * balance;
  const previousValue = previousPrice * balance;

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await fetch(
          'https://defi-dashboard-99d015fc546e.herokuapp.com/api/projects'
        );
        if (!response.ok) throw new Error('Failed to fetch price');
        const projects = await response.json();

        const project = projects.find(
          (p: { token: string }) => p.token === token
        );
        if (project) {
          const newPrice = project.price;
          if (newPrice !== price) {
            setPreviousPrice(price);
            setPrice(newPrice);
            setIsUpdating(true);
            setTimeout(() => setIsUpdating(false), 1000);
          }
        }
      } catch (error) {
        console.error('Error fetching price:', error);
      }
    };

    const interval = setInterval(fetchPrice, 10000);
    return () => clearInterval(interval);
  }, [token, price]);

  const getAnimationClasses = () => {
    if (!isUpdating) return '';
    const compareValue = showValue ? value : price;
    const comparePrevious = showValue ? previousValue : previousPrice;

    if (compareValue > comparePrevious) {
      return 'animate-price-up';
    }
    if (compareValue < comparePrevious) {
      return 'animate-price-down';
    }
    return '';
  };

  const displayValue = showValue ? value : price;

  return (
    <div className="relative">
      <span
        className={`
        inline-block
        transition-all
        duration-500
        ${getAnimationClasses()}
        ${
          isUpdating
            ? displayValue > (showValue ? previousValue : previousPrice)
              ? 'text-green-600'
              : displayValue < (showValue ? previousValue : previousPrice)
              ? 'text-red-600'
              : ''
            : 'text-gray-900'
        }
      `}
      >
        $
        {displayValue.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </span>
    </div>
  );
}
