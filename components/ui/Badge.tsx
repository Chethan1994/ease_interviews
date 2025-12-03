import React from 'react';
import { Difficulty, Category } from '../../types';

interface BadgeProps {
  type: 'difficulty' | 'category';
  value: Difficulty | Category | string;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ type, value, className = '' }) => {
  let colors = 'bg-gray-100 text-gray-800';

  if (type === 'difficulty') {
    switch (value) {
      case Difficulty.Easy:
        colors = 'bg-green-100 text-green-800 border-green-200';
        break;
      case Difficulty.Medium:
        colors = 'bg-yellow-100 text-yellow-800 border-yellow-200';
        break;
      case Difficulty.Hard:
        colors = 'bg-red-100 text-red-800 border-red-200';
        break;
    }
  } else {
    // Category coloring
    colors = 'bg-blue-50 text-blue-700 border-blue-200';
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colors} ${className}`}>
      {value}
    </span>
  );
};