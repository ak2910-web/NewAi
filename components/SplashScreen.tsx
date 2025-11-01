import React from 'react';

const FlowerLogo = () => (
  <svg width="80" height="80" viewBox="0 0 100 100" className="text-[#F2A22E] animate-spin" style={{ animationDuration: '3s' }}>
    <defs>
      <path id="petal" d="M 50,5 A 45,45 0 0,1 95,50 A 45,45 0 0,1 50,95 A 45,45 0 0,1 5,50 A 45,45 0 0,1 50,5 Z" transform="scale(0.3) translate(83, 83)" />
    </defs>
    <g fill="currentColor">
      <use href="#petal" transform="rotate(0, 50, 50)" />
      <use href="#petal" transform="rotate(45, 50, 50)" />
      <use href="#petal" transform="rotate(90, 50, 50)" />
      <use href="#petal" transform="rotate(135, 50, 50)" />
      <use href="#petal" transform="rotate(180, 50, 50)" />
      <use href="#petal" transform="rotate(225, 50, 50)" />
      <use href="#petal" transform="rotate(270, 50, 50)" />
      <use href="#petal" transform="rotate(315, 50, 50)" />
    </g>
  </svg>
);

export const SplashScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F2A22E] animate-fadeOut" style={{ animationDelay: '2s', animationFillMode: 'forwards' }}>
      <style>{`
        @keyframes fadeOut {
          to { opacity: 0; visibility: hidden; }
        }
        .animate-fadeOut { animation-name: fadeOut; animation-duration: 0.5s; }
      `}</style>
      <div className="flex flex-col items-center animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
        <FlowerLogo />
        <h1 className="text-4xl font-bold text-white mt-4">VedAI</h1>
        <p className="text-white/80 mt-2">Where Ancient Knowledge Resonates with Modern Intelligence.</p>
      </div>
    </div>
  );
};