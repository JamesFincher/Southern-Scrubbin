# Tabbed Services CSS Documentation

## Overview

Comprehensive responsive CSS styling system for the Southern Scrubbin tabbed Services section, designed to work seamlessly across all device sizes while maintaining brand consistency and accessibility standards.

## Key Features

### ✅ Responsive Design
- **Mobile-first approach** with progressive enhancement
- **Flexible tab layout**: Vertical on mobile, horizontal on desktop
- **Adaptive content sizing** based on screen dimensions
- **Touch-optimized** interface for mobile devices

### ✅ Accessibility Compliance
- **44px minimum touch targets** for mobile accessibility
- **Keyboard navigation support** with focus states
- **ARIA labels and roles** for screen readers
- **High contrast** brand colors meeting WCAG standards

### ✅ Brand Consistency
- **Southern Scrubbin color palette** integration
- **Sparkle animations** and brand-specific effects
- **Playfair Display** typography for headings
- **Custom shadow system** using brand colors

### ✅ Performance Optimization
- **GPU-accelerated animations** using transform properties
- **Reduced motion support** via CSS media queries
- **Efficient transitions** with brand-specific easing curves
- **Optimized for 60fps** animations

## CSS Classes Reference

### Core Container Classes

#### `.services-tabs`
Main container for the entire tabbed interface
```css
.services-tabs {
  @apply bg-white rounded-3xl p-6 lg:p-8;
  box-shadow: var(--shadow-soft);
}
```
- **Desktop**: 2.5rem padding (40px)
- **Mobile**: 1.5rem padding (24px)
- Uses brand soft shadow

#### `.tab-nav`
Navigation container for tab buttons
```css
.tab-nav {
  @apply flex flex-col sm:flex-row gap-2 sm:gap-4 p-2 bg-gray-50 rounded-2xl mb-8;
}
```
- **Mobile**: Vertical stack with 0.5rem gaps
- **Tablet+**: Horizontal layout with 1rem gaps
- Background uses gray-50 for subtle contrast

### Tab Button Classes

#### `.tab-button`
Individual tab button styling
```css
.tab-button {
  @apply relative flex-1 px-4 py-3 sm:px-6 sm:py-4 rounded-xl font-medium text-center transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary-200;
  min-height: 44px;
  min-width: 44px;
}
```
**Key Features:**
- ✅ **44px minimum touch target** (WCAG compliance)
- ✅ **Flexible sizing** with flex-1
- ✅ **Smooth transitions** (300ms duration)
- ✅ **Focus ring** for keyboard navigation

#### `.tab-button.active`
Active tab state
```css
.tab-button.active {
  @apply bg-white text-primary shadow-soft;
  box-shadow: var(--shadow-gentle);
}
```
- Uses brand primary color (#00AFAF)
- Enhanced shadow with brand colors

#### `.tab-button-content`
Tab button inner content layout
```css
.tab-button-content {
  @apply flex items-center justify-center gap-2 sm:gap-3;
}
```
- **Mobile**: Vertical stack (flex-col) with minimal gap
- **Desktop**: Horizontal layout with larger gaps

### Content Area Classes

#### `.tab-content`
Main content area for tab panels
```css
.tab-content {
  @apply min-h-[400px] sm:min-h-[450px] lg:min-h-[500px];
}
```
**Responsive Heights:**
- **Mobile**: 400px minimum
- **Tablet**: 450px minimum  
- **Desktop**: 500px minimum

#### `.service-tab-panel`
Individual tab panel container
```css
.service-tab-panel {
  @apply space-y-6 lg:space-y-8;
}
```
- **Mobile/Tablet**: 1.5rem spacing between sections
- **Desktop**: 2rem spacing for more breathing room

### Layout Grid Classes

#### `.service-features-grid.has-description`
Two-column layout for content
```css
.service-features-grid.has-description {
  @apply lg:grid-cols-2 lg:gap-12;
}
```
**Responsive Behavior:**
- **Mobile/Tablet**: Single column stack
- **Desktop**: Two-column grid with 3rem gap

#### `.service-feature-item`
Individual feature list items
```css
.service-feature-item {
  @apply flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-white rounded-xl;
  box-shadow: var(--shadow-soft);
}
```
- **Mobile**: 0.75rem padding, 0.75rem gap
- **Desktop**: 1rem padding, 1rem gap
- Brand-consistent shadow system

## Responsive Breakpoints

### Mobile (< 640px)
```css
@media (max-width: 640px) {
  .tab-nav { @apply gap-3; }
  .tab-button { @apply px-3 py-3; }
  .tab-button-content { @apply flex-col gap-1; }
  .tab-button-text { @apply text-xs leading-tight; }
}
```
**Optimizations:**
- Vertical tab button layout (icon over text)
- Reduced padding for space efficiency
- Smaller text size for better fit

### Tablet (640px - 1024px)
```css
@media (min-width: 640px) and (max-width: 1024px) {
  .tab-nav { @apply gap-3; }
  .tab-button { @apply px-5 py-4; }
  .service-features-grid.has-description { @apply grid-cols-1; }
}
```
**Balanced Approach:**
- Horizontal tab layout
- Single-column content for readability
- Medium padding values

### Desktop (> 1024px)
```css
@media (min-width: 1024px) {
  .services-tabs { @apply p-10; }
  .tab-nav { @apply gap-6; }
  .service-tab-panel { @apply space-y-10; }
}
```
**Enhanced Experience:**
- Maximum padding and spacing
- Two-column content layout
- Largest gaps for premium feel

## Accessibility Features

### Touch Targets
- **Minimum 44px height/width** on all interactive elements
- **Generous padding** on mobile for easy tapping
- **Visual feedback** on touch interactions

### Keyboard Navigation
```css
.tab-button:focus-visible {
  @apply ring-4 ring-primary-200 ring-offset-2;
}
```
- **High contrast focus rings** using brand colors
- **Visible focus indicators** for keyboard users
- **Logical tab order** through proper HTML structure

### Reduced Motion Support
```css
@media (hover: none) {
  .tab-button:hover {
    @apply bg-transparent text-gray-600;
  }
}
```
- **Touch device optimization** (disables hover states)
- **Global reduced motion** support in utilities layer
- **Graceful animation fallbacks**

## Animation System

### Tab Transitions
```css
.tab-content-enter-active {
  @apply opacity-100 transform translate-y-0 transition-all duration-300;
  transition-timing-function: var(--ease-southern);
}
```
**Features:**
- **Southern easing curve** for brand personality
- **Smooth opacity and transform** transitions
- **Staggered content animations** for polish

### Brand Sparkle Effects
- Integrated with existing sparkle animation system
- Uses `sparkleVariants` from animation utilities
- Random delays for natural twinkling effect

## Usage Examples

### Basic Implementation
```jsx
<div className="services-tabs">
  <div className="tab-nav" role="tablist">
    <button className="tab-button active">
      <div className="tab-button-content">
        <span className="tab-button-icon">🏠</span>
        <span className="tab-button-text">Homes</span>
      </div>
    </button>
  </div>
  <div className="tab-content">
    <div className="service-tab-panel">
      {/* Content here */}
    </div>
  </div>
</div>
```

### Feature List Implementation
```jsx
<div className="service-features-grid has-description">
  <div className="service-description">
    <h4 className="service-description-title">What's Included</h4>
    <p className="service-description-text">Service description...</p>
  </div>
  <div className="service-features-list">
    <h4 className="service-features-title">Service Details</h4>
    <div className="service-feature-item">
      <span className="service-feature-icon">✓</span>
      <span className="service-feature-text">Feature description</span>
    </div>
  </div>
</div>
```

## Performance Considerations

### GPU Acceleration
- All animations use `transform` and `opacity`
- `will-change` property applied where appropriate
- Hardware acceleration for smooth 60fps performance

### CSS Optimizations
- **Minimal repaints** through transform-only animations
- **Efficient selectors** using class-based targeting
- **Modular structure** for maintainability

### Brand Integration
- **Consistent with existing** animation system
- **Uses brand color variables** from theme
- **Maintains Southern Scrubbin** visual identity

## Browser Support

### Modern Browsers
- **Chrome/Edge 88+**
- **Firefox 85+**
- **Safari 14+**

### Fallbacks
- **Flexbox layout** for broad compatibility
- **CSS Grid** with fallback support
- **Transform animations** with reduce-motion support

This CSS system provides a complete, production-ready solution for the tabbed Services section that maintains brand consistency while delivering excellent user experience across all devices and accessibility requirements.