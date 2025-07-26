# Southern Sparkle & Scrub 🏠✨

Welcome to Southern Sparkle & Scrub! A modern, animated website for Tennessee's premier home cleaning service, built with React, Tailwind CSS v4, and Framer Motion.

## Overview

A one-page website showcasing Southern hospitality through modern web technology. Features smooth animations, responsive design, and a comprehensive brand identity system inspired by authentic Southern charm.

## Tech Stack

- **Frontend**: React 19.1.0 with Vite 7.0.6
- **Styling**: Tailwind CSS v4.1.11 with CSS-first theming
- **Animations**: Framer Motion (Motion) v12.23.9
- **Fonts**: Playfair Display & Inter from Google Fonts
- **Build Tool**: @tailwindcss/vite plugin for v4 integration

## Features

### 🎨 Southern-Inspired Design System
- **Primary Colors**: Turquoise (#00AFAF) & Golden Yellow (#F5B700)
- **Typography**: Playfair Display for headings, Inter for body text
- **Brand Identity**: Authentic Tennessee hospitality with modern web standards
- **Accessibility**: WCAG AA compliant with reduced motion support

### ✨ Advanced Animation System
- **Sparkle Effects**: CSS-based sparkle animations with GPU acceleration
- **Scroll Animations**: IntersectionObserver-based reveal animations
- **Micro-interactions**: Hover states, button animations, and service card transitions
- **Performance**: Optimized with `prefers-reduced-motion` support

### 📱 Responsive & Accessible
- **Mobile-First**: Optimized for all screen sizes
- **Touch-Friendly**: 44px minimum touch targets
- **Semantic HTML**: Screen reader compatible with proper ARIA labels
- **Performance**: Fast loading with optimized animations

## Component Architecture

### Core Components
```
src/components/
├── Hero.jsx              # Main hero section with animated logo
├── Services.jsx          # Service showcase with transformation story
├── ServiceCard.jsx       # Individual service cards (extracted)
├── Contact.jsx           # Contact section orchestrator
├── ContactForm.jsx       # Form with trust-building animations (extracted)
├── ContactInfo.jsx       # Testimonials and contact cards (extracted)
├── Footer.jsx            # Footer orchestrator
└── FooterLinks.jsx       # Footer components (extracted)
```

### Animation Utilities
```
src/utils/
├── animations.js         # Main animation exports
├── easings.js           # Southern-inspired easing curves (extracted)
├── heroAnimations.js    # Hero and sparkle variants (extracted)
├── interactionAnimations.js # Service interactions (extracted)
└── scrollAnimations.js  # Scroll-triggered variants (extracted)
```

### Theme Configuration
```
src/index.css            # Tailwind v4 CSS-first theme with @theme directive
vite.config.js          # @tailwindcss/vite plugin configuration
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation
```bash
# Clone the repository
git clone [repository-url]
cd southern-scrubbin

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Development Commands
```bash
npm run dev         # Start Vite dev server
npm run build       # Build for production
npm run preview     # Preview production build
npm run lint        # Run ESLint (if configured)
```

## Project Structure

```
southern-scrubbin/
├── public/
├── src/
│   ├── components/     # React components
│   ├── utils/         # Animation utilities
│   ├── index.css      # Tailwind theme & global styles
│   ├── App.jsx        # Main app component
│   └── main.jsx       # React entry point
├── vite.config.js     # Vite configuration
├── package.json       # Dependencies & scripts
└── README.md         # This file
```

## Brand Guidelines

### Color Palette
- **Primary**: `#00AFAF` (Turquoise) - Trust, cleanliness, Southern waters
- **Secondary**: `#F5B700` (Golden Yellow) - Warmth, hospitality, Southern sunshine  
- **Accent**: `#007A7A` (Deep Teal) - Professional depth
- **Supporting**: Neutral grays for typography and backgrounds

### Typography Scale
- **Display**: Playfair Display for elegant headings
- **Body**: Inter for readable, modern text
- **Sizes**: Fluid typography with clamp() for responsive scaling

### Animation Principles
- **Easing**: Custom Southern-inspired curves (gentle, welcoming)
- **Duration**: 0.3-0.8s for most interactions
- **Staggering**: 0.1-0.2s delays for sequential reveals
- **Performance**: GPU-accelerated transforms and opacity changes

## Performance Optimizations

- **Lazy Loading**: Animations triggered by scroll position
- **GPU Acceleration**: Transform3d and will-change properties
- **Reduced Motion**: Respects user accessibility preferences
- **Font Display**: Optimized font loading strategy
- **Code Splitting**: Component-based architecture ready for splitting

## Browser Support

- **Modern Browsers**: Chrome 88+, Firefox 85+, Safari 14+, Edge 88+
- **Mobile**: iOS Safari 14+, Chrome Mobile 88+
- **Graceful Degradation**: Fallbacks for older browsers

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit changes (`git commit -m 'Add new feature'`)
4. Push to branch (`git push origin feature/new-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- **Design Inspiration**: Authentic Southern hospitality and charm
- **Technical Stack**: React, Tailwind CSS v4, Framer Motion communities
- **Performance**: Web Vitals and accessibility best practices

---

**Made with 💙 in Tennessee** • Southern Sparkle & Scrub © 2025
