import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { smoothScrollTo } from '@/utils/smoothScroll';

const HashScroll = () => {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (!hash || pathname !== '/') return;

    const raw = hash.replace('#', '');

    // Retry logic for lazy-loaded components with longer delays
    const attemptScroll = (attempts = 0, maxAttempts = 15) => {
      // If hash looks like a key=value (e.g., advisor=john-doe), try to scroll to key section if it exists
      let targetId = raw;
      if (raw.includes('=')) {
        const [key] = raw.split('=');
        targetId = key || raw;
      }

      const el = document.getElementById(targetId);
      
      if (el) {
        // Element found, scroll to it after a brief delay to ensure layout is stable
        setTimeout(() => smoothScrollTo(targetId), 100);
      } else if (attempts < maxAttempts) {
        // Element not found yet, retry after delay (longer exponential backoff for lazy components)
        const delay = Math.min(200 * Math.pow(1.3, attempts), 2000);
        setTimeout(() => attemptScroll(attempts + 1, maxAttempts), delay);
      }
    };

    // Start attempting to scroll
    attemptScroll();
  }, [hash, pathname]);

  return null;
};

export default HashScroll;
