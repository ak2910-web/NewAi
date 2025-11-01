import type { HistoryItem } from '../types';

const HISTORY_KEY = 'vedai_analysis_history';

/**
 * Retrieves the analysis history from localStorage.
 * @returns An array of HistoryItem objects.
 */
export const getHistory = (): HistoryItem[] => {
  try {
    const historyJson = localStorage.getItem(HISTORY_KEY);
    if (!historyJson) {
      return [];
    }
    const history = JSON.parse(historyJson) as HistoryItem[];
    // Sort by timestamp descending (newest first)
    return history.sort((a, b) => b.timestamp - a.timestamp);
  } catch (error) {
    console.error('Failed to parse history from localStorage:', error);
    return [];
  }
};

/**
 * Adds a new analysis item to the history in localStorage.
 * @param item - The item to add, containing inputText and result.
 */
export const addHistoryItem = (item: Omit<HistoryItem, 'id' | 'timestamp'>): void => {
  try {
    const history = getHistory();
    const newItem: HistoryItem = {
      ...item,
      id: new Date().toISOString() + Math.random(),
      timestamp: Date.now(),
    };
    const updatedHistory = [newItem, ...history];
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
  } catch (error) {
    console.error('Failed to save item to history in localStorage:', error);
  }
};

/**
 * Clears all analysis history from localStorage.
 */
export const clearHistory = (): void => {
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch (error) {
    console.error('Failed to clear history from localStorage:', error);
  }
};
