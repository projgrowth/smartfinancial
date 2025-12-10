/**
 * Theme Configuration
 * Design tokens consumed by components - reference only these values
 * All values map to CSS custom properties defined in tokens.css
 */

export const theme = {
  colors: {
    // Primary brand colors
    primaryNavy: 'hsl(var(--primary))',
    charcoal: 'hsl(var(--charcoal))',
    charcoalLight: 'hsl(var(--charcoal-light))',
    charcoalDark: 'hsl(var(--charcoal-dark))',
    
    // Accent colors
    softGold: 'hsl(var(--gold))',
    goldLight: 'hsl(var(--gold-light))',
    goldDark: 'hsl(var(--gold-dark))',
    accent: 'hsl(var(--accent))',
    
    // Neutral palette
    slate: 'hsl(var(--muted-foreground))',
    offWhite: 'hsl(var(--background))',
    
    // Semantic colors
    success: 'hsl(var(--success))',
    warning: 'hsl(var(--warning))',
    destructive: 'hsl(var(--destructive))',
    info: 'hsl(var(--info))',
  },
  
  typography: {
    // Font families - map to Tailwind classes
    display: 'font-heading',
    heading: 'font-heading',
    body: 'font-sans',
    
    // Font sizes - use semantic classes
    sizes: {
      displayFluid: 'heading-display-fluid',
      displayLg: 'heading-display-lg',
      displayMd: 'heading-display-md',
      displaySm: 'heading-display-sm',
      headingLg: 'heading-lg',
      headingMd: 'heading-md',
      headingSm: 'heading-sm',
      headingXs: 'heading-xs',
      bodyXl: 'text-body-xl',
      bodyLg: 'text-body-lg',
      body: 'text-body',
      bodySm: 'text-body-sm',
      caption: 'text-caption',
    },
  },
  
  spacing: {
    // Section spacing
    sectionXl: 'section-xl',
    sectionLg: 'section-lg',
    sectionMd: 'section-md',
    sectionSm: 'section-sm',
    
    // Component spacing
    componentLg: 'space-component-lg',
    componentMd: 'space-component-md',
    componentSm: 'space-component-sm',
    componentXs: 'space-component-xs',
    
    // Gap values (8px grid)
    gap4: 'gap-4',   // 16px
    gap6: 'gap-6',   // 24px
    gap8: 'gap-8',   // 32px
    gap12: 'gap-12', // 48px
    gap16: 'gap-16', // 64px
  },
  
  radii: {
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    full: 'rounded-full',
  },
  
  shadows: {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
    none: 'shadow-none',
  },
  
  // Container classes
  containers: {
    narrow: 'container-narrow',
    default: 'container-default',
    wide: 'container-wide',
  },
  
  // Grid classes
  grids: {
    twoCol: 'grid-two-col',
    threeCol: 'grid-three-col',
    fourCol: 'grid-four-col',
  },
  
  // Transitions
  transitions: {
    fast: 'duration-150',
    normal: 'duration-300',
    slow: 'duration-500',
  },
} as const;

export type Theme = typeof theme;
