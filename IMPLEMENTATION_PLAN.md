# Southern Scrubbin Website Refresh - Implementation Plan

## Overview
Complete website refresh for Southern Scrubbin (now "Sparkle Scrub") with owner-operated, East Tennessee messaging, SEO improvements, and enhanced user experience while maintaining Southern charm and hospitality.

## Technical Requirements

### SEO & Performance
- [ ] **Pre-render/SSR**: Cloudflare Pages prerender via Workers or build step for bot crawling
- [ ] **Meta Tags**: Description on all routes, canonical tags, OG/Twitter tags (title/description/image)
- [ ] **Technical SEO**: Favicon set, robots.txt, sitemap.xml
- [ ] **Schema.org JSON-LD**: LocalBusiness/HouseCleaning + FAQPage structured data
- [ ] **Performance**: Form conversion tracking, spam protection

### Content Strategy
- [ ] **Brand Refresh**: "Sparkle Scrub" branding throughout
- [ ] **Voice**: Owner-operated, first-person, East TN focus
- [ ] **Service Area**: ~10-mile flexibility around Knoxville without boxing in
- [ ] **No Pricing**: Keep pricing conversations for estimates

## Implementation Tasks

### 1. SEO Foundation (High Priority)
**Reference**: Meta & OG section in docs
- [ ] Add comprehensive meta tags to index.html
- [ ] Implement Open Graph and Twitter Card tags  
- [ ] Add canonical URL structure
- [ ] Create robots.txt and sitemap.xml
- [ ] Add favicon and web app manifest

### 2. Schema.org Structured Data (High Priority)
**Reference**: LocalBusiness and FAQPage scripts in docs
- [ ] Implement LocalBusiness/HouseCleaning JSON-LD
- [ ] Add FAQPage structured data
- [ ] Leave phone/email fields empty until ready
- [ ] Test structured data with Google's Rich Results tool

### 3. Hero Section Refresh (High Priority)
**Reference**: HERO section in docs
- [ ] Update to "Sparkle Scrub" branding
- [ ] Implement owner-operated messaging
- [ ] Add trust strip: "Reliable • Flexible scheduling • Pet-friendly • Straightforward communication"
- [ ] Enhance CTA: "Request a quick estimate"

### 4. Services Content Overhaul (Medium Priority)
**Reference**: SERVICES, WHAT'S INCLUDED, AIRBNB/STR, SMALL OFFICES sections
- [ ] Create Services overview with three main categories
- [ ] Build detailed "What's Included" section with specific tasks
- [ ] Add comprehensive Airbnb/STR turn services
- [ ] Detail Small Offices for cozy workspaces
- [ ] Include "Not currently offering" transparency

### 5. Enhanced FAQ Section (Medium Priority)
**Reference**: FAQs (expanded) section in docs
- [ ] Implement 8 comprehensive FAQ items
- [ ] Match Schema.org FAQ structured data
- [ ] Maintain authentic Southern voice
- [ ] Address common concerns (pets, supplies, scheduling)

### 6. Contact & Form Improvements (Medium Priority)
**Reference**: CONTACT/ESTIMATE section in docs
- [ ] Enhance estimate form with all specified fields
- [ ] Add honeypot spam protection
- [ ] Implement success state and validation
- [ ] Set up conversion tracking
- [ ] Add flexible communication preferences

### 7. Supporting Sections (Medium Priority)
**Reference**: SUPPLIES & PREFERENCES, HOW IT WORKS, SERVICE AREA, ABOUT sections
- [ ] Add supplies and preferences flexibility
- [ ] Create clear 3-step "How It Works" process
- [ ] Define service area with 10-mile guideline
- [ ] Personal "About" section emphasizing reliability

### 8. UX Enhancements (Low Priority)
**Reference**: Components we may still need section
- [ ] Add sticky mobile CTA anchoring to form
- [ ] Create testimonial strip with placeholders
- [ ] Plan gallery space for 5-8 images with alt text
- [ ] Enhanced footer with service area and hours
- [ ] Accessibility improvements (contrast, focus states, keyboard nav)

## Content Guidelines

### Brand Voice
- **Tone**: Friendly, professional, reliable
- **Perspective**: First-person, owner-operated
- **Regional**: East Tennessee, Knoxville-focused
- **Service**: Straightforward communication, no fuss

### Key Messaging
- **Value Prop**: "One set of hands, done right—without the fuss"
- **Trust Factors**: Reliable, flexible, pet-friendly, clear communication
- **Service Area**: "Generally within ~10 miles" for flexibility
- **Approach**: Simple, consistent, trustworthy

### Design Consistency
- **Colors**: Maintain turquoise (#00AFAF) and golden yellow (#F5B700)
- **Typography**: Playfair Display headings, Inter body text
- **Animation**: Southern-inspired, accessibility-conscious
- **Components**: Sparkle effects, gentle animations, accessibility first

## Technical Notes

### Cloudflare Pages Setup
- Build output: `dist/`
- Deploy command: `npm run build && wrangler pages deploy`
- Prerender consideration for bot crawling

### React Architecture
- Maintain component orchestration pattern
- Use centralized animations from `src/utils/animations.js`
- Respect reduced motion preferences
- Keep loading screen and brand consistency

### Performance Targets
- <3s load time on 3G
- <500KB initial bundle
- 90%+ accessibility score
- Core Web Vitals compliance

## Success Metrics
- [ ] Google PageSpeed Insights: 90+ performance, 100% accessibility
- [ ] Rich Results test: All structured data validates
- [ ] Mobile usability: All tests pass
- [ ] Brand consistency: Voice and visual alignment throughout
- [ ] Conversion optimization: Clear path from visit to estimate request