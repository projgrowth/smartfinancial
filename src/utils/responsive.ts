
/**
 * Responsive design utilities for consistent mobile-first approach
 */

export const containerClasses = "container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl";

export const sectionPadding = "py-16 md:py-24";
export const sectionPaddingSmall = "py-12 md:py-16";
export const sectionPaddingLarge = "py-20 md:py-32";

export const headingResponsive = {
  h1: "text-2xl md:text-3xl lg:text-4xl xl:text-5xl",
  h2: "text-xl md:text-2xl lg:text-3xl xl:text-4xl", 
  h3: "text-lg md:text-xl lg:text-2xl",
  h4: "text-base md:text-lg lg:text-xl",
  h5: "text-sm md:text-base lg:text-lg",
  h6: "text-sm md:text-base"
};

export const textResponsive = {
  body: "text-sm md:text-base",
  bodyLarge: "text-base md:text-lg",
  small: "text-xs md:text-sm",
  caption: "text-xs"
};

export const spacingResponsive = {
  xs: "space-y-2 md:space-y-3",
  sm: "space-y-3 md:space-y-4", 
  md: "space-y-4 md:space-y-6",
  lg: "space-y-6 md:space-y-8",
  xl: "space-y-8 md:space-y-12"
};

export const gapResponsive = {
  xs: "gap-2 md:gap-3",
  sm: "gap-3 md:gap-4",
  md: "gap-4 md:gap-6", 
  lg: "gap-6 md:gap-8",
  xl: "gap-8 md:gap-12"
};

export const paddingResponsive = {
  xs: "p-2 md:p-3",
  sm: "p-3 md:p-4",
  md: "p-4 md:p-6",
  lg: "p-6 md:p-8",
  xl: "p-8 md:p-12"
};

/**
 * Check if current device is likely mobile based on screen width
 */
export const isMobileDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
};

/**
 * Get optimal image sizes for responsive loading
 */
export const getImageSizes = (
  mobile: string = '100vw',
  tablet: string = '50vw', 
  desktop: string = '33vw'
): string => {
  return `(max-width: 767px) ${mobile}, (max-width: 1023px) ${tablet}, ${desktop}`;
};

/**
 * Touch-friendly button sizing for mobile
 */
export const touchTargetSize = "min-h-[44px] min-w-[44px]";

/**
 * Grid responsive patterns
 */
export const gridResponsive = {
  auto: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  twoCol: "grid grid-cols-1 md:grid-cols-2", 
  threeCol: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  fourCol: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
};

/**
 * Flex responsive patterns  
 */
export const flexResponsive = {
  stack: "flex flex-col md:flex-row",
  center: "flex flex-col md:flex-row items-center justify-center",
  between: "flex flex-col md:flex-row items-center justify-between"
};
