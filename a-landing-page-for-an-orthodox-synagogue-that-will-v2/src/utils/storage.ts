
// Enhanced storage utilities with fallback mechanisms

import { persistentStorage } from './persistentStorage';

export interface StorageManager {
  setItem(key: string, value: string): Promise<void>;
  getItem(key: string): Promise<string | null>;
  removeItem(key: string): Promise<void>;
  clear(): Promise<void>;
}

export class FallbackStorageManager implements StorageManager {
  private memoryStorage: Map<string, string> = new Map();

  async setItem(key: string, value: string): Promise<void> {
    this.memoryStorage.set(key, value);
  }

  async getItem(key: string): Promise<string | null> {
    return this.memoryStorage.get(key) || null;
  }

  async removeItem(key: string): Promise<void> {
    this.memoryStorage.delete(key);
  }

  async clear(): Promise<void> {
    this.memoryStorage.clear();
  }
}

export const getStorageManager = (): StorageManager => {
  // Use persistentStorage if available, otherwise fallback to in-memory storage
  if (typeof window !== 'undefined' && window.persistentStorage) {
    return window.persistentStorage;
  }
  
  if (typeof window !== 'undefined' && window.localStorage) {
    return {
      async setItem(key: string, value: string): Promise<void> {
        try {
          window.localStorage.setItem(key, value);
        } catch (error) {
          console.warn('localStorage failed, using memory storage:', error);
        }
      },
      async getItem(key: string): Promise<string | null> {
        try {
          return window.localStorage.getItem(key);
        } catch (error) {
          console.warn('localStorage failed:', error);
          return null;
        }
      },
      async removeItem(key: string): Promise<void> {
        try {
          window.localStorage.removeItem(key);
        } catch (error) {
          console.warn('localStorage failed:', error);
        }
      },
      async clear(): Promise<void> {
        try {
          window.localStorage.clear();
        } catch (error) {
          console.warn('localStorage failed:', error);
        }
      }
    };
  }
  
  // Final fallback to in-memory storage
  return new FallbackStorageManager();
};

// Export the default storage manager
export const storage = getStorageManager();

// JSON helpers
export const storageJSON = {
  async set<T>(key: string, value: T): Promise<void> {
    try {
      const serialized = JSON.stringify(value);
      await storage.setItem(key, serialized);
    } catch (error) {
      console.error('Failed to serialize and store data:', error);
      throw new Error('Failed to save data');
    }
  },

  async get<T>(key: string, defaultValue?: T): Promise<T | null> {
    try {
      const stored = await storage.getItem(key);
      if (stored === null || stored === undefined) {
        return defaultValue || null;
      }
      return JSON.parse(stored) as T;
    } catch (error) {
      console.error('Failed to retrieve and parse data:', error);
      return defaultValue || null;
    }
  }
};
