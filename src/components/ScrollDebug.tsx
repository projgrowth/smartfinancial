import React, { useEffect, useState } from 'react';
import { isSafariMobile } from '@/utils/safariDetection';

const ScrollDebug: React.FC = () => {
  const [scrollInfo, setScrollInfo] = useState({
    scrollY: 0,
    innerHeight: 0,
    documentHeight: 0,
    canScroll: false
  });

  useEffect(() => {
    if (!isSafariMobile()) return;

    const updateScrollInfo = () => {
      setScrollInfo({
        scrollY: window.scrollY,
        innerHeight: window.innerHeight,
        documentHeight: document.documentElement.scrollHeight,
        canScroll: document.documentElement.scrollHeight > window.innerHeight
      });
    };

    updateScrollInfo();
    window.addEventListener('scroll', updateScrollInfo, { passive: true });
    window.addEventListener('resize', updateScrollInfo, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateScrollInfo);
      window.removeEventListener('resize', updateScrollInfo);
    };
  }, []);

  if (!isSafariMobile()) return null;

  return (
    <div className="fixed top-20 right-4 bg-black/80 text-white p-2 text-xs rounded z-50 font-mono">
      <div>Y: {scrollInfo.scrollY}</div>
      <div>VH: {scrollInfo.innerHeight}</div>
      <div>Doc: {scrollInfo.documentHeight}</div>
      <div>Can: {scrollInfo.canScroll ? '✓' : '✗'}</div>
    </div>
  );
};

export default ScrollDebug;