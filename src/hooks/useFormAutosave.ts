import { useEffect, useRef, useCallback } from 'react';
import { usePreferences } from '@/hooks/usePreferences';
import { useOfflineSupport } from '@/hooks/useOfflineSupport';

interface AutosaveOptions {
  key: string;
  delay?: number;
  onSave?: (data: any) => void;
  onRestore?: (data: any) => void;
  enabled?: boolean;
}

export function useFormAutosave<T extends Record<string, any>>(
  formData: T,
  options: AutosaveOptions
) {
  const { preferences } = usePreferences();
  const { queueAction } = useOfflineSupport();
  const saveTimeoutRef = useRef<NodeJS.Timeout>();
  const lastSavedRef = useRef<string>('');

  const {
    key,
    delay = 2000,
    onSave,
    onRestore,
    enabled = preferences.autoSave
  } = options;

  // Save data to localStorage
  const saveToStorage = useCallback((data: T) => {
    try {
      const serialized = JSON.stringify({
        data,
        timestamp: Date.now(),
        version: '1.0'
      });
      
      localStorage.setItem(`autosave_${key}`, serialized);
      lastSavedRef.current = serialized;
      
      // Trigger custom save handler
      onSave?.(data);
      
      // Queue for offline sync if needed
      queueAction('FORM_AUTOSAVE', { key, data });
      
    } catch (error) {
      console.warn('Failed to autosave form data:', error);
    }
  }, [key, onSave, queueAction]);

  // Load data from localStorage
  const loadFromStorage = useCallback(() => {
    try {
      const stored = localStorage.getItem(`autosave_${key}`);
      if (stored) {
        const parsed = JSON.parse(stored);
        
        // Check if data is not too old (24 hours)
        const isRecent = Date.now() - parsed.timestamp < 24 * 60 * 60 * 1000;
        
        if (isRecent && parsed.data) {
          onRestore?.(parsed.data);
          return parsed.data;
        }
      }
    } catch (error) {
      console.warn('Failed to load autosaved data:', error);
    }
    return null;
  }, [key, onRestore]);

  // Clear autosaved data
  const clearAutosave = useCallback(() => {
    localStorage.removeItem(`autosave_${key}`);
    lastSavedRef.current = '';
  }, [key]);

  // Check if there's autosaved data available
  const hasAutosaveData = useCallback(() => {
    const stored = localStorage.getItem(`autosave_${key}`);
    return stored !== null;
  }, [key]);

  // Debounced save effect
  useEffect(() => {
    if (!enabled) return;

    const currentData = JSON.stringify(formData);
    
    // Don't save if data hasn't changed
    if (currentData === lastSavedRef.current) return;
    
    // Clear previous timeout
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    // Set new timeout
    saveTimeoutRef.current = setTimeout(() => {
      saveToStorage(formData);
    }, delay);

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [formData, enabled, delay, saveToStorage]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  // Save immediately on page unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (enabled && saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
        saveToStorage(formData);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [enabled, formData, saveToStorage]);

  return {
    loadFromStorage,
    clearAutosave,
    hasAutosaveData,
    saveNow: () => saveToStorage(formData),
    isEnabled: enabled
  };
}