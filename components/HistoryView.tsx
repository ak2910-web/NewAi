import React, { useState, useEffect, useCallback } from 'react';
import { getHistory, clearHistory } from '../services/historyService';
import type { HistoryItem } from '../types';
import { HistoryCard } from './HistoryCard';
import { TrashIcon } from './icons/TrashIcon';

export const HistoryView: React.FC = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const handleClearHistory = useCallback(() => {
    if (window.confirm('Are you sure you want to clear your entire analysis history? This action cannot be undone.')) {
        clearHistory();
        setHistory([]);
    }
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto">
      {history.length > 0 && (
          <div className="flex justify-end mb-4">
          <button
            onClick={handleClearHistory}
            className="flex items-center px-3 py-2 text-sm font-medium text-red-600 bg-white border border-zinc-200 rounded-lg hover:bg-red-50 hover:border-red-300 transition-colors"
            aria-label="Clear all history"
          >
            <TrashIcon className="w-4 h-4 mr-2" />
            Clear History
          </button>
          </div>
      )}

      {history.length > 0 ? (
        <div className="space-y-4">
          {history.map((item) => (
            <HistoryCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="text-center mt-16 py-16 px-6 bg-white border border-zinc-200 rounded-lg">
          <HistoryIcon className="w-16 h-16 mx-auto text-zinc-400 mb-4" />
          <h2 className="text-xl font-semibold text-zinc-700">No History Yet</h2>
          <p className="text-zinc-500 mt-2">
            Your past analyses will be saved here.
          </p>
        </div>
      )}
    </div>
  );
};

// Re-defining HistoryIcon here to avoid circular dependency or excessive file creation
const HistoryIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth={1.5} 
    stroke="currentColor" 
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);