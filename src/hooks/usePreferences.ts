import { useCallback } from 'react';
import { useAppContext } from '@/context/AppContext';

export function usePreferences() {
  const { state, dispatch } = useAppContext();

  const updatePreference = useCallback((key: string, value: any) => {
    dispatch({
      type: 'UPDATE_PREFERENCES',
      payload: { [key]: value }
    });
  }, [dispatch]);

  const toggleReducedMotion = useCallback(() => {
    updatePreference('reducedMotion', !state.preferences.reducedMotion);
  }, [state.preferences.reducedMotion, updatePreference]);

  const setTheme = useCallback((theme: 'light' | 'dark' | 'system') => {
    updatePreference('theme', theme);
    
    // Apply theme immediately
    const root = document.documentElement;
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.toggle('dark', systemTheme === 'dark');
    } else {
      root.classList.toggle('dark', theme === 'dark');
    }
  }, [updatePreference]);

  const toggleAutoSave = useCallback(() => {
    updatePreference('autoSave', !state.preferences.autoSave);
  }, [state.preferences.autoSave, updatePreference]);

  // Detect user preferences from browser
  const detectUserPreferences = useCallback(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    dispatch({
      type: 'UPDATE_PREFERENCES',
      payload: {
        reducedMotion,
        theme: darkMode ? 'dark' : 'light'
      }
    });
  }, [dispatch]);

  return {
    preferences: state.preferences,
    updatePreference,
    toggleReducedMotion,
    setTheme,
    toggleAutoSave,
    detectUserPreferences
  };
}