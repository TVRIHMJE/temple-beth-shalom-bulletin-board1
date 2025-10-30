
declare global {
  interface Window {
    persistentStorage: {
      setItem(key: string, value: string): Promise<void>;
      getItem(key: string): Promise<string | null>;
      removeItem(key: string): Promise<void>;
      clear(): Promise<void>;
    };
  }
}

export {};

