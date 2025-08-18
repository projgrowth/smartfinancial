import { useState, useEffect, useCallback } from 'react';
import { useAppContext } from '@/context/AppContext';
import { toast } from '@/hooks/use-toast';

interface OfflineAction {
  id: string;
  type: string;
  data: any;
  timestamp: number;
  retryCount: number;
}

export function useOfflineSupport() {
  const { state, dispatch } = useAppContext();
  const [pendingActions, setPendingActions] = useState<OfflineAction[]>([]);
  const [lastSyncTime, setLastSyncTime] = useState<number>(Date.now());

  // Load pending actions from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('offlinePendingActions');
    if (stored) {
      try {
        setPendingActions(JSON.parse(stored));
      } catch (error) {
        console.warn('Failed to load offline actions:', error);
      }
    }
  }, []);

  // Save pending actions to localStorage
  useEffect(() => {
    localStorage.setItem('offlinePendingActions', JSON.stringify(pendingActions));
  }, [pendingActions]);

  // Monitor online/offline status
  useEffect(() => {
    const handleOnline = () => {
      dispatch({ type: 'SET_NETWORK_STATUS', payload: 'online' });
      toast({
        title: "Back online",
        description: "Connection restored. Syncing pending changes...",
        duration: 3000,
      });
      syncPendingActions();
    };

    const handleOffline = () => {
      dispatch({ type: 'SET_NETWORK_STATUS', payload: 'offline' });
      toast({
        title: "You're offline",
        description: "Changes will be saved and synced when connection is restored.",
        duration: 5000,
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [dispatch]);

  // Queue action for offline execution
  const queueAction = useCallback((type: string, data: any) => {
    const action: OfflineAction = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type,
      data,
      timestamp: Date.now(),
      retryCount: 0
    };

    setPendingActions(prev => [...prev, action]);

    if (state.networkStatus === 'online') {
      // If online, execute immediately
      executeAction(action);
    }
  }, [state.networkStatus]);

  // Execute a single action
  const executeAction = useCallback(async (action: OfflineAction) => {
    try {
      // Here you would implement the actual API calls based on action type
      switch (action.type) {
        case 'NEWSLETTER_SIGNUP':
          // await api.subscribeToNewsletter(action.data);
          console.log('Newsletter signup:', action.data);
          break;
        case 'CONTACT_FORM':
          // await api.submitContactForm(action.data);
          console.log('Contact form:', action.data);
          break;
        case 'CALCULATOR_SAVE':
          // await api.saveCalculation(action.data);
          console.log('Calculator save:', action.data);
          break;
        default:
          console.warn('Unknown action type:', action.type);
      }

      // Remove successful action
      setPendingActions(prev => prev.filter(a => a.id !== action.id));
      setLastSyncTime(Date.now());

    } catch (error) {
      console.error('Failed to execute action:', error);
      
      // Increment retry count
      setPendingActions(prev => 
        prev.map(a => 
          a.id === action.id 
            ? { ...a, retryCount: a.retryCount + 1 }
            : a
        )
      );

      // Remove action if too many retries
      if (action.retryCount >= 3) {
        setPendingActions(prev => prev.filter(a => a.id !== action.id));
        toast({
          title: "Sync failed",
          description: "Some changes couldn't be synced and were discarded.",
          variant: "destructive",
        });
      }
    }
  }, []);

  // Sync all pending actions
  const syncPendingActions = useCallback(async () => {
    if (state.networkStatus === 'offline' || pendingActions.length === 0) {
      return;
    }

    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      // Execute actions in order
      for (const action of pendingActions) {
        await executeAction(action);
      }

      if (pendingActions.length > 0) {
        toast({
          title: "Sync complete",
          description: `${pendingActions.length} changes synced successfully.`,
        });
      }
    } catch (error) {
      console.error('Sync failed:', error);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [state.networkStatus, pendingActions, executeAction, dispatch]);

  // Clear all pending actions
  const clearPendingActions = useCallback(() => {
    setPendingActions([]);
    localStorage.removeItem('offlinePendingActions');
  }, []);

  // Get offline storage usage
  const getStorageInfo = useCallback(() => {
    const used = JSON.stringify(pendingActions).length;
    const maxSize = 5 * 1024 * 1024; // 5MB limit
    return {
      used,
      maxSize,
      percentage: (used / maxSize) * 100,
      pendingCount: pendingActions.length
    };
  }, [pendingActions]);

  return {
    isOnline: state.networkStatus === 'online',
    pendingActions,
    lastSyncTime,
    queueAction,
    syncPendingActions,
    clearPendingActions,
    getStorageInfo
  };
}