import React, { useState, useEffect } from 'react';
import type { ActiveView, HistoryItem } from '../types';
import { getHistory } from '../services/historyService';
import { CameraIcon } from './icons/CameraIcon';
import { PencilIcon } from './icons/PencilIcon';
import { QuestionMarkCircleIcon } from './icons/QuestionMarkCircleIcon';
import { InformationCircleIcon } from './icons/InformationCircleIcon';

interface HomeViewProps {
  onNavigate: (view: ActiveView, options?: { query?: string }) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  const [recentQueries, setRecentQueries] = useState<HistoryItem[]>([]);

  useEffect(() => {
    // Fetch top 3 recent queries
    setRecentQueries(getHistory().slice(0, 3));
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <header className="text-left mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-zinc-800">Welcome to VedAI</h1>
        <p className="text-zinc-500 mt-1">Explore ancient wisdom through AI</p>
      </header>

      <section>
        <h2 className="text-lg font-semibold text-zinc-700 mb-4">Start Learning</h2>
        <div className="space-y-4">
          <button 
            onClick={() => onNavigate('analyzer')}
            className="w-full flex items-center p-4 bg-orange-400 text-white rounded-xl shadow-lg hover:bg-orange-500 transition-all transform hover:scale-[1.02]"
          >
            <div className="p-3 bg-white/30 rounded-lg mr-4">
              <CameraIcon className="w-6 h-6" />
            </div>
            <div>
              <p className="font-bold text-left">Image Input</p>
              <p className="text-sm text-left text-orange-100">Upload Vedic text or formula</p>
            </div>
          </button>
          <button 
            onClick={() => onNavigate('analyzer')}
            className="w-full flex items-center p-4 bg-blue-500 text-white rounded-xl shadow-lg hover:bg-blue-600 transition-all transform hover:scale-[1.02]"
          >
            <div className="p-3 bg-white/30 rounded-lg mr-4">
              <PencilIcon className="w-6 h-6" />
            </div>
            <div>
              <p className="font-bold text-left">Text Input</p>
              <p className="text-sm text-left text-blue-100">Type your query directly</p>
            </div>
          </button>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-semibold text-zinc-700 mb-4">Quick Access</h2>
        <div className="grid grid-cols-2 gap-4">
            <button className="flex flex-col items-start p-4 bg-white rounded-xl shadow-sm border border-zinc-200 hover:border-amber-400 hover:bg-amber-50 transition-colors">
                <QuestionMarkCircleIcon className="w-7 h-7 text-zinc-500 mb-2" />
                <p className="font-semibold text-sm">How It Works</p>
                <p className="text-xs text-zinc-400">Learn the process</p>
            </button>
            <button onClick={() => onNavigate('about')} className="flex flex-col items-start p-4 bg-white rounded-xl shadow-sm border border-zinc-200 hover:border-amber-400 hover:bg-amber-50 transition-colors">
                <InformationCircleIcon className="w-7 h-7 text-zinc-500 mb-2" />
                <p className="font-semibold text-sm">About VedAI</p>
                <p className="text-xs text-zinc-400">Our mission</p>
            </button>
        </div>
      </section>
      
      {recentQueries.length > 0 && (
        <section className="mt-8">
          <h2 className="text-lg font-semibold text-zinc-700 mb-4">Recent Queries</h2>
          <div className="space-y-2">
            {recentQueries.map(item => (
              <button 
                key={item.id} 
                onClick={() => onNavigate('analyzer', { query: item.inputText })}
                className="w-full text-left p-3 bg-white rounded-lg shadow-sm border border-zinc-200 hover:bg-zinc-50 transition-colors"
              >
                <p className="text-sm text-zinc-700 truncate">{item.inputText}</p>
              </button>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};