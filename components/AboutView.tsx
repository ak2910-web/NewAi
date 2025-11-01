import React from 'react';

export const AboutView: React.FC = () => {
  return (
    <div className="w-full max-w-2xl mx-auto text-left bg-white p-6 sm:p-8 rounded-xl border border-zinc-200 shadow-sm">
      <h2 className="text-2xl sm:text-3xl font-bold text-amber-800 mb-4">About VedAI</h2>
      <div className="space-y-4 text-zinc-700 leading-relaxed">
        <p>
          VedAI is an innovative AI system designed to bridge the gap between ancient Indian knowledge (Vedas, Upanishads) and modern scientific understanding.
        </p>
        <p>
          Our vision is to create a transformative educational tool that makes the profound wisdom of Vedic traditions accessible and relevant to everyone. We harness modern technology to empower learners, foster a deeper understanding of the world, and celebrate the timeless harmony between ancient knowledge and modern intelligence.
        </p>
        <p>
          Whether you're exploring the philosophical depths of the Upanishads, the intricate mathematics of Vedic texts, or the holistic principles of Ayurveda, VedAI is your intelligent companion.
        </p>
      </div>
    </div>
  );
};