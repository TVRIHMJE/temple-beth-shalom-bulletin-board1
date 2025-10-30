
// Custom hook for managing persistent data with error handling

import { useState, useEffect, useCallback } from 'react';
import { storageJSON } from '../utils/storage';
import { handleError, safeAsync } from '../utils/errors';
import { Announcement, GalleryImage, Event } from '../types';

interface UsePersistentDataReturn<T> {
  data: T[];
  loading: boolean;
  error: string | null;
  addItem: (item: T) => Promise<void>;
  updateItem: (id: string, updates: Partial<T>) => Promise<void>;
  deleteItem: (id: string) => Promise<void>;
  replaceAll: (items: T[]) => Promise<void>;
  clearAll: () => Promise<void>;
}

export const usePersistentData = <T extends { id: string }>(
  storageKey: string,
  defaultItems: T[] = []
): UsePersistentDataReturn<T> => {
  const [data, setData] = useState<T[]>(defaultItems);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load data on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const storedData = await storageJSON.get<T[]>(storageKey);
        
        if (storedData && Array.isArray(storedData)) {
          setData(storedData);
        } else {
          // If no stored data, save default data
          await storageJSON.set(storageKey, defaultItems);
          setData(defaultItems);
        }
      } catch (err) {
        handleError(err, `Failed to load data for ${storageKey}`);
        setError('Failed to load data');
        setData(defaultItems);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [storageKey, defaultItems]);

  const saveData = useCallback(async (newData: T[]) => {
    try {
      await storageJSON.set(storageKey, newData);
      setData(newData);
      setError(null);
    } catch (err) {
      handleError(err, `Failed to save data for ${storageKey}`);
      setError('Failed to save data');
    }
  }, [storageKey]);

  const addItem = useCallback(async (item: T) => {
    const newData = [item, ...data];
    await saveData(newData);
  }, [data, saveData]);

  const updateItem = useCallback(async (id: string, updates: Partial<T>) => {
    const newData = data.map(item => 
      item.id === id ? { ...item, ...updates } : item
    );
    await saveData(newData);
  }, [data, saveData]);

  const deleteItem = useCallback(async (id: string) => {
    const newData = data.filter(item => item.id !== id);
    await saveData(newData);
  }, [data, saveData]);

  const replaceAll = useCallback(async (items: T[]) => {
    await saveData(items);
  }, [saveData]);

  const clearAll = useCallback(async () => {
    await saveData([]);
  }, [saveData]);

  return {
    data,
    loading,
    error,
    addItem,
    updateItem,
    deleteItem,
    replaceAll,
    clearAll
  };
};

// Specific hooks for each data type
export const useAnnouncements = () => usePersistentData<Announcement>('announcements');
export const useEvents = () => usePersistentData<Event>('events');
export const useGalleryImages = () => usePersistentData<GalleryImage>('gallery_images');
