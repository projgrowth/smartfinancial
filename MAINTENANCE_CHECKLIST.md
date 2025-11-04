# Website Maintenance Checklist

Quick reference for maintaining design system compliance and code quality across the entire website.

---

## Before Making Any Code Changes

- [ ] Read `DESIGN_SYSTEM_USAGE_GUIDE.md` for latest patterns
- [ ] Check if similar functionality exists elsewhere
- [ ] Identify which files will be affected
- [ ] Plan approach before implementing

---

## When Adding a New Page

### 1. Structure ✅
- [ ] Use `Layout` component from `src/components/Layout.tsx`
- [ ] Do NOT add `<main>` wrapper (Layout provides it)
- [ ] Do NOT add `min-h-screen` wrapper div
- [ ] Use semantic `<section>` elements with IDs
- [ ] Add SEO component with proper meta data

### 2. Containers ✅
- [ ] Choose appropriate semantic container:
  - `container-narrow` (960px) - Forms, legal, focused reading
  - `container-default` (1280px) - Standard content sections  
  - `container-wide` (1440px) - Visual sections, galleries
  - `container-fluid` - Full width with gutters only
- [ ] Never use `container-unified` (deprecated)
- [ ] Never use arbitrary `max-w-*` classes

### 3. Spacing ✅
- [ ] Use section spacing classes:
  - `.section-xl` - Hero sections, major CTAs
  - `.section-lg` - Primary content sections
  - `.section-md` - Secondary sections
  - `.section-sm` - Compact sections
- [ ] Use gap classes for grids: `.gap-unified-lg`, `.gap-unified-md`, etc.
- [ ] Use space classes for vertical rhythm: `.space-component-lg`, etc.

### 4. Typography ✅
- [ ] Use semantic heading classes:
  - `.heading-xl` - Hero headlines
  - `.heading-lg` - Section headers
  - `.heading-md` - Subsection headers
  - `.heading-sm` - Card titles
- [ ] Use semantic body text classes:
  - `.text-body-lg` - Lead text
  - `.text-body` - Standard body
  - `.text-body-sm` - Fine print

### 5. Colors ✅
- [ ] Use only HSL color tokens: `hsl(var(--primary))`
- [ ] Never use hardcoded colors: `#FFFFFF`, `bg-slate-50`, etc.
- [ ] Use semantic background classes:
  - `.section-bg-premium-light`
  - `.section-bg-premium-dark`
  - `.section-bg-subtle`
  - `.section-bg-accent`

### 6. Imports ✅
- [ ] Use `@/` alias for all imports
- [ ] Example: `import Hero from '@/components/Hero'`
- [ ] Never use relative paths: `../components/Hero`

### 7. Accessibility ✅
- [ ] Add unique `id` to each section
- [ ] Use proper heading hierarchy (H1 → H6)
- [ ] Add `aria-label` to interactive elements
- [ ] Include skip links for major sections
- [ ] Test keyboard navigation

---

## When Modifying Existing Components

### Before Editing ✅
- [ ] Check if component is used on multiple pages
- [ ] Verify current implementation matches design system
- [ ] Identify all files that import this component

### During Editing ✅
- [ ] Maintain existing prop interfaces (avoid breaking changes)
- [ ] Use design tokens for all colors
- [ ] Use semantic classes for spacing/typography
- [ ] Keep components focused (single responsibility)
- [ ] Update TypeScript types if needed

### After Editing ✅
- [ ] Test on all pages that use the component
- [ ] Run Lighthouse audit
- [ ] Check keyboard navigation
- [ ] Verify responsive behavior
- [ ] Update documentation if needed

---

## When Adding New UI Components

### Structure ✅
- [ ] Create in `src/components/ui/` for reusable UI elements
- [ ] Create in `src/components/` for page-specific components
- [ ] Use TypeScript for type safety
- [ ] Follow existing naming conventions

### Design System ✅
- [ ] Use Button component variants (don't create new button styles)
- [ ] Use Card component for containers
- [ ] Use semantic color tokens
- [ ] Use semantic spacing classes
- [ ] Make responsive by default

### Accessibility ✅
- [ ] Add proper ARIA attributes
- [ ] Ensure keyboard accessibility
- [ ] Test with screen reader
- [ ] Verify color contrast ratios

---

## When Updating Styles

### Global Styles ✅
- [ ] Update `src/index.css` for color tokens
- [ ] Update `src/styles/unified-design-system.css` for semantic classes
- [ ] Update `tailwind.config.ts` for Tailwind integration
- [ ] Update `DESIGN_SYSTEM_USAGE_GUIDE.md` documentation

### Component Styles ✅
- [ ] Use design tokens, not hardcoded values
- [ ] Use semantic classes from design system
- [ ] Avoid inline styles unless dynamic
- [ ] Keep specificity low

### What to Avoid ❌
- [ ] Never use hardcoded hex colors
- [ ] Never use RGB values directly
- [ ] Never use arbitrary values without justification
- [ ] Never override design system tokens in components

---

## Testing Checklist

### Before Committing ✅
- [ ] Run dev server and check for console errors
- [ ] Test on mobile, tablet, desktop viewports
- [ ] Test keyboard navigation (Tab, Enter, Esc)
- [ ] Run Lighthouse audit (target 90+ score)
- [ ] Check all modified pages visually

### Accessibility Testing ✅
- [ ] Run axe DevTools (0 violations target)
- [ ] Test with keyboard only
- [ ] Test with screen reader (NVDA/JAWS)
- [ ] Verify color contrast ratios
- [ ] Check focus indicators

### Performance Testing ✅
- [ ] Check Network tab for unnecessary requests
- [ ] Verify lazy loading works correctly
- [ ] Check bundle size didn't increase significantly
- [ ] Test on throttled connection

---

## Code Review Checklist

### Structure ✅
- [ ] No duplicate `<main>` landmarks
- [ ] Semantic HTML used appropriately
- [ ] Proper component hierarchy
- [ ] No unnecessary wrapper divs

### Design System Compliance ✅
- [ ] All containers use semantic classes
- [ ] All colors use design tokens
- [ ] All spacing uses semantic classes
- [ ] All typography uses semantic classes
- [ ] No deprecated classes used

### Code Quality ✅
- [ ] TypeScript types defined
- [ ] Props interfaces documented
- [ ] No console.log statements
- [ ] No commented-out code
- [ ] Imports organized and consistent

### Accessibility ✅
- [ ] ARIA attributes used correctly
- [ ] Heading hierarchy correct
- [ ] Interactive elements accessible
- [ ] Forms have labels
- [ ] Images have alt text

---

## Monthly Audit Tasks

### Performance Audit ✅
- [ ] Run Lighthouse on all pages
- [ ] Check Core Web Vitals
- [ ] Review bundle size
- [ ] Identify optimization opportunities

### Accessibility Audit ✅
- [ ] Run axe DevTools on all pages
- [ ] Test keyboard navigation site-wide
- [ ] Review screen reader experience
- [ ] Check color contrast compliance

### Design System Audit ✅
- [ ] Search for hardcoded colors
- [ ] Search for `container-unified` usage
- [ ] Search for relative imports (`../`)
- [ ] Search for arbitrary max-width values
- [ ] Verify consistent component usage

### Documentation Audit ✅
- [ ] Update `DESIGN_SYSTEM_USAGE_GUIDE.md` if needed
- [ ] Document new components
- [ ] Update container usage examples
- [ ] Review and update best practices

---

## Quick Reference Commands

### Search for Issues
```bash
# Find hardcoded colors
grep -r "bg-slate-" src/
grep -r "#[0-9A-Fa-f]" src/

# Find deprecated containers
grep -r "container-unified" src/

# Find relative imports
grep -r "from '\.\." src/

# Find arbitrary max-width
grep -r "max-w-\[" src/
```

### Common Fixes
```tsx
// ❌ Wrong
<div className="container-unified max-w-4xl bg-slate-50">
  <h2 className="text-2xl">Title</h2>
</div>

// ✅ Correct
<div className="container-default section-bg-subtle">
  <h2 className="heading-lg">Title</h2>
</div>
```

---

## Emergency Rollback

If something breaks:

1. **Find Previous Working Version**
   - Open Project History (clock icon)
   - Identify last working version
   - Review changes since then

2. **Revert Specific Files**
   - Use History to restore specific files
   - Test each restoration
   - Document what broke and why

3. **Full Project Rollback**
   - Use "Restore this version" in History
   - Retest entire site
   - Plan fix for original issue

---

## Questions & Support

### Before Asking for Help
1. Check `DESIGN_SYSTEM_USAGE_GUIDE.md`
2. Review this maintenance checklist
3. Search codebase for similar implementations
4. Check component documentation

### When Asking for Help
- Describe what you're trying to achieve
- Show what you've tried
- Include relevant code snippets
- Note any error messages

---

## Version History

- **v3.0** - Complete Site Cleanup (Current)
- **v2.0** - Homepage Optimization
- **v1.0** - Initial Design System

---

*Keep this checklist up to date as the project evolves*  
*Last Updated: Phase 6 Complete Site Cleanup*
