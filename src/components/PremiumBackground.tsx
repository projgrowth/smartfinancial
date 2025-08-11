
import React, { memo, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const PremiumBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollPosition, setScrollPosition] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [isCoarsePointer, setIsCoarsePointer] = useState(false);
  const location = useLocation();
  const isEducationPage = location.pathname === '/education';

  // Detect user preferences and input modality
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mqCoarse = window.matchMedia('(pointer: coarse)');
    const handleReduce = () => setReduceMotion(mqReduce.matches);
    const handleCoarse = () => setIsCoarsePointer(
      mqCoarse.matches || ('ontouchstart' in window) || ((navigator as any).maxTouchPoints ?? 0) > 0
    );

    handleReduce();
    handleCoarse();

    mqReduce.addEventListener?.('change', handleReduce);
    mqCoarse.addEventListener?.('change', handleCoarse);

    return () => {
      mqReduce.removeEventListener?.('change', handleReduce);
      mqCoarse.removeEventListener?.('change', handleCoarse);
    };
  }, []);

  // Track mouse position and scroll with rAF throttling
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (reduceMotion) return; // respect reduced motion

    let mouseRaf: number | null = null;
    let scrollRaf: number | null = null;
    let lastMouseX = 0;
    let lastMouseY = 0;

    const supportsMouse = !isCoarsePointer;

    const handleMouseMove = (e: MouseEvent) => {
      if (!supportsMouse) return;
      lastMouseX = e.clientX / window.innerWidth;
      lastMouseY = e.clientY / window.innerHeight;
      if (mouseRaf == null) {
        mouseRaf = window.requestAnimationFrame(() => {
          setMousePosition({ x: lastMouseX, y: lastMouseY });
          mouseRaf = null;
        });
      }
    };

    const handleScroll = () => {
      const y = window.scrollY * 0.05;
      if (scrollRaf == null) {
        scrollRaf = window.requestAnimationFrame(() => {
          setScrollPosition(y);
          scrollRaf = null;
        });
      }
    };

    if (supportsMouse) window.addEventListener('mousemove', handleMouseMove as any, { passive: true } as any);
    window.addEventListener('scroll', handleScroll, { passive: true } as any);

    return () => {
      if (supportsMouse) window.removeEventListener('mousemove', handleMouseMove as any);
      window.removeEventListener('scroll', handleScroll);
      if (mouseRaf) cancelAnimationFrame(mouseRaf);
      if (scrollRaf) cancelAnimationFrame(scrollRaf);
    };
  }, [reduceMotion, isCoarsePointer]);

  // Calculate subtle movement based on mouse position
  const translateX1 = mousePosition.x * -15;
  const translateY1 = mousePosition.y * -15;
  const translateX2 = mousePosition.x * 15;
  const translateY2 = mousePosition.y * 15;

  return (
    <div className="fixed inset-0 w-full h-full -z-20 overflow-hidden pointer-events-none">
      {/* Enhanced gradient base with subtle color shifts */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-50/40 via-white/90 to-amber-50/40"></div>
      
      {/* Geometric patterns for texture */}
      <div className="absolute inset-0 opacity-[0.04]" 
           style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}></div>
      
      {/* Abstract bull shape only on education page (ultra subtle) */}
      {isEducationPage && (
        <div 
          className="absolute top-[40%] left-[50%] w-[80vw] h-[80vh] transform -translate-x-1/2 -translate-y-1/2 opacity-[0.02] mix-blend-screen"
          style={{ 
            transform: `translate(${translateX1 * 1.2}px, ${translateY1 * 1.2 + scrollPosition * 0.2}px) scale(${1 + mousePosition.y * 0.05})`,
            transition: 'transform 1s ease-out',
          }}
        >
          <svg
            viewBox="0 0 400 400"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id="bullGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
                <stop offset="45%" stopColor="#F59E0B" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.2" />
              </linearGradient>
              <filter id="bullBlur" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="20" />
              </filter>
            </defs>
            {/* Larger, more detailed abstract bull silhouette */}
            <path
              d="M100,110 Q130,90 160,95 Q190,100 220,90 
                  Q250,80 280,95 Q310,110 320,140 
                  Q330,170 310,200 Q300,220 320,250 
                  Q335,280 320,310 Q300,335 270,340 
                  Q240,345 210,330 Q180,320 150,340 
                  Q120,355 90,330 Q65,305 50,270 
                  Q35,235 40,195 Q45,165 60,140 
                  Q75,115 100,110 Z"
              fill="url(#bullGradient)"
              filter="url(#bullBlur)"
            />
          </svg>
        </div>
      )}
      
      {/* Interactive blue gradient shape (left) */}
      <div 
        className={`absolute top-[5%] -left-[10%] w-[50%] h-[90%] bg-gradient-to-br from-sky-200/20 to-blue-300/15 blur-3xl rounded-full transform -rotate-12 ${reduceMotion ? '' : 'animate-float duration-25000'}`}
        style={{ 
          transform: `rotate(-12deg) translate(${translateX1}px, ${translateY1 + scrollPosition}px)`,
          transition: 'transform 0.5s ease-out'
        }}
      ></div>
      
      {/* Interactive amber gradient shape (right) */}
      <div 
        className={`absolute top-[15%] -right-[10%] w-[50%] h-[70%] bg-gradient-to-br from-gold-light/20 to-gold/15 blur-3xl rounded-full transform rotate-12 ${reduceMotion ? '' : 'animate-float duration-20000'}`}
        style={{ 
          transform: `rotate(12deg) translate(${translateX2}px, ${translateY2 + scrollPosition * 0.7}px)`,
          transition: 'transform 0.5s ease-out'
        }}
      ></div>
      
      {/* Additional subtle shapes with staggered animations and interactivity */}
      <div 
        className={`absolute bottom-[10%] left-[20%] w-[30%] h-[30%] bg-gradient-to-br from-blue-200/15 to-sky-300/10 blur-3xl rounded-full ${reduceMotion ? '' : 'animate-float duration-15000'}`}
        style={{ 
          transform: `translate(${translateX1 * 0.5}px, ${translateY1 * 0.5 - scrollPosition * 0.3}px)`,
          transition: 'transform 0.7s ease-out'
        }}
      ></div>
      
      <div 
        className={`absolute top-[40%] right-[25%] w-[25%] h-[25%] bg-gradient-to-br from-gold-light/15 to-gold/10 blur-3xl rounded-full ${reduceMotion ? '' : 'animate-float duration-12000'}`}
        style={{ 
          transform: `translate(${translateX2 * 0.7}px, ${translateY2 * 0.7 - scrollPosition * 0.2}px)`,
          transition: 'transform 0.7s ease-out'
        }}
      ></div>
      
      {/* Dots pattern with subtle animation */}
      <div className="absolute inset-0 opacity-[0.03]" 
           style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.5'%3E%3Ccircle cx='3' cy='3' r='1'/%3E%3Ccircle cx='13' cy='13' r='1'/%3E%3C/g%3E%3C/svg%3E\")" }}></div>
      
      {/* Noise texture overlay */}
      <div className="absolute inset-0 bg-noise opacity-[0.01] mix-blend-overlay"></div>
    </div>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default memo(PremiumBackground);
