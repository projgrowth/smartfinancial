
/**
 * Image optimization utilities for better performance and accessibility
 */

export interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
}

/**
 * Generate responsive image srcSet for different screen densities
 */
export const generateSrcSet = (baseSrc: string, sizes: number[] = [1, 2, 3]) => {
  return sizes.map(size => `${baseSrc}?w=${size}x ${size}x`).join(', ');
};

/**
 * Get optimized object position for team member headshots
 */
export const getHeadshotPosition = (imageUrl: string): string => {
  if (imageUrl.includes('83c79661')) return 'center 20%'; // Razell
  if (imageUrl.includes('c90c6dda')) return 'center 30%'; // Kelvin
  if (imageUrl.includes('9a1a6d90')) return 'center 25%'; // Vince
  if (imageUrl.includes('3dda3ab1')) return 'center 22%'; // Joseph
  return 'center center'; // Default
};

/**
 * Generate optimized alt text for team member images
 */
export const generateTeamAltText = (name: string, title: string, company: string = 'Smart Financial Planning'): string => {
  return `${name}, ${title} at ${company} - Orlando and Lake Nona Financial Advisor`;
};

/**
 * Preload critical images for better performance
 */
export const preloadCriticalImages = (imageUrls: string[]) => {
  if (typeof window !== 'undefined') {
    imageUrls.forEach(url => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = url;
      document.head.appendChild(link);
    });
  }
};

/**
 * Check if image loading optimization is supported
 */
export const supportsImageLoading = (): boolean => {
  return typeof window !== 'undefined' && 'loading' in HTMLImageElement.prototype;
};

/**
 * Get responsive image sizes attribute
 */
export const getResponsiveSizes = (breakpoints: { [key: string]: string } = {
  sm: '100vw',
  md: '50vw', 
  lg: '33vw'
}): string => {
  return Object.entries(breakpoints)
    .map(([breakpoint, size]) => `(min-width: ${getBreakpointValue(breakpoint)}px) ${size}`)
    .join(', ');
};

const getBreakpointValue = (breakpoint: string): number => {
  const breakpoints: { [key: string]: number } = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536
  };
  return breakpoints[breakpoint] || 768;
};
