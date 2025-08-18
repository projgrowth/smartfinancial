
export function smoothScrollTo(elementId: string) {
  const element = document.getElementById(elementId);
  if (!element) return;
  
  const root = document.documentElement;
  const cs = getComputedStyle(root);
  const navH = parseFloat(cs.getPropertyValue('--nav-h')) || parseFloat(cs.getPropertyValue('--nav-h-initial')) || 80;
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - navH;

  // Check if browser supports smooth scrolling
  if ('scrollBehavior' in document.documentElement.style) {
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  } else {
    // Fallback with custom easing for older browsers
    const start = window.pageYOffset;
    const distance = offsetPosition - start;
    const duration = Math.min(Math.abs(distance) / 2, 800);
    let startTime: number;

    const easeInOutCubic = (t: number): number => {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    };

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeInOutCubic(progress);
      
      window.scrollTo(0, start + distance * easedProgress);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }
}
