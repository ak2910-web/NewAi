import React, { useState, useCallback, useEffect } from 'react';
import { InputArea } from './InputArea';
import { ResultDisplay } from './ResultDisplay';
import { Loader } from './Loader';
import { getResonance, getTextFromImage } from '../services/geminiService';
import { addHistoryItem } from '../services/historyService';
import { fileToBase64 } from '../utils/fileUtils';
import type { Tab } from '../types';

interface AnalyzerViewProps {
  initialQuery: { text: string; tab: Tab } | null;
}

export const AnalyzerView: React.FC<AnalyzerViewProps> = ({ initialQuery }) => {
  const [activeTab, setActiveTab] = useState<Tab>('text');
  const [inputText, setInputText] = useState<string>('');
  const [inputImage, setInputImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingMessage, setLoadingMessage] = useState<string>('');

  useEffect(() => {
    if (initialQuery) {
      setInputText(initialQuery.text);
      setActiveTab(initialQuery.tab);
    }
  }, [initialQuery]);

  const handleImageChange = (file: File | null) => {
    setInputImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleAnalysis = useCallback(async () => {
    if ((activeTab === 'text' && !inputText.trim()) || (activeTab === 'image' && !inputImage)) {
      setError('Please provide input before analysis.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      let textToAnalyze: string;

      if (activeTab === 'image' && inputImage) {
        setLoadingMessage('Digitizing manuscript...');
        const { base64, mimeType } = await fileToBase64(inputImage);
        const extractedText = await getTextFromImage(base64, mimeType);
        
        if (extractedText.toLowerCase().includes("can't read the text")) {
          throw new Error("Sorry, I can’t read the text in the image clearly. Please try a different image.");
        }
        textToAnalyze = extractedText;
      } else {
        textToAnalyze = inputText;
      }

      setLoadingMessage('Finding resonance...');
      const resonanceResult = await getResonance(textToAnalyze);
      setResult(resonanceResult);
      addHistoryItem({ inputText: textToAnalyze, result: resonanceResult });

    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'An unexpected error occurred.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
      setLoadingMessage('');
    }
  }, [activeTab, inputText, inputImage]);
  
  return (
    <div className="w-full max-w-2xl mx-auto">
       <header className="text-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-zinc-800">Input Your Query</h1>
            <p className="text-zinc-500 mt-1">Ask about Vedic mathematics</p>
       </header>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-6" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        {!result && (
          <InputArea
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            inputText={inputText}
            setInputText={setInputText}
            onImageChange={handleImageChange}
            imagePreview={imagePreview}
            onSubmit={handleAnalysis}
            isLoading={isLoading}
          />
        )}
        {isLoading && <Loader message={loadingMessage} />}
        {result && !isLoading && <ResultDisplay content={result} />}
    </div>
  );
};