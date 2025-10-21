import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { smoothScrollTo } from '@/utils/smoothScroll';

const HashScroll = () => {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (!hash || pathname !== '/') return;

    const raw = hash.replace('#', '');

    // Retry logic for lazy-loaded components
    const attemptScroll = (attempts = 0, maxAttempts = 10) => {
      // If hash looks like a key=value (e.g., advisor=john-doe), try to scroll to key section if it exists
      let targetId = raw;
      if (raw.includes('=')) {
        const [key] = raw.split('=');
        targetId = key || raw;
      }

      const el = document.getElementById(targetId);
      
      if (el) {
        // Element found, scroll to it
        smoothScrollTo(targetId);
      } else if (attempts < maxAttempts) {
        // Element not found yet, retry after delay (exponential backoff)
        const delay = Math.min(100 * Math.pow(1.5, attempts), 1000);
        setTimeout(() => attemptScroll(attempts + 1, maxAttempts), delay);
      }
    };

    // Start attempting to scroll
    attemptScroll();
  }, [hash, pathname]);

  return null;
};

export default HashScroll;
