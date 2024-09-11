import React from 'react';

interface CategoryCardProps {
  category: string;
  averageChange: number;
  highestGainer: {
    project: string;
    change: number;
  };
  highestLoser: {
    project: string;
    change: number;
  };
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  averageChange,
  highestGainer,
  highestLoser,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold mb-2">{category}</h3>
      <div className="mb-2">
        <p className="text-sm font-medium">Avg. Change</p>
        <p className={averageChange >= 0 ? 'text-green-600' : 'text-red-600'}>
          {averageChange >= 0 ? '+' : ''}
          {averageChange.toFixed(2)}%
        </p>
      </div>
      <div className="mt-2">
        <p className="text-sm font-medium">Highest Gainer</p>
        <p className="text-green-600">
          {highestGainer.project}: +{highestGainer.change.toFixed(2)}%
        </p>
      </div>
      <div className="mt-2">
        <p className="text-sm font-medium">Highest Loser</p>
        <p className="text-red-600">
          {highestLoser.project}: {highestLoser.change.toFixed(2)}%
        </p>
      </div>
    </div>
  );
};

export default CategoryCard;
