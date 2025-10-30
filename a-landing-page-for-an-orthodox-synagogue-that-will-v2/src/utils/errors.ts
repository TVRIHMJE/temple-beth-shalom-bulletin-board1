
// Error handling utilities

export class StorageError extends Error {
  constructor(message: string, public cause?: Error) {
    super(message);
    this.name = 'StorageError';
  }
}

export class ValidationError extends Error {
  constructor(message: string, public field?: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export const handleError = (error: unknown, context: string): void => {
  if (error instanceof Error) {
    console.error(`${context}:`, error.message);
    console.error('Stack trace:', error.stack);
  } else {
    console.error(`${context}:`, error);
  }
};

export const safeAsync = async <T>(
  operation: () => Promise<T>,
  fallback: T,
  context: string
): Promise<T> => {
  try {
    return await operation();
  } catch (error) {
    handleError(error, context);
    return fallback;
  }
};

export const isStorageAvailable = (): boolean => {
  try {
    if (typeof window === 'undefined') return false;
    
    // Test localStorage
    const testKey = '__storage_test__';
    window.localStorage.setItem(testKey, 'test');
    window.localStorage.removeItem(testKey);
    return true;
  } catch (error) {
    return false;
  }
};

export const getStorageType = (): 'localStorage' | 'sessionStorage' | 'memory' | 'none' => {
  if (typeof window === 'undefined') return 'none';
  
  try {
    window.localStorage.setItem('__test__', 'test');
    window.localStorage.removeItem('__test__');
    return 'localStorage';
  } catch (error) {
    try {
      window.sessionStorage.setItem('__test__', 'test');
      window.sessionStorage.removeItem('__test__');
      return 'sessionStorage';
    } catch (sessionError) {
      return 'memory';
    }
  }
};
