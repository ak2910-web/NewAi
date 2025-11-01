import React, { useState } from 'react';
import type { HistoryItem } from '../types';
import { ResultDisplay } from './ResultDisplay';

interface HistoryCardProps {
  item: HistoryItem;
}

export const HistoryCard: React.FC<HistoryCardProps> = ({ item }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };
  
  const formattedDate = new Date(item.timestamp).toLocaleString(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short'
  });

  return (
    <div className="bg-white border border-zinc-200 rounded-xl shadow-sm transition-all duration-300">
      <button
        onClick={toggleExpansion}
        className="w-full text-left p-4 flex justify-between items-center hover:bg-zinc-50/50 rounded-t-lg"
        aria-expanded={isExpanded}
      >
        <div>
          <p className="font-semibold text-zinc-800 truncate pr-4">
            {item.inputText}
          </p>
          <p className="text-xs text-zinc-500 mt-1">{formattedDate}</p>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-5 w-5 text-zinc-500 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isExpanded && (
        <div className="border-t border-zinc-200 p-4">
          <div>
            <h3 className="text-lg font-bold text-amber-700 mb-2">Original Input</h3>
            <p className="text-zinc-700 bg-zinc-50 p-3 rounded-md whitespace-pre-wrap">{item.inputText}</p>
          </div>
          <div className="mt-4">
             <ResultDisplay content={item.result} />
          </div>
        </div>
      )}
    </div>
  );
};