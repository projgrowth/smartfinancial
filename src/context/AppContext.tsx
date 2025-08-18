import React, { createContext, useContext, useReducer, useEffect } from 'react';

interface AppState {
  isLoading: boolean;
  error: string | null;
  preferences: UserPreferences;
  networkStatus: 'online' | 'offline';
  scrollPosition: number;
  analyticsData: AnalyticsData;
}

interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  reducedMotion: boolean;
  autoSave: boolean;
  language: string;
}

interface AnalyticsData {
  sessionStart: number;
  pageViews: number;
  scrollDepth: number;
  interactionCount: number;
}

type AppAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'UPDATE_PREFERENCES'; payload: Partial<UserPreferences> }
  | { type: 'SET_NETWORK_STATUS'; payload: 'online' | 'offline' }
  | { type: 'UPDATE_SCROLL_POSITION'; payload: number }
  | { type: 'TRACK_INTERACTION'; payload: string }
  | { type: 'UPDATE_SCROLL_DEPTH'; payload: number };

const initialState: AppState = {
  isLoading: false,
  error: null,
  preferences: {
    theme: 'system',
    reducedMotion: false,
    autoSave: true,
    language: 'en'
  },
  networkStatus: 'online',
  scrollPosition: 0,
  analyticsData: {
    sessionStart: Date.now(),
    pageViews: 1,
    scrollDepth: 0,
    interactionCount: 0
  }
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'UPDATE_PREFERENCES':
      const updatedPreferences = { ...state.preferences, ...action.payload };
      localStorage.setItem('userPreferences', JSON.stringify(updatedPreferences));
      return { ...state, preferences: updatedPreferences };
    case 'SET_NETWORK_STATUS':
      return { ...state, networkStatus: action.payload };
    case 'UPDATE_SCROLL_POSITION':
      return { ...state, scrollPosition: action.payload };
    case 'TRACK_INTERACTION':
      return {
        ...state,
        analyticsData: {
          ...state.analyticsData,
          interactionCount: state.analyticsData.interactionCount + 1
        }
      };
    case 'UPDATE_SCROLL_DEPTH':
      return {
        ...state,
        analyticsData: {
          ...state.analyticsData,
          scrollDepth: Math.max(state.analyticsData.scrollDepth, action.payload)
        }
      };
    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load user preferences from localStorage
  useEffect(() => {
    const savedPreferences = localStorage.getItem('userPreferences');
    if (savedPreferences) {
      try {
        const preferences = JSON.parse(savedPreferences);
        dispatch({ type: 'UPDATE_PREFERENCES', payload: preferences });
      } catch (error) {
        console.warn('Failed to load user preferences:', error);
      }
    }
  }, []);

  // Monitor network status
  useEffect(() => {
    const updateNetworkStatus = () => {
      dispatch({ 
        type: 'SET_NETWORK_STATUS', 
        payload: navigator.onLine ? 'online' : 'offline' 
      });
    };

    window.addEventListener('online', updateNetworkStatus);
    window.addEventListener('offline', updateNetworkStatus);

    return () => {
      window.removeEventListener('online', updateNetworkStatus);
      window.removeEventListener('offline', updateNetworkStatus);
    };
  }, []);

  // Track scroll depth
  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      dispatch({ type: 'UPDATE_SCROLL_DEPTH', payload: scrollPercent });
      dispatch({ type: 'UPDATE_SCROLL_POSITION', payload: window.scrollY });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}

export function useAppState() {
  const { state } = useAppContext();
  return state;
}

export function useAppDispatch() {
  const { dispatch } = useAppContext();
  return dispatch;
}