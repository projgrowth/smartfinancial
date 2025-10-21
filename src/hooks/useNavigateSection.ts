import { useLocation, useNavigate } from 'react-router-dom';
import { smoothScrollTo } from '@/utils/smoothScroll';

export default function useNavigateSection() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (sectionId: string) => {
    if (!sectionId) return;
    if (pathname === '/') {
      // Retry to handle lazy-loaded sections
      const attemptScroll = (attempt = 0, maxAttempts = 10) => {
        const el = document.getElementById(sectionId);
        if (el) {
          smoothScrollTo(sectionId);
        } else if (attempt < maxAttempts) {
          const delay = Math.min(100 * Math.pow(1.5, attempt), 800);
          setTimeout(() => attemptScroll(attempt + 1, maxAttempts), delay);
        }
      };
      attemptScroll();
    } else {
      navigate({ pathname: '/', hash: `#${sectionId}` });
    }
  };
}
