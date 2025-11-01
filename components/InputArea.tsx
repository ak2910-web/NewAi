import React, { useRef, useCallback } from 'react';
import type { Tab } from '../types';
import { UploadIcon } from './icons/UploadIcon';
import { TextIcon } from './icons/TextIcon';

interface InputAreaProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  inputText: string;
  setInputText: (text: string) => void;
  onImageChange: (file: File | null) => void;
  imagePreview: string | null;
  onSubmit: () => void;
  isLoading: boolean;
}

export const InputArea: React.FC<InputAreaProps> = ({
  activeTab,
  setActiveTab,
  inputText,
  setInputText,
  onImageChange,
  imagePreview,
  onSubmit,
  isLoading,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    onImageChange(file);
  };

  const TabButton = useCallback(<T,>(
    { tabId, children }: { tabId: Tab, children: React.ReactNode }
  ) => {
    const isActive = activeTab === tabId;
    return (
      <button
        onClick={() => setActiveTab(tabId)}
        className={`flex items-center justify-center py-2 px-4 text-sm font-medium rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500/50 ${
          isActive
            ? 'bg-amber-500 text-white shadow-md'
            : 'bg-white text-zinc-600 hover:bg-zinc-100'
        }`}
      >
        {children}
      </button>
    );
  }, [activeTab, setActiveTab]);
  
  const examplePrompts = [
    'How to find square of 45 using Vedic method?',
    'Explain Ekadhikena Purvena sutra',
    'What is Nikhilam multiplication?',
    'Vedic method for finding cube roots',
  ];

  return (
    <div className="w-full">
      <div className="flex justify-center items-center space-x-2 mb-6">
        <TabButton tabId="text"><TextIcon className="w-5 h-5 mr-2" /> Text Input</TabButton>
        <TabButton tabId="image"><UploadIcon className="w-5 h-5 mr-2" /> Image Input</TabButton>
      </div>
      
      <div className="space-y-6">
         <div className="bg-white p-4 rounded-xl shadow-sm border border-zinc-200">
            <label htmlFor="language" className="block text-sm font-medium text-zinc-700 mb-1">Language</label>
            <select id="language" className="w-full bg-zinc-50 border border-zinc-300 text-zinc-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 block p-2.5">
              <option>English</option>
              <option>Sanskrit (Experimental)</option>
              <option>Hindi (Experimental)</option>
            </select>
        </div>

        {activeTab === 'text' && (
          <div className="bg-white p-4 rounded-xl shadow-sm border border-zinc-200">
             <label htmlFor="question" className="block text-sm font-medium text-zinc-700 mb-1">Your Question</label>
            <textarea
                id="question"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask about Vedic mathematics methods, sutras, or techniques..."
                className="w-full h-36 p-3 bg-zinc-50 border border-zinc-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-amber-500 text-zinc-800 placeholder-zinc-400 transition-colors"
                disabled={isLoading}
            />
          </div>
        )}
        
        {activeTab === 'image' && (
           <div
            className="border-2 border-dashed border-zinc-300 rounded-xl p-6 text-center cursor-pointer bg-white hover:border-amber-500 hover:bg-amber-50 transition-all"
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/*"
              disabled={isLoading}
            />
            {imagePreview ? (
              <img src={imagePreview} alt="Manuscript preview" className="max-h-48 mx-auto rounded-md" />
            ) : (
              <div className="text-zinc-500">
                <UploadIcon className="w-12 h-12 mx-auto mb-2 text-zinc-400" />
                <p className="font-semibold text-zinc-700">Click to upload or drag & drop</p>
                <p className="text-xs mt-1">PNG, JPG, or WEBP</p>
              </div>
            )}
          </div>
        )}
      </div>
      
       <div className="mt-6 bg-[#FFFBEB] p-4 rounded-xl">
          <h3 className="text-sm font-semibold text-amber-800 mb-2">Try these examples:</h3>
          <div className="space-y-2">
            {examplePrompts.map(prompt => (
                <button 
                  key={prompt} 
                  onClick={() => setInputText(prompt)}
                  className="w-full text-left text-sm text-amber-700 p-2 rounded-lg hover:bg-amber-100 transition-colors"
                >
                  {prompt}
                </button>
            ))}
          </div>
        </div>

        <button
          onClick={onSubmit}
          disabled={isLoading}
          className="w-full mt-8 py-4 px-6 bg-amber-500 text-white font-bold rounded-xl shadow-lg hover:bg-amber-600 disabled:bg-zinc-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-amber-500/50"
        >
          {isLoading ? 'Generating...' : 'Generate Explanation'}
        </button>
    </div>
  );
};