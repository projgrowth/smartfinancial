# Design System Documentation

## Overview
This document provides comprehensive guidelines for using the unified design system in Smart Financial Planning's web application. All components, styles, and tokens are designed to create a consistent, accessible, and maintainable user experience.

---

## Table of Contents
1. [Design Tokens](#design-tokens)
2. [Typography System](#typography-system)
3. [Layout & Grid System](#layout--grid-system)
4. [Spacing System](#spacing-system)
5. [Color System](#color-system)
6. [Component Guidelines](#component-guidelines)
7. [Accessibility Standards](#accessibility-standards)
8. [Performance Best Practices](#performance-best-practices)

---

## Design Tokens

### Color Tokens
All colors use HSL format and CSS custom properties for consistency and theming support.

**Primary Colors:**
```css
--primary: [HSL value]         /* Main brand color */
--accent: [HSL value]          /* Accent/secondary brand color */
--gold: [HSL value]            /* Premium accent color */
```

**Semantic Colors:**
```css
--success: [HSL value]         /* Success states */
--warning: [HSL value]         /* Warning states */
--error: [HSL value]           /* Error states */
--info: [HSL value]            /* Informational states */
```

**Usage:**
```tsx
// ✅ CORRECT - Use design tokens
<div className="bg-accent text-accent-foreground">

// ❌ WRONG - Never use direct colors
<div className="bg-blue-500 text-white">
```

### Shadow Tokens
```css
--shadow-text-gradient        /* Text gradient glow effects */
--shadow-button-primary       /* Primary CTA button shadows */
--shadow-button-hover         /* Enhanced hover shadows */
```

---

## Typography System

### Fluid Typography
All heading and text sizes use `clamp()` for responsive scaling:

**Display Headings:**
```tsx
<h1 className="heading-display-fluid">    /* 2.5rem → 4rem */
<h2 className="heading-lg">               /* 2rem → 2.5rem */
<h3 className="heading-md">               /* 1.5rem → 1.75rem */
<h4 className="heading-sm">               /* 1.25rem → 1.5rem */
<h5 className="heading-xs">               /* 1rem → 1.125rem */
```

**Body Text:**
```tsx
<p className="text-body-xl">              /* Large body text */
<p className="text-body-lg">              /* Medium-large body text */
<p className="text-body">                 /* Default body text */
<p className="text-body-sm">              /* Small body text */
<small className="text-caption">          /* Caption/metadata text */
```

**Guidelines:**
- Always use semantic HTML elements (`h1`, `h2`, `p`, etc.)
- Single `h1` per page for SEO
- Logical heading hierarchy (don't skip levels)
- Use `.text-balance` for headings to prevent orphans
- Use `.text-pretty` for body text to improve readability

---

## Layout & Grid System

### Container System
```tsx
<div className="container-unified">       /* Max-width: 1400px, default gutters */
<div className="container-narrow">        /* Max-width: 1200px */
<div className="container-wide">          /* Max-width: 1600px */
<div className="container-content">       /* Max-width: 800px - for reading */
```

### 12-Column Grid System
All grids follow a 12-column system with responsive breakpoints:

**Auto Columns:**
```tsx
<div className="grid-auto">               /* Auto-fit columns, min 280px */
```

**Fixed Columns:**
```tsx
<div className="grid-two-col">            /* 1 col → 2 cols @ md */
<div className="grid-three-col">          /* 1 col → 2 cols @ md → 3 cols @ lg */
<div className="grid-four-col">           /* 1 col → 2 cols @ md → 4 cols @ lg */
```

**Manual 12-Column Grid:**
```tsx
<div className="grid-12">
  <div className="col-span-12 md:col-span-6 lg:col-span-4">
    {/* 12 columns on mobile, 6 on tablet, 4 on desktop */}
  </div>
</div>
```

**Gap Utilities:**
```tsx
<div className="gap-unified-xl">          /* 3rem gap */
<div className="gap-unified-lg">          /* 2rem gap */
<div className="gap-unified-md">          /* 1.5rem gap */
<div className="gap-unified-sm">          /* 1rem gap */
<div className="gap-unified-xs">          /* 0.5rem gap */
```

---

## Spacing System

### Section Spacing
```tsx
<section className="section-xl">          /* Extra large vertical padding */
<section className="section-lg">          /* Large vertical padding */
<section className="section">             /* Default vertical padding */
<section className="section-sm">          /* Small vertical padding */
```

### Component Spacing
Stack vertical elements with consistent spacing:

```tsx
<div className="space-component-2xl">     /* 4rem spacing */
<div className="space-component-xl">      /* 3rem spacing */
<div className="space-component-lg">      /* 2rem spacing */
<div className="space-component-md">      /* 1.5rem spacing */
<div className="space-component-sm">      /* 1rem spacing */
<div className="space-component-xs">      /* 0.5rem spacing */
```

---

## Color System

### Semantic Background Classes
```tsx
<section className="bg-background">       /* Default background */
<section className="section-bg-accent">   /* Accent background with padding */
<section className="section-bg-premium-dark"> /* Premium dark section */
```

### Text Colors
```tsx
<p className="text-foreground">           /* Primary text color */
<p className="text-muted-foreground">     /* Secondary/muted text */
<span className="text-primary">           /* Brand primary color */
<span className="text-accent">            /* Accent color text */
<span className="text-success">           /* Success state text */
<span className="text-error">             /* Error state text */
```

---

## Component Guidelines

### Buttons
All buttons automatically enforce 44px minimum touch target:

```tsx
<Button variant="default" size="lg">      /* Primary CTA */
<Button variant="shimmer" size="lg">      /* Hero/premium CTA */
<Button variant="outline" size="default"> /* Secondary action */
<Button variant="ghost" size="sm">        /* Tertiary/subtle action */
<Button variant="link" size="none">       /* Text link style */
```

**Accessibility:**
- Always include `aria-label` for icon-only buttons
- Use `loading` prop to show loading state
- Minimum touch target: 44x44px (enforced by design system)

### Cards
```tsx
<PremiumCard variant="elevated" size="lg">
  <PremiumCardHeader>
    <PremiumCardTitle>Title</PremiumCardTitle>
  </PremiumCardHeader>
  <PremiumCardContent className="card-content-grow">
    Content here
  </PremiumCardContent>
  <PremiumCardFooter>
    Footer
  </PremiumCardFooter>
</PremiumCard>
```

Use `.card-equal-height` for consistent card heights in grids.

### Forms
```tsx
<div className="form-group">
  <label htmlFor="name" className="form-label">
    Name
  </label>
  <input 
    id="name"
    type="text"
    className="input-primary"
    aria-required="true"
  />
</div>
```

**Accessibility:**
- Always associate labels with inputs using `htmlFor` and `id`
- Include `aria-required="true"` for required fields
- Minimum input height: 44px for touch targets

---

## Accessibility Standards

### WCAG 2.1 AA Compliance
- **Contrast Ratio:** Minimum 4.5:1 for normal text, 3:1 for large text
- **Touch Targets:** Minimum 44x44px for all interactive elements
- **Focus Indicators:** Visible focus states on all interactive elements
- **Keyboard Navigation:** Full keyboard accessibility for all interactions
- **ARIA Labels:** Proper ARIA attributes for screen readers

### Implementation Examples:
```tsx
// Proper button with ARIA
<Button 
  variant="default"
  aria-label="Schedule your private consultation"
  onClick={handleClick}
>
  Schedule Call
</Button>

// Form with proper ARIA
<input 
  type="email"
  id="email"
  aria-required="true"
  aria-describedby="email-error"
  className="input-primary"
/>
{error && <p id="email-error" role="alert">{error}</p>}

// Section with proper landmarks
<section 
  id="services" 
  className="section-lg"
  role="region"
  aria-labelledby="services-heading"
>
  <h2 id="services-heading">Our Services</h2>
</section>
```

---

## Performance Best Practices

### Component Preloading
Preload heavy components on hover/focus:

```tsx
import { preloadMeetingScheduler, preloadCaseStudies } from '@/utils/componentPreloader';

<Button 
  onMouseEnter={preloadMeetingScheduler}
  onFocus={preloadMeetingScheduler}
>
  Schedule Meeting
</Button>
```

### Image Optimization
```tsx
import { generateTeamAltText, getHeadshotPosition } from '@/utils/imageOptimization';

<img 
  src={imageUrl}
  alt={generateTeamAltText(name, title)}
  loading="lazy"
  style={{ objectPosition: getHeadshotPosition(imageUrl) }}
/>
```

### Animation Performance
- Use `transform` and `opacity` for animations (GPU-accelerated)
- Avoid animating `width`, `height`, `top`, `left` (causes reflows)
- Use `will-change` sparingly and remove after animation completes

---

## Migration Guide

### From Old to New System

**Spacing:**
```tsx
// OLD
<div className="mb-8 mt-6">

// NEW
<div className="space-component-lg">
```

**Colors:**
```tsx
// OLD
<div className="bg-blue-500 text-white">

// NEW
<div className="bg-accent text-accent-foreground">
```

**Grids:**
```tsx
// OLD
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

// NEW
<div className="grid-four-col">
```

---

## Questions or Issues?

For questions about the design system or to report inconsistencies:
1. Check this documentation first
2. Review `src/styles/unified-design-system.css` for implementation details
3. Ensure you're using the latest component patterns

**Remember:** Consistency is key. When in doubt, follow existing patterns in the codebase.