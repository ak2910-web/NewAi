import React, { useMemo } from 'react';
import type { StructuredResult } from '../types';

interface ResultDisplayProps {
  content: string; // Expecting a JSON string
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ content }) => {
  const result: StructuredResult | null = useMemo(() => {
    try {
      // First, clean the string from markdown backticks and "json" label
      const cleanedContent = content.replace(/```json\n|```/g, '').trim();
      return JSON.parse(cleanedContent);
    } catch (error) {
      console.error("Failed to parse result content:", error);
      // Return a fallback structure if parsing fails
      return { transliteration: 'Error', explanation: content, modern_equivalent: 'Could not display structured result.' };
    }
  }, [content]);

  if (!result) {
    return null;
  }
  
  const ResultSection: React.FC<{title: string; children: React.ReactNode; className?: string;}> = ({ title, children, className }) => {
    if (!children) return null;
    return (
        <div className={`bg-white p-4 sm:p-5 rounded-xl shadow-sm border border-zinc-200 ${className}`}>
            <h3 className="text-sm font-semibold text-amber-700 mb-2">{title}</h3>
            <div className="text-zinc-700 leading-relaxed text-sm sm:text-base">{children}</div>
        </div>
    );
  };

  return (
    <div className="mt-8 w-full space-y-4">
        {result.sanskrit_term && (
          <div className="bg-white p-4 sm:p-5 rounded-xl shadow-sm border border-zinc-200">
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-800">{result.sanskrit_term}</h2>
            <p className="text-zinc-500">{result.transliteration}</p>
          </div>
        )}

      <ResultSection title="Explanation">
        <p>{result.explanation}</p>
      </ResultSection>

      <ResultSection title="Formula">
        <p className="font-mono bg-zinc-100 p-3 rounded-md text-zinc-800">{result.formula}</p>
      </ResultSection>

      <ResultSection title="Deeper Insight">
         <p className="italic text-zinc-600 border-l-4 border-amber-300 pl-4">{result.deeper_insight}</p>
      </ResultSection>

      <ResultSection title="Modern Math Formula">
         <p className="font-mono bg-zinc-100 p-3 rounded-md text-zinc-800">{result.modern_equivalent}</p>
      </ResultSection>
    </div>
  );
};