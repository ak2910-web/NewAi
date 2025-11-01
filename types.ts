export type Tab = 'text' | 'image';

export type ActiveView = 'splash' | 'login' | 'home' | 'analyzer' | 'history' | 'saved' | 'about' | 'profile';

export interface HistoryItem {
  id: string;
  inputText: string;
  result: string; // Storing the raw JSON string
  timestamp: number;
}

export interface StructuredResult {
  sanskrit_term?: string;
  transliteration: string;
  explanation: string;
  formula?: string;
  deeper_insight?: string;
  modern_equivalent: string;
}