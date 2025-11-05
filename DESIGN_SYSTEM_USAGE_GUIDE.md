# Design System Usage Guide
**Smart Financial Planning Website**

---

## Table of Contents
1. [Container Widths](#container-widths)
2. [Section Spacing](#section-spacing)
3. [Typography Scale](#typography-scale)
4. [Background Patterns](#background-patterns)
5. [Grid System](#grid-system)
6. [Spacing & Gaps](#spacing--gaps)
7. [Color & Opacity](#color--opacity)
8. [When to Use Inline Styles](#when-to-use-inline-styles)

---

## Container Widths

### Available Containers
- **`.container-narrow`** (60rem / 960px) - For focused content
  - Use for: Forms, long-form text, legal pages, blog posts
  - Examples: Privacy/Terms pages, RSVP forms, newsletter signup
  
- **`.container-default`** (80rem / 1280px) - Balanced content width
  - Use for: General sections, feature grids, service cards
  - Examples: Services section, "What You'll Learn", Contact info
  
- **`.container-wide`** (90rem / 1440px) - Visual sections
  - Use for: Hero sections, team galleries, full-width showcases
  - Examples: Hero section, Team section, Case studies
  
- **`.container-fluid`** - Full width with gutters only
  - Use for: Full-bleed sections, edge-to-edge layouts
  - Examples: Background patterns, full-width banners

### Guidelines
✅ **DO:**
- Use semantic container classes for all content sections
- Match container width to content type and purpose
- Maintain consistent widths across similar section types

❌ **DON'T:**
- Mix `container-unified` with manual `max-w-*` classes
- Use arbitrary max-width values
- Change container mid-section

---

## Section Spacing

### Vertical Spacing Scale
```
.section-xl → py-16 md:py-24 lg:py-32  // Major sections
.section-lg → py-12 md:py-20 lg:py-24  // Standard sections
.section-md → py-10 md:py-16 lg:py-20  // Medium sections
.section-sm → py-8  md:py-12 lg:py-16  // Compact sections
```

### When to Use Each
- **`.section-xl`**: Hero sections, newsletter signup, major CTAs
- **`.section-lg`**: Primary content sections (Services, Process, RSVP hero)
- **`.section-md`**: Secondary sections (FAQ, Contact info, "What You'll Learn")
- **`.section-sm`**: Tertiary sections, tight layouts

### Component Spacing
```
.space-component-xl → space-y-12 md:space-y-16
.space-component-lg → space-y-8  md:space-y-12
.space-component-md → space-y-6  md:space-y-8
.space-component-sm → space-y-4  md:space-y-6
.space-component-xs → space-y-2  md:space-y-4
```

---

## Typography Scale

### Headings (Fluid & Responsive)
```
.heading-display-fluid → 2.25rem to 4.75rem   // Hero titles only
.heading-lg            → 1.75rem to 2.5rem    // Section headers
.heading-md            → 1.5rem to 1.875rem   // Subsections
.heading-sm            → 1.125rem to 1.5rem   // Card titles
.heading-xs            → 1rem to 1.25rem      // Component titles
```

### Body Text
```
.text-body-xl → 1.125rem to 1.25rem   // Emphasis paragraphs
.text-body-lg → 1rem to 1.125rem      // Lead text
.text-body    → 0.875rem to 1rem      // Standard body
.text-body-sm → 0.75rem to 0.875rem   // Fine print
.text-caption → 0.75rem to 0.8125rem  // Small annotations
```

### When Inline Sizing is Acceptable
✅ **OK to use `text-sm`, `text-xs`, etc.:**
- Form labels (`<label>` elements)
- UI badges and pills
- Icon labels
- Tooltips and popovers
- Data tables
- Button text (use Button component variants)

❌ **Should use semantic classes:**
- Main body paragraphs
- Section descriptions
- Card content
- Article/blog content
- Any text > 2 lines

---

## Background Patterns

### Available Background Classes

#### Basic Backgrounds
- **`.section-bg-primary`** - Default background color
- **`.section-bg-subtle`** - Very subtle muted background (legal pages, 404)
- **`.section-bg-accent`** - Subtle accent gradient
- **`.section-bg-muted`** - Light muted background

#### Premium Backgrounds
- **`.section-bg-premium-light`** - Accent gradient (135deg)
  - Use for: Hero sections, RSVP, Newsletter
  - Creates: Soft accent glow effect
  
- **`.section-bg-premium-dark`** - Primary gradient with radial overlay
  - Use for: CTA sections, Footer
  - Creates: Deep, rich premium feel
  
- **`.section-bg-premium-accent`** - Diagonal accent gradient
  - Use for: FAQ, alternating sections
  - Creates: Subtle accent atmosphere

### Background Pattern Selection Guide

```
┌─────────────────────┬──────────────────────────┐
│ Section Type        │ Recommended Background   │
├─────────────────────┼──────────────────────────┤
│ Hero                │ section-bg-premium-light │
│ Introduction        │ bg-background            │
│ Services/Features   │ section-bg-accent        │
│ Process/How It Works│ bg-gradient-to-br*       │
│ Calculator/Tools    │ bg-background            │
│ Newsletter Signup   │ section-bg-premium-light │
│ FAQ                 │ section-bg-premium-accent│
│ CTA (Final)         │ section-bg-premium-dark  │
│ Legal Pages         │ section-bg-subtle        │
│ 404/Error Pages     │ section-bg-subtle        │
└─────────────────────┴──────────────────────────┘

* Custom gradients using design tokens only
```

### Guidelines
✅ **DO:**
- Alternate backgrounds for visual rhythm
- Use premium backgrounds for key conversion sections
- Maintain 2-3 background types per page maximum

❌ **DON'T:**
- Use the same background for consecutive sections
- Mix custom colors outside the design system
- Over-use premium backgrounds (dilutes impact)

---

## Grid System

### Base Grid Classes
```
.grid-12       → Full 12-column grid (use with col-span-*)
.grid-auto     → 1 → 2 → 3 columns responsive
.grid-two-col  → 1 → 2 columns
.grid-three-col→ 1 → 2 → 3 columns
.grid-four-col → 1 → 2 → 4 columns
```

### Specialized Grids
```
.grid-time-slots → 2 → 3 columns (meeting scheduler)
.grid-metrics    → 2 → 4 columns (statistics display)
```

### All grids now use `.gap-unified-lg` by default

### Grid vs Flexbox Decision Matrix
```
Use GRID when:                    Use FLEX when:
├─ Equal-width columns           ├─ Variable-width items
├─ Complex 2D layouts            ├─ Single-row/column layouts
├─ Card grids                    ├─ Navigation menus
├─ Gallery/portfolio             ├─ Button groups
└─ Dashboard layouts             └─ Form fields
```

---

## Spacing & Gaps

### Gap System (for grids)
```
.gap-unified-xl → gap-8  md:gap-12
.gap-unified-lg → gap-6  md:gap-8
.gap-unified-md → gap-4  md:gap-6
.gap-unified-sm → gap-3  md:gap-4
```

### When to Use Direct Spacing
✅ **OK to use `mb-4`, `mt-6`, etc.:**
- Component-internal spacing (< 5 elements)
- Fine-tuning specific element positions
- One-off adjustments in isolated components

✅ **Should use semantic spacing:**
- Major section separations
- Vertical rhythm between content blocks
- Predictable, repeatable spacing patterns

---

## Color & Opacity

### Semantic Color Tokens
Always use HSL color tokens from `tokens.css`:
```css
hsl(var(--primary))     /* Primary brand color */
hsl(var(--accent))      /* Accent/secondary color */
hsl(var(--gold))        /* Premium accent */
hsl(var(--foreground))  /* Primary text */
hsl(var(--muted-foreground)) /* Secondary text */
hsl(var(--background))  /* Base background */
hsl(var(--card))        /* Card backgrounds */
hsl(var(--border))      /* Borders */
```

### Opacity Scale Guidelines
```
Background fills:
├─ /5  → Very subtle hint (hover states)
├─ /10 → Subtle background (badges, pills)
├─ /20 → Soft background (cards, sections)
└─ /30 → Noticeable fill (active states)

Borders:
├─ /20 → Subtle borders
├─ /30 → Standard borders
└─ /40 → Prominent borders

Text:
├─ /60 → Disabled text
├─ /70 → Muted text
└─ /80 → Secondary text
```

### Color Usage Rules
✅ **DO:**
- Use semantic tokens for all colors
- Apply opacity with `/value` syntax
- Reference design system variables

❌ **DON'T:**
- Use hardcoded hex colors (`#FFFFFF`)
- Use RGB values directly
- Mix color systems

---

## When to Use Inline Styles

### ✅ Acceptable Inline Style Usage

#### 1. Dynamic Values
```tsx
<div style={{ transform: `translateX(${offset}px)` }} />
<div style={{ width: `${progress}%` }} />
```

#### 2. Component Library Requirements
```tsx
<ChartContainer style={{ height: chartHeight }} />
<Avatar style={{ objectPosition: getPosition() }} />
```

#### 3. Third-Party Integration
```tsx
<CalendlyWidget style={{ minHeight: '700px' }} />
```

### ❌ Never Use Inline Styles For

- Colors that exist in design system
- Static spacing values
- Typography sizes
- Border radii
- Shadow effects
- Transition timings
- Z-index values

### Refactoring Checklist
When you see inline styles, ask:
1. Does this value change dynamically? → Keep inline
2. Is this a design token? → Use CSS class
3. Is this reused elsewhere? → Extract to design system
4. Is this a one-time override? → Consider if truly necessary

---

## 🎨 Best Practices Summary

### The Golden Rules
1. **Semantic First**: Always try semantic classes before custom values
2. **Design System Only**: Never use colors/sizes outside the design system
3. **Consistent Patterns**: Same content type = same styling
4. **Document Exceptions**: If you must break a rule, comment why
5. **Responsive by Default**: All spacing/sizing should scale with viewport

---

## ⚠️ CRITICAL: Never Use Hardcoded Colors

### NEVER Use:
- ❌ `text-blue-500`, `bg-blue-100`, `border-blue-300`
- ❌ Hex colors: `#3B82F6`, `#DBEAFE`
- ❌ Direct RGB: `rgb(59, 130, 246)`
- ❌ Hardcoded color names in Tailwind config

### ALWAYS Use:
- ✅ Design tokens: `text-accent`, `bg-accent/5`, `border-border`
- ✅ Semantic colors: `text-foreground`, `bg-card`, `border-input`
- ✅ HSL with CSS vars: `hsl(var(--accent))`
- ✅ Opacity with `/` syntax: `accent/20`, `accent/60`

### Why?
Hardcoded colors break:
- 🚫 Theming and rebranding
- 🚫 Dark mode support
- 🚫 Brand consistency
- 🚫 Maintainability
- 🚫 Accessibility adjustments

### Color Token Reference

| Use Case | Token | Example |
|----------|-------|---------|
| Light backgrounds | `accent/5` | `bg-accent/5` |
| Borders | `border` | `border-border` |
| Borders (accent) | `accent/20` | `border-accent/20` |
| Focus rings | `accent/30` | `focus:ring-accent/30` |
| Icons, muted text | `accent/60` | `text-accent/60` |
| Primary accent | `accent` | `bg-accent`, `text-accent` |
| Shadows | `accent/5` | `shadow-accent/5` |

---

### Code Review Checklist
- [ ] All containers use semantic width classes
- [ ] Section spacing uses `.section-*` classes
- [ ] Typography uses `.heading-*` and `.text-body-*` classes
- [ ] Colors reference design system tokens
- [ ] Grids use `.gap-unified-*` spacing
- [ ] Backgrounds use documented pattern classes
- [ ] Inline styles are justified (dynamic/3rd-party)

---

## Quick Reference Card

```
CONTAINERS          SECTIONS        TYPOGRAPHY
├─ narrow  960px   ├─ xl  32/96px  ├─ display  76px
├─ default 1280px  ├─ lg  48/96px  ├─ lg       40px
├─ wide    1440px  ├─ md  40/80px  ├─ md       30px
└─ fluid   100%    └─ sm  32/64px  └─ sm       24px

GAPS               SPACING          BACKGROUNDS
├─ xl   8/12       ├─ xl  12/16    ├─ premium-light
├─ lg   6/8        ├─ lg  8/12     ├─ premium-dark
├─ md   4/6        ├─ md  6/8      ├─ premium-accent
└─ sm   3/4        └─ sm  4/6      └─ subtle
```

---

## ❌ What NOT to Do - Anti-Patterns

### Never Use:
1. **Hardcoded Colors**
   - ❌ `bg-blue-500`, `text-slate-600`, `border-gray-200`, `from-sky-50`
   - ❌ Hex values: `#3B82F6`, `#64748b`
   - ✅ Design tokens: `bg-accent`, `text-primary`, `border-border`, `from-accent/5`

2. **Manual Grid Classes**
   - ❌ `grid grid-cols-3`, `grid md:grid-cols-2`, `grid-cols-1 md:grid-cols-3`
   - ✅ Semantic classes: `.grid-three-col`, `.grid-two-col`, `.grid-auto`

3. **Direct Gap Values for Grids**
   - ❌ `gap-4`, `gap-6`, `gap-8`
   - ✅ Gap tokens: `gap-unified-sm`, `gap-unified-md`, `gap-unified-lg`

4. **Hardcoded Background Colors**
   - ❌ `bg-white`, `bg-slate-50`, `bg-blue-900`
   - ✅ Semantic backgrounds: `bg-background`, `bg-card`, `section-bg-subtle`

5. **Color-Specific Classes**
   - ❌ `text-blue-300`, `hover:text-blue-200`, `border-slate-200`
   - ✅ Context-aware: `text-accent`, `hover:text-primary`, `border-border`

### Always Use:
1. **Design Tokens for Colors**
   - `bg-accent`, `text-primary`, `border-border`, `text-muted-foreground`
   - `bg-primary/80`, `text-accent/60` (with opacity modifiers)

2. **Semantic Grid Classes**
   - `.grid-three-col`, `.grid-two-col` for standard layouts
   - `.grid-metrics`, `.grid-time-slots` for specific use cases

3. **Gap Tokens for Layouts**
   - `gap-unified-lg`, `gap-unified-md`, `gap-unified-sm` for grids
   - `gap-2`, `gap-3` are acceptable for flex layouts (small component spacing)

4. **CSS Custom Properties**
   - `hsl(var(--accent))`, `hsl(var(--primary))` in inline styles
   - Never hardcode HSL/RGB values directly

5. **Semantic Background Classes**
   - `section-bg-premium`, `section-bg-subtle`, `bg-card`
   - Use design system backgrounds for consistency

### Common Mistakes to Avoid:
```css
/* ❌ WRONG */
.my-component {
  background: linear-gradient(to-br, #3B82F6, #60A5FA);
  color: #1E293B;
  border: 1px solid #CBD5E1;
}

/* ✅ CORRECT */
.my-component {
  @apply bg-gradient-to-br from-accent to-accent/60;
  @apply text-foreground;
  @apply border border-border;
}
```

### Quick Refactoring Checklist:
- [ ] All colors use design tokens or CSS variables
- [ ] Grids use semantic classes (`.grid-three-col`, etc.)
- [ ] Grid gaps use `gap-unified-*` tokens
- [ ] No hardcoded hex or named colors (`#fff`, `blue-500`)
- [ ] Backgrounds use semantic classes or CSS variables
- [ ] Text colors are context-aware (`text-foreground`, `text-muted-foreground`)

---

## Footer Component Guidelines

### Structure
The footer uses a **2:1:1:1 grid layout** (`.grid-footer`) that emphasizes company branding by giving the first column double width on large screens.

### Grid System
```html
<!-- ✅ CORRECT: Use semantic footer grid -->
<div class="grid-footer gap-unified-xl">
  <div>Company info (2x width on lg+)</div>
  <div>Navigation 1</div>
  <div>Navigation 2</div>
  <div>Contact</div>
</div>

<!-- ❌ WRONG: Manual grid overrides -->
<div class="grid-four-col xl:col-span-2">
```

### Footer Utility Classes
- `.footer-nav-link` - Footer navigation links with hover states
- `.footer-icon-link` - Social media icon links with scale animation
- `.footer-contact-icon` - Contact information icons with group hover
- `.footer-back-to-top` - Scroll to top button styling
- `.grid-footer` - Footer-specific 2:1:1:1 grid layout

### Accessibility Best Practices
1. **Semantic wrappers**: Wrap navigation link groups in `<nav>` with `aria-labelledby`
2. **Social media**: Use `<nav aria-label="Social Media">` with `<ul role="list">`
3. **Contact info**: Use `<address>` tag with `not-italic` class
4. **ARIA labels**: Include descriptive labels for icon-only links
5. **Keyboard navigation**: All interactive elements must be keyboard accessible

### Spacing Guidelines
- Use `.space-component-md` to separate Newsletter from contact info
- Use `.space-component-sm` for spacing between sections
- Remove duplicate spacing classes (e.g., `space-component-sm space-component-md`)

### Example Structure
```tsx
<footer className="section-bg-premium-dark">
  <div className="container-default section-lg">
    <div className="grid-footer gap-unified-xl">
      {/* Company info - 2x width */}
      <div>
        <nav aria-label="Social Media" className="space-component-sm">
          <ul className="flex gap-unified-sm" role="list">
            <li><a href="..." className="footer-icon-link" aria-label="...">...</a></li>
          </ul>
        </nav>
      </div>
      
      {/* Navigation sections */}
      <div>
        <h3 id="footer-company" className="heading-xs">Company</h3>
        <nav aria-labelledby="footer-company">
          <ul className="space-component-xs">...</ul>
        </nav>
      </div>
    </div>
  </div>
</footer>
```

---

## Container Usage Examples

### Homepage Sections
- Hero: No explicit container (full-width design)
- IntroSection: `container-default`
- Process: `container-wide`
- Services: `container-default`
- Education CTA: `container-default`
- Calculators: `container-wide`
- Team: Varies by component
- Meeting Scheduler: `container-narrow`
- FAQ: `container-narrow`
- Newsletter: `container-default`
- CTA: `container-default`

### Other Pages
- RSVP: `container-wide` (hero), `container-default` (content), `container-narrow` (form)
- Privacy/Terms: `container-narrow` (focused reading)
- Education: `container-default` (standard content)
- 404: `container-narrow` (error message)

---

*Last Updated: Phase 1-5 Systematic Cleanup - All hardcoded colors replaced with design tokens*
*For questions or additions, consult the design team.*
