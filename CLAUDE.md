# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Southern Sparkle & Scrub is a one-page animated cleaning service website built with React 19, Vite 7, Tailwind CSS v4, and Framer Motion. The architecture emphasizes Southern hospitality through modern web technology with performance-optimized animations and accessibility features.

## Development Commands

```bash
npm run dev         # Start Vite development server with HMR
npm run build       # Build for production (outputs to dist/)
npm run preview     # Preview production build locally
npm run lint        # Run ESLint for code quality
npm run deploy      # Build and deploy to Cloudflare Pages
```

## Architecture & Code Structure

### Animation-Driven Architecture
The codebase uses a modular animation system with Framer Motion that's organized around performance and accessibility:

- **Centralized Animation Utilities**: All animations are exported from `src/utils/animations.js` which re-exports from specialized modules
- **Reduced Motion Support**: Global `shouldReduceMotion()` utility respects user preferences and applies across all components
- **Performance Optimization**: Animations use GPU-accelerated transforms and opacity changes, with lazy loading triggered by scroll position

### Component Architecture Pattern
Components follow a hierarchical orchestration pattern:

```
App.jsx (Main orchestrator with loading screen, navigation, scroll handling)
├── Hero.jsx (Animated logo, sparkle effects)
├── Services.jsx (Uses ServiceCard.jsx for individual cards)
├── Contact.jsx (Orchestrates ContactForm.jsx + ContactInfo.jsx)
└── Footer.jsx (Orchestrates FooterLinks.jsx)
```

**Key Pattern**: Parent components handle state and orchestration, child components focus on presentation and local interactions.

### Animation System Organization
```
src/utils/
├── animations.js         # Main export hub for all animations
├── easings.js           # Southern-inspired easing curves + reduced motion utilities
├── heroAnimations.js    # Hero section and sparkle effect variants
├── interactionAnimations.js # Service cards and trust-building animations
└── scrollAnimations.js  # Scroll-triggered reveal animations with staggering
```

**Critical**: Always import animations from `src/utils/animations.js` to ensure consistent access to reduced motion fallbacks.

### Tailwind CSS v4 Theme System
The project uses Tailwind CSS v4's new `@theme` directive in `src/index.css` for CSS-first theming:

- **Brand Colors**: Primary (#00AFAF turquoise), Secondary (#F5B700 golden yellow), Accent (#007A7A deep teal)
- **Typography**: Playfair Display for headings (`font-serif`), Inter for body text (`font-sans`)
- **Custom Utilities**: `.btn-primary`, `.card-sparkle`, `.sparkle-container` for consistent Southern branding
- **Custom CSS Properties**: `--ease-southern`, `--shadow-gentle`, `--animate-sparkle` for brand-specific effects

### State Management Patterns
The app uses React's built-in state management with specific patterns:

- **Loading State**: Global loading screen in App.jsx with 2-second duration
- **Scroll State**: Navigation transparency based on scroll position (>100px threshold)
- **Reduced Motion**: Global accessibility state managed in App.jsx and applied via CSS-in-JS
- **Form State**: Local state in ContactForm.jsx with validation and success states

### Performance & Accessibility Implementation
- **Intersection Observer**: Used for scroll-triggered animations in all major sections
- **prefers-reduced-motion**: Automatically detected and applied globally via CSS and JavaScript
- **GPU Acceleration**: All animations use `transform3d` and `will-change` properties
- **Semantic HTML**: Proper ARIA labels, focus management, and keyboard navigation
- **Touch Targets**: 44px minimum for mobile accessibility

## Development Patterns

### Adding New Components
1. Create component in `src/components/` following the orchestrator/presenter pattern
2. Import animations from `src/utils/animations.js`
3. Use existing brand utilities from `src/index.css` (@layer components)
4. Test with reduced motion enabled

### Modifying Animations
1. Edit the appropriate animation module in `src/utils/`
2. Export from `src/utils/animations.js`
3. Ensure reduced motion variants exist in `easings.js`
4. Test staggering effects don't break with accessibility features

### Brand Consistency
- Use theme colors via CSS custom properties (e.g., `var(--color-primary)`)
- Apply brand typography classes: `.text-southern`, `.text-sparkle`
- Maintain Southern hospitality in copy and interaction design
- Use sparkle emoji (✨) and home emoji (🏠) consistently

## Key Technical Details

### Cloudflare Pages Deployment
- Configured with `wrangler.toml` for project "southern-scrubbin"
- Build output directory: `dist/`
- Deploy script builds then uses `wrangler pages deploy`

### ESLint Configuration
- Uses ESLint 9+ flat config format
- React Hooks plugin for hook usage validation
- React Refresh plugin for Vite integration
- Custom rule for unused vars with pattern ignoring

### Loading Screen Implementation
The app implements a branded loading screen with:
- 2-second duration with sparkle animations
- Progress bar with gradient fill animation
- Branded logo with shine effect
- Smooth transition to main content

This loading pattern should be maintained for brand consistency and perceived performance.