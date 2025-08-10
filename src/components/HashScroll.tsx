import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { smoothScrollTo } from '@/utils/smoothScroll';

const HashScroll = () => {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (!hash || pathname !== '/') return;

    const raw = hash.replace('#', '');

    // If hash looks like a key=value (e.g., advisor=john-doe), try to scroll to key section if it exists
    if (raw.includes('=')) {
      const [key] = raw.split('=');
      const targetId = key || raw;
      const el = document.getElementById(targetId);
      if (el) {
        smoothScrollTo(targetId);
        return;
      }
    }

    // Otherwise, treat as a straight element id
    smoothScrollTo(raw);
  }, [hash, pathname]);

  return null;
};

export default HashScroll;
