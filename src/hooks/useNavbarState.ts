import { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useIsMobile } from './use-mobile';

export const useNavbarState = () => {
  const navRef = useRef<HTMLElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();

  // Enhanced navigation height management
  useEffect(() => {
    const root = document.documentElement;
    const updateNavHeight = () => {
      const h = navRef.current?.offsetHeight ?? 64;
      root.style.setProperty('--nav-h', `${h}px`);
      if (!root.style.getPropertyValue('--nav-h-initial')) {
        root.style.setProperty('--nav-h-initial', `${h}px`);
      }
    };

    updateNavHeight();

    const ro = new ResizeObserver(() => updateNavHeight());
    if (navRef.current) ro.observe(navRef.current);

    window.addEventListener('resize', updateNavHeight);
    const fontsReady = (document as any).fonts?.ready as Promise<void> | undefined;
    fontsReady?.then(() => updateNavHeight()).catch(() => updateNavHeight());

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', updateNavHeight);
    };
  }, [isOpen, isScrolled, location.pathname]);

  // Optimized scroll detection
  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 10);
          ticking = false;
        });
      }
    };

    setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Focus management for mobile menu
  useEffect(() => {
    if (isOpen && mobileMenuRef.current) {
      const firstFocusable = mobileMenuRef.current.querySelector('a, button') as HTMLElement;
      firstFocusable?.focus();
    }
  }, [isOpen]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!isOpen) return;
    
    if (e.key === 'Escape') {
      setIsOpen(false);
      const menuButton = document.querySelector('[aria-expanded="true"]') as HTMLElement;
      menuButton?.focus();
    }
  }, [isOpen]);

  return {
    navRef,
    mobileMenuRef,
    isOpen,
    setIsOpen,
    isScrolled,
    location,
    isMobile,
    handleKeyDown,
  };
};