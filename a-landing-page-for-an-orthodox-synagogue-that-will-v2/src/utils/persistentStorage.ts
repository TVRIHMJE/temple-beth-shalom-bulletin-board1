
// Persistent storage polyfill for browser environments
// This provides a persistentStorage API that works across different browsers

export class PersistentStorage {
  private storage: Map<string, string> = new Map();

  async setItem(key: string, value: string): Promise<void> {
    try {
      // Try localStorage first
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(key, value);
      } else {
        // Fallback to in-memory storage
        this.storage.set(key, value);
      }
    } catch (error) {
      console.warn('Failed to persist data to storage:', error);
      // Fallback to in-memory storage
      this.storage.set(key, value);
    }
  }

  async getItem(key: string): Promise<string | null> {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        return window.localStorage.getItem(key);
      } else {
        return this.storage.get(key) || null;
      }
    } catch (error) {
      console.warn('Failed to retrieve data from storage:', error);
      return this.storage.get(key) || null;
    }
  }

  async removeItem(key: string): Promise<void> {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem(key);
      } else {
        this.storage.delete(key);
      }
    } catch (error) {
      console.warn('Failed to remove data from storage:', error);
      this.storage.delete(key);
    }
  }

  async clear(): Promise<void> {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.clear();
      } else {
        this.storage.clear();
      }
    } catch (error) {
      console.warn('Failed to clear storage:', error);
      this.storage.clear();
    }
  }
}

// Create a singleton instance
export const persistentStorage = new PersistentStorage();

// Extend the window interface for TypeScript
declare global {
  interface Window {
    persistentStorage: PersistentStorage;
  }
}

// Initialize persistentStorage on window if it doesn't exist
if (typeof window !== 'undefined' && !window.persistentStorage) {
  window.persistentStorage = persistentStorage;
}
