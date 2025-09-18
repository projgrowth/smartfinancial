import { useState, useEffect } from 'react';
import { useIntersectionObserver } from './useIntersectionObserver';

export const useActiveSection = (isHomePage: boolean) => {
  const [activeSection, setActiveSection] = useState('');
  
  // Only track when on home page and nav is visible
  const { ref: intersectionRef, isIntersecting: navIsVisible } = useIntersectionObserver({
    threshold: 0,
    rootMargin: '10px',
    triggerOnce: false
  });

  useEffect(() => {
    if (!navIsVisible || !isHomePage) return;
    
    let ticking = false;

    const measureActiveSection = () => {
      const sections = ['services', 'process', 'case-studies', 'team'];
      let currentSection = '';

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            currentSection = section;
            break;
          }
        }
      }

      setActiveSection(currentSection);
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(() => {
          measureActiveSection();
          ticking = false;
        });
      }
    };

    measureActiveSection();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHomePage, navIsVisible]);

  return { activeSection, intersectionRef };
};