
/**
 * Enhanced image optimization utilities for better performance and accessibility
 */

export interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
  quality?: number;
  format?: 'webp' | 'avif' | 'auto';
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
}

export interface ResponsiveImageConfig {
  breakpoints: { [key: string]: number };
  formats: string[];
  qualities: number[];
}

/**
 * Generate responsive image srcSet for different screen densities and formats
 */
export const generateSrcSet = (baseSrc: string, sizes: number[] = [1, 2, 3]) => {
  return sizes.map(size => `${baseSrc}?w=${size}x ${size}x`).join(', ');
};

/**
 * Generate WebP/AVIF sources with fallbacks
 */
export const generateModernImageSources = (src: string, width: number) => {
  const base = src.split('.')[0];
  return {
    avif: `${base}.avif?w=${width}&q=75`,
    webp: `${base}.webp?w=${width}&q=80`,
    fallback: `${src}?w=${width}&q=85`
  };
};

/**
 * Create blur placeholder data URL
 */
export const generateBlurPlaceholder = (width: number = 10, height: number = 10): string => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  
  if (ctx) {
    // Create a simple gradient blur effect
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#f3f4f6');
    gradient.addColorStop(1, '#e5e7eb');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  }
  
  return canvas.toDataURL('image/jpeg', 0.1);
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
 * Enhanced preload critical images with format detection
 */
export const preloadCriticalImages = (imageUrls: string[], options: { priority?: boolean; format?: string } = {}) => {
  if (typeof window !== 'undefined') {
    imageUrls.forEach(url => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = url;
      
      // Add priority hint if supported
      if (options.priority && 'fetchPriority' in link) {
        (link as any).fetchPriority = 'high';
      }
      
      document.head.appendChild(link);
    });
  }
};

/**
 * Lazy load images with intersection observer
 */
export const createLazyImageLoader = (threshold: number = 0.1) => {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return null;
  }

  return new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        const src = img.dataset.src;
        const srcset = img.dataset.srcset;
        
        if (src) {
          img.src = src;
          img.removeAttribute('data-src');
        }
        
        if (srcset) {
          img.srcset = srcset;
          img.removeAttribute('data-srcset');
        }
        
        img.classList.remove('lazy-loading');
        img.classList.add('lazy-loaded');
      }
    });
  }, { threshold });
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
