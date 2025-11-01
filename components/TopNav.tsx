import React from 'react';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { UserIcon } from './icons/UserIcon';

interface TopNavProps {
  onBack?: () => void;
  showBackButton?: boolean;
  title?: string;
  showProfileButton?: boolean;
  onProfileClick?: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({ 
  onBack, 
  showBackButton, 
  title,
  showProfileButton,
  onProfileClick
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-[#FAF8F0]/80 backdrop-blur-sm z-50 p-4 flex justify-between items-center h-16">
      <div className="w-10">
        {showBackButton && (
          <button 
            aria-label="Go back" 
            className="p-2 rounded-full hover:bg-zinc-200/50 transition-colors"
            onClick={onBack}
          >
            <ArrowLeftIcon className="w-6 h-6 text-zinc-800" />
          </button>
        )}
      </div>
      
      <div className="text-lg font-semibold text-zinc-800">
        {title}
      </div>

      <div className="w-10">
        {showProfileButton && (
          <button 
            aria-label="View profile" 
            className="p-2 rounded-full hover:bg-zinc-200/50 transition-colors"
            onClick={onProfileClick}
          >
            <UserIcon className="w-6 h-6 text-zinc-800" />
          </button>
        )}
      </div>
    </header>
  );
};