import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { smoothScrollTo } from '@/utils/smoothScroll';

const HashScroll = () => {
  const { hash, pathname } = useLocation();
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (!hash || pathname !== '/') return;

    const raw = hash.replace('#', '');

    // Parse target ID from hash
    let targetId = raw;
    if (raw.includes('=')) {
      const [key] = raw.split('=');
      targetId = key || raw;
    }

    // Instant scroll function for initial load
    const instantScrollTo = (elementId: string) => {
      const element = document.getElementById(elementId);
      if (!element) return false;
      
      const root = document.documentElement;
      const cs = getComputedStyle(root);
      const navH = parseFloat(cs.getPropertyValue('--nav-h')) || 80;
      const offsetPosition = element.offsetTop - navH;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'instant'
      });
      return true;
    };

    // Retry logic for lazy-loaded components
    const attemptScroll = (attempts = 0, maxAttempts = 8) => {
      const el = document.getElementById(targetId);
      
      if (el) {
        if (isInitialMount.current) {
          // Initial page load: instant scroll (no jarring animation)
          isInitialMount.current = false;
          instantScrollTo(targetId);
        } else {
          // Subsequent navigation: smooth scroll
          smoothScrollTo(targetId);
        }
      } else if (attempts < maxAttempts) {
        // Element not found yet, retry with shorter delays
        const delay = Math.min(50 * Math.pow(1.5, attempts), 500);
        setTimeout(() => attemptScroll(attempts + 1, maxAttempts), delay);
      }
    };

    attemptScroll();
  }, [hash, pathname]);

  return null;
};

export default HashScroll;
