import React, { useState, useEffect } from 'react';
import type { ActiveView } from './types';
import { TopNav } from './components/TopNav';
import { BottomNav } from './components/BottomNav';
import { HistoryView } from './components/HistoryView';
import { AnalyzerView } from './components/AnalyzerView';
import { HomeView } from './components/HomeView';
import { SplashScreen } from './components/SplashScreen';
import { LoginView } from './components/LoginView';
import { ProfileView } from './components/ProfileView';
import { AboutView } from './components/AboutView';

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeView, setActiveView] = useState<ActiveView>('home');
  const [viewHistory, setViewHistory] = useState<ActiveView[]>(['home']);
  const [initialQuery, setInitialQuery] = useState<{ text: string, tab: 'text' | 'image' } | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleNavigate = (view: ActiveView, options?: { query?: string, tab?: 'text' | 'image' }) => {
    if (view === 'analyzer' && options?.query) {
      setInitialQuery({ text: options.query, tab: options.tab || 'text' });
    } else {
      setInitialQuery(null);
    }
    
    if (view === activeView && view !== 'analyzer') return;
    
    setViewHistory(prev => [...prev, view]);
    setActiveView(view);
  };

  const handleBack = () => {
    if (viewHistory.length <= 1) return;
    const newHistory = [...viewHistory];
    newHistory.pop();
    setViewHistory(newHistory);
    setActiveView(newHistory[newHistory.length - 1]);
  };

  const renderContent = () => {
    switch (activeView) {
      case 'home':
        return <HomeView onNavigate={handleNavigate} />;
      case 'analyzer':
        return <AnalyzerView initialQuery={initialQuery} />;
      case 'history':
        return <HistoryView />;
      case 'about':
        return <AboutView />;
      case 'profile':
        return <ProfileView onLogout={() => setIsLoggedIn(false)} />;
      default:
        return <HomeView onNavigate={handleNavigate} />;
    }
  };
  
  const renderTopNav = () => {
    const showBackButton = viewHistory.length > 1;
    switch (activeView) {
        case 'home':
            return <TopNav showProfileButton onProfileClick={() => handleNavigate('profile')} />;
        case 'profile':
        case 'about':
        case 'history':
        case 'analyzer':
             return <TopNav onBack={handleBack} showBackButton={showBackButton} title={activeView.charAt(0).toUpperCase() + activeView.slice(1)} />;
        default:
            return null;
    }
  };

  if (showSplash) {
    return <SplashScreen />;
  }
  
  if (!isLoggedIn) {
      return <LoginView onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="min-h-screen bg-[#FAF8F0] text-zinc-800">
      {renderTopNav()}
      <main className="flex flex-col items-center p-4 sm:p-6 lg:p-8 pt-20 pb-24">
        {renderContent()}
      </main>
      <BottomNav activeView={activeView} setActiveView={handleNavigate} />
    </div>
  );
};

export default App;