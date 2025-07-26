// Southern Sparkle & Scrub Animation Utilities
// Main animation module that re-exports from smaller modules

// Import all animation variants from organized modules
export { easings, shouldReduceMotion, getVariants, reducedMotionVariants } from './easings';
export { heroVariants, sparkleVariants } from './heroAnimations';
export { serviceVariants, trustVariants } from './interactionAnimations';
export { scrollVariants, waveVariants, progressVariants } from './scrollAnimations';