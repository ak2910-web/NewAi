import React from 'react';
import { HistoryIcon } from './icons/HistoryIcon';
import { HomeIcon } from './icons/HomeIcon';
import { BookmarkIcon } from './icons/BookmarkIcon';
import { InformationCircleIcon } from './icons/InformationCircleIcon';
import type { ActiveView } from '../types';

type NavItemName = 'Home' | 'History' | 'Saved' | 'About';
type NavItem = { name: NavItemName; view: ActiveView; Icon: React.FC<React.SVGProps<SVGSVGElement>> };

const navItems: NavItem[] = [
  { name: 'Home', view: 'home', Icon: HomeIcon },
  { name: 'History', view: 'history', Icon: HistoryIcon },
  { name: 'Saved', view: 'saved', Icon: BookmarkIcon },
  { name: 'About', view: 'about', Icon: InformationCircleIcon },
];

interface BottomNavProps {
    activeView: ActiveView;
    setActiveView: (view: ActiveView) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeView, setActiveView }) => {
  const NavButton: React.FC<NavItem> = ({ name, view, Icon }) => {
    const isActive = activeView === view;
    return (
      <button
        onClick={() => setActiveView(view)}
        aria-label={name}
        className={`flex flex-col items-center justify-center flex-grow transition-colors duration-200 pt-2 pb-1 ${
          isActive ? 'text-amber-600' : 'text-zinc-500 hover:text-zinc-800'
        }`}
      >
        <Icon className="w-6 h-6 mb-1" />
        <span className={`text-xs font-medium ${isActive ? 'font-semibold' : ''}`}>{name}</span>
      </button>
    );
  };

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm z-50 flex justify-around items-center border-t border-zinc-200/80">
      {navItems.map((item) => (
        <NavButton key={item.name} {...item} />
      ))}
    </footer>
  );
};