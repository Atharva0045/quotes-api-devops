// src/components/features/QuoteCard.jsx

import React from 'react';

export default function QuoteCard({ quote }) {
  if (!quote) return null;
  const { text, author, category } = quote;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 relative transform transition-transform hover:scale-105 hover:shadow-xl duration-300 m-4 max-w-xl mx-auto">
      {/* Quotation Mark */}
      <div className="absolute -top-4 -left-4 text-6xl text-indigo-400 opacity-50 transform rotate-12 select-none">
        “
      </div>

      {/* Quote Text */}
      <p className="text-gray-700 dark:text-gray-200 text-xl md:text-2xl font-semibold italic leading-relaxed px-4">
        {text}
      </p>

      {/* Author and Category */}
      <div className="mt-4 flex flex-col md:flex-row md:justify-between items-center px-4">
        {/* Author */}
        <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
          — {author || 'Unknown'}
        </p>
        {/* Category Badge */}
        <div className="mt-2 md:mt-0">
          <span className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-400 to-indigo-600 text-white text-xs font-semibold uppercase shadow-md hover:scale-105 transition-transform cursor-pointer">
            {category}
          </span>
        </div>
      </div>
    </div>
  );
}
