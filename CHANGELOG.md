# CHANGELOG.md

## HNW Positioning Update — December 2024

### Pages Added
- `/owners` — Business Owners & Entrepreneurs segment page
- `/executives` — Corporate Executives segment page  
- `/legacy` — Pre-Retirees & Legacy Families segment page
- `/services/:serviceSlug` — Individual service detail pages (4 services)
- `/resources` — Thought leadership hub with lead magnets
- `/resources/:resourceSlug` — Individual article pages

### Components Created
- `Testimonials.tsx` — Anonymized client testimonials with HNW positioning
- `CaseStudyCard.tsx` — Compliant case study display with required disclaimers
- `LeadMagnet.tsx` — Email capture for downloadable resources

### Configuration Files
- `src/config/siteSettings.ts` — Centralized brand data, contact info, qualification criteria
- `src/config/theme.ts` — Design token references for components

### Content Files
- `src/content/services.ts` — Service definitions with outcomes and ideal clients
- `src/content/segments.ts` — HNW segment pain points, outcomes, case studies
- `src/content/testimonials.ts` — Anonymized client testimonials
- `src/content/resources.ts` — Articles and lead magnet definitions

### Components Updated
- `Hero.tsx` — Uses siteSettings.cta for CTA text
- `CTA.tsx` — Added qualification criteria, updated CTA text
- `IntroSection.tsx` — Updated copy for HNW positioning
- `ServiceCards.tsx` — Links to service detail pages, uses centralized content
- `Navbar.tsx` — Ready for nav item additions
- `App.tsx` — Added routes for segments, services, resources

### CTAs Updated
- All instances of "Schedule a Consultation" → "Request Your Wealth Strategy Session"
- Qualification criteria displayed: "$500,000 in investable assets or high-income on track within 2-3 years"

### Dependencies
- No new dependencies added

### Notes
- All content uses siteSettings for contact info and qualification thresholds
- Service pages link from ServiceCards component
- Testimonials use anonymized attributions (role + context only)
- Case studies include compliance disclaimers
